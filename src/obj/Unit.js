/*
* Unit object
*  - Defines unit appearance, abilities, position, etc.
*/

// Movement types
const moveTypeEnum = {
  Ground: "Ground",
  Flight: "Flight"
}

class Unit {
  //---------------
  // DESCRIPTION: Creates a new Unit
  // PARAMS:
  //  game      (I,REQ) - Game object
  //  name      (I,REQ) - Name of the unit
  //  portrait  (I,REQ) - Preloaded name of the image's portrait
  //  faction   (I,REQ) - Faction object the unit belongs to
  //  unitClass (I,REQ) - Class the unit belongs to from classEnum
  //  rank      (I,OPT) - Unit rank from rankEnum (default: Bronze)
  //
  //  maxHP       (I,OPT) - Maximum HP (default: 100)
  //  attack      (I,OPT) - Attack (default: 75)
  //  attackRange (I,OPT) - Attack range (default: 1)
  //  movement    (I,OPT) - Movement range on the map (default: 4)
  //  moveType    (I,OPT) - Movement type from moveTypeEnum (default: Ground)
  //
  //  noblePhantasm (I,OPT) - NoblePhantasm object for the user's NP
  //  npChargeTime  (I,OPT) - Number of NP charge pieces (NP charges at a rate of 1/2 piece per turn).
  //                           If -1, unit does not have an NP.
  //
  //  activeSkills  (I,OPT) - Array of active Skills
  //  passiveSkills (I,OPT) - Array of passive Skills
  //
  //  traits        (I,OPT) - Array of traits that apply to the unit
  //  intro         (I,OPT) - Array of introduction lines when summoned
  //  load          (I,REQ) - Loading function
  //  aiType        (I,OPT) - AI Type from aiTypeEnum, only used when unit is on a non-playable faction (default: Normal)
  //---------------
  constructor(game, name, portrait, faction, unitClass, rank, maxHP, attack, attackRange, movement, moveType, noblePhantasm, npChargeTime, activeSkills, passiveSkills, traits, intro, load, aiType) {
    // Basic info
    this._name = name;
    this._load = load + "";
    this._portrait = portrait;
    this._origPortrait = portrait;

    this._unitClass = unitClass;
    this._origClass = unitClass;
    this._rank = rank || rankEnum.Bronze;
    this._cost = rankPower(this._rank) * 100;

    this._traits = traits;
    this._intro = intro;

    // Stats
    this._maxHP = maxHP || 100;       // F/GO HP divided by 100
    this._curHP = maxHP;

    this._attack = attack || 75;      // F/GO ATK divided by 100
    this._defense = 0;                // Defense is only added through skill buffs
    this._dmgAdd = 0;

    this._attackRange = attackRange || 1;
    this._movement = movement || 4;
    this._moveType = moveType || moveTypeEnum.Ground;

    this._aiType = aiType || aiTypeEnum.Normal;

    // Status Effects
    this._allStatuses = [];

    this._attackStatuses = [];
    this._defenseStatuses = [];

    this._debuffStatuses = [];
    this._debuffSuccessStatuses = [];
    this._DPTstatuses = [];
    this._regenStatuses = [];

    this._stunStatus;
    this._blockStatus;

    this._statusSprites = [];

    // Active Skills
    this._activeSkills = activeSkills || [];

    // Passive Skills
    this._passiveSkills = passiveSkills || [];

    // Noble Phantasm
    this._noblePhantasm = noblePhantasm;
    this._npChargeTime = npChargeTime || 5;

    if (this._npChargeTime > 5) { this._npChargeTime = 5; }
    if (this._npChargeTime != -1) { this._npChargeTime = this._npChargeTime * 2; }
    if (!this._noblePhantasm) { this._npChargeTime = -1; }
    this._curCharge = 0;

    // Map-related
    this._sprite;
    this._classSprite;
    this._anim;
    this._spriteUI = [];
    this._spriteNoTint = [];
    this._fullHPWidth = 55;
    this._maskHP;

    this._game = game;
    this._faction = faction;
    this._xTile;
    this._yTile;
  }

  //---------------
  // DESCRIPTION: Displays the unit as a string, used mainly for sorting purposes
  //---------------
  toString() {
    var rank = 4 - rankPower(this._rank);
    var unitClass = classToOrder(this._unitClass);
    return rank + "-" + unitClass + "-" + this._name;
  }


  // ====================================================================================
  //                                BASICS
  // ====================================================================================
  get name() { return this._name; }
  set name(x) { this._name = x; }

  get load() { return this._load + ""; }
  set load(x) { this._load = x + ""; }

  get portrait() { return this._portrait; }
  set portrait(x) { this._portrait = x; }

  get unitClass() { return this._unitClass; }
  set unitClass(x) { this._unitClass = x; }

  get rank() { return this._rank; }
  set rank(x) { this._rank = x; }

  get cost() { return this._cost; }
  set cost(x) { this._cost = x; }

