/*
* Faction object
*  - Defines the different teams in play
*/
class Faction {
  //---------------
  // DESCRIPTION: Creates a new Tile
  // PARAMS:
  //  image      (I,REQ) - Preloaded name of the tile image.
  //  id         (I,OPT) - Unique faction ID
  //  isPlayable (I,OPT) - If true, this is a player faction
  //  color      (I,OPT) - Color of the faction (default: "#fff")
  //---------------
  constructor(name, id, isPlayable, color) {
    this._name = name;
    this._id = id;
    this._isPlayable = isPlayable || false;
    this._color = color || "#fff";

    this._allies = [];

    this._mana = 0;
    this._workshops = [];
  }

  // Faction name
  get name() { return this._name; }
  set name(x) { this._name = x; }

  // Faction ID
  get id() { return this._id; }
  set id(x) { this._id = x; }

  // Is playable?
  get isPlayable() { return this._isPlayable; }
  set isPlayable(x) { this._isPlayable = x; }

  // Color
  get color() { return this._color; }
  set color(x) { this._color = x; }

  // Faction allies
  get allies() { return this._allies; }

  // Mana amount
  get mana() { return this._mana; }
  set mana(x) { this._mana = x; }

  // Workshops (array of tiles)
  addWorkshop(struct) { addElement(struct, this._workshops); }
  removeWorkshop(struct) { removeElement(struct, this._workshops); }
  get workshops() { return this._workshops; }


  //---------------
  // DESCRIPTION: Adds another faction as allies of this one.
  //              By default, adds the current faction as allies as the other as well.
  // PARAMS:
  //  faction       (I,REQ) - Other Faction to add as an ally
  //  noReciprocate (I,OPT) - If true, will not add reciprocate ally adding
  //---------------
  addAlly(faction, noReciprocate) {
    // Make sure the faction isn't itself
    if (faction.id == this._id) { return; }

    // Make sure the factions aren't already allies
    if (this._allies.includes(faction)) { return; }

    // Add the ally faction
    this._allies.push(faction);

    // Reciprocate if appropriate
    if (!noReciprocate) {
      faction.addAlly(this, true);
    }
  }

  //---------------
  // DESCRIPTION: Removes another faction from being allies with this one.
  //              By default, removes the current faction from being allies with the other as well.
  // PARAMS:
  //  faction       (I,REQ) - Other Faction to remove as an ally
  //  noReciprocate (I,OPT) - If true, will not add reciprocate ally removing
  //---------------
  removeAlly(faction, noReciprocate) {
    // Make sure the faction isn't itself
    if (faction.id == this._id) { return; }

    // Make sure the factions were allies
    if (!this._allies.includes(faction)) { return; }

    // Remove the ally faction
    var allyIndex;
    for (var i = 0; i < this._allies.length; i++) {
      if (this._allies[i] == faction) {
        allyIndex = i;
        break;
      }
    }
    this._allies.splice(allyIndex, 1);

    // Reciprocate if appropriate
    if (!noReciprocate) {
      faction.removeAlly(this, true);
    }
  }

  //---------------
  // DESCRIPTION: Returns whether a given faction is allies with or IS this one
  // PARAMS:
  //  faction       (I,REQ) - Other Faction to add as an ally
  // RETURNS: True if allies; otherwise false
  //---------------
  isAlly(faction) {
    // If no faction, not an ally
    if (!faction) { return false; }

    // If the faction is itself, it counts as an ally (non-enemy)
    if (faction.id == this._id) {
      return true;
    }

    // Check if allies
    return this._allies.includes(faction);
  }

  //---------------
  // DESCRIPTION: Returns the name of the faction
  //---------------
  toString() {
    return this._name;
  }

  //---------------
  // DESCRIPTION: Performs actions for faction's workshops
  // PARAMS:
  //  map      (I,REQ) - Map object
  //  callback (I,OPT) - Callback once workshops are done
  //---------------
  runWorkshops(map, callback) {
    // No workshops
    if (this._workshops.length == 0) {
      if (callback) { callback(); }
      return;
    }

    // Start with first workshop
    this.nextWorkshop(map, 0, callback);
  }

  //---------------
  // DESCRIPTION: Performs actions for faction's workshops
  // PARAMS:
  //  map      (I,REQ) - Map object
  //  idx      (I,REQ) - Index of workshop to run
  //  callback (I,OPT) - Callback once workshops are done
  //---------------
  nextWorkshop(map, idx, callback) {
    // No more workshops
    if (idx >= this._workshops.length) {
      if (callback) { callback(); }
      return;
    }

    // Cooldown
    var workshop = this._workshops[idx];
    if (workshop._workshopCooldown > 0) {
      if (workshop._workshopTurn > 0) {
        workshop._workshopTurn--;
        this.nextWorkshop(map, (idx + 1), callback);
        return;
      }
    }

    // Check for units to spawn
    var avail = workshop.availWorkshopUnits(this._mana);
    var spaces = map.nearbySpaces(workshop);

    if ((avail.length == 0) || (spaces.length == 0)) {
      this.nextWorkshop(map, (idx + 1), callback);
      return;
    }


    // Find the highest-cost units available
    var maxCost = 0;
    var bestUnits = [];
    for (const workshopUnit of avail) {
      if (workshopUnit.cost > maxCost) {
        maxCost = workshopUnit.cost;
      }
    }
    for (const workshopUnit of avail) {
      if (workshopUnit.cost == maxCost) {
        bestUnits.push(workshopUnit);
      }
    }

    // Choose one of the units
    var rand = getRandomInt(0, bestUnits.length);
    var workshopUnit = bestUnits[rand];

    rand = getRandomInt(0, workshopUnit.classes.length)
    var unitClass = workshopUnit.classes[rand];
    var unit = window[workshopUnit.load](map._game, this, unitClass);

    if (workshop._workshopCooldown > 0) {
      workshop._workshopTurn = workshop._workshopCooldown;
    }


    // Pan to the tile
    map._game.time.delayedCall(300, () => {

      var camX = workshop.tileX;
      var camY = workshop.tileY;
      map._camera.pan(camX, camY, 250, "Linear");

      map._game.time.delayedCall(250, () => {

        // Spawn the unit
        this._mana -= maxCost;
        rand = getRandomInt(0, spaces.length);
        map.spawnUnit(unit, spaces[rand][0], spaces[rand][1]);
        unit.darken();

        map._game.time.delayedCall(250, () => { this.nextWorkshop(map, (idx + 1), callback); });

      });

    });
  }

}
