/*
* Controls the main menu
*/

//---------------
// DESCRIPTION: Loads assets for the main menu
// PARAMS:
//  game (I,REQ) - Game object
//---------------
function preloadGameMenu(game) {
  game.load.image('game-bg', 'assets/bg/blue-bg.png');
  game.load.image('chaldea-bg', 'assets/bg/chaldea.png');
  game.load.image("screentint", "assets/ui/screentint-alpha-50.png");
  game.load.image('black', 'assets/ui/black.png');

  game.load.image('game-button', 'assets/ui/game-button.png');
  game.load.image("button-back", "assets/ui/button-back.png");

  game.load.image("button-map", "assets/ui/box-map.png");
  game.load.image("scroll-frame", "assets/ui/scroll-frame.png");
  game.load.image("popup-window", "assets/ui/popup-window.png");
  game.load.image("divider", "assets/ui/divider.png");

  game.load.image("button-tiles", "assets/ui/button-tiles.png");
  game.load.image("button-help", "assets/ui/button-help.png");

  game.load.image("menu-master", "assets/ui/menu-master.png");
  preloadUI(game);

  game.load.audio("game-menu-bgm", ["assets/music/myRoom.mp3"]);
  game.load.audio("menu-select", ["assets/sounds/select01.mp3"]);
  game.load.audio('menu-accept', ['assets/sounds/accept01.mp3']);

  // Help menu
  game.load.image("class-effectiveness", "assets/ui/class-effectiveness.png");
  game.load.image("Bella_fr-glasses", "assets/chara/Bella/Bella_fr-glasses.png");

  var bases = ["grass", "forest", "mountain", "ocean", "path",
   "wall", "river", "bridge", "stone"];
  for (const base of bases) {
    game.load.image(base, "assets/tiles/" + base + "/base.png");
  }
  game.load.image("leyline", "assets/tiles/structures/" + "leyline" + ".png");
  game.load.image("ruins_leyline", "assets/tiles/structures/" + "ruins_leyline" + ".png");
  game.load.image("fortress", "assets/tiles/structures/" + "fortress" + ".png");
  game.load.image("workshop", "assets/tiles/structures/" + "workshop" + ".png");
}

//---------------
// DESCRIPTION: Creates the main game menu
// PARAMS:
//  game (I,REQ) - Game object
//---------------
function createGameMenu(game) {
  // Data
  var playerData = game._playerData;
  var music = game._music;

  // Fade in transition
  fadeSceneIn(game);
  game.add.image(0, 0, 'game-bg').setOrigin(0, 0);


  // Background darkening
  var shadow = game.add.graphics();
  shadow.fillStyle(0x000000, 0.2);
  shadow.fillRect(0, -390, 1024, 550);
  shadow.setAngle(66);

  // Music
  if (!music) {
    music = game.sound.add('game-menu-bgm', { volume: 0.7 } );
    music.loop = true;
    music.play();
  }
  else if (!music.isPlaying) {
    music.play();
  }

  // Menu sounds
  var sounds = {
    select: game.sound.add("menu-select"),
    accept: game.sound.add("menu-accept"),
  };


  // Player info
  showPlayerBar(game, playerData);


  // Bella (random neutral/happy expression)
  // - Strongly favor normal smile expression
  var bellaFace = [
    "smile", "smile", "smile", "smile", "smile", "smile",
    "happy",
    "happy3",
    "look",
    "smile",
    "smile4",
    "smile5",
    "smirk2",
  ];
  var bellaIdx = getRandomInt(0, bellaFace.length);
  var bella = game.add.image(1144, 0, "Bella-" + bellaFace[bellaIdx]).setOrigin(1, 0);
  bella.flipX = true;


  // ================================
  // *** Testing ***
  // playerData.servants.length = 0;
  // playerData.qp = 4000;
  // savePlayerData(playerData);
  // ================================


  // No Servants?
  var storyActive = false;
  var battleSimActive = true;
  var servantListActive = true;
  var summonActive = true;
  var optionsActive = true;

  if (playerData.servants.length == 0) {
    storyActive = false;
    battleSimActive = false;
    servantListActive = false;
    optionsActive = false;
  }

  // Create game menu buttons
  var x = 10;
  var y = 180;
  var modX = 40;
  var modY = 20;

  // Story
  var button = createGameButton(game, "Story", x, y, () => {  }, sounds.select, !storyActive);

  // Battle Simulation
  x += modX;
  y += modY + button.displayHeight;
  createGameButton(game, "Battle Simulation", x, y, () => {
    game.scene.start('BattleSimScene', { playerData: playerData, music: music });
  }, sounds.select, !battleSimActive);

  // Servants
  x += modX;
  y += modY + button.displayHeight;
  createGameButton(game, "Servants", x, y, () => {
    game.scene.start('ServantListScene', { playerData: playerData, music: music });
  }, sounds.select, !servantListActive);

  // Summon
  x += modX;
  y += modY + button.displayHeight;
  createGameButton(game, "Summon", x, y, () => {
    game.scene.start('SummonScene', { playerData: playerData, music: music });
  }, sounds.select, !summonActive);

  // Options
  x += modX;
  y += modY + button.displayHeight;
  createGameButton(game, "Options", x, y, () => {
    game.scene.start('OptionsScene', { playerData: playerData, music: music });
  }, sounds.select, !optionsActive);

  // Help
  createGameButton(game, null, 21, 519, () => {
    var helpTips = new HelpTips();
    helpTips.showHelpTips(game, sounds.select, () => {  });
  }, sounds.select, null, "button-help");

  // Map Editor
  if (devMode()) {
    createGameButton(game, null, 78, 546, () => {
      music.stop();
      game.scene.start('MapEditorScene', { playerData: playerData });
    }, sounds.select, null, "button-tiles");
  }

}

