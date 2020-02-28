/*
* Controls the Options menu
*/

//---------------
// DESCRIPTION: Handles super secret game codes
// PARAMS:
//  game       (I,REQ) - Game object
//  playerData (I,REQ) - Player data
//  code       (I,REQ) - Code to check
//---------------
function checkGameCodes(game, playerData, code) {
  var success = false;

  if (code == "Jess#8978") {
    addServant(playerData, Artemis(game));
    success = true;
  }


  if (success) {
    var sound = game.sound.add("accept02");
    sound.play();
  }
}

//---------------
// DESCRIPTION: Loads assets for the Options menu
// PARAMS:
//  game (I,REQ) - Game object
//---------------
function preloadOptions(game) {
  game.load.image('game-bg', 'assets/bg/blue-bg.png');
  game.load.image("screentint", "assets/ui/screentint-alpha-50.png");
  game.load.image("screentint75", "assets/ui/screentint-alpha-75.png");
  game.load.image('black', 'assets/ui/black.png');

  game.load.image("button-back", "assets/ui/button-back.png");
  game.load.image("dialogue-option", "assets/ui/dialogue-option.png");

  preloadUI(game);

  game.load.audio("menu-select", ["assets/sounds/select01.mp3"]);
  game.load.audio('menu-accept', ['assets/sounds/accept01.mp3']);
  game.load.audio("accept02", ["assets/sounds/accept02.mp3"]);
}

//---------------
// DESCRIPTION: Creates the Options menu
// PARAMS:
//  game (I,REQ) - Game object
//---------------
function createOptions(game) {
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

  // Title bar
  var bar = game.add.image(0, 0, "top-bar").setOrigin(0, 0);

  var nameStyle = { font: "50px FrizQuadrata", fill: "#fff", stroke: "#000", strokeThickness: 1 };
  var nameText = game.add.text(512, 40, " Options ", nameStyle).setOrigin(0.5, 0.5);
  nameText.setShadow(2, 2, "#000", 2);


  // Portrait
  var masterImage = playerData.image;
  if (masterImage.indexOf(" ") >= 0) {
    masterImage = masterImage.substr(0, masterImage.indexOf(" "));
  }
  var portrait = game.add.sprite(250, 0, masterImage).setOrigin(0.5, 0);


  // Back button
  backButton(game, sounds.select, () => {
    game.scene.start('GameMenuScene', { playerData: playerData, music: music });
  });


  // Options
  showOptions(game, sounds.select, playerData, music);
}

//---------------
// DESCRIPTION: Shows Help/Tips
// PARAMS:
//  game          (I,REQ) - Game object
//  selectSound   (I,REQ) - Sound to play on button click
//  playerData    (I,OPT) - Player data
//---------------
function showOptions(game, selectSound, playerData, music) {

  // ==============================
  //   Camera
  // ==============================
  var cameraX = 400;
  var cameraY = 75;
  var cameraWidth = 624;
  var cameraHeight = 551;
  var mapCamera = game.cameras.add(cameraX, cameraY, cameraWidth, cameraHeight);

  cameraX += 1024;
  cameraY += 700;
  mapCamera.useBounds = true;
  mapCamera.setBounds(cameraX, cameraY, cameraWidth, cameraHeight);
  mapCamera.centerOn(cameraX, cameraY);

  // Camera controls - mouse wheel
  game.input.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
      var mod = deltaY * 10;
      mapCamera.setScroll(0, (mapCamera.worldView.y + mod))
  });


  var xyCoord = { x: (cameraX + 15), y: (cameraY + 15) };


  // ==============================
  //   Info Sections
  // ==============================
  var fadeUI = [];
  optionsPlayer(game, playerData, fadeUI, 5, xyCoord, selectSound, mapCamera);
  mapCamera.setBounds(cameraX, cameraY, cameraWidth, (xyCoord.y - cameraY));

  if (window.File && window.FileReader && window.Blob) {
    optionsData(game, playerData, fadeUI, 5, xyCoord, selectSound, mapCamera, music);
    mapCamera.setBounds(cameraX, cameraY, cameraWidth, (xyCoord.y - cameraY));
  }


  // Fade in
  game.tweens.add({
    targets: fadeUI,
    alpha: 1,
    ease: "Quad.easeIn",
    duration: 500,
    delay: 100,
  });
}

