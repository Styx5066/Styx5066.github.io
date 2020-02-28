/*
* Collection of simple Battle Simulation maps
* - See TileTypes.js for variables that are shortcuts to each tile
*/

// ==========================================================
function BritPlains(game) {
  var title = "Britannia Plains";
  var difficulty = 1;
  var player = new Faction(game._playerData.name, 1, true);
  var enemy  = new Faction("Enemy",  2);

  var bgm = getBGM(game, "normal");

  var units = [
    // Enemy
    { unit: Boudica(game, enemy), x: 13, y: 1 },
    { unit: Soldier(game, enemy, classEnum.Saber), x: 12, y: 2 },
    { unit: Soldier(game, enemy, classEnum.Saber), x: 14, y: 2 },
    { unit: Soldier(game, enemy, classEnum.Archer), x: 10, y: 7 },
    { unit: Soldier(game, enemy, classEnum.Archer), x: 12, y: 6 },
    { unit: Soldier(game, enemy, classEnum.Lancer), x: 13, y: 3 },
  ];

  var unitPlacement = [
    { x: 0, y: 8, dist: 4, dir: "east" },
    { x: 0, y: 7, dist: 4, dir: "east" },
  ];

  var tiles = [
  //                               1  1  1  1  1  1
  // 0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5
    [M, M, M, G, G, G, G, G, R, G, G, G, W, W, W, G], // 0
    [M, M, G, G, G, G, G, R, R, G, G, W, G, L, G, W], // 1
    [G, G, W, G, G, G, G, R, G, G, G, W, G, P, G, W], // 2
    [G, G, G, G, G, G, F, R, G, G, G, G, P, P, G, W], // 3
    [G, G, G, G, P, P, P, V, P, P, P, P, P, G, G, G], // 4
    [G, G, G, F, P, G, G, R, G, F, G, G, G, G, G, M], // 5
    [W, G, P, P, P, G, G, R, G, G, G, G, G, G, G, G], // 6
    [W, G, P, G, G, G, G, R, G, G, G, M, F, G, G, G], // 7
    [W, G, L, G, G, G, R, R, G, F, M, M, M, M, G, G], // 8
    [G, G, G, W, W, G, R, G, F, F, F, M, F, F, F, G], // 9
  ];
  // ---------------
  var map = new Map(game, title, bgm);
  map.tiles = tiles;
  map.startUnits = units;
  map.addPlayerFaction(player);
  map.difficulty = difficulty;
  map.unitPlacement = unitPlacement;
  return map;
}
// ==========================================================

// ==========================================================
function TempleGrounds(game) {
  var title = "Temple Grounds";
  var difficulty = 1;
  var player = new Faction(game._playerData.name, 1, true);
  var enemy  = new Faction("Enemy",  2);

  var bgm = getBGM(game, "japanese");

  var units = [
    // Enemy
    { unit: Medea(game, enemy), x: 7, y: 5 },
    { unit: SasakiKojirou(game, enemy), x: 8, y: 10 },
    { unit: DragonToothWarrior(game, enemy, classEnum.Archer), x: 4, y: 10 },
    { unit: DragonToothWarrior(game, enemy, classEnum.Archer), x: 11, y: 10 },
    { unit: DragonToothWarrior(game, enemy, classEnum.Assassin), x: 5, y: 7 },
    { unit: DragonToothWarrior(game, enemy, classEnum.Assassin), x: 10, y: 7 },
  ];
  units[0].unit.aiType = aiTypeEnum.Zone;      // Medea
  units[1].unit.aiType = aiTypeEnum.Defensive; // Kojirou
  units[2].unit.aiType = aiTypeEnum.Zone;      // Archer
  units[3].unit.aiType = aiTypeEnum.Zone;      // Archer

  var unitPlacement = [
    { x: 5, y: 18, dist: 4, dir: "east" },
    { x: 5, y: 17, dist: 4, dir: "east" },
  ];

  var tiles = [
  //                               1  1  1  1  1  1
  // 0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5
    [F, F, F, W, W, W, W, W, W, W, W, W, W, F, M, F], // 0
    [F, W, W, F, F, M, F, F, F, F, F, M, F, W, W, F], // 1
    [F, W, F, F, M, W, W, G, G, W, W, M, F, F, W, F], // 2
    [F, W, F, W, W, G, G, G, G, G, G, W, W, F, W, F], // 3
    [F, W, F, W, G, G, G, W, W, G, G, G, W, F, W, M], // 4
    [F, W, F, W, G, G, W, L, G, W, G, G, W, F, W, F], // 5
    [F, F, F, W, G, G, W, G, L, W, G, G, W, F, F, F], // 6
    [F, M, M, F, G, G, G, P, P, G, G, G, W, F, W, F], // 7
    [F, W, F, W, G, G, G, P, P, G, G, G, W, F, F, F], // 8
    [F, M, F, F, W, W, W, P, P, W, W, M, M, F, W, F], // 9
    [M, W, F, G, G, G, G, G, G, G, G, F, G, F, W, F], // 10
    [F, W, W, W, G, W, W, P, P, W, W, G, W, W, F, F], // 11
    [F, G, G, W, W, W, G, P, P, G, W, W, W, G, G, F], // 12
    [G, G, G, G, G, G, G, P, P, G, G, F, G, G, F, G], // 13
    [F, G, F, M, G, G, G, P, P, G, F, G, G, G, G, G], // 14
    [F, G, G, G, G, G, G, P, P, G, G, G, G, M, M, G], // 15
    [G, G, G, G, G, G, G, P, P, G, G, G, G, G, G, G], // 16
    [G, G, F, G, G, G, G, P, P, G, G, F, G, G, G, F], // 17
    [F, F, M, F, G, G, G, P, P, F, G, F, G, G, G, F], // 18
  ];

  var zones = [
    { name: "A", start: { x:  0, y: 12 }, end: { x: 15, y: 18 } },
    { name: "B", start: { x:  2, y:  9 }, end: { x: 13, y: 11 } },
    { name: "C", start: { x:  3, y:  3 }, end: { x: 12, y:  8 } },

    { name: "D", start: { x:  0, y:  0 }, end: { x:  2, y: 11 } },
    { name: "E", start: { x: 13, y:  0 }, end: { x: 15, y: 11 } },
    { name: "F", start: { x:  3, y:  0 }, end: { x: 12, y: 2 } },
  ];
  var connections = [         // Points should be outside of the "from" zone
    { from: "A", to: ["B", "C", "F"], point: { x:  7, y: 11 }  },
    { from: "A", to: ["B", "C", "F"], point: { x:  8, y: 11 }  },
    { from: "A", to: ["D"]     , point: { x:  0, y: 11 }  },
    { from: "A", to: ["E"]     , point: { x: 15, y: 11 }  },

    { from: "B", to: ["A"]     , point: { x:  7, y: 12 }  },
    { from: "B", to: ["A"]     , point: { x:  8, y: 12 }  },
    { from: "B", to: ["C", "F"], point: { x:  7, y:  8 }  },
    { from: "B", to: ["C", "F"], point: { x:  8, y:  8 }  },
    { from: "B", to: ["D"]     , point: { x:  2, y: 10 }  },
    { from: "B", to: ["E"]     , point: { x: 13, y: 10 }  },

    { from: "C", to: ["A", "B"], point: { x:  7, y:  9 }  },
    { from: "C", to: ["A", "B"], point: { x:  8, y:  9 }  },
    { from: "C", to: ["D"]     , point: { x:  2, y:  7 }  },
    { from: "C", to: ["E", "B"], point: { x: 11, y:  9 }  },
    { from: "C", to: ["F"]     , point: { x:  7, y:  2 }  },
    { from: "C", to: ["F"]     , point: { x:  8, y:  2 }  },

    { from: "D", to: ["A"]     , point: { x:  0, y: 12 }  },
    { from: "D", to: ["B", "E"], point: { x:  3, y: 10 }  },
    { from: "D", to: ["B", "E"], point: { x:  3, y:  9 }  },
    { from: "D", to: ["C"]     , point: { x:  3, y:  7 }  },
    { from: "D", to: ["F", "E", "C"], point: { x:  3, y:  2 }  },

    { from: "E", to: ["A"]     , point: { x: 15, y: 12 }  },
    { from: "E", to: ["B", "D", "C"], point: { x: 12, y: 10 }  },
    { from: "E", to: ["B", "D", "C"], point: { x: 12, y:  9 }  },
    { from: "E", to: ["F", "D", "C"], point: { x:  12, y:  2 }  },

    { from: "F", to: ["C", "B", "A", "D"], point: { x:  7, y:  3 }  },
    { from: "F", to: ["C", "B", "A", "D"], point: { x:  8, y:  3 }  },
    { from: "F", to: ["D"]     , point: { x:  2, y:  2 }  },
    { from: "F", to: ["E"]     , point: { x: 13, y:  2 }  },
  ];

  // ---------------
  var map = new Map(game, title, bgm);
  map.tiles = tiles;
  map.addZones(zones, connections);
  map.startUnits = units;
  map.addPlayerFaction(player);
  map.difficulty = difficulty;
  map.unitPlacement = unitPlacement;
  return map;
}
// ==========================================================

