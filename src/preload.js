/*
* Functions for preloading assets
*/

//---------------
// DESCRIPTION: Loads map tiles
//---------------
function preloadMapTiles(game, theme, lastTheme) {

  // Unload images if necessary
  theme = theme || "plains";
  lastTheme = lastTheme || "plains";
  if (theme != lastTheme) {
    unloadMapTiles(game);
  }


  var image;
  var directions = [
    { num: 1, dir: ["n", "s", "w", "e"] },
    { num: 2, dir: ["ne", "ns", "nw", "se", "we", "sw"] },
    { num: 3, dir: ["nse", "nsw", "nwe", "swe"] },
    { num: 4, dir: ["nswe"] },
  ];
  var directionsC = ["nw", "ne", "sw", "se"];


  // ==============================
  //   Base tile images
  // ==============================
  var bases = ["grass", "forest", "mountain", "ocean", "path",
   "wall", "river", "bridge", "stone"];
  for (const base of bases) {
    game.load.image(base, "assets/tiles/" + theme + "/" + base + "/base.png");
  }
  // ==============================
  //   Grass
  // ==============================
  for (var i = 0; i < 13; i++) {
    image = "grass-" + i;
    game.load.image(image, "assets/tiles/" + theme + "/grass/" + image + ".png");
  }

  // ==============================
  //   Forest
  // ==============================
  image = "forest-1-0";
  game.load.image(image, "assets/tiles/" + theme + "/forest/" + image + ".png");
  image = "forest-1-1";
  game.load.image(image, "assets/tiles/" + theme + "/forest/" + image + ".png");
  image = "forest-1-2";
  game.load.image(image, "assets/tiles/" + theme + "/forest/" + image + ".png");

  image = "forest-2-h-0";
  game.load.image(image, "assets/tiles/" + theme + "/forest/" + image + ".png");
  image = "forest-2-h-1";
  game.load.image(image, "assets/tiles/" + theme + "/forest/" + image + ".png");

  image = "forest-2-v-0";
  game.load.image(image, "assets/tiles/" + theme + "/forest/" + image + ".png");
  image = "forest-2-v-1";
  game.load.image(image, "assets/tiles/" + theme + "/forest/" + image + ".png");

  image = "forest-3-h";
  game.load.image(image, "assets/tiles/" + theme + "/forest/" + image + ".png");
  image = "forest-3-v";
  game.load.image(image, "assets/tiles/" + theme + "/forest/" + image + ".png");

  // ==============================
  //   Mountain
  // ==============================
  image = "mountain-1";
  game.load.image(image, "assets/tiles/" + theme + "/mountain/" + image + ".png");

  image = "mountain-2-h";
  game.load.image(image, "assets/tiles/" + theme + "/mountain/" + image + ".png");
  image = "mountain-2-v";
  game.load.image(image, "assets/tiles/" + theme + "/mountain/" + image + ".png");

  image = "mountain-3-h";
  game.load.image(image, "assets/tiles/" + theme + "/mountain/" + image + ".png");
  image = "mountain-3-v";
  game.load.image(image, "assets/tiles/" + theme + "/mountain/" + image + ".png");

  image = "mountain-4-h";
  game.load.image(image, "assets/tiles/" + theme + "/mountain/" + image + ".png");
  image = "mountain-4-v";
  game.load.image(image, "assets/tiles/" + theme + "/mountain/" + image + ".png");

  // ==============================
  //   Directional
  // ==============================
  var directional = [
    "ocean",
    "path",
    "wall",
    "river",
    "stone",
  ];
  for (const baseImage of directional) {
    // 0
    image = baseImage + "-0-";
    game.load.image(image, "assets/tiles/" + theme + "/" + baseImage + "/" + image + ".png");

    // Everything else
    for (const dirObject of directions) {
      var num = dirObject.num;
      var dirArray = dirObject.dir;
      for (const dir of dirArray) {

        // TODO: Add these eventually
        if ((baseImage == "stone") && (num == 1)) { continue; }
        if ((baseImage == "stone") && (dir == "we")) { continue; }
        if ((baseImage == "stone") && (dir == "ns")) { continue; }

        image = baseImage + "-" + num + "-" + dir;
        game.load.image(image, "assets/tiles/" + theme + "/" + baseImage + "/" + image + ".png");
      }
    }

    // Ocean / River bonus tiles
    if ((baseImage == "ocean") || (baseImage == "river")) {
      for (const dir of directionsC) {
        image = baseImage + "-2-" + dir + "-c";
        game.load.image(image, "assets/tiles/" + theme + "/" + baseImage + "/" + image + ".png");
      }
    }
  }

  // Alternate wall tiles
  for (var i = 0; i < 4; i++) {
    image = "wall-2-we-" + i;
    game.load.image(image, "assets/tiles/" + theme + "/wall/" + image + ".png");
  }

  // Alternate stone tiles
  for (var i = 0; i < 8; i++) {
    image = "stone-" + i;
    game.load.image(image, "assets/tiles/" + theme + "/stone/" + image + ".png");
  }


  // ==============================
  //   Bridge
  // ==============================
  image = "bridge-0-h";
  game.load.image(image, "assets/tiles/" + theme + "/bridge/" + image + ".png");
  image = "bridge-0-v";
  game.load.image(image, "assets/tiles/" + theme + "/bridge/" + image + ".png");

  var bridgeDir = ["n", "s", "w", "e"];
  for (const dir of bridgeDir) {
    image = "bridge" + "-1-" + dir;
    game.load.image(image, "assets/tiles/" + theme + "/bridge/" + image + ".png");
  }

  image = "bridge-2-ns";
  game.load.image(image, "assets/tiles/" + theme + "/bridge/" + image + ".png");
  image = "bridge-2-we";
  game.load.image(image, "assets/tiles/" + theme + "/bridge/" + image + ".png");

  image = "bridge-4-nswe";
  game.load.image(image, "assets/tiles/" + theme + "/bridge/" + image + ".png");

  // ==============================
  //   Structures
  // ==============================
  image = "leyline"
  game.load.image(image + "-struct", "assets/tiles/" + theme + "/structures/" + image + "-struct.png");
  game.load.image(image, "assets/tiles/" + theme + "/structures/" + image + ".png");

  image = "ruins_leyline"
  game.load.image(image + "-struct", "assets/tiles/" + theme + "/structures/" + image + "-struct.png");
  game.load.image(image, "assets/tiles/" + theme + "/structures/" + image + ".png");


  // ==============================
  //   Claimable Structures
  // ==============================
  var claimables = ["fortress", "workshop"];

  for (const struct of claimables) {
    image = struct;
    game.load.image(image + "-struct", "assets/tiles/" + theme + "/structures/" + image + "-struct.png");
    game.load.image(image, "assets/tiles/" + theme + "/structures/" + image + ".png");

    for (var i = 0; i < 4; i++) {
      image = struct + "_" + i
      game.load.image(image + "-struct", "assets/tiles/" + theme + "/structures/" + image + "-struct.png");
      game.load.image(image, "assets/tiles/" + theme + "/structures/" + image + ".png");
    }

    image = "ruins_" + struct;
    game.load.image(image + "-struct", "assets/tiles/" + theme + "/structures/" + image + "-struct.png");
    game.load.image(image, "assets/tiles/" + theme + "/structures/" + image + ".png");
  }

}

