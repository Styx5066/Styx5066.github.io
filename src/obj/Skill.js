/*
* Skill object
*  - Defines skill name, icon, and behavior
*/

// Skill types
const skillTypeEnum = {
  Self:      "Target Self",
  Space:     "Empty Space",
  Enemy:     "Target Enemy",
  AoEburst:  "AoE Burst",

  Ally:      "Target Ally",
  AllyBurst: "AoE Burst on Allies",

  Passive:   "Passive",
}

class Skill {
  //---------------
  // DESCRIPTION: Creates a new Skill
  // PARAMS:
  //  name      (I,REQ) - Name of the skill
  //  image     (I,REQ) - Reference to the skill's icon
  //  skillType (I,REQ) - Type from skillTypeEnum
  //  effectFun (I,REQ) - Name of function that applies the skill's effects. Must take in a user (unit using the skill)
  //                       and target (unit being used against) parameter.
  //                        ie: "skillHeal"
  //  cooldown  (I,OPT) - # of turns until the skill can be used again once used. Not used for Passive skills.
  //  range     (I,OPT) - Range in # of tiles, if skill is targetable
  //  description (I,OPT) - Array of strings that serve as the description of the skill. Each one is displayed on a new line.
  //---------------
  constructor(name, image, skillType, effectFun, cooldown, range, description) {
    this._name = name;
    this._image = image;
    this._description = description;

    this._skillType = skillType;
    this._effectFun = effectFun;

    this._cooldown = cooldown || 0;
    this._curTurn = 0;
    this._range = range;
  }

  //---------------
  // Getters & Setters
  //---------------
  get name() { return this._name; }
  set name(x) { this._name = x; }

  get image() { return this._image; }
  set image(x) { this._image = x; }

  get description() { return this._description; }
  set description(x) { this._description = x; }


  get skillType() { return this._skillType; }
  set skillType(x) { this._skillType = x; }

  get effectFun() { return this.effectFun; }
  set effectFun(x) { this._effectFun = x; }


  get cooldown() { return this._cooldown; }
  set cooldown(x) { this._cooldown = x; }

  get curTurn() { return this._curTurn; }
  set curTurn(x) { this._curTurn = x; }

  get range() { return this._range; }
  set range(x) { this._range = x; }


  //---------------
  // DESCRIPTION: Applies the skill's effect to all provided units
  // PARAMS:
  //  map        (I,REQ) - Map object
  //  user       (I,REQ) - User of the skill
  //  targetList (I,REQ) - Array of units to affect
  //  useSound   (I,OPT) - Sound to play when used
  //---------------
  effect(map, user, targetList, useSound) {
    if (useSound) { useSound.play(); }

    for (const target of targetList) {
      window[this._effectFun](map, user, target);
    }
  }

}

// ============================================================
//   Individual Skill Effects
// ============================================================

//---------------
// Increases attack of allies in range including self by 10% for 3 turns.
// For Argo-Related allies except self: further increases their attack by 10% for 3 turns and charges their NP gauge by 1 bar.
//---------------
function skillArgo(map, user, target) {
  // Attack Up
  target.addStatus(new Status(
    "Attack Up", "status-Attack Up", statusTypeEnum.Attack, buffTypeEnum.Buff, 10, 100, 1,
    "Increases Attack by 10%"
  ), null, null, user);

  // Exclude self from additional effects
  if (user.name == target.name) { return; }

  // Only Argo-Related for additional effects
  if (!target.hasTrait("Argo-Related")) { return; }

  // Attack Up
  target.addStatus(new Status(
    "Attack Up", "status-Attack Up", statusTypeEnum.Attack, buffTypeEnum.Buff, 10, 100, 1,
    "Increases Attack by 10%"
  ), null, 1500, user);

  // Charge NP
  target.increaseNPCharge(2);
}

//---------------
// Increases own attack for 1 turn after this one and charges own NP gauge.
//---------------
function skillAstolfo(map, user, target) {
  // Attack Up
  target.addStatus(new Status(
    "Attack Up", "status-Attack Up", statusTypeEnum.Attack, buffTypeEnum.Buff, 10, 100, 1,
    "Increases Attack by 10%"
  ), null, null, user);

  // Charge NP
  target.increaseNPCharge(2);
}