  addTrait(trait) { addElement(trait, this._traits); }
  removeTrait(trait) { removeElement(trait, this._traits); }
  get traits() { return this._traits; }
  set traits(x) { this._traits = x; }

  get intro() { return this._intro; }
  set intro(x) { this._intro = x; }

  get aiType() { return this._aiType; }
  set aiType(x) { this._aiType = x; }

  //---------------
  // DESCRIPTION: Determines if the unit has a specific trait
  // PARAMS:
  //  trait (I,REQ) - Name of trait to check for
  // RETURNS: True if the unit has the trait; otherwise false
  //---------------
  hasTrait(trait) {
    return this._traits.includes(trait);
  }

  // ====================================================================================
  //                                STATS
  // ====================================================================================
  get maxHP() { return this._maxHP; }
  set maxHP(x) { this._maxHP = x; }

  get curHP() { return this._curHP; }
  set curHP(x) { this._curHP = x; }

  get attack() { return this._attack; }
  set attack(x) { this._attack = x; }

  get defense() { return this._defense; }
  set defense(x) { this._defense = x; }

  get dmgAdd() { return this._dmgAdd; }
  set dmgAdd(x) { this._dmgAdd = x; }

  get movement() { return this._movement; }
  set movement(x) { this._movement = x; }

  get moveType() { return this._moveType; }
  set moveType(x) { this._moveType = x; }

  get attackRange() { return this._attackRange; }
  set attackRange(x) { this._attackRange = x; }


  get activeSkills() { return this._activeSkills; }
  set activeSkills(x) { this._activeSkills = x; }

  get passiveSkills() { return this._passiveSkills; }
  set passiveSkills(x) { this._passiveSkills = x; }

  //---------------
  // DESCRIPTION: Damages the unit
  // PARAMS:
  //  amount (I,REQ) - Amount of HP to damage
  //  color  (I,OPT) - Color of the damage text
  // RETURNS: true if the unit is now defeated; otherwise false
  //---------------
  damage(amount, color, noFloat) {
    var curHP = this._curHP;
    curHP = curHP - amount;

    if (curHP < 0) {
      curHP = 0;
    }

    // Effectiveness color
    color = color || "#fff";

    // Do damage
    this.updateHP(curHP)
    if (!noFloat) { this.floatUnitText(amount, color); }

    return (curHP == 0);
  }

  //---------------
  // DESCRIPTION: Heals the unit
  // PARAMS:
  //  amount (I,REQ) - Amount of HP to heal
  //---------------
  heal(amount, noFloat) {
    var curHP = this._curHP;
    if (curHP == 0) { return; }
    curHP = curHP + amount;

    if (curHP > this._maxHP) {
      curHP = this._maxHP;
    }

    // Do healing
    this.updateHP(curHP)
    if (!noFloat) { this.floatUnitText(amount, "#b3e885", 500); }
  }

  //---------------
  // DESCRIPTION: Updates HP bar of the unit
  // PARAMS:
  //  curHP (I,REQ) - Current HP amount
  //---------------
  updateHP(curHP) {
    var startHP = this._curHP;
    this._curHP = curHP;

    var maxHP = this._maxHP;
    if ((!maxHP) || maxHP < 1) { return; }

    // Validate HP
    if (curHP < 0) { curHP = 0; }
    if (curHP > maxHP) { curHP = maxHP; }

    // Find the HP percentage
    var percent = curHP / maxHP;
    var amount = Math.abs(startHP - curHP);

    // Set the HP mask width
    this._game.tweens.add({
      targets: this._maskHP,
      scaleX: percent,
      ease: "Quad.easeOut",
      duration: (amount * 10),
    });
  }

  //---------------
  // DESCRIPTION: Floats specified text above the unit
  // PARAMS:
  //  text   (I,REQ) - Text to display/float
  //  color  (I,OPT) - Color of text in the format "#fff" (default: white)
  //  hold   (I,OPT) - Amount of time to hold on the HP before fading away (default: 0)
  //  heightMod (I,OPT) - Amount to divide sprite's height for to get the height of the float effect (default: 4)
  //  delay  (I,OPT) - Amount of time to delay the start of the animation (default: 0)
  //---------------
  floatUnitText(text, color, hold, heightMod, delay) {
    // Find place to spawn text
    var x = this._sprite.x + (this._sprite.displayWidth / 2);
    var y = this._sprite.y;
    heightMod = heightMod || 4;
    var height = (y - (this._sprite.displayHeight / heightMod));

    floatHPchange(this._game, x, y, height, text, color, hold, delay);
  }

  //---------------
  // DESCRIPTION: Handles unit info at the start of a new turn, such as cooldowns and charges.
  // PARAMS:
  //  maps      (I,REQ) - Map object
  //  firstTurn (I,OPT) - If true, is the first turn of the battle
  //---------------
  doTurnWork(map, firstTurn) {
    var rip = this.damagePerTurn(map);
    if (rip) { return; }

    this.regenPerTurn(map);

    this.reduceSkillCooldown();
    if (!firstTurn) { this.increaseNPCharge(); }
    this.reduceStatusTurnCount();
  }

