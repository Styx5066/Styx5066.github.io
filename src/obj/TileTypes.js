/*
* Collection of pre-loaded Tile types
*/

// Shortcuts for use in maps
G = Grass();
F = Forest();
M = Mountain();
O = Ocean();
P = Path();
W = Wall();
S = Stone();
R = River();
B = BridgeOverOcean();
V = BridgeOverRiver();

L = LeyLine();
U = RuinsLeyLine();
T = Fortress();

// ==========================================================
function Grass() {
  var image = "grass";
  var groundMoveCost = 1;
  var flightMoveCost = 1;
  var groundDefense  = 1;

  // ---------------
  return new Tile(
    image,             // Tile image
    groundMoveCost,    // Move cost for ground units
    flightMoveCost,    // Move cost for flying units
    groundDefense      // Defense modifier for ground units
  );
}
// DESCRIPTION: Returns a random grass tile
function getGrassTile() {
  var num = getRandomInt(0, 13);

  // 7 and 8 are kinda gross, so lower the chance of using them
  if ((num == 7) || (num == 8)) {
    num = getRandomInt(0, 13);
  }

  return "grass-" + num;
}
// ==========================================================

// ==========================================================
function Forest() {
  var image = "forest";
  var groundMoveCost = 2;
  var flightMoveCost = 1;
  var groundDefense  = 3;

  // ---------------
  return new Tile(
    image,             // Tile image
    groundMoveCost,    // Move cost for ground units
    flightMoveCost,    // Move cost for flying units
    groundDefense      // Defense modifier for ground units
  );
}
// DESCRIPTION: Returns a random forest tile
function getForestTile(count, dir) {
  if (count == 3) { return "forest-3-" + dir; }

  if (count == 2) {
    var num = getRandomInt(0, 2);
    return "forest-2-" + dir + "-" + num;
  }

  var num = getRandomInt(0, 3);
  return "forest-1-" + num;
}
// ==========================================================

// ==========================================================
function Mountain() {
  var image = "mountain";
  var groundMoveCost = 3;
  var flightMoveCost = 1;
  var groundDefense  = 4;

  // ---------------
  return new Tile(
    image,             // Tile image
    groundMoveCost,    // Move cost for ground units
    flightMoveCost,    // Move cost for flying units
    groundDefense      // Defense modifier for ground units
  );
}
// ==========================================================

// ==========================================================
function Ocean() {
  var image = "ocean";
  var groundMoveCost = -1;
  var flightMoveCost = 1;
  var groundDefense  = 1;

  // ---------------
  return new Tile(
    image,             // Tile image
    groundMoveCost,    // Move cost for ground units
    flightMoveCost,    // Move cost for flying units
    groundDefense      // Defense modifier for ground units
  );
}
// ==========================================================

// ==========================================================
function Path() {
  var image = "path";
  var groundMoveCost = 1;
  var flightMoveCost = 1;
  var groundDefense  = 0;

  // ---------------
  return new Tile(
    image,             // Tile image
    groundMoveCost,    // Move cost for ground units
    flightMoveCost,    // Move cost for flying units
    groundDefense      // Defense modifier for ground units
  );
}
// ==========================================================

// ==========================================================
function River() {
  var image = "river";
  var groundMoveCost = 2;
  var flightMoveCost = 1;
  var groundDefense  = -2;

  // ---------------
  return new Tile(
    image,             // Tile image
    groundMoveCost,    // Move cost for ground units
    flightMoveCost,    // Move cost for flying units
    groundDefense      // Defense modifier for ground units
  );
}
// ==========================================================

// ==========================================================
function Wall() {
  var image = "wall";
  var groundMoveCost = -1;
  var flightMoveCost = 1;
  var groundDefense  = 1;

  // ---------------
  return new Tile(
    image,             // Tile image
    groundMoveCost,    // Move cost for ground units
    flightMoveCost,    // Move cost for flying units
    groundDefense      // Defense modifier for ground units
  );
}
// DESCRIPTION: Returns a suffix for a random horizontal wall tile
function getWallTileHorizontal(imageBase) {
  var num = getRandomInt(0, 4);
  return imageBase + "-" + num;
}
// ==========================================================

// ==========================================================
function Stone() {
  var image = "stone";
  var groundMoveCost = 1;
  var flightMoveCost = 1;
  var groundDefense  = 1;

  // ---------------
  return new Tile(
    image,             // Tile image
    groundMoveCost,    // Move cost for ground units
    flightMoveCost,    // Move cost for flying units
    groundDefense      // Defense modifier for ground units
  );
}
// DESCRIPTION: Returns a random stone tile
function getStoneTile() {
  var num = getRandomInt(0, 8);
  return "stone-" + num;
}
// ==========================================================

// ==========================================================
function BridgeOverOcean() {
  var image = "ocean";
  var overImage = "bridge";
  var groundMoveCost = 1;
  var flightMoveCost = 1;
  var groundDefense  = 0;

  // ---------------
  return new Tile(
    image,             // Tile image
    groundMoveCost,    // Move cost for ground units
    flightMoveCost,    // Move cost for flying units
    groundDefense,     // Defense modifier for ground units
    overImage          // Image to display over base image
  );
}
// ==========================================================

// ==========================================================
function BridgeOverRiver() {
  var image = "river";
  var overImage = "bridge";
  var groundMoveCost = 1;
  var flightMoveCost = 1;
  var groundDefense  = 0;

  // ---------------
  return new Tile(
    image,             // Tile image
    groundMoveCost,    // Move cost for ground units
    flightMoveCost,    // Move cost for flying units
    groundDefense,     // Defense modifier for ground units
    overImage          // Image to display over base image
  );
}
// ==========================================================

// ==========================================================
function LeyLine() {
  var image = "leyline-struct";
  var groundMoveCost = 1;
  var flightMoveCost = 1;
  var groundDefense  = 3;
  var structureHP = 100;

  // ---------------
  return new Tile(
    image,             // Tile image
    groundMoveCost,    // Move cost for ground units
    flightMoveCost,    // Move cost for flying units
    groundDefense,     // Defense modifier for ground units
    null,
    structureHP        // Structure HP
  );
}
// ==========================================================

// ==========================================================
function RuinsLeyLine() {
  var image = "ruins_leyline-struct";
  var groundMoveCost = 1;
  var flightMoveCost = 1;
  var groundDefense  = 2;

  // ---------------
  return new Tile(
    image,             // Tile image
    groundMoveCost,    // Move cost for ground units
    flightMoveCost,    // Move cost for flying units
    groundDefense,     // Defense modifier for ground units
  );
}
// ==========================================================

// ==========================================================
function Fortress() {
  var image = "fortress-struct";
  var groundMoveCost = 1;
  var flightMoveCost = 1;
  var groundDefense  = 4;
  var structureHP = 100;

  // ---------------
  return new Tile(
    image,             // Tile image
    groundMoveCost,    // Move cost for ground units
    flightMoveCost,    // Move cost for flying units
    groundDefense,     // Defense modifier for ground units
    null,
    structureHP,       // Structure HP
    true,              // Is Claimable?
    null               // Faction
  );
}
// ==========================================================
