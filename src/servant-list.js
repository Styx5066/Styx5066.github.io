/*
* Controls the Servant List menu
*/

//---------------
// DESCRIPTION: Loads assets for the Servant List menu
// PARAMS:
//  game (I,REQ) - Game object
//---------------
function preloadServantList(game) {
  game.load.image('game-bg', 'assets/bg/blue-bg.png');
  game.load.image("screentint", "assets/ui/screentint-alpha-50.png");
  game.load.image('black', 'assets/ui/black.png');
  game.load.image("button-back", "assets/ui/button-back.png");

  game.load.image("portrait-Bronze", "assets/ui/portrait-bronze.png");
  game.load.image("portrait-Silver", "assets/ui/portrait-silver.png");
  game.load.image("portrait-Gold", "assets/ui/portrait-gold.png");
  game.load.image("portrait-mask", "assets/ui/portrait-mask.png");

  game.load.image("shadow-portrait", "assets/ui/shadow-smaller.png");

  preloadUI(game);
  preloadTokenUI(game);
  preloadClassIcons(game);
  preloadUnits(game);
  preloadSkills(game);

  game.load.audio("menu-select", ["assets/sounds/select01.mp3"]);
  game.load.audio('menu-accept', ['assets/sounds/accept01.mp3']);
}

//---------------
// DESCRIPTION: Creates the Servant List menu
// PARAMS:
//  game (I,REQ) - Game object
//---------------
function createServantList(game) {
  // Data
  var music = game._music;
  var playerData = game._playerData;

  // Background
  fadeSceneIn(game, null, null, true);
  game.add.image(0, 0, 'game-bg').setOrigin(0, 0);


  // Menu sounds
  var sounds = {
    select: game.sound.add("menu-select"),
    accept: game.sound.add("menu-accept"),
  };


  // Player info
  showPlayerBar(game, playerData, 10);


  // Back button
  var backButton = game.add.image(4, 622, "button-back").setOrigin(0, 1);

  var backStyle = { font: "35px Optima", fill: "#2b346d", stroke: "#000", strokeThickness: 1 };
  var backText = game.add.text(84, 591, "Back", backStyle).setOrigin(0.5, 0.5);

  backButton.setInteractive( useHandCursor() );
  backButton.on('pointerdown', (pointer) => { if (!pointer.rightButtonDown()) {
    sounds.select.play();
    game.scene.start('GameMenuScene', { playerData: playerData, music: music });
  } } );
  backButton.on('pointerover', function (pointer) { backButton.tint = 0xaaaaaa; } );
  backButton.on('pointerout',  function (pointer) { backButton.tint = 0xffffff; } );


  // Menu title
  var titleStyle = { font: "50px FrizQuadrata", fill: "#fff", stroke: "#000", strokeThickness: 1 };
  var titleText = game.add.text(400, 40, "Servants", titleStyle).setOrigin(0, 0.5);
  titleText.setShadow(2, 2, "#000", 2);
  titleText.depth = 10;


  // Servant list
  showServants(game, sounds, music, playerData);

}

//---------------
// DESCRIPTION: Loads list of player's Servant units
// PARAMS:
//  game   (I,REQ) - Game object
//---------------
function loadPlayerServants(game, playerData, faction) {
  var servants = [];
  var load = playerData.servants;

  for (var i = 0; i < load.length; i++) {
    servants.push(window[ load[i] ](game, faction));
  }

  // Testing
  // return getAllServants(game).sort();
  // -------

  return servants.sort();
}

