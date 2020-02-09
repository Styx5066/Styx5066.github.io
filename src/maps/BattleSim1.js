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
    { unit: Soldier(game, enemy, classEnum.Archer), x: 15, y: 4 },
    { unit: Soldier(game, enemy, classEnum.Archer), x: 11, y: 4 },
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
