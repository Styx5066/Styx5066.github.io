/*
* MapAI object
*  - Handles enemy AI on a battle map
*/

// Status types
const aiTypeEnum = {
  Normal:    "Normal",      // Standard AI
  Defensive: "Defensive",   // Tends to stay where it is until enemies draw near; usually guarding a point
  Offensive: "Offensive",   // Tends to rush enemies haphazardly
  Support:   "Support",     // Tends to stay with other allies and use support skills
  Zone:      "Zone",        // Stays in place until an enemy unit enters their zone; then turns Normal
}

class MapAI {
  //---------------
  // DESCRIPTION: Creates AI object for a map
  // PARAMS:
  //  map    (I,REQ) - Map object to work on
  //---------------
  constructor(map) {
    this._map = map;

    // ==============================
    //  Use to debug AI movements
    this._debugAI = devMode();
    // ==============================
  }

  //---------------
  // Getters & Setters
  //---------------
  get map() { return this._map; }
  set map(x) { this._map = x; }


  //---------------
  // DESCRIPTION: Starts turn for an AI-controlled active unit
  // PARAMS:
  //  unit (I,REQ) - Unit to control
  //---------------
  startUnitTurn(unit) {
    var aiType = unit.aiType || aiTypeEnum.Normal;

    // Bring to front while selected
    this._map.selectedOrigX = unit.xTile;
    this._map.selectedOrigY = unit.yTile;
    unit.increaseDepth(10);
    this._map.selectedUnit = unit;

    this.debugAI(unit, "AI Type is " + aiType);

    // ==============================
    //   Zone
    // ==============================
    if (aiType == aiTypeEnum.Zone) {
      var tile = this._map.getTile(unit.xTile, unit.yTile);

      // No zone - act normally
      if (!tile.zone) {
        aiType = aiTypeEnum.Normal;
        unit.aiType = aiType;
      }

      // Look for enemy units in zone
      // - Ignore hidden units
      for (const bankUnit of this._map._unitBank) {
        if (!unit.isEnemy(bankUnit)) { continue; }
        if (bankUnit.hasStatus("Presence Concealment")) { continue; }

        var otherTile = this._map.getTile(bankUnit.xTile, bankUnit.yTile);
        if (tile.zone == otherTile.zone) {
          // Found an enemy in zone
          this.debugAI(unit, "[Zone] Found enemy in zone. Switching to Normal.");
          aiType = aiTypeEnum.Normal;
          unit.aiType = aiType;
          break;
        }
      }

      // Act defensive otherwise
      if (aiType == aiTypeEnum.Zone) {
        this.debugAI(unit, "[Zone] No enemies in zone. Defensive.");
        aiType = aiTypeEnum.Defensive;
      }
    }

    // ==============================
    //   Noble Phantasm
    // ==============================
    var npReturn = this.checkNPuse(unit);
    if (npReturn) { return; }


    // ==============================
    //   Defensive
    // ==============================
    if (aiType == aiTypeEnum.Defensive) {
      // Prioritize enemies in attack range without moving
      var attackRange = [];
      this._map.enemyList.length = 0;
      this._map.checkEnemiesInRange(unit, this._map.enemyList, attackRange, unit.xTile, unit.yTile, unit.attackRange, 0, null, null, true);

      if (this._map.enemyList.length > 0) {

        // Potentially use a skill
        var skillReturn = this.checkSkillUse(unit, aiType);
        if (skillReturn) {
          if (skillReturn.endedTurn) { return; }
          if (skillReturn.delay) {
            this._map._game.time.delayedCall(800, () => {

              // Attack
              this._map._attacker = unit;
              var targetUnit = this.selectEnemyTarget(unit, this._map.enemyList);
              this.debugAI(unit, "[Defensive] Attacking enemy in range without moving");

              if (targetUnit) {
                this._map.attack(targetUnit);
              }

            });
            return;
          }
        }

        // Attack normally
        this._map._attacker = unit;
        var targetUnit = this.selectEnemyTarget(unit, this._map.enemyList);
        this.debugAI(unit, "[Defensive] Attacking enemy in range without moving");

        if (targetUnit) {
          this._map.attack(targetUnit);
        }
        return;
      }
    }


    // ==============================
    //   Support
    // ==============================
    // Check for Ally-targeting skills or NP
    var supportSkill = this.getSupportSkill(unit);
    if (supportSkill) {
      // Single Target
      if (supportSkill.skillType == skillTypeEnum.Ally) {
        this.debugAI(unit, "Support skill " + supportSkill.name + " available.");

        var allyList = [];
        var unitRange = this._map.getUnitRange(unit);
        var moveSkillRange = this._map.getMovementAttackRange(unit, unitRange, true, allyList, supportSkill.range, true);

        var usedSkill = false;
        if (allyList.length > 0) {
          usedSkill = this.useSingleSupportSkill(unit, supportSkill, allyList);
        }
        if (usedSkill) { return; }
      }


      // Burst
      if (supportSkill.skillType == skillTypeEnum.AllyBurst) {


      }
    }


    // ==============================
    //   Move & Attack
    // ==============================
    // Check for enemies within movement + attack range
    this.debugAI(unit, "Searching for enemies in range...");
    this._map.enemyList.length = 0;
    var unitRange = this._map.getUnitRange(unit);
    var moveAttackRange = this._map.getMovementAttackRange(unit, unitRange, true, this._map._enemyList);
    this.debugAI(unit, [...this._map.enemyList]);

    if (this._map.enemyList.length > 0) {

      // Potentially use a skill
      var skillReturn = this.checkSkillUse(unit, aiType);
      if (skillReturn) {
        if (skillReturn.endedTurn) { return; }
        if (skillReturn.delay) {
          this._map._game.time.delayedCall(800, () => {

            // Move to attack
            this._map._attacker = unit;
            var targetUnit = this.selectEnemyTarget(unit, this._map.enemyList);

            if (targetUnit) {
              this.debugAI(unit, "Moving to attack " + targetUnit.name);
              this._map.moveToAttack(targetUnit);
            }

          });
          return;
        }
      }

      // Move to attack
      this._map._attacker = unit;
      var targetUnit = this.selectEnemyTarget(unit, this._map.enemyList);

      if (targetUnit) {
        this.debugAI(unit, "Moving to attack " + targetUnit.name);
        this._map.moveToAttack(targetUnit);
      }
      return;
    }


    // ==============================
    //   Move Only
    // ==============================
    if (aiType != aiTypeEnum.Defensive) {
      // Otherwise, figure out where to move to
      var targetUnit = this.enemytoFollow(unit);
      this.debugAI(unit, "No enemies in range. Trying to follow " + targetUnit.name + "...");
      var xyPoint = this.pathToEnemy(unit, targetUnit);


      // Handle cases where there was nowhere to go
      if (!xyPoint) {
        this.debugAI(unit, "Nowhere to go. Waiting.");
        this._map.waitUnit(unit, true);
        return;
      }


      // Move as far as possible along the path
      this.debugAI(unit, "Moving to " + xyPoint.x + "-" + xyPoint.y + ".");
      this._map.moveUnit(unit, xyPoint.x, xyPoint.y, null, () => {
        this.useMoveSkill(unit);
        this._map.waitUnit(unit, true); });
      return;
    }
    else {
      // Defensive - use a move skill of available
      this.useMoveSkill(unit);
    }


    // ==============================
    //   Nothing
    // ==============================
    // If no applicable options, end unit's turn
    this.debugAI(unit, "Waiting.");
    this._map.waitUnit(unit, true);
  }

