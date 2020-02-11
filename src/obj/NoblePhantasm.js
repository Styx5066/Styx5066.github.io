/*
* NoblePhantasm object
*  - Defines NP name, type, and effects
*/

// Skill types
const npTypeEnum = {
  Self:      "Target Self",
  Single:    "Single Target",
  AoEdir:    "AoE Directional",
  AoEburst:  "AoE Burst",
  AoEcone:   "AoE Cone",

  AllyBurst: "AoE Burst on Allies",
}

class NoblePhantasm {
  //---------------
  // DESCRIPTION: Creates a new NP
  // PARAMS:
  //  name      (I,REQ) - Name of the NP
  //  subName   (I,REQ) - Subname of the NP
  //  npType    (I,REQ) - Type from npTypeEnum
  //  effectFun (I,REQ) - Name of function that applies the NP's effects. Must take in the map, a user (unit using the NP),
  //                       and target (unit being used against) parameters.
  //  strength  (I,OPT) - Strength of damage for damaging NPs. 1 = normal damage, 2 = 2x damage, etc. (default: 1)
  //  range     (I,OPT) - Range in # of tiles, if NP is targetable.
  //  description (I,OPT) - Array of strings that serve as the description of the NP. Each one is displayed on a new line.
  //---------------
  constructor(name, subName, npType, effectFun, strength, range, description) {
    this._name = name;
    this._subName = subName;
    this._description = description;

    this._npType = npType;
    this._effectFun = effectFun;
    this._strength = strength || 1;
    this._range = range;
  }

  //---------------
  // Getters & Setters
  //---------------
  get name() { return this._name; }
  set name(x) { this._name = x; }

  get subName() { return this._subName; }
  set subName(x) { this._subName = x; }

  get description() { return this._description; }
  set description(x) { this._description = x; }


  get npType() { return this._npType; }
  set npType(x) { this._npType = x; }

  get effectFun() { return this.effectFun; }
  set effectFun(x) { this._effectFun = x; }

  get strength() { return this._strength; }
  set strength(x) { this._strength = x; }

  get range() { return this._range; }
  set range(x) { this._range = x; }


  //---------------
  // DESCRIPTION: Applies the NP's effect to all provided units
  // PARAMS:
  //  map        (I,REQ) - Map object
  //  user       (I,REQ) - User of the NP
  //  targetList (I,REQ) - Array of units to affect
  //  npSound    (I,OPT) - Sound to play upon NP use other than the default
  //---------------
  effect(map, user, targetList, npSound) {
    var game = map._game;
    var timeline = game.tweens.createTimeline();
    map._tileHover.depth = -5;
    map._tileInfoBox.setDepth(-5);
    map._unitInfoBox.setDepth(-5);
    map.isTurnTransition = true;
    controls.stop();

    // Startup sound
    map._sounds.npStart.play();

    // Tint the screen
    var tint = game.add.sprite(0, 0, "screentint").setOrigin(0, 0);
    tint.setScrollFactor(0);
    tint.depth = 200;
    tint.alpha = 0;
    tint.setInteractive( useHandCursor(false) );

    timeline.add( {
      targets: tint,
      alpha: 1,
      ease: "Quad.easeIn",
      duration: 500,
    } );

    // Bring in portrait
    var portrait = game.add.sprite(-512, 0, user.portrait + "-Full").setOrigin(0.5, 0);
    portrait.setScrollFactor(0);
    portrait.depth = 201;

    timeline.add( {
      targets: portrait,
      x: 256,
      ease: "Quad.easeIn",
      duration: 500,
    } );

    // Fade in text
    var shadow = game.add.sprite(512, 313, "shadow-box").setOrigin(.5, 0.5);
    shadow.setScrollFactor(0);
    shadow.depth = 202;
    shadow.alpha = 0;

    var style = { font: "18px FrizQuadrata", fill: "#e9d100" };
    var npText = game.add.text(512, 350, "NOBLE PHANTASM", style).setOrigin(0.5, 0);
    npText.setStroke("#000", 3);
    npText.setScrollFactor(0);
    npText.depth = 203;
    npText.alpha = 0;

    style = { font: "18px FrizQuadrata", fill: "#fff" };
    var npSubname = game.add.text(512, 280, this._subName + " ", style).setOrigin(0.5, .5);
    npSubname.setStroke("#000", 2);
    npSubname.setScrollFactor(0);
    npSubname.depth = 203;
    npSubname.alpha = 0;

    style = { font: "45px FrizQuadrata", fill: map._turnFaction.color };
    var npName = game.add.text(512, 313, this._name + " ", style).setOrigin(0.5, .5);
    npName.setShadow(2, 2, "#000", 2);
    npName.setScrollFactor(0);
    npName.depth = 203;
    npName.alpha = 0;

    timeline.add( {
      targets: [shadow, npText, npSubname, npName],
      alpha: 1,
      ease: "Quad.easeIn",
      duration: 500,
      hold: 1000,
    } );

    // Fade everything out and do the attack
    timeline.add( {
      targets: [tint, portrait, shadow, npText, npSubname, npName],
      alpha: 0,
      ease: "Quad.easeIn",
      duration: 1000,
      onComplete: () => {
        // Remove sprites
        for (const sprite of [tint, portrait, shadow, npText, npSubname, npName]) {
          sprite.destroy();
        }

        // Resume Controls
        controls.start();
        map._tileHover.depth = 20;
        map._tileInfoBox.setDepth(50);
        map._unitInfoBox.setDepth(50);
        map.isTurnTransition = false;

        // Do damage
        if (npSound) { npSound.play(); }
        else { map._sounds.npDamage.play(); }

        var isFirst = true;
        for (const target of targetList) {
          window[this._effectFun](map, user, target, this._strength, isFirst);
          isFirst = false;
        }

        // End turn
        map.waitUnit(user, true);
      }
    } );

    timeline.play();
  }
}

