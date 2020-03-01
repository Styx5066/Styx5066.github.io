/*
* Controls the Summon menu
*/

//---------------
// DESCRIPTION: Loads assets for the Summon menu
// PARAMS:
//  game (I,REQ) - Game object
//---------------
function preloadSummon(game) {
  game.load.image('summon-bg', 'assets/bg/summon.png');
  game.load.image("screentint", "assets/ui/screentint-alpha-50.png");
  game.load.image('black', 'assets/ui/black.png');

  game.load.image("button-back", "assets/ui/button-back.png");
  game.load.image("button-summon", "assets/ui/button-summon.png");
  game.load.image("shadow-small", "assets/ui/shadow-small.png");

  game.load.image("Back-Bronze", "assets/ui/Cards/Back-Bronze.png");
  game.load.image("Back-Silver", "assets/ui/Cards/Back-Silver.png");
  game.load.image("Back-Gold", "assets/ui/Cards/Back-Gold.png");

  for (const unitClass of Object.values(classEnum)) {
    for (const unitRank of Object.values(rankEnum)) {

      if (unitClass == "Shielder") { continue; }
      if (unitClass == "Unknown") { continue; }

      var image = unitRank + "-" + unitClass;
      game.load.image("Card-" + image, "assets/ui/Cards/" + image + ".png");
    }
  }

  preloadDialogue(game);
  preloadUI(game);
  preloadUnits(game);
  preloadClassIcons(game);
  preloadSkills(game);
  preloadTokenUI(game);

  game.load.audio("menu-select", ["assets/sounds/select01.mp3"]);
  game.load.audio('menu-accept', ['assets/sounds/accept01.mp3']);

  game.load.audio('summon-sound', ['assets/sounds/summon01.mp3']);
  game.load.audio('summon-sound2', ['assets/sounds/summon02.mp3']);
  game.load.audio('summon-finish', ['assets/sounds/summon-finish.mp3']);
  game.load.audio('summon-cards', ['assets/sounds/summon-cards.mp3']);
}

//---------------
// DESCRIPTION: Creates the Summon menu
// PARAMS:
//  game (I,REQ) - Game object
//---------------
function createSummon(game) {
  // Data
  var music = game._music;
  var playerData = game._playerData;
  var allUI = [];

  // Background
  fadeSceneIn(game, null, null, true);
  game.add.image(0, 0, 'summon-bg').setOrigin(0, 0);


  // Menu sounds
  var sounds = {
    select: game.sound.add("menu-select"),
    accept: game.sound.add("menu-accept"),
  };


  // First time player - no servants
  if (playerData.servants.length == 0) {
    summonIntro(game, playerData, music);
    return;
  }


  // Player info
  showPlayerBar(game, playerData, 10, allUI);


  // Back button
  var backButton = game.add.image(4, 622, "button-back").setOrigin(0, 1);
  backButton.depth = 10;
  allUI.push(backButton);

  var backStyle = { font: "35px Optima", fill: "#2b346d", stroke: "#000", strokeThickness: 1 };
  var backText = game.add.text(84, 591, "Back", backStyle).setOrigin(0.5, 0.5);
  backText.depth = 10;
  allUI.push(backText);

  backButton.setInteractive( useHandCursor() );
  backButton.on('pointerdown', function (pointer) { if (!pointer.rightButtonDown()) {
    sounds.select.play();
    game.scene.start('GameMenuScene', { playerData: playerData, music: music });
  } } );
  backButton.on('pointerover', function (pointer) { backButton.tint = 0xaaaaaa; } );
  backButton.on('pointerout',  function (pointer) { backButton.tint = 0xffffff; } );


  // Menu title
  var titleStyle = { font: "50px FrizQuadrata", fill: "#fff", stroke: "#000", strokeThickness: 1 };
  var titleText = game.add.text(400, 40, "Summon", titleStyle).setOrigin(0, 0.5);
  titleText.setShadow(2, 2, "#000", 2);
  titleText.depth = 10;
  allUI.push(titleText);

  // Summon background
  var cards = summonBackground(game);

  // Summon button
  var allowSummon = true;
  if (playerData.qp < 1000) { allowSummon = false; }
  if (!summonServant(game, playerData)) { allowSummon = false; }  // No servants available
  summonButton(game, allowSummon, playerData, allUI, cards, music, sounds);
}

