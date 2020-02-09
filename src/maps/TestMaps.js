/*
* Collection of test maps
* - See TileTypes.js for variables that are shortcuts to each tile
*/

// ==========================================================
function TestMap(game) {
  var title = "Test Map";
  var difficulty = 1;
  var player = new Faction(game._playerData.name, 1, true);
  var enemy  = new Faction("Enemy",  2);

  var bgm = game.sound.add("battle03", { volume: 0.7 } );

  var units = [
    // Player
    { unit: ElizabethBathory(game, player), x: 2, y: 3 },
    // { unit: SerenityHassan(game, player),   x: 2, y:2 },
    { unit: Astolfo(game, player),  x: 2, y: 2 },

    // Enemy
    // { unit: Astolfo(game, enemy),  x: 5, y: 2 },
    { unit: Boudica(game, enemy), x: 8, y: 7 },
    { unit: Medusa(game, enemy), x: 8, y: 6 },
  ];

  units[2].unit._npChargeTime = 1;

  // AI Testing
  // units[2].unit.aiType = aiTypeEnum.Defensive;
  // units[3].unit.aiType = aiTypeEnum.Zone;

  // var unitPlacement = [
  //   { x: 0, y: 1, dist: 4, dir: "south" },
  //   { x: 1, y: 0, dist: 4, dir: "south" },
  //   { x: 2, y: 0, dist: 4, dir: "south" },
  // ];

  var tiles = [
  //                               1  1  1  1  1  1  1  1  1  1  2  2  2  2  2  2
  // 0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5
    [O, O, G, G, P, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O], // 0
    [O, F, F, F, P, F, G, W, G, M, M, M, O, O, M, M, M, M, G, G, G, G, G, F, M, O], // 1
    [G, F, F, L, P, G, G, W, G, U, M, M, O, O, F, F, F, F, G, G, G, G, G, F, M, O], // 2
    [G, F, P, P, P, P, P, W, G, G, G, M, O, O, M, M, M, G, O, O, O, G, G, F, M, O], // 3
    [G, G, G, T, G, P, F, F, G, G, G, G, O, O, F, F, F, G, O, G, G, G, G, F, M, O], // 4
    [O, F, O, B, O, G, G, G, G, G, G, G, O, O, M, M, G, G, O, O, O, G, G, G, G, O], // 5
    [O, G, B, B, B, G, G, G, G, G, G, G, O, O, F, F, G, G, G, G, G, G, G, F, M, O], // 6
    [O, W, O, B, O, G, G, G, G, G, G, G, B, B, G, G, G, G, G, G, F, G, G, F, M, O], // 7
    [O, W, W, P, W, W, W, G, G, G, G, G, O, O, M, W, G, G, P, G, F, G, G, F, M, O], // 8
    [O, G, G, P, G, G, G, G, R, V, R, G, O, O, F, G, G, G, F, G, F, G, G, G, G, O], // 9
    [O, G, O, B, O, G, G, G, V, G, V, G, O, O, W, W, W, P, P, P, O, G, G, F, M, O], // 10
    [O, G, O, B, O, G, G, G, R, G, R, G, O, O, W, G, W, P, G, P, G, G, G, F, M, O], // 11
    [O, G, G, G, G, G, G, G, G, G, G, G, O, O, W, W, W, P, P, P, G, G, G, G, G, F], // 12
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, M, F, O, M], // 13
  ];

  var zones = [
    { name: "A", start: { x:  0, y:  0 }, end: { x:  2, y: 13 } },
    { name: "B", start: { x:  3, y:  0 }, end: { x: 25, y: 13 } },
  ];
  var connections = [         // Points should be outside of the "from" zone
    { from: "A", to: ["B"], point: { x:  2, y:  3 }  },
    { from: "B", to: ["A"], point: { x:  3, y:  3 }  },
  ];

  // ---------------
  var map = new Map(game, title, bgm);
  map.tiles = tiles;
  map.startUnits = units;
  map.addZones(zones, connections);
  map.addPlayerFaction(player);
  map.difficulty = difficulty;
  // map.unitPlacement = unitPlacement;
  return map;
}
// ==========================================================

// ==========================================================
function ServantMap(game) {
  var title = "Servant Test";
  var difficulty = 1;
  var player = new Faction(game._playerData.name, 1, true);
  var enemy  = new Faction("Enemy",  2);

  var bgm = game.sound.add("battle03", { volume: 0.7 } );

  var units = [];

  // Add all Servants to the units under player
  var allServants = getAllServants(game, player);
  for (var i = 0; i < allServants.length; i++) {
    allServants[i]._npChargeTime = 1;
    units.push({ unit: allServants[i], x: 1, y: (i + 1)  });
  }

  // Add Enemies here and there to serve as targets
  for (var i = 2; i < allServants.length; i += 3) {
    units.push({ unit: Skeleton(game, enemy), x: 4, y: i  });
  }

  var tiles = [];
  var tileY = Math.max((allServants.length + 2), 10);
  for (var i = 0; i < tileY; i++) {
    tiles.push([G, G, G, P, G, G, G, G, G, G, G, G, F, F, W, F]);
  }

  // ---------------
  var map = new Map(game, title, bgm);
  map.tiles = tiles;
  map.startUnits = units;
  map.addPlayerFaction(player);
  map.difficulty = difficulty;
  return map;
}
// ==========================================================

