<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Dragon's Lair Remastered</title>
		<meta name="description" content="Relive the legendary Arcade game online">
		<meta name="keywords" content="arcade games, classic games, dragon's lair, games, online games, retrogames, videogames">
		<meta name="viewport" content="user-scalable=no, width=device-width">
		<meta property="og:title" content="Dragon's Lair Remastered">
		<meta property="og:description" content="Relive the legendary Arcade game online">
		<meta property="og:image" content="game/og.png">
		<meta property="og:url" content="http://dlremaster.web.app">

		<link href="favicon.ico" rel="shortcut icon">
		<link href="game/game.css" rel="stylesheet">
		<script src="game/game.js" defer></script>
	</head>
	<body class="disabled">
		<div id="main" class="fade">
			<video id="game" class="fade" tabindex="-1" disablePictureInPicture muted playsinline></video>
			<canvas id="guide_canvas" class="fade"></canvas>
			<div id="menu">
				<div id="bats"></div>
				<div id="fog"></div>
				<div id="particles"></div>
				<span id="title"></span>
				<span id="mode"></span>
				<div id="classic_guided">
					<span id="classic" class="classic_guided"></span>
					<span id="guided" class="classic_guided"></span>
				</div>
				<span id="disclaimer">Dragon’s Lair is a trademark of its owners - Non-commercial HTML5 remaster by DJM</span>
				<div id="vignette"></div>
				<div id="authentication" class="fade">
					<div id="authentication_container">
						<span id="authentication_text">* GAME ACCESS RESTRICTED *</span>
						<div id="authentication_input">
							<input id="authentication_code" maxlength="15" placeholder="Enter access code">
							<button id="authentication_unlock">UNLOCK</button>
						</div>
					</div>
				</div>
			</div>
			<div id="info" class="fade">
				<div id="lives">
					<span id="lives_image"></span>
					<span id="lives_text"></span>
				</div>
				<span id="score"></span>
			</div>
			<div id="controls" class="fade">
				<div id="controls_container">
					<span id="up" class="controls"></span>
					<span id="down" class="controls"></span>
					<span id="left" class="controls"></span>
					<span id="right" class="controls"></span>
					<span id="sword" class="controls"></span>
					<span id="up_mask" class="controls_mask" data-code="KeyW"></span>
					<span id="down_mask" class="controls_mask" data-code="KeyS"></span>
					<span id="left_mask" class="controls_mask" data-code="KeyA"></span>
					<span id="right_mask" class="controls_mask" data-code="KeyD"></span>
					<span id="sword_mask" class="controls_mask" data-code="Space"></span>
				</div>
			</div>
		</div>
	</body>
</html>