// ==============================================================================

//---------------
// DESCRIPTION: Shows Player options
//---------------
function optionsPlayer(game, playerData, fadeUI, depth, xyCoord, selectSound, mapCamera) {
  var xIcon = xyCoord.x + 20;
  var yPos = xyCoord.y + 40;

  var labelFill = "#c1c1c1";
  var valueFill = "#fff";

  // ----------

  // Portrait
  var label = optionsAddImage(game, fadeUI, playerData.image, depth, xIcon, yPos, 0, 0);
  optionsAddButton(game, fadeUI, "Edit", depth, (xIcon + 74), (yPos + 155), selectSound, () => {
    mapCamera.setPosition(2000, 0);
    editMasterImage(game, playerData, selectSound, () => { mapCamera.setPosition(400, 75); });
  }, true);

  // Name
  var text = optionsAddText(game, fadeUI, playerData.name, depth, (xIcon + 160), (yPos + 74), valueFill, 2, 30, null, 0, 0.5);
  optionsAddButton(game, fadeUI, "Edit", depth, (xIcon + 210), (yPos + 105), selectSound, () => {
    mapCamera.setPosition(2000, 0);
    editMasterName(game, playerData, selectSound, () => { mapCamera.setPosition(400, 75); });
  }, true);

  yPos += 170 + 16;
  // ----------

  optionsAddSection(game, fadeUI, "Master", depth, xyCoord, yPos);
}

//---------------
// DESCRIPTION: Allows changing of appearance
//---------------
function editMasterImage(game, playerData, selectSound, callback) {
  var depth = 150;

  // Back Button
  var allUI = backButton(game, selectSound, () => {
    // Fade out
    game.tweens.add({
      targets: allUI,
      alpha: 0,
      ease: "Quad.easeOut",
      duration: 500,
      onComplete: () => {
        for (const elem of allUI) { elem.destroy(); }
      }
    });
    if (callback) { callback(); }
  });
  allUI[0].depth = depth;
  allUI[1].depth = depth;
  allUI[0].alpha = 0;
  allUI[1].alpha = 0;

  // Tint Background
  var tint = game.add.sprite(0, 0, "screentint75");
  tint.setOrigin(0, 0);
  tint.depth = depth - 5;
  tint.setInteractive( useHandCursor(false) );
  tint.alpha = 0;
  allUI.push(tint);


  // Prompt
  var promptStyle = { font: "35px FrizQuadrata", fill: "#fff" };
  var promptText = game.add.text(64, 32, "Select your appearance:", promptStyle).setOrigin(0, 0);
  promptText.setShadow(2, 2, "#000", 2);
  promptText.depth = depth;
  promptText.alpha = 0;
  allUI.push(promptText);


  // Master selection
  var masters = [
    "Ritsuka-Female-Chaldea",
    "Ritsuka-Male-Chaldea",
    "Hakuno",
    "Rin",
    "Ritsuka-Female-Mage",
    "Ritsuka-Male-Mage",
    "Irisviel",
    "Gudako",
  ];

  var x = 128;
  var y = 128;
  var count = 0;
  for (const master of masters) {
    var i = allUI.length;
    count++;

    allUI.push(game.add.sprite(x, y, master + " token").setOrigin(0, 0));
    allUI[i].depth = depth;
    allUI[i].alpha = 0;
    optionsSelectMaster(game, playerData, selectSound, allUI[i]);

    if (((count - 1) % 4) == 3) {
      x = 128;
      y+= 200;
    }
    else {
      x += 200;
    }
  }


  // Fade in
  game.tweens.add({
    targets: allUI,
    alpha: 1,
    ease: "Quad.easeIn",
    duration: 500,
  });
}
//---------------
// DESCRIPTION: Adds interactivity to master appearance buttons
//---------------
function optionsSelectMaster(game, playerData, selectSound, sprite) {
  sprite.setInteractive( useHandCursor() );

  sprite.on('pointerdown', (pointer) => {
    if (pointer.rightButtonDown()) { return; }
    selectSound.play();

    playerData.image = sprite.texture.key;
    savePlayerData(playerData);
    game.scene.restart();
  } );

  sprite.on('pointerover', function (pointer) { sprite.tint = 0x999999; } );
  sprite.on('pointerout',  function (pointer) { sprite.tint = 0xffffff; } );
}