  // ====================================================================================
  //                                STATUS
  // ====================================================================================
  addAllStatus(status) { addElement(status, this._allStatuses); }
  removeAllStatus(status) { removeElement(status, this._allStatuses); }
  get allStatuses() { return this._allStatuses; }

  addAttackStatus(status) { addElement(status, this._attackStatuses); }
  removeAttackStatus(status) { removeElement(status, this._attackStatuses); }
  get attackStatuses() { return this._attackStatuses; }

  addDefenseStatus(status) { addElement(status, this._defenseStatuses); }
  removeDefenseStatus(status) { removeElement(status, this._defenseStatuses); }
  get defenseStatuses() { return this._defenseStatuses; }

  addDebuffStatus(status) { addElement(status, this._debuffStatuses); }
  removeDebuffStatus(status) { removeElement(status, this._debuffStatuses); }
  get debuffStatuses() { return this._debuffStatuses; }

  addDebuffSuccessStatus(status) { addElement(status, this._debuffSuccessStatuses); }
  removeDebuffSuccessStatus(status) { removeElement(status, this._debuffSuccessStatuses); }
  get debuffSuccessStatuses() { return this._debuffSuccessStatuses; }

  addDPTstatus(status) { addElement(status, this._DPTstatuses); }
  removeDPTStatus(status) { removeElement(status, this._DPTstatuses); }
  get DPTstatuses() { return this._DPTstatuses; }

  addRegenStatus(status) { addElement(status, this._regenStatuses); }
  removeRegenStatus(status) { removeElement(status, this._regenStatuses); }
  get regenStatuses() { return this._regenStatuses; }

  get stunStatus() { return this._stunStatus; }
  set stunStatus(x) { this._stunStatus = x; }

  get blockStatus() { return this._blockStatus; }
  set blockStatus(x) { this._blockStatus = x; }

  addStatusSprite(sprite) { addElement(sprite, this._statusSprites); }
  removeStatusSprite(sprite) { removeElement(sprite, this._statusSprites); }

  //---------------
  // DESCRIPTION: Determines if the unit has a specific status
  // PARAMS:
  //  statusName (I,REQ) - Name of status to check for
  // RETURNS: True if the unit has the status; otherwise false
  //---------------
  hasStatus(statusName) {
    for (const status of this._allStatuses) {
      if (status.name == statusName) { return true; }
    }
    return false;
  }

  //---------------
  // DESCRIPTION: Returns a specific status if the unit has it
  // PARAMS:
  //  statusName (I,REQ) - Name of status to check for
  // RETURNS: Status object if found; otherwise false
  //---------------
  getStatus(statusName) {
    for (const status of this._allStatuses) {
      if (status.name == statusName) { return status; }
    }
    return null;
  }

  //---------------
  // DESCRIPTION: Determines if a unit should be Instant-Killed
  // PARAMS:
  //  chance   (I,REQ) - Base % chance of success
  //  attacker (I,REQ) - Attacking unit
  // RETURNS: True if Instant-Kill is successful; otherwise false
  //---------------
  instantKill(chance, attacker) {
    // TODO: add instant kill resistance

    var deathRate = attacker.getStatus("Instant-Kill Chance Up");
    if (deathRate) {
      chance += deathRate.strength;
    }

    if (attacker.hasPassiveSkill("Silent Dance"))    { chance += 5; }
    if (attacker.hasPassiveSkill("Silent Movement")) { chance += 5; }

    var rand = getRandomInt(0, 100);
    if (rand >= chance) {
      return false;
    }

    return true;
  }