// ==========================================================
function EnemyMap(game) {
  var title = "Enemy Test";
  var difficulty = 2;
  var player = new Faction(game._playerData.name, 1, true);
  var enemy  = new Faction("Enemy",  2);

  var bgm = game.sound.add("battle03", { volume: 0.7 } );

  var units = [];

  // Add all Enemies to the units under player
  var allUnits = getAllEnemies(game, player);
  for (var i = 0; i < allUnits.length; i++) {
    // allUnits[i]._curCharge = allUnits[i]._npChargeTime;
    units.push({ unit: allUnits[i], x: 1, y: (i + 1)  });
  }

  // Add random Servants here and there to serve as targets
  for (var i = 2; i < allUnits.length; i += 3) {
    units.push({ unit: summonServant(game, null, enemy), x: 4, y: i  });
  }

  var tiles = [];
  var tileY = Math.max((allUnits.length + 2), 10);
  for (var i = 0; i < tileY; i++) {
    tiles.push([G, G, G, P, G, G, G, G, G, G, G, G, F, F, W, F]);
  }

  // ---------------
  var map = new Map(game, title, bgm);
  map.tiles = tiles;
  map.startUnits = units;
  map.addPlayerFaction(player);
  map.difficulty = difficulty;
  return map;
}
// ==========================================================

// ==========================================================
function AdvanceWars1(game) {
  var title = "Advance Wars Test 1";
  var difficulty = 1;
  var player = new Faction(game._playerData.name, 1, true);
  var enemy  = new Faction("Enemy",  2);

  var bgm = game.sound.add("battle03", { volume: 0.7 } );

  var units = [
    // Player
    { unit: Astolfo(game,  player), x: 2, y: 6 },
    { unit: Scathach(game, player), x: 3, y: 8 },

    // Enemy
    { unit: Medea(game, enemy),         x: 12, y: 2 },
    { unit: SasakiKojirou(game, enemy), x: 12, y: 5 },
    { unit: DragonToothWarrior(game, enemy), x: 10, y: 3 },
    { unit: DragonToothWarrior(game, enemy), x: 12, y: 4 },
    { unit: DragonToothWarrior(game, enemy, classEnum.Saber), x: 11, y: 3 },
  ];

  var tiles = [
  //                               1  1  1  1  1  1
  // 0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O], // 0
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O], // 1
    [O, O, G, F, P, P, B, P, P, G, F, G, G, G, O, O], // 2
    [O, G, G, F, P, F, O, G, P, G, G, G, L, G, O, O], // 3
    [O, G, G, P, P, O, O, O, P, G, M, G, P, G, O, O], // 4
    [O, G, G, P, G, O, O, O, P, G, M, G, P, G, O, O], // 5
    [O, G, P, P, G, O, O, F, P, P, P, P, P, G, O, O], // 6
    [O, G, L, G, G, G, G, F, F, G, O, O, B, O, O, O], // 7
    [O, O, G, G, G, G, G, G, G, G, O, O, G, G, O, O], // 8
    [O, O, O, O, M, G, M, F, G, G, B, G, G, L, O, O], // 9
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O], // 10
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O], // 11
  ];

  var zones = [
    { name: "A", start: { x:  0, y:  0 }, end: { x:  6, y:  6 } },
    { name: "B", start: { x:  0, y:  7 }, end: { x:  9, y: 11 } },
    { name: "C", start: { x: 10, y:  7 }, end: { x: 15, y: 11 } },
    { name: "D", start: { x:  7, y:  0 }, end: { x: 15, y:  6 } },
  ];
  var connections = [         // Points should be outside of the "from" zone
    { from: "A", to: ["B", "C"], point: { x:  3, y:  7 }  },
    { from: "A", to: ["D"]     , point: { x:  7, y:  2 }  },

    { from: "B", to: ["A"]     , point: { x:  3, y:  6 }  },
    { from: "B", to: ["C"]     , point: { x: 10, y:  9 }  },
    { from: "B", to: ["D"]     , point: { x:  8, y:  6 }  },

    { from: "C", to: ["A", "B"], point: { x:  9, y:  9 }  },
    { from: "C", to: ["D"]     , point: { x: 12, y:  6 }  },

    { from: "D", to: ["A"]     , point: { x:  6, y:  2 }  },
    { from: "D", to: ["A", "B"], point: { x:  9, y:  7 }  },
    { from: "D", to: ["B", "C"], point: { x: 12, y:  7 }  },
  ];
  // ---------------
  var map = new Map(game, title, bgm);
  map.tiles = tiles;
  map.addZones(zones, connections);
  map.startUnits = units;
  map.addPlayerFaction(player);
  map.difficulty = difficulty;
  return map;
}
// ==========================================================