//---------------
// DESCRIPTION: Shows player info at the top of the screen
// PARAMS:
//  game       (I,REQ) - Game object
//  playerData (I,REQ) - Player data object
//  depth      (I,OPT) - Depth to set on player info
//  allUI      (O,OPT) - Array of all UI elements created
//---------------
function showPlayerBar(game, playerData, depth, allUI) {
  // Bar
  var bar = game.add.image(0, 0, "top-bar").setOrigin(0, 0);
  if (depth > 0) { bar.depth = depth; }
  if (allUI) { allUI.push(bar); }

  // Master
  var master = game.add.image(0, 0, playerData.image).setOrigin(0, 0);
  if (depth > 0) { master.depth = depth; }
  if (allUI) { allUI.push(master); }

  var nameStyle = { font: "30px FrizQuadrata", fill: "#fff" };
  var nameText = game.add.text(152, 3, playerData.name + " ", nameStyle).setOrigin(0, 0);
  nameText.setShadow(2, 2, "#000", 2);
  if (depth > 0) { nameText.depth = depth; }
  if (allUI) { allUI.push(nameText); }

  // QP
  var qpBar = game.add.image(138, 35, "QP-bar").setOrigin(0, 0);
  if (depth > 0) { qpBar.depth = depth; }
  if (allUI) { allUI.push(qpBar); }

  var qpStyle = { font: "14px FrizQuadrata", fill: "#fff" };
  var qpText = game.add.text(152, 53, "QP", qpStyle).setOrigin(0, 0.5);
  qpText.setShadow(1, 1, "#000", 1);
  qpText.setFill("#c1c1c1");
  if (depth > 0) { qpText.depth = depth; }
  if (allUI) { allUI.push(qpText); }

  var amount = playerData.qp;
  var qpAmount = game.add.text(342, 53, amount.toLocaleString(), qpStyle).setOrigin(1, 0.5);
  if (depth > 0) { qpAmount.depth = depth; }
  if (allUI) { allUI.push(qpAmount); }

  var qpImage = game.add.image(365, 50, "QP-36").setOrigin(0.5, 0.5);
  if (depth > 0) { qpImage.depth = depth; }
  if (allUI) { allUI.push(qpImage); }
}

//---------------
// DESCRIPTION: Creates a button for the game menu
// PARAMS:
//  game       (I,REQ) - Game object
//  buttonText (I,REQ) - Text on the button
//  x          (I,REQ) - X position
//  y          (I,REQ) - Y Position
//  action     (I,REQ) - Function to call when left-clicked
//  sound      (I,OPT) - Sound to play when button is left-clicked
//  disabled   (I,OPT) - If true, button is greyed out and unclickable
//  buttonImage (I,OPT) - Image for the button (default: game-button)
// RETURNS: Button sprite
//---------------
function createGameButton(game, buttonText, x, y, action, sound, disabled, buttonImage) {
  buttonImage = buttonImage || "game-button";
  var button = game.add.sprite(x, y, buttonImage);
  button.setOrigin(0, 0);

  // Text
  if (buttonText) {
    var textX = x + 40;
    var textY = y + (button.displayHeight / 2);

    var style = { font: "40px FrizQuadrata", fill: "#fff", stroke: "#000", strokeThickness: 1 };
    var text = game.add.text(textX, textY, buttonText, style).setOrigin(0, 0.5);
    text.setShadow(2, 2, "#000", 2);
  }

  // Button
  if (!disabled) {
    button.setInteractive( useHandCursor() );
    button.on('pointerdown', function (pointer) { if (!pointer.rightButtonDown()) {
      if (sound) { sound.play(); }
      action();
    } } );
    button.on('pointerover', function (pointer) { button.tint = 0xaaaaaa; if (text) { text.tint = 0xaaaaaa; } } );
    button.on('pointerout',  function (pointer) { button.tint = 0xffffff; if (text) { text.tint = 0xffffff; } } );
  }
  else {
    button.tint = 0xaaaaaa;
    if (text) { text.tint = 0x555555; }
  }

  return button;
}