  //---------------
  // DESCRIPTION: Returns an enemy to target for attack from a list of available enemies
  // PARAMS:
  //  unit      (I,REQ) - Unit to control
  //  enemyList (I,REQ) - Array of enemy units available to attack
  //---------------
  selectEnemyTarget(unit, enemyList) {
    var targetEnemy;
    var mostDamage = 0;
    var leastHP = 999999;

    // Go through each possible target
    for (const enemy of enemyList) {
      // Always attack first target with taunt
      if (enemy.hasStatus("Taunt")) { return enemy; }

      // Figure out how much damage this unit would do
      var damage = this._map.damageCalc(unit, enemy, null, true);
      var enemyHP = enemy.curHP;

      // If the enemy would die, immediately select that one
      if (damage > enemyHP) {
        targetEnemy = enemy;
        break;
      }

      // Select the target that would take the most damage
      if (damage > mostDamage) {
        mostDamage = damage;
        leastHP = enemyHP;
        targetEnemy = enemy;
      }

      // If equal damage, select the target with the lowest current HP
      if ((damage == mostDamage) && (enemyHP < leastHP)) {
        leastHP = enemyHP;
        targetEnemy = enemy;
      }
    }

    return targetEnemy;
  }

  //---------------
  // DESCRIPTION: Finds the "nearest" enemy to start moving towards
  // PARAMS:
  //  unit (I,REQ) - Unit that is moving
  // RETURNS: A unit to start moving towards
  //---------------
  enemytoFollow(unit) {
    var unitX = unit.xTile;
    var unitY = unit.yTile;
    var shortestDistance = 999999;
    var selectedTarget;

    // Look at each enemy unit left
    for (const targetUnit of this._map.unitBank) {
      if (!unit.isEnemy(targetUnit)) { continue; }
      if (targetUnit.hasStatus("Presence Concealment")) { continue; }

      var targetX = targetUnit.xTile;
      var targetY = targetUnit.yTile;
      var distance = Math.abs(unitX - targetX) + Math.abs(unitY - targetY);

      // Randomly alternate between accepting equal-distance spots and not
      if (getRandomInt(0, 2)) {
        if (distance < shortestDistance) {
          shortestDistance = distance;
          selectedTarget = targetUnit;
        }
      }
      else {
        if (distance <= shortestDistance) {
          shortestDistance = distance;
          selectedTarget = targetUnit;
        }
      }

    }

    return selectedTarget;
  }

