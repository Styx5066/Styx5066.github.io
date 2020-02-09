/*
* Collection of pre-loaded non-Servant units
*/

// ==========================================================
function DemonBoar(game, faction, unitClass) {
  // Basic info
  var name = "Demon Boar";
  var load = noSpaces(name);
  unitClass = unitClass || classEnum.Berserker;
  var image = name;
  var rank = rankEnum.Silver;
  var traits = [ "Beast", "Demonic"  ];
  var aiType = aiTypeEnum.Offensive;

  // Stats
  var maxHP = 85;
  var attack = 70;
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Tough Hide", "skill-Defense Up",
              skillTypeEnum.Self, "skillDefenseUp20", servantCooldown(8), 0,
              ["Increases own defense by 20% for 3 turns."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Riding", "skill-Riding",
              skillTypeEnum.Passive, "skillRiding", 0, 0,
              "Increases own movement range by 1."),
  ];

  // Noble Phantasm
  var noblePhantasm;
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
    null,                 // Intro dialogue
    load,                 // Loading function
    aiType                // AI Type
  );
}
// ==========================================================

// ==========================================================
function DragonToothWarrior(game, faction, unitClass) {
  // Basic info
  var name = "Dragon Tooth Warrior";
  var load = noSpaces(name);
  unitClass = unitClass || classEnum.Assassin;
  var image = name + "-" + unitClass;
  var rank = rankEnum.Bronze;
  var traits = [];
  var aiType;

  // Stats
  var maxHP = 50;
  var attack = 50;
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Scream", "skill-Attack Up",
              skillTypeEnum.Self, "skillAttackUp", servantCooldown(7), 0,
              ["Increases own attack by 10% for 3 turns."]),
  ];

  // Passive Skills
  var passiveSkills = [];

  // Noble Phantasm
  var noblePhantasm;
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
    null,                 // Intro dialogue
    load,                 // Loading function
    aiType                // AI Type
  );
}
// ==========================================================

// ==========================================================
function HassanGozuru(game, faction, unitClass) {
  // Basic info
  var name = "Gozuru the Remarkable";
  var load = noSpaces("Hassan Gozuru");
  unitClass = unitClass || classEnum.Assassin;
  var image = "Hassan Gozuru";
  var rank = rankEnum.Bronze;
  var traits = [ "Servant", "Humanoid", "Male" ];
  var aiType;

  // Stats
  var maxHP = 50;
  var attack = 50;
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Monstrous Strength", "skill-Attack Up",
              skillTypeEnum.Self, "skillAttackUp20", servantCooldown(8), 0,
              ["Increases own attack by 20% for 3 turns."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Shadow", "skill-Shadow",
              skillTypeEnum.Passive, "skillManual", 0, 0,
              "Able to pass through enemies."),
  ];

  // Noble Phantasm
  var noblePhantasm;
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
    null,                 // Intro dialogue
    load,                 // Loading function
    aiType                // AI Type
  );
}
// ==========================================================

// ==========================================================
function HassanMakuru(game, faction, unitClass) {
  // Basic info
  var name = "Makuru the Quick";
  var load = noSpaces("Hassan Makuru");
  unitClass = unitClass || classEnum.Assassin;
  var image = "Hassan Makuru";
  var rank = rankEnum.Bronze;
  var traits = [ "Servant", "Humanoid", "Male" ];
  var aiType;

  // Stats
  var maxHP = 50;
  var attack = 50;
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Protection from Wind", "skill-Evasion",
              skillTypeEnum.Self, "skillEvasionAtk", servantCooldown(7), 0,
              ["Grants self Evasion for 3 attacks."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Shadow", "skill-Shadow",
              skillTypeEnum.Passive, "skillManual", 0, 0,
              "Able to pass through enemies."),
  ];

  // Noble Phantasm
  var noblePhantasm;
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
    null,                 // Intro dialogue
    load,                 // Loading function
    aiType                // AI Type
  );
}
// ==========================================================

// ==========================================================
function HassanZayd(game, faction, unitClass) {
  // Basic info
  var name = "Zayd the Base";
  var load = noSpaces("Hassan Zayd");
  unitClass = unitClass || classEnum.Assassin;
  var image = "Hassan Zayd";
  var rank = rankEnum.Bronze;
  var traits = [ "Servant", "Humanoid", "Male" ];
  var aiType;

  // Stats
  var maxHP = 50;
  var attack = 50;
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Presence Concealment", "skill-Presence Concealment",
              skillTypeEnum.Self, "skillPresenceConcealment", servantCooldown(9), 0,
              ["Hides self from enemies for 3 turns or until you attack."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Shadow", "skill-Shadow",
              skillTypeEnum.Passive, "skillManual", 0, 0,
              "Able to pass through enemies."),
  ];

  // Noble Phantasm
  var noblePhantasm;
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
    null,                 // Intro dialogue
    load,                 // Loading function
    aiType                // AI Type
  );
}
// ==========================================================

// ==========================================================
function Soldier(game, faction, unitClass) {
  // Basic info
  var name = "Soldier";
  var load = noSpaces(name);
  unitClass = unitClass || classEnum.Saber;
  var image = name;
  var rank = rankEnum.Bronze;
  var traits = [ "Human", "Humanoid", "Male" ];
  var aiType;

  // Stats
  var maxHP = 50;
  var attack = 50;
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Guard", "skill-Defense Up",
              skillTypeEnum.Self, "skillDefenseUp", servantCooldown(7), 0,
              ["Increases own defense by 10% for 3 turns."]),
  ];

  // Passive Skills
  var passiveSkills = [];

  // Noble Phantasm
  var noblePhantasm;
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
    null,                 // Intro dialogue
    load,                 // Loading function
    aiType                // AI Type
  );
}
// ==========================================================

// ==========================================================
function Skeleton(game, faction, unitClass) {
  // Basic info
  var name = "Skeleton";
  var load = noSpaces(name);
  unitClass = unitClass || classEnum.Saber;
  var image = name + "-" + unitClass;
  var rank = rankEnum.Bronze;
  var traits = [ "Demonic", "Undead" ];
  var aiType;

  // Stats
  var maxHP = 50;
  var attack = 50;
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Stand Ready", "skill-Attack Up",
              skillTypeEnum.Self, "skillAttackUp", servantCooldown(7), 0,
              ["Increases own attack by 10% for 3 turns."]),
  ];

  // Passive Skills
  var passiveSkills = [];

  // Noble Phantasm
  var noblePhantasm;
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
    null,                 // Intro dialogue
    load,                 // Loading function
    aiType                // AI Type
  );
}
// ==========================================================
