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
}