//---------------
// DESCRIPTION: Standard NP Strength of a Single-target attack
//---------------
function npStrengthSingle() { return 3; }

//---------------
// DESCRIPTION: Standard NP Strength of an AoE attack
//---------------
function npStrengthAoE()    { return 2; }


// ============================================================
//   Individual NP Effects
// ============================================================

//---------------
// 70% chance to increase attack of allies in range by 20% for 3 turns.
// 70% chance to increase defense of allies in range by 20% for 3 turns.
// Recovers HP of allies in range by 10 every turn for 3 turns.
//---------------
function npAndersen(map, user, target, strength, isFirst) {
  var delay = 0;

  // Regen
  target.addStatus(new Status(
    "HP Regen", "status-HP Regen", statusTypeEnum.Regen, buffTypeEnum.Buff, 10, 100, 3,
    "Recovers own HP by 10 every turn"
  ), null, null, user);

  // Chance to increase Attack
  var rand = getRandomInt(0, 100);
  if (rand >= 30) {
    target.addStatus(new Status(
      "Attack Up", "status-Attack Up", statusTypeEnum.Attack, buffTypeEnum.Buff, 20, 100, 3,
      "Increases Attack by 10%"
    ), null, 1500, user);
    delay = 1500;
  }

  // Chance to increase Defense
  rand = getRandomInt(0, 100);
  if (rand >= 30) {
    target.addStatus(new Status(
      "Defense Up", "status-Defense Up", statusTypeEnum.Defense, buffTypeEnum.Buff, 20, 100, 3,
      "Increases Defense by 10%"
    ), null, (delay + 1500), user);
  }
}

//---------------
// Deals 300% damage to one enemy. Deals extra damage based on own remaining HP (Percent remaining HP * 300%).
//---------------
function npAnneMary(map, user, target, strength, isFirst) {
  // Extra damage
  var percent = 1 - (user.curHP / user.maxHP);
  strength += (npStrengthSingle() * percent);

  // Damage
  map.attack(target, strength, true, true);
}

//---------------
// Deals damage to one enemy. Sacrifices self.
//---------------
function npArash(map, user, target, strength, isFirst) {
  // Sacrifice self
  if (isFirst) {
    map._game.time.delayedCall(1000, () => { map.killUnit(user); });
  }

  // Damage
  map.attack(target, strength, true, true);
}

//---------------
// Deals damage that ignores defense to enemies in range. Grants self evasion for 2 attacks.
//---------------
function npAstolfo(map, user, target, strength, isFirst) {
  // Damage
  var defIgnore = true;
  map.attack(target, strength, true, true, defIgnore);

  // Give self evasion
  if (isFirst) {
    user.addStatus(new Status(
      "Evasion", "status-Evade", statusTypeEnum.Block, buffTypeEnum.Buff, 3, 100, -1,
      "Evades attacks that are not Sure Hit"
    ), null, null, user);
  }
}

