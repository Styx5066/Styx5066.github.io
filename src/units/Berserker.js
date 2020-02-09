/*
* Collection of pre-loaded Servants
*/

// ==========================================================
function Heracles(game, faction) {
  // Basic info
  var name = "Heracles";
  var load = noSpaces(name);
  var unitClass = classEnum.Berserker;
  var image = name;
  var rank = rankEnum.Gold;
  var traits = [ "Argo-Related", "Divine", "Greek Mythology Males", "Humanoid", "Male", "Servant", "Weak to Enuma Elish" ];
  var aiType = aiTypeEnum.Offensive;

  var intro = [ "▂▂▃▃▅▅ーーー！"];

  // Stats
  var maxHP = servantHP(10327);
  var attack = servantAtk(10655);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Bravery", "skill-Attack Up",
              skillTypeEnum.Self, "skillAttackUp", servantCooldown(7), 0,
              ["Increases own attack by 10% for 3 turns."]),
    new Skill("Eye of the Mind (False)", "skill-Evasion",
              skillTypeEnum.Self, "skillEvasion", servantCooldown(8), 0,
              ["Grants self Evasion for 1 turn."])
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Mad Enhancement", "skill-Mad Enhancement",
              skillTypeEnum.Passive, "skillMadEnhancement", 0, 0,
              "Increases own attack by 10%."),
    new Skill("Divinity", "skill-Divinity",
              skillTypeEnum.Passive, "skillDivinity", 0, 0,
              "Increases own damage by 5."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "God Hand", "The Twelve Labors",
    npTypeEnum.Self, "npHeracles", 0, 0,
    ["Reduces damage taken by 10 and increases defense by 20% for 3 turns.", "Grants self Guts status for 3 times."]);
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
function Kiyohime(game, faction) {
  // Basic info
  var name = "Kiyohime";
  var load = noSpaces(name);
  var unitClass = classEnum.Berserker;
  var image = name;
  var rank = rankEnum.Silver;
  var traits = [ "Dragon", "Female", "Humanoid", "Servant", "Weak to Enuma Elish" ];
  var aiType = aiTypeEnum.Offensive;

  var intro = [ "I am Servant Kiyohime. Do I look like a Berserker to you?", "It is nice to meet you, my Master." ];

  // Stats
  var maxHP = servantHP(9166);
  var attack = servantAtk(6644);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Stalking", "skill-Defense Down",
              skillTypeEnum.Enemy, "skillDefenseDown", servantCooldown(7), 1,
              ["Decreases Defense of one enemy by 10% for 3 turns."]),
    new Skill("Flame-Coloured Kiss", "skill-Damage Up",
              skillTypeEnum.Self, "skillFlameKiss", servantCooldown(7), 0,
              ["Removes own debuffs. Increases own attack by 20% for 1 turn."])
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Mad Enhancement", "skill-Mad Enhancement",
              skillTypeEnum.Passive, "skillMadEnhancement", 0, 0,
              "Increases own attack by 10%."),
    new Skill("Shapeshift", "skill-Defense Up",
              skillTypeEnum.Passive, "skillShapeshift", 0, 0,
              "Increases own defense by 10%."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Samadhi Through Transforming Flames", "Tenshin Kashou Zanmai",
    npTypeEnum.AoEdir, "npKiyohime", npStrengthAoE(), 4,
    ["Deals 200% damage to enemies in range. Inflicts Burn with 5 damage for 10 turns to them.",
     "50% chance to Stun them for 1 turn. Range: A line of 4 spaces in one direction."]);
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
function PaulBunyan(game, faction) {
  // Basic info
  var name = "Paul Bunyan";
  var load = noSpaces(name);
  var unitClass = classEnum.Berserker;
  var image = name;
  var rank = rankEnum.Bronze;
  var traits = [ "Female", "Humanoid", "Servants", "Weak to Enuma Elish" ];
  var aiType = aiTypeEnum;

  var intro = [ "Enchanté... My name is Paul Bunyan. I'm a Berserker. Nice to meet you, Master.",
                "I wonder why I'm a girl... Strange, isn't it?" ];

  // Stats
  var maxHP = servantHP(6196);
  var attack = servantAtk(6044);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Happy Comrades", "skill-Damage Up",
              skillTypeEnum.AllyBurst, "skillAttackUp20", servantCooldown(8), 1,
              ["Increases attack of allies in range including self by 20% for 3 turns."]),
    new Skill("Lake of Bean Soup", "skill-Heal",
              skillTypeEnum.AllyBurst, "skillHeal", servantCooldown(7), 1,
              ["Recovers HP of allies in range including self by 15."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Mad Enhancement (Low)", "skill-Mad Enhancement",
              skillTypeEnum.Passive, "skillMadEnhancementLow", 0, 0,
              "Increases own attack by 5%."),
    new Skill("Giant", "skill-Debuff Immunity",
              skillTypeEnum.Passive, "skillRiding", 0, 0,
              "Increases own movement range by 1."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Marvelous Exploits", "Achievements to be Astonished By",
    npTypeEnum.AoEburst, "npBunyan", npStrengthAoE(), 1,
    ["Deals 200% damage to enemies in range. Reduces their defense by 10% for 5 turns.",
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
function Spartacus(game, faction) {
  // Basic info
  var name = "Spartacus";
  var load = noSpaces(name);
  var unitClass = classEnum.Berserker;
  var image = name;
  var rank = rankEnum.Bronze;
  var traits = [ "Humanoid", "Male", "Roman", "Servant", "Weak to Enuma Elish" ];
  var aiType = aiTypeEnum.Offensive;

  var intro = [ "I am Berserker, Spartacus. Sorry to ask this, but are you an oppressor?" ];

  // Stats
  var maxHP = servantHP(7722);
  var attack = servantAtk(5073);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Honor of the Battered", "skill-Regen",
              skillTypeEnum.Self, "skillRegen", servantCooldown(9), 0,
              ["Recovers own HP by 10 every turn for 5 turns."]),
    new Skill("Unyielding Will", "skill-Guts",
              skillTypeEnum.Self, "skillGutsNP", servantCooldown(9), 0,
              ["Grants self Guts status for 1 time over 5 turns. Charges own NP gauge by 1 bar."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Mad Enhancement", "skill-Mad Enhancement",
              skillTypeEnum.Passive, "skillMadEnhancement", 0, 0,
              "Increases own attack by 10%."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Crying Warmonger", "The Howl of the Wounded Beast",
    npTypeEnum.AoEburst, "npSpartacus", npStrengthAoE(), 1,
    ["Deals 200% damage that ignores defense buffs to enemies in range. Deals an extra 100% damage if HP is below 50%.",
     "Recovers own HP by 50. Range: 4 spaces adjacent to the user."]);
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