//---------------
// DESCRIPTION: Allows changing of name
//---------------
function editMasterName(game, playerData, selectSound, callback) {
  var depth = 150;

  // Back Button
  var allUI = backButton(game, selectSound, () => {
    game.scene.restart();
  });
  allUI[0].depth = depth;
  allUI[1].depth = depth;
  allUI[0].alpha = 0;
  allUI[1].alpha = 0;

  // Tint Background
  var tint = game.add.sprite(0, 0, "screentint75");
  tint.setOrigin(0, 0);
  tint.depth = depth - 5;
  tint.setInteractive( useHandCursor(false) );
  tint.alpha = 0;
  allUI.push(tint);


  // Prompt
  var promptStyle = { font: "35px FrizQuadrata", fill: "#fff" };
  var promptText = game.add.text(64, 32, "Enter your name:", promptStyle).setOrigin(0, 0);
  promptText.setShadow(2, 2, "#000", 2);
  promptText.depth = depth;
  promptText.alpha = 0;
  allUI.push(promptText);


  // Name entry
  var box = game.add.sprite(512, 313, "dialogue-option").setOrigin(0.5, 0.5);
  box.depth = depth;
  box.alpha = 0;
  allUI.push(box);

  var style = { font: "35px Optima", fill: "#fff" };
  var entryText = game.add.text(512, 295, "", style).setOrigin(0.5, 0);
  entryText.setShadow(2, 2, "#000", 2);
  entryText.depth = depth;
  entryText.alpha = 0;
  allUI.push(entryText);

  // Input
  game.input.keyboard.on('keydown', function (event) {
    if (event.keyCode === 8) { event.preventDefault(); }  // Don't allow backspace to navigate browser back
    if (!entryText) { return; }

    if (event.keyCode === 8 && entryText.text.length > 0) {
      entryText.text = entryText.text.substr(0, entryText.text.length - 1);
    }
    else if ((event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90)) && (entryText.displayWidth < 300)) {
      entryText.text += event.key;
    }
    else if (event.keyCode === 13 && (entryText.text.length > 0) && (entryText.text.indexOf(" ") != 0)) {
      selectSound.play();
      playerData.name = entryText.text;

      checkGameCodes(game, playerData, playerData.name);

      savePlayerData(playerData);
      game.scene.restart();
    }
  });


  // Fade in
  game.tweens.add({
    targets: allUI,
    alpha: 1,
    ease: "Quad.easeIn",
    duration: 500,
  });
}

//---------------
// DESCRIPTION: Shows Data options
//---------------
function optionsData(game, playerData, fadeUI, depth, xyCoord, selectSound, mapCamera, music) {
  var xPos = xyCoord.x + 20;
  var yPos = xyCoord.y + 40;

  var labelFill = "#c1c1c1";
  var valueFill = "#fff";

  // ----------

  // Prompt
  optionsAddText(game, fadeUI, ["You can save and load game data to back up or transfer your progress.",
                                " * Loading can only be done once per day."],
    depth, xPos, yPos, labelFill, 2, 16);
  yPos += 50;


  // Save
  optionsAddButton(game, fadeUI, "Save Data", depth, (xPos + 50 + 85), (yPos + 26), selectSound, () => {
    saveFile(encryptPlayerData(playerData), playerData.name + " - Fate Grand Wars.fgw", "text");
  });

  // Load
  var disableLoad = false;
  if (playerData.lastLoad == curDateSlashes()) { disableLoad = true; }
  if (devMode()) { disableLoad = false; }

  optionsAddButton(game, fadeUI, "Load Data", depth, (xPos + 400), (yPos + 26), selectSound, () => {
    loadFile("loadPlayerDataFile", game, music);
  }, false, disableLoad);

  yPos += 55 + 16;


  // Delete
  optionsAddButton(game, fadeUI, "Delete Data", depth, (xPos + 267), (yPos + 20), selectSound, () => {
    optionsDeleteData(game, music);
  }, null, null, "button-continue-red");
  yPos += 45 + 16;
  // ----------

  optionsAddSection(game, fadeUI, "Data", depth, xyCoord, yPos);
}