//---------------
// Increases own attack by 50% for 1 turn and deals 300% damage to one enemy.
//---------------
function npBedivere(map, user, target, strength, isFirst) {
  // Attack Up
  user.addStatus(new Status(
    "Attack Up", "status-Attack Up", statusTypeEnum.Attack, buffTypeEnum.Buff, 50, 100, 1,
    "Increases Attack by 50%"
  ), null, null, user);

  // Damage
  map.attack(target, strength, true, true);
}

//---------------
// Deals 200% damage to enemies in range. Reduces their defense by 10% for 5 turns.
//---------------
function npBunyan(map, user, target, strength, isFirst) {
  // Reduce Defense
  target.addStatus(new Status(
    "Defense Down", "status-Defense Down", statusTypeEnum.Defense, buffTypeEnum.Debuff, -10, 100, 5,
    "Decreases Defense by 10%"
  ), null, 1000, user);

  // Damage
  map.attack(target, strength, true, true);
}

//---------------
// Reduces Attack and Defense of enemies in range by 20% for 3 turns. Charms them for 1 turn.
//---------------
function npChevalier(map, user, target, strength, isFirst) {
  // Charm
  target.addStatus(new Status(
    "Charm", "status-Charm", statusTypeEnum.Stun, buffTypeEnum.Debuff, 0, 100, 1,
    "Unable to move or act"
  ), null, null, user);

  // Attack Down
  target.addStatus(new Status(
    "Attack Down", "status-Attack Down", statusTypeEnum.Attack, buffTypeEnum.Debuff, -20, 100, 3,
    "Decreases Attack by 10%"
  ), null, 1500, user);

  // Defense Down
  target.addStatus(new Status(
    "Defense Down", "status-Defense Down", statusTypeEnum.Defense, buffTypeEnum.Debuff, -20, 100, 3,
    "Decreases Defense by 10%"
  ), null, 3000, user);

  // No damage
}

//---------------
// Grants Sure Hit to Self for 1 turn and deals 300% damage to one enemy. 5% chance to Instant-Kill them.
// Reduces their Defense by 10% for 3 turns.
//---------------
function npCu(map, user, target, strength, isFirst) {
  // Check Instant-kill
  if (target.instantKill(5, user)) {
    target.floatUnitText("Instant Kill", "#ff4040", 500, 3);
    map.killUnit(target);
    return;
  }

  // Sure hit
  user.addStatus(new Status(
    "Sure Hit", "status-Sure Hit", statusTypeEnum.Check, buffTypeEnum.Buff, 0, 100, 1,
    "Allows attacking those with the Evasion status"
  ), null, null, user);

  // Reduce Defense
  target.addStatus(new Status(
    "Defense Down", "status-Defense Down", statusTypeEnum.Defense, buffTypeEnum.Debuff, -10, 100, 1,
    "Decreases Defense by 10%"
  ), null, 1000, user);

  // Damage
  map.attack(target, strength, true, true);
}

//---------------
// Deals damage with no additional effects.
//---------------
function npDamage(map, user, target, strength, isFirst) {
  // Damage
  map.attack(target, strength, true, true);
}

//---------------
// Increases defense by 30% for 3 turns.
//---------------
function npDefenseUp(map, user, target, strength, isFirst) {
  // Increase Defense
  target.addStatus(new Status(
    "Defense Up", "status-Defense Up", statusTypeEnum.Defense, buffTypeEnum.Buff, 30, 100, 3,
    "Increases Defense by 30%"
  ), null, null, user);
}

//---------------
// Deals 200% damage that ignores defense buffs to enemies in range. Inflicts Curse with 5 damage for 3 turns to them.
//---------------
function npElizabeth(map, user, target, strength, isFirst) {
  // Curse
  target.addStatus(new Status(
    "Curse", "status-Curse", statusTypeEnum.DmgPT, buffTypeEnum.Debuff, 5, 100, 3,
    "Takes 5 damage at the beginning of each turn"
  ), null, 1000, user);

  // Damage
  var defIgnore = true;
  map.attack(target, strength, true, true, defIgnore);
}