//---------------
// DESCRIPTION: Creates the Summon button
// PARAMS:
//  game   (I,REQ) - Game object
// RETURNS: object with the "gold", "silver", and "bronze" sprites
//---------------
function summonBackground(game) {
  // Gold
  var gold = game.add.image(512, 338, "Back-Gold").setOrigin(0.5, 0.5);
  gold.depth = 5;
  var goldY = gold.y;
  var goldA = game.tweens.add({
    targets: gold,
    y: (goldY + 20),
    ease: "Quad.easeInOut",
    yoyo: true,
    repeat: -1,
    duration: 4000,
    delay: 500,
  });

  // Silver
  var silver = game.add.image((512 + 175), 318, "Back-Silver").setOrigin(0.5, 0.5);
  silver.depth = 4;
  var silverY = silver.y;
  var silverA = game.tweens.add({
    targets: silver,
    y: (silverY + 60),
    ease: "Quad.easeInOut",
    yoyo: true,
    repeat: -1,
    duration: 5000,
    delay: 800,
  });

  // Bronze
  var bronze = game.add.image((512 - 175), 368, "Back-Bronze").setOrigin(0.5, 0.5);
  bronze.depth = 3;
  var bronzeY = bronze.y;
  var bronzeA = game.tweens.add({
    targets: bronze,
    y: (bronzeY - 50),
    ease: "Quad.easeInOut",
    yoyo: true,
    repeat: -1,
    duration: 4000,
    delay: 200,
  });

  return { gold: gold, goldA: goldA, silver: silver, silverA: silverA, bronze: bronze, bronzeA: bronzeA };
}

//---------------
// DESCRIPTION: Creates the Summon button
// PARAMS:
//  game   (I,REQ) - Game object
//  active (I,REQ) - If true, allow clicking the button
//---------------
function summonButton(game, active, playerData, allUI, cards, music, sounds) {
  // Button
  var shadowTop = game.add.image(512, 426, "shadow-box").setOrigin(0.5, 0);
  shadowTop.depth = 10;
  shadowTop.flipY = true;
  allUI.push(shadowTop);

  var shadowBot = game.add.image(512, 495, "shadow-box").setOrigin(0.5, 0);
  shadowBot.depth = 10;
  allUI.push(shadowBot);

  var summonButton = game.add.image(512, 440, "button-summon").setOrigin(0.5, 0);
  summonButton.depth = 10;
  allUI.push(summonButton);

  var summonStyle = { font: "40px FrizQuadrata", fill: "#fff", stroke: "#000", strokeThickness: 3 };
  var summonText = game.add.text(512, 478, "Summon", summonStyle).setOrigin(0.5, 0.5);
  summonText.setShadow(0, 0, "#ffd700", 20);
  summonText.depth = 10;
  allUI.push(summonText);

  if (active) {
    summonButton.setInteractive( useHandCursor() );
    summonButton.on('pointerdown', function (pointer) { if (!pointer.rightButtonDown()) {
      summonButton.tint = 0xaaaaaa; summonText.tint = 0xaaaaaa;
      summonButton.removeInteractive();
      startSummon(game, playerData, allUI, cards, music, sounds);
    } } );
    summonButton.on('pointerover', function (pointer) { summonButton.tint = 0xaaaaaa; summonText.tint = 0xaaaaaa; } );
    summonButton.on('pointerout',  function (pointer) { summonButton.tint = 0xffffff; summonText.tint = 0xffffff; } );
  }
  else {
    summonButton.tint = 0x888888;
    summonText.tint = 0x888888;
  }


  // Cost Text
  var qp = game.add.image(445, 540, "QP-36").setOrigin(0.5, 0.5);
  qp.depth = 10;
  allUI.push(qp);

  var qpStyle = { font: "18px FrizQuadrata", fill: "#c1c1c1" };
  var qpText = game.add.text(467, 540, "QP Cost", qpStyle).setOrigin(0, 0.5);
  qpText.setShadow(1, 1, "#000", 1);
  qpText.depth = 10;
  allUI.push(qpText);
  if (!active) { qpText.setFill("#fff"); }

  var amountStyle = { font: "20px FrizQuadrata", fill: "#ffd700" };
  var amountText = game.add.text((475 + qpText.displayWidth), 540, "1,000", amountStyle).setOrigin(0, 0.5);
  amountText.setShadow(1, 1, "#000", 1);
  amountText.depth = 10;
  allUI.push(amountText);
}

