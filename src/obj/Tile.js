/*
* Tile object
*  - Defines tile appearance and behavior
*/

class Tile {
  //---------------
  // DESCRIPTION: Creates a new Tile
  // PARAMS:
  //  image (I,REQ) - Preloaded name of the tile image.
  //  groundMoveCost (I,OPT) - Movement cost for ground units (default: 1)
  //                            A cost of -1 means it's impassable for this unit type.
  //  flightMoveCost (I,OPT) - Movement cost for flying units (default: 1)
  //                            A cost of -1 means it's impassable for this unit type.
  //  groundDefense  (I,OPT) - Defense modifier for ground units (default: 0)
  //                             1 = defense buff of 10%
  //                            -1 = defense debuff of 10%
  //  overImage      (I,OPT) - Tile image to display on top of this one, ie: for bridges
  //  maxHP          (I,OPT) - HP the unit has if it is damagable (default: no HP)
  //  isClaimable    (I,OPT) - If true, this structure can be claimed by a faction
  //  faction        (I,OPT) - Faction the structure belongs to
  //  baseImage      (I,OPT) - Image to display underneath tile instead of the default base
  //---------------
  constructor(image, groundMoveCost, flightMoveCost, groundDefense, overImage, maxHP, isClaimable, faction, baseImage) {
    this._image = image;
    this._overImage = overImage;
    this._baseImage = baseImage;
    this._groundMoveCost = groundMoveCost || 1;
    this._flightMoveCost = flightMoveCost || 1;
    this._groundDefense  = groundDefense  || 0;
    this._zone;

    this._curHP = maxHP || 0;
    this._maxHP = maxHP;
    this._tileSprite;
    this._tileX;
    this._tileY;
    this._damageSprite;
    this._damageText;

    this._isClaimable = isClaimable || false;
    this._faction = faction;

    this._workshopUnits = [];
    this._workshopTurn = 0;
    this._workshopCooldown = 0;

    this._unit = null;
    this._bigImage = false;   // Whether this has replaced with a big image in map display
  }

  // Tile image name
  get image() { return this._image; }
  set image(x) { this._image = x; }

  // Over image name
  get overImage() { return this._overImage; }
  set overImage(x) { this._overImage = x; }

  // Base image name
  get baseImage() { return this._baseImage; }
  set baseImage(x) { this._baseImage = x; }

  // Ground Movement Cost
  get groundMoveCost() { return this._groundMoveCost; }
  set groundMoveCost(x) { this._groundMoveCost = x; }

  // Flying Unit Cost
  get flightMoveCost() { return this._flightMoveCost; }
  set flightMoveCost(x) { this._flightMoveCost = x; }

  // Ground Defense Modifier
  get groundDefense() { return this._groundDefense; }
  set groundDefense(x) { this._groundDefense = x; }

  // Zone
  get zone() { return this._zone; }
  set zone(x) { this._zone = x; }


  // Faction
  get isClaimable() { return this._isClaimable; }
  set isClaimable(x) { this._isClaimable = x; }

  get faction() { return this._faction; }
  set faction(x) { this._faction = x; }

  // Workshop Units (array of load/cost/classes objects)
  addWorkshopUnit(load, cost, classes) { addElement({ load: load + "", cost: cost, classes: classes }, this._workshopUnits); }
  removeWorkshopUnit(load, cost, classes) { removeElement({ load: load + "", cost: cost, classes: classes }, this._workshopUnits); }
  get workshopUnits() { return this._workshopUnits; }
  set workshopUnits(x) { this._workshopUnits = x; }


  // HP
  get curHP() { return this._curHP; }
  set curHP(x) { this._curHP = x; }

  // Max HP
  get maxHP() { return this._maxHP; }
  set maxHP(x) { this._maxHP = x; }

  // Tile Sprite
  get tileSprite() { return this._tileSprite; }
  set tileSprite(x) { this._tileSprite = x; }

  // Tile X point at origin 0,0
  get tileX() { return this._tileX; }
  set tileX(x) { this._tileX = x; }
  get xTile() { return Math.floor(this.tileX / 64); }

  // Tile y point at origin 0,0
  get tileY() { return this._tileY; }
  set tileY(x) { this._tileY = x; }
  get yTile() { return Math.floor(this.tileY / 64); }

  // Damage Sprite
  get damageSprite() { return this._damageSprite; }
  set damageSprite(x) { this._damageSprite = x; }


  // Unit on tile
  get unit() { return this._unit; }
  set unit(x) { this._unit = x; }