// ==========================================================
function RoamingBoars(game) {
  var title = "Roaming Boars";
  var difficulty = 1;
  var player = new Faction(game._playerData.name, 1, true);
  var enemy  = new Faction("Enemy",  2);

  var bgm = getBGM(game, "normal");

  var units = [
    // Enemy
    { unit: DemonBoar(game, enemy), x: 14, y:  1 },
    { unit: DemonBoar(game, enemy), x: 20, y:  2 },
    { unit: DemonBoar(game, enemy), x: 21, y: 11 },
    { unit: DemonBoar(game, enemy), x: 14, y: 14 },
    { unit: DemonBoar(game, enemy), x:  1, y: 13 },
    { unit: DemonBoar(game, enemy), x:  1, y:  1 },
    { unit: DemonBoar(game, enemy), x:  0, y:  5 },
  ];

  var unitPlacement = [
    { x: 7, y: 6, dist: 4, dir: "east" },
    { x: 7, y: 7, dist: 4, dir: "east" },
  ];

  var tiles = [
  //                               1  1  1  1  1  1  1  1  1  1  2  2
  // 0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5  6  7  8  9  0  1
    [M, F, G, G, G, R, G, F, M, M, M, G, F, G, P, G, G, F, R, G, F, F], // 0
    [G, G, R, R, R, R, G, G, F, G, G, G, W, G, P, G, G, G, R, G, G, F], // 1
    [G, R, R, W, F, F, G, G, G, G, G, G, W, G, G, G, G, F, R, G, G, W], // 2
    [G, R, W, F, G, G, G, G, G, G, G, G, G, F, G, G, G, G, R, G, G, G], // 3
    [R, R, G, G, G, G, W, W, W, G, G, W, W, W, G, G, G, F, R, R, F, G], // 4
    [G, G, F, G, G, G, W, P, P, P, P, P, P, W, F, G, G, G, F, R, G, G], // 5
    [G, F, M, G, G, G, G, P, G, G, G, G, P, G, G, G, G, G, R, R, G, G], // 6
    [G, F, M, F, G, G, G, P, G, G, G, G, P, G, G, G, G, G, R, F, F, F], // 7
    [G, F, M, F, G, G, W, P, P, P, P, P, P, W, G, G, G, F, R, G, F, G], // 8
    [G, M, F, M, M, G, W, W, W, G, G, W, W, W, G, G, R, R, R, G, G, G], // 9
    [G, M, F, G, W, G, G, G, G, G, G, G, F, F, G, G, R, F, G, G, G, G], // 10
    [G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, R, F, F, G, G, G], // 11
    [G, G, G, G, G, G, G, G, G, G, G, G, W, G, G, G, R, W, R, R, G, G], // 12
    [G, P, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R, F, F, R, G, G], // 13
    [G, P, G, G, F, G, G, R, R, R, R, R, G, F, G, G, F, G, G, R, R, G], // 14
    [M, P, W, F, G, G, G, R, F, G, G, G, G, G, F, G, G, G, G, G, R, G], // 15
  ];

  var zones = [
    { name: "A", start: { x:  6, y:  4 }, end: { x: 13, y:  9 } },
    { name: "B", start: { x:  0, y:  0 }, end: { x:  5, y: 15 } },
    { name: "C", start: { x:  6, y: 10 }, end: { x: 21, y: 15 } },
    { name: "D", start: { x: 14, y:  4 }, end: { x: 21, y:  9 } },
    { name: "E", start: { x:  6, y:  0 }, end: { x: 21, y:  3 } },
  ];
  var connections = [         // Points should be outside of the "from" zone
    { from: "A", to: ["B"]     , point: { x:  5, y:  6 }  },
    { from: "A", to: ["B"]     , point: { x:  5, y:  7 }  },
    { from: "A", to: ["C"]     , point: { x:  9, y: 10 }  },
    { from: "A", to: ["C"]     , point: { x: 10, y: 10 }  },
    { from: "A", to: ["D"]     , point: { x: 14, y:  6 }  },
    { from: "A", to: ["D"]     , point: { x: 14, y:  7 }  },
    { from: "A", to: ["E"]     , point: { x:  9, y:  3 }  },
    { from: "A", to: ["E"]     , point: { x: 10, y:  3 }  },

    { from: "B", to: ["A", "B", "C", "D"], point: { x:  6, y:  6 }  },
    { from: "B", to: ["A", "B", "C", "D"], point: { x:  6, y:  7 }  },
    { from: "B", to: ["C", "A"], point: { x:  6, y: 10 }  },
    { from: "B", to: ["C"]     , point: { x:  6, y: 12 }  },
    { from: "B", to: ["C"]     , point: { x:  6, y: 15 }  },
    { from: "B", to: ["E", "A"], point: { x:  6, y:  3 }  },
    { from: "B", to: ["E"]     , point: { x:  6, y:  2 }  },

    { from: "C", to: ["A", "E"], point: { x:  9, y:  9 }  },
    { from: "C", to: ["A", "E"], point: { x: 10, y:  9 }  },
    { from: "C", to: ["B"]     , point: { x:  5, y: 11 }  },
    { from: "C", to: ["B"]     , point: { x:  5, y: 13 }  },
    { from: "C", to: ["D"]     , point: { x: 14, y:  9 }  },
    { from: "C", to: ["D"]     , point: { x: 20, y:  9 }  },

    { from: "D", to: ["A", "B"], point: { x: 13, y:  6 }  },
    { from: "D", to: ["A", "B"], point: { x: 13, y:  7 }  },
    { from: "D", to: ["C"]     , point: { x: 14, y: 10 }  },
    { from: "D", to: ["C"]     , point: { x: 15, y: 10 }  },
    { from: "D", to: ["C"]     , point: { x: 20, y: 10 }  },
    { from: "D", to: ["E"]     , point: { x: 14, y:  3 }  },
    { from: "D", to: ["E"]     , point: { x: 16, y:  3 }  },
    { from: "D", to: ["E"]     , point: { x: 20, y:  3 }  },

    { from: "E", to: ["A", "C"], point: { x:  9, y:  4 }  },
    { from: "E", to: ["A", "C"], point: { x: 10, y:  4 }  },
    { from: "E", to: ["B"]     , point: { x:  5, y:  2 }  },
    { from: "E", to: ["B"]     , point: { x:  5, y:  3 }  },
    { from: "E", to: ["D"]     , point: { x: 14, y:  4 }  },
    { from: "E", to: ["D"]     , point: { x: 16, y:  4 }  },
    { from: "E", to: ["D"]     , point: { x: 20, y:  4 }  },
  ];

  // ---------------
  var map = new Map(game, title, bgm);
  map.tiles = tiles;
  map.addZones(zones, connections);
  map.startUnits = units;
  map.addPlayerFaction(player);
  map.difficulty = difficulty;
  map.unitPlacement = unitPlacement;
  return map;
}
// ==========================================================

