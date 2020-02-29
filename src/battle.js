/*
* Scene for testing things out
*/

//---------------
// DESCRIPTION: Loads map assets
// PARAMS:
//  game (I,REQ) - Game object
//---------------
function preloadBattle(game) {
  // Split up into separate functions
  preloadMapTiles(game, game._theme, game._lastTheme);
  game._lastTheme = game._theme;

  preloadUI(game);
  preloadTokenUI(game);
  preloadClassIcons(game);
  preloadUnits(game);
  preloadSkills(game);
  preloadStatus(game);
  preloadSounds(game);
  preloadMusic(game);

  // In case of out of date images: re-load them with a copy
  // var image = "menu-master";
  // game.load.image(image, "assets/ui/" + image + " - Copy.png");
}

//---------------
// DESCRIPTION: Creates the battle map and starts battle
// PARAMS:
//  game (I,REQ) - Game object
//  map  (I,REQ) - Map object
//---------------
function createBattle(game) {
  // Fade in transition
  fadeSceneIn(game);

  // Set curMap globally for use in update function
  // - _BattleMap is the name of the map loading function to call to create the map
  curMap = window[game._BattleMap](game);
  curMap.playerData = game._playerData;
  curMap.loadedMap = game._BattleMap + "";

  // console.log(game._BattleMap);

  // Draw the map
  curMap.drawTiles();

  // Spawn the units
  curMap.spawnStartingUnits();

  // Start the game
  curMap.startGame();
}

//---------------
// DESCRIPTION: Handles mouse updates
// PARAMS:
//  game (I,REQ) - Game object
//---------------
function updateBattle(game) {
  if (curMap) {
    // Use the pointer's world X and Y to handle camera movement
    // - The first tim the hover sprite is created, the input is set to poll continuously
    curMap.setTileHover(game.input.activePointer);
  }
}
