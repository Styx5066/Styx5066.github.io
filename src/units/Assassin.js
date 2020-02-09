/*
* Collection of pre-loaded Servants
*/

// ==========================================================
function CursedArmHassan(game, faction) {
  // Basic info
  var name = "Cursed Arm Hassan";
  var load = noSpaces(name);
  var unitClass = classEnum.Assassin;
  var image = name;
  var rank = rankEnum.Bronze;
  var traits = [ "Humanoid", "Male", "Servant", "Weak to Enuma Elish" ];
  var aiType;

  var intro = ["Assassin-class Servant. I heard your call from the shadows."];

  // Stats
  var maxHP = servantHP(7594);
  var attack = servantAtk(6280);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Protection from Wind", "skill-Evasion",
              skillTypeEnum.Self, "skillEvasionAtk", servantCooldown(7), 0,
              ["Grants self Evasion for 3 attacks."]),
    new Skill("Presence Concealment", "skill-Presence Concealment",
              skillTypeEnum.Self, "skillPresenceConcealment", servantCooldown(9), 0,
              ["Hides self from enemies for 3 turns or until you attack."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Silent Movement", "skill-Death Chance Up",
              skillTypeEnum.Passive, "skillSilentMovement", 0, 0,
              "Increases own Instant-Kill success rate by 5%."),
    new Skill("Shadow", "skill-Shadow",
              skillTypeEnum.Passive, "skillManual", 0, 0,
              "Able to pass through enemies."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Zabaniya", "Delusional Heartbeat",
    npTypeEnum.Single, "npZabaniya", npStrengthSingle(), 1,
    ["Deals 300% damage to one enemy. 5% chance to Instant-Kill them.",
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
function HundredHassan(game, faction) {
  // Basic info
  var name = "Hundred Faces Hassan";
  var load = noSpaces("HundredHassan");
  var unitClass = classEnum.Assassin;
  var image = name;
  var rank = rankEnum.Silver;
  var traits = [ "Humanoid", "Female", "Servant", "Weak to Enuma Elish" ];
  var aiType;

  var intro = ["Now that you have command over the army of shadows, victory is at hand.", "You can rest easy now, Master."];

  // Stats
  var maxHP = servantHP(9310);
  var attack = servantAtk(6686);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Library of Stored Information", "skill-NP Regen",
              skillTypeEnum.Self, "skillNPCharge", servantCooldown(7), 0,
              ["Increases own NP charge generation to 1 bar per turn for 3 turns."]),
    new Skill("Hundred Faces", "skill-Summon",
              skillTypeEnum.Space, "skillHundredFaces", servantCooldown(2), 1,
              ["Splits into a Hassan on an adjacent space, sacrificing 25 HP from your Max HP.",
               "Does nothing if own HP is 25 or less."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Silent Movement", "skill-Death Chance Up",
              skillTypeEnum.Passive, "skillSilentMovement", 0, 0,
              "Increases own Instant-Kill success rate by 5%."),
    new Skill("Shadow", "skill-Shadow",
              skillTypeEnum.Passive, "skillManual", 0, 0,
              "Able to pass through enemies."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Zabaniya", "Delusional Illusion",
    npTypeEnum.Single, "npZabaniya", npStrengthSingle(), 1,
    ["Deals 300% damage to one enemy. 5% chance to Instant-Kill them.",
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
function SasakiKojirou(game, faction) {
  // Basic info
  var name = "Sasaki Kojirou";
  var load = noSpaces(name);
  var unitClass = classEnum.Assassin;
  var image = name;
  var rank = rankEnum.Bronze;
  var traits = [ "Humanoid", "Male", "Servant", "Weak to Enuma Elish" ];
  var aiType;

  var intro = ["I am Sasaki Kojirou, an Assassin-class Servant. I am at your service."];

  // Stats
  var maxHP = servantHP(6220);
  var attack = servantAtk(5735);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Eye of the Mind (False)", "skill-Evasion",
              skillTypeEnum.Self, "skillEvasion", servantCooldown(8), 0,
              ["Grants self Evasion for 1 turn."]),
    new Skill("Sense of Subtle Elegance", "skill-Sure Hit",
              skillTypeEnum.Self, "skillElegance", servantCooldown(7), 0,
              ["Grants self Sure Hit and increases own attack by 10% for 3 turns."]),
  ];

  // Passive Skills
  var passiveSkills = [];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Tsubame Gaeshi", "Swallow Reversal",
    npTypeEnum.Single, "npDamage", npStrengthSingle(), 1,
    ["Deals 300% damage to one enemy.",
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
function SerenityHassan(game, faction) {
  // Basic info
  var name = "Serenity Hassan";
  var load = noSpaces(name);
  var unitClass = classEnum.Assassin;
  var image = name;
  var rank = rankEnum.Gold;
  var traits = [ "Female", "Humanoid", "Servant", "Weak to Enuma Elish" ];
  var aiType;

  var intro = ["Everything, everything, everything as you would will it.",
               "I will offer all of myself to you. This body, this heart, all of it..."];

  // Stats
  var maxHP = servantHP(11623);
  var attack = servantAtk(8981);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Poisonous Dagger", "skill-Poison",
              skillTypeEnum.Enemy, "skillPoison", servantCooldown(6), 1,
              ["Inflicts Poison with 5 damage for 5 turns to one enemy."]),
    new Skill("Presence Concealment", "skill-Presence Concealment",
              skillTypeEnum.Self, "skillPresenceConcealment", servantCooldown(9), 0,
              ["Hides self from enemies for 3 turns or until you attack."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Silent Dance", "skill-Death Chance Up",
              skillTypeEnum.Passive, "skillSilentDance", 0, 0,
              "Increases own Instant-Kill success rate by 5% and debuff success rate by 10%."),
    new Skill("Shadow", "skill-Shadow",
              skillTypeEnum.Passive, "skillManual", 0, 0,
              "Able to pass through enemies."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Zabaniya", "Delusional Poison Body",
    npTypeEnum.Single, "npZabaniyaPoison", npStrengthSingle(), 1,
    ["Deals 300% damage to one enemy. 5% chance to Instant-Kill them.",
     "Inflicts Poison with 10 damage for 5 turns. 40% chance to seal their skills and NP for 1 turn."]
   );
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