// ==========================================================
function ArcherVolleys(game) {
  var title = "Archer Volleys";
  var difficulty = 1;
  var player = new Faction(game._playerData.name, 1, true);
  var enemy  = new Faction("Enemy",  2);

  var bgm = getBGM(game, "normal");

  var units = [
    // Enemy
    { unit: Soldier(game, enemy, "Archer"), x:  3, y:  2 },
    { unit: Soldier(game, enemy, "Archer"), x:  3, y:  7 },
    { unit: Soldier(game, enemy, "Archer"), x:  7, y:  2 },
    { unit: Soldier(game, enemy, "Archer"), x:  7, y:  7 },
    { unit: Soldier(game, enemy, "Archer"), x: 11, y:  2 },
    { unit: Soldier(game, enemy, "Archer"), x: 11, y:  7 },
    { unit: Arash(game, enemy),             x: 18, y:  4 },
  ];

  for (const temp of units) {
    temp.unit.aiType = aiTypeEnum.Zone;
  }

  var unitPlacement = [
    { x: 0, y: 2, dist: 4, dir: "south" },
    { x: 1, y: 2, dist: 4, dir: "south" },
  ];

  var tiles = [
  //                               1  1  1  1  1  1  1  1  1  1  2  2  2
  // 0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5  6  7  8  9  0  1  2
    [F, F, G, G, G, G, M, M, M, G, G, G, G, G, F, F, G, G, G, G, G, G, F], // 0
    [G, G, G, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, F, F], // 1
    [W, W, W, P, W, W, W, P, W, W, W, P, W, W, W, G, G, G, W, G, P, G, F], // 2
    [F, G, W, W, W, G, W, W, W, F, W, W, W, G, G, G, G, F, W, F, P, G, F], // 3
    [G, G, G, G, G, G, G, G, G, G, F, G, G, G, G, G, G, F, G, F, P, F, F], // 4
    [G, G, G, G, G, F, G, G, G, G, G, G, G, G, G, G, G, G, F, G, P, F, F], // 5
    [F, F, W, W, W, F, W, W, W, G, W, W, W, F, F, G, G, F, W, G, P, G, F], // 6
    [W, W, W, P, W, W, W, P, W, W, W, P, W, W, W, F, G, G, W, G, P, G, F], // 7
    [M, G, G, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, P, F, F], // 8
    [M, M, G, G, G, G, G, G, G, M, G, G, G, G, G, G, G, G, F, G, G, F, G], // 9
  ];

  var zones = [
    { name: "A", start: { x:  0, y:  3 }, end: { x: 14, y:  7 } },
    { name: "B", start: { x:  0, y:  0 }, end: { x: 22, y:  2 } },
    { name: "C", start: { x:  0, y:  7 }, end: { x: 22, y:  9 } },
    { name: "D", start: { x: 15, y:  3 }, end: { x: 22, y:  6 } },
  ];
  var connections = [         // Points should be outside of the "from" zone
    { from: "A", to: ["B", "C", "D"], point: { x: 15, y:  3 } },
    { from: "A", to: ["B", "C", "D"], point: { x: 15, y:  4 } },
    { from: "A", to: ["B", "C", "D"], point: { x: 15, y:  5 } },
    { from: "A", to: ["B", "C", "D"], point: { x: 15, y:  6 } },

    { from: "D", to: ["A"],      point: { x: 14, y:  4 } },
    { from: "D", to: ["A"],      point: { x: 14, y:  5 } },
    { from: "D", to: ["B"],      point: { x: 16, y:  2 } },
    { from: "D", to: ["B"],      point: { x: 20, y:  2 } },
    { from: "D", to: ["C"],      point: { x: 16, y:  7 } },
    { from: "D", to: ["C"],      point: { x: 20, y:  7 } },

    { from: "B", to: ["A", "C", "D"], point: { x: 15, y:  3 } },
    { from: "B", to: ["A", "C", "D"], point: { x: 16, y:  3 } },
    { from: "B", to: ["A", "C", "D"], point: { x: 20, y:  3 } },

    { from: "C", to: ["A", "B", "D"], point: { x: 15, y:  6 } },
    { from: "C", to: ["A", "B", "D"], point: { x: 16, y:  6 } },
    { from: "C", to: ["A", "B", "D"], point: { x: 20, y:  6 } },
  ];

  // ---------------
  var map = new Map(game, title, bgm);
  map.tiles = tiles;
  map.addZones(zones, connections);
  map.startUnits = units;
  map.addPlayerFaction(player);
  map.difficulty = difficulty;
  map.unitPlacement = unitPlacement;
  return map;
}
// ==========================================================

// ==========================================================
function Assassination(game) {
  var title = "Assassination";
  var difficulty = 1;
  var player = new Faction(game._playerData.name, 1, true);
  var enemy  = new Faction("Enemy",  2);

  var bgm = getBGM(game, "normal");

  var units = [
    // Enemy
    { unit: CursedArmHassan(game, enemy), x:  2, y:  2 },
    { unit: HundredHassan(game, enemy)  , x: 17, y: 15 },

    { unit: HassanZayd(game, enemy),   x:  2, y:  8 },
    { unit: HassanMakuru(game, enemy), x: 16, y:  2 },
    { unit: HassanGozuru(game, enemy), x: 19, y:  7 },

    { unit: HassanZayd(game, enemy),   x:  9, y: 15 },
    { unit: HassanMakuru(game, enemy), x:  4, y: 14 },
    { unit: HassanGozuru(game, enemy), x: 13, y: 13 },
  ];


  var unitPlacement = [
    { x:  7, y: 7, dist: 5, dir: "east" },
    { x: 10, y: 5, dist: 3, dir: "south" },
  ];

  var tiles = [
  //                               1  1  1  1  1  1  1  1  1  1  2
  // 0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5  6  7  8  9  0
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O], // 0
    [O, M, M, G, O, O, M, M, F, G, G, W, G, G, F, F, G, F, O, O, O], // 1
    [O, M, G, G, B, B, M, G, G, G, W, O, O, O, O, O, F, G, F, O, O], // 2
    [O, G, G, G, O, O, M, G, G, G, W, O, O, O, O, O, G, G, F, O, O], // 3
    [O, O, B, O, O, M, M, G, G, G, P, B, B, T, B, B, F, G, W, O, O], // 4
    [O, O, B, O, M, M, F, G, G, G, P, O, O, B, O, O, G, G, W, O, O], // 5
    [O, F, F, M, M, F, G, G, G, L, P, O, O, B, O, O, G, G, G, O, O], // 6
    [O, M, G, G, G, G, G, P, P, P, P, P, P, P, W, G, G, G, G, M, O], // 7
    [O, G, G, G, P, P, P, P, W, W, P, L, G, G, G, G, G, G, M, M, O], // 8
    [O, G, G, F, P, G, G, G, G, P, P, G, F, O, O, M, M, M, M, O, O], // 9
    [O, O, F, F, P, F, G, G, G, P, G, F, O, O, O, O, O, O, O, O, O], // 10
    [O, O, O, O, B, O, O, F, G, P, G, O, O, O, F, O, O, O, O, O, O], // 11
    [O, O, O, O, B, O, O, O, G, P, G, O, O, W, W, O, O, O, F, O, O], // 12
    [O, F, F, G, P, O, O, O, G, P, G, B, B, G, G, O, O, O, G, F, O], // 13
    [O, F, P, P, P, P, B, B, P, P, G, O, O, G, G, M, O, W, W, F, O], // 14
    [O, G, G, G, P, F, O, O, G, G, F, O, O, F, G, G, M, G, G, F, O], // 15
    [O, W, G, F, F, F, O, O, F, F, O, O, O, O, F, G, G, G, F, O, O], // 16
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O], // 17
  ];

  var zones = [
    { name: "A", start: { x:  0, y:  0 }, end: { x:  3, y:  5 } },
    { name: "A", start: { x:  4, y:  0 }, end: { x:  5, y:  3 } },

    { name: "B", start: { x:  0, y: 11 }, end: { x:  6, y: 17 } },
    { name: "B", start: { x:  7, y: 12 }, end: { x:  7, y: 17 } },

    { name: "C", start: { x: 11, y: 11 }, end: { x: 20, y: 17 } },

    { name: "D", start: { x:  1, y:  6 }, end: { x: 10, y: 10 } },
    { name: "D", start: { x:  7, y: 11 }, end: { x: 10, y: 11 } },
    { name: "D", start: { x:  8, y: 12 }, end: { x: 10, y: 17 } },
    { name: "D", start: { x:  6, y:  1 }, end: { x: 10, y:  5 } },
    { name: "D", start: { x:  4, y:  4 }, end: { x:  5, y:  5 } },
    { name: "D", start: { x: 11, y:  7 }, end: { x: 20, y: 10 } },

    { name: "E", start: { x: 11, y:  0 }, end: { x: 20, y: 6 } },

  ];
  var connections = [         // Points should be outside of the "from" zone
    { from: "A", to: ["B", "C", "D", "E"], point: { x:  2, y:  6 } },
    { from: "A", to: ["B", "C", "D", "E"], point: { x:  6, y:  2 } },

    { from: "B", to: ["A", "C", "D", "E"], point: { x:  4, y: 10 } },
    { from: "B", to: ["A", "C", "D", "E"], point: { x:  8, y: 14 } },

    { from: "C", to: ["A", "B", "D", "E"], point: { x: 10, y: 13 } },

    { from: "E", to: ["A", "B", "C", "D"], point: { x: 10, y:  4 } },
    { from: "E", to: ["A", "B", "C", "D"], point: { x: 13, y:  7 } },
    { from: "E", to: ["A", "B", "C", "D"], point: { x: 16, y:  7 } },

    { from: "D", to: ["A"]               , point: { x:  5, y:  2 } },
    { from: "D", to: ["A"]               , point: { x:  2, y:  5 } },
    { from: "D", to: ["B"]               , point: { x:  4, y: 11 } },
    { from: "D", to: ["B"]               , point: { x:  7, y: 14 } },
    { from: "D", to: ["C"]               , point: { x: 11, y: 13 } },
    { from: "D", to: ["E"]               , point: { x: 11, y:  4 } },
    { from: "D", to: ["E"]               , point: { x: 13, y:  6 } },
    { from: "D", to: ["E"]               , point: { x: 16, y:  6 } },
  ];

  // ---------------
  var map = new Map(game, title, bgm);
  map.tiles = tiles;
  map.addZones(zones, connections);
  map.startUnits = units;
  map.addPlayerFaction(player);
  map.difficulty = difficulty;
  map.unitPlacement = unitPlacement;
  return map;
}
// ==========================================================