//---------------
// DESCRIPTION: Confirms the deletion of player data
//---------------
function optionsDeleteData(game, music) {
  // Confirmation
  var confirmed = confirm("Are you sure you want to delete the current game data?" +
                          "\nBefore deleting, you should save your current data just in case.");
  if (!confirmed) { return; }


  // Deletion
  confirmed = confirm("Continue deleting the current game data and restart the game?");
  if (confirmed) {
    deletePlayerData();
    music.stop();
    game.scene.start("MenuScene");
  }
}

// ==============================================================================

//---------------
// DESCRIPTION: Adds text
//---------------
function optionsAddText(game, fadeUI, textIn, depth, xPos, yPos, fill, shadow, fontSize, fontFamily, originX, originY) {
  fontFamily = fontFamily || "Optima";
  var style = { font: "20px " + fontFamily, fill: "#fff", fontStyle: "bold" };

  if (Array.isArray(textIn)) { textIn = textIn.join("\n"); }
  var text = game.add.text(xPos, yPos, textIn + " ", style);
  text.depth = depth;

  originX = originX || 0;
  originY = originY || 0;
  text.setOrigin(originX, originY);

  if (fill) { text.setFill(fill); }
  if (fontSize) { text.setFontSize(fontSize); }
  if (shadow > 0) { text.setShadow(shadow, shadow, "#000", shadow); }

  text.alpha = 0;
  fadeUI.push(text);

  return text;
}

//---------------
// DESCRIPTION: Adds image
//---------------
function optionsAddImage(game, fadeUI, image, depth, xPos, yPos, originX, originY) {
  var sprite = game.add.image(xPos, yPos, image);
  sprite.depth = depth;

  originX = originX || 0;
  originY = originY || 0;
  sprite.setOrigin(originX, originY);

  sprite.alpha = 0;
  fadeUI.push(sprite);

  return sprite;
}

//---------------
// DESCRIPTION: Adds button
//---------------
function optionsAddButton(game, fadeUI, buttonText, depth, xPos, yPos, sound, action, small, disabled, buttonImage) {

  // Button image/text
  buttonImage = buttonImage || "button-continue";
  var button = optionsAddImage(game, fadeUI, buttonImage, depth, xPos, yPos, 0.5, 0.5);
  if (small) { button.setDisplaySize(100, 31); }
  var text = optionsAddText(game, fadeUI, buttonText, depth, xPos, yPos, "#fff", 2, 18, null, 0.5, 0.5);

  // Disabled
  if (disabled) {
    button.tint = 0xbbbbbb;
    text.tint = 0xbbbbbb;
    return;
  }

  // Interactive
  button.setInteractive();

  button.on('pointerdown', (pointer) => {
    if (pointer.rightButtonDown()) { return; }
    if (sound) { sound.play(); }
    action();
  } );

  button.on('pointerover', function (pointer) { button.tint = 0xbbbbbb; text.tint = 0xbbbbbb; } );
  button.on('pointerout',  function (pointer) { button.tint = 0xffffff; text.tint = 0xffffff; } );
}

//---------------
// DESCRIPTION: Adds a shaded section
//---------------
function optionsAddSection(game, fadeUI, title, depth, xyCoord, endY) {
  var xPos = xyCoord.x;
  var startY = xyCoord.y;
  depth--;

  // Bar
  var sectionBar = game.add.sprite(xPos, startY, "unit-info-bar").setOrigin(0, 0);
  sectionBar.depth = depth;
  sectionBar.alpha = 0;
  fadeUI.push(sectionBar);

  // Title text
  var style = { font: "18px Optima", fill: "#2b346d", stroke: "#000", strokeThickness: 1 };
  var text = game.add.text((xPos + 9), (startY + 3), title, style).setOrigin(0, 0);
  text.depth = depth;
  text.alpha = 0;
  fadeUI.push(text);

  // Shading
  var shadow = game.add.graphics();
  shadow.fillStyle(0x000000, 0.5);
  shadow = shadow.fillRoundedRect(xPos, (startY + 9), sectionBar.displayWidth, (endY - startY), 8);
  shadow.alpha = 0;
  fadeUI.push(shadow);

  // Camera updates
  xyCoord.y = endY + 20;
}