//---------------
// DESCRIPTION: Summons a Servant
// PARAMS:
//  game   (I,REQ) - Game object
//---------------
function startSummon(game, playerData, allUI, cards, music, sounds) {
  // Deduct QP
  playerData.qp = (playerData.qp - 1000);


  // Select servant
  var summonedServant = summonServant(game, playerData);
  if (!summonedServant) { return; }
  var summonedCard = game.add.image(512, 313, "Card-" + summonedServant.rank + "-" + summonedServant.unitClass).setOrigin(0.5, 0.5);
  summonedCard.alpha = 0;

  // Save now
  addServant(playerData, summonedServant);


  // Start
  sounds.select.play();
  var timeline = game.tweens.createTimeline();
  var allCards = [cards.gold, cards.silver, cards.bronze];
  var allCardAnims = [cards.goldA, cards.silverA, cards.bronzeA];

  // Lower music
  timeline.add( {
    targets: allUI,
    alpha: 1,
    ease: "Linear",
    duration: 700,
    onComplete: () => {
      music.volume = 0.1;
      game.sound.add("summon-sound").play();
     },
  } );

  // Fade away all UI
  timeline.add( {
    targets: allUI,
    alpha: 0,
    ease: "Linear",
    duration: 500,
    delay: 500,
    onComplete: () => {
      for (const cardAnim of allCardAnims) { cardAnim.stop(); }
    }
  } );

  // Converge cards
  timeline.add( {
    targets: allCards,
    x: 512,
    y: 313,
    ease: "Linear",
    duration: 1500,
    hold: 2000,
    onComplete: () => {
      summonedCard.alpha = 1;
      game.sound.add("summon-cards").play();

      // Split cards
      game.tweens.add({
        targets: cards.gold,
        y: -626,
        ease: "Linear",
        duration: 1000,
      });
      game.tweens.add({
        targets: cards.silver,
        x: -512,
        ease: "Linear",
        duration: 1000,
      });
      game.tweens.add({
        targets: cards.bronze,
        x: 1536,
        ease: "Linear",
        duration: 1000,
      });
    }
  } );

  // Fade away summoned card
  timeline.add( {
    targets: summonedCard,
    x: 512,
    ease: "Linear",
    duration: 1000,
    onComplete: () => {
      game.sound.add("summon-sound2").play();
    }
  } );
  timeline.add( {
    targets: summonedCard,
    alpha: 0,
    ease: "Linear",
    duration: 2000,
    delay: 1500,
    onComplete: () => {
      servantDialogue(game, summonedServant, () => { endSummon(game, music); });
    }
  } );

  // Play
  timeline.play();
}

function servantDialogue(game, summonedServant, callback, depth, hold) {
  // Fade Servant image in
  var portrait = summonedServant.portrait + "-Full";
  var servantImage = game.add.image(512, 313, portrait).setOrigin(0.5, 0.5);
  if (depth) { servantImage.depth = depth; }
  servantImage.alpha = 0;

  hold = hold || 1500;

  game.tweens.add({
    targets: servantImage,
    alpha: 1,
    ease: "Linear",
    duration: 1000,
    hold: hold,
    onComplete: () => {
      // Dialogue for new Servant
      var dialogue = new Dialogue(game);
      dialogue.addDialogue([portrait], portrait, summonedServant.name, summonedServant.intro);
      dialogue.play(() => {
        callback();
      }, true);
    }
  });
}

