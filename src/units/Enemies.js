/*
* Collection of pre-loaded non-Servant units
*/

// ==========================================================
function Celtic(game, faction, unitClass) {
  // Basic info
  var name = "Celtic Soldier";
  var load = noSpaces("Celtic");
  unitClass = unitClass || classEnum.Saber;
  var image = "Celtic" + "-" + unitClass;
  var rank = rankEnum.Silver;
  var traits = [ "Human", "Humanoid", "Male" ];
  var aiType;
  if (unitClass == classEnum.Caster) { aiType = aiTypeEnum.Support; }

  // Stats
  var maxHP = defaultHP(rank);
  var attack = defaultAtk(rank);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [];

  if (unitClass == classEnum.Caster) {
    activeSkills.push(new Skill("Panacea", "skill-Heal",
      skillTypeEnum.Ally, "skillHeal", servantCooldown(5), 2,
      ["Recovers the HP of one ally by 15."]),
    );
  }
  else {
    activeSkills.push(new Skill("Roar of Victory", "skill-Attack Up",
      skillTypeEnum.Self, "skillAttackUp", servantCooldown(7), 0,
      ["Increases own attack by 10% for 3 turns."]),
    );
  }

  // Passive Skills
  var passiveSkills = [
    new Skill("Magic Resistance (Low)", "skill-Magic Resistance",
              skillTypeEnum.Passive, "skillMagicResLow", 0, 0,
              "Increases own debuff resistance by 10%."),
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
function Chimera(game, faction, unitClass) {
  // Basic info
  var name = "Chimera";
  var load = noSpaces(name);
  unitClass = unitClass || classEnum.Berserker;
  var image = name;
  var rank = rankEnum.Gold;
  var traits = [ "Beast" ];
  var aiType = aiTypeEnum.Offensive;

  // Stats
  var maxHP = defaultHP(rank);
  var attack = defaultAtk(rank);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Roar", "skill-Attack Up",
              skillTypeEnum.Self, "skillAttackUp20", servantCooldown(8), 0,
              ["Increases own attack by 20% for 3 turns."]),
    new Skill("Paralyze Breath", "skill-Stun",
              skillTypeEnum.Enemy, "skillStun", servantCooldown(8), 1,
              ["75% chance to Stun one enemy for 1 turn."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Magic Resistance", "skill-Magic Resistance",
              skillTypeEnum.Passive, "skillMagicResA", 0, 0,
              "Increases own debuff resistance by 20%."),
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
  var maxHP = defaultHP(rank);
  var attack = defaultAtk(rank);
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
function DemonBoarGiant(game, faction, unitClass) {
  // Basic info
  var name = "Giant Demon Boar";
  var load = noSpaces("DemonBoarGiant");
  unitClass = unitClass || classEnum.Berserker;
  var image = name;
  var rank = rankEnum.Gold;
  var traits = [ "Beast", "Demonic", "Large" ];
  var aiType = aiTypeEnum.Offensive;

  // Stats
  var maxHP = defaultHP(rank);
  var attack = defaultAtk(rank);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Extreme Rage", "skill-Attack Up",
              skillTypeEnum.Self, "skillAttackUp", servantCooldown(7), 0,
              ["Increases own attack by 10% for 3 turns."]),
    new Skill("Agitation", "skill-NP Charge",
               skillTypeEnum.Self, "skillNPGain", servantCooldown(8), 0,
               ["Charges own NP gauge by 1.5 bars."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Riding", "skill-Riding",
              skillTypeEnum.Passive, "skillRiding", 0, 0,
              "Increases own movement range by 1."),
    new Skill("Tough Hide", "skill-Defense Up",
              skillTypeEnum.Passive, "skillShapeshift", 0, 0,
              "Increases own defense by 10%."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Raging Trampling Wave", "Phantasmal Demonic Boar",
    npTypeEnum.AoEdir, "npDamageDefense", npStrengthAoE(), 4,
    ["Deals 200% damage to enemies in range.",
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
  var maxHP = defaultHP(rank);
  var attack = defaultAtk(rank);
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
function FairyTale(game, faction, unitClass) {
  // Basic info
  var name = "Fairy Tale";
  var load = noSpaces(name);
  unitClass = unitClass || classEnum.Caster;
  var image = name;
  var rank = rankEnum.Bronze;
  var traits = [  ];
  var aiType;

  // Stats
  var maxHP = defaultHP(rank);
  var attack = defaultAtk(rank);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Uplifting Story", "skill-Heal",
      skillTypeEnum.Ally, "skillHeal", servantCooldown(5), 2,
      ["Recovers the HP of one ally by 15."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Magic Resistance (Low)", "skill-Magic Resistance",
              skillTypeEnum.Passive, "skillMagicResLow", 0, 0,
              "Increases own debuff resistance by 10%."),
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
function GolemRock(game, faction, unitClass) {
  // Basic info
  var name = "Rock Golem";
  var load = noSpaces("GolemRock");
  unitClass = unitClass || classEnum.Berserker;
  var image = "Golem Rock";
  var rank = rankEnum.Bronze;
  var traits = [];
  var aiType;

  // Stats
  var maxHP = defaultHP(rank);
  var attack = defaultAtk(rank);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Hardening", "skill-Defense Up",
              skillTypeEnum.Self, "skillDefenseUp20", servantCooldown(8), 0,
              ["Increases own defense by 20% for 3 turns."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Rock Body", "skill-Defense Up",
              skillTypeEnum.Passive, "skillShapeshift", 0, 0,
              "Increases own defense by 10%."),
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
function GolemStone(game, faction, unitClass) {
  // Basic info
  var name = "Stone Golem";
  var load = noSpaces("GolemStone");
  unitClass = unitClass || classEnum.Berserker;
  var image = "Golem Stone";
  var rank = rankEnum.Bronze;
  var traits = [];
  var aiType;

  // Stats
  var maxHP = defaultHP(rank);
  var attack = defaultAtk(rank);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Rebuild", "skill-Heal",
              skillTypeEnum.Self, "skillRebuild", servantCooldown(8), 0,
              ["Recovers own HP by 40.",
               "Permanently Reduces own defense by 20%. [Demerit]"]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Stone Body", "skill-Defense Up",
              skillTypeEnum.Passive, "skillShapeshift", 0, 0,
              "Increases own defense by 10%."),
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
function GolemIron(game, faction, unitClass) {
  // Basic info
  var name = "Iron Golem";
  var load = noSpaces("GolemIron");
  unitClass = unitClass || classEnum.Berserker;
  var image = "Golem Iron";
  var rank = rankEnum.Silver;
  var traits = [];
  var aiType;

  // Stats
  var maxHP = defaultHP(rank);
  var attack = defaultAtk(rank);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Steel Hardening", "skill-Defense Up",
              skillTypeEnum.Self, "skillDefenseUp50", servantCooldown(6), 0,
              ["Increases own defense by 50% for 2 turns."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Iron Body", "skill-Defense Up",
              skillTypeEnum.Passive, "skillShapeshift20", 0, 0,
              "Increases own defense by 20%."),
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
function GolemCrystal(game, faction, unitClass) {
  // Basic info
  var name = "Crystal Golem";
  var load = noSpaces("GolemCrystal");
  unitClass = unitClass || classEnum.Berserker;
  var image = "Golem Crystal";
  var rank = rankEnum.Silver;
  var traits = [];
  var aiType;

  // Stats
  var maxHP = defaultHP(rank);
  var attack = defaultAtk(rank);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Light Emission", "skill-Regen",
              skillTypeEnum.Self, "skillRegenHeal", servantCooldown(6), 0,
              ["Recovers own HP by 15. Recovers own HP by 10 every turn for 5 turns."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Crystal Body", "skill-Defense Up",
              skillTypeEnum.Passive, "skillShapeshift20", 0, 0,
              "Increases own defense by 20%."),
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
  var maxHP = defaultHP(rank);
  var attack = defaultAtk(rank);
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
  var maxHP = defaultHP(rank);
  var attack = defaultAtk(rank);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Protection from Wind", "skill-Evasion",
              skillTypeEnum.Self, "skillEvasionAtk", servantCooldown(7), 0,
              ["Grants self Evasion for 2 attacks."]),
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
  var maxHP = defaultHP(rank);
  var attack = defaultAtk(rank);
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
function Pig(game, faction, unitClass) {
  // Basic info
  var name = "Pig";
  var load = noSpaces(name);
  unitClass = unitClass || classEnum.Rider;
  var image = name;
  var rank = rankEnum.Bronze;
  var traits = [ "Beast" ];
  var aiType = aiTypeEnum;

  // Stats
  var maxHP = defaultHP(rank);
  var attack = defaultAtk(rank);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [];

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
function RomanSoldier(game, faction, unitClass) {
  // Basic info
  var name = "Roman Soldier";
  var load = noSpaces(name);
  unitClass = unitClass || classEnum.Saber;
  var image = name;
  var rank = rankEnum.Bronze;
  var traits = [ "Human", "Humanoid", "Male", "Roman" ];
  var aiType;

  // Stats
  var maxHP = defaultHP(rank);
  var attack = defaultAtk(rank);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Attack Stance", "skill-Attack Up",
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
  var maxHP = defaultHP(rank);
  var attack = defaultAtk(rank);
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
  var maxHP = defaultHP(rank);
  var attack = defaultAtk(rank);
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

// ==========================================================
function Spriggan(game, faction, unitClass) {
  // Basic info
  var name = "Spriggan";
  var load = noSpaces(name);
  unitClass = unitClass || classEnum.Saber;
  var image = name;
  var rank = rankEnum.Gold;
  var traits = [ "Large" ];
  var aiType = aiTypeEnum;

  // Stats
  var maxHP = defaultHP(rank);
  var attack = defaultAtk(rank);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Gaurdian's Fighting Spirit", "skill-Damage Up",
              skillTypeEnum.Self, "skillAttackUp50", servantCooldown(4), 0,
              ["Increases own attack by 50% for 1 turn."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Stone Body", "skill-Defense Up",
              skillTypeEnum.Passive, "skillShapeshift", 0, 0,
              "Increases own defense by 10%."),
    new Skill("Magic Resistance", "skill-Magic Resistance",
              skillTypeEnum.Passive, "skillMagicResA", 0, 0,
              "Increases own debuff resistance by 20%."),
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
function Tarasque(game, faction, unitClass) {
  // Basic info
  var name = "Tarasque";
  var load = noSpaces(name);
  unitClass = unitClass || classEnum.Rider;
  var image = name;
  var rank = rankEnum.Gold;
  var traits = [ "Beast", "Dragon" ];
  var aiType = aiTypeEnum.Offensive;

  // Stats
  var maxHP = defaultHP(rank) - 50;
  var attack = defaultAtk(rank) - 10;
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Roar", "skill-Attack Up",
              skillTypeEnum.Self, "skillAttackUp20", servantCooldown(8), 0,
              ["Increases own attack by 20% for 3 turns."]),
    new Skill("Dragon Shell", "skill-Defense Up",
              skillTypeEnum.Self, "skillTauntDef", servantCooldown(8), 0,
              ["Draws attention of enemies to self for 1 turn. Increases own defense by 20% for 3 turns."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Magic Resistance", "skill-Magic Resistance",
              skillTypeEnum.Passive, "skillMagicResA", 0, 0,
              "Increases own debuff resistance by 20%."),
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
