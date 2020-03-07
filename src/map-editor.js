/*
* Scene for testing things out
*/

//---------------
// DESCRIPTION: Loads map assets
// PARAMS:
//  game (I,REQ) - Game object
//---------------
function preloadMapEditor(game) {
  preloadMapTiles(game);
  preloadUI(game);
  preloadSounds(game);
  preloadMusic(game);

  game.load.image("button-up", "assets/ui/button-up.png");
  game.load.image("button-down", "assets/ui/button-down.png");
  game.load.image("button-right", "assets/ui/button-right.png");

  game.load.image("button-down-green", "assets/ui/button-down-green.png");
  game.load.image("button-right-green", "assets/ui/button-right-green.png");
  game.load.image("button-up-red", "assets/ui/button-up-red.png");
  game.load.image("button-left-red", "assets/ui/button-left-red.png");
}

//---------------
// DESCRIPTION: Creates the battle map and starts battle
// PARAMS:
//  game (I,REQ) - Game object
//  map  (I,REQ) - Map object
//---------------
function createMapEditor(game) {
  // Fade in transition
  fadeSceneIn(game);

  // BGM
  var bgm = game.sound.add("map01", { volume: 0.7 } );
  bgm.loop = true;
  bgm.play();


  // Initialize map editor
  var mapEditor = new MapEditor(game, 16, 10);
  mapEditor._playerData = game._playerData;
  mapEditor._bgm = bgm;

  mapEditor.drawMap();
  mapEditor.cameraSetup();
  mapEditor.tileBar();
  mapEditor.mapButtons();

}

class MapEditor {
  //---------------
  // DESCRIPTION: Creates a new Map Editor instance
  // PARAMS:
  //  game     (I,REQ) - Game object
  //---------------
  constructor(game, width, height) {
    this._game = game;
    this._playerData;
    this._camera;
    this._bgm;

    this._width = width;
    this._height = height;
    this._tiles = [];
    this._horzLines = [];
    this._vertLines = [];

    this._currentTileLeft;
    this._currentTileRight;
  }

  //---------------
  // DESCRIPTION: Draws the map editor map
  //---------------
  drawMap() {
    // Initialize
    for (var y = 0; y < this._height; y++) {
      this._tiles.push(new Array(this._width));
    }

    // Draw map
    for (var y = 0; y < this._height; y++) {
      for (var x = 0; x < this._width; x++) {
        var xPos = this.mapTilePos(x);
        var yPos = this.mapTilePos(y);

        var tileSprite = this._game.add.sprite(xPos, yPos, "grass-0").setOrigin(0, 0);
        tileSprite.depth = 1;

        this._tiles[y][x] = { sprite: tileSprite, name: "G" };
        this.mapInteractive(tileSprite, this._tiles[y][x]);


        // Vertical lines
        var vert = this._game.add.graphics();
        vert.depth = 100;
        vert.fillStyle(0x000000, 0.5);
        vert = vert.fillRect(((x * 64) - 1), 0, 2, (this._height * 64));
        this._vertLines.push(vert);
      }

      // Horizontal lines
      var horz = this._game.add.graphics();
      horz.depth = 100;
      horz.fillStyle(0x000000, 0.5);
      horz = horz.fillRect(0, ((y * 64) - 1), (this._width * 64), 2);
      this._horzLines.push(horz);
    }
  }
  mapInteractive(sprite, tile) {
    sprite.setInteractive();

    sprite.on('pointerdown', (pointer) => {
      // Left Click
      if (!pointer.rightButtonDown()) {
        tile.name = this._currentTileLeft.name;
        sprite.setTexture(this._currentTileLeft.image);
      }

      // Right Click
      else {
        tile.name = this._currentTileRight.name;
        sprite.setTexture(this._currentTileRight.image);
      }
    });

    sprite.on('pointerover', (pointer) => {
      if (!pointer.isDown) { return; }
      if (!pointer.rightButtonDown()) {
        tile.name = this._currentTileLeft.name;
        sprite.setTexture(this._currentTileLeft.image);
      }

      // Right Click
      else {
        tile.name = this._currentTileRight.name;
        sprite.setTexture(this._currentTileRight.image);
      }
    });
  }