  //---------------
  // DESCRIPTION: Finds space to move to towards the given target
  // PARAMS:
  //  unit       (I,REQ) - Unit that is moving
  //  targetUnit (I,REQ) - Unit to find path to
  // RETURNS: An object with "x" and "y" properties for the selected space to move to
  //---------------
  pathToEnemy(unit, targetUnit) {
    var xyCoord;

    // Take zones into account
    var xyTarget = this._map.findConnection(unit, targetUnit);
    var targetX = xyTarget.x;
    var targetY = xyTarget.y;

    this.debugAI(unit, "In Zone " + this._map.unitZone(unit) + ", " + targetUnit.name + " in Zone " + this._map.unitZone(targetUnit));
    this.debugAI(unit, "Nearest Zone connection is " + xyTarget.x + "-" + xyTarget.y);


    // Get the unit's current movement range & handle near connection points
    var unitRange = this._map.getUnitRange(unit);
    var newXY = this.nearConnection(unit, targetUnit, unitRange, xyTarget);
    if (newXY) {
      this.debugAI(unit, "Connection is in movement range; targeting " + newXY.x + "-" + newXY.y + " with new movement range:");
      this.debugAI(unit, unitRange);
      targetX = newXY.x;
      targetY = newXY.y;
    }


    // Set the unit's current distance as the first shortest distance
    var xDistance = targetX - unit.xTile;
    var yDistance = targetY - unit.yTile;
    var shortestDistance = Math.abs(xDistance) + Math.abs(yDistance);


    // Find which of the available spaces is closest to the target
    for (var i = 0; i < unitRange.length; i++) {
      var x = unitRange[i][0];
      var y = unitRange[i][1];

      xDistance = targetX - x;
      yDistance = targetY - y;
      var totalDistance = Math.abs(yDistance) + Math.abs(xDistance);


      // Later range tiles will be farther out, so allow them to
      //  overwrite earlier ones if they're the same distance
      if (totalDistance <= shortestDistance) {
          shortestDistance = totalDistance;
          xyCoord = { x: x, y: y };
        }
      }

    return xyCoord;
  }

  //---------------
  // DESCRIPTION: Determines directions to prioritize when searching for the path to a tile
  // PARAMS:
  //  xDistance (I,REQ) - The target X tile - Unit X tile
  //  yDistance (I,REQ) - The target Y tile - Unit Y tile
  // RETURNS: An array of directions to prioritize, ie: ["north", "south", "west", "east"]
  //---------------
  pathDirections(xDistance, yDistance) {
    var vert1, vert2, horz1, horz2;
    var vert2Last = false;
    var horz2Last = false;
    var primaryDir;
    var retDir;

    // Find which directions to prioritize
    // - If distance is 0, prioritize both directions of the other axis before this one
    if (yDistance > 0) { vert1 = "south"; vert2 = "north";  }
    else { vert1 = "north"; vert2 = "south";  }
    if (yDistance == 0) { horz2Last = true; }

    if (xDistance > 0) { horz1 = "east"; horz2 = "west";  }
    else { horz1 = "west"; horz2 = "east";  }
    if (xDistance == 0) { vert2Last = true; }


    // Vertical
    if (Math.abs(yDistance) > Math.abs(xDistance)) {
      if (vert2Last) {
        retDir = [vert1, horz1, horz2, vert2];
      }
      else {
        retDir = [vert1, horz1, vert2, horz2];
      }
    }

    // Horizontal
    else {
      if (horz2Last) {
        retDir = [horz1, vert1, vert2, horz2];
      }
      else {
        retDir = [horz1, vert1, horz2, vert2];
      }
    }

    return retDir;
  }