//---------------
// Reduces damage taken by 10 and increases defense by 20% for 3 turns. Grants self Guts status for 3 times.
//---------------
function npHeracles(map, user, target, strength, isFirst) {
  // Damage Cut
  target.addStatus(new Status(
    "Damage Cut", "status-Damage Cut", statusTypeEnum.Check, buffTypeEnum.Buff, 10, 100, 3,
    "Decreases damage received by 10"
  ), null, null, user);

  // Increase Defense
  target.addStatus(new Status(
    "Defense Up", "status-Defense Up", statusTypeEnum.Defense, buffTypeEnum.Buff, 20, 100, 3,
    "Increases Defense by 20%"
  ), null, 1500, user);

  // Guts
  target.addStatus(new Status(
    "Guts", "status-Guts", statusTypeEnum.Check, buffTypeEnum.Buff, 3, 100, -1,
    "Revives with 1/4th HP when defeated"
  ), null, 3000, user);
}

//---------------
// Deals an extra 50% damage for each Argo-Related ally on the field except self.
//---------------
function npJason(map, user, target, strength, isFirst) {
  // Increase strength for Argo-Related allies
  for (const unit of map._unitBank) {
    if (unit.isEnemy(user)) { continue; }
    if (user.name == unit.name) { continue; }

    if (unit.hasTrait("Argo-Related")) {
      strength += 0.5;
    }
  }

  // Damage
  map.attack(target, strength, true, true);
}

//---------------
// Deals 200% damage to enemies in range. Inflicts Burn with 5 damage for 10 turns to them.
// 50% chance to Stun them for 1 turn. Range: A line of 4 spaces in one direction.
//---------------
function npKiyohime(map, user, target, strength, isFirst) {
  // Burn
  target.addStatus(new Status(
    "Burn", "status-Burn", statusTypeEnum.DmgPT, buffTypeEnum.Debuff, 5, 100, 10,
    "Takes 5 damage at the beginning of each turn"
  ), null, 1000, user);

  // Stun chance
  target.addStatus(new Status(
    "Stun", "status-Stun", statusTypeEnum.Stun, buffTypeEnum.Debuff, 0, 50, 1,
    "Unable to move or act"
  ), null, 2500, user);

  // Damage
  map.attack(target, strength, true, true);
}

//---------------
// Grants Sure Hit to self for 1 turn and deals 300% damage to one enemy.
//---------------
function npKuro(map, user, target, strength, isFirst) {
  // Sure hit
  user.addStatus(new Status(
    "Sure Hit", "status-Sure Hit", statusTypeEnum.Check, buffTypeEnum.Buff, 0, 100, 1,
    "Allows attacking those with the Evasion status"
  ), null, null, user);

  // Damage
  map.attack(target, strength, true, true);
}

//---------------
// Increases own defense by 40% for 3 turns. Draws attention of enemies to self for 3 turns.
//---------------
function npLeonidas(map, user, target, strength, isFirst) {
  // Taunt
  target.addStatus(new Status(
    "Taunt", "status-Taunt", statusTypeEnum.Check, buffTypeEnum.Buff, 0, 100, 3,
    "Draws attention of all enemies in range of attacking the user"
  ), null, null, user);

  // Increase Defense
  target.addStatus(new Status(
    "Defense Up", "status-Defense Up", statusTypeEnum.Defense, buffTypeEnum.Buff, 40, 100, 3,
    "Increases Defense by 40%"
  ), null, 1500, user);
}

//---------------
// Deals damage to one enemy and removes their buffs.
//---------------
function npMedea(map, user, target, strength, isFirst) {
  // Remove target's buffs
  var allStatuses = [...target.allStatuses];
  for (const status of allStatuses) {
    if (status.buffType == buffTypeEnum.Buff) {
      target.removeStatus(status);
    }
  }

  // Damage
  map.attack(target, strength, true, true);
}

//---------------
// Deals damage to one enemy and removes their buffs.
//---------------
function npMedeaLily(map, user, target, strength, isFirst) {
  // Remove target's debuffs
  var allStatuses = [...target.allStatuses];
  for (const status of allStatuses) {
    if (status.buffType == buffTypeEnum.Debuff) {
      target.removeStatus(status);
    }
  }

  // Heal
  target.heal(50);
}

