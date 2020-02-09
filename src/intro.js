/*
* Handles the game intro for new players
*/

//---------------
// DESCRIPTION: Loads assets for the intro
// PARAMS:
//  game (I,REQ) - Game object
//---------------
function preloadIntro(game) {
  game.load.image('something', 'assets/bg/something.png');
  game.load.image('black', 'assets/ui/black.png');

  preloadDialogue(game);
  preloadUI(game);

  game.load.audio("menu-select", ["assets/sounds/select01.mp3"]);
  game.load.audio('menu-accept', ['assets/sounds/accept01.mp3']);

  game.load.audio("bgm-quiet", ["assets/music/quiet.mp3"]);

  // In case of out of date images: re-load them with a copy
  // var image = "menu-master";
  // game.load.image(image, "assets/ui/" + image + " - Copy.png");
}

//---------------
// DESCRIPTION: Starts the intro
// PARAMS:
//  game (I,REQ) - Game object
//---------------
function createIntro(game) {

  // Black screen
  fadeSceneIn(game, 3000);
  var selectSound = game.sound.add("menu-select");
  var music = game.sound.add("bgm-quiet", { volume: 1 } );
  music.loop = true;
  music.play();


  // Dialogue
  var dialogue = new Dialogue(game);
  dialogue.addDialogue(null, null, null, [
    "...",
    "... Hey.",
    "Are you awake?",
  ], "black");

  dialogue.addDialogue(null, null, null, [
    "...",
    "... You are!",
    "Say, what's your name?",
    "If you can't remember... that's okay. Just think of something that sounds good.",
  ], "something");


  dialogue.play(() => {
    game.add.sprite(0, 0, "something").setOrigin(0, 0);
    nameEntry(game, selectSound, music);
  });
}

//---------------
// DESCRIPTION: Displays text box to enter name into
// PARAMS:
//  game (I,REQ) - Game object
//  selectSound (I,REQ) - Selection sound
//---------------
function nameEntry(game, selectSound, music) {

  var promptStyle = { font: "35px FrizQuadrata", fill: "#fff" };
  var promptText = game.add.text(160, 230, "Enter your name:", promptStyle).setOrigin(0, 0);
  promptText.setShadow(2, 2, "#000", 2);

  var box = game.add.sprite(512, 313, "dialogue-option").setOrigin(0.5, 0.5);

  var style = { font: "35px Optima", fill: "#fff" };
  var entryText = game.add.text(512, 295, "", style).setOrigin(0.5, 0);
  entryText.setShadow(2, 2, "#000", 2);


  // Input
  game.input.keyboard.on('keydown', function (event) {
    if (event.keyCode === 8) { event.preventDefault(); }  // Don't allow backspace to navigate browser back

    if (event.keyCode === 8 && entryText.text.length > 0) {
      entryText.text = entryText.text.substr(0, entryText.text.length - 1);
    }
    else if ((event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90)) && (entryText.displayWidth < 300)) {
      entryText.text += event.key;
    }
    else if (event.keyCode === 13 && (entryText.text.length > 0) && (entryText.text.indexOf(" ") != 0)) {
      selectSound.play();
      var name = entryText.text;
      promptText.destroy();
      box.destroy();
      entryText.destroy();
      enteredName(game, name, selectSound, music);
    }
  });
}

//---------------
// DESCRIPTION: Continues intro after name entry
// PARAMS:
//  game (I,REQ) - Game object
//  name (I,REQ) - Player's name
//  selectSound (I,REQ) - Selection sound
//---------------
function enteredName(game, name, selectSound, music) {
  var dialogue = new Dialogue(game);
  dialogue.addDialogue(null, null, null, [
    name + ", huh? I like it.",
    "Unfortunately, your appearance got a tiny bit corrupted... but don't worry!",
    "You can choose from any of these ones. Just pick whatever you like best.",
  ], "something");

  dialogue.play(() => {
    appearanceEntry(game, name, selectSound, music);
  });
}

//---------------
// DESCRIPTION: Allows selection of appearance
// PARAMS:
//  game (I,REQ) - Game object
//  name (I,REQ) - Player's name
//  selectSound (I,REQ) - Selection sound
//---------------
function appearanceEntry(game, name, selectSound, music) {

  var promptStyle = { font: "35px FrizQuadrata", fill: "#fff" };
  var promptText = game.add.text(64, 32, "Select your appearance:", promptStyle).setOrigin(0, 0);
  promptText.setShadow(2, 2, "#000", 2);

  var allUI = [promptText];
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
  for (const master of masters) {
    var i = allUI.length;
    allUI.push(game.add.sprite(x, y, master + " token").setOrigin(0, 0));
    appearanceSelectButton(game, name, selectSound, allUI[i], allUI, music);

    if (((i - 1) % 4) == 3) {
      x = 128;
      y+= 200;
    }
    else {
      x += 200;
    }
  }
}

//---------------
// DESCRIPTION: Adds interactivity to master appearance buttons
// PARAMS:
//  game   (I,REQ) - Game object
//  name   (I,REQ) - Player's name
//  selectSound (I,REQ) - Selection sound
//  sprite (I,REQ) - Button sprite
//---------------
function appearanceSelectButton(game, name, selectSound, sprite, allUI, music) {
  sprite.setInteractive( useHandCursor() );

  sprite.on('pointerdown', (pointer) => {
    if (pointer.rightButtonDown()) { return; }
    for (const element of allUI) { element.destroy(); }
    selectSound.play();
    selectedAppearance(game, name, sprite.texture.key, music);
  } );

  sprite.on('pointerover', function (pointer) { sprite.tint = 0x999999; } );
  sprite.on('pointerout',  function (pointer) { sprite.tint = 0xffffff; } );
}

//---------------
// DESCRIPTION: Adds interactivity to master appearance buttons
// PARAMS:
//  game  (I,REQ) - Game object
//  name  (I,REQ) - Player's name
//  image (I,REQ) - Selecter image
//---------------
function selectedAppearance(game, name, image, music) {
  var dialogue = new Dialogue(game);

  // Gudako-specific
  if (image == "Gudako token") {
    dialogue.addDialogue(null, null, null, [
      "Um...",
      "Are you sure that's the appearance you want? Are you really, REALLY sure?",
      "But either way... It's only fair I introduce myself now.",
    ], "something");
  }
  else {
    dialogue.addDialogue(null, null, null, [
      "Okay! It's only fair I introduce myself now.",
    ], "something");

  }

  // Back to normal
  dialogue.addDialogue(["Bella-smile"], ["Bella-smile"], null, [
    "I don't know my real name, but you can call me Bella.",
  ], null, 3000);

  dialogue.addDialogue(["Bella-happy"], ["Bella-happy"], null, [
    "It's nice to meet you, " + name + "!",
  ]);

  dialogue.play(() => {
    endIntro(game, name, image, music);
  });
}

//---------------
// DESCRIPTION: Saves selections and starts the game menu
// PARAMS:
//  game  (I,REQ) - Game object
//  name  (I,REQ) - Player's name
//  image (I,REQ) - Selecter image
//---------------
function endIntro(game, name, image, music) {
  // Create & save data
  var playerData = createNewPlayerData(name, image);
  savePlayerData(playerData);

  // Start scene
  music.stop();
  game.scene.start("GameMenuScene", { playerData: playerData });
}