//---------------
// DESCRIPTION: Unloads map tiles
//   *** Must be kept up to date with preloadMapTiles    ***
//   *** Otherwise tiles won't change between map themes ***
//---------------
function unloadMapTiles(game) {
  var image;
  var directions = [
    { num: 1, dir: ["n", "s", "w", "e"] },
    { num: 2, dir: ["ne", "ns", "nw", "se", "we", "sw"] },
    { num: 3, dir: ["nse", "nsw", "nwe", "swe"] },
    { num: 4, dir: ["nswe"] },
  ];
  var directionsC = ["nw", "ne", "sw", "se"];


  // ==============================
  //   Base tile images
  // ==============================
  var bases = ["grass", "forest", "mountain", "ocean", "path",
   "wall", "river", "bridge", "stone"];
  for (const base of bases) {
    removeTexture(game, base);
  }
  // ==============================
  //   Grass
  // ==============================
  for (var i = 0; i < 13; i++) {
    removeTexture(game, "grass-" + i);
  }

  // ==============================
  //   Forest
  // ==============================
  image = "forest-1-0";
  removeTexture(game, image);
  image = "forest-1-1";
  removeTexture(game, image);
  image = "forest-1-2";
  removeTexture(game, image);

  image = "forest-2-h-0";
  removeTexture(game, image);
  image = "forest-2-h-1";
  removeTexture(game, image);

  image = "forest-2-v-0";
  removeTexture(game, image);
  image = "forest-2-v-1";
  removeTexture(game, image);

  image = "forest-3-h";
  removeTexture(game, image);
  image = "forest-3-v";
  removeTexture(game, image);

  // ==============================
  //   Mountain
  // ==============================
  image = "mountain-1";
  removeTexture(game, image);

  image = "mountain-2-h";
  removeTexture(game, image);
  image = "mountain-2-v";
  removeTexture(game, image);

  image = "mountain-3-h";
  removeTexture(game, image);
  image = "mountain-3-v";
  removeTexture(game, image);

  image = "mountain-4-h";
  removeTexture(game, image);
  image = "mountain-4-v";
  removeTexture(game, image);

  // ==============================
  //   Directional
  // ==============================
  var directional = [
    "ocean",
    "path",
    "wall",
    "river",
    "stone",
  ];
  for (const baseImage of directional) {
    // 0
    image = baseImage + "-0-";
    removeTexture(game, image);

    // Everything else
    for (const dirObject of directions) {
      var num = dirObject.num;
      var dirArray = dirObject.dir;
      for (const dir of dirArray) {
        image = baseImage + "-" + num + "-" + dir;
        removeTexture(game, image);
      }
    }

    // Ocean / River bonus tiles
    if ((baseImage == "ocean") || (baseImage == "river")) {
      for (const dir of directionsC) {
        image = baseImage + "-2-" + dir + "-c";
        removeTexture(game, image);
      }
    }
  }

  // Alternate wall tiles
  for (var i = 0; i < 4; i++) {
    image = "wall-2-we-" + i;
    removeTexture(game, image);
  }

  // Alternate stone tiles
  for (var i = 0; i < 8; i++) {
    image = "stone-" + i;
    removeTexture(game, image);
  }


  // ==============================
  //   Bridge
  // ==============================
  image = "bridge-0-h";
  removeTexture(game, image);
  image = "bridge-0-v";
  removeTexture(game, image);

  var bridgeDir = ["n", "s", "w", "e"];
  for (const dir of bridgeDir) {
    image = "bridge" + "-1-" + dir;
    removeTexture(game, image);
  }

  image = "bridge-2-ns";
  removeTexture(game, image);
  image = "bridge-2-we";
  removeTexture(game, image);

  image = "bridge-4-nswe";
  removeTexture(game, image);

  // ==============================
  //   Structures
  // ==============================
  image = "leyline"
  removeTexture(game, image + "-struct");
  removeTexture(game, image);

  image = "ruins_leyline"
  removeTexture(game, image + "-struct");
  removeTexture(game, image);


  // ==============================
  //   Claimable Structures
  // ==============================
  var claimables = ["fortress", "workshop"];

  for (const struct of claimables) {
    image = struct;
    removeTexture(game, image + "-struct");
    removeTexture(game, image);

    for (var i = 0; i < 4; i++) {
      image = struct + "_" + i
      removeTexture(game, image + "-struct");
      removeTexture(game, image);
    }

    image = "ruins_" + struct;
    removeTexture(game, image + "-struct");
    removeTexture(game, image);
  }

}