  //---------------
  // DESCRIPTION: Adds a status (buff or debuff) to the unit
  // PARAMS:
  //  status     (I,REQ) - Status to add
  //  noFloat    (I,OPT) - If true, do not float any text for the status change
  //  floatDelay (I,OPT) - Time to delay the status change float (default: 0)
  //  attacker   (I,OPT) - Attacking unit adding the status
  //---------------
  addStatus(status, noFloat, floatDelay, attacker) {
    // ==============================
    //   Failed
    // ==============================
    // Debuffs
    var hitChance = status.hitChance;
    if (status.buffType == buffTypeEnum.Debuff) {
      // Debuff Immunity
      if (this.hasStatus("Debuff Immunity")) { hitChance -= 1000; }

      // Positive means it's harder to inflict debuffs, negative means it's easier
      hitChance = hitChance - this.debuffResistance(status.name) + attacker.debuffSuccess();
    }

    // Hit chance
    if (hitChance < 100) {
      var rand = getRandomInt(0, 100);
      if (rand >= hitChance) {
        if (!noFloat) { this.floatUnitText("Miss", "#c1c1c1", 500, 3, floatDelay); }
        return;
      }
    }

    // Already stunned
    if ((status.statusType == statusTypeEnum.Stun) && (this._stunStatus)) {
      if (!noFloat) { this.floatUnitText("No effect", "#c1c1c1", 500, 3, floatDelay); }
      return;
    }

    // Already blocking
    if ((status.statusType == statusTypeEnum.Block) && (this._blockStatus)) {
      if (!noFloat) { this.floatUnitText("No effect", "#c1c1c1", 500, 3, floatDelay); }
      return;
    }

    // Already have the same Check status
    if ((status.statusType == statusTypeEnum.Check) && (this.hasStatus(status.name))) {
      if (!noFloat) { this.floatUnitText("No effect", "#c1c1c1", 500, 3, floatDelay); }
      return;
    }

    // Already NP Ready
    if ((status.statusType == statusTypeEnum.NPready) && (this._allStatuses.length > 0)) {
      if (this._allStatuses[0].statusType == statusTypeEnum.NPready) { return; }
    }

    // ==============================
    //   Successful
    // ==============================
    // Attack
    if (status.statusType == statusTypeEnum.Attack) { this.addAttackStatus(status); }
    // Debuff Res
    else if (status.statusType == statusTypeEnum.Debuff) { this.addDebuffStatus(status); }
    // Debuff Success
    else if (status.statusType == statusTypeEnum.DebuffRate) { this.addDebuffSuccessStatus(status); }
    // Defense
    else if (status.statusType == statusTypeEnum.Defense) { this.addDefenseStatus(status); }
    // Stun
    else if (status.statusType == statusTypeEnum.Stun) { this._stunStatus = status; }
    // Block
    else if (status.statusType == statusTypeEnum.Block) { this._blockStatus = status; }
    // DPT
    else if (status.statusType == statusTypeEnum.DmgPT) { this.addDPTstatus(status) }
    // Regen
    else if (status.statusType == statusTypeEnum.Regen) { this.addRegenStatus(status) }
    // Other
    else if (status.name == "Presence Concealment") { this.alphaFade(); }
    else if (status.name == "Class Change") { this.changeClass(status.strength); }

    // Float skill text
    var text = status.name;
    var color = "#fff";

    if (status.statusType == statusTypeEnum.Stun) {
      if (status.name == "Charm") { color = "#ffd2f6"; }
      else if (status.name == "Pig") { color = "#ffd2f6"; this.updateSprite("Pig"); }
      else { color = "#fbf134"; }
    }
    else if (status.statusType == statusTypeEnum.Block) { color = "#fff"; }
    else if (status.statusType == statusTypeEnum.DmgPT) {
      if (status.name == "Burn") { color = "#ff4136"; }
      else { color = "#d58ffe"; }
    }
    else if (status.statusType == statusTypeEnum.Regen) { color = "#b3e885"; }
    else if (status.strength > 0) { color = colorPositive(); }
    else if (status.strength < 0) { color = colorNegative(); }

    if (!noFloat) { this.floatUnitText(text, color, 500, 3, floatDelay); }

    // NP Ready status effects should always be first
    if (status.statusType == statusTypeEnum.NPready) {
      var allStatusesCopy = [status, ...this._allStatuses];
      this._allStatuses = [...allStatusesCopy];
      this.updateStatusSprites();
    }
    else {
      // Update statuses
      this.addAllStatus(status);
      if (this._allStatuses.length < 4) {
        this.updateStatusSprites();
      }
    }
  }

  //---------------
  // DESCRIPTION: Removes a status (buff or debuff) from the unit
  // PARAMS:
  //  status (I,REQ) - Status to remove
  //  skipSpriteUpdate (I,OPT) - If true, will not update the sprite tokens
  //---------------
  removeStatus(status, skipSpriteUpdate) {
    if (!status) { return; }

    // Attack
    if (status.statusType == statusTypeEnum.Attack) { this.removeAttackStatus(status); }
    // Debuff Res
    else if (status.statusType == statusTypeEnum.Debuff) { this.removeDebuffStatus(status); }
    // Debuff Success
    else if (status.statusType == statusTypeEnum.DebuffRate) { this.removeDebuffSuccessStatus(status); }
    // Defense
    else if (status.statusType == statusTypeEnum.Defense) { this.removeDefenseStatus(status); }
    // Stun
    else if (status.statusType == statusTypeEnum.Stun) {
      this._stunStatus = null;
      if (status.name == "Pig") {  }
    }
    // Block
    else if (status.statusType == statusTypeEnum.Block) { this._blockStatus = null; }
    // DPT
    else if (status.statusType == statusTypeEnum.DmgPT) { this.removeDPTStatus(status) }
    // Regen
    else if (status.statusType == statusTypeEnum.Regen) { this.removeRegenStatus(status) }
    // Other
    else if (status.name == "Presence Concealment") { this.alphaShow(); }
    else if (status.name == "Class Change") { this.changeClass(this._origClass); }

    this.removeAllStatus(status);
    if (!skipSpriteUpdate) { this.updateStatusSprites(); }
  }

