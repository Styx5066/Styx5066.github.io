/*
* Collection of pre-loaded Servants
*/

// ==========================================================
function AnneBonny(game, faction) {
  // Basic info
  var name = "Anne Bonny";
  var load = noSpaces(name);
  var unitClass = classEnum.Archer;
  var image = name;
  var rank = rankEnum.Gold;
  var traits = [ "Female", "Humanoid", "Servant", "Weak to Enuma Elish" ];
  var aiType = aiTypeEnum;

  var intro = ["I'm Anne Bonny. Pleased to meet you. Don't worry, I'll look after you!"];

  // Stats
  var maxHP = servantHP(11521);
  var attack = servantAtk(9446);
  var attackRange;
  var movementRange = 4;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Pirate's Honor", "skill-Attack Up",
              skillTypeEnum.Self, "skillPirateAttack", servantCooldown(7), 0,
              ["Increases own attack by 10% for 3 turns. Grants self Guts status for 1 time.",
               "Reduces own debuff resistance by 20% for 3 turns. [Demerit]"]),
    new Skill("Pirate's Charm", "skill-Charm",
             skillTypeEnum.Enemy, "skillCharm", servantCooldown(9), 1,
             ["75% chance to Charm one Male enemy for 1 turn."])
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Magic Resistance (Low)", "skill-Magic Resistance",
              skillTypeEnum.Passive, "skillMagicResLow", 0, 0,
              "Increases own debuff resistance by 10%."),
    new Skill("Teamwork", "skill-Yin Yang",
              skillTypeEnum.Passive, "skillManual", 0, "Mary Read",
              "When allied Servant Mary Read is 3 spaces away or less, increases attack and defense by 15%."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Caribbean Free Bird", "Wings Abreast As If Trees With Entwined Branches",
    npTypeEnum.Single, "npAnneMary", npStrengthSingle(), 1,
    ["Deals 300% damage to one enemy. Deals extra damage based on own remaining HP (Percent remaining HP * 300%).",
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
function Arash(game, faction) {
  // Basic info
  var name = "Arash";
  var load = noSpaces(name);
  var unitClass = classEnum.Archer;
  var image = name;
  var rank = rankEnum.Bronze;
  var traits = [ "Brynhildr's Beloved", "Humanoid", "Male", "Servant", "Weak to Enuma Elish" ];
  var aiType = aiTypeEnum.Offensive;

  var intro = ["I am Arash, Hero of the East. Nice to meet you!"];

  // Stats
  var maxHP = servantHP(7122);
  var attack = servantAtk(5816);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Robust Health", "skill-Defense Up",
              skillTypeEnum.Self, "skillRobustHealth", servantCooldown(7), 0,
              ["Increases own defense by 10% for 3 turns.",
               "Increases own Poison debuff resistance by 50% for 3 turns."]),
    new Skill("Bow and Arrow Creation", "skill-NP Charge",
               skillTypeEnum.Self, "skillNPHealLite", servantCooldown(8), 0,
               ["Recovers 20 HP and charges own NP gauge by 1 bar."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Magic Resistance (Low)", "skill-Magic Resistance",
              skillTypeEnum.Passive, "skillMagicResLow", 0, 0,
              "Increases own debuff resistance by 10%."),
    new Skill("Sharpshooter", "skill-Sure Hit",
              skillTypeEnum.Passive, "skillSharpshooter", 0, 0,
              "Increases own attack range by 1."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Stella", "Lone Meteor",
    npTypeEnum.AoEdir, "npArash", npStrengthSingle(), 4,
    ["Deals 300% damage to enemies in range. Sacrifices self.",
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
function Kuro(game, faction) {
  // Basic info
  var name = "Kuro";
  var load = noSpaces(name);
  var unitClass = classEnum.Archer;
  var image = name;
  var rank = rankEnum.Gold;
  var traits = [ "Female", "Humanoid", "Servant", "Weak to Enuma Elish" ];
  var aiType;

  var intro = ["I guess I'll do you a favor. Yep, I’m sure you’ll find me useful.", "After all, aren’t big sisters always better?"];

  // Stats
  var maxHP = servantHP(10914);
  var attack = servantAtk(9845);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Eye of the Mind (False)", "skill-Evasion",
              skillTypeEnum.Self, "skillEvasion", servantCooldown(8), 0,
              ["Grants self Evasion for 1 turn."]),
    new Skill("Kiss Demon", "skill-NP Charge",
               skillTypeEnum.Self, "skillNPGain", servantCooldown(8), 0,
               ["Charges own NP gauge by 1.5 bars."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Magic Resistance", "skill-Magic Resistance",
              skillTypeEnum.Passive, "skillMagicResA", 0, 0,
              "Increases own debuff resistance by 10%."),
    new Skill("Teleportation", "skill-Shadow",
              skillTypeEnum.Passive, "skillRiding", 0, 0,
              "Increases own movement range by 1. Able to pass through enemies."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Kakuyoku San-Ren", "Triple-Linked Crane Wings",
    npTypeEnum.Single, "npKuro", npStrengthSingle(), 1,
    ["Grants Sure Hit to self for 1 turn and deals 300% damage to one enemy.",
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
function RobinHood(game, faction) {
  // Basic info
  var name = "Robin Hood";
  var load = noSpaces(name);
  var unitClass = classEnum.Archer;
  var image = name;
  var rank = rankEnum.Silver;
  var traits = [ "Brynhildr's Beloved", "Humanoid", "Male", "Servant", "Weak to Enuma Elish" ];
  var aiType;

  var intro = ["Okay, okay. Now that I'm summoned, I'll get to work. In my own way."];

  // Stats
  var maxHP = servantHP(10187);
  var attack = servantAtk(6715);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Sabotage", "skill-Poison",
              skillTypeEnum.AoEburst, "skillSabotage", servantCooldown(7), 1,
              ["Inflicts Poison with 5 damage for 5 turns to enemies in range.",
               "Reduces attack of enemies in range by 5% for 3 turns."]),
    new Skill("May King", "skill-Evasion",
              skillTypeEnum.Self, "skillMayKing", servantCooldown(8), 0,
              ["Grants self Sure Hit and Evasion for 1 turn."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Magic Resistance (Low)", "skill-Magic Resistance",
              skillTypeEnum.Passive, "skillMagicResLow", 0, 0,
              "Increases own debuff resistance by 10%."),
    new Skill("Sharpshooter", "skill-Sure Hit",
              skillTypeEnum.Passive, "skillSharpshooter", 0, 0,
              "Increases own attack range by 1."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Yew Bow", "Bow of Prayer",
    npTypeEnum.Single, "npRobinHood", npStrengthSingle(), 2,
    ["Deals 300% damage to one enemy. Deals an extra 100% damage to enemies with the Poison debuff.",
     "Range: Range: 1 adjacent enemy."]);
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