// ==========================================================
function CastleOfSnow(game) {
  var title = "Castle of Snow";
  var difficulty = 2;
  var player = new Faction(game._playerData.name, 1, true);
  var enemy  = new Faction("Enemy",  2);

  var bgm = getBGM(game, "intense");

  var units = [
    // Enemy
    { unit: Heracles(game, enemy), x: 14, y:  4 },
  ];

  units[0].unit.maxHP = 600;
  units[0].unit.curHP = 600;
  units[0].unit.npChargeTime = 8;
  units[0].unit.curCharge = 6;


  var unitPlacement = [
    { x: 6, y: 17, dist: 4, dir: "east" },
    { x: 6, y: 16, dist: 4, dir: "east" },
  ];

  var tiles = [
  //                               1  1  1  1  1  1  1  1  1  1  2  2
  // 0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5  6  7  8  9  0  1
    [F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F], // 0
    [F, F, F, W, W, W, W, W, W, W, W, W, W, W, W, W, W, F, F, F, F, F], // 1
    [F, F, W, W, S, S, W, S, S, S, S, W, S, S, S, S, W, W, F, M, M, F], // 2
    [F, F, W, S, S, S, S, S, S, S, S, S, S, S, S, S, S, W, M, M, M, M], // 3
    [F, F, W, S, S, S, S, S, S, S, S, S, S, S, S, S, S, W, M, M, M, M], // 4
    [F, F, W, S, S, S, W, S, S, S, S, W, S, S, S, S, S, W, M, M, M, M], // 5
    [F, F, W, W, S, S, W, S, S, S, S, W, S, S, S, S, S, W, F, M, M, M], // 6
    [F, F, F, W, W, W, W, W, S, S, W, W, W, S, S, S, S, W, F, F, F, M], // 7
    [F, F, F, F, F, F, F, G, G, G, G, F, W, W, S, S, W, W, F, F, F, F], // 8
    [F, F, F, G, F, G, F, G, G, G, G, F, F, W, W, W, W, G, F, G, F, F], // 9
    [F, F, F, G, G, G, F, F, G, G, F, G, G, F, F, G, F, G, G, F, G, F], // 10
    [F, F, F, F, F, G, F, G, G, G, G, F, G, G, F, F, G, F, G, G, F, F], // 11
    [F, F, G, G, G, F, G, G, F, G, G, G, F, G, G, G, F, G, F, G, F, F], // 12
    [F, F, F, F, G, G, G, G, G, G, F, G, G, G, F, G, G, G, F, G, F, F], // 13
    [F, F, G, G, G, F, G, F, G, G, G, G, F, G, F, G, F, G, G, G, F, F], // 14
    [F, F, G, F, G, F, G, G, G, F, G, G, G, G, G, F, G, G, F, F, G, F], // 15
    [F, F, F, G, G, G, F, G, G, G, G, F, G, F, G, F, G, G, G, F, G, F], // 16
    [F, F, F, F, F, F, F, F, G, F, G, F, F, F, F, F, F, F, F, F, F, G], // 17
  ];

  var zones = [
    { name: "A", start: { x:  0, y:  8 }, end: { x: 12, y: 17 } },
    { name: "A", start: { x: 13, y:  9 }, end: { x: 16, y: 17 } },
    { name: "A", start: { x: 17, y:  8 }, end: { x: 21, y: 17 } },

    { name: "B", start: { x:  3, y:  1 }, end: { x:  6, y:  7 } },

    { name: "C", start: { x:  7, y:  1 }, end: { x: 11, y:  7 } },

    { name: "D", start: { x: 12, y:  1 }, end: { x: 16, y:  8 } },
  ];
  var connections = [         // Points should be outside of the "from" zone
    { from: "A", to: ["B", "C", "D"], point: { x:  8, y:  7 } },
    { from: "A", to: ["B", "C", "D"], point: { x:  9, y:  7 } },

    { from: "B", to: ["A", "C", "D"], point: { x:  7, y:  3 } },
    { from: "B", to: ["A", "C", "D"], point: { x:  7, y:  4 } },

    { from: "D", to: ["A", "C", "B"], point: { x: 11, y:  3 } },
    { from: "D", to: ["A", "C", "B"], point: { x: 11, y:  4 } },

    { from: "C", to: ["A"]          , point: { x:  8, y:  8 } },
    { from: "C", to: ["A"]          , point: { x:  9, y:  8 } },
    { from: "C", to: ["B"]          , point: { x:  6, y:  3 } },
    { from: "C", to: ["B"]          , point: { x:  6, y:  4 } },
    { from: "C", to: ["D"]          , point: { x:  12, y:  3 } },
    { from: "C", to: ["D"]          , point: { x:  12, y:  4 } },
  ];

  // ---------------
  var map = new Map(game, title, bgm);
  map.tiles = tiles;
  map.addZones(zones, connections);
  map.startUnits = units;
  map.addPlayerFaction(player);
  map.difficulty = difficulty;
  map.unitPlacement = unitPlacement;
  return map;
}
// ==========================================================

// ==========================================================
function PigletIsland(game) {
  var title = "Piglet Island";
  var difficulty = 2;
  var player = new Faction(game._playerData.name, 1, true);
  var enemy  = new Faction("Enemy",  2);

  var bgm = getBGM(game, "normal");

  var units = [
    // Enemy
    { unit: Circe(game, enemy), x: 20, y:  5 },
    { unit: MedeaLily(game, enemy), x: 18, y:  6 },

    { unit: Pig(game, enemy), x:  6, y:  6 },
    { unit: Pig(game, enemy), x:  4, y:  9 },
    { unit: Pig(game, enemy), x:  9, y:  4 },
    { unit: Pig(game, enemy), x: 10, y:  5 },
    { unit: Pig(game, enemy), x:  5, y: 11 },
    { unit: Pig(game, enemy), x: 13, y:  5 },
    { unit: Pig(game, enemy), x: 17, y: 10 },
    { unit: Pig(game, enemy), x: 18, y:  3 },
    { unit: Pig(game, enemy), x: 14, y: 11 },

    { unit: DemonBoarGiant(game, enemy), x: 22, y: 10 },
    { unit: DemonBoarGiant(game, enemy), x: 24, y: 12 },
  ];


  var unitPlacement = [
    { x:  2, y:  4, dist: 4, dir: "east" },
    { x:  4, y:  2, dist: 4, dir: "south" },
  ];

  var tiles = [
  //                               1  1  1  1  1  1  1  1  1  1  2  2  2  2  2  2  2
  // 0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5  6
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O], // 0
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, F, M, G, F, M, F, F, O, O, O, O, O, O], // 1
    [O, O, O, F, G, G, F, O, O, O, O, F, G, F, G, G, G, G, G, G, G, G, G, O, O, O, O], // 2
    [O, O, F, M, G, G, G, F, O, O, F, G, G, G, G, G, G, G, G, G, G, F, F, G, G, O, O], // 3
    [O, O, G, G, G, G, G, G, B, G, G, G, G, G, G, M, F, G, G, G, G, G, M, F, G, O, O], // 4
    [O, O, G, G, G, G, F, G, O, G, G, G, G, G, F, M, M, G, G, G, G, G, F, G, G, O, O], // 5
    [O, O, F, G, F, G, G, G, B, G, F, G, G, F, M, M, M, G, G, O, O, O, G, F, O, O, O], // 6
    [O, O, O, G, G, G, G, O, O, O, O, G, G, F, M, M, M, G, G, O, O, O, O, O, O, O, O], // 7
    [O, O, O, O, B, O, B, O, O, O, O, G, G, F, M, M, F, G, G, O, O, O, F, G, F, O, O], // 8
    [O, O, O, G, G, F, G, O, O, O, F, G, G, G, F, M, F, G, G, F, G, G, G, F, G, F, O], // 9
    [O, O, F, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, F, M, F, G, O], // 10
    [O, O, F, M, G, G, G, G, G, G, G, G, F, G, G, F, G, G, G, G, G, G, M, M, F, G, O], // 11
    [O, O, O, F, M, G, G, F, O, O, F, M, F, F, O, O, O, O, O, F, G, G, F, F, G, F, O], // 12
    [O, O, O, O, F, F, G, O, O, O, O, O, O, O, O, O, O, O, O, O, F, G, G, G, F, O, O], // 13
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O], // 14
  ];

  var zones = [
    { name: "A", start: { x:  0, y:  0 }, end: { x:  8, y:  8 } },
    { name: "B", start: { x:  0, y:  9 }, end: { x: 26, y: 14 } },
    { name: "C", start: { x:  9, y:  0 }, end: { x: 14, y:  8 } },
    { name: "D", start: { x: 15, y:  0 }, end: { x: 26, y:  8 } },
    { name: "B", start: { x: 22, y:  8 }, end: { x: 24, y:  8 } },
  ];
  var connections = [         // Points should be outside of the "from" zone
    { from: "A", to: ["B", "D"], point: { x:  4, y:  9 } },
    { from: "A", to: ["B", "D"], point: { x:  6, y:  9 } },
    { from: "A", to: ["C", "D"], point: { x:  9, y:  4 } },
    { from: "A", to: ["C", "D"], point: { x:  9, y:  6 } },

    { from: "B", to: ["A"]     , point: { x:  4, y:  8 } },
    { from: "B", to: ["A"]     , point: { x:  6, y:  8 } },
    { from: "B", to: ["C"]     , point: { x: 11, y:  8 } },
    { from: "B", to: ["C"]     , point: { x: 12, y:  8 } },
    { from: "B", to: ["C"]     , point: { x: 13, y:  8 } },
    { from: "B", to: ["D"]     , point: { x: 17, y:  8 } },
    { from: "B", to: ["D"]     , point: { x: 18, y:  8 } },

    { from: "C", to: ["A"]     , point: { x:  8, y:  4 } },
    { from: "C", to: ["A"]     , point: { x:  8, y:  6 } },
    { from: "C", to: ["A"]     , point: { x: 11, y:  9 } },
    { from: "C", to: ["A"]     , point: { x: 12, y:  9 } },
    { from: "C", to: ["A"]     , point: { x: 13, y:  9 } },
    { from: "C", to: ["D"]     , point: { x: 15, y:  2 } },
    { from: "C", to: ["D"]     , point: { x: 15, y:  3 } },

    { from: "D", to: ["C", "A"], point: { x: 14, y:  2 } },
    { from: "D", to: ["C", "A"], point: { x: 14, y:  3 } },
    { from: "D", to: ["B"]     , point: { x: 17, y:  9 } },
    { from: "D", to: ["B"]     , point: { x: 18, y:  9 } },
  ];

  // ---------------
  var map = new Map(game, title, bgm);
  map.tiles = tiles;
  map.addZones(zones, connections);
  map.startUnits = units;
  map.addPlayerFaction(player);
  map.difficulty = difficulty;
  map.unitPlacement = unitPlacement;
  return map;
}
// ==========================================================