//---------------
// Increases own attack by 10% for 3 turns.
//---------------
function skillAttackUp(map, user, target) {
  // Attack Up
  target.addStatus(new Status(
    "Attack Up", "status-Attack Up", statusTypeEnum.Attack, buffTypeEnum.Buff, 10, 100, 3,
    "Increases Attack by 10%"
  ), null, null, user);
}

//---------------
// Increases own attack by 20% for 3 turns.
//---------------
function skillAttackUp20(map, user, target) {
  // Attack Up
  target.addStatus(new Status(
    "Attack Up", "status-Attack Up", statusTypeEnum.Attack, buffTypeEnum.Buff, 20, 100, 3,
    "Increases Attack by 20%"
  ), null, null, user);
}

//---------------
// Increases own debuff resistance by 15% for 3 turns and charges own NP gauge by 1 bar
//---------------
function skillCalm(map, user, target) {
  // Debuff Resistance
  target.addDebuffStatus(new Status(
    "Debuff Resistance Up", "status-Debuff Resistance Up", statusTypeEnum.Debuff, buffTypeEnum.Buff, 15, 100, 3,
    "Increases Debuff Resistance by 15%"
  ), null, null, user);

  // Charge NP
  target.increaseNPCharge(2);
}

//---------------
// 75% chance to Charm one Male enemy for 1 turn.
//---------------
function skillCharm(map, user, target) {
  var chance = 75;

  if (!target.hasTrait("Male")) { chance = -100; }

  // Charm
  target.addStatus(new Status(
    "Charm", "status-Charm", statusTypeEnum.Stun, buffTypeEnum.Debuff, 0, chance, 1,
    "Unable to move or act"
  ), null, null, user);
}

//---------------
// Creates a Fortress that provides defense when occupied and blocks enemies.
//---------------
function skillCreateConcert(map, user, target) {
  // In this case, target is the space to spawn at
  var fortress = Fortress();
  map.createStructure(target.x, target.y, "fortress", fortress.groundMoveCost, fortress.flightMoveCost,
    fortress.groundDefense, fortress.structureHP, user.faction);
}

//---------------
// Creates a Ley Line that provides healing each turn when occupied.
//---------------
function skillCreateLeyLine(map, user, target) {
  // In this case, target is the space to spawn at
  var leyline = LeyLine();
  map.createStructure(target.x, target.y, "leyline", leyline.groundMoveCost, leyline.flightMoveCost,
    leyline.groundDefense, leyline.structureHP);
}

//---------------
// Increases own damage against Roman enemies by 50% for 3 turns.
//---------------
function skillDamageRoman(map, user, target) {
  // Divine
  target.addStatus(new Status(
    "Damage Up (Roman)", "status-Damage Up", statusTypeEnum.Check, buffTypeEnum.Buff, 50, 100, 3,
    "Increases damage against Roman enemies by 50%"
  ), null, null, user);
}

//---------------
// Decreases Defense of one enemy by 10% for 3 turns.
//---------------
function skillDefenseDown(map, user, target) {
  // Defense Down
  target.addStatus(new Status(
    "Defense Down", "status-Defense Down", statusTypeEnum.Defense, buffTypeEnum.Debuff, -10, 100, 3,
    "Decreases Defense by 10%"
  ), null, null, user);
}

//---------------
// Increases own defense by 10% for 3 turns.
//---------------
function skillDefenseUp(map, user, target) {
  // Defense Up
  target.addStatus(new Status(
    "Defense Up", "status-Defense Up", statusTypeEnum.Defense, buffTypeEnum.Buff, 10, 100, 3,
    "Increases Defense by 10%"
  ), null, null, user);
}

//---------------
// Increases own defense by 20% for 3 turns.
//---------------
function skillDefenseUp20(map, user, target) {
  // Defense Up
  target.addStatus(new Status(
    "Defense Up", "status-Defense Up", statusTypeEnum.Defense, buffTypeEnum.Buff, 20, 100, 3,
    "Increases Defense by 20%"
  ), null, null, user);
}

//---------------
// Increases own damage by 5.
//---------------
function skillDivinity(map, user, target) {
  // Static Damage up
  target.dmgAdd += 5;
}