  //---------------
  // DESCRIPTION: Finds a new target if the connection point is already in movement range
  // PARAMS:
  //  unit       (I,REQ) - Unit that is moving
  //  targetUnit (I,REQ) - Unit being followed
  //  unitRange  (I,REQ) - 2D array of available movement spaces
  //  xyConnect  (I,REQ) - An object with "x" and "y" properties
  // RETURNS: an object with "x" and "y" properties for the target tile coordinates
  //---------------
  nearConnection(unit, targetUnit, unitRange, xyConnect) {
    var inRange = false;
    var rangeXY = [];

    // For each movement space, look for the connection tile
    for (var i = 0; i < unitRange.length; i++) {
      var x = unitRange[i][0];
      var y = unitRange[i][1];

      rangeXY.push(x + "-" + y);

      if ((x == xyConnect.x) && (y == xyConnect.y)) {
        inRange = true;
      }
    }

    // No new target needed if not in range
    if (!inRange) { return null; }


    // Refine movement selection if in range
    var xDistance = xyConnect.x - unit.xTile;
    var yDistance = xyConnect.y - unit.yTile;

    var direction;
    if (yDistance > 0) { direction = "north"; }
    else if (yDistance < 0) { direction = "south"; }
    else if (xDistance > 0) { direction = "east"; }
    else { direction = "west"; }


    // Reset unitRange
    var rangeCopy = [...unitRange];
    unitRange.length = 0;

    // Remove movement spaces in the direction noted
    for (var i = 0; i < rangeCopy.length; i++) {
      var x = rangeCopy[i][0];
      var y = rangeCopy[i][1];

      // Remove inappropriate movement spaces
      if ((direction == "north") && (y < xyConnect.y)) { continue; }
      if ((direction == "south") && (y > xyConnect.y)) { continue; }
      if ((direction == "east")  && (x > xyConnect.x)) { continue; }
      if ((direction == "west")  && (x < xyConnect.x)) { continue; }

      // Add appropriate spaces back in
      unitRange.push([x, y]);
    }

    // Target the targetUnit with the new list of spaces
    return { x: targetUnit.xTile, y: targetUnit.yTile };
  }

  //---------------
  // DESCRIPTION: Potentially uses a skill
  // PARAMS:
  //  unit   (I,REQ) - Current AI Unit
  //  aiType (I,REQ) - AI Type from aiTypeEnum
  // RETURNS: Object with "endedTurn" and "delay" flags
  //---------------
  checkSkillUse(unit, aiType) {
    if (unit.activeSkills.length == 0) { return null; }
    if (unit.hasStatus("Seal Skills")) { return null; }

    // Check for available skills
    var readySkills = [];
    for (const skill of unit.activeSkills) {
      if (skill.name == "Presence Concealment") { continue; } // Don't use this skill normally
      if (skill.curTurn == 0) { readySkills.push(skill); }
    }
    if (readySkills == 0) { return null; }


    // Normal/Defensive AI only use a skill when below certain HP levels
    var hpPercent = (unit.curHP / unit.maxHP) * 100;
    if ((aiType == aiTypeEnum.Normal) && (hpPercent > 70)) { return null; }
    if ((aiType == aiTypeEnum.Defensive) && (hpPercent > 60)) { return null; }


    // Use a skill?
    var rand = getRandomInt(0, 100);
    if ((hpPercent < 40) && (rand >= 80)) { return null; } // 80% chance to decide to use a skill when low on HP
    else if (rand >= 60) { return null; }                  // 60% chance to decide to use a skill normally


    // Use a random skill
    rand = getRandomInt(0, readySkills.length);
    this.debugAI(unit, "Using skill " + readySkills[rand].name);

    return this.useSkill(unit, readySkills[rand], aiType);
  }