  //---------------
  // DESCRIPTION: Redraws the map editor map
  //---------------
  redrawMap(expandedRight, expandedDown) {

    // Grid lines
    for (var i = 0; i < this._horzLines.length; i++) {
      var horz = this._horzLines[i];
      var xPos = horz.x;
      var yPos = horz.y;
      horz.clear();
      horz.fillStyle(0x000000, 0.5);
      horz = horz.fillRect(0, ((i * 64) - 1), (this._width * 64), 2);
    }

    for (var i = 0; i < this._vertLines.length; i++) {
      var vert = this._vertLines[i];
      xPos = vert.x;
      yPos = vert.y;
      vert.clear();
      vert.fillStyle(0x000000, 0.5);
      vert = vert.fillRect(((i * 64) - 1), 0, 2, (this._height * 64));
    }


    // Tiles
    for (var y = 0; y < this._height; y++) {
      for (var x = 0; x < this._width; x++) {
        var tile = this.mapGetTile(x, y);
        if (tile.sprite) { continue; }

        var xPos = this.mapTilePos(x);
        var yPos = this.mapTilePos(y);

        var tileSprite = this._game.add.sprite(xPos, yPos, "grass-0").setOrigin(0, 0);
        tileSprite.depth = 1;

        this._tiles[y][x] = { sprite: tileSprite, name: "G" };
        this.mapInteractive(tileSprite, this._tiles[y][x]);

        // Vertical lines
        if (expandedRight && ((x + 1) >= this._width)) {
          var vert = this._game.add.graphics();
          vert.depth = 100;
          vert.fillStyle(0x000000, 0.5);
          vert = vert.fillRect(((x * 64) - 1), 0, 2, (this._height * 64));
          this._vertLines.push(vert);
        }
      }

      // Horizontal lines
      if (expandedDown && ((y + 1) >= this._height)) {
        var horz = this._game.add.graphics();
        horz.depth = 100;
        horz.fillStyle(0x000000, 0.5);
        horz = horz.fillRect(0, ((y * 64) - 1), (this._width * 64), 2);
        this._horzLines.push(horz);
      }
    }


    // Camera
    var camWidth = 64 * this._width;
    var camHeight = 64 * this._height;
    this._camera.setBounds(0, 0, camWidth, camHeight);
  }

  //---------------
  // DESCRIPTION: Sets up map editor camera
  //---------------
  cameraSetup() {
    // Camera bounds
    this._camera = this._game.cameras.main;
    var camWidth = 64 * this._width;
    var camHeight = 64 * this._height;
    this._camera.useBounds = true;
    this._camera.setBounds(0, 0, camWidth, camHeight);

    // Camera controls
    var cursors = this._game.input.keyboard.addKeys({
      up:   Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right:Phaser.Input.Keyboard.KeyCodes.D
    });

    controls = new Phaser.Cameras.Controls.FixedKeyControl({
        camera: this._camera,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        speed: 1
    });
  }

  //---------------
  // DESCRIPTION: Creates the tile selection bar
  //---------------
  tileBar() {
    // Tile setup
    var barTiles = [
      { image: "grass-0",  name: "G" },
      { image: "forest",   name: "F" },
      { image: "mountain", name: "M" },
      { image: "ocean",    name: "O" },
      { image: "path",     name: "P" },
      { image: "wall",     name: "W" },
      { image: "stone",    name: "S" },
      { image: "river",    name: "R" },
    ];

    // Bar
    var width = (barTiles.length * 48) + 16 + (barTiles.length * 8);
    var height = 58;
    var startX = 512 - (width / 2);

    var shadow = this._game.add.graphics();
    shadow.fillStyle(0x000000, 0.5);
    shadow.fillRoundedRect(startX, -10, width, (height + 10), 8);
    shadow.depth = 100;
    shadow.setScrollFactor(0);

    // Tiles
    startX += 12;
    for (const tile of barTiles) {

      // Tile image
      var sprite = this._game.add.sprite(startX, 0, tile.image).setOrigin(0, 0);
      sprite.depth = 100;
      sprite.setDisplaySize(48, 48);
      sprite.setScrollFactor(0);
      this.tileBarInteractive(sprite, tile);
      tile.sprite = sprite;

      // L / R text
      var style = { font: "16px FrizQuadrata", fill: "#fff", stroke: "#000", strokeThickness: 3 };
      var textL = this._game.add.text((startX + 24), 16, "", style).setOrigin(0.5, 0.5);
      textL.setFill("#4cc3ff");
      textL.depth = 100;
      textL.setScrollFactor(0);
      tile.textL = textL;

      var textR = this._game.add.text((startX + 24), 32, "", style).setOrigin(0.5, 0.5);
      textR.setFill("#ff4136");
      textR.depth = 100;
      textR.setScrollFactor(0);
      tile.textR = textR;

      startX += 56;
    }

    // Set defaults to grass
    this._currentTileLeft  = barTiles[0];
    this._currentTileRight = barTiles[0];
    this._currentTileLeft.textL.text = "L";
    this._currentTileRight.textR.text = "R";
  }
  tileBarInteractive(sprite, tile) {
    sprite.setInteractive();

    sprite.on('pointerdown', (pointer) => {
      // Left Click
      if (!pointer.rightButtonDown()) {
        this._currentTileLeft.textL.text = "";

        this._currentTileLeft = tile;
        tile.textL.text = "L";
      }

      // Right Click
      else {
        this._currentTileRight.textR.text = "";

        this._currentTileRight = tile;
        tile.textR.text = "R";
      }
    });

    sprite.on('pointerover', function (pointer) { sprite.tint = 0xaaaaaa; } );
    sprite.on('pointerout',  function (pointer) { sprite.tint = 0xffffff; } );
  }

