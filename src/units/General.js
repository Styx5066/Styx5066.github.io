/*
* General functions to help with Unit loading
*/

//---------------
// Enums
//---------------
const classEnum = {
  Saber:      "Saber",
  Archer:     "Archer",
  Lancer:     "Lancer",

  Rider:      "Rider",
  Caster:     "Caster",
  Assassin:   "Assassin",
  Berserker:  "Berserker",

  Shielder:   "Shielder",
  Ruler:      "Ruler",
  Avenger:    "Avenger",

  MoonCancer: "Moon Cancer",
  AlterEgo:   "Alter Ego",
  Foreigner:  "Foreigner",

  Unknown:    "Unknown"
}

const rankEnum = {
  Gold:   "Gold",
  Silver: "Silver",
  Bronze: "Bronze",
}

const effectiveEnum = {
  Strong: 2,
  Resist: 0.5,
  Normal: 1,
}

//---------------
// DESCRIPTION: Returns a color corresponding to the rank
//---------------
function rankToColor(rank) {
  if (rank == rankEnum.Gold) { return "#ffd700"; }
  if (rank == rankEnum.Silver) { return "#ececec"; }
  return "#d47f7f";
}

//---------------
// DESCRIPTION: Returns the power level of the rank for use in damage calculation
//---------------
function rankPower(rank) {
  if (rank == rankEnum.Gold) { return 3; }
  if (rank == rankEnum.Silver) { return 2; }
  return 1;
}

//---------------
// DESCRIPTION: Returns the positive / effective color
//---------------
function colorPositive() {
  return "#ff9c2d";
}

//---------------
// DESCRIPTION: Returns the negative / ineffective color
//---------------
function colorNegative() {
  return "#32a6ff";
}

//---------------
// DESCRIPTION: Returns the number order of a Class
//---------------
function classToOrder(unitClass) {
  if (unitClass == classEnum.Saber) { return 1; }
  if (unitClass == classEnum.Archer) { return 2; }
  if (unitClass == classEnum.Lancer) { return 3; }

  if (unitClass == classEnum.Rider) { return 4; }
  if (unitClass == classEnum.Caster) { return 5; }
  if (unitClass == classEnum.Assassin) { return 6; }
  if (unitClass == classEnum.Berserker) { return 7; }

  if (unitClass == classEnum.Shielder) { return 8; }
  if (unitClass == classEnum.Ruler) { return 9; }
  if (unitClass == classEnum.Avenger) { return A; }

  if (unitClass == classEnum.MoonCancer) { return B; }
  if (unitClass == classEnum.AlterEgo) { return C; }
  if (unitClass == classEnum.Foreigner) { return D; }

  return Z;
}

//---------------
// DESCRIPTION: Returns the attack effectiveness of one class against another
//---------------
function classEffectiveness(attackingClass, targetClass) {
  // Shielder
  if ((attackingClass == classEnum.Shielder) || targetClass == classEnum.Shielder) {
    return effectiveEnum.Normal;
  }

  // Saber
  if (attackingClass == classEnum.Saber) {
    if (targetClass == classEnum.Lancer) { return effectiveEnum.Strong; }
    if (targetClass == classEnum.Archer) { return effectiveEnum.Resist; }
  }

  // Archer
  if (attackingClass == classEnum.Archer) {
    if (targetClass == classEnum.Saber)  { return effectiveEnum.Strong; }
    if (targetClass == classEnum.Lancer) { return effectiveEnum.Resist; }
  }

  // Lancer
  if (attackingClass == classEnum.Lancer) {
    if (targetClass == classEnum.Archer)  { return effectiveEnum.Strong; }
    if (targetClass == classEnum.Saber) { return effectiveEnum.Resist; }
  }

  // Rider
  if (attackingClass == classEnum.Rider) {
    if (targetClass == classEnum.Caster)   { return effectiveEnum.Strong; }
    if (targetClass == classEnum.Assassin) { return effectiveEnum.Resist; }
  }

  // Caster
  if (attackingClass == classEnum.Caster) {
    if (targetClass == classEnum.Assassin) { return effectiveEnum.Strong; }
    if (targetClass == classEnum.Rider)    { return effectiveEnum.Resist; }
  }

  // Assassin
  if (attackingClass == classEnum.Assassin) {
    if (targetClass == classEnum.Rider)  { return effectiveEnum.Strong; }
    if (targetClass == classEnum.Caster) { return effectiveEnum.Resist; }
  }

  // Berserker
  if (attackingClass == classEnum.Berserker) {
    return effectiveEnum.Strong;
  }

  // Target: Berserker
  if (targetClass == classEnum.Berserker) {
    return effectiveEnum.Strong;
  }

  return effectiveEnum.Normal;
}

//---------------
// DESCRIPTION: Normalizes HP from the FGO value (max, non-Grail HP)
//---------------
function servantHP(hp) {
  // return Math.round(hp / 500) * 5;
  return Math.floor(hp / 100);
}

//---------------
// DESCRIPTION: Normalizes Attack from the FGO value (max, non-Grail Atk)
//---------------
function servantAtk(atk) {
  // return Math.round(atk / 500) * 5;
  return Math.floor(atk / 100);
}

//---------------
// DESCRIPTION: Normalizes Skill cooldown from the FGO value
//---------------
function servantCooldown(cooldown) {
  // return Math.ceil(cooldown / 2);
  return cooldown;
}

//---------------
// DESCRIPTION: Returns the default movement range for a class
//---------------
function defaultMovement(unitClass) {
  if (unitClass == classEnum.Saber)           { return 4; }
  else if (unitClass == classEnum.Archer)     { return 3; }
  else if (unitClass == classEnum.Lancer)     { return 4; }

  else if (unitClass == classEnum.Rider)      { return 4; }
  else if (unitClass == classEnum.Caster)     { return 3; }
  else if (unitClass == classEnum.Assassin)   { return 4; }
  else if (unitClass == classEnum.Berserker)  { return 3; }

  else { return 4; }
}

//---------------
// DESCRIPTION: Returns the default attack range for a class
//---------------
function defaultAtkRange(unitClass) {
  if (unitClass == classEnum.Archer)      { return 2; }
  else if (unitClass == classEnum.Caster) { return 2; }

  else { return 1; }
}

//---------------
// DESCRIPTION: Returns the default NP Charge time for a class
//---------------
function defaultNPCharge(unitClass) {
  if (unitClass == classEnum.Saber)           { return 5; }
  else if (unitClass == classEnum.Archer)     { return 4; }
  else if (unitClass == classEnum.Lancer)     { return 4; }

  else if (unitClass == classEnum.Rider)      { return 5; }
  else if (unitClass == classEnum.Caster)     { return 3; }
  else if (unitClass == classEnum.Assassin)   { return 3; }
  else if (unitClass == classEnum.Berserker)  { return 5; }

  else { return 5; }
}