  //---------------
  // DESCRIPTION: Uses a skill based on skill type
  // PARAMS:
  //  unit   (I,REQ) - Current AI Unit
  //  skil   (I,REQ) - Skill to use
  //  aiType (I,REQ) - AI Type from aiTypeEnum
  // RETURNS: Object with "endedTurn" and "delay" flags
  //---------------
  useSkill(unit, skill, aiType) {
    if (skill.skillType == skillTypeEnum.Self) { return this.useSkillSelf(unit, skill, aiType); }
    if (skill.skillType == skillTypeEnum.Space) { return this.useSkillSpace(unit, skill, aiType); }
    if (skill.skillType == skillTypeEnum.Enemy) { return this.useSkillEnemy(unit, skill, aiType); }
    if (skill.skillType == skillTypeEnum.AoEburst) { return this.useSkillAoEburst(unit, skill, aiType); }
    // Ally skills are handled separately

    return null;   // Unknown skill type
  }

  //---------------
  // DESCRIPTION: Uses a Self skill
  // PARAMS:
  //  unit   (I,REQ) - Current AI Unit
  //  skil   (I,REQ) - Skill to use
  //  aiType (I,REQ) - AI Type from aiTypeEnum
  // RETURNS: Object with "endedTurn" and "delay" flags
  //---------------
  useSkillSelf(unit, skill, aiType) {
    // Try not to do dumb things
    if ((skill.image == "skill-NP Charge") && (unit.curCharge == unit.npChargeTime)) { return null; }

    // Effect the unit
    this._map._sounds.skillUse.play();
    skill.effect(this._map, unit, [unit]);
    skill.curTurn = skill.cooldown;

    return { endedTurn: false, delay: true };
  }

  //---------------
  // DESCRIPTION: Uses a Space skill
  // PARAMS:
  //  unit   (I,REQ) - Current AI Unit
  //  skil   (I,REQ) - Skill to use
  //  aiType (I,REQ) - AI Type from aiTypeEnum
  // RETURNS: Object with "endedTurn" and "delay" flags
  //---------------
  useSkillSpace(unit, skill, aiType) {
    // Find an empty space nearby
    var spaceRange = [];
    this._map.checkUnitRange(unit, spaceRange, unit.xTile, unit.yTile, skill.range, 0);

    // If no space available, continue without using
    if (spaceRange.length == 0) { return null; }

    // Otherwise, use the skill on a random available space
    var rand = getRandomInt(0, spaceRange.length);
    var xTile = spaceRange[rand][0];
    var yTile = spaceRange[rand][1];

    this._map._sounds.skillUse.play();
    skill.effect(this._map, unit, [{ x: xTile, y: yTile }]);
    skill.curTurn = skill.cooldown;

    this._map.waitUnit(unit, true);
    return { endedTurn: true, delay: false };
  }

  //---------------
  // DESCRIPTION: Uses an Enemy skill
  // PARAMS:
  //  unit   (I,REQ) - Current AI Unit
  //  skil   (I,REQ) - Skill to use
  //  aiType (I,REQ) - AI Type from aiTypeEnum
  // RETURNS: Object with "endedTurn" and "delay" flags
  //---------------
  useSkillEnemy(unit, skill, aiType) {
    // Find an enemy
    this._map._attacker = unit;
    var targetUnit = this.selectEnemyTarget(unit, this._map.enemyList);

    if (targetUnit) {
      this.debugAI(unit, "Moving to use skill on " + targetUnit.name);
      this._map.moveToAttack(targetUnit, () => {
        this._map._sounds.skillUseDmg.play();
        skill.curTurn = skill.cooldown;
        skill.effect(this._map, unit, [targetUnit]);
        this._map.waitUnit(unit, true);
      });
    }
    else {
      return null;
    }

    return { endedTurn: true, delay: false };
  }

  //---------------
  // DESCRIPTION: Uses an AoEburst skill
  // PARAMS:
  //  unit   (I,REQ) - Current AI Unit
  //  skil   (I,REQ) - Skill to use
  //  aiType (I,REQ) - AI Type from aiTypeEnum
  // RETURNS: Object with "endedTurn" and "delay" flags
  //---------------
  useSkillAoEburst(unit, skill, aiType) {

    // TODO: Implement

    return { endedTurn: true, delay: false };
  }

