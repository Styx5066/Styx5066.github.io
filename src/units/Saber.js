/*
* Collection of pre-loaded Servants
*/

// ==========================================================
function Bedivere(game, faction) {
  // Basic info
  var name = "Bedivere";
  var load = noSpaces(name);
  var unitClass = classEnum.Saber;
  var image = name;
  var rank = rankEnum.Silver;
  var traits = [ "Brynhildr's Beloved", "Humanoid", "Male", "Riding", "Servant", "Weak to Enuma Elish" ];
  var aiType;

  var intro = [ "Saber, Bedivere. Henceforth, I shall become your Servant.",
                "I believe that is for the sake of my king." ];

  // Stats
  var maxHP = servantHP(9595);
  var attack = servantAtk(7627);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Calm and Collected", "skill-NP Charge",
              skillTypeEnum.Self, "skillCalm", servantCooldown(8), 0,
              ["Increases own debuff resistance by 15% for 3 turns and charges own NP gauge by 1 bar."]),
    new Skill("Oath of Protector", "skill-Defense Up",
              skillTypeEnum.AllyBurst, "skillProtector", servantCooldown(7), 1,
              ["Increases defense and debuff resistance of allies in range including self by 30% for 1 turn."])
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Magic Resistance", "skill-Magic Resistance",
              skillTypeEnum.Passive, "skillMagicResA", 0, 0,
              "Increases own debuff resistance by 20%."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Switch On - Airgetlám", "Take Up a Sword, Silver-Colored Arm",
    npTypeEnum.Single, "npBedivere", npStrengthSingle(), 1,
    ["Increases own attack by 50% for 1 turn and deals 300% damage to one enemy.",
     "Range: 1 adjacent enemy."]);
  var npChargeTime;

  // ---------------
  return new Unit(
    game,                 // Game object
    name,                 // Unit name
    image,                // Portrait image
    faction,              // Faction
    unitClass,            // Class
    rank,                 // Rank
    maxHP,                // Max HP
    attack,               // Attack
    attackRange   || defaultAtkRange(unitClass), // Attack range
    movementRange || defaultMovement(unitClass), // Movement range
    movementType,         // Movement Type
    noblePhantasm,        // Noble Phantasm
    npChargeTime  || defaultNPCharge(unitClass), // NP Charge
    activeSkills,         // Active Skills
    passiveSkills,        // Passive Skills
    traits,               // Traits
    intro,                // Intro dialogue
    load,                 // Loading function
    aiType                // AI Type
  );
}
// ==========================================================

// ==========================================================
function ChevalierdEon(game, faction) {
  // Basic info
  var name = "Chevalier d'Eon";
  var load = noSpaces("ChevalierdEon");
  var unitClass = classEnum.Saber;
  var image = name;
  var rank = rankEnum.Silver;
  var traits = [ "Humanoid", "Riding", "Servant", "Weak to Enuma Elish" ];
  var aiType;

  var intro = [ "My name is Chevalier d'Eon. I am the knight that will protect you and the royalty of France...",
                "As of the Knight of the White Lily!"];

  // Stats
  var maxHP = servantHP(13256);
  var attack = servantAtk(8765);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Eye of the Mind (True)", "skill-Evasion",
              skillTypeEnum.Self, "skillEvasionDef", servantCooldown(8), 0,
              ["Grants self Evasion for 1 turn. Increases own defense by 10% for 3 turns."]),
    new Skill("Looks of Loveliness", "skill-Loveliness",
              skillTypeEnum.Self, "skillLoveliness", servantCooldown(7), 0,
              ["Draws attention of enemies to self for 3 turns. Recovers 20 HP."])
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Magic Resistance (Low)", "skill-Magic Resistance",
              skillTypeEnum.Passive, "skillMagicResLow", 0, 0,
              "Increases own debuff resistance by 10%."),
    new Skill("Shadow", "skill-Shadow",
              skillTypeEnum.Passive, "skillManual", 0, 0,
              "Able to pass through enemies."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Fleur de Lys", "Gorgeous Splendor of Blooming Lillies",
    npTypeEnum.AoEburst, "npChevalier", -1, 1,
    ["Reduces Attack and Defense of enemies in range by 20% for 3 turns. Charms them for 1 turn.",
     "Range: 4 spaces adjacent to the user."]);
  var npChargeTime;

  // ---------------
  return new Unit(
    game,                 // Game object
    name,                 // Unit name
    image,                // Portrait image
    faction,              // Faction
    unitClass,            // Class
    rank,                 // Rank
    maxHP,                // Max HP
    attack,               // Attack
    attackRange   || defaultAtkRange(unitClass), // Attack range
    movementRange || defaultMovement(unitClass), // Movement range
    movementType,         // Movement Type
    noblePhantasm,        // Noble Phantasm
    npChargeTime  || defaultNPCharge(unitClass), // NP Charge
    activeSkills,         // Active Skills
    passiveSkills,        // Passive Skills
    traits,               // Traits
    intro,                // Intro dialogue
    load,                 // Loading function
    aiType                // AI Type
  );
}
// ==========================================================

