/*
* Collection of pre-loaded Servants
*/

// ==========================================================
function ArtoriaLancer(game, faction) {
  // Basic info
  var name = "Artoria";
  var load = noSpaces("ArtoriaLancer");
  var unitClass = classEnum.Lancer;
  var image = "Artoria Lancer";
  var rank = rankEnum.Gold;
  var traits = [ "Arthur", "Dragon", "Female", "King", "Humanoid", "Riding", "Saberface", "Servant", "Weak to Enuma Elish" ];
  var aiType;

  var intro = ["Are you my new manager? Please take care of me from now on, okay?"];

  // Stats
  var maxHP = servantHP(15606);
  var attack = servantAtk(10995);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Mana Burst", "skill-Damage Up",
              skillTypeEnum.Self, "skillAttackUp40", servantCooldown(7), 0,
              ["Increases own attack by 40% for 1 turn."]),
    new Skill("Blessings from the End of the World", "skill-NP Charge",
               skillTypeEnum.Self, "skillNPDebuff", servantCooldown(8), 0,
               ["Charges own NP gauge by 1.5 bars. Removes own debuffs."]),
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
    "Rhongomyniad", "The Spear That Shines To The Ends Of The Earth",
    npTypeEnum.AoEdir, "npRhongomyniad", npStrengthAoE(), 50,
    ["Deals 200% damage that ignores Invincibility to enemies in range. Charges own NP gauge by 1 bar.",
     "Range: A line in one direction."]);
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
function CuChulainn(game, faction) {
  // Basic info
  var name = "Cú Chulainn";
  var load = noSpaces("Cu Chulainn");
  var unitClass = classEnum.Lancer;
  var image = name;
  var rank = rankEnum.Silver;
  var traits = [ "Brynhildr's Beloved", "Divine", "Humanoid", "Male", "Servant", "Weak to Enuma Elish" ];
  var aiType;

  var intro = ["Yo, Servant Lancer has answered your summon. Well, let's try to have fun, Master." ];

  // Stats
  var maxHP = servantHP(9593);
  var attack = servantAtk(7239);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Battle Continuation", "skill-Guts",
              skillTypeEnum.Self, "skillGutsOnce", servantCooldown(9), 0,
              ["Grants self Guts status for 1 time over 5 turns."]),
    new Skill("Protection from Arrows", "skill-Evasion",
              skillTypeEnum.Self, "skillEvasionArrows", servantCooldown(7), 0,
              ["Grants self Evasion for 2 attacks. Increases own defense by 10% for 3 turns."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Magic Resistance (Low)", "skill-Magic Resistance",
              skillTypeEnum.Passive, "skillMagicResLow", 0, 0,
              "Increases own debuff resistance by 10%."),
    new Skill("Divinity", "skill-Divinity",
              skillTypeEnum.Passive, "skillDivinity", 0, 0,
              "Increases own damage by 5."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Gáe Bolg", "Barbed Spear that Pierces with Death",
    npTypeEnum.Single, "npCu", npStrengthSingle(), 2,
    ["Grants Sure Hit to Self for 1 turn and deals 300% damage to one enemy. 5% chance to Instant-Kill them.",
     "Reduces their Defense by 10% for 3 turns. Range: One enemy up to 2 spaces away."]);
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
function Diarmuid(game, faction) {
  // Basic info
  var name = "Diarmuid Ua Duibhne";
  var load = noSpaces("Diarmuid");
  var unitClass = classEnum.Lancer;
  var image = "Diarmuid";
  var rank = rankEnum.Silver;
  var traits = [ "Brynhildr's Beloved", "Humanoid", "Male", "Servant", "Weak to Enuma Elish" ];
  var aiType;

  var intro = ["I am the first spear of the Knights of Fianna, Diarmuid Ua Duibhne.",
               "I have arrived. I am now a Servant who serves you." ];

  // Stats
  var maxHP = servantHP(10098);
  var attack = servantAtk(6877);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Eye of the Mind (True)", "skill-Evasion",
              skillTypeEnum.Self, "skillEvasionDef", servantCooldown(8), 0,
              ["Grants self Evasion for 1 turn. Increases own defense by 10% for 3 turns."]),
    new Skill("Love Spot", "skill-Charm",
              skillTypeEnum.AoEburst, "skillLoveSpot", servantCooldown(8), 1,
              ["75% chance to charm female enemies in range for 1 turn.",
               "Reduces defense of enemies in range by 20% for 3 turns."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Magic Resistance", "skill-Magic Resistance",
              skillTypeEnum.Passive, "skillMagicResA", 0, 0,
              "Increases own debuff resistance by 20%."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Gáe Dearg & Gáe Buidhe", "Crimson Rose of Exorcism and Yellow Rose of Mortality",
    npTypeEnum.Single, "npDiarmuid", npStrengthSingle(), 1,
    ["Deals 300% damage to one enemy and removes their buffs.",
     "Inflicts Curse with 5 damage for 5 turns. Range: One adjacent enemy."]);
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
function ElizabethBathory(game, faction) {
  // Basic info
  var name = "Elizabeth Báthory";
  var load = noSpaces("ElizabethBathory");
  var unitClass = classEnum.Lancer;
  var image = name;
  var rank = rankEnum.Gold;
  var traits = [ "Dragon", "Female", "Humanoid", "Servant", "Weak to Enuma Elish" ];
  var aiType = aiTypeEnum.Offensive;

  var intro = ["Are you my new manager? Please take care of me from now on, okay?"];

  // Stats
  var maxHP = servantHP(11870);
  var attack = servantAtk(9122);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Battle Continuation", "skill-Guts",
              skillTypeEnum.Self, "skillGutsOnce", servantCooldown(9), 0,
              ["Grants self Guts status for 1 time over 5 turns."]),
    new Skill("Territory Creation (Concert)", "skill-Territory Creation",
              skillTypeEnum.Space, "skillCreateConcert", servantCooldown(12), 1,
              ["Creates a Fortress that blocks enemies and provides defense when occupied."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Magic Resistance", "skill-Magic Resistance",
              skillTypeEnum.Passive, "skillMagicResA", 0, 0,
              "Increases own debuff resistance by 20%."),
    new Skill("Territory Creation (Concert)", "skill-Territory Creation",
              skillTypeEnum.Passive, "skillFortAttackUp", 0, 0,
              "Increases own attack by 15% when occupying a Fortress."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Báthory Erzsébet", "Fresh Blood Demoness",
    npTypeEnum.AoEcone, "npElizabeth", npStrengthAoE(), 2,
    ["Deals 200% damage that ignores defense buffs to enemies in range. Inflicts Curse with 5 damage for 3 turns to them.",
     "Range: A cone of 4 spaces in one direction."]);
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
function Gareth(game, faction) {
  // Basic info
  var name = "Gareth";
  var load = noSpaces(name);
  var unitClass = classEnum.Lancer;
  var image = name;
  var rank = rankEnum.Bronze;
  var traits = [ "Brynhildr's Beloved", "Female", "Humanoid", "Riding", "Servant", "Weak to Enuma Elish" ];
  var aiType;

  var intro = ["I’m Gareth, the Seventh seat of the Round Table. I’m a knight that served King Arthur!" ];

  // Stats
  var maxHP = servantHP(9537);
  var attack = servantAtk(5413);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Battle Continuation", "skill-Guts",
              skillTypeEnum.Self, "skillGutsOnce", servantCooldown(9), 0,
              ["Grants self Guts status for 1 time over 5 turns."]),
    new Skill("Ring of Transformation", "skill-Taunt",
              skillTypeEnum.Self, "skillGareth", servantCooldown(7), 0,
              ["Draws attention of enemies to self and increases own defense by 30% for 1 turn.",
               "Charges own NP gauge by half a bar."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Magic Resistance (Low)", "skill-Magic Resistance",
              skillTypeEnum.Passive, "skillMagicResLow", 0, 0,
              "Increases own debuff resistance by 10%."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "īra lupus", "Rampaging Maiden Wolf",
    npTypeEnum.Single, "npGareth", npStrengthSingle(), 1,
    ["Grants Pierce Invincible to Self for 1 turn and deals 300% damage to one enemy.",
     "Reduces their Defense by 10% for 3 turns. Range: 1 adjacent enemy."]);
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
function Leonidas(game, faction) {
  // Basic info
  var name = "Leonidas";
  var load = noSpaces(name);
  var unitClass = classEnum.Lancer;
  var image = name;
  var rank = rankEnum.Bronze;
  var traits = [ "Humanoid", "King", "Male", "Servant", "Weak to Enuma Elish" ];
  var aiType;

  var intro = [ "Servant class, Lancer. Leonidas, King of Sparta, at your service!" ];

  // Stats
  var maxHP = servantHP(7959);
  var attack = servantAtk(6583);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Pride of the Rearguard", "skill-Taunt",
              skillTypeEnum.Self, "skillRearguard", servantCooldown(8), 0,
              ["Draws attention of enemies to self for 1 turn.",
               "Increases own NP charge generation to 1 bar per turn for 3 turns."]),
    new Skill("Battle Continuation", "skill-Guts",
              skillTypeEnum.Self, "skillGutsOnce", servantCooldown(9), 0,
              ["Grants self Guts status for 1 time over 5 turns."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Magic Resistance (Low)", "skill-Magic Resistance",
              skillTypeEnum.Passive, "skillMagicResLow", 0, 0,
              "Increases own debuff resistance by 10%."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Guardian of the Flame Gate", "Thermopylae Enomotia",
    npTypeEnum.Self, "npLeonidas", 0, 0,
    ["Increases own defense by 40% for 3 turns. Draws attention of enemies to self for 3 turns."]);
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
function Scathach(game, faction) {
  // Basic info
  var name = "Scáthach";
  var load = noSpaces("Scathach");
  var unitClass = classEnum.Lancer;
  var image = name;
  var rank = rankEnum.Gold;
  var traits = [ "Female", "Humanoid", "King", "Servant", "Weak to Enuma Elish" ];
  var aiType;

  var intro = ["I came from the Land of Shadow. My name is Scáthach.", "I guess I should call you Master?"];

  // Stats
  var maxHP = servantHP(14825);
  var attack = servantAtk(11375);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Wisdom of Dún Scáith", "skill-Moon",
              skillTypeEnum.Self, "skillDunScaith", servantCooldown(7), 0,
              ["Grants self Sure Hit for 3 turns and Evasion for 1 turn."]),
    new Skill("God Slayer", "skill-Damage Up",
              skillTypeEnum.Self, "skillGodSlayer", servantCooldown(7), 0,
              ["Increases own damage against Divine and Undead enemies by 50% for 1 turn."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Magic Resistance", "skill-Magic Resistance",
              skillTypeEnum.Passive, "skillMagicResA", 0, 0,
              "Increases own debuff resistance by 20%."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Gáe Bolg Alternative", "Soaring Spear of Piercing Death",
    npTypeEnum.Single, "npScathach", npStrengthSingle(), 2,
    ["Stuns and deals 300% damage to one enemy. 5% chance to Instant-Kill them.",
     "Range: One enemy up to 2 spaces away."]);
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
