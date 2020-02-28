/*
* Collection of pre-loaded Servants
*/

// ==========================================================
function Andersen(game, faction) {
  // Basic info
  var name = "Hans Christian Andersen";
  var load = noSpaces("Andersen");
  var unitClass = classEnum.Caster;
  var image = name;
  var rank = rankEnum.Bronze;
  var traits = [ "Male", "Humanoid", "Servant", "Weak to Enuma Elish" ];
  var aiType = aiTypeEnum.Support;

  var intro = ["Third-rate servant, Andersen. Just throw me in the corner of a bookshelf."];

  // Stats
  var maxHP = servantHP(8484);
  var attack = servantAtk(5758);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("High-Speed Incantation", "skill-NP Charge",
              skillTypeEnum.Self, "skillNPGain", servantCooldown(7), 0,
              ["Charges own NP gauge by 1.5 bars."]),
    new Skill("The Little Mermaid's Love", "skill-NP Regen",
              skillTypeEnum.Ally, "skillNPCharge", servantCooldown(7), 1,
              ["Increases one ally's NP charge generation to 1 bar per turn for 3 turns."])
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Territory Creation", "skill-Territory Creation",
              skillTypeEnum.Passive, "skillTerritory", 0, 0,
              "Increases own healing from Ley Lines by 10%."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Märchen Meines Lebens", "A Story Just For You",
    npTypeEnum.AllyBurst, "npAndersen", 0, 1,
    ["70% chance to increase attack of allies in range by 20% for 3 turns. 70% chance to increase their defense by 20% for 3 turns.",
     "Recovers their HP by 10 every turn for 3 turns. Range: 4 spaces adjacent to and including the user."]);
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
function Circe(game, faction) {
  // Basic info
  var name = "Circe";
  var load = noSpaces(name);
  var unitClass = classEnum.Caster;
  var image = name;
  var rank = rankEnum.Gold;
  var traits = [ "Argo-Related", "Female", "Humanoid", "Servant", "Weak to Enuma Elish" ];
  var aiType;

  var intro = ["Oh my, you are a rather cute Master!"];

  // Stats
  var maxHP = servantHP(8643);
  var attack = servantAtk(7418);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("High-Speed Divine Words", "skill-NP Charge",
              skillTypeEnum.Self, "skillNPFull", servantCooldown(9), 0,
              ["Fully charges own NP gauge."]),
    new Skill("Intoxicated Meal", "skill-Poison",
              skillTypeEnum.AoEburst, "skillCirce", servantCooldown(7), 1,
              ["Inflicts Poison with 10 damage for 3 turns to enemies in range.",
               "Reduces defense of enemies in range by 10% for 3 turns."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Territory Creation", "skill-Territory Creation",
              skillTypeEnum.Passive, "skillTerritory", 0, 0,
              "Increases own healing from Ley Lines by 10%."),
    new Skill("Item Construction", "skill-Item Construction",
              skillTypeEnum.Passive, "skillItemConstr", 0, 0,
              "Increases own debuff success rate by 15%."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Metabo Piglets", "Forbidden Revelry",
    npTypeEnum.Single, "npCirce", (npStrengthAoE() + 0.5), 1,
    ["Deals 250% damage to one enemy and transforms them into a Pig for 1 turn.",
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
function Medea(game, faction) {
  // Basic info
  var name = "Medea";
  var load = noSpaces(name);
  var unitClass = classEnum.Caster;
  var image = name;
  var rank = rankEnum.Silver;
  var traits = [ "Argo-Related", "Female", "Humanoid", "Servant", "Weak to Enuma Elish" ];
  var aiType;

  var intro = ["Oh my, you are a rather cute Master!"];

  // Stats
  var maxHP = servantHP(8643);
  var attack = servantAtk(7418);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("High-Speed Divine Words", "skill-NP Charge",
              skillTypeEnum.Self, "skillNPFull", servantCooldown(9), 0,
              ["Fully charges own NP gauge."]),
    new Skill("Dragon Tooth Warrior", "skill-Summon",
              skillTypeEnum.Space, "skillSummonDTW", servantCooldown(9), 1,
              ["Summons a Dragon Tooth Warrior to an adjacent space."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Territory Creation", "skill-Territory Creation",
              skillTypeEnum.Passive, "skillTerritory", 0, 0,
              "Increases own healing from Ley Lines by 10%."),
    new Skill("Item Construction (Summon)", "skill-Item Construction",
              skillTypeEnum.Passive, "skillSummonConstr", 0, 0,
              "Increases HP of own summons by 10%."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Rule Breaker", "All Spells Must Be Broken",
    npTypeEnum.Single, "npDamageBuffRemove", npStrengthAoE(), 1,
    ["Deals 200% damage to one enemy and removes their buffs.",
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
function MedeaLily(game, faction) {
  // Basic info
  var name = "Medea Lily";
  var load = noSpaces(name);
  var unitClass = classEnum.Caster;
  var image = name;
  var rank = rankEnum.Gold;
  var traits = [ "Argo-Related", "Female", "Humanoid", "Servant", "Weak to Enuma Elish" ];
  var aiType = aiTypeEnum.Support;

  var intro = ["I'm Medea, a Caster-class Servant. Um, I look forward to working with you!"];

  // Stats
  var maxHP = servantHP(13070);
  var attack = servantAtk(7766);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("High-Speed Divine Words", "skill-NP Charge",
              skillTypeEnum.Self, "skillNPFull", servantCooldown(9), 0,
              ["Fully charges own NP gauge."]),
    new Skill("Poisonproof Healing", "skill-Heal",
              skillTypeEnum.Ally, "skillHealPoison", servantCooldown(5), 2,
              ["Recovers the HP of one ally by 20. Removes their Poison debuffs."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Territory Creation", "skill-Territory Creation",
              skillTypeEnum.Passive, "skillTerritory", 0, 0,
              "Increases own healing from Ley Lines by 10%."),
    new Skill("Item Construction (Healing)", "skill-Item Construction",
              skillTypeEnum.Passive, "skillManual", 0, 0,
              "Reduces cooldown of Healing skills."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Pain Breaker", "All Flaws Must Be Repaired",
    npTypeEnum.AllyBurst, "npMedeaLily", 0, 1,
    ["Recovers HP of allies in range by 50. Removes their debuffs.",
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
function NurseryRhyme(game, faction) {
  // Basic info
  var name = "Nursery Rhyme";
  var load = noSpaces(name);
  var unitClass = classEnum.Caster;
  var image = name;
  var rank = rankEnum.Silver;
  var traits = [ "Female", "Humanoid", "Servant", "Weak to Enuma Elish" ];
  var aiType;

  var intro = ["A good day to the wonderful you. Let us make this a wonderful dream."];

  // Stats
  var maxHP = servantHP(10882);
  var attack = servantAtk(8629);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Fairy Tale", "skill-Summon",
              skillTypeEnum.Space, "skillSummonFairyTale", servantCooldown(9), 1,
              ["Summons a Fairy Tale spellbook to an adjacent space."]),
    new Skill("Meanwhile...", "skill-NP Charge",
              skillTypeEnum.Self, "skillMeanwhile", servantCooldown(8), 0,
              ["Charges own NP gauge by 1 bar. Removes own debuffs.",
               "Recovers own HP by 15."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Item Construction (Summon)", "skill-Item Construction",
              skillTypeEnum.Passive, "skillSummonConstr", 0, 0,
              "Increases HP of own summons by 10%."),
    new Skill("Shapeshift", "skill-Defense Up",
              skillTypeEnum.Passive, "skillShapeshift", 0, 0,
              "Increases own defense by 10%."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Nursery Rhyme", "A Tale For Somebody's Sake",
    npTypeEnum.AoEburst, "npNurseryRhyme", npStrengthAoE(), 1,
    ["Deals 200% damage to enemies in range. Reduces their defense by 20% for 3 turns.",
     "60% chance to reduce their NP gauge by 1 bar. Range: 4 spaces adjacent to the user."]);
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
function Tamamo(game, faction) {
  // Basic info
  var name = "Tamamo no Mae";
  var load = noSpaces("Tamamo");
  var unitClass = classEnum.Caster;
  var image = name;
  var rank = rankEnum.Gold;
  var traits = [ "Divine", "Female", "Humanoid", "Servant", "Weak to Enuma Elish" ];
  var aiType = aiTypeEnum.Support;

  var intro = ["I will always be there for you! Your reliable Shrine Maiden Fox, Caster, has arrived♡"];

  // Stats
  var maxHP = servantHP(14259);
  var attack = servantAtk(10546);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Fox's Wedding", "skill-Heal",
              skillTypeEnum.Ally, "skillFox", servantCooldown(7), 2,
              ["Recovers the HP of one ally by 20. Increases their attack by 10% for 3 turns."]),
    new Skill("Territory Creation", "skill-Territory Creation",
              skillTypeEnum.Space, "skillCreateLeyLine", servantCooldown(12), 1,
              ["Creates a Ley Line that provides healing each turn when occupied."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Divinity", "skill-Divinity",
              skillTypeEnum.Passive, "skillDivinity", 0, 0,
              "Increases own damage by 5."),
    new Skill("Shapeshift", "skill-Defense Up",
              skillTypeEnum.Passive, "skillShapeshift", 0, 0,
              "Increases own defense by 10%."),
    new Skill("Territory Creation", "skill-Territory Creation",
              skillTypeEnum.Passive, "skillTerritory", 0, 0,
              "Increases own healing from Ley Lines by 10%."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Eightfold Blessings of Amaterasu", "Suiten Nikkou Amaterasu Yano Shizu-Ishi",
    npTypeEnum.AllyBurst, "npTamamo", 0, 1,
    ["Recovers HP of allies in range by 25 and reduces their Skill cooldowns by 1.",
     "Charges their NP gauge by 1 bar. Range: 4 spaces adjacent to and including the user."]);
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
