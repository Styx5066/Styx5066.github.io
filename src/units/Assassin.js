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
              ["Grants self Evasion for 2 attacks."]),
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
function JacktheRipper(game, faction) {
  // Basic info
  var name = "Jack the Ripper";
  var load = "JacktheRipper";
  var unitClass = classEnum.Assassin;
  var image = name;
  var rank = rankEnum.Gold;
  var traits = [ "Humanoid", "Female", "Servant", "Weak to Enuma Elish" ];
  var aiType;

  var intro = ["Assassin - Jack the Ripper. Please take care of me, Mother."];

  // Stats
  var maxHP = servantHP(12696);
  var attack = servantAtk(11557);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Murderer of the Misty Night", "skill-Presence Concealment",
              skillTypeEnum.Self, "skillMist", servantCooldown(9), 0,
              ["Hides self from enemies for 3 turns or until you attack.",
               "When attacking while hidden, attack increases by 40%."]),
    new Skill("Information Erasure", "skill-Assault",
             skillTypeEnum.Enemy, "skillErasure", servantCooldown(7), 1,
             ["Removes one enemy's buffs and reduces their attack by 15% for 3 turns."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Shadow", "skill-Shadow",
              skillTypeEnum.Passive, "skillManual", 0, 0,
              "Able to pass through enemies."),
    new Skill("Mental Pollution", "skill-Magic Resistance",
              skillTypeEnum.Passive, "skillMagicResLow", 0, 0,
              "Increases own debuff resistance by 10%."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Maria the Ripper", "The Holy Mother of Dismemberment",
    npTypeEnum.Single, "npJack", npStrengthSingle(), 1,
    ["Deals 300% damage that ignores defense buffs to one enemy. Deals an extra 50% damage to Female enemies.",
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
function MataHari(game, faction) {
  // Basic info
  var name = "Mata Hari";
  var load = noSpaces(name);
  var unitClass = classEnum.Assassin;
  var image = name;
  var rank = rankEnum.Bronze;
  var traits = [ "Humanoid", "Female", "Servant", "Weak to Enuma Elish" ];
  var aiType;

  var intro = ["Servant, Assassin. I go by the name of Mata Hari. Nice to meet you."];

  // Stats
  var maxHP = servantHP(6565);
  var attack = servantAtk(5377);
  var attackRange;
  var movementRange;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Pheromone", "skill-Charm",
              skillTypeEnum.AoEburst, "skillPheromone", servantCooldown(8), 1,
              ["60% chance to charm male enemies in range for 1 turn.",
               "Reduces defense of enemies in range by 10% for 3 turns. Seals their skills for 1 turn."]),
    new Skill("Espionage", "skill-Shadow",
              skillTypeEnum.Self, "skillDisguise", servantCooldown(8), 0,
              ["Disguises self from enemies for 3 turns or until you attack."])
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Shadow", "skill-Shadow",
              skillTypeEnum.Passive, "skillManual", 0, 0,
              "Able to pass through enemies."),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Mata Hari", "The Girl Who Has Sunny Eyes",
    npTypeEnum.AoEburst, "npMataHari", 0, 1,
    ["60% chance to charm enemies in range for 1 turn.",
     "Reduces their attack and defense by 20% for 3 turns."]);
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
function Semiramis(game, faction) {
  // Basic info
  var name = "Semiramis";
  var load = noSpaces(name);
  var unitClass = classEnum.Assassin;
  var image = name;
  var rank = rankEnum.Gold;
  var traits = [ "Divine", "Female", "Humanoid", "King", "Servant", "Weak to Enuma Elish" ];
  var aiType;

  var intro = ["Servant, Assassin-class. My name is Semiramis. Now then...first, you must prepare a throne for me.",
               "Then, we shall talk. If you do not have one, then you will have to serve as my chair." ];

  // Stats
  var maxHP = servantHP(13266);
  var attack = servantAtk(11309);
  var attackRange = 2;
  var movementRange = 3;
  var movementType;

  // Active Skills
  var activeSkills = [
    new Skill("Familiar (Pigeon)", "skill-NP Charge",
              skillTypeEnum.Self, "skillNPFamiliar", servantCooldown(7), 0,
              ["Charges own NP gauge by 1 bar. Increases own debuff success rate by 30% for 1 turn."]),
    new Skill("Sikera Ušum", "skill-Poison",
              skillTypeEnum.AoEburst, "skillPoisonDef", servantCooldown(8), 2,
              ["Inflicts Poison with 5 damage for 3 turns to all enemies in range.",
               "Lowers their defense by 15% for 3 turns."]),
  ];

  // Passive Skills
  var passiveSkills = [
    new Skill("Territory Creation", "skill-Territory Creation",
              skillTypeEnum.Passive, "skillTerritory", 0, 0,
              "Increases own healing from Ley Lines by 10%."),
    new Skill("Item Construction (Poison)", "skill-Item Construction",
              skillTypeEnum.Passive, "skillItemConstr", 0, 0,
              "Increases own debuff success rate by 15%."),
    new Skill("Divinity", "skill-Divinity",
              skillTypeEnum.Passive, "skillDivinity", 0, 0,
              "Increases own damage by 5."),
    new Skill("Double Summon (Caster)", "skill-Caster",
              skillTypeEnum.Passive, "skillManual", 0, 0,
              ["Ignores attack and defense advantage of the Caster class.",
               "Increases own attack range by 1.",
               "Decreases own movement range by 1. [Demerit]"]),
  ];

  // Noble Phantasm
  var noblePhantasm = new NoblePhantasm(
    "Hanging Gardens of Babylon", "Aerial Garden of Vanity",
    npTypeEnum.AoEcone, "npDamage", npStrengthAoE(), 2,
    ["Deals 200% damage to enemies in range.",
     "Range: A cone of 4 spaces in one direction."]
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