//---------------
// Grants self Sure Hit for 2 turns and Evasion for 1 turn.
//---------------
function skillDunScaith(map, user, target) {
  // Sure hit
  target.addStatus(new Status(
    "Sure Hit", "status-Sure Hit", statusTypeEnum.Check, buffTypeEnum.Buff, 0, 100, 3,
    "Allows attacking those with the Evasion status"
  ), null, null, user);

  // Evasion
  target.addStatus(new Status(
    "Evasion", "status-Evade", statusTypeEnum.Block, buffTypeEnum.Buff, 0, 100, 1,
    "Evades attacks that are not Sure Hit"
  ), null, 1500, user);
}

//---------------
// Grants self Sure Hit and increases own attack by 10% for 2 turns.
//---------------
function skillElegance(map, user, target) {
  // Sure hit
  target.addStatus(new Status(
    "Sure Hit", "status-Sure Hit", statusTypeEnum.Check, buffTypeEnum.Buff, 0, 100, 3,
    "Allows attacking those with the Evasion status"
  ), null, null, user);

  // Increase attack
  target.addStatus(new Status(
    "Attack Up", "status-Attack Up", statusTypeEnum.Attack, buffTypeEnum.Buff, 10, 100, 3,
    "Increases Attack by 10%"
  ), null, 1500, user);
}

//---------------
// Grants self Evasion for 1 turn.
//---------------
function skillEvasion(map, user, target) {
  // Evasion
  target.addStatus(new Status(
    "Evasion", "status-Evade", statusTypeEnum.Block, buffTypeEnum.Buff, 0, 100, 1,
    "Evades attacks that are not Sure Hit"
  ), null, null, user);
}

//---------------
// Grants self Evasion for 1 turn. Increases own defense by 10% for 3 turns.
//---------------
function skillEvasionDef(map, user, target) {
  // Evasion
  target.addStatus(new Status(
    "Evasion", "status-Evade", statusTypeEnum.Block, buffTypeEnum.Buff, 0, 100, 1,
    "Evades attacks that are not Sure Hit"
  ), null, null, user);

  // Defense Up
  target.addStatus(new Status(
    "Defense Up", "status-Defense Up", statusTypeEnum.Defense, buffTypeEnum.Buff, 10, 100, 3,
    "Increases Defense by 10%"
  ), null, 1500, user);
}

//---------------
// Grants self Evasion for 3 attacks. Increases own defense by 10% for 3 turns.
//---------------
function skillEvasionArrows(map, user, target) {
  // Evasion
  target.addStatus(new Status(
    "Evasion", "status-Evade", statusTypeEnum.Block, buffTypeEnum.Buff, 3, 100, -1,
    "Evades attacks that are not Sure Hit"
  ), null, null, user);

  // Defense Up
  target.addStatus(new Status(
    "Defense Up", "status-Defense Up", statusTypeEnum.Defense, buffTypeEnum.Buff, 10, 100, 3,
    "Increases Defense by 10%"
  ), null, 1500, user);
}

//---------------
// Grants self Evasion for 3 attacks.
//---------------
function skillEvasionAtk(map, user, target) {
  // Evasion
  target.addStatus(new Status(
    "Evasion", "status-Evade", statusTypeEnum.Block, buffTypeEnum.Buff, 3, 100, -1,
    "Evades attacks that are not Sure Hit"
  ), null, null, user);
}

//---------------
// Removes own debuffs. Increases own attack by 20% for 1 turn.
//---------------
function skillFlameKiss(map, user, target) {
  // Remove debuffs
  var allStatuses = [...target.allStatuses];
  for (const status of allStatuses) {
    if (status.buffType == buffTypeEnum.Debuff) {
      target.removeStatus(status);
    }
  }

  // Attack Up
  target.addStatus(new Status(
    "Attack Up", "status-Attack Up", statusTypeEnum.Attack, buffTypeEnum.Buff, 20, 100, 1,
    "Increases Attack by 20%"
  ), null, null, user);
}

//---------------
// Increases own attack by 10% when occupying a Fortress.
//---------------
function skillFortAttackUp(map, user, target) {
  // Is manually checked for when attacking in checkDamageStatuses
}

//---------------
// Recovers the HP of one ally by 20. Increases their attack by 10% for 3 turns.
//---------------
function skillFox(map, user, target) {
  // Heal
  target.heal(20);

  // Attack Up
  target.addStatus(new Status(
    "Attack Up", "status-Attack Up", statusTypeEnum.Attack, buffTypeEnum.Buff, 10, 100, 3,
    "Increases Attack by 10%"
  ), null, 1500, user);
}