//---------------
// DESCRIPTION: Chooses random Servant to summon
// PARAMS:
//  game       (I,REQ) - Game object
//  playerData (I,OPT) - Player data
//  faction    (I,OPT) - Faction to assign
//---------------
function summonServant(game, playerData, faction) {
  var allServants = getAllServants(game, faction, true);
  var gold   = [];
  var silver = [];
  var bronze = [];
  var chosenRank;

  // Separate by rank and filter out Servants already owned
  for (const servant of allServants) {
    if (playerData && (playerData.servants.includes(servant.load))) { continue; }

    if (servant.rank == rankEnum.Gold) { gold.push(servant); }
    else if (servant.rank == rankEnum.Silver) { silver.push(servant); }
    else if (servant.rank == rankEnum.Bronze) { bronze.push(servant); }
  }

  // Handle no Servants available
  if ((gold.length == 0) && (silver.length == 0) && (bronze.length == 0)) {
    return null;
  }

  // Target rank
  var rank;
  var rand = getRandomInt(0, 100);
  if (rand >= 70) { rank = rankEnum.Gold; }         // Gold:   30%
  else if (rand >= 30) { rank = rankEnum.Silver; }  // Silver: 40%
  else { rank = rankEnum.Bronze; }                  // Bronze: 30%

  // Handle empty rank collections
  if ((rank == rankEnum.Bronze) && (bronze.length == 0)) {
    if (silver.length > 0) { rank = rankEnum.Silver; }
    else { rank = rankEnum.Gold; }
  }
  if ((rank == rankEnum.Silver) && (silver.length == 0)) {
    if (bronze.length > 0) { rank = rankEnum.Bronze; }
    else { rank = rankEnum.Gold; }
  }
  if ((rank == rankEnum.Gold) && (gold.length == 0)) {
    if (silver.length > 0) { rank = rankEnum.Silver; }
    else { rank = rankEnum.Bronze; }
  }

  // Select a random Servant of that rank
  if (rank == rankEnum.Gold) { chosenRank = gold; }
  else if (rank == rankEnum.Silver) { chosenRank = silver; }
  else if (rank == rankEnum.Bronze) { chosenRank = bronze; }

  rand = getRandomInt(0, chosenRank.length);
  return chosenRank[rand];
}

//---------------
// DESCRIPTION: Finishes servant summon
// PARAMS:
//  game    (I,REQ) - Game object
//  servant (I,REQ) - Servant summoned
//---------------
function endSummon(game, music) {
  var fade = game.add.sprite(0, 0, "black").setOrigin(0, 0);
  fade.alpha = 0;
  fade.depth = 200;
  fade.setInteractive();

  game.tweens.add({
    targets: fade,
    alpha: 1,
    ease: "Quad.easeOut",
    duration: 1500,
    onComplete: () => {
      music.setSeek(0);
      music.volume = 0.7;
      game.scene.restart();
     }
  });
}

//---------------
// DESCRIPTION: Plays summoning intro dialogue
// PARAMS:
//  game       (I,REQ) - Game object
//  playerData (I,REQ) - Player Data
//  music      (I,REQ) - Background music
//---------------
function summonIntro(game, playerData, music) {
  fadeSceneIn(game, 1000);

  var dialogue = new Dialogue(game);
  dialogue.addDialogue(["Bella-look"], ["Bella-look"], "Bella", [
    "Okay, " + playerData.name + "!",
    "First of all, you need to summon some Servants. I can't exactly fight all that well..",
    "So it's up to the Servants to handle things if we run into trouble."
  ], null, 1000);

  dialogue.addDialogue(["Bella-smile5"], ["Bella-smile5"], "Bella", [
    "If you hand me enough QP, I can process it into a more useable form.",
    "And use it to create a beacon that will guide a Spirit Origin to our position!"
  ], null, null);

  dialogue.addDialogue(["Bella-worry"], ["Bella-worry"], "Bella", [
    "Unfortunately, exactly which one answers the call is usually entirely random..."
  ], null, null);

  dialogue.addDialogue(["Bella-happy"], ["Bella-happy"], "Bella", [
    "But luckily, this time there are a few Spirit Origins nearby that I can reach out to directly!",
    "Go ahead, " + playerData.name + "! Which one do you want?"
  ], null, null);

  dialogue.play(() => {
    summonIntroSelect(game, playerData, music);
  });
}