  //---------------
  // DESCRIPTION: Reduces turn count of all statuses, removing them if appropriate
  //---------------
  reduceStatusTurnCount() {
    var curStatuses = [...this._allStatuses];
    for (const status of curStatuses) {
      if (status.duration == -1) { continue; }

      status.duration--;

      if (status.duration < 1) {
        this.removeStatus(status, true);
      }
    }

    this.updateStatusSprites();
  }

  //---------------
  // DESCRIPTION: Updates the status icons that display above the token
  //---------------
  updateStatusSprites() {
    var i = 0;
    for (const sprite of this._statusSprites) {
      var statusImage = "status-None";
      if (this._allStatuses.length > i) { statusImage = this._allStatuses[i].image; }

      sprite.setTexture(statusImage);
      i++;
    }
  }

  //---------------
  // DESCRIPTION: Returns the unit's total debuff resistance
  // PARAMS:
  //  statusName (I,REQ) - Name of the debuff being added
  // RETURNS: Total debuff resistance (0 if normal, positive if more resistant, negative if less resistant)
  //---------------
  debuffResistance(statusName) {
    var totalRes = 0;

    // Specific resistance
    var res = this.getStatus(statusName + " Resistance");
    if (res) {
      totalRes = res.strength;
    }

    // General resistance
    for (const status of this._debuffStatuses) {
      totalRes += status.strength;
    }

    return totalRes;
  }

  //---------------
  // DESCRIPTION: Returns the unit's total debuff success rate modifier
  // RETURNS: Extra buff success rate (0 if normal, positive if more successful, negative if less successful)
  //---------------
  debuffSuccess() {
    var total = 0;

    // General resistance
    for (const status of this._debuffSuccessStatuses) {
      total += status.strength;
    }

    return total;
  }

  //---------------
  // DESCRIPTION: Applies DPT damage to unit
  // PARAMS:
  //  map (I,REQ) - Map object
  // RETURNS: True if the unit died as a result of DPT
  //---------------
  damagePerTurn(map) {
    var totalPoison = 0;
    var totalCurse = 0;
    var totalBurn = 0;
    var totalOther = 0;
    var isDead = false;

    // Stack totals
    for (const status of this._DPTstatuses) {
      if (status.name == "Poison") { totalPoison += status.strength; }
      else if (status.name == "Curse") { totalCurse += status.strength; }
      else if (status.name == "Burn") { totalBurn += status.strength; }
      else { totalOther += status.strength; }
    }

    // Do damage
    if (totalPoison > 0) {
      isDead = map.damageUnit(this, totalPoison, "#d58ffe");
    }

    if (!isDead && (totalCurse > 0)) {
      isDead = map.damageUnit(this, totalCurse, "#d58ffe");
    }

    if (!isDead && (totalBurn > 0)) {
      isDead = map.damageUnit(this, totalBurn, "#ff4136");
    }

    if (!isDead && (totalOther > 0)) {
      isDead = map.damageUnit(this, totalOther, "#fff");
    }

    return isDead;
  }

  //---------------
  // DESCRIPTION: Applies HP Regen healing to unit
  // PARAMS:
  //  map (I,REQ) - Map object
  //---------------
  regenPerTurn(map) {
    var total = 0;

    // Total HP regen
    for (const status of this._regenStatuses) {
      total += status.strength;
    }

    // Heal
    if (total > 0) {
      this.heal(total);
    }
  }

  // ====================================================================================
  //                                SKILLS
  // ====================================================================================

  //---------------
  // DESCRIPTION: Reduces cooldown of all the unit's active skills
  //---------------
  reduceSkillCooldown() {
    for (const skill of this._activeSkills) {
      if (skill.curTurn > 0) {
        skill.curTurn--;
      }
    }
  }

  //---------------
  // DESCRIPTION: Applies all passive skills
  //---------------
  applyPassiveSkills(map) {
    for (const skill of this._passiveSkills) {
      skill.effect(map, this, [this]);
    }
  }

  //---------------
  // DESCRIPTION: Determines if the unit has a specific passive skill
  // PARAMS:
  //  skillName (I,REQ) - Skill name to search for
  // RETURNS: True if unit has the skill, otherwise false
  //---------------
  hasPassiveSkill(skillName) {
    for (const skill of this._passiveSkills) {
      if (skill.name == skillName) { return true; }
    }
    return false;
  }

  //---------------
  // DESCRIPTION: Determines a specific passive skill if the unit has it
  // PARAMS:
  //  skillName (I,REQ) - Skill name to search for
  // RETURNS: Skill if present, otherwise null
  //---------------
  getPassiveSkill(skillName) {
    for (const skill of this._passiveSkills) {
      if (skill.name == skillName) { return skill; }
    }
    return null;
  }