  // Replaced by a big image?
  get bigImage() { return this._bigImage; }
  set bigImage(x) { this._bigImage = x; }


  //---------------
  // DESCRIPTION: Damages the structure if it is damagable
  // PARAMS:
  //  amount  (I,REQ) - Amount of HP to damage
  //  game    (I,REQ) - Game object
  //  animate (I,OPT) - If true, animate the HP damage (default: false)
  // RETURNS: true if the unit is now defeated; otherwise false
  //---------------
  damage(amount, game, animate) {
    // Ignore structures that can't be damaged
    if (this._curHP < 1) { return false; }

    var curHP = this._curHP;
    curHP = curHP - amount;

    if (curHP < 0) {
      curHP = 0;
    }

    // Apply damage
    this._curHP = curHP;
    this.updateDamage(game);

    // Float up HP change
    if (animate) {
      var x = this._tileX + (this._tileSprite.displayWidth / 2) - 5;
      var y = this._tileY;
      var height = (y - (this._tileSprite.displayHeight / 2));

      floatHPchange(game, x, y, height, amount);
    }

    return (curHP == 0);
  }

  //---------------
  // DESCRIPTION: Heals the structure if it is damagable
  // PARAMS:
  //  amount (I,REQ) - Amount of HP to heal
  //  game   (I,REQ) - Game object
  //---------------
  heal(amount, game) {
    // Ignore structures that can't be damaged
    if (this._curHP < 1) { return; }

    var curHP = this._curHP;
    curHP = curHP + amount;

    if (curHP > this._maxHP) {
      curHP = this._maxHP;
    }

    // Apply healing
    this.updateDamage(game);
    this._curHP = curHP;
  }

  //---------------
  // DESCRIPTION: Updates the damage sprite for damageable tiles
  // PARAMS:
  //  game   (I,REQ) - Game object
  //---------------
  updateDamage(game) {
    // Ignore structures that can't be damaged
    if ((!this._damageSprite) && (this._curHP < 1)) { return; }

    // If full health or destroyed, destroy sprite
    if ((this._damageSprite) && ((this._curHP >= this._maxHP) || (this._curHP < 1))) {
      this._damageSprite.destroy();
      this._damageSprite = null;

      this._damageText.destroy();
      this._damageText = null;
      return;
    }

    // If damaged but no sprite, create one
    if ((!this._damageSprite) && (this._curHP < this._maxHP)) {
      var x = this._tileSprite.x + 3;
      var y = this._tileSprite.y - 58;
      this._damageSprite = game.add.sprite(x, y, "structure-hp").setOrigin(0, 1);
      this._damageSprite.depth = 8;

      x += 15;
      y -= 15;
      var style = { font: "15px Optima", fill: "#fff" };
      this._damageText = game.add.text(x, y, this._curHP + "", style).setOrigin(0.5, 0.5);
      this._damageText.depth = 8;
      return;
    }

    // If just damaged, update amount
    if ((this._damageSprite) && (this._curHP < this._maxHP)) {
      this._damageText.setText(this._curHP);
      return;
    }
  }

  //---------------
  // Prevent JS errors when a structure is caught up in NP AoE attacks
  //---------------
  hasTrait(trait) { return false; }
  getStatus(trait) { return null; }

  allStatuses() { }
  addStatus(status, noFloat, floatDelay, attacker) { }
  removeStatus(status) { }
  hasStatus(status) { return false; }
  getStatus(status) { return null; }

  instantKill(param1, param2) { return false; }
  reduceSkillCooldown() { }
  increaseNPCharge(amount) { }
  decreaseNPCharge(amount) { }

  //---------------
  // DESCRIPTION: Claims the structure for the faction, if claimable
  // PARAMS:
  //  faction (I,REQ) - Faction
  // RETURNS: True if successful; otherwise false
  //---------------
  claim(faction) {
    if (!this._isClaimable) { return false; }
    if (!faction) { return false; }

    this._isClaimable = false;
    this._faction = faction;
    return true;
  }


  //---------------
  // DESCRIPTION: Returns available workshop units based on cost
  // PARAMS:
  //  mana (I,REQ) - Units that cost more than this are filtered out
  //---------------
  availWorkshopUnits(mana) {
    var avail = [];

    for (const workshopUnit of this._workshopUnits) {
      if (workshopUnit.cost <= mana) {
        avail.push(workshopUnit);
      }
    }

    return avail;
  }

}
