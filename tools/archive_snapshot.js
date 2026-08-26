const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

// Configuration
const BASE_URL = 'https://dlremaster.web.app';
const TARGET_FILES = [
    'index.html',
    'game/game.js',
    'game/gam.js',
    'game/game.css'
];

const ARCHIVE_ROOT = path.resolve(__dirname, '..', 'archive');
const MANIFEST_FILE = path.join(ARCHIVE_ROOT, 'archive_manifest.json');
const HISTORY_FILE = path.join(ARCHIVE_ROOT, 'ARCHIVE_HISTORY.md');

if (!fs.existsSync(ARCHIVE_ROOT)) {
    fs.mkdirSync(ARCHIVE_ROOT, { recursive: true });
}

function getTimestamp() {
    const now = new Date();
    const YYYY = now.getFullYear();
    const MM = String(now.getMonth() + 1).padStart(2, '0');
    const DD = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    return {
        folderName: `${YYYY}-${MM}-${DD}_${hh}-${mm}-${ss}`,
        readable: `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`
    };
}

function fetchUrl(relPath) {
    return new Promise((resolve) => {
        const url = `${BASE_URL}/${relPath}`;
        https.get(url, (res) => {
            let data = Buffer.alloc(0);
            res.on('data', chunk => {
                data = Buffer.concat([data, chunk]);
            });
            res.on('end', () => {
                const sha256 = crypto.createHash('sha256').update(data).digest('hex');
                resolve({
                    path: relPath,
                    statusCode: res.statusCode,
                    size: data.length,
                    data: data,
                    sha256: sha256
                });
            });
        }).on('error', err => {
            resolve({ path: relPath, error: err.message });
        });
    });
}