  //---------------
  // DESCRIPTION: Determines a specific active skill if the unit has it
  // PARAMS:
  //  skillName (I,REQ) - Skill name to search for
  // RETURNS: Skill if present, otherwise null
  //---------------
  getActiveSkill(skillName) {
    for (const skill of this._activeSkills) {
      if (skill.name == skillName) { return skill; }
    }
    return null;
  }

  // ====================================================================================
  //                                NOBLE PHANTASM
  // ====================================================================================
  get noblePhantasm() { return this._noblePhantasm; }
  set noblePhantasm(x) { this._noblePhantasm = x; }

  get npChargeTime() { return this._npChargeTime; }
  set npChargeTime(x) { this._npChargeTime = x; }

  get curCharge() { return this._curCharge; }
  set curCharge(x) { this._curCharge = x; }

  //---------------
  // DESCRIPTION: Increases unit's NP Charge
  // PARAMS:
  //  amount (I,OPT) - Amount of charge to increase by (default: 1)
  //---------------
  increaseNPCharge(amount) {
    amount = amount || 1;

    // Check for NP Charge Up
    if (this.hasStatus("NP Charge Up")) { amount++; }

    // Increase Charge
    if (this._curCharge < this._npChargeTime) {
      this._curCharge += amount;
      if (this._curCharge > this._npChargeTime) { this._curCharge = this._npChargeTime; }

      if (this._curCharge == this._npChargeTime) {
        this.floatUnitText("NP Ready", "#e9d100", 500, 3, 1500);
        this.addStatus(new Status("NP Ready", "status-NP Ready", statusTypeEnum.NPready, null, 0, 100, -1, "Noble Phantasm is ready to use"), true);
      }
    }
  }

  //---------------
  // DESCRIPTION: Decreases unit's NP Charge
  // PARAMS:
  //  amount (I,OPT) - Amount of charge to decrease by (default: 1)
  //---------------
  decreaseNPCharge(amount) {
    amount = amount || 1;

    // Decrease Charge
    if ((this._curCharge > 0) && (this._npChargeTime != -1)) {
      this._curCharge -= amount;

      if (this._curCharge < 0) { this._curCharge = 0; }

      var npStatus = this.getStatus("NP Ready");
      if (npStatus) {
        this.removeStatus(npStatus);
      }
    }
  }


  // ====================================================================================
  //                                MAP
  // ====================================================================================
  get faction() { return this._faction; }
  set faction(x) { this._faction = x; }

  get sprite() { return this._sprite; }
  set sprite(x) { this._sprite = x; }

  get spriteUI() { return this._spriteUI; }

  get anim() { return this._anim; }

  get xTile() { return this._xTile; }
  set xTile(x) { this._xTile = x; }

  get yTile() { return this._yTile; }
  set yTile(x) { this._yTile = x; }