  //---------------
  // DESCRIPTION: Uses an Ally skill
  // PARAMS:
  //  unit   (I,REQ) - Current AI Unit
  //  skil   (I,REQ) - Skill to use
  //  targetUnit (I,OPT) - Ally to use skill on
  //  isHeal     (I,OPT) - True if this is a heal skill
  // RETURNS: Object with "endedTurn" and "delay" flags
  //---------------
  useSkillAlly(unit, skill, targetUnit, isHeal) {
    // Use skill
    this.debugAI(unit, "Moving to use skill on ally " + targetUnit.name);

    this._map._attacker = unit;

    this._map.moveToAttack(targetUnit, () => {
      if (isHeal) { this._map._sounds.heal.play(); }
      else { this._map._sounds.skillUse.play(); }

      skill.curTurn = skill.cooldown;
      skill.effect(this._map, unit, [targetUnit]);
      this._map.waitUnit(unit, true);
    }, skill.range, true, true);
  }

  //---------------
  // DESCRIPTION: Uses a "move skill" if available
  // PARAMS:
  //  unit   (I,REQ) - Current AI Unit
  //---------------
  useMoveSkill(unit) {
    // Check for specific skills
    var skill = unit.getActiveSkill("Presence Concealment");

    if (skill) {
      if (skill.curTurn == 0) {
        this.debugAI(unit, "Using skill " + skill.name + " after moving.");
        this.useSkillSelf(unit, skill);
         return;
      }
    }

    // Check for space skills
    for (const active of unit.activeSkills) {
      if (active.skillType == skillTypeEnum.Space) {
        skill = active;
        break;
      }
    }

    if (skill) {
      if (skill.curTurn == 0) {
        this.debugAI(unit, "Using skill " + skill.name + " after moving.");
        this.useSkillSpace(unit, skill);
        return;
      }
    }
  }

  //---------------
  // DESCRIPTION: Finds an available support skill to use if available
  // PARAMS:
  //  unit   (I,REQ) - Current AI Unit
  // RETURNS: Support skill to use if found
  //---------------
  getSupportSkill(unit) {
    var skill = null;

    // Check for ally-targeting skills
    for (const active of unit.activeSkills) {
      if ((active.curTurn == 0) &&
          (active.skillType == skillTypeEnum.Ally) || (active.skillType == skillTypeEnum.AllyBurst)) {
        skill = active;
        break;
      }
    }

    return skill;
  }

  //---------------
  // DESCRIPTION: Uses a single target ally skill if appropriate
  // PARAMS:
  //  unit     (I,REQ) - Current AI Unit
  //  skill    (I,REQ) - Skill to use
  //  allyList (I,REQ) - Array of available allies to use skill on
  // RETURNS: True if used skill and waited turn; otherwise false
  //---------------
  useSingleSupportSkill(unit, skill, allyList) {
    var isHeal = false;
    var targetAlly = null;

    if (skill.image.toLowerCase().includes("heal")) {
      isHeal = true;
    }

    // Non-heal - choose random ally that isn't self
    if (!isHeal) {
      var targetList = [];
      for (const ally of allyList) {
          if (ally != unit) { targetList.push(ally); }
      }

      if (targetList.length == 0) { return false; }

      var rand = getRandomInt(0, targetList.length);
      targetAlly = targetList[rand];
    }

    // Heal - find appropriate ally
    else {
      var lowestHP = 999999;

      // Go through ally list
      for (const ally of allyList) {
        // HP too high to heal
        var hpPercent = (ally.curHP / ally.maxHP) * 100;
        if (hpPercent >= 80) { continue; }

        if (ally.curHP < lowestHP) {
          lowestHP = ally.curHP;
          targetAlly = ally;
        }
      }
    }

    // Use skill if target found
    if (targetAlly) {
      this.debugAI(unit, "Using support skill on " + targetAlly.name);
      this.useSkillAlly(unit, skill, targetAlly, isHeal);
      return true;
    }

    return false;
  }