function analyzeGameJs(jsContent) {
    const info = {
        size: jsContent.length,
        hasBOM: jsContent.charCodeAt(0) === 0xFEFF || jsContent.charCodeAt(0) === 0x200B,
        videoExpression: 'Not Found',
        assetPrefixExpression: 'Not Found',
        stringArrayFound: false,
        stringArrayName: null,
        totalLocationOccurrences: 0
    };

    // Count literal 'location'
    let count = 0, pos = 0;
    while ((pos = jsContent.indexOf('location', pos)) !== -1) {
        count++;
        pos += 8;
    }
    info.totalLocationOccurrences = count;

    // Video match
    const videoRegex = /if\(window\[[\s\S]*?\)element_game\[[\s\S]*?;else\{/;
    const vMatch = videoRegex.exec(jsContent);
    if (vMatch) {
        info.videoExpression = vMatch[0];
    }

    // Asset prefix match
    const assetRegex = /let (_0x[a-f0-9]+)=['"][^'"]*['"];(?:window\[[^;]+;)?(?=const _0x[a-f0-9]+=\[)/;
    const aMatch = assetRegex.exec(jsContent);
    if (aMatch) {
        info.assetPrefixExpression = aMatch[0];
    }

    // String array extraction (first function returning big array)
    const arrayMatch = /function (_0x[a-f0-9]+)\(\)\{const _0x[a-f0-9]+=\[([\s\S]*?)\];/.exec(jsContent.substring(0, 50000));
    if (arrayMatch) {
        info.stringArrayFound = true;
        info.stringArrayName = arrayMatch[1];
    }

    return info;
}

async function run() {
    console.log('================================================================');
    console.log('    DRAGON\'S LAIR REMASTERED - DAILY ARCHIVE & TELEMETRY TOOL   ');
    console.log('================================================================\n');

    const ts = getTimestamp();
    console.log(`[*] Connecting to ${BASE_URL} at ${ts.readable}...`);

    let manifest = { snapshots: [] };
    if (fs.existsSync(MANIFEST_FILE)) {
        try {
            manifest = JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf8'));
        } catch (e) {
            manifest = { snapshots: [] };
        }
    }

    const downloadedFiles = [];
    for (const f of TARGET_FILES) {
        console.log(`  - Fetching ${f}...`);
        const res = await fetchUrl(f);
        downloadedFiles.push(res);
    }

    // Check game.js hash against latest snapshot in manifest
    const gameJsRes = downloadedFiles.find(f => f.path === 'game/game.js');
    const currentHash = gameJsRes ? gameJsRes.sha256 : null;

    const lastSnapshot = manifest.snapshots.length > 0 ? manifest.snapshots[manifest.snapshots.length - 1] : null;
    const isDifferent = !lastSnapshot || lastSnapshot.files['game/game.js']?.sha256 !== currentHash;

    const snapshotDir = path.join(ARCHIVE_ROOT, ts.folderName);
    fs.mkdirSync(snapshotDir, { recursive: true });

    const snapshotRecord = {
        id: manifest.snapshots.length + 1,
        timestamp: ts.readable,
        folder: ts.folderName,
        isNewBuild: isDifferent,
        files: {}
    };

    downloadedFiles.forEach(f => {
        if (f.data) {
            const destPath = path.join(snapshotDir, f.path.replace(/\//g, path.sep));
            const parentDir = path.dirname(destPath);
            if (!fs.existsSync(parentDir)) fs.mkdirSync(parentDir, { recursive: true });
            fs.writeFileSync(destPath, f.data);

            snapshotRecord.files[f.path] = {
                size: f.size,
                sha256: f.sha256,
                statusCode: f.statusCode
            };
        }
    });

    let analysis = null;
    if (gameJsRes && gameJsRes.data) {
        analysis = analyzeGameJs(gameJsRes.data.toString('utf8'));
        fs.writeFileSync(
            path.join(snapshotDir, 'telemetry_analysis.json'),
            JSON.stringify(analysis, null, 2),
            'utf8'
        );
        snapshotRecord.analysis = analysis;
    }

    manifest.snapshots.push(snapshotRecord);
    fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2), 'utf8');

    // Append to Markdown history
    let historyEntry = `\n### 📦 Snapshot #${snapshotRecord.id} — \`${ts.readable}\`\n`;
    historyEntry += `- **Folder**: [\`${ts.folderName}\`](./${ts.folderName}/)\n`;
    historyEntry += `- **Status**: ${isDifferent ? '🆕 **NEW UPSTREAM BUILD DETECTED**' : '🔁 Identical to previous build'}\n`;
    historyEntry += `- **Files Captured**:\n`;
    for (const [k, v] of Object.entries(snapshotRecord.files)) {
        historyEntry += `  - \`${k}\`: ${v.size} bytes (SHA256: \`${v.sha256.substring(0, 16)}...\`)\n`;
    }
    if (analysis) {
        historyEntry += `- **Analysis & Anti-Tamper Telemetry**:\n`;
        historyEntry += `  - UTF-8 BOM: \`${analysis.hasBOM}\`\n`;
        historyEntry += `  - Literal \`location\` occurrences: \`${analysis.totalLocationOccurrences}\`\n`;
        historyEntry += `  - Video Expression: \`${analysis.videoExpression.substring(0, 80)}...\`\n`;
        historyEntry += `  - Asset Prefix: \`${analysis.assetPrefixExpression}\`\n`;
    }

    if (!fs.existsSync(HISTORY_FILE)) {
        const header = `# 📜 Dragon's Lair Remastered — Historical Snapshot Archive & Telemetry

This archive automatically collects, tracks, and analyzes every upstream build and deployment of [dlremaster.web.app](https://dlremaster.web.app/).
Use this dataset to monitor anti-tamper changes, refine atomic regex patches, and reverse-engineer clean de-obfuscated source code.

---
`;
        fs.writeFileSync(HISTORY_FILE, header + historyEntry, 'utf8');
    } else {
        fs.appendFileSync(HISTORY_FILE, historyEntry, 'utf8');
    }

    console.log('\n================================================================');
    console.log('                   SNAPSHOT COMPLETE & SAVED                    ');
    console.log('================================================================');
    console.log(`✔ Folder:    archive/${ts.folderName}`);
    console.log(`✔ Status:    ${isDifferent ? 'NEW BUILD DETECTED!' : 'Identical to previous'}`);
    console.log(`✔ Manifest:  archive/archive_manifest.json (Total snapshots: ${manifest.snapshots.length})`);
    console.log(`✔ Changelog: archive/ARCHIVE_HISTORY.md`);
    console.log('================================================================\n');
}

run();