//---------------
// Increases own damage against Divine and Undead enemies for 1 turn.
//---------------
function skillGodSlayer(map, user, target) {
  // Divine
  target.addStatus(new Status(
    "Damage Up (Divine)", "status-Damage Up", statusTypeEnum.Check, buffTypeEnum.Buff, 50, 100, 1,
    "Increases damage against Divine enemies by 50%"
  ), null, null, user);

  // Undead
  target.addStatus(new Status(
    "Damage Up (Undead)", "status-Damage Up", statusTypeEnum.Check, buffTypeEnum.Buff, 50, 100, 1,
    "Increases damage against Undead enemies by 50%"
  ), null, 1500, user);
}

//---------------
// Grants self Guts status for 1 time over 5 turns.
//---------------
function skillGutsOnce(map, user, target) {
  // Guts
  target.addStatus(new Status(
    "Guts", "status-Guts", statusTypeEnum.Check, buffTypeEnum.Buff, 1, 100, 5,
    "Revives with 1/4th HP when defeated"
  ), null, null, user);
}

//---------------
// Grants self Guts status for 1 time over 5 turns. Charges own NP gauge by 1 bar.
//---------------
function skillGutsNP(map, user, target) {
  // Guts
  target.addStatus(new Status(
    "Guts", "status-Guts", statusTypeEnum.Check, buffTypeEnum.Buff, 1, 100, 5,
    "Revives with 1/4th HP when defeated"
  ), null, null, user);

  // Increase NP
  target.increaseNPCharge(2);
}

//---------------
// Grants self Guts status for 3 times over 5 turns.
//---------------
function skillGutsThree(map, user, target) {
  // Guts
  target.addStatus(new Status(
    "Guts", "status-Guts", statusTypeEnum.Check, buffTypeEnum.Buff, 3, 100, 5,
    "Revives with 1/4th HP when defeated"
  ), null, null, user);
}

//---------------
// Recovers the HP of one ally by 15. Removes one of their debuffs.
//---------------
function skillHealFleece(map, user, target) {
  // Heal
  target.heal(15);

  // Remove one debuff
  var allStatuses = [...target.allStatuses];
  for (const status of allStatuses) {
    if (status.buffType == buffTypeEnum.Debuff) {
      target.removeStatus(status);
      return;
    }
  }
}

//---------------
// Recovers HP of one ally by 15.
//---------------
function skillHeal(map, user, target) {
  // Heal
  target.heal(15);
}

//---------------
// Recovers HP of one ally by 20. Removes their Poison debuffs.
//---------------
function skillHealPoison(map, user, target) {
  // Heal
  target.heal(20);

  // Remove poison debuffs
  while (target.hasStatus("Poison")) {
    var poison = target.getStatus("Poison");
    target.removeStatus(poison);
  }
}

//---------------
// Splits into a Hassan on an adjacent space, sacrificing 25 HP from your Max HP. Cannot be used if HP is 25 or less.
//---------------
function skillHundredFaces(map, user, target) {
  // HP check
  if (user.curHP <= 25) { return; }

  // Take away HP
  user.curHP -= 25;
  user.maxHP -= 25;

  // Random type of Hassan
  var types = ["HassanZayd", "HassanMakuru", "HassanGozuru"];
  var rand = getRandomInt(0, types.length);

  // In this case, target is the space to spawn at
  unit = window[types[rand]](map._game, user.faction);
  unit.maxHP = 25;
  unit.curHP = 25;

  map.spawnUnit(unit, target.x, target.y);
  map.addActiveUnit(unit);
}

//---------------
// Draws attention of enemies to self for 3 turns. Recovers 20 HP.
//---------------
function skillLoveliness(map, user, target) {
  // Heal
  target.heal(20);

  // Taunt
  target.addStatus(new Status(
    "Taunt", "status-Taunt", statusTypeEnum.Check, buffTypeEnum.Buff, 0, 100, 3,
    "Draws attention of all enemies in range of attacking the user"
  ), null, 1000, user);
}