  //---------------
  // DESCRIPTION: Creates / Adds all necessary sprites to the unit
  // PARAMS:
  //  xPos     (I,REQ) - X position of the sprite
  //  yPos     (I,REQ) - Y position of the sprite
  //  tileSize (I,REQ) - Grid size to work with (X and Y)
  //  isEnemy  (I,OPT) - True if is an enemy sprite
  //  factionIndex (I,REQ) - Index of the unit's faction
  //---------------
  addSprites(xPos, yPos, tileSize, isEnemy, factionIndex) {
    var baseDepth = 5;
    factionIndex = factionIndex || 0;

    // Clear everything just in case
    this._spriteUI.length = 0;
    this._spriteNoTint.length = 0;


    // ==============================
    //   Base Sprite
    // ==============================
    var sprite = this._game.add.sprite(xPos, yPos, this._portrait + "-Token");
    this.setSpriteDefaults(sprite, null, baseDepth, isEnemy);
    sprite.setInteractive( useHandCursor() );
    this._sprite = sprite;

    // ==============================
    //   Token Borders
    // ==============================
    var rank = this._rank;
    var unitClass = this._unitClass;

    var tokenBot = this._game.add.sprite(xPos, yPos, "token-" + rank + "-bot");
    this.setSpriteDefaults(tokenBot, tileSize, (baseDepth + 1), isEnemy);
    this._spriteUI.push(tokenBot);

    var tokenTop = this._game.add.sprite(xPos, yPos, "token-" + rank + "-top");
    this.setSpriteDefaults(tokenTop, tileSize, (baseDepth - 1), isEnemy);
    this._spriteUI.push(tokenTop);

    var tokenBack = this._game.add.sprite(xPos, yPos, "token-" + rank + "-back");
    this.setSpriteDefaults(tokenBack, tileSize, (baseDepth - 2));
    this._spriteUI.push(tokenBack);

    var tokenClass = this._game.add.sprite(xPos, yPos, unitClass + "-" + rank + "-Token");
    this.setSpriteDefaults(tokenClass, 24, (baseDepth + 3));
    tokenClass.setOrigin(0.3, 0.3);
    this._spriteUI.push(tokenClass);
    this._classSprite = tokenClass;

    // ==============================
    //   HP
    // ==============================
    var barFrame = this._game.add.sprite(xPos, yPos, "token-bar-frame-" + rank);
    this.setSpriteDefaults(barFrame, 0, (baseDepth + 2.5));
    barFrame.setOrigin(0.04, -5.5);
    this._spriteUI.push(barFrame);

    var barBack = this._game.add.sprite(xPos, yPos, "token-bar-HP-0");
    this.setSpriteDefaults(barBack, 0, (baseDepth + 1.5));
    barBack.setOrigin(-0.1, -9.5);
    barBack.tint = 0x000000;
    barBack.tintFill = true;
    this._spriteUI.push(barBack);
    this._spriteNoTint.push(barBack);

    var barHP = this._game.add.sprite(xPos, yPos, "token-bar-HP-" + factionIndex);
    this.setSpriteDefaults(barHP, 0, (baseDepth + 2));
    barHP.setOrigin(-0.1, -9.5);
    this._spriteUI.push(barHP);
    this._spriteNoTint.push(barHP);

    var barMask = this._game.add.sprite(xPos, yPos, "token-bar-HP-mask");
    this.setSpriteDefaults(barMask, 0, (baseDepth + 2.1));
    barMask.setOrigin(-0.1, -9.5);
    barMask.tint = 0x000000;
    barMask.tintFill = true;
    this._spriteUI.push(barMask);
    this._spriteNoTint.push(barMask);

    barMask.setVisible(false);
    var mask = barMask.createBitmapMask();
    barHP.setMask(mask);
    this._maskHP = barMask;

    // ==============================
    //   Status Effects
    // ==============================
    var originX = -0.5;
    this._statusSprites.length = 0;
    for (var i = 0; i < 3; i++) {
      var statusImage = "status-None";
      if (this._allStatuses.length > i) { statusImage = this._allStatuses[i]; }

      var statusSprite = this._game.add.sprite(xPos, yPos, statusImage);
      statusSprite.setDisplaySize(16, 16);
      statusSprite.setOrigin(originX, 1);
      statusSprite.depth = (baseDepth + 3);

      this._spriteUI.push(statusSprite);
      this._spriteNoTint.push(statusSprite);
      this._statusSprites.push(statusSprite);

      originX -= 1;
    }

    // ==============================
    //   Animation
    // ==============================
    this.addAnimation(yPos);
  }

  //---------------
  // DESCRIPTION: Sets common properties for a unit sprite
  // PARAMS:
  //  sprite   (I,REQ) - Sprite to use
  //  tileSize (I,REQ) - Grid size to work with (X and Y)
  //  depth    (I,OPT) - Sprite depth (default: 5)
  //  isEnemy  (I,OPT) - True if is an enemy sprite
  //---------------
  setSpriteDefaults(sprite, tileSize, depth, isEnemy) {
    sprite.setOrigin(0, 0);
    if (tileSize > 0) { sprite.setDisplaySize(tileSize, tileSize); }
    sprite.depth = depth || 5;

    // Flip if it's an enemy
    if (isEnemy) {
      sprite.flipX = true;
    }
  }

  //---------------
  // DESCRIPTION: Changes unit's sprite
  // PARAMS:
  //  newImage (I,REQ) - Sprite to change to
  //---------------
  updateSprite(newImage) {
    if (!newImage) { return; }

    this.portrait = newImage;
    this._sprite.setTexture(newImage + "-Token");
  }

  //---------------
  // DESCRIPTION: Changes unit's class
  // PARAMS:
  //  newClass (I,REQ) - Class to change to
  //---------------
  changeClass(newClass) {
    this._unitClass = newClass;
    this._attackRange = defaultAtkRange(newClass);
    this._classSprite.setTexture(newClass + "-" + this._rank + "-Token");
  }

  //---------------
  // DESCRIPTION: Sets the position of unit's sprites and animations
  // PARAMS:
  //  xTile (I,REQ) - Xth tile
  //  yTile (I,REQ) - Yth tile
  //  xPos  (I,REQ) - X position
  //  yPos  (I,REQ) - Y position
  //---------------
  setPosition(xTile, yTile, xPos, yPos) {
    // Base sprite
    this._xTile = xTile;
    this._yTile = yTile;
    this._sprite.x = xPos;
    this._sprite.y = yPos;

    // Other sprite UI
    for (const unitSprite of this._spriteUI) {
      unitSprite.x = xPos;
      unitSprite.y = yPos;
    }

    // Animation
    this._anim.stop();
    this.addAnimation(yPos);
  }

