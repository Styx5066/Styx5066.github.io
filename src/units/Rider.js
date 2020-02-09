/*
* Collection of pre-loaded Servants
*/

// ==========================================================
function Astolfo(game, faction) {
  // Basic info
  var name = "Astolfo";
  var load = noSpaces(name);
  var unitClass = classEnum.Rider;
  var image = name;
  var rank = rankEnum.Gold;
  var traits = [ "Humanoid", "Riding", "Servant", "Weak to Enuma Elish" ];
  var aiType = aiTypeEnum.Offensive;

  var intro = ["Yahoo! My name is Astolfo! Rider Class! And, and...umm, nice to meet you!"];

  // Stats
  var maxHP = servantHP(11172);
  var attack = servantAtk(8937);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Trap of Argalia", "skill-Stun",
              skillTypeEnum.Enemy, "skillStun", servantCooldown(8), 1,
              ["75% chance to Stun one enemy for 1 turn."]),
    new Skill("Evaporation of Sanity", "skill-NP Charge",
              skillTypeEnum.Self, "skillAstolfo", servantCooldown(8), 0,
              ["Increases own attack by 10% for 1 turn and charges own NP gauge by 1 bar."])
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
  var noblePhantasm = new NoblePhantasm(
    "Hippogriff", "Otherworldly Phantom Horse",
    npTypeEnum.AoEdir, "npAstolfo", npStrengthAoE(), 4,
    ["Deals 200% damage that ignores defense buffs to enemies in range. Grants self Evasion for 3 attacks.",
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
function Boudica(game, faction) {
  // Basic info
  var name = "Boudica";
  var load = noSpaces(name);
  var unitClass = classEnum.Rider;
  var image = name;
  var rank = rankEnum.Bronze;
  var traits = [ "Female", "Humanoid", "King", "Riding", "Servant", "Weak to Enuma Elish" ];
  var aiType = aiTypeEnum.Support;

  var intro = ["My name is Boudica, nice to meet you! Don't mind the formalities."];

  // Stats
  var maxHP = servantHP(10130);
  var attack = servantAtk(6289);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Queen of Victory", "skill-Damage Up",
              skillTypeEnum.Self, "skillDamageRoman", servantCooldown(7), 0,
              ["Increases own damage against Roman enemies by 50% for 3 turns."]),
    new Skill("Battle Continuation", "skill-Guts",
              skillTypeEnum.Self, "skillGutsOnce", servantCooldown(9), 0,
              ["Grants self Guts status for 1 time over 5 turns."])
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Magic Resistance (Low)", "skill-Magic Resistance",
              skillTypeEnum.Passive, "skillMagicResLow", 0, 0,
              "Increases own debuff resistance by 10%."),
    new Skill("Riding", "skill-Riding",
              skillTypeEnum.Passive, "skillRiding", 0, 0,
              "Increases own movement range by 1."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Chariot of Boudica", "Chariot Without Promised Protection",
    npTypeEnum.AllyBurst, "npDefenseUp", 0, 1,
    ["Increases defense of allies in range by 30% for 3 turns.",
     "Range: 4 spaces adjacent to and including the user."]);
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
function MaryRead(game, faction) {
  // Basic info
  var name = "Mary Read";
  var load = noSpaces(name);
  var unitClass = classEnum.Rider;
  var image = name;
  var rank = rankEnum.Gold;
  var traits = [ "Female", "Humanoid", "Servant", "Weak to Enuma Elish" ];
  var aiType = aiTypeEnum;

  var intro = ["Rider, Mary Read. Even if Anne isn't here, don't underestimate me."];

  // Stats
  var maxHP = servantHP(11286);
  var attack = servantAtk(9029);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Pirate's Honor", "skill-Defense Up",
              skillTypeEnum.Self, "skillPirateDefense", servantCooldown(7), 0,
              ["Increases own defense by 10% for 3 turns. Grants self Guts status for 1 time.",
               "Reduces own debuff resistance by 20% for 3 turns. [Demerit]"]),
   new Skill("Pirate's Courage", "skill-Courage",
             skillTypeEnum.Self, "skillTaunt1", servantCooldown(5), 0,
             ["Draws attention of enemies to self for 1 turn."])
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Magic Resistance (Low)", "skill-Magic Resistance",
              skillTypeEnum.Passive, "skillMagicResLow", 0, 0,
              "Increases own debuff resistance by 10%."),
    new Skill("Teamwork", "skill-Yin Yang",
              skillTypeEnum.Passive, "skillManual", 0, "Anne Bonny",
              "When allied Servant Anne Bonny is 3 spaces away or less, increases attack and defense by 15%."),
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
function Medusa(game, faction) {
  // Basic info
  var name = "Medusa";
  var load = noSpaces(name);
  var unitClass = classEnum.Rider;
  var image = name;
  var rank = rankEnum.Silver;
  var traits = [ "Divine", "Female", "Humanoid", "Riding", "Servant", "Weak to Enuma Elish" ];
  var aiType;

  var intro = ["...You have strange preferences. If you require a sacrifice, feel free to command me as you wish."];

  // Stats
  var maxHP = servantHP(8937);
  var attack = servantAtk(7200);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Mystic Eyes", "skill-Stun",
              skillTypeEnum.Enemy, "skillStun", servantCooldown(8), 1,
              ["75% chance to Stun one enemy for 1 turn."]),
    new Skill("Blood Fort Andromeda", "skill-NP Regen",
              skillTypeEnum.Self, "skillNPCharge", servantCooldown(8), 0,
              ["Increases own NP charge generation to 1 bar per turn for 3 turns."])
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
  var noblePhantasm = new NoblePhantasm(
    "Bellerophon", "Bridle of Chivalry",
    npTypeEnum.AoEdir, "npDamage", npStrengthAoE(), 4,
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
    intro,                // Intro dialogue
    load,                 // Loading function
    aiType                // AI Type
  );
}
// ==========================================================