//---------------
// DESCRIPTION: Shows list of player's Servants
// PARAMS:
//  game   (I,REQ) - Game object
//  sounds (I,REQ) - Collection of menu sounds
//  music  (I,REQ) - Music to stop playing
//---------------
function showServants(game, sounds, music, playerData) {

  // ==============================
  //   Camera
  // ==============================
  var cameraX = 150;
  var cameraY = 72;
  var cameraWidth = 874;
  var cameraHeight = 554;
  var mapCamera = game.cameras.add(cameraX, cameraY, cameraWidth, cameraHeight);

  cameraY += 700;
  mapCamera.useBounds = true;
  mapCamera.setBounds(cameraX, cameraY, cameraWidth, cameraHeight);
  mapCamera.centerOn(cameraX, cameraY);

  // Camera controls - mouse wheel
  game.input.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
      var mod = deltaY * 10;
      mapCamera.setScroll(0, (mapCamera.worldView.y + mod))
  });


  // ==============================
  //   Servants
  // ==============================
  var servantX = cameraX + 15;
  var servantY = cameraY + 15;
  var count = 0;

  for (const servant of loadPlayerServants(game, playerData)) {

    // Add the servant
    var servantUI = showServant(game, servant, servantX, servantY, () => {
      mapCamera.setPosition(2000, 0);
      var unitInfo = new UnitInfo();
      unitInfo.showUnitInfo(game, servant, sounds.select, () => {
        mapCamera.setPosition(150, 72);
      });
    }, sounds.select, 0);

    // Fade in
    game.tweens.add({
      targets: servantUI,
      alpha: 1,
      ease: "Quad.easeIn",
      duration: 700,
      delay: 500 + (count * 100),
    });

    // Increase X offset
    servantX += 175;
    count++;

    // Increase camera bounds if at the end of a row
    if (servantX > 874) {
      mapCamera.setBounds(cameraX, cameraY, cameraWidth, (servantY + 300 - cameraY));
      servantX = cameraX + 15;
      servantY += 175;
    }
  }

}

//---------------
// DESCRIPTION: Creates a clickable Servant token
// PARAMS:
//  game       (I,REQ) - Game object
//  servant    (I,REQ) - Servant unit
//  x          (I,REQ) - X position
//  y          (I,REQ) - Y Position
//  action     (I,REQ) - Function to call when left-clicked
//  sound      (I,OPT) - Sound to play when button is left-clicked
//  alpha      (I,OPT) - Alpha to set on each sprite/text element
// RETURNS: Array of sprites/text associated with the button
//---------------
function showServant(game, servant, x, y, action, sound, alpha) {
  var allUI = [];

  // Portrait base
  var base = game.add.sprite(x, y, "portrait-" + servant.rank);
  base.setOrigin(0, 0);
  base.alpha = alpha;
  allUI.push(base);

  // Image
  var image = game.add.sprite((x + 8), (y + 146), servant.portrait + "-Portrait");
  image.setOrigin(0, 1);
  image.alpha = alpha;

  var imageMask = game.add.sprite(x, y, "portrait-mask").setOrigin(0, 0);
  image.setMask(imageMask.createBitmapMask());
  imageMask.destroy();

  allUI.push(image);

  // Name Shadow
  var textX = x + (base.displayWidth / 2);
  var textY = y + 148;

  var shadow = game.add.sprite(textX, (textY - 2), "shadow-portrait");
  shadow.setOrigin(0.5, 1);
  shadow.alpha = alpha;
  allUI.push(shadow);

  // Name
  var style = { font: "20px FrizQuadrata", fill: "#fff", fontStyle: "bold" };
  var text = game.add.text(textX, textY, servant.name, style).setOrigin(0.5, 1);
  text.setStroke("#000", 3);

  var fontSize = 20;
  while ((text.displayWidth > 120) && (fontSize > 10)) {
    fontSize--;
    text.setFontSize(fontSize);
  }

  text.alpha = alpha;
  allUI.push(text);

  // Class icon
  var classIcon = game.add.sprite((x + 12), (y + 12), servant.unitClass + "-" + servant.rank + "-Full");
  classIcon.setOrigin(0.5, 0.5);
  classIcon.setDisplaySize(50, 50);
  classIcon.alpha = alpha;
  allUI.push(classIcon);


  // Interactivity
  image.setInteractive( useHandCursor() );
  image.on('pointerdown', (pointer) => { if (!pointer.rightButtonDown()) {
    if (sound) { sound.play(); }
    action();
  } } );

  image.on('pointerover', function (pointer) {
    base.tint = 0xbbbbbb;
    image.tint = 0xbbbbbb;
    classIcon.tint = 0xbbbbbb;
  } );

  image.on('pointerout',  function (pointer) {
    base.tint = 0xffffff;
    image.tint = 0xffffff;
    classIcon.tint = 0xffffff;
  } );

  return allUI;
}
