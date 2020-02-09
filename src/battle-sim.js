/*
* Controls the Battle Simulation menu
*/

//---------------
// DESCRIPTION: Loads assets for the Battle Simulation menu
// PARAMS:
//  game (I,REQ) - Game object
//---------------
function preloadBattleSim(game) {
  game.load.image('game-bg', 'assets/bg/blue-bg.png');
  game.load.image("screentint", "assets/ui/screentint-alpha-50.png");
  game.load.image('black', 'assets/ui/black.png');

  game.load.image("button-back", "assets/ui/button-back.png");
  game.load.image("map-box", "assets/ui/map-box.png");
  game.load.image("map-box-mask", "assets/ui/map-box-mask-sm.png");
  game.load.image("completed", "assets/ui/completed.png");

  preloadUI(game);
  preloadClassIcons(game);
  preloadUnits(game);

  game.load.audio("menu-select", ["assets/sounds/select01.mp3"]);
  game.load.audio('menu-accept', ['assets/sounds/accept01.mp3']);
}

//---------------
// DESCRIPTION: Creates the Battle Simulation menu
// PARAMS:
//  game (I,REQ) - Game object
//---------------
function createBattleSim(game) {
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
  var titleText = game.add.text(400, 40, "Battle Simulation", titleStyle).setOrigin(0, 0.5);
  titleText.setShadow(2, 2, "#000", 2);
  titleText.depth = 10;


  // Map list
  showBattleSimMaps(game, sounds, music, playerData);

}

//---------------
// DESCRIPTION: Returns a list of all battle sim map names, descriptions, and map loading code
// RETURNS: Array of map info objects
//---------------
function getBattleSimMaps() {
  var maps = [
    { name: "Britannia Plains", load: "BritPlains",    image: "Boudica-Portrait" },
    { name: "Temple Grounds",   load: "TempleGrounds", image: "Medea-Portrait" },
    { name: "Roaming Boars",    load: "RoamingBoars",  image: "Demon Boar-Portrait" },
    { name: "Archer Volleys",   load: "ArcherVolleys", image: "Arash-Portrait" },
    { name: "Assassination",    load: "Assassination", image: "Cursed Arm Hassan-Portrait" },
    { name: "Castle of Snow",   load: "CastleOfSnow",  image: "Heracles-Portrait" },
  ];

  if (devMode()) {
    maps.push({ name: "Servant Test",     load: "ServantMap",    image: "Unknown-Gold-Full" });
    maps.push({ name: "Enemy Test",       load: "EnemyMap",      image: "Skeleton-Saber-Portrait" });
    maps.push({ name: "Test Map",         load: "TestMap",       image: "Astolfo-Portrait"  });
    // maps.push({ name: "Advance Wars 1",   load: "AdvanceWars1",  image: "Medea-Portrait"    });
  }

  return maps;
}

//---------------
// DESCRIPTION: Shows list of available maps for Battle Simulation
// PARAMS:
//  game   (I,REQ) - Game object
//  sounds (I,REQ) - Collection of menu sounds
//  music  (I,REQ) - Music to stop playing
//---------------
function showBattleSimMaps(game, sounds, music, playerData) {

  // ==============================
  //   Camera
  // ==============================
  var cameraX = 416;
  var cameraY = 72;
  var cameraWidth = 600;
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
  //   Maps
  // ==============================
  var buttonX = cameraX + (cameraWidth / 2);
  var buttonY = cameraY + 10;
  var count = 0;
  var clearedMaps = playerData.battleSim.length;

  for (const mapObj of getBattleSimMaps()) {
    var clearsLeft = 0;

    // Check for completed map
    var mapCheck = mapObj.load + "";
    if (playerData.battleSim.includes(mapCheck)) { mapObj.completed = true; }
    else {
      mapObj.completed = false;

      // Check for locked map
      var unlockAmount = Math.floor(count / 3) * 2;
      clearsLeft = unlockAmount - clearedMaps;
    }

    // Add the map button
    var buttonUI = createMapButton(game, mapObj, buttonX, buttonY, () => {
      loadMap(game, mapObj.load, music, playerData) ;
    }, sounds.select, 0, clearsLeft);

    // Fade in
    game.tweens.add({
      targets: buttonUI,
      alpha: 1,
      ease: "Quad.easeIn",
      duration: 500,
      delay: 500 + (count * 250),
    });

    // Increase camera bounds
    mapCamera.setBounds(cameraX, cameraY, cameraWidth, (buttonY + 150 - cameraY));
    buttonY += 125;
    count++;
  }
}

