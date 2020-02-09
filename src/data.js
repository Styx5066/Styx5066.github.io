/*
* Functions handling player data
*/

//---------------
// DESCRIPTION: Creates save data for a player
// PARAMS:
//  name  (I,REQ) - Player's entered name
//  image (I,REQ) - Player's chosen appearance
// RETURNS: Player data object
//---------------
function createNewPlayerData(name, image) {
  return {
    // Basics
    name:   name,
    image:  image,
    qp:     4000,

    // Options
    options: { },

    // Servants (array of loading functions)
    servants: [],

    // Servant data / improvements
    servantData: [],

    // Completed Battle Simulation maps
    battleSim: [],
  };
}

//---------------
// DESCRIPTION: Saves the player data
// PARAMS:
//  playerData (I,REQ) - Saved player data
//---------------
function savePlayerData(playerData) {
  if (playerData) {
    localStorage.setItem("playerData", JSON.stringify(playerData));
  }
}

//---------------
// DESCRIPTION: Adds a Servant to the player and then saves
// PARAMS:
//  playerData (I,REQ) - Saved player data
//  servants   (I,REQ) - Servant unit to add
//---------------
function addServant(playerData, servant) {
  if (!playerData) { return; }
  if (!servant)    { return; }
  var load = servant.load + "";
  if (!load)       { return; }

  // Add Servant
  playerData.servants.push(servant.load);

  playerData.servantData.push({
    load:        servant.load,
    mapsCleared: [],
    strength:    1,
    bondPoints:  0,
  });

  // Save
  savePlayerData(playerData);
}

//---------------
// DESCRIPTION: Retrieves saved data for a player servant
// PARAMS:
//  playerData (I,REQ) - Saved player data
//  servants   (I,REQ) - Servant unit to check for
// RETURNS: Servant data object (see addServant)
//---------------
function getServantData(playerData, servant) {
  if (!playerData) { return; }
  if (!servant)    { return; }
  var load = servant.load + "";
  if (!load)       { return; }

  // Check for Servant
  for (const servantObj of playerData.servantData) {
    if (servantObj.load == load) {
      return servantObj;
    }
  }
  return null;
}

//---------------
// DESCRIPTION: Reconciles existing player data to set newly-added properties
// PARAMS:
//  playerData (I,REQ) - Saved player data
//---------------
function reconcilePlayerData(playerData) {
  // Require the basics be set already
  if (!playerData) { return; }
  if (!playerData.name) { return; }
  if (!playerData.image) { return; }

  // Get fresh player data for comparison
  var freshData = createNewPlayerData("Ritsuka", "Ritsuka-Female-Mage");
  var entries = Object.entries(freshData);

  // Go through each property in the fresh data
  //  and set it to the default if it doesn't already exist
  for (const [property, value] of entries) {
    if (!playerData.hasOwnProperty(property)) {
      playerData[property] = value;
    }
  }
}