//---------------
// DESCRIPTION: Allows selecting a starter servant
// PARAMS:
//  game       (I,REQ) - Game object
//  playerData (I,REQ) - Player Data
//  music      (I,REQ) - Background music
//---------------
function summonIntroSelect(game, playerData, music) {
  var allUI = [];
  var allAnim = [];

  // Background tint
  var tint = game.add.image(0, 0, "screentint").setOrigin(0, 0);
  tint.alpha = 0;
  allUI.push(tint);

  // Prompt
  var promptStyle = { font: "35px FrizQuadrata", fill: "#fff" };
  var promptText = game.add.text(64, 32, "Select a Servant to start with:", promptStyle).setOrigin(0, 0);
  promptText.setShadow(2, 2, "#000", 2);
  promptText.alpha = 0;
  allUI.push(promptText);

  // Servant selection
  var starterServants = [
    Nero(game),
    Kuro(game),
    ElizabethBathory(game),
    Astolfo(game),
    MedeaLily(game),
    SerenityHassan(game),
    Heracles(game)
  ];

  var xPos = 74;
  var selectSound = game.sound.add("menu-select");
  for (const servant of starterServants) {
      showStarterServant(game, servant, xPos, allUI, allAnim, playerData, music, selectSound);
      xPos += 146;
  }

  // Fade in
  allAnim.push(game.tweens.add({
    targets: tint,
    alpha: 1,
    ease: "Quad.easeIn",
    duration: 300,
  }));
  allAnim.push(game.tweens.add({
    targets: allUI,
    alpha: 1,
    ease: "Quad.easeIn",
    duration: 1500,
  }));
}