  //---------------
  // DESCRIPTION: Potentially uses NP
  // PARAMS:
  //  unit   (I,REQ) - Current AI Unit
  // RETURNS: True if NP used; false otherwise
  //---------------
  checkNPuse(unit) {
    if (!unit.noblePhantasm) { return false; }
    if (unit.hasStatus("Seal NP")) { return false; }

    // Units should always use their NP when possible, to be consistent
    var noblePhantasm = unit.noblePhantasm;
    if (unit.curCharge < unit.npChargeTime) { return false; }

    this.debugAI(unit, "Trying to use NP " + noblePhantasm.name);


    // Try to use NP based on type
    if (noblePhantasm.npType == npTypeEnum.Self) { return this.useNPSelf(unit, noblePhantasm); }
    if (noblePhantasm.npType == npTypeEnum.Single) { return this.useNPSingle(unit, noblePhantasm); }
    if (noblePhantasm.npType == npTypeEnum.AoEdir) { return this.useNPAoEdir(unit, noblePhantasm); }
    if (noblePhantasm.npType == npTypeEnum.AoEburst) { return this.useNPAoEburst(unit, noblePhantasm); }
    // if (noblePhantasm.npType == npTypeEnum.AoEcone) { return this.useNPAoEcone(unit, noblePhantasm); }
    if (noblePhantasm.npType == npTypeEnum.AllyBurst) { return this.useNPAoEburst(unit, noblePhantasm, true); }

    return false; // Unknown NP type
  }

  //---------------
  // DESCRIPTION: Uses a Self NP
  // PARAMS:
  //  unit          (I,REQ) - Current AI Unit
  //  noblePhantasm (I,REQ) - NP to use
  // RETURNS: True if NP used; false otherwise
  //---------------
  useNPSelf(unit, noblePhantasm) {
    // Use NP
    unit.curCharge = 0;
    unit.removeStatus(unit.allStatuses[0]);   // NP ready should always be the first status
    noblePhantasm.effect(this._map, unit, [unit], this._map._sounds.npUse);

    return true;
  }

  //---------------
  // DESCRIPTION: Uses a Single target NP
  // PARAMS:
  //  unit          (I,REQ) - Current AI Unit
  //  noblePhantasm (I,REQ) - NP to use
  // RETURNS: True if NP used; false otherwise
  //---------------
  useNPSingle(unit, noblePhantasm) {
    // Search for enemies in range
    this._map.enemyList.length = 0;
    var unitRange = this._map.getUnitRange(unit);
    var moveAttackRange = this._map.getMovementAttackRange(unit, unitRange, true, this._map._enemyList, noblePhantasm.range);

    if (this._map.enemyList.length > 0) {
      // Move to use NP
      this._map._attacker = unit;
      var targetUnit = this.selectEnemyTarget(unit, this._map.enemyList);

      if (targetUnit) {
        this.debugAI(unit, "Moving to use NP on " + targetUnit.name);
        this._map.moveToAttack(targetUnit, () => {

          unit.curCharge = 0;
          unit.removeStatus(unit.allStatuses[0]);
          noblePhantasm.effect(this._map, unit, [targetUnit]);

        }, noblePhantasm.range, true);
        return true;
      }
    }

    return false;   // Did not use NP
  }

  //---------------
  // DESCRIPTION: Uses a directional AoE NP
  // PARAMS:
  //  unit          (I,REQ) - Current AI Unit
  //  noblePhantasm (I,REQ) - NP to use
  // RETURNS: True if NP used; false otherwise
  //---------------
  useNPAoEdir(unit, noblePhantasm) {
    // Search for enemies in range
    this._map.enemyList.length = 0;
    var unitRange = this._map.getUnitRange(unit);
    var moveAttackRange = this._map.getMovementAttackRange(unit, unitRange, true, this._map._enemyList, 1);

    if (this._map.enemyList.length > 0) {
      // Move to use NP
      var spaceDir = this.aoeDirSpaceDirection(unit, unitRange, noblePhantasm.range);
      if (!spaceDir) { return false; }

      var enemies = [];
      var enemyRange = [];
      this._map.checkEnemiesInRange(unit, enemies, enemyRange, spaceDir.x, spaceDir.y, noblePhantasm.range, 0, null, null, true, [spaceDir.dir]);

      if (enemies.length > 0) {
        this._map._attacker = unit;
        this.debugAI(unit, "Moving to use NP on " + enemies[0].name + ", etc.");

        this._map.moveUnit(unit, spaceDir.x, spaceDir.y, null, () => {

          unit.curCharge = 0;
          unit.removeStatus(unit.allStatuses[0]);
          noblePhantasm.effect(this._map, unit, enemies);

        }, 0);
        return true;
      }
    }

    return false;   // Did not use NP
  }
  //---------------
  // DESCRIPTION: Finds space and direction to use a directional AoE attack
  // PARAMS:
  //  unit      (I,REQ) - Current AI Unit
  //  unitRange (I,REQ) - Unit movement range tiles
  //  range     (I,REQ) - Directional range
  // RETURNS: Object with "x", "y", and "dir" properties
  //---------------
  aoeDirSpaceDirection(unit, unitRange, range) {
    var spaceDir;
    var mostEnemies = 0;

    // Add current space too
    unitRange.push([unit.xTile, unit.yTile]);

    // Go through each movement space
    for (var i = 0; i < unitRange.length; i++) {
      var x = unitRange[i][0];
      var y = unitRange[i][1];
      var tile = this._map.getTile(x, y);

      // Check each direction
      for (const dir of ["north", "south", "east", "west"]) {
        var dirRange = [];
        var dirEnemy = [];
        this._map.checkEnemiesInRange(unit, dirEnemy, dirRange, x, y, range, 0, null, null, true, [dir]);

        if (dirEnemy.length > mostEnemies) {
          mostEnemies = dirEnemy.length;
          spaceDir = { x: x, y: y, dir: dir };
        }
      }
    }
    return spaceDir;
  }