// ==========================================================
function FailedExperiments(game) {
  var title = "Failed Experiments";
  var difficulty = 2;
  var player = new Faction(game._playerData.name, 1, true);
  var other  = new Faction("Experiments",  2);
  var enemy  = new Faction("Enemy",  3);

  var bgm = getBGM(game, "normal");

  var units = [
    // Enemy
    { unit: Celtic(game, enemy, "Caster"), x:  8, y:  3 },
    { unit: Celtic(game, enemy, "Caster"), x: 12, y:  5 },
    { unit: Celtic(game, enemy, "Caster"), x: 11, y: 23 },

    // Other
    { unit: Chimera(game, other), x:  0, y:  1 },
    { unit: Chimera(game, other), x:  4, y:  8 },
    { unit: Chimera(game, other), x: 18, y:  5 },
    { unit: Chimera(game, other), x:  2, y: 22 },
    { unit: Chimera(game, other), x: 16, y: 25 },
  ];


  var unitPlacement = [
    { x:  3, y: 15, dist: 3, dir: "west" },
    { x:  2, y: 14, dist: 2, dir: "west" },
    { x:  2, y: 16, dist: 2, dir: "west" },
  ];

  var tiles = [
  //                               1  1  1  1  1  1  1  1  1  1  2
  // 0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5  6  7  8  9  0
    [S, S, W, G, G, G, G, G, R, G, G, F, F, G, G, F, M, M, M, M, M], // 0
    [S, S, S, G, G, G, G, G, R, R, R, R, R, R, G, G, F, G, G, F, F], // 1
    [S, S, W, G, G, G, G, G, G, G, G, G, F, R, R, R, R, R, R, R, R], // 2
    [W, W, W, G, G, G, G, F, G, G, G, G, G, G, G, G, W, W, W, W, F], // 3
    [F, G, F, G, G, G, G, G, F, F, F, G, G, G, G, G, W, S, S, W, F], // 4
    [G, G, G, G, G, G, G, G, G, F, F, F, G, F, G, G, S, S, S, W, G], // 5
    [G, G, W, W, S, W, W, G, G, G, F, F, F, G, G, G, W, S, S, W, F], // 6
    [F, F, W, S, S, S, W, G, G, G, F, F, G, G, G, G, W, W, W, W, F], // 7
    [F, F, W, S, S, S, W, G, G, G, F, F, F, G, G, G, G, G, F, F, G], // 8
    [F, G, W, W, W, W, W, G, G, F, G, F, G, G, G, G, G, F, G, F, F], // 9
    [G, G, G, F, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, F], // 10
    [M, F, M, G, G, F, F, G, M, G, G, G, F, G, G, G, G, G, G, F, M], // 11
    [F, M, F, M, M, M, F, M, M, M, G, F, M, F, G, G, F, M, M, M, M], // 12
    [M, M, M, M, M, M, M, M, M, G, G, G, F, G, G, M, M, M, M, M, M], // 13
    [G, F, G, G, G, F, G, G, G, P, P, P, P, P, P, G, G, G, G, G, F], // 14
    [P, P, P, P, P, P, P, P, P, P, G, F, G, G, P, P, P, P, P, P, P], // 15
    [G, G, G, G, G, G, G, G, G, G, F, M, M, F, G, G, G, M, M, M, M], // 16
    [F, M, G, M, M, M, F, M, G, G, M, M, M, M, G, G, M, M, M, M, F], // 17
    [M, M, M, M, M, F, M, M, M, G, F, M, M, M, M, G, G, F, M, M, M], // 18
    [M, F, F, F, G, G, G, F, G, G, G, F, F, F, G, G, G, G, G, G, F], // 19
    [F, W, W, W, W, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, F], // 20
    [G, W, S, S, W, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, F], // 21
    [F, W, S, S, S, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G], // 22
    [F, W, S, S, W, G, G, G, G, F, F, G, G, G, W, W, S, W, W, G, G], // 23
    [G, W, W, W, W, G, G, G, F, F, F, G, G, G, W, S, S, S, W, F, G], // 24
    [G, F, F, F, G, G, G, F, F, F, M, G, G, F, W, S, S, S, W, F, F], // 25
  ];

  var zones = [
    { name: "A", start: { x:  3, y:  0 }, end: { x: 15, y:  5 } },
    { name: "A", start: { x: 16, y:  0 }, end: { x: 20, y:  2 } },
    { name: "A", start: { x:  0, y:  4 }, end: { x:  2, y:  5 } },
    { name: "A", start: { x:  0, y:  6 }, end: { x:  1, y:  9 } },
    { name: "A", start: { x:  0, y: 10 }, end: { x:  6, y: 11 } },
    { name: "A", start: { x:  7, y:  6 }, end: { x: 15, y: 11 } },
    { name: "A", start: { x: 16, y:  8 }, end: { x: 20, y: 11 } },
    { name: "A", start: { x: 20, y:  3 }, end: { x: 20, y:  7 } },

    { name: "B", start: { x:  0, y: 12 }, end: { x: 20, y: 17 } },

    { name: "C", start: { x:  0, y: 18 }, end: { x: 20, y: 19 } },
    { name: "C", start: { x:  0, y: 20 }, end: { x:  0, y: 25 } },
    { name: "C", start: { x:  1, y: 25 }, end: { x:  4, y: 25 } },
    { name: "C", start: { x:  5, y: 20 }, end: { x: 13, y: 25 } },
    { name: "C", start: { x: 14, y: 20 }, end: { x: 20, y: 22 } },
    { name: "C", start: { x: 19, y: 23 }, end: { x: 20, y: 25 } },

    { name: "X", start: { x:  0, y:  0 }, end: { x:  2, y:  3 } },
    { name: "Y", start: { x:  2, y:  6 }, end: { x:  6, y:  9 } },
    { name: "Z", start: { x: 16, y:  3 }, end: { x: 19, y:  7 } },

    { name: "S", start: { x:  1, y: 20 }, end: { x:  4, y: 24 } },
    { name: "T", start: { x: 14, y: 23 }, end: { x: 18, y: 25 } },
  ];
  var connections = [         // Points should be outside of the "from" zone
    { from: "A", to: ["X"], point: { x:  2, y:  1 } },
    { from: "A", to: ["Y"], point: { x:  4, y:  6 } },
    { from: "A", to: ["Z"], point: { x: 16, y:  5 } },
    { from: "A", to: ["B", "C", "S", "T"], point: { x:  0, y: 12 } },
    { from: "A", to: ["B", "C", "S", "T"], point: { x:  6, y: 12 } },
    { from: "A", to: ["B", "C", "S", "T"], point: { x: 10, y: 12 } },
    { from: "A", to: ["B", "C", "S", "T"], point: { x: 14, y: 12 } },
    { from: "A", to: ["B", "C", "S", "T"], point: { x: 14, y: 15 } },

    { from: "B", to: ["A", "X", "Y", "Z"], point: { x:  1, y: 11 } },
    { from: "B", to: ["A", "X", "Y", "Z"], point: { x: 10, y: 11 } },
    { from: "B", to: ["A", "X", "Y", "Z"], point: { x: 14, y: 11 } },
    { from: "B", to: ["A", "X", "Y", "Z"], point: { x: 15, y: 11 } },

    { from: "B", to: ["C", "S", "T"],      point: { x:  2, y: 18 } },
    { from: "B", to: ["C", "S", "T"],      point: { x:  6, y: 18 } },
    { from: "B", to: ["C", "S", "T"],      point: { x:  9, y: 18 } },
    { from: "B", to: ["C", "S", "T"],      point: { x: 15, y: 18 } },

    { from: "C", to: ["S"], point: { x:  4, y: 22 } },
    { from: "C", to: ["T"], point: { x: 16, y: 23 } },
    { from: "C", to: ["A", "B", "X", "Y", "Z"], point: { x:  5, y: 17 } },
    { from: "C", to: ["A", "B", "X", "Y", "Z"], point: { x:  9, y: 17 } },
    { from: "C", to: ["A", "B", "X", "Y", "Z"], point: { x: 15, y: 17 } },

    { from: "X", to: ["A", "B", "C", "Y", "Z", "S", "T"], point: { x:  3, y:  3 } },
    { from: "Y", to: ["A", "B", "C", "X", "Z", "S", "T"], point: { x:  4, y:  5 } },
    { from: "Z", to: ["A", "B", "C", "Y", "X", "S", "T"], point: { x: 15, y:  5 } },
    { from: "S", to: ["A", "B", "C", "Y", "Z", "X", "T"], point: { x:  5, y: 22 } },
    { from: "T", to: ["A", "B", "C", "Y", "Z", "S", "X"], point: { x: 16, y: 22 } },
  ];

  // ---------------
  var map = new Map(game, title, bgm);
  map.tiles = tiles;
  map.addZones(zones, connections);
  map.startUnits = units;
  map.addPlayerFaction(player);
  map.difficulty = difficulty;
  map.unitPlacement = unitPlacement;
  return map;
}
// ==========================================================