//---------------
// DESCRIPTION: Shows a servant card for intro selection
// PARAMS:
//  game       (I,REQ) - Game object
//  servant    (I,REQ) - Servant unit to show
//  xPos       (I,REQ) - X Position to place card
//  allUI      (I,REQ) - Array of all UI elements
//  playerData (I,REQ) - Player Data
//  music      (I,REQ) - Background music
//---------------
function showStarterServant(game, servant, xPos, allUI, allAnim, playerData, music, selectSound) {
  var rand = getRandomInt(-35, 35);
  var delay = getRandomInt(0, 10);

  // Card
  var card = game.add.sprite(xPos, (313 + rand), "Card-" + servant.rank + "-" + servant.unitClass)
  card.setOrigin(0.5, 0.5);
  card.setDisplaySize(140, 238);
  card.setInteractive();
  allUI.push(card);
  card.alpha = 0;

  allAnim.push(game.tweens.add({
    targets: card,
    y: (313 - rand),
    ease: "Quad.easeInOut",
    yoyo: true,
    repeat: -1,
    duration: 5000,
    delay: 300 + (delay * 10),
  }));


  // Servant display
  var portrait = game.add.sprite(150, 752, servant.portrait + "-Full").setOrigin(0.5, 1);
  portrait.setScale(0.6);
  portrait.depth = 1;
  portrait.alpha = 0;

  var nameStyle = { font: "50px FrizQuadrata", fill: "#ffd700" };
  var name = game.add.text(512, 626, " " + servant.name + " ", nameStyle).setOrigin(0.5, 1);
  name.setShadow(2, 2, "#000", 2);
  name.depth = 2;
  name.alpha = 0;

  var classStyle = { font: "20px Optima", fill: "#ffd700" };
  var unitClass = game.add.text(512, 569, " " + servant.unitClass + " ", classStyle).setOrigin(0.5, 1);
  unitClass.setShadow(2, 2, "#000", 2);
  unitClass.depth = 2;
  unitClass.alpha = 0;

  var classIcon = game.add.sprite((512 - (unitClass.displayWidth / 2)), 557, servant.unitClass + "-" + servant.rank + "-Full").setOrigin(1, 0.5);
  classIcon.setDisplaySize(32, 32);
  classIcon.depth = 2;
  classIcon.alpha = 0;


  // Card hover over
  card.on('pointerover', (pointer) => {
    card.tint = 0x999999;

    allAnim.push(game.tweens.add({
      targets: [portrait, name, unitClass, classIcon],
      alpha: 1,
      ease: "Quad.easeIn",
      duration: 300,
    }));
  } );


  // Card hover out
  card.on('pointerout',  (pointer) => {
    card.tint = 0xffffff;

    allAnim.push(game.tweens.add({
      targets: [portrait, name, unitClass, classIcon],
      alpha: 0,
      ease: "Quad.easeIn",
      duration: 300,
    }));
  } );


  // Servant Click
  card.on('pointerdown', (pointer) => { if (!pointer.rightButtonDown()) {
    selectSound.play();

    var unitInfo = new UnitInfo();
    unitInfo.showUnitInfo(game, servant, selectSound, () => {

      game.time.delayedCall(500, () => {
        // Ask for confirmation to choose Servant
        var popup = new PopUpBox(game, "Select Servant",
          ["Do you want to start with the " + servant.unitClass + ", " + servant.name + "?"], "#ffd700");
        popup.addButton("Yes", selectSound, () => {
          // Background fade in
          var bg = game.add.image(0, 0, 'summon-bg').setOrigin(0, 0);
          bg.depth = 3;
          bg.alpha = 0;
          game.tweens.add({
            targets: bg,
            alpha: 1,
            ease: "Quad.easeIn",
            duration: 300,
          });

          // Select servant
          game.tweens.add({
            targets: [portrait, name, unitClass, classIcon],
            alpha: 0,
            ease: "Quad.easeIn",
            duration: 500,
          });
          game.tweens.add({
            targets: allUI,
            alpha: 0,
            ease: "Quad.easeIn",
            duration: 500,
            onComplete: () => {
              for (const element of allUI) { element.destroy(); }
              for (const anim of allAnim) { anim.stop(); }

              // Play sound
              music.volume = 0.3;
              game.sound.add("summon-sound").play();

              game.time.delayedCall(500, () => {
                servantDialogue(game, servant, () => {
                  finishSummonIntro(game, servant, playerData, music);
                }, 3, 1000);
              });
            }
          });
        } );
        popup.addButton("Back", selectSound, function() {  } );
        popup.showPopUp();
      });

    });

  } } );
}

//---------------
// DESCRIPTION: Finishes the summon intro
// PARAMS:
//  game       (I,REQ) - Game object
//  servant    (I,REQ) - Servant unit to show
//  playerData (I,REQ) - Player Data
//  music      (I,REQ) - Background music
//---------------
function finishSummonIntro(game, servant, playerData, music) {
  // Save the selected servant
  music.volume = 0.7;
  addServant(playerData, servant);

  // Background fade in
  var bg = game.add.image(0, 0, 'summon-bg').setOrigin(0, 0);
  bg.depth = 10;
  bg.alpha = 0;

  game.tweens.add({
    targets: bg,
    alpha: 1,
    ease: "Quad.easeIn",
    duration: 500,
    hold: 500,
    delay: 500,
    onComplete: () => {
      // Dialogue
      var dialogue = new Dialogue(game);

      dialogue.addDialogue(["Bella-surprise"], ["Bella-surprise"], "Bella", [
        "Wow, it worked! I mean, I thought it probably would, but it actually worked!",
      ], null, null, 1000);

      dialogue.addDialogue(["Bella-smile4"], ["Bella-smile4"], "Bella", [
        "It looks like you still have some QP on you, so be sure to summon some more Servants.",
        "After that, we can set out and try to figure out where we are!",
        "Or you can get some practice commanding Servants in battle first by running Battle Simulations."
      ], null, null);

      dialogue.addDialogue(["Bella-happy"], ["Bella-happy"], "Bella", [
        "That's all for now!",
      ], null, null);

      dialogue.play(() => { game.scene.restart(); }, true);
    }
  });
}
