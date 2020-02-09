/*
* Controls the main menu
*/

//---------------
// DESCRIPTION: Loads assets for the main menu
// PARAMS:
//  game (I,REQ) - Game object
//---------------
function preloadMainMenu(game) {
  game.load.image('menu-bg', 'assets/bg/main-menu.png');
  game.load.image('button-medium', 'assets/ui/button-medium.png');
  game.load.image('black', 'assets/ui/black.png');

  game.load.audio('menu-bgm', ['assets/music/title.mp3']);
  game.load.audio('menu-accept', ['assets/sounds/accept01.mp3']);
}

//---------------
// DESCRIPTION: Creates the main menu
// PARAMS:
//  game (I,REQ) - Game object
//---------------
function createMainMenu(game) {
  // Fade in transition
  fadeSceneIn(game, 1000, "Linear");

  // Background
  game.add.image(0, 0, 'menu-bg').setOrigin(0, 0);

  // Title Text
  var titleStyle = { font: "100px FrizQuadrata", fill: "#000", stroke: "#fff", strokeThickness: 7 };
  var titleText = game.add.text(512, 250, "Fate/Grand Wars", titleStyle).setOrigin(0.5, 0.5);
  titleText.setShadow(1, 1, 'rgba(0,0,0,0.9)', 2, true, false);

  // Music
  var music = game.sound.add('menu-bgm', { volume: 0.5 } );
  music.loop = true;
  music.play();


  // Button sprite
  var button = game.add.sprite(512, 400, 'button-medium').setInteractive( useHandCursor() );
  button.on('pointerdown', (pointer) => {
    if (!pointer.rightButtonDown()) {
      button.tint = 0xbbbbbb;
      button.removeInteractive();
      startGame(game, music);
    }
  } );
  button.on('pointerover', function (pointer) { button.tint = 0xbbbbbb; } );
  button.on('pointerout',  function (pointer) { button.tint = 0xffffff; } );

  // Start Text
  var startStyle = { font: "35px Optima", fill: "#000" };
  var startText = game.add.text(512, 400, "START", startStyle).setOrigin(0.5, 0.5);
}

//---------------
// DESCRIPTION: Starts the game from the main menu
// PARAMS:
//  game (I,REQ) - Game object
// music (I,REQ) - Currently-playing music, so it can be stopped
//---------------
function startGame(game, music) {
  var accept = game.sound.add('menu-accept');
  accept.play();

  game.time.delayedCall(1500, startGameAfterDelay, [game, music]);
}

//---------------
// DESCRIPTION: Starts the game from the main menu
// PARAMS:
//  game (I,REQ) - Game object
// music (I,REQ) - Currently-playing music, so it can be stopped
//---------------
function startGameAfterDelay(game, music) {
  music.stop();
  var playerData = JSON.parse(localStorage.getItem("playerData"));

  // ==============================
  // Testing new player
  // playerData = null;
  // ==============================

  // No data - start intro scene
  if (!playerData) {
    game.scene.start("IntroScene");
  }
  // Otherwise start game as normal with loaded data
  else {
    reconcilePlayerData(playerData);
    game.scene.start("GameMenuScene", { playerData: playerData });
  }
}