  //---------------
  // DESCRIPTION: Sets the position of unit's sprites and animations
  // PARAMS:
  //  xTile (I,REQ) - Xth tile
  //  yTile (I,REQ) - Yth tile
  //  xPos  (I,REQ) - X position
  //  yPos  (I,REQ) - Y position
  //---------------
  addAnimation(y) {
    var rand = getRandomInt(0, 20);

    this._anim = this._game.tweens.add({
      targets: this._sprite,
      y: (y + 1),
      ease: "Quad.easeIn",
      yoyo: true,
      repeat: -1,
      duration: 500,
      delay: (10 * rand),
    });
  }

  //---------------
  // DESCRIPTION: Returns wether a unit is an enemy to this unit
  // PARAMS:
  //  otherUnit (I,REQ) - Other unit that may be an enemy
  // RETURNS: True if other unit is an enemy; otherwise false
  //---------------
  isEnemy(otherUnit) {
    if (!otherUnit) { return false; }

    if (this.faction.isAlly(otherUnit.faction)) {
      return false;
    }
    else {
      return true;
    }
  }

  //---------------
  // DESCRIPTION: Kills the unit, fading its UI away then destroying it
  // PARAMS:
  //  silent (I,OPT) - If true, no animation
  //---------------
  kill(silent) {
    // Silent
    if (silent) {
      this._sprite.destroy();
      this._classSprite.destroy();
      this._maskHP.destroy();
      this._anim.stop();

      for (const sprite of this._spriteUI) { sprite.destroy(); }
      for (const sprite of this._spriteNoTint) { sprite.destroy(); }
      for (const sprite of this._statusSprites) { sprite.destroy(); }
      return;
    }

    // Normal
    var allSprites = [...this._spriteUI];
    allSprites.push(this._sprite);

    this._game.tweens.add({
      targets: allSprites,
      alpha: 0,
      ease: "Quad.easeIn",
      duration: 1000,
      onComplete: () => {
        this._sprite.destroy();
        for (const sprite of this._spriteUI) { sprite.destroy(); }
      }
    });
  }

  //---------------
  // DESCRIPTION: Clears tint on the unit
  //---------------
  normal() {
    this.updateSprite(this._origPortrait);

    this._sprite.tint = 0xffffff;
    for (const sprite of this._spriteUI) {
      if (!this._spriteNoTint.includes(sprite)) {
        sprite.tint = 0xffffff;
      }
    }
    this._sprite.on('pointerout', () => { this._sprite.tint = 0xffffff; } );
  }

  //---------------
  // DESCRIPTION: Darkens the unit
  //---------------
  darken() {
    this._sprite.tint = 0xbbbbbb;
    for (const sprite of this._spriteUI) {
      if (!this._spriteNoTint.includes(sprite)) {
        sprite.tint = 0xbbbbbb;
      }
    }
    this._sprite.on('pointerout', () => { this._sprite.tint = 0xbbbbbb; } );
  }

  //---------------
  // DESCRIPTION: Fades the unit halfway
  //---------------
  alphaFade() {
    var fade = [];

    fade.push(this._sprite);
    for (const sprite of this._spriteUI) {
      // if (sprite == this._maskHP) { continue; }
      if (this._spriteNoTint.includes(sprite)) {
        sprite.alpha = 1;
        continue;
      }
      fade.push(sprite);
    }

    this._game.tweens.add({
      targets: fade,
      alpha: 0.5,
      ease: "Linear",
      duration: 500,
    });
  }

  //---------------
  // DESCRIPTION: Hides the unit completely
  //---------------
  alphaHide() {
    var fade = [];

    fade.push(this._sprite);
    for (const sprite of this._spriteUI) {
      // if (sprite == this._maskHP) { continue; }
      if (this._spriteNoTint.includes(sprite)) {
        sprite.alpha = 0;
        continue;
      }
      fade.push(sprite);
    }

    this._game.tweens.add({
      targets: fade,
      alpha: 0,
      ease: "Linear",
      duration: 500,
    });
  }

  //---------------
  // DESCRIPTION: Shows a hidden unit
  //---------------
  alphaShow() {
    var fade = [];

    fade.push(this._sprite);
    for (const sprite of this._spriteUI) {
      // if (sprite == this._maskHP) { continue; }
      if (this._spriteNoTint.includes(sprite)) {
        sprite.alpha = 1;
        continue;
      }
      fade.push(sprite);
    }

    this._game.tweens.add({
      targets: fade,
      alpha: 1,
      ease: "Linear",
      duration: 500,
    });
  }

  //---------------
  // DESCRIPTION: Increases the depth of all the unit's sprites
  // PARAMS:
  //  amount (I,REQ) - Amount to increase by
  //---------------
  increaseDepth(amount) {
    this._sprite.depth = this._sprite.depth + amount;
    for (const sprite of this._spriteUI) { sprite.depth = sprite.depth + amount; }
  }

  //---------------
  // DESCRIPTION: Decreases the depth of all the unit's sprites
  // PARAMS:
  //  amount (I,REQ) - Amount to decrease by
  //---------------
  decreaseDepth(amount) {
    this.increaseDepth(amount * -1);
  }
}