//---------------
// DESCRIPTION: Loads general game UI
//---------------
function preloadUI(game) {
  game.load.image("selection", "assets/ui/selection-75.png");
  game.load.image("selection-red", "assets/ui/selection-75-red.png");
  game.load.image("selection-green", "assets/ui/selection-75-green.png");
  game.load.image("selection-blue", "assets/ui/selection-75-blue.png");
  game.load.image("target-red", "assets/ui/selection-red.png");
  game.load.image("blank", "assets/ui/blank.png");

  game.load.image("selection-cursor", "assets/ui/selection-cursor.png");
  game.load.image("selection-cursor-q", "assets/ui/selection-cursor-q.png");
  game.load.image("tile-info", "assets/ui/tile-info.png");
  game.load.image("shadow-unit-l", "assets/ui/shadow-unit-l.png");
  game.load.image("menu-master", "assets/ui/menu-master.png");

  game.load.image("move-ground", "assets/ui/move-ground.png");
  game.load.image("move-flight", "assets/ui/move-flight.png");

  game.load.image("option-box", "assets/ui/option-box.png");
  game.load.image("option-box-small", "assets/ui/option-box-np.png");
  game.load.image("shadow-box", "assets/ui/shadow-box.png");
  game.load.image("screentint", "assets/ui/screentint-alpha-30.png");
  game.load.image("shadow-popup", "assets/ui/shadow-popup.png");
  game.load.image("top-bar", "assets/ui/top-bar.png");

  game.load.image("box-placement", "assets/ui/box-placement.png");
  game.load.image("shadow-placement", "assets/ui/shadow-placement.png");
  game.load.image("button-start", "assets/ui/button-start.png");

  game.load.image("button-small", "assets/ui/button-small.png");
  game.load.image("button-medium", "assets/ui/button-medium.png");
  game.load.image("button-large", "assets/ui/button-large.png");
  game.load.image("button-continue", "assets/ui/button-continue.png");
  game.load.image("button-continue-red", "assets/ui/button-continue-red.png");


  game.load.image("QP", "assets/ui/QP.png");
  game.load.image("QP-36", "assets/ui/QP-36.png");
  game.load.image("QP-bar", "assets/ui/QP-bar.png");

  game.load.image("box-result", "assets/ui/box-result.png");
  game.load.image("box-special", "assets/ui/box-special.png");

  game.load.image("blue-dark-bg", "assets/bg/blue-dark-bg.png");
  game.load.image("unit-info-bar", "assets/ui/unit-info-bar.png");

  // Masters
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

  for (const master of masters) {
    game.load.image(master, "assets/ui/Player/" + master + ".png");
    game.load.image(master + " token", "assets/ui/Player/" + master + " token.png");
  }

  // Bella
  var expressions = [
    "happy",
    "happy3",
    "look",
    "smile",
    "smile4",
    "smile5",
    "smirk2",
    "surprise",
    "tongue",
    "worry",
  ];
  for (const exp of expressions) {
    game.load.image("Bella-" + exp, "assets/chara/Bella/Bella-" + exp + ".png");
  }

}