// ==========================================================
function Jason(game, faction) {
  // Basic info
  var name = "Jason";
  var load = noSpaces(name);
  var unitClass = classEnum.Saber;
  var image = name;
  var rank = rankEnum.Bronze;
  var traits = [ "Argo-Related", "Brynhildr's Beloved", "Greek Mythology Males", "Humanoid", "Male", "Riding", "Servant", "Weak to Enuma Elish" ];
  var aiType;

  var intro = [ "Saber, Jason. I have arrived according to your summoning. I’m a hero, but before that I’m a captain.",
                "Okay? Be careful not to send me to the front. Don’t ever send me out!" ];

  // Stats
  var maxHP = servantHP(7575);
  var attack = servantAtk(5457);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("The Requested Golden Fleece", "skill-Heal",
              skillTypeEnum.Ally, "skillHealFleece", servantCooldown(6), 0,
              ["Recovers the HP of one ally by 15. Removes one of their debuffs."]),
    new Skill("Conquering the Distant Sea Routes", "skill-Attack Up",
              skillTypeEnum.AllyBurst, "skillArgo", servantCooldown(8), 1,
              ["Increases attack of allies in range including self by 10% for 3 turns.",
               "For Argo-Related allies except self: further increases their attack by 10% for 3 turns and charges their NP gauge by 1 bar."])
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Magic Resistance", "skill-Magic Resistance",
              skillTypeEnum.Passive, "skillMagicResA", 0, 0,
              "Increases own debuff resistance by 20%."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Astrapste Argo", "The Dazzling Ship that Splits the Heavens",
    npTypeEnum.AoEburst, "npJason", npStrengthAoE(), 1,
    ["Deals 200% damage to enemies in range. Deals an extra 50% damage for each Argo-Related ally on the field except self.",
     "Range: 4 spaces adjacent to the user."]);
  var npChargeTime;

  // ---------------
  return new Unit(
    game,                 // Game object
    name,                 // Unit name
    image,                // Portrait image
    faction,              // Faction
    unitClass,            // Class
    rank,                 // Rank
    maxHP,                // Max HP
    attack,               // Attack
    attackRange   || defaultAtkRange(unitClass), // Attack range
    movementRange || defaultMovement(unitClass), // Movement range
    movementType,         // Movement Type
    noblePhantasm,        // Noble Phantasm
    npChargeTime  || defaultNPCharge(unitClass), // NP Charge
    activeSkills,         // Active Skills
    passiveSkills,        // Passive Skills
    traits,               // Traits
    intro,                // Intro dialogue
    load,                 // Loading function
    aiType                // AI Type
  );
}
// ==========================================================

// ==========================================================
function Nero(game, faction) {
  // Basic info
  var name = "Nero";
  var load = noSpaces(name);
  var unitClass = classEnum.Saber;
  var image = name;
  var rank = rankEnum.Gold;
  var traits = [ "Female", "Humanoid", "King", "Riding", "Roman", "Saberface", "Servant", "Weak to Enuma Elish" ];
  var aiType;

  var intro = [ "Servant Saber, Nero Claudius, has arrived in response to your call!", "Umu, you have chosen correctly! "];

  // Stats
  var maxHP = servantHP(11753);
  var attack = servantAtk(9449);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Goblet of Wealth", "skill-NP Charge",
              skillTypeEnum.Self, "skillNPHeal", servantCooldown(7), 0,
              ["Recovers 40 HP and charges own NP gauge by 1 bar."]),
    new Skill("Thrice-Setting Sun", "skill-Guts",
              skillTypeEnum.Self, "skillGutsThree", servantCooldown(12), 0,
              ["Grants self Guts status for 3 times over 5 turns."])
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Magic Resistance", "skill-Magic Resistance",
              skillTypeEnum.Passive, "skillMagicResA", 0, 0,
              "Increases own debuff resistance by 20%."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Laus Saint Claudius", "Imperium of the Maiden's Flowery Words",
    npTypeEnum.AoEburst, "npNero", npStrengthAoE(), 1,
    ["Deals 200% damage that ignores defense buffs to enemies in range. Reduces their defense by 20% for 1 turn.",
     "Range: 4 spaces adjacent to the user."]);
  var npChargeTime;

  // ---------------
  return new Unit(
    game,                 // Game object
    name,                 // Unit name
    image,                // Portrait image
    faction,              // Faction
    unitClass,            // Class
    rank,                 // Rank
    maxHP,                // Max HP
    attack,               // Attack
    attackRange   || defaultAtkRange(unitClass), // Attack range
    movementRange || defaultMovement(unitClass), // Movement range
    movementType,         // Movement Type
    noblePhantasm,        // Noble Phantasm
    npChargeTime  || defaultNPCharge(unitClass), // NP Charge
    activeSkills,         // Active Skills
    passiveSkills,        // Passive Skills
    traits,               // Traits
    intro,                // Intro dialogue
    load,                 // Loading function
    aiType                // AI Type
  );
}
// ==========================================================