//---------------
// Increases own attack by 10%.
//---------------
function skillMadEnhancement(map, user, target) {
  // Attack Up
  target.addAttackStatus(new Status(
    "Attack Up", "status-Attack Up", statusTypeEnum.Passive, buffTypeEnum.Buff, 10, 100, -1,
    "Increases Attack by 10%"
  ), null, null, user);
}

//---------------
// Increases own attack by 5%..
//---------------
function skillMadEnhancementLow(map, user, target) {
  // Attack Up
  target.addAttackStatus(new Status(
    "Attack Up", "status-Attack Up", statusTypeEnum.Passive, buffTypeEnum.Buff, 5, 100, -1,
    "Increases Attack by 5%"
  ), null, null, user);
}

//---------------
// Increases own debuff resistance by 20%.
//---------------
function skillMagicResA(map, user, target) {
  // Debuff Resistance
  target.addDebuffStatus(new Status(
    "Debuff Resistance Up", "status-Debuff Resistance Up", statusTypeEnum.Debuff, buffTypeEnum.Buff, 20, 100, -1,
    "Increases Debuff Resistance by 20%"
  ), null, null, user);
}

//---------------
// Increases own debuff resistance by 10%.
//---------------
function skillMagicResLow(map, user, target) {
  // Debuff Resistance
  target.addDebuffStatus(new Status(
    "Debuff Resistance Up", "status-Debuff Resistance Up", statusTypeEnum.Debuff, buffTypeEnum.Buff, 10, 100, -1,
    "Increases Debuff Resistance by 10%"
  ), null, null, user);
}

//---------------
// Skill effect that is manually accounted for.
//---------------
function skillManual(map, user, target) {
  // Manually accounted for
}

//---------------
// Grants self Sure Hit and Evasion for 1 turn.
//---------------
function skillMayKing(map, user, target) {
  // Sure hit
  target.addStatus(new Status(
    "Sure Hit", "status-Sure Hit", statusTypeEnum.Check, buffTypeEnum.Buff, 0, 100, 1,
    "Allows attacking those with the Evasion status"
  ), null, null, user);

  // Evasion
  target.addStatus(new Status(
    "Evasion", "status-Evade", statusTypeEnum.Block, buffTypeEnum.Buff, 0, 100, 1,
    "Evades attacks that are not Sure Hit"
  ), null, 1500, user);
}

//---------------
// Recovers 40 HP and charges own NP gauge by 1 bar.
//---------------
function skillNPHeal(map, user, target) {
  // Heal
  target.heal(40);

  // Increase NP
  target.increaseNPCharge(2);
}

//---------------
// Recovers 20 HP and charges own NP gauge by 1 bar.
//---------------
function skillNPHealLite(map, user, target) {
  // Heal
  target.heal(20);

  // Increase NP
  target.increaseNPCharge(2);
}

//---------------
// Increases own NP charge generation to 1 bar per turn for 3 turns.
//---------------
function skillNPCharge(map, user, target) {
  // Increase NP Charge
  target.addStatus(new Status(
    "NP Charge Up", "status-NP Charge Up", statusTypeEnum.Check, buffTypeEnum.Buff, 1, 100, 3,
    "NP charges at a rate of 1 bar per turn"
  ), null, null, user);
}

//---------------
// Charges own NP gauge by 1 bar.
//---------------
function skillNPGainOne(map, user, target) {
  // Increase NP
  target.increaseNPCharge(2);
}

//---------------
// Charges own NP gauge by 1.5 bars.
//---------------
function skillNPGain(map, user, target) {
  // Increase NP
  target.increaseNPCharge(3);
}

//---------------
// Fully charges own NP gauge.
//---------------
function skillNPFull(map, user, target) {
  // Increase NP
  target.increaseNPCharge(target.npChargeTime);
}

//---------------
// Increases own attack by 10% for 3 turns. Grants self Guts status for 1 time.
// Reduces own debuff resistance by 20% for 3 turns. [Demerit]
//---------------
function skillPirateAttack(map, user, target) {
  // Attack Up
  target.addStatus(new Status(
    "Attack Up", "status-Attack Up", statusTypeEnum.Attack, buffTypeEnum.Buff, 10, 100, 3,
    "Increases Attack by 10%"
  ), null, null, user);

  // Guts
  target.addStatus(new Status(
    "Guts", "status-Guts", statusTypeEnum.Check, buffTypeEnum.Buff, 1, 100, -1,
    "Revives with 1/4th HP when defeated"
  ), null, 1500, user);

  // Debuff Resistance down
  target.addStatus(new Status(
    "Debuff Resistance Down", "status-Debuff Resistance Down", statusTypeEnum.Debuff, buffTypeEnum.Debuff, -20, 100, 3,
    "Decreases Debuff Resistance by 20%"
  ), null, 3000, user);
}