//---------------
// DESCRIPTION: Loads token UI
//---------------
function preloadTokenUI(game) {
  var ranks = ["Gold", "Silver", "Bronze"];

  for (const rank of ranks) {
    game.load.image("token-" + rank + "-back", "assets/ui/token-" + rank + "-back.png");
    game.load.image("token-" + rank + "-bot", "assets/ui/token-" + rank + "-bot.png");
    game.load.image("token-" + rank + "-top", "assets/ui/token-" + rank + "-top.png");
    game.load.image("token-bar-frame-" + rank, "assets/ui/token-bar-frame-" + rank + ".png");
  }

  game.load.image("token-bar-frame", "assets/ui/token-bar-frame.png");
  game.load.image("token-bar-HP-mask", "assets/ui/token-bar-HP-0.png");
  game.load.image("token-bar-HP-0", "assets/ui/token-bar-HP-0.png");
  game.load.image("token-bar-HP-1", "assets/ui/token-bar-HP-1.png");
  game.load.image("token-bar-HP-2", "assets/ui/token-bar-HP-2.png");
  game.load.image("token-bar-HP-3", "assets/ui/token-bar-HP-3.png");

  game.load.image("structure-hp", "assets/ui/structure-hp.png");

  game.load.image("NP-text", "assets/ui/NP-text.png");
  game.load.image("NP-text-gold", "assets/ui/NP-text-gold.png");
  game.load.image("NP-bar-empty", "assets/ui/NP-bar-empty.png");
  game.load.image("NP-bar-half", "assets/ui/NP-bar-half.png");
  game.load.image("NP-bar-filled", "assets/ui/NP-bar-filled.png");
  game.load.image("NP-glow", "assets/ui/NP-glow.png");
}

