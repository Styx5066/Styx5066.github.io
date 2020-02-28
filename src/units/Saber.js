/*
* Collection of pre-loaded Servants
*/

// ==========================================================
function Artemis(game, faction) {
  // Basic info
  var name = "Artemis";
  var load = noSpaces(name);
  var unitClass = classEnum.Saber;
  var image = name;
  var rank = rankEnum.Gold;
  var traits = [ "Undead", "Vampire", "Female", "Humanoid", "Weak to Enuma Elish" ];
  var aiType;

  var intro = [];

  // Stats
  var maxHP = servantHP(11589);
  var attack = servantAtk(10248);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Vampire Bite", "skill-Mad Enhancement",
              skillTypeEnum.Enemy, "skillVampire", servantCooldown(7), 1,
              ["Deals 125& damage to one enemy. Recovers own HP by 2/3rds of the damage dealt."]),
    new Skill("Supernatural Reflexes", "skill-Evasion",
              skillTypeEnum.Self, "skillEvasionAtk", servantCooldown(7), 0,
              ["Grants self Evasion for 2 attacks."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Magic Resistance", "skill-Magic Resistance",
              skillTypeEnum.Passive, "skillMagicResA", 0, 0,
              "Increases own debuff resistance by 20%."),
    new Skill("Vampiric Regeneration", "skill-Regen",
              skillTypeEnum.Passive, "skillRegenPassive", 0, 0,
              "Recovers HP by 5 every turn."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Mystery Killer", "Kokoro-Watari",
    npTypeEnum.Single, "npArtemis", npStrengthSingle(), 1,
    ["Deals 300% damage to one enemy. Deals an extra 50% damage to enemies with the Demonic, Servant, or Undead trait.",
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
function ArtoriaAlter(game, faction) {
  // Basic info
  var name = "Artoria Alter";
  var load = noSpaces(name);
  var unitClass = classEnum.Saber;
  var image = name;
  var rank = rankEnum.Gold;
  var traits = [ "Arthur", "Dragon", "Female", "King", "Humanoid", "Saberface", "Servant", "Weak to Enuma Elish" ];
  var aiType;

  var intro = [ "...I have come in response to your summon. Are you the one who is to be my Master?"];

  // Stats
  var maxHP = servantHP(11589);
  var attack = servantAtk(10248);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Mana Burst", "skill-Damage Up",
              skillTypeEnum.Self, "skillAttackUp40", servantCooldown(7), 0,
              ["Increases own attack by 40% for 1 turn."]),
    new Skill("Twilight Star", "skill-NP Charge",
              skillTypeEnum.Self, "skillTwilight", servantCooldown(7), 0,
              ["Increases own defense by 10% for 3 turns and charges own NP gauge by 1 bar."])
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Magic Resistance", "skill-Magic Resistance",
              skillTypeEnum.Passive, "skillMagicResA", 0, 0,
              "Increases own debuff resistance by 20%."),
    new Skill("Black Armor", "skill-Defense Up",
              skillTypeEnum.Passive, "skillShapeshift", 0, 0,
              "Increases own defense by 10%."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Excalibur Morgan", "Sword of Promised Victory",
    npTypeEnum.AoEdir, "npExcalibur", npStrengthAoE(), 4,
    ["Deals 200% damage to enemies in range. Increases own NP gauge by 1 bar.",
     "Range: A line of 4 spaces in one direction."]);
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
function Musashi(game, faction) {
  // Basic info
  var name = "Miyamoto Musashi";
  var load = noSpaces("Musashi");
  var unitClass = classEnum.Saber;
  var image = "Musashi";
  var rank = rankEnum.Gold;
  var traits = [ "Humanoid", "Female", "Servant", "Weak to Enuma Elish" ];
  var aiType;

  var intro = [ "Shinmen Musashi-no-Kami Fujiwara-no-Harunob... Sorry, let me start over!",
                "Servant Saber, Shinmen Musashi at your service! Make my stay a fun one, Master!" ];

  // Stats
  var maxHP = servantHP(13635);
  var attack = servantAtk(12037);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Fifth Form", "skill-Fifth Form",
              skillTypeEnum.Self, "skillFifthForm", servantCooldown(8), 0,
              ["Next normal attack hits twice and charges NP Gauge by one bar."]),
    new Skill("Nothingness", "skill-Invincible",
              skillTypeEnum.Self, "skillNothingness", servantCooldown(8), 0,
              ["Grants self Invincible for 1 turn. Removes own debuffs."])
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Magic Resistance", "skill-Magic Resistance",
              skillTypeEnum.Passive, "skillMagicResA", 0, 0,
              "Increases own debuff resistance by 20%."),
    new Skill("Empyrean Eye", "skill-Pierce Invincible",
              skillTypeEnum.Passive, "skillEmpyreanEye", 0, 0,
              "Attacks ignore the Invincible status. Increases own attack by 10%."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Rikudou Gorin - Kurikara Tenshou", "Six Realms Five Planes - The Divine Figure of Kurikara",
    npTypeEnum.Single, "npDamageBuffRemove", (npStrengthSingle() + 0.5), 1,
    ["Deals 350% damage to one enemy and removes their buffs.",
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
