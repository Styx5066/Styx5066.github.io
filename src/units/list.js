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
  load.push("Bedivere");          // Silver
  load.push("ChevalierdEon");     // Silver
  load.push("Jason");             // Bronze
  load.push("Nero");              // Gold

  // Archer
  load.push("Arash");             // Bronze
  load.push("Kuro");              // Gold
  load.push("RobinHood");         // Silver
  load.push("AnneBonny");         // Gold
  // Gilgamesh (NP deals damage to ALL enemies, but only usable once per battle)

  // Lancer
  load.push("CuChulainn");        // Silver
  load.push("ElizabethBathory");  // Gold
  load.push("Leonidas");          // Bronze
  load.push("Scathach");          // Gold

  // Rider
  load.push("Astolfo");           // Gold
  load.push("Boudica");           // Bronze
  load.push("Medusa");            // Silver
  load.push("MaryRead");          // Gold

  // Caster
  load.push("Andersen");          // Bronze
  load.push("Medea");             // Silver
  load.push("MedeaLily");         // Gold
  load.push("Tamamo");            // Gold

  // Assassin
  load.push("CursedArmHassan");   // Bronze
  load.push("HundredHassan");     // Silver
  load.push("SasakiKojirou");     // Bronze
  load.push("SerenityHassan");    // Gold

  // Berserker
  load.push("Heracles");          // Gold
  load.push("Kiyohime");          // Silver
  load.push("PaulBunyan");        // Bronze
  load.push("Spartacus");         // Bronze


  // ==============================
  //   Not Summonable
  // ==============================
  if (!summon) {
    // Saber


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
  load.push({ name: "DemonBoar" });
  load.push({ name: "DragonToothWarrior", classes: ["Saber", "Archer", "Assassin"] });
  load.push({ name: "Soldier" });
  load.push({ name: "Skeleton",           classes: ["Saber", "Archer", "Lancer"] });

  load.push({ name: "HassanGozuru" });
  load.push({ name: "HassanMakuru" });
  load.push({ name: "HassanZayd" });


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
