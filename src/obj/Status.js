/*
* Status object
*  - Defines status name, icon, and behavior
*/

// Status types
const statusTypeEnum = {
  Attack:   "Attack",
  Block:    "Block",
  Check:    "Manual Check",
  Debuff:   "Debuff Resistance",
  DebuffRate: "Debuff Success",
  Defense:  "Defense",
  NPready:  "NP Ready",
  Stun:     "Stun",
  DmgPT:    "Damage per Turn",
  Regen:    "HP Regen",
}

// Buff / Debuff
const buffTypeEnum = {
  Buff:   "Buff",
  Debuff: "Debuff"
}

class Status {
  //---------------
  // DESCRIPTION: Creates a new Status
  // PARAMS:
  //  name        (I,REQ) - Name of the status
  //  image       (I,REQ) - Reference to the status icon
  //  statusType  (I,REQ) - Type from statusTypeEnum
  //  buffType    (I,REQ) - Type from buffTypeEnum
  //  strength    (I,OPT) - Strength of the debuff. Depends on the type.
  //                          ie, for Damage: 10 = 10% more damage, -10 = 10% less damage
  //  hitChance   (I,OPT) - % chance the status will inflict (default: 100)
  //  duration    (I,OPT) - # of turns until the status goes away. If -1, will never expire.
  //  description (I,OPT) - Array of strings that serve as the description of the status. Each one is displayed on a new line.
  //---------------
  constructor(name, image, statusType, buffType, strength, hitChance, duration, description) {
    this._name = name;
    this._image = image;
    this._description = description;

    this._statusType = statusType;
    this._buffType = buffType;

    this._strength = strength;
    this._hitChance = hitChance || 100;
    this._duration = duration;
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


  get statusType() { return this._statusType; }
  set statusType(x) { this._statusType = x; }

  get buffType() { return this._buffType; }
  set buffType(x) { this._buffType = x; }


  get strength() { return this._strength; }
  set strength(x) { this._strength = x; }

  get hitChance() { return this._hitChance; }
  set hitChance(x) { this._hitChance = x; }

  get duration() { return this._duration; }
  set duration(x) { this._duration = x; }

}