//---------------
// Increases own defense by 10% for 3 turns. Grants self Guts status for 1 time.
// Reduces own debuff resistance by 20% for 3 turns. [Demerit]
//---------------
function skillPirateDefense(map, user, target) {
  // Defense Up
  target.addStatus(new Status(
    "Defense Up", "status-Defense Up", statusTypeEnum.Defense, buffTypeEnum.Buff, 10, 100, 3,
    "Increases Defense by 10%"
  ), null, null, user);

  // Guts
  target.addStatus(new Status(
    "Guts", "status-Guts", statusTypeEnum.Check, buffTypeEnum.Buff, 1, 100, -1,
    "Revives with 1/4th HP when defeated"
  ), null, 1500, user);

  // Debuff Resistance down
  target.addStatus(new Status(
    "Debuff Resistance Down", "status-Debuff Resistance Down", statusTypeEnum.Debuff, buffTypeEnum.Debuff, -20, 100, 3,
    "Decreases Debuff Resistance by 20%"
  ), null, 3000, user);
}

//---------------
// Inflicts Poison with 5 damage for 5 turns to one enemy.
//---------------
function skillPoison(map, user, target) {
  // Poison
  target.addStatus(new Status(
    "Poison", "status-Poison", statusTypeEnum.DmgPT, buffTypeEnum.Debuff, 5, 100, 5,
    "Takes 5 damage at the beginning of each turn"
  ), null, null, user);
}

//---------------
// Hides self from enemies for 3 turns or until you attack.
//---------------
function skillPresenceConcealment(map, user, target) {
  // Presence Concealment
  target.addStatus(new Status(
    "Presence Concealment", "status-Presence Concealment", statusTypeEnum.Check, buffTypeEnum.Buff, 0, 100, 3,
    "Hides from enemies until the user attacks"
  ), null, null, user);
}

//---------------
// Increases defense and debuff resistance of allies in range including self by 30% for 1 turn.
//---------------
function skillProtector(map, user, target) {
  // Increase Defense
  target.addStatus(new Status(
    "Defense Up", "status-Defense Up", statusTypeEnum.Defense, buffTypeEnum.Buff, 30, 100, 1,
    "Increases Defense by 40%"
  ), null, null, user);

  // Debuff Resistance
  target.addDebuffStatus(new Status(
    "Debuff Resistance Up", "status-Debuff Resistance Up", statusTypeEnum.Debuff, buffTypeEnum.Buff, 30, 100, 1,
    "Increases Debuff Resistance by 15%"
  ), null, 1500, user);
}

//---------------
// Draws attention of enemies to self for 1 turn. Increases own NP charge generation to 1 bar per turn for 3 turns.
//---------------
function skillRearguard(map, user, target) {
  // Taunt
  target.addStatus(new Status(
    "Taunt", "status-Taunt", statusTypeEnum.Check, buffTypeEnum.Buff, 0, 100, 1,
    "Draws attention of all enemies in range of attacking the user"
  ), null, null, user);

  // Increase NP Charge
  target.addStatus(new Status(
    "NP Charge Up", "status-NP Charge Up", statusTypeEnum.Check, buffTypeEnum.Buff, 1, 100, 3,
    "NP charges at a rate of 1 bar per turn"
  ), null, 1500, user);
}

//---------------
// Recovers own HP by 10 every turn for 5 turns.
//---------------
function skillRegen(map, user, target) {
  // Regen
  target.addStatus(new Status(
    "HP Regen", "status-HP Regen", statusTypeEnum.Regen, buffTypeEnum.Buff, 10, 100, 5,
    "Recovers own HP by 10 every turn"
  ), null, null, user);
}

//---------------
// Increases own movement range by 1.
//---------------
function skillRiding(map, user, target) {
  // Movement Range
  target.movement = target.movement + 1;
}

