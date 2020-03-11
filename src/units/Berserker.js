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
function Frankenstein(game, faction) {
  // Basic info
  var name = "Frankenstein";
  var load = noSpaces(name);
  var unitClass = classEnum.Berserker;
  var image = name;
  var rank = rankEnum.Gold;
  var traits = [ "Female", "Humanoid", "Servant", "Weak to Enuma Elish" ];
  var aiType = aiTypeEnum;

  var intro = [ "...Uu...Ua..."];

  // Stats
  var maxHP = servantHP(10687);
  var attack = servantAtk(9441);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Lament of the Falsely Living", "skill-Stun",
              skillTypeEnum.Enemy, "skillStunDefense", servantCooldown(8), 1,
              ["60% chance to Stun one enemy for 1 turn.",
               "Reduces their defense by 20% for 1 turn."]),
    new Skill("Overload", "skill-NP Damage Up",
              skillTypeEnum.Self, "skillOverload", servantCooldown(7), 0,
              ["Increases own NP damage by 25% for 1 turn.",
               "Inflicts Burn with 5 damage for 5 turns to self. [Demerit]"])
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Mad Enhancement (Low)", "skill-Mad Enhancement",
              skillTypeEnum.Passive, "skillMadEnhancementLow", 0, 0,
              "Increases own attack by 5%."),
    new Skill("Galvanism", "skill-NP Generation",
              skillTypeEnum.Passive, "skillGalvanism", 0, 0,
              "Increases own NP charge generation to 1 bar per turn."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Blasted Tree", "The Lightning Tree of Crucifixion",
    npTypeEnum.AoEburst, "npFrankenstein", npStrengthAoE(), 2,
    ["Deals 200% damage to enemies in range. Reduces their attack by 10% for 3 turns.",
     "Sacrifices self. 20% chance to grant self Guts for 1 time."]);
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
function Lancelot(game, faction) {
  // Basic info
  var name = "Lancelot";
  var load = noSpaces(name);
  var unitClass = classEnum.Berserker;
  var image = name;
  var rank = rankEnum.Gold;
  var traits = [ "Humanoid", "Male", "Servant", "Weak to Enuma Elish" ];
  var aiType = aiTypeEnum.Offensive;

  var intro = [ "...Arrrrthurrrrrrr..."];

  // Stats
  var maxHP = servantHP(11327);
  var attack = servantAtk(10477);
  var attackRange;
  var movementRange = 4;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Knight of Owner", "skill-Courage",
              skillTypeEnum.Self, "skillOwner", servantCooldown(7), 0,
              ["Changes class to Saber, Archer, or Lancer for 3 turns."]),
    new Skill("Not For One's Own Glory", "skill-Shadow",
              skillTypeEnum.Self, "skillDisguise", servantCooldown(8), 0,
              ["Disguises self from enemies for 3 turns or until you attack."])
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Mad Enhancement (Low)", "skill-Mad Enhancement",
              skillTypeEnum.Passive, "skillMadEnhancementLow", 0, 0,
              "Increases own attack by 5%."),
    new Skill("Protection of the Fairies", "skill-Magic Resistance",
              skillTypeEnum.Passive, "skillMagicResA", 0, 0,
              "Increases own debuff resistance by 20%."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Arondight", "The Unfading Light of the Lake",
    npTypeEnum.Single, "npLancelot", npStrengthSingle(), 1,
    ["Deals 300% damage to one enemy. Deals an extra 50% to enemies with the Dragon trait.",
     "Increases Attack and Defense by 30% for 3 turns. Deactivates and Seals own Skills for 3 turns. [Demerit]"]);
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
function Nightingale(game, faction) {
  // Basic info
  var name = "Nightingale";
  var load = noSpaces(name);
  var unitClass = classEnum.Berserker;
  var image = name;
  var rank = rankEnum.Gold;
  var traits = [  "Female", "Humanoid", "Servant",, "Weak to Enuma Elish" ];
  var aiType;

  var intro = [ "Please be at ease, now that I have come. Let us save all lives, without fail.",
                "Even if all lives will have to be sacrificed." ];

  // Stats
  var maxHP = servantHP(15221);
  var attack = servantAtk(10184);
  var attackRange;
  var movementRange = 4;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Nurse of Steel", "skill-Heal",
              skillTypeEnum.Ally, "skillNurse", servantCooldown(6), 1,
              ["Recovers one ally's HP by 25. Grants them Debuff Immunity for 3 turns."]),
    new Skill("Angel's Cry", "skill-Damage Up",
              skillTypeEnum.Ally, "skillAttackUp30", servantCooldown(7), 1,
              ["Increases one ally's attack by 30% for 3 turns."])
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Mad Enhancement", "skill-Mad Enhancement",
              skillTypeEnum.Passive, "skillMadEnhancement", 0, 0,
              "Increases own attack by 10%."),
    new Skill("Human Comprehension", "skill-Assault",
              skillTypeEnum.Passive, "skillHumanComprehension", 0, 0,
              ["Increases own attack against enemies with the Humanoid trait by 10%.",
              "Increases own defense against enemies with the Humanoid trait by 10%."]),
    new Skill("Battlefield Nurse", "skill-Travel",
              skillTypeEnum.Passive, "skillShapeshift", 0, 0,
              ["Increases own movement range by 1. Decreases cooldown of Healing skills.",
               "Increases own defense by 10%."]),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Nightingale Pledge", "I Will Abstain From Whatever Is Deleterious And Mischievous",
    npTypeEnum.AllyBurst, "npNightingale", 0, 1,
    ["Recovers HP of allies in range by 30 and removes their debuffs. Increases their defense by 30% for 1 turn.",
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