//---------------
// DESCRIPTION: Creates a button for map selection
// PARAMS:
//  game       (I,REQ) - Game object
//  mapObj     (I,REQ) - Map object
//  x          (I,REQ) - X position
//  y          (I,REQ) - Y Position
//  action     (I,REQ) - Function to call when left-clicked
//  sound      (I,OPT) - Sound to play when button is left-clicked
//  alpha      (I,OPT) - Alpha to set on each sprite/text element
//  clearsLeft (I,OPT) - If locked, # of map clears left before this map is unlocked (default: unlocked)
// RETURNS: Array of sprites/text associated with the button
//---------------
function createMapButton(game, mapObj, x, y, action, sound, alpha, clearsLeft) {
  var allUI = [];
  clearsLeft = clearsLeft || 0;

  var button = game.add.sprite(x, y, "map-box");
  button.setOrigin(0.5, 0);
  button.alpha = alpha;
  allUI.push(button);

  // Title
  var textX = x + 150 - 290;
  var textY = y + 45;

  var style = { font: "30px Optima", fill: "#000", fontStyle: "bold" };
  var text = game.add.text(textX, textY, mapObj.name, style).setOrigin(0, 1);
  text.alpha = alpha;
  allUI.push(text);

  // Image
  if (mapObj.image) {
    var image = game.add.sprite((x - 216), (y + 57), mapObj.image).setOrigin(0.5, 0.5);
    image.alpha = alpha;
    if (image.displayWidth > 123) { image.setDisplaySize(123, 123); }

    var imageMask = game.add.sprite((x - 280), y, "map-box-mask").setOrigin(0, 0);
    image.setMask(imageMask.createBitmapMask());
    imageMask.destroy();

    allUI.push(image);
  }

  // Completed / Map message
  var completed, message;
  var messageStyle = { font: "20px Optima", fill: "#fff", fontStyle: "bold" };
  if (mapObj.completed) {
    completed = game.add.sprite(textX, (y + 80), "completed").setOrigin(0, 0.5);
    completed.alpha = alpha;
    allUI.push(completed);
  }
  else if (clearsLeft > 0) {
    if (clearsLeft == 1) { clearMessage = "Clear 1 more map to unlock"; }
    else { clearMessage = "Clear " + clearsLeft + " more maps to unlock"; }

    message = game.add.text(textX, (y + 80), clearMessage, messageStyle).setOrigin(0, 0.5);
    message.setShadow(1, 1, "#000", 1);
    message.alpha = alpha;
    allUI.push(message);
  }
  else {
    message = game.add.text(textX, (y + 80), "First Time Clear: +400 QP", messageStyle).setOrigin(0, 0.5);
    message.setShadow(1, 1, "#000", 1);
    message.alpha = alpha;
    allUI.push(message);
  }

  // Disabled
  if (clearsLeft > 0) {
    button.tint = 0xbbbbbb;
    if (image) { image.tint = 0xbbbbbb; }
    if (completed) { completed.tint = 0xbbbbbb; }
    if (message) { message.tint = 0xbbbbbb; }
  }

  // Button
  else {
    button.setInteractive( useHandCursor() );
    button.on('pointerdown', (pointer) => { if (!pointer.rightButtonDown()) {
      if (sound) { sound.play(); }
      action();
    } } );

    button.on('pointerover', function (pointer) {
      button.tint = 0xbbbbbb;
      if (image) { image.tint = 0xbbbbbb; }
      if (completed) { completed.tint = 0xbbbbbb; }
      if (message) { message.tint = 0xbbbbbb; }
    } );

    button.on('pointerout',  function (pointer) {
      button.tint = 0xffffff;
      if (image) { image.tint = 0xffffff; }
      if (completed) { completed.tint = 0xffffff; }
      if (message) { message.tint = 0xffffff; }
    } );
  }

  return allUI;
}

//---------------
// DESCRIPTION: Loads a battle map
// PARAMS:
//  game  (I,REQ) - Game object
//  map   (I,REQ) - Map to load
//  music (I,REQ) - Music to stop playing
//---------------
function loadMap(game, map, music, playerData) {
  if (map) {
    music.stop();
    game.scene.start('BattleScene', { map: map, playerData: playerData });
  }
}