//---------------
// Deals damage that ignores defense to enemies in range. Reduces their defense for 1 turn.
//---------------
function npNero(map, user, target, strength, isFirst) {
  // Reduce Defense
  target.addStatus(new Status(
    "Defense Down", "status-Defense Down", statusTypeEnum.Defense, buffTypeEnum.Debuff, -20, 100, 1,
    "Decreases Defense by 20%"
  ), null, 1000, user);

  // Damage
  var defIgnore = true;
  map.attack(target, strength, true, true, defIgnore);
}

//---------------
// Stuns and Deals damage to one enemy. 5% chance to Instant-Kill them.
//---------------
function npRobinHood(map, user, target, strength, isFirst) {
  // Increase modifier if poison debuff
  if (target.hasStatus("Poison")) {
    strength++;
  }

  // Damage
  map.attack(target, strength, true, true);
}

//---------------
// Stuns and Deals damage to one enemy. 5% chance to Instant-Kill them.
//---------------
function npScathach(map, user, target, strength, isFirst) {
  // Check Instant-kill
  if (target.instantKill(5, user)) {
    target.floatUnitText("Instant Kill", "#ff4040", 500, 3);
    map.killUnit(target);
    return;
  }

  // Stun
  target.addStatus(new Status(
    "Stun", "status-Stun", statusTypeEnum.Stun, buffTypeEnum.Debuff, 0, 100, 1,
    "Unable to move or act"
  ), null, 1000, user);

  // Damage
  map.attack(target, strength, true, true);
}

//---------------
// Deals 200% damage that ignores defense buffs to enemies in range. Deals an extra 100% damage if HP is below 50%.
// Recovers own HP by 50.
//---------------
function npSpartacus(map, user, target, strength, isFirst) {
  // Strength
  var percentHP = Math.floor(user.curHP / user.maxHP) * 100;
  if (percentHP < 50) {
    strength += 1;
  }

  // Healing
  if (isFirst) {
    map._game.time.delayedCall(250, () => { user.heal(50); });
  }

  console.log(strength)

  // Damage
  var defIgnore = true;
  map.attack(target, strength, true, true, defIgnore);
}

//---------------
// Recovers HP of allies in range by 25 and reduces their Skill cooldowns by 1. Charges their NP gauge by 1 bar.
//---------------
function npTamamo(map, user, target, strength, isFirst) {
  // Reduce skill cooldowns
  target.reduceSkillCooldown();

  // NP Charge
  target.increaseNPCharge(2);

  // Heal
  target.heal(25);
}

//---------------
// Deals damage to one enemy. 5% chance to Instant-Kill them.
//---------------
function npZabaniya(map, user, target, strength, isFirst) {
  // Check Instant-kill
  if (target.instantKill(5, user)) {
    target.floatUnitText("Instant Kill", "#ff4040", 500, 3);
    map.killUnit(target);
    return;
  }

  // Damage
  map.attack(target, strength, true, true);
}

//---------------
// Deals 300% damage to one enemy. 5% chance to Instant-Kill them.
// Inflicts Poison with 10 damage for 5 turns. 40% chance to seal their skills and NP for 1 turn.
//---------------
function npZabaniyaPoison(map, user, target, strength, isFirst) {
  // Check Instant-kill
  if (target.instantKill(5, user)) {
    target.floatUnitText("Instant Kill", "#ff4040", 500, 3);
    map.killUnit(target);
    return;
  }

  // Poison
  target.addStatus(new Status(
    "Poison", "status-Poison", statusTypeEnum.DmgPT, buffTypeEnum.Debuff, 10, 100, 5,
    "Takes 10 damage at the beginning of each turn"
  ), null, 1000, user);
  var delay = 1000;

  // Chance to Seal Skills
  var rand = getRandomInt(0, 100);
  if (rand >= 60) {
    target.addStatus(new Status(
      "Seal Skills", "status-Skill Seal", statusTypeEnum.Check, buffTypeEnum.Debuff, 0, 100, 2,
      "Prevents use of Skills"
    ), null, 2500, user);
    delay = 2500;
  }

  // Chance to Seal NP
  rand = getRandomInt(0, 100);
  if (rand >= 60) {
    target.addStatus(new Status(
      "Seal NP", "status-NP Seal", statusTypeEnum.Check, buffTypeEnum.Debuff, 0, 100, 2,
      "Prevents use of Noble Phantasm"
    ), null, (delay + 1500), user);
  }

  // Damage
  map.attack(target, strength, true, true);
}