//---------------
// DESCRIPTION: Loads Class icons
//---------------
function preloadClassIcons(game) {
  var allClasses = Object.values(classEnum);
  var allRanks = Object.values(rankEnum);

  // Loop through all classes and ranks
  for (const unitClass of allClasses) {
    for (const unitRank of allRanks) {
      game.load.image(unitClass + "-" + unitRank + "-Token", "assets/ui/Class Tokens/" + unitClass + "-" + unitRank + ".png");
      game.load.image(unitClass + "-" + unitRank + "-Full", "assets/ui/Class/" + unitClass + "-" + unitRank + ".png");
    }
  }
}

//---------------
// DESCRIPTION: Loads unit images
//---------------
function preloadUnits(game) {
  // Servants
  for (const servant of getAllServants(game)) {
    preloadUnitsHelper(game, servant.portrait);
  }

  // Enemies
  for (const enemy of getAllEnemies(game)) {
    preloadUnitsHelper(game, enemy.portrait);
  }
}
function preloadUnitsHelper(game, portrait) {
  game.load.image(portrait + "-Token",    "assets/units/token/" + portrait + ".png");
  game.load.image(portrait + "-Portrait", "assets/units/portrait/" + portrait + ".png");
  game.load.image(portrait + "-Full",     "assets/units/full/" + portrait + ".png");
}

//---------------
// DESCRIPTION: Loads Skill icons
//---------------
function preloadSkills(game) {
  game.load.image("skill-frame", "assets/ui/skill-frame.png");

  var allSkills = [
    "Assault",
    "Attack Up",
    "Body",
    "Caster",
    "Charm",
    "Courage",
    "Damage Up",
    "Death Chance Up",
    "Debuff Immunity",
    "Debuff Resistance Up",
    "Defense Down",
    "Defense Up",
    "Divinity",
    "Evasion",
    "Fifth Form",
    "Guts",
    "Heal",
    "Item Construction",
    "Invincible",
    "Loveliness",
    "Mad Enhancement",
    "Magic Resistance",
    "Moon",
    "None",
    "NP Charge",
    "NP Damage Up",
    "NP Generation",
    "NP Regen",
    "Pierce Invincible",
    "Poison",
    "Presence Concealment",
    "Regen",
    "Riding",
    "Shadow",
    "Stun",
    "Summon",
    "Sure Hit",
    "Taunt",
    "Territory Creation",
    "Travel",
    "Yin Yang",
  ];

  // Loop through all skill icons
  for (const skill of allSkills) {
    game.load.image("skill-" + skill, "assets/ui/Skills/" + skill + ".png");
  }
}