  //---------------
  // DESCRIPTION: Uses a burst AoE NP
  // PARAMS:
  //  unit          (I,REQ) - Current AI Unit
  //  noblePhantasm (I,REQ) - NP to use
  //  targetAllies  (I,OPT) - If true, target allies
  // RETURNS: True if NP used; false otherwise
  //---------------
  useNPAoEburst(unit, noblePhantasm, targetAllies) {
    // Search for enemies in range
    this._map.enemyList.length = 0;
    var unitRange = this._map.getUnitRange(unit);
    var moveAttackRange = this._map.getMovementAttackRange(unit, unitRange, true, this._map._enemyList, 1, targetAllies);

    if (this._map.enemyList.length > 0) {
      // Move to use NP
      var xySpace = this.aoeBurstSpace(unit, unitRange, noblePhantasm.range, targetAllies);
      if (!xySpace) { return false; }

      var enemies = [];
      var enemyRange = [];
      this._map.checkEnemiesInRange(unit, enemies, enemyRange, xySpace.x, xySpace.y, noblePhantasm.range, 0, null, null, true, null, targetAllies);
      if (targetAllies) { enemies.push(unit); }

      console.log(enemies)

      if (enemies.length > 0) {
        this._map._attacker = unit;
        this.debugAI(unit, "Moving to use NP on " + enemies[0].name + ", etc.");

        this._map.moveUnit(unit, xySpace.x, xySpace.y, null, () => {

          var sound;
          if (targetAllies) { sound = this._map._sounds.npUse; }

          unit.curCharge = 0;
          unit.removeStatus(unit.allStatuses[0]);
          noblePhantasm.effect(this._map, unit, enemies, sound);

        }, 0);
        return true;
      }
    }

    return false;   // Did not use NP
  }
  //---------------
  // DESCRIPTION: Finds space to use a burst AoE attack
  // PARAMS:
  //  unit      (I,REQ) - Current AI Unit
  //  unitRange (I,REQ) - Unit movement range tiles
  //  range     (I,REQ) - Attack range
  //  targetAllies (I,OPT) - If true, target allies
  // RETURNS: Object with "x" and "y" properties
  //---------------
  aoeBurstSpace(unit, unitRange, range, targetAllies) {
    var xySpace;
    var mostEnemies = 0;

    // Add current space too
    unitRange.push([unit.xTile, unit.yTile]);

    // Go through each movement space
    for (var i = 0; i < unitRange.length; i++) {
      var x = unitRange[i][0];
      var y = unitRange[i][1];
      var tile = this._map.getTile(x, y);

      // Check each range
      var atkRange = [];
      var atkEnemy = [];
      this._map.checkEnemiesInRange(unit, atkEnemy, atkRange, x, y, range, 0, null, null, true, null, targetAllies);

      if (targetAllies) { atkEnemy.push(unit); }

      if (atkEnemy.length > mostEnemies) {
        mostEnemies = atkEnemy.length;
        xySpace = { x: x, y: y };
      }

    }
    return xySpace;
  }

  // ==================================================================================

  //---------------
  // DESCRIPTION: Logs console messages for AI debugging
  // PARAMS:
  //  unit    (I,OPT) - Current AI Unit
  //  message (I,REQ) - Debug message
  //---------------
  debugAI(unit, message) {
    if (!this._debugAI) { return; }

    if (unit) {
      var name = "[" + unit.unitClass + "] " + unit.name + " ::";
      console.log(name, message);
    }
    else {
      console.log(message);
    }
  }

}