// ==========================================================
function Roma(game) {
  var title = "Roma";
  var difficulty = 2;
  var player = new Faction(game._playerData.name, 1, true);
  var roman  = new Faction("Romans",  2);
  var briton  = new Faction("Britons", 3);

  var bgm = getBGM(game, "normal");

  var units = [
    // Romans
    { unit: Nero(game, roman),     x: 15, y:  3 },
    { unit: Spriggan(game, roman), x:  4, y: 17 },

    { unit: RomanSoldier(game, roman, "Rider"),  x: 12, y:  6 },
    { unit: RomanSoldier(game, roman, "Lancer"), x: 17, y:  6 },

    { unit: RomanSoldier(game, roman, "Rider"),  x: 16, y:  9 },
    { unit: RomanSoldier(game, roman, "Saber"), x: 13, y: 10 },

    { unit: RomanSoldier(game, roman, "Archer"), x:  7, y: 10 },
    { unit: RomanSoldier(game, roman, "Archer"), x: 10, y: 11 },

    // Britons
    { unit: Boudica(game, briton), x:  1, y:  2 },
    { unit: Soldier(game, briton, "Archer"), x:  0, y:  3 },
    { unit: Soldier(game, briton, "Saber"), x:  2, y:  2 },
    { unit: Soldier(game, briton, "Saber"), x:  1, y:  1 },
  ];

  units[1].unit.name = "Roman Statue";
  units[1].unit.maxHP = 200;
  units[1].unit.curHP = 200;

  for (var i = 0; i < 6; i++) {
    units[i].unit.aiType = aiTypeEnum.Zone;
  }
  units[6].unit.aiType = aiTypeEnum.Defensive;
  units[7].unit.aiType = aiTypeEnum.Defensive;


  var unitPlacement = [
    { x: 12, y: 20, dist: 4, dir: "east" },
    { x: 12, y: 21, dist: 4, dir: "east" },
  ];

  var Ws = Wall();
  Ws.baseImage = "stone-0";
  var Ss = Stone();
  Ss.baseImage = "stone-0";
  Ss.image = "stone-0";
  var Rs = River();
  Rs.baseImage = "stone-0";

  var Ls = LeyLine();
  Ls.baseImage = "stone-0";
  var Fs = Fortress();
  Fs.baseImage = "stone-0";
  Fs.image = "fortress_0-struct";
  Fs.isClaimable = false;
  Fs.faction = roman;

  var tiles = [
  //                               1  1  1  1  1  1  1  1  1  1
  // 0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5  6  7  8  9
    [M, G, P, G, M, M, F, G, M, M, G, F, M, M, M, M, M, G, F, G], // 0
    [M, P, P, G, F, M, M, F, F, G, G, G,Ws,Ws,Ws,Ws,Ws,Ws, M, M], // 1
    [M, P, G, M, M, M, M, M, F, F, G, W,Ws,Rs,Rs,Rs,Rs,Ws, W, F], // 2
    [G, P, G, M, M, M, M, M, M, F, G, W,Ss,Rs,Rs,Rs,Rs,Ss, W, G], // 3
    [G, P, G, G, G, F, M, M, M, M, F, W,Ss,Rs,Rs,Rs,Rs,Ss, W, F], // 4
    [F, P, P, P, P, P, G, M, M, M, F, W,Ss,Rs,Rs,Rs,Rs,Ss, W, F], // 5
    [M, F, G, G, G, P, G, F, M, W, W, W, S,Ss,Ss,Ss,Ss, S, W, W], // 6
    [M, M, G, W, W, S, W, W, W, W, S, S, S, S, S, S, S, S, S,Ss], // 7
    [M, M, W, W, S, S, S, S, S, S, S, S, S, S,Ss, S, S, S,Ss,Ls], // 8
    [M, M, W,Ss, S, S,Ws,Ws,Ss,Ss,Ws,Ws, S,Ss,Ls,Ws, S, S, S,Ws], // 9
    [F, M,Ws,Ls,Ss, S,Ws,Fs,Ss,Ss,Ls,Ws, S, S,Ws,Ls,Ss, S, S,Ws], // 10
    [M, G,Ws,Ls,Ss, S,Ws,Ls,Ss,Ss,Fs,Ws, S, S, S,Ss, S, S,Ss,Ls], // 11
    [M, F, W,Ss, S, S,Ws,Ws,Ss,Ss,Ws,Ws, S, S, S, S, S, S, S,Ss], // 12
    [G, M, W, S, S, S, S, S, S, S, S, S, S, S, S, S, S, S, W, W], // 13
    [G,Ws,Ws, S, S, S,Ss, W, W, W, W, S, S, S, S, S, W, W, W, M], // 14
    [F,Ws,Ls,Ss, S,Ss,Ls,Ws, F, F, W, W, W, S, W, W, W, G, F, F], // 15
    [F, W,Ss,Ss, W,Ss,Ss, W, G, F, G, G, G, P, G, G, G, G, F, F], // 16
    [M,Ws,Ls,Ss, S,Ss,Ls,Ws, G, G, G, G, G, P, G, G, G, F, G, F], // 17
    [M,Ws,Ws,Ls,Ss,Ls,Ws,Ws, G, G, G, G, G, P, G, G, G, G, G, F], // 18
    [M, M,Ws,Ws,Ws,Ws,Ws, G, G, G, G, G, G, P, P, P, P, G, G, G], // 19
    [M, M, G, G, G, F, F, G, G, G, G, G, G, G, F, M, P, G, G, F], // 20
    [F, M, F, G, M, M, M, M, F, G, F, G, G, G, G, F, P, G, G, M], // 21
  ];

  var zones = [
    { name: "A", start: { x:  0, y:  0 }, end: { x: 11, y:  6 } },
    { name: "A", start: { x:  0, y:  7 }, end: { x:  2, y: 14 } },

    { name: "B", start: { x:  3, y:  7 }, end: { x: 19, y: 13 } },
    { name: "B", start: { x:  2, y: 14 }, end: { x:  7, y: 18 } },
    { name: "B", start: { x: 11, y: 14 }, end: { x: 15, y: 14 } },
    { name: "B", start: { x: 12, y:  1 }, end: { x: 17, y:  6 } },

    { name: "C", start: { x:  6, y:  9 }, end: { x: 11, y: 12 } },

    { name: "D", start: { x:  0, y: 20 }, end: { x: 19, y: 21 } },
    { name: "D", start: { x:  7, y: 15 }, end: { x: 19, y: 19 } },
  ];
  var connections = [         // Points should be outside of the "from" zone
    { from: "A", to: ["B", "C", "D"], point: { x:  5, y:  7 } },

    { from: "B", to: ["A"],           point: { x:  5, y:  6 } },
    { from: "B", to: ["C"],           point: { x:  8, y:  9 } },
    { from: "B", to: ["C"],           point: { x:  9, y:  9 } },
    { from: "B", to: ["C"],           point: { x:  8, y: 12 } },
    { from: "B", to: ["C"],           point: { x:  9, y: 12 } },
    { from: "B", to: ["D"],           point: { x: 15, y: 15 } },

    { from: "C", to: ["B", "D", "A"], point: { x:  8, y:  8 } },
    { from: "C", to: ["B", "D", "A"], point: { x:  9, y:  8 } },
    { from: "C", to: ["B", "D", "A"], point: { x:  8, y: 12 } },
    { from: "C", to: ["B", "D", "A"], point: { x:  9, y: 12 } },

    { from: "D", to: ["B", "C", "A"], point: { x: 13, y: 14 } },
  ];

  // ---------------
  var map = new Map(game, title, bgm);
  map.tiles = tiles;
  map.addZones(zones, connections);
  map.startUnits = units;
  map.addPlayerFaction(player);
  map.difficulty = difficulty;
  map.unitPlacement = unitPlacement;
  return map;
}
// ==========================================================