//---------------
// DESCRIPTION: Loads Status icons
//---------------
function preloadStatus(game) {
  var allStatus = [
    "Attack Up",
    "Attack Down",
    "Burn",
    "Charm",
    "Class Change",
    "Curse",
    "Damage Cut",
    "Damage Up",
    "Death Chance Up",
    "Debuff Immunity",
    "Debuff Resistance Down",
    "Debuff Resistance Up",
    "Debuff Success Up",
    "Defense Down",
    "Defense Up",
    "Evade",
    "Fifth Form",
    "Guts",
    "HP Regen",
    "Invincible",
    "None",
    "NP Charge Up",
    "NP Damage Up",
    "NP Ready",
    "NP Seal",
    "Pierce Invincible",
    "Pig",
    "Poison",
    "Presence Concealment",
    "Skill Seal",
    "Stun",
    "Sure Hit",
    "Taunt",
  ];

  // Loop through all status icons
  for (const status of allStatus) {
    game.load.image("status-" + status, "assets/ui/Status/" + status + ".png");
  }
}

//---------------
// DESCRIPTION: Loads dialogue assets
//---------------
function preloadDialogue(game) {
  game.load.image("blank", "assets/ui/blank.png");
  game.load.image("full-blank", "assets/ui/full-blank.png");
  game.load.image("black", "assets/ui/black.png");

  game.load.image("dialogue-base", "assets/ui/dialogue-base.png");
  game.load.image("dialogue-name", "assets/ui/dialogue-name.png");
  game.load.image("dialogue-skip", "assets/ui/dialogue-skip.png");
  game.load.image("dialogue-text-mask", "assets/ui/dialogue-text-mask.png");

  game.load.image("dialogue-option", "assets/ui/dialogue-option.png");
}

//---------------
// DESCRIPTION: Loads sound effects
//---------------
function preloadSounds(game) {
  game.load.audio("select", ["assets/sounds/select-AW01.wav"]);
  game.load.audio("menu-select", ["assets/sounds/select03.mp3"]);
  game.load.audio("cancel", ["assets/sounds/cancel-AW01.wav"]);
  game.load.audio("click", ["assets/sounds/click01.mp3"]);

  game.load.audio("accept02", ["assets/sounds/accept02.mp3"]);

  game.load.audio("damage", ["assets/sounds/damage01.mp3"]);
  game.load.audio("damage-effective", ["assets/sounds/damage-effective.mp3"]);
  game.load.audio("damage-resist", ["assets/sounds/damage-resist.mp3"]);
  game.load.audio("damage-miss", ["assets/sounds/damage-miss.mp3"]);
  game.load.audio("heal", ["assets/sounds/heal01.mp3"]);

  game.load.audio("skill-use", ["assets/sounds/skill-use03.mp3"]);
  game.load.audio("skill-use-dmg", ["assets/sounds/damage03-magic.mp3"]);

  game.load.audio("np-start", ["assets/sounds/np-start01.mp3"]);
  game.load.audio("np-use", ["assets/sounds/np-use01.mp3"]);
  game.load.audio("np-damage", ["assets/sounds/np-damage01.mp3"]);

  game.load.audio("destroy", ["assets/sounds/destroy01.mp3"]);
  game.load.audio("death", ["assets/sounds/death01.mp3"]);
}

//---------------
// DESCRIPTION: Loads music tracks
//---------------
function preloadMusic(game) {
  game.load.audio("victory", ["assets/music/victory.mp3"]);
  game.load.audio("defeat", ["assets/music/solace.mp3"]);

  game.load.audio("battle01", ["assets/music/battle01.mp3"]);
  game.load.audio("battle02", ["assets/music/battle02.mp3"]);
  game.load.audio("battle03", ["assets/music/battle03.mp3"]);
  game.load.audio("battle04", ["assets/music/battle04.mp3"]);

  game.load.audio("intense01", ["assets/music/intense01.mp3"]);

  game.load.audio("japanese01", ["assets/music/japanese01.mp3"]);

  game.load.audio("map01", ["assets/music/map01.mp3"]);
}