//---------------
// Increases own defense by 10% for 3 turns. Increases own Poison debuff resistance for 3 turns.
//---------------
function skillRobustHealth(map, user, target) {
  // Increase Defense
  target.addStatus(new Status(
    "Defense Up", "status-Defense Up", statusTypeEnum.Defense, buffTypeEnum.Buff, 10, 100, 3,
    "Increases Defense by 10%"
  ), null, null, user);

  // Poison Resistance
  target.addStatus(new Status(
    "Poison Resistance", "status-Debuff Resistance Up", statusTypeEnum.Check, buffTypeEnum.Buff, 50, 100, 3,
    "Increases Debuff Resistance against Poison by 50%"
  ), null, 1500, user);
}

//---------------
// Inflicts Poison with 5 damage for 5 turns to enemies in range. Reduces attack of enemies in range by 5% for 3 turns.
//---------------
function skillSabotage(map, user, target) {
  // Poison
  target.addStatus(new Status(
    "Poison", "status-Poison", statusTypeEnum.DmgPT, buffTypeEnum.Debuff, 5, 100, 5,
    "Takes 5 damage at the beginning of each turn"
  ), null, null, user);

  // Attack Down
  target.addStatus(new Status(
    "Attack Down", "status-Attack Down", statusTypeEnum.Attack, buffTypeEnum.Debuff, -5, 100, 5,
    "Decreases Attack by 5%"
  ), null, 1500, user);
}

//---------------
// Increases own defense by 10%.
//---------------
function skillShapeshift(map, user, target) {
  // Attack Up
  target.addDefenseStatus(new Status(
    "Defense Up", "status-Defense Up", statusTypeEnum.Passive, buffTypeEnum.Buff, 10, 100, -1,
    "Increases Defense by 10%"
  ), null, null, user);
}

//---------------
// Increases own attack range by 1.
//---------------
function skillSharpshooter(map, user, target) {
  // Movement Range
  target.attackRange = target.attackRange + 1;
}

//---------------
// Increases own Instant-Kill success rate by 5% and debuff success rate by 10%.
//---------------
function skillSilentDance(map, user, target) {
  // Instant Kill Success is checked manually

  // Debuff Rate
  target.addDebuffSuccessStatus(new Status(
    "Debuff Success Up", "status-Debuff Success Up", statusTypeEnum.DebuffRate, buffTypeEnum.Buff, 10, 100, -1,
    "Increases Debuff success rate by 10%"
  ), null, null, user);
}

//---------------
// Increases own Instant-Kill success rate by 5%.
//---------------
function skillSilentMovement(map, user, target) {
  // Instant Kill Success is checked manually
}

//---------------
// Chance to Stun one enemy for 1 turn.
//---------------
function skillStun(map, user, target) {
  // Stun
  target.addStatus(new Status(
    "Stun", "status-Stun", statusTypeEnum.Stun, buffTypeEnum.Debuff, 0, 75, 1,
    "Unable to move or act"
  ), null, null, user);
}

//---------------
// Increases HP of own summons by 10%.
//---------------
function skillSummonConstr(map, user, target) {
  // Is manually checked for when summoning.
}

//---------------
// Summons a Dragon Tooth Warrior to an adjacent space.
//---------------
function skillSummonDTW(map, user, target) {
  // Random class
  var classes = [classEnum.Saber, classEnum.Archer, classEnum.Assassin];
  var rand = getRandomInt(0, classes.length);

  // In this case, target is the space to spawn at
  unit = DragonToothWarrior(map._game, user.faction, classes[rand]);

  // Item Construction
  if (user.hasPassiveSkill("Item Construction (Summon)")) {
    unit.maxHP = unit.maxHP + (unit.maxHP * .10);
    unit.curHP = unit.maxHP;
  }

  map.spawnUnit(unit, target.x, target.y);
  map.addActiveUnit(unit);
}

//---------------
// Draws attention of enemies to self for 1 turn.
//---------------
function skillTaunt1(map, user, target) {
  // Taunt
  target.addStatus(new Status(
    "Taunt", "status-Taunt", statusTypeEnum.Check, buffTypeEnum.Buff, 0, 100, 1,
    "Draws attention of all enemies in range of attacking the user"
  ), null, 1000, user);
}

//---------------
// Increases own healing from Ley Lines by 10%.
//---------------
function skillTerritory(map, user, target) {
  // Is manually checked for when Ley Lines heal HP
}