  //---------------
  // DESCRIPTION: Creates various map buttons
  //---------------
  mapButtons() {

    // Exit
    var exit = this._game.add.sprite(-1, -1, "button-right").setOrigin(0, 0);
    exit.depth = 100;
    exit.setScrollFactor(0);
    this.buttonInteractive(exit, () => {
      this._bgm.stop();
      this._game.scene.start('GameMenuScene', { playerData: this._playerData });
    });

    // Save
    var save = this._game.add.sprite(1022, 2, "button-down").setOrigin(1, 0);
    save.depth = 100;
    save.setDisplaySize(32, 32);
    save.setScrollFactor(0);
    this.buttonInteractive(save, () => { saveFile(this.getTileData(), "map-editor", "txt"); });

    // Load


    // Expand Width
    var expandWidth = this._game.add.sprite(1024, 604, "button-right-green").setOrigin(1, 1);
    expandWidth.depth = 100;
    expandWidth.setDisplaySize(32, 32);
    expandWidth.setScrollFactor(0);
    this.buttonInteractive(expandWidth, () => { this.expandWidth(); });

    // Expand Height
    var expandHeight = this._game.add.sprite(998, 626, "button-down-green").setOrigin(1, 1);
    expandHeight.depth = 100;
    expandHeight.setDisplaySize(32, 32);
    expandHeight.setScrollFactor(0);
    this.buttonInteractive(expandHeight, () => { this.expandHeight(); });

    // Reduce Width
    var reduceWidth = this._game.add.sprite(972, 604, "button-left-red").setOrigin(1, 1);
    reduceWidth.depth = 100;
    reduceWidth.setDisplaySize(32, 32);
    reduceWidth.setScrollFactor(0);
    this.buttonInteractive(reduceWidth, () => { this.reduceWidth(); });

    // Reduce Height
    var reduceHeight = this._game.add.sprite(998, 582, "button-up-red").setOrigin(1, 1);
    reduceHeight.depth = 100;
    reduceHeight.setDisplaySize(32, 32);
    reduceHeight.setScrollFactor(0);
    this.buttonInteractive(reduceHeight, () => { this.reduceHeight(); });

  }
  buttonInteractive(sprite, action) {
    sprite.setInteractive();

    sprite.on('pointerdown', (pointer) => {
      if (!pointer.rightButtonDown()) {
        action();
      }
    });

    sprite.on('pointerover', function (pointer) { sprite.tint = 0xaaaaaa; } );
    sprite.on('pointerout',  function (pointer) { sprite.tint = 0xffffff; } );
  }

  //---------------
  // DESCRIPTION: Increases map width by 1
  //---------------
  expandWidth() {
    this._width++;

    // Add to array
    for (var y = 0; y < this._height; y++) {
      this._tiles[y].push({ sprite: null, name: "G" });
    }

    this.redrawMap(true, false);
  }

  //---------------
  // DESCRIPTION: Decreases map width by 1
  //---------------
  reduceWidth() {
    // Don't get shorter than 16 across
    if (this._tiles[0].length <= 16) { return; }

    this._width--;

    // Remove from array
    for (var y = 0; y < this._height; y++) {
      this._tiles[y].length = (this._tiles[y].length - 1);
    }

    this.redrawMap();
  }

  //---------------
  // DESCRIPTION: Increases map height by 1
  //---------------
  expandHeight() {
    this._height++;

    // Add to array
    var newRow = [];
    for (var x = 0; x < this._width; x++) {
      newRow.push({ sprite: null, name: "G" });
    }
    this._tiles.push(newRow);

    this.redrawMap(false, true);
  }

  //---------------
  // DESCRIPTION: Decreases map height by 1
  //---------------
  reduceHeight() {
    // Don't get shorter than 10 down
    if (this._tiles.length <= 10) { return; }

    this._height--;

    // Remove from array
    this._tiles.length = (this._tiles.length - 1);

    this.redrawMap();
  }

  //---------------
  // DESCRIPTION: Returns current map tile data
  // RETURNS: String format of tile data
  //---------------
  getTileData() {
    var data = "";

    // Loop through tiles
    for (var y = 0; y < this._height; y++) {

      data += "["

      for (var x = 0; x < this._width; x++) {
        var tile = this.mapGetTile(x, y);
        data += tile.name;
        if ((x + 1) < this._width) { data += ", "; }
      }

      data += "], // " + y;
      if ((y + 1) < this._height) { data += "\n"; }
    }

    return data;
  }

  // ================================================================

  //---------------
  // DESCRIPTION: Returns tile at the specified location
  // PARAMS:
  //  x (I,REQ) - Xth tile
  //  y (I,REQ) - Yth tile
  // RETURNS: Tile at the specified location
  //---------------
  mapGetTile(x, y) {
    if ((y < 0) || (x < 0)) { return null; }
    if (y >= this._tiles.length) { return null; }
    if (x >= this._tiles[0].length) { return null; }

    // This is backwards because x is horizontal, but the array starts vertically
    return this._tiles[y][x];
  }

  //---------------
  // DESCRIPTION: Determines X or Y pixel position of a tile
  // PARAMS:
  //  xy (I,REQ) - The xth or yth tile to get the position for
  // RETURNS: The top-left pixel value of the xth or yth tile
  //          If out of bounds, returns 0
  //---------------
  mapTilePos(xy) {
    return (xy * 64);
  }

}
