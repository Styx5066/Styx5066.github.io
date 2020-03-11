/*
* Collects lists of available Servants and Enemies
*
* ----------------------
*  Steps to add a Unit
* ----------------------
*  1) Waifu their expression sheet to reduce artifacting (less useful for enemy sprites)
*
*  2) Get the full image to a height of 626px and add to "full" folder
*
*  3) Scale by 50% and size using "token base.xcf"; save 130px image to "portrait" folder
*
*  4) Scale portrait to 60px and save to "token" folder
*
*  5) Create loading code in appropriate js file
*
*  6) Add to appropriate function below
*
*/

//---------------
// DESCRIPTION: Returns array of units for all Servants in the game
// PARAMS:
//  game    (I,REQ) - Game object
//  faction (I,OPT) - Faction of the unit
//  summon  (I,OPT) - If true, only return summonable Servants
//---------------
function getAllServants(game, faction, summon) {
  var load = [];
  var servants = [];

  // ==============================
  //   Summonable
  // ==============================
  // Saber
  load.push("ArtoriaAlter");      // Gold
  load.push("Nero");              // Gold
  load.push("Musashi");           // Gold
  load.push("ArtoriaLily");       // Silver
  load.push("Bedivere");          // Silver
  load.push("ChevalierdEon");     // Silver
  load.push("Jason");             // Bronze

  // Archer
  load.push("AnneBonny");         // Gold
  load.push("Atalanta");          // Gold
  load.push("Gilgamesh");         // Gold
  load.push("Kuro");              // Gold
  load.push("BillytheKid");       // Silver
  load.push("RobinHood");         // Silver
  load.push("Arash");             // Bronze

  // Lancer
  load.push("ArtoriaLancer");     // Gold
  load.push("ElizabethBathory");  // Gold
  load.push("Scathach");          // Gold
  load.push("CuChulainn");        // Silver
  load.push("Diarmuid");          // Silver
  load.push("Gareth");            // Bronze
  load.push("Leonidas");          // Bronze

  // Rider
  load.push("Astolfo");           // Gold
  load.push("Medb");              // Gold
  load.push("MaryRead");          // Gold
  load.push("SaintMartha");       // Gold
  load.push("Medusa");            // Silver
  load.push("Blackbeard");        // Bronze
  load.push("Boudica");           // Bronze

  // Caster
  load.push("Circe");             // Gold
  load.push("MedeaLily");         // Gold
  load.push("Nitocris");          // Gold
  load.push("Tamamo");            // Gold
  load.push("Medea");             // Silver
  load.push("NurseryRhyme");      // Silver
  load.push("Andersen");          // Bronze

  // Assassin
  load.push("JacktheRipper");     // Gold
  load.push("Semiramis");         // Gold
  load.push("SerenityHassan");    // Gold
  load.push("HundredHassan");     // Silver
  load.push("CursedArmHassan");   // Bronze
  load.push("MataHari");          // Bronze
  load.push("SasakiKojirou");     // Bronze

  // Berserker
  load.push("Heracles");          // Gold
  load.push("Nightingale");       // Gold
  load.push("Frankenstein");      // Gold
  load.push("Lancelot");          // Gold
  load.push("Kiyohime");          // Silver
  load.push("PaulBunyan");        // Bronze
  load.push("Spartacus");         // Bronze


  // ==============================
  //   Not Summonable
  // ==============================
  if (!summon) {
    // Saber
    load.push("Artemis");         // Gold

    // Archer


    // Lancer


    // Rider


    // Caster


    // Assassin


    // Berserker

  }

  // ==============================

  // Processing
  for (var i = 0; i < load.length; i++) {
    servants.push(window[ load[i] ](game, faction));
  }

  return servants;
}

//---------------
// DESCRIPTION: Returns array of units for all Enemies in the game
// PARAMS:
//  game    (I,REQ) - Game object
//  faction (I,OPT) - Faction of the unit
//---------------
function getAllEnemies(game, faction) {
  var load = [];
  var enemies = [];

  // ==============================
  //   General
  // ==============================
  load.push({ name: "Celtic", classes: ["Saber", "Archer", "Lancer", "Caster"] });
  load.push({ name: "Chimera" });
  load.push({ name: "DemonBoar" });
  load.push({ name: "DemonBoarGiant" });
  load.push({ name: "DragonToothWarrior", classes: ["Saber", "Archer", "Assassin"] });
  load.push({ name: "FairyTale" });

  load.push({ name: "GolemRock" });
  load.push({ name: "GolemStone" });
  load.push({ name: "GolemIron" });
  load.push({ name: "GolemCrystal" });

  load.push({ name: "HassanGozuru" });
  load.push({ name: "HassanMakuru" });
  load.push({ name: "HassanZayd" });

  load.push({ name: "Pig" });
  load.push({ name: "RomanSoldier" });
  load.push({ name: "Soldier" });
  load.push({ name: "Skeleton", classes: ["Saber", "Archer", "Lancer"] });
  load.push({ name: "Spriggan" });
  load.push({ name: "Tarasque" });
  // ==============================

  // Processing
  for (var i = 0; i < load.length; i++) {
    var classes = load[i].classes;

    if (!classes) { enemies.push(window[ load[i].name ](game, faction)); }
    else { for (const cls of classes) {
      enemies.push(window[ load[i].name ](game, faction, cls));
    } }
  }

  return enemies;
}
