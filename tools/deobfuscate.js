const fs = require('fs');
const path = require('path');
const vm = require('vm');

function extractFunction(source, startIndex) {
    let braceCount = 0;
    let started = false;
    let endIndex = startIndex;

    for (let i = startIndex; i < source.length; i++) {
        const char = source[i];
        if (char === '{') {
            braceCount++;
            started = true;
        } else if (char === '}') {
            braceCount--;
            if (started && braceCount === 0) {
                endIndex = i + 1;
                break;
            }
        }
    }
    return source.substring(startIndex, endIndex);
}

function deobfuscateFile(inputPath, outputPath) {
    console.log(`[*] Reading obfuscated source: ${inputPath}...`);
    let js = fs.readFileSync(inputPath, 'utf8').replace(/^[\uFEFF\u200B]+/, '');
    const originalSize = js.length;

    // 1. Evaluate & Simplify Arithmetic Expressions (numbersToExpressions)
    console.log('[*] Step 1: Evaluating 2,000+ obfuscated math expressions to clean decimals...');
    let mathCount = 0;
    const mathRegex = /(?<![a-zA-Z0-9_$])(-?0x[a-f0-9]+(?:\s*[\+\-\*\/]\s*-?0x[a-f0-9]+)+)(?![a-zA-Z0-9_$])/gi;
    js = js.replace(mathRegex, (match, expr) => {
        try {
            const val = Function(`'use strict'; return (${expr});`)();
            if (typeof val === 'number' && !isNaN(val) && isFinite(val)) {
                mathCount++;
                return String(val);
            }
        } catch {}
        return match;
    });
    console.log(`  ✔ Replaced ${mathCount} complex math calculations with raw numbers!`);

    // 2. Decode RC4 String Tables
    console.log('[*] Step 2: Extracting and decoding RC4 string tables...');
    try {
        const arrayStart = js.search(/function _0x[a-f0-9]+\(\)\{const _0x[a-f0-9]+=\[/);
        const decoderStart = js.search(/function _0x[a-f0-9]+\(_0x[a-f0-9]+,\s*_0x[a-f0-9]+\)\{/);
        const iifeMatch = /^\(function\(_0x[a-f0-9]+,\s*_0x[a-f0-9]+\)\{[\s\S]*?\}\(_0x[a-f0-9]+,\s*[\s\S]*?\)\);/m.exec(js);

        if (arrayStart !== -1 && decoderStart !== -1 && iifeMatch) {
            const arrayCode = extractFunction(js, arrayStart);
            const decoderCode = extractFunction(js, decoderStart);
            const iifeCode = iifeMatch[0];

            const sandbox = {};
            vm.createContext(sandbox);
            vm.runInContext(arrayCode + '\n' + decoderCode + '\n' + iifeCode, sandbox);

            // Find all decoder wrapper aliases in code
            const wrapperRegex = /function (_0x[a-f0-9]+)\(([^)]+)\)\{return (_0x[a-f0-9]+)\(([^)]+)\);\}/g;
            let wMatch;
            while ((wMatch = wrapperRegex.exec(js)) !== null) {
                try {
                    vm.runInContext(wMatch[0], sandbox);
                } catch {}
            }

            const callableDecoders = Object.keys(sandbox).filter(k => typeof sandbox[k] === 'function');
            let stringCount = 0;

            callableDecoders.forEach(fnName => {
                const callRegex = new RegExp(`(?<![a-zA-Z0-9_$])${fnName}\\(([^)]+)\\)`, 'g');
                js = js.replace(callRegex, (match, argsStr) => {
                    try {
                        const evaluatedArgs = Function(`'use strict'; return [${argsStr}];`)();
                        const res = sandbox[fnName].apply(null, evaluatedArgs);
                        if (typeof res === 'string') {
                            stringCount++;
                            return JSON.stringify(res);
                        }
                    } catch {}
                    return match;
                });
            });
            console.log(`  ✔ Inlined ${stringCount} decoded string literals!`);
        }
    } catch (e) {
        console.log('  ⚠ Note on string inlining:', e.message);
    }

    // 3. Normalize Property Accesses
    console.log('[*] Step 3: Normalizing bracket access to dot notation...');
    let propCount = 0;
    js = js.replace(/\["([a-zA-Z_$][a-zA-Z0-9_$]*)"\]/g, (match, prop) => {
        propCount++;
        return `.${prop}`;
    });
    console.log(`  ✔ Normalized ${propCount} property accessors!`);

    // 4. Clean Syntax & Format
    console.log('[*] Step 4: Formatting and indenting clean JavaScript...');
    js = js.replace(/;(?=[a-zA-Z_$])/g, ';\n');
    js = js.replace(/\{(?=[a-zA-Z_$])/g, '{\n  ');

    fs.writeFileSync(outputPath, js, 'utf8');
    console.log(`\n================================================================`);
    console.log(`✔ DE-OBFUSCATION COMPLETE!`);
    console.log(`  - Input Size:  ${originalSize} bytes`);
    console.log(`  - Output Size: ${js.length} bytes`);
    console.log(`  - Output File: ${outputPath}`);
    console.log(`================================================================\n`);
}

// CLI Execution
const args = process.argv.slice(2);
const defaultIn = path.resolve(__dirname, '..', 'archive', '2026-08-26_16-10-29', 'game', 'game.js');
const defaultOut = path.resolve(__dirname, '..', 'game.clean.js');

const targetIn = args[0] || (fs.existsSync(defaultIn) ? defaultIn : 'game/game.js');
const targetOut = args[1] || defaultOut;

deobfuscateFile(targetIn, targetOut);