// ==========================================================
function GolemRange(game) {
  var title = "Golem Range";
  var difficulty = 2;
  var player = new Faction(game._playerData.name, 1, true);
  var enemy  = new Faction("Enemy",  2);

  var bgm = getBGM(game, "normal");

  var units = [
    // Enemy
    { unit: GolemRock(game, enemy), x:  4, y:  9 },
    { unit: GolemStone(game, enemy), x:  5, y: 10 },
    { unit: GolemIron(game, enemy), x:  7, y:  3 },
    { unit: GolemIron(game, enemy), x:  9, y:  8 },
    { unit: GolemCrystal(game, enemy), x: 15, y:  3 },
  ];

  var structures = [
    { struct: Workshop(), x: 13, y: 1, faction: enemy, units: [
        { load: "GolemIron", cost: 200, classes: ["Berserker"] },
        { load: "GolemCrystal", cost: 200, classes: ["Berserker"] },
      ], cooldown: 2 },
    { struct: Workshop(), x: 16, y: 9, faction: enemy, units: [
        { load: "GolemRock", cost: 100, classes: ["Berserker"] },
        { load: "GolemStone", cost: 100, classes: ["Berserker"] },
      ], cooldown: 2 },
  ];


  var unitPlacement = [
    { x:  2, y:  0, dist: 3, dir: "south" },
    { x:  1, y:  1, dist: 2, dir: "south" },
    { x:  3, y:  1, dist: 2, dir: "south" },
  ];

  var tiles = [
  //                               1  1  1  1  1  1  1  1
  // 0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5  6  7
    [M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M], // 0
    [M, M, F, M, M, M, M, M, F, F, G, F, F, G, F, F, M, M], // 1
    [M, F, L, G, M, M, M, F, G, P, P, P, P, P, P, P, L, M], // 2
    [M, G, P, G, F, M, F, G, G, P, F, M, M, G, G, G, G, M], // 3
    [M, G, P, G, M, M, M, F, P, P, M, M, M, M, F, G, G, M], // 4
    [M, G, P, G, M, M, M, G, P, M, M, M, M, M, M, F, G, M], // 5
    [M, G, P, G, M, M, M, G, P, M, M, M, M, M, M, G, G, M], // 6
    [M, G, P, G, M, M, M, G, P, M, M, M, M, M, M, G, G, M], // 7
    [M, F, P, G, G, M, G, G, P, G, M, M, M, M, F, G, G, M], // 8
    [M, F, P, P, P, P, P, P, P, P, G, M, M, F, P, P, G, M], // 9
    [M, M, G, F, G, G, G, F, F, P, P, P, P, P, P, G, M, M], // 10
    [M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M, M], // 11
  ];

  var zones = [
    { name: "A", start: { x:  0, y:  0 }, end: { x:  6, y: 11 } },
    { name: "B", start: { x:  7, y:  8 }, end: { x: 17, y: 11 } },
    { name: "C", start: { x:  7, y:  0 }, end: { x: 17, y: 7 } },
  ];
  var connections = [         // Points should be outside of the "from" zone
    { from: "A", to: ["B", "C"], point: { x:  7, y:  8 } },
    { from: "A", to: ["B", "C"], point: { x:  7, y:  9 } },
    { from: "A", to: ["C"], point: { x:  7, y:  3 } },

    { from: "B", to: ["A"], point: { x:  6, y:  8 } },
    { from: "B", to: ["A"], point: { x:  6, y:  9 } },
    { from: "B", to: ["C"], point: { x:  7, y:  7 } },
    { from: "B", to: ["C"], point: { x:  8, y:  7 } },
    { from: "B", to: ["C"], point: { x: 15, y:  7 } },
    { from: "B", to: ["C"], point: { x: 16, y:  7 } },

    { from: "C", to: ["A"], point: { x:  6, y:  3 } },
    { from: "C", to: ["B", "A"], point: { x:  7, y:  8 } },
    { from: "C", to: ["B", "A"], point: { x:  8, y:  8 } },
    { from: "C", to: ["B"], point: { x: 15, y:  8 } },
    { from: "C", to: ["B"], point: { x: 16, y:  8 } },
  ];

  // ---------------
  var map = new Map(game, title, bgm);
  map.tiles = tiles;
  map.addZones(zones, connections);
  map.startUnits = units;
  map.startStructs = structures;
  map.addPlayerFaction(player);
  map.difficulty = difficulty;
  map.unitPlacement = unitPlacement;
  return map;
}
// ==========================================================

// ==========================================================
function QueenMedb(game) {
  var title = "Queen of Connacht";
  var difficulty = 2;
  var player = new Faction(game._playerData.name, 1, true);
  var enemy  = new Faction("Enemy",  2);

  var bgm = getBGM(game, "normal");

  var units = [
    // Enemy
    { unit: Medb(game, enemy), x:  8, y:  1 },
    { unit: CuChulainn(game, enemy), x:  14, y:  5 },
  ];

  units[0].unit.aiType = aiTypeEnum.Defensive;
  units[0].unit.curHP = 150;
  units[0].unit.maxHP = 150;

  units[1].unit.name = "Reluctant Cú";


  var structures = [
    { struct: Workshop(), x: 1, y: 4, faction: enemy, units: [
        { load: "Celtic", cost: 200, classes: ["Saber", "Archer", "Lancer", "Caster"] },
      ], cooldown: 5 },
    { struct: Workshop(), x: 5, y: 2, faction: enemy, units: [
        { load: "Celtic", cost: 200, classes: ["Saber", "Archer", "Lancer", "Caster"] },
      ], cooldown: 5 },
    { struct: Workshop(), x: 10, y: 2, faction: enemy, units: [
        { load: "Celtic", cost: 200, classes: ["Saber", "Archer", "Lancer", "Caster"] },
      ], cooldown: 5 },
    { struct: Workshop(), x: 14, y: 4, faction: enemy, units: [
        { load: "Celtic", cost: 200, classes: ["Saber", "Archer", "Lancer", "Caster"] },
      ], cooldown: 5 },
  ];


  var unitPlacement = [
    { x:  0, y: 19, dist: 3, dir: "east" },
    { x: 10, y: 19, dist: 3, dir: "east" },
  ];

  var Ws = Wall();
  Ws.baseImage = "stone-0";

  var tiles = [
  //                               1  1  1  1  1  1
  // 0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5
    [S, S, S, S, W, S, S, S, S, S, S, W, S, S, S, S], // 0
    [S, S, S, S, W, S, S, S, S, S, S, W, S, S, S, S], // 1
    [W, W, W, W,Ws, S, S, S, S, S, S,Ws, W, W, W, W], // 2
    [F, M, F, F, W, W, S, W, W, S, W, W, F, F, F, F], // 3
    [F, G, F, G, G, G, P, G, G, P, G, G, G, F, G, F], // 4
    [F, P, G, G, G, G, P, G, G, P, G, G, G, G, P, F], // 5
    [F, P, P, P, P, P, P, P, P, P, P, P, P, P, P, F], // 6
    [G, G, P, G, G, G, G, G, G, G, G, G, G, P, G, M], // 7
    [G, G, P, G, G, F, F, F, F, F, F, G, G, P, G, F], // 8
    [G, G, P, G, F, R, R, R, R, R, R, F, G, P, G, G], // 9
    [F, G, P, G, F, R, R, R, R, R, R, F, G, P, G, G], // 10
    [F, G, P, G, F, R, R, R, R, R, R, F, G, P, G, F], // 11
    [F, G, P, G, F, R, R, R, R, R, R, F, G, P, G, F], // 12
    [G, G, P, G, F, F, F, F, F, F, F, F, G, P, G, G], // 13
    [G, G, P, G, F, F, F, F, F, F, F, F, G, P, G, G], // 14
    [G, G, P, G, F, R, R, R, R, R, R, F, G, P, G, G], // 15
    [F, G, P, G, F, R, R, R, R, R, R, F, G, P, G, F], // 16
    [F, G, P, G, F, R, R, R, R, R, R, F, G, P, G, F], // 17
    [M, G, P, G, F, R, R, R, R, R, R, F, G, P, G, F], // 18
    [F, G, P, G, F, F, F, F, F, F, F, F, G, P, G, M], // 19
  ];

  var zones = [
    { name: "A", start: { x:  0, y:  0 }, end: { x: 15, y:  2 } },
    { name: "B", start: { x:  0, y:  3 }, end: { x:  7, y:  8 } },
    { name: "C", start: { x:  8, y:  3 }, end: { x: 15, y:  8 } },

    { name: "X", start: { x:  0, y:  9 }, end: { x:  4, y: 19 } },
    { name: "Y", start: { x:  5, y:  9 }, end: { x: 10, y: 19 } },
    { name: "Z", start: { x: 11, y:  9 }, end: { x: 15, y: 19 } },
  ];
  var connections = [         // Points should be outside of the "from" zone
    { from: "A", to: ["B", "X", "Y"], point: { x:  6, y:  3 } },
    { from: "A", to: ["C", "Z", "Y"], point: { x:  9, y:  3 } },

    { from: "B", to: ["A"], point: { x:  6, y:  2 } },
    { from: "B", to: ["C", "Z"], point: { x:  8, y:  5 } },
    { from: "B", to: ["C", "Z"], point: { x:  8, y:  6 } },
    { from: "B", to: ["C", "Z"], point: { x:  8, y:  7 } },
    { from: "B", to: ["Y"], point: { x:  6, y:  9 } },
    { from: "B", to: ["X"], point: { x:  1, y:  9 } },
    { from: "B", to: ["X"], point: { x:  2, y:  9 } },
    { from: "B", to: ["X"], point: { x:  3, y:  9 } },

    { from: "C", to: ["A"], point: { x:  9, y:  2 } },
    { from: "C", to: ["B", "X"], point: { x:  7, y:  5 } },
    { from: "C", to: ["B", "X"], point: { x:  7, y:  6 } },
    { from: "C", to: ["B", "X"], point: { x:  7, y:  7 } },
    { from: "C", to: ["Y"], point: { x:  9, y:  9 } },
    { from: "C", to: ["Z"], point: { x: 12, y:  9 } },
    { from: "C", to: ["Z"], point: { x: 13, y:  9 } },
    { from: "C", to: ["Z"], point: { x: 14, y:  9 } },

    { from: "X", to: ["B", "A", "C"], point: { x:  1, y:  8 } },
    { from: "X", to: ["B", "A", "C"], point: { x:  2, y:  8 } },
    { from: "X", to: ["B", "A", "C"], point: { x:  3, y:  8 } },
    { from: "X", to: ["Y", "Z"], point: { x:  5, y: 13 } },
    { from: "X", to: ["Y", "Z"], point: { x:  5, y: 14 } },

    { from: "Z", to: ["B", "A", "C"], point: { x: 12, y:  8 } },
    { from: "Z", to: ["B", "A", "C"], point: { x: 13, y:  8 } },
    { from: "Z", to: ["B", "A", "C"], point: { x: 14, y:  8 } },
    { from: "Z", to: ["Y", "X"], point: { x: 10, y: 13 } },
    { from: "Z", to: ["Y", "X"], point: { x: 10, y: 14 } },

    { from: "Y", to: ["B", "A"], point: { x:  6, y: 8 } },
    { from: "Y", to: ["C", "A"], point: { x:  9, y: 8 } },
    { from: "Y", to: ["X"], point: { x:  4, y: 11 } },
    { from: "Y", to: ["X"], point: { x:  4, y: 13 } },
    { from: "Y", to: ["X"], point: { x:  4, y: 14 } },
    { from: "Y", to: ["X"], point: { x:  4, y: 17 } },
    { from: "Y", to: ["Z"], point: { x: 11, y: 11 } },
    { from: "Y", to: ["Z"], point: { x: 11, y: 13 } },
    { from: "Y", to: ["Z"], point: { x: 11, y: 14 } },
    { from: "Y", to: ["Z"], point: { x: 11, y: 17 } },
  ];

  // ---------------
  var map = new Map(game, title, bgm);
  map.tiles = tiles;
  map.addZones(zones, connections);
  map.startUnits = units;
  map.startStructs = structures;
  map.addPlayerFaction(player);
  map.difficulty = difficulty;
  map.unitPlacement = unitPlacement;
  return map;
}
// ==========================================================

// ==========================================================
function Argonauts(game) {
  var title = "The Argonauts";
  var difficulty = 3;
  var player = new Faction(game._playerData.name, 1, true);
  var enemy  = new Faction("Enemy",  2);

  var bgm = getBGM(game, "intense");

  var units = [
    // Enemy
    { unit: Atalanta(game, enemy), x:  8, y:  4 },
    { unit: Heracles(game, enemy), x: 10, y:  4 },
    { unit: Medea(game, enemy), x:  7, y:  3 },
    { unit: MedeaLily(game, enemy), x: 11, y:  3 },
    { unit: Jason(game, enemy), x:  9, y:  3 },
  ];

  // for (const unit of units) {
  //   unit.unit.curHP += 50;
  //   unit.unit.maxHP += 50;
  // }


  var unitPlacement = [
    { x:  8, y:  14, dist: 1, dir: "south" },
    { x: 10, y:  14, dist: 1, dir: "south" },
    { x:  7, y:  15, dist: 1, dir: "south" },
    { x:  9, y:  15, dist: 1, dir: "south" },
    { x: 11, y:  15, dist: 1, dir: "south" },
  ];

  var tiles = [
  //                               1  1  1  1  1  1  1  1  1
  // 0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5  6  7  8
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O], // 0
    [O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O, O], // 1
    [O, O, O, O, O, G, G, G, G, G, G, G, G, G, O, O, O, O, O], // 2
    [F, F, G, F, F, G, G, P, G, P, G, P, G, G, G, G, G, F, F], // 3
    [F, F, G, G, G, G, G, G, P, G, P, G, G, G, F, G, G, G, G], // 4
    [F, L, G, G, G, G, G, G, G, G, G, G, G, R, R, R, R, R, R], // 5
    [P, P, G, G, F, F, G, G, G, G, G, G, R, R, F, G, G, G, G], // 6
    [G, G, G, M, M, R, R, R, R, R, R, R, R, M, F, G, G, G, F], // 7
    [F, G, M, M, M, R, M, F, G, G, G, G, F, G, G, G, G, G, G], // 8
    [M, G, R, R, R, R, M, G, G, G, G, G, G, G, G, F, O, B, O], // 9
    [R, V, R, M, M, M, F, W, G, G, G, G, T, F, F, O, O, F, F], // 10
    [M, G, M, M, F, G, W, W, G, G, G, W, W, W, W, O, O, F, F], // 11
    [M, G, G, F, G, G, G, G, G, G, G, G, G, G, G, O, O, F, F], // 12
    [F, L, G, G, G, G, G, G, G, G, G, G, G, G, G, F, O, B, O], // 13
    [P, P, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, G, O], // 14
    [F, G, G, G, G, G, G, G, P, G, P, G, G, G, G, G, G, G, G], // 15
    [O, O, G, G, G, W, G, P, G, P, G, P, G, W, G, G, G, M, F], // 16
    [O, O, F, F, G, W, F, F, G, G, F, G, G, W, F, G, G, F, F], // 17
  ];

  var zones = [
    { name: "A", start: { x:  0, y: 11 }, end: { x: 14, y: 17 } },
    { name: "A", start: { x: 15, y: 13 }, end: { x: 18, y: 17 } },

    { name: "B", start: { x: 17, y: 10 }, end: { x: 18, y: 12 } },

    { name: "C", start: { x:  0, y:  0 }, end: { x:  4, y: 10 } },

    { name: "D", start: { x:  5, y:  1 }, end: { x: 16, y: 10 } },
    { name: "D", start: { x: 17, y:  0 }, end: { x: 18, y:  9 } },
  ];
  var connections = [         // Points should be outside of the "from" zone
    { from: "A", to: ["B", "D"], point: { x: 17, y: 12 } },
    { from: "A", to: ["C"]     , point: { x:  1, y: 10 } },
    { from: "A", to: ["D"]     , point: { x:  8, y: 10 } },
    { from: "A", to: ["D"]     , point: { x:  9, y: 10 } },
    { from: "A", to: ["D"]     , point: { x: 10, y: 10 } },

    { from: "B", to: ["A", "C"], point: { x: 17, y: 13 } },
    { from: "B", to: ["D", "C"], point: { x: 17, y:  9 } },

    { from: "C", to: ["A", "B"], point: { x:  1, y: 11 } },
    { from: "C", to: ["D", "B"], point: { x:  5, y:  4 } },
    { from: "C", to: ["D", "B"], point: { x:  5, y:  5 } },

    { from: "D", to: ["A"]     , point: { x:  8, y: 11 } },
    { from: "D", to: ["A"]     , point: { x:  9, y: 11 } },
    { from: "D", to: ["A"]     , point: { x: 10, y: 11 } },
    { from: "D", to: ["B", "A"], point: { x: 17, y: 10 } },
    { from: "D", to: ["C"]     , point: { x:  4, y:  4 } },
    { from: "D", to: ["C"]     , point: { x:  4, y:  5 } },
  ];

  // ---------------
  var map = new Map(game, title, bgm);
  map.tiles = tiles;
  map.addZones(zones, connections);
  map.startUnits = units;
  map.addPlayerFaction(player);
  map.difficulty = difficulty;
  map.unitPlacement = unitPlacement;
  return map;
}
// ==========================================================
