/*
* Map object
*  - Defines the map size, tiles, and contents
*/
class Map {
  //---------------
  // DESCRIPTION: Creates a new Map
  // PARAMS:
  //  game     (I,REQ) - Game object
  //  name     (I,REQ) - Name of the map
  //  bgm      (I,REQ) - Music to play
  //  baseTile (I,OPT) - Base tile image (default: grass)
  //  tileSize (I,OPT) - Pixel size of tiles in the map (both width and height) (default: 64)
  //---------------
  constructor(game, name, bgm, baseTile, tileSize) {
    // ==============================
    //  Use to show tile numbers & info
    this._debugMap = false;
    // ==============================

    // Basics
    this._game = game;
    this._camera = game.cameras.main;
    this._name = name;
    this._playerData;
    this._loadedMap;
    this._difficulty = 1;

    this._bgm = bgm;
    this._sounds = {
      select: null,
      selectMenu: null,
      cancel: null,
      damage: null,
      damageRes: null,
      damageEff: null,
      damageMiss: null,
      heal: null,
      skillUse: null,
      skillUseDmg: null,
      npStart: null,
      npUse: null,
      npDamage: null,
      destroy: null,
      death: null,
      claim: null,
      click: null,
    }

    // Game Turn System
    this._factionIndex = -1;
    this._turnFaction;
    this._turnNum = 1;
    this._isTurnTransition = true;

    this._startStructs = [];
    this._startUnits = [];
    this._unitBank = [];
    this._activeUnits = [];

    // AI
    this._noClickTint;
    this._mapAI;
    this._connections;

    // Tiles
    this._tiles = [];
    this._baseTile = baseTile || "grass";
    this._tileSize = tileSize || 64;
    this._offsetX = 0;
    this._offsetY = 0;

    this._tileHover;
    this._tileInfoBox;
    this._unitInfoBox;
    this._playerInfoBox;
    this._tileInfoSide = "left";
    this._pauseTileHover = false;
    this._allowTileInfoSide = false;
    this._unitInfo = false;

    // Selection
    this._selectedUnit;
    this._selectedOrigX;
    this._selectedOrigY;
    this._selection = [];
    this._tempRange = [];

    this._optionMenu = [];
    this._optionText = [];
    this._optionsOpen

    this._attacker;
    this._enemyList = [];
    this._enemySelect = [];
    this._attackSelection = [];
    this._aoeSelection = [];
    this._noActionMenu = false;
    this._attackNeedsMovement = false;
    this._usingTargetedSkill = null;
    this._usingTargetedNP = null;

    this._unitPlacement = [];
    this._placementTile = null;
    this._placementUnit = null;

    this._lastTabbedUnit = null;

    // Factions
    this._factions = [];
    this._playerFactions = [];
  }

  // Data
  get playerData() { return this._playerData; }
  set playerData(x) { this._playerData = x; }

  get loadedMap() { return this._loadedMap; }
  set loadedMap(x) { this._loadedMap = x; }

  get difficulty() { return this._difficulty; }
  set difficulty(x) { this._difficulty = x; }

  // Name of the map
  get name() { return this._name; }
  set name(x) { this._name = x; }

  // Collection of map units
  addUnit(unit) { addElement(unit, this._unitBank); }
  removeUnit(unit) { removeElement(unit, this._unitBank); }
  isMapUnit(unit) { return this._unitBank.includes(unit); }
  get unitBank() { return this._unitBank; }

  // Collection of this turn's active units
  addActiveUnit(unit) { addElement(unit, this._activeUnits); }
  removeActiveUnit(unit) { removeElement(unit, this._activeUnits); }
  isActiveUnit(unit) { return this._activeUnits.includes(unit); }

  // Selected Unit
  get selectedUnit() { return this._selectedUnit; }
  set selectedUnit(x) { this._selectedUnit = x; }

  get selectedOrigX() { return this._selectedOrigX; }
  set selectedOrigX(x) { this._selectedOrigX = x; }

  get selectedOrigY() { return this._selectedOrigY; }
  set selectedOrigY(x) { this._selectedOrigY = x; }

  // Selection
  get selection() { return this._selection; }
  set selection(x) { this._selection = x; }

  // Factions
  get factions() { return this._factions; }
  get playerFactions() { return this._playerFactions; }

  // Turn Transition
  get isTurnTransition() { return this._isTurnTransition; }
  set isTurnTransition(x) { this._isTurnTransition = x; }

  // Starting Units
  get startUnits() { return this._startUnits; }
  set startUnits(x) { this._startUnits = x; }

  // Starting Structures
  get startStructs() { return this._startStructs; }
  set startStructs(x) { this._startStructs = x; }

  // Enemies
  get enemyList() { return this._enemyList; }
  set enemyList(x) { this._enemyList = x; }

  // Unit placement
  get unitPlacement() { return this._unitPlacement; }
  set unitPlacement(x) { this._unitPlacement = x; }


  // ====================================================================================
  //                                GAME TURN SYSTEM
  // ====================================================================================

  //---------------
  // DESCRIPTION: Starts the game
  //---------------
  startGame() {
    // Camera bounds
    var camWidth = this._tileSize * this._tiles[0].length;
    var camHeight = this._tileSize * this._tiles.length;
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

    // Tile hover and info
    this.createTileInfo();
    this.createPlayerInfo();

    // Debug info
    this.mapDebugInfo();

    // Load audio once instead of every time a sound is played
    this._sounds.select  = this._game.sound.add("select", { volume: 0.5 } );
    this._sounds.selectMenu = this._game.sound.add("menu-select", { volume: 0.5 } );
    this._sounds.cancel  = this._game.sound.add("cancel", { volume: 0.5 } );

    this._sounds.damage  = this._game.sound.add("damage", { volume: 0.5 } );
    this._sounds.damageEff  = this._game.sound.add("damage-effective", { volume: 0.5 } );
    this._sounds.damageRes  = this._game.sound.add("damage-resist", { volume: 0.5 } );
    this._sounds.damageMiss  = this._game.sound.add("damage-miss", { volume: 0.5 } );
    this._sounds.heal  = this._game.sound.add("heal", { volume: 0.5 } );

    this._sounds.skillUse = this._game.sound.add("skill-use", { volume: 0.5 } );
    this._sounds.skillUseDmg = this._game.sound.add("skill-use-dmg", { volume: 0.5 } );

    this._sounds.npStart = this._game.sound.add("np-start", { volume: 0.5 } );
    this._sounds.npUse = this._game.sound.add("np-use", { volume: 0.5 } );
    this._sounds.npDamage = this._game.sound.add("np-damage", { volume: 0.5 } );

    this._sounds.destroy = this._game.sound.add("destroy", { volume: 0.5 } );
    this._sounds.death   = this._game.sound.add("death", { volume: 0.5 } );

    this._sounds.claim   = this._game.sound.add("accept02", { volume: 0.5 } );
    this._sounds.click   = this._game.sound.add("click", { volume: 0.5 } );

    this._bgm.loop = true;
    this._bgm.play();

    // AI
    this._mapAI = new MapAI(this);

    // Set noClick sprite for AI turns; initially hide
    this._noClickTint = this._game.add.sprite(0, 0, "screentint");
    this._noClickTint.setOrigin(0, 0);
    this._noClickTint.setScrollFactor(0);
    this._noClickTint.setInteractive( useHandCursor(false) );
    this._noClickTint.alpha = 0;
    this._noClickTint.depth = -200;

    // General pointer events
    this._game.input.on("pointerdown", (pointer) => {
      if (pointer.rightButtonDown()) { this.cancelAll(); }
      else { this.actionMenu(pointer); }
    });

    this._game.input.on('pointerup', (pointer) => { if (!pointer.rightButtonDown()) {
      for (const sprite of this._tempRange) { sprite.destroy(); }
      this._tempRange.length = 0;
    } });

    // Tab button
    this._game.input.keyboard.on('keydown', (event) => {
      if (event.keyCode === 9) { event.preventDefault(); }
    });
    this._game.input.keyboard.on('keyup', (event) => {
      if (event.keyCode === 9) {
        event.preventDefault();

        if (this._turnFaction.isPlayable && !this._isTurnTransition
         && !this._selectedUnit && !this._unitInfo && !this._attacker
         && !this._optionsOpen && !this._pauseTileHover) {
          // Tab
          var tabUnit = this._lastTabbedUnit;

          // Grab first unit
          if (!tabUnit) {
            tabUnit = this._activeUnits[0];
          }
          // Grab unit after last
          else {
            var count = 0;
            var unitIdx = 0;
            for (const unit of this._activeUnits) {
              if (tabUnit == unit) {
                unitIdx = (count + 1);
                break;
              }
              count++;
            }

            if (unitIdx >= this._activeUnits.length) { unitIdx = 0; }
            tabUnit = this._activeUnits[unitIdx]
          }

          // Found unit to tab to
          this._lastTabbedUnit = tabUnit;
          var xPos = this.posX(tabUnit.xTile) + 32;
          var yPos = this.posY(tabUnit.yTile) + 32;
          this._camera.pan(xPos, yPos, 250, "Linear", true, (camera, progress, x, y) => {
            if (progress == 1) {
              this._game.input.activePointer.x = xPos - this._camera.scrollX;
              this._game.input.activePointer.y = yPos - this._camera.scrollY;
            }
          });
        }
      }
    });


    // Allow for unit placement
    if (this._unitPlacement.length > 0) {
      this.placeUnits();
    }
    // Or start the first faction's turn
    else {
      this.nextTurn();
    }
  }

  //---------------
  // DESCRIPTION: Ends the game
  // PARAMS:
  //  retreat (I,OPT) - If true, the player retreated from the battle
  //---------------
  endGame(retreat) {
    // Set end game values
    var color, text;
    this._factionIndex = -2;
    this._turnFaction = null;
    this._isTurnTransition = true;
    this.hideTileHover();
    this.hideTileInfo();
    var victoryBGM;

    // If any remaining factions are playable, the player won
    var victory = false;
    var firstClear = false;
    for (const faction of this._factions) {
      if (faction.isPlayable) {
        victory = true;
        break;
      }
    }

    if (retreat) {
      color = "#ff4040";
      text = "RETREAT"
      victory = false;
      victoryBGM = this._game.sound.add('defeat', { volume: 0.7 } );
    }
    else if (victory) {
      color = "#e9d100";
      text = "VICTORY"
      victoryBGM = this._game.sound.add('victory', { volume: 0.7 } );

      // Mark the map as completed
      if (this._playerData && this._loadedMap) {
        if (!this._playerData.battleSim.includes(this._loadedMap)) {
          firstClear = true;
          this._playerData.battleSim.push(this._loadedMap);
        }
      }
    }
    else {
      color = "#ff4040";
      text = "DEFEAT"
      victoryBGM = this._game.sound.add('defeat', { volume: 0.7 } );
    }

    // Tint the screen and show a message for the victors
    var tint = this._game.add.sprite(0, 0, "screentint");
    tint.setOrigin(0, 0);
    tint.setScrollFactor(0);
    tint.depth = 100;
    tint.setInteractive( useHandCursor(false) );
    tint.alpha = 0;

    var fadeIn = this._game.add.sprite(512, 32, "shadow-box");
    fadeIn.setOrigin(0.5, 0);
    fadeIn.setScrollFactor(0);
    fadeIn.depth = 101;
    fadeIn.alpha = 0;

    var titleStyle = { font: "50px Optima", fill: color };
    var endText = this._game.add.text(512, 70, text, titleStyle).setOrigin(0.5, 0.5);
    endText.setScrollFactor(0);
    endText.depth = 102;
    endText.alpha = 0;
    endText.setShadow(3, 3, '#000', 2);

    var button = this._game.add.sprite(1018, 620, "button-continue");
    button.setOrigin(1, 1);
    button.setScrollFactor(0);
    button.depth = 102;
    button.alpha = 0;
    button.setInteractive( useHandCursor() );
    button.on('pointerdown', (pointer) => { if (!pointer.rightButtonDown()) {
      this._sounds.select.play();
      this._bgm.stop();
      victoryBGM.stop();
      this._game.scene.start("GameMenuScene");
    } } );
    button.on('pointerover', function (pointer) { button.tint = 0xaaaaaa; } );
    button.on('pointerout',  function (pointer) { button.tint = 0xffffff; } );

    var buttonStyle = { font: "35px Optima", fill: "#fff" };
    var buttonText = this._game.add.text(934, 594, "OK", buttonStyle).setOrigin(0.5, 0.5);
    buttonText.setScrollFactor(0);
    buttonText.setShadow(1, 1, "#000", 1);
    buttonText.depth = 103;
    buttonText.alpha = 0;

    // Show transition
    defaultCursor();
    var timeline = this._game.tweens.createTimeline();

    this._bgm.volume = 0.4;

    timeline.add( {
      targets: tint,
      alpha: 1,
      ease: "Quad.easeOut",
      duration: 1000,
      onComplete: () => {
        this._bgm.stop();
        victoryBGM.loop = true;
        victoryBGM.play();
      }
    } );

    timeline.add( {
      targets: [fadeIn, endText],
      alpha: 1,
      ease: "Quad.easeIn",
      duration: 1000,
      delay: 500,
      onComplete: () => { this.showEndResults(victory, firstClear, [tint, fadeIn, endText, button, buttonText]); }
    } );

    timeline.add( {
      targets: [button, buttonText],
      alpha: 1,
      ease: "Quad.easeIn",
      duration: 1000,
      delay: 500,
    } );

    controls.stop();
    timeline.play();
  }

  //---------------
  // DESCRIPTION: Starts QP / Bond Point gains at the end of the game
  // PARAMS:
  //  victory    (I,OPT) - True if player was victorious
  //  firstClear (I,OPT) - True if this the first time this map has been cleared
  //  camIgnore  (I,OPT) - Array of elements for camera to ignore
  //---------------
  showEndResults(victory, firstClear, camIgnore) {

    // ==============================
    //   Camera
    // ==============================
    var cameraX = 30;
    var cameraY = 105;
    var cameraWidth = 767;
    var cameraHeight = 521;
    var resultCam = this._game.cameras.add(cameraX, cameraY, cameraWidth, cameraHeight);

    camIgnore.push(this._tileInfoBox._baseSprite);
    for (const box of this._tileInfoBox._boxUI) { camIgnore.push(box.sprite); }
    camIgnore.push(this._unitInfoBox._baseSprite);
    for (const box of this._unitInfoBox._boxUI) { camIgnore.push(box.sprite); }
    camIgnore.push(this._playerInfoBox._baseSprite);
    for (const box of this._playerInfoBox._boxUI) { camIgnore.push(box.sprite); }
    resultCam.ignore(camIgnore);

    cameraX -= 3000;
    resultCam.useBounds = true;
    resultCam.setBounds(cameraX, cameraY, cameraWidth, cameraHeight);
    resultCam.centerOn(cameraX, cameraY);

    // Camera controls - mouse wheel
    this._game.input.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
        var mod = 40;
        if (deltaY < 0) { mod = -40; }
        resultCam.setScroll(0, (resultCam.worldView.y + mod))
    });


    // ==============================
    //   Populate results
    // ==============================
    var results = [];
    var amount;

    // First time clear
    if (firstClear) {
      amount = 400;
      this._playerData.qp += amount;
      results.push({ text: "First Time Clear", image: "QP", color: "#ffd700", first: true, qp: amount });
    }
    // Normal clear
    else if (victory) {
      amount = (100 * this._difficulty);
      this._playerData.qp += amount;
      results.push({ text: "Cleared", image: "QP", color: "#ffffff", first: false, qp: amount });
    }
    // Defeat / Retreat
    else {
      results.push({ text: "No QP Gain", image: "QP", color: "#c1c1c1", first: false, qp: 0 });
    }


    // Remaining Servants
    if (victory) {
      for (const unit of this._unitBank) {
        // if (!this._playerFactions.includes(unit.faction)) { continue; }
        if (!this._playerData.servants.includes(unit.load)) { continue; }  // TODO: Add back in

        var servantData = getServantData(this._playerData, unit);
        var bondPoints;
        amount = 0;

        if (servantData) {
          // First Clear
          var servantFirst = false;
          if (!servantData.mapsCleared.includes(this._loadedMap)) {
            servantFirst = true;
            servantData.mapsCleared.push(this._loadedMap);
            amount = 25;
          }

          // Bond points
          servantData.bondPoints += 100;
          bondPoints = servantData.bondPoints;
        }

        this._playerData.qp += amount;
        results.push({ text: unit.name, image: unit.portrait + "-Portrait", color: "#ffffff", first: servantFirst,
        qp: amount, bp: bondPoints });
      }
    }


    // Save player data
    savePlayerData(this._playerData);


    // ==============================
    //   Results
    // ==============================
    var boxX = cameraX + (cameraWidth / 2);
    var boxY = cameraY + 10;
    var count = 0;

    for (const resultObj of results) {
      var boxUI = [];

      // Box
      var boxSprite = "box-result";
      if (resultObj.first && !resultObj.bp) { boxSprite = "box-special"; }
      var box = this._game.add.sprite(boxX, boxY, boxSprite).setOrigin(0.5, 0);
      box.alpha = 0;
      boxUI.push(box);

      // Image / Text
      var portraitX = boxX - 383;
      var image = this._game.add.sprite((portraitX + 18), (boxY + 138), resultObj.image).setOrigin(0, 1);
      image.alpha = 0;
      boxUI.push(image);

      var nameStyle = { font: "50px FrizQuadrata", fill: resultObj.color, stroke: "#000", strokeThickness: 1 };
      var name = this._game.add.text((portraitX + 158), (boxY + 6), resultObj.text + " ", nameStyle).setOrigin(0, 0);
      name.setShadow(2, 2, "#000", 2);
      name.alpha = 0;
      boxUI.push(name);


      // Bond points
      var amountX = boxX + 383;
      // TODO: Add


      // QP
      if (resultObj.qp > 0) {
        var label;
        if (resultObj.first && resultObj.bp) { label = "First Clear: QP "; }
        else { label = "QP "; }

        var qpStyle = { font: "35px FrizQuadrata", fill: "#fff", stroke: "#000", strokeThickness: 2 };
        var qpAmount = this._game.add.text((amountX - 15), (boxY + 134), "+ " + resultObj.qp + " ", qpStyle).setOrigin(1, 1);
        qpAmount.setShadow(2, 2, "#000", 2);
        qpAmount.alpha = 0;
        boxUI.push(qpAmount);

        var qpLabel = this._game.add.text((amountX - qpAmount.displayWidth), (boxY + 134), label + " ", qpStyle).setOrigin(1, 1);
        qpLabel.setFill("#4bb3fd");
        qpLabel.setShadow(2, 2, "#000", 2);
        qpLabel.alpha = 0;
        boxUI.push(qpLabel);
      }


      // Fade in
      this._game.tweens.add({
        targets: boxUI,
        alpha: 1,
        ease: "Quad.easeIn",
        duration: 700,
        delay: 500 + (count * 150),
      });

      // Increase camera bounds
      resultCam.setBounds(cameraX, cameraY, cameraWidth, (boxY + 156 - cameraY));
      boxY += 156;
      count++;
    }

  }

  //---------------
  // DESCRIPTION: Starts the next (or first) faction's turn
  //---------------
  nextTurn() {
    // ======================
    //   Faction Index
    // ======================
    var firstTurn = false;
    if (this._factionIndex == -2) { return; }
    if (this._factionIndex == -1) { firstTurn = true; }
    var factionIndex = this._factionIndex + 1;
    this._isTurnTransition = true;
    this._allowTileInfoSide = false;

    // Handle invalid turn index
    if (factionIndex < 0) { factionIndex = 0; }

    // Increment turn num when starting from first faction
    if (factionIndex >= this._factions.length) {
      factionIndex = 0;
      this._turnNum++;
    }

    this._factionIndex = factionIndex;
    this._turnFaction = this._factions[factionIndex];
    this._turnFaction.mana += (this._turnFaction.workshops.length * 50);


    // ======================
    //   Units
    // ======================
    // First turn - set unit passives
    if (firstTurn) {
      for (const unit of this._unitBank) {
        unit.applyPassiveSkills(this);
      }
    }

    // Clear active units list
    this._activeUnits.length = 0;
    this._enemyList.length = 0;
    this._attacker = null;
    this.cancelAll(true, true);
    this.hideTileHover();
    this.hideTileInfo();
    this._playerInfoBox.animateXY(this._playerInfoBox.xPos, -155, 150, "Quad.easeIn");

    // Go through all map units
    var firstUnit;
    for (const unit of this._unitBank) {
      var faction = unit.faction;

      // Current faction's units have tints cleared and are added as active
      if (unit.faction == this._turnFaction) {
        // Only activate non-stunned units
        if (!unit.stunStatus) {
          firstUnit = firstUnit || unit;
          unit.normal();
          if (unit.hasStatus("Presence Concealment")) { unit.alphaFade(); }
          this.addActiveUnit(unit);
        }

        // Handle turn-based counts
        unit.doTurnWork(this, (this._turnNum < 2));
      }

      // Other factions have units tinted
      else {
        unit.darken();
        if (unit.hasStatus("Presence Concealment")) { unit.alphaHide(); }
      }
    }

    // Center camera on first faction unit
    // - Done as a camera pam during timeline
    if (firstUnit) {
      var camX = this.posX(firstUnit.xTile);
      var camY = this.posY(firstUnit.yTile);
    }

    // Put away AI noClick sprite
    this._noClickTint.depth = -200;


    // ======================
    //   Visuals
    // ======================
    // Make the entire screen unclickable
    var tint = this._game.add.sprite(0, 0, "screentint");
    tint.setOrigin(0, 0);
    tint.setScrollFactor(0);
    tint.depth = 100;
    tint.setInteractive( useHandCursor(false) );
    tint.alpha = 0;

    var fadeIn = this._game.add.sprite(512, 313, "shadow-box");
    fadeIn.setOrigin(0.5, 0.5);
    fadeIn.setScrollFactor(0);
    fadeIn.depth = 101;
    fadeIn.alpha = 0;

    var factionColor = this._turnFaction.color || "#fff"
    var titleStyle = { font: "30px Optima", fill: factionColor };
    var factionText = this._game.add.text(512, 300, this._turnFaction, titleStyle).setOrigin(0.5, 0.5);
    factionText.setScrollFactor(0);
    factionText.depth = 102;
    factionText.alpha = 0;

    var subtitleStyle = { font: "16px Optima", fill: "#fff" };
    var turnText = this._game.add.text(512, 330, "Turn " + this._turnNum, subtitleStyle).setOrigin(0.5, 0.5);
    turnText.setScrollFactor(0);
    turnText.depth = 102;
    turnText.alpha = 0;

    // Show turn transition
    defaultCursor();
    var timeline = this._game.tweens.createTimeline();
    timeline.callbacks = { onComplete: { func: () => {
      tint.destroy();
      fadeIn.destroy();
      factionText.destroy();
      turnText.destroy();

      this.beginTurn();
    } } };

    timeline.add( {
      targets: tint,
      alpha: 1,
      ease: "Quad.easeOut",
      duration: 500,
      delay: 350,
      onComplete: () => { if (firstUnit) {
        this._camera.pan(camX, camY, 250, "Linear");
       } }
    } );

    timeline.add( {
      targets: [fadeIn, factionText, turnText],
      alpha: 1,
      ease: "Quad.easeOut",
      duration: 1000,
      delay: 300,
    } );

    timeline.add( {
      targets: [tint, fadeIn, factionText, turnText],
      alpha: 0,
      ease: "Quad.easeIn",
      duration: 700,
      delay: 400,
    } );

    // Allow skipping animation
    this._game.input.on('pointerdown', (pointer) => { if (pointer.rightButtonDown()) { timeline.destroy(); } });

    // Play
    controls.stop();
    timeline.play();
  }

  //---------------
  // DESCRIPTION: Begins the turn after the animation has played
  //---------------
  beginTurn() {
    // Heal any units on ley lines
    for (const unit of this._activeUnits) {
      this.leylineHeal(unit);
    }

    // Handle no active units (ie: remaining units stunned)
    if (this._activeUnits.length == 0) {
      this.nextTurn();
      return;
    }

    // Player turn
    var isPlayerTurn = this._turnFaction.isPlayable;
    if (isPlayerTurn) {
      // Show player info
      this._playerInfoBox.getBoxElement("turnText").setText("Turn " + this._turnNum);
      this._playerInfoBox.animateXY(this._playerInfoBox.xPos, 0, 150, "Quad.easeOut");

      // Show tile info
      this._isTurnTransition = false;
      this.showTileHover();
      this.showTileInfo();

      // Resume control
      controls.start();

      // Prevent tile info from switching sides immediately and messing up
      this._game.time.delayedCall(200, () => { this._allowTileInfoSide = true; });
    }

    // Non-Player turn - run AI
    else {
      // Make the screen non-interactive
      this._noClickTint.depth = 200;
      this._isTurnTransition = true;

      if (this._turnFaction.workshops.length > 0) {
        this._turnFaction.runWorkshops(this, () => { this.nextAIturn(true); });
      }
      else {
        this.nextAIturn(true);
      }

    }
  }

  //---------------
  // DESCRIPTION: Begins an AI turn and moves the turn's units
  // PARAMS:
  //  isFirstUnit (I,OPT) - True if this is the first unit to move in the turn
  //---------------
  nextAIturn(isFirstUnit) {

    // Start with the first unit
    if (this._activeUnits.length > 0) {
      var unit = this._activeUnits[0];

      // Keep consistent delay between AI unit turns
      var delay;
      if (isFirstUnit) {
        delay = 300;
      }
      else {
        // First unit to move
        delay = 500;
      }

      // Start their turn
      this._game.time.delayedCall(delay, () => {

        // Center camera on unit
        var camX = this.posX(unit.xTile);
        var camY = this.posY(unit.yTile);
        this._camera.pan(camX, camY, 250, "Linear");

        this._game.time.delayedCall(250, () => { this._mapAI.startUnitTurn(unit); });
      });
    }
  }

  //---------------
  // DESCRIPTION: Allows placing of player units before the battle
  //---------------
  placeUnits() {
    var allUI = [];
    var visited = [];
    var placeHolder = new Unit(this._game, "Placeholder", null, this._playerFactions[0], null, null, null, null, null, null, moveTypeEnum.Ground);

    // Center camera
    var camX = this.posX(this._unitPlacement[0].x);
    var camY = this.posY(this._unitPlacement[0].y);
    this._camera.pan(camX, camY, 250, "Linear");


    // ==============================
    //   Prompt Text / Mana
    // ==============================
    // Prompt
    var promptStyle = { font: "35px FrizQuadrata", fill: "#fff" };
    var promptText = this._game.add.text(12, 4, "Battle Formation ", promptStyle).setOrigin(0, 0);
    promptText.setShadow(2, 2, "#000", 2);
    promptText.depth = 20;
    promptText.setScrollFactor(0);
    allUI.push(promptText);

    // Mana
    var manaBar = this._game.add.image(8, 38, "QP-bar").setOrigin(0, 0);
    manaBar.depth = 20;
    manaBar.setScrollFactor(0);
    allUI.push(manaBar);

    var manaStyle = { font: "16px FrizQuadrata", fill: "#fff" };
    var manaLabel = this._game.add.text(24, 56, "Mana", manaStyle).setOrigin(0, 0.5);
    manaLabel.setShadow(1, 1, "#000", 1);
    manaLabel.setFill("#4bb3fd");
    manaLabel.depth = 20;
    manaLabel.setScrollFactor(0);
    allUI.push(manaLabel);

    var manaTotal = this._game.add.text(226, 56, " / 1500", manaStyle).setOrigin(1, 0.5);
    manaTotal.setShadow(1, 1, "#000", 1);
    manaTotal.setFill("#c1c1c1");
    manaTotal.depth = 20;
    manaTotal.setScrollFactor(0);
    allUI.push(manaTotal);

    var manaAmount = this._game.add.text((226 - manaTotal.displayWidth), 56, "1500", manaStyle).setOrigin(1, 0.5);
    manaAmount.setShadow(1, 1, "#000", 1);
    manaAmount.depth = 20;
    manaAmount.setScrollFactor(0);
    allUI.push(manaAmount);


    // ==============================
    //   Selection Tiles
    // ==============================
    for (const placeObj of this._unitPlacement) {
      var xTile = placeObj.x;
      var yTile = placeObj.y;
      var distance = placeObj.dist;
      var direction = placeObj.dir;

      // Get range
      var range = [];
      this.checkUnitRange(placeHolder, range, xTile, yTile, distance, 0, null, visited, [direction], true);

      // Show range
      for (var i = 0; i < range.length; i++) {
        var x = range[i][0];
        var y = range[i][1];
        var xPos = this.posX(x);
        var yPos = this.posY(y);

        var sprite = this._game.add.sprite(xPos, yPos, "selection-blue");
        sprite.setOrigin(0, 0);
        sprite.setDisplaySize(this._tileSize, this._tileSize);
        sprite.depth = 2;

        this.setPlacementPointer(sprite, x, y, manaAmount);
        allUI.push(sprite);
      }
    }


    // ==============================
    //   Servant Box
    // ==============================
    // Box
    var boxX = 1022 - 148;
    var boxY = 8;
    var boxWidth = 140;

    var servantBox = this._game.add.image(1022, 0, "box-placement").setOrigin(1, 0);
    servantBox.depth = 20;
    servantBox.setScrollFactor(0);
    allUI.push(servantBox);

    // Title
    var titleShadow = this._game.add.image((boxX + (boxWidth / 2)), boxY, "shadow-placement").setOrigin(0.5, 0);
    titleShadow.depth = 20;
    titleShadow.setScrollFactor(0);
    allUI.push(titleShadow);

    var titleStyle = { font: "20px Optima", fill: "#fff" };
    var title = this._game.add.text((boxX + (boxWidth / 2)), (boxY + 12), "Servants", titleStyle).setOrigin(0.5, 0.5);
    title.setShadow(1, 1, "#000", 1);
    title.depth = 20;
    title.setScrollFactor(0);
    allUI.push(title);

    // Start button
    var startButton = this._game.add.image(1024, 626, "button-start").setOrigin(1, 1);
    startButton.depth = 20;
    startButton.setScrollFactor(0);
    allUI.push(startButton);

    var startStyle = { font: "30px FrizQuadrata", fill: "#fff" };
    var startText = this._game.add.text((1024 - 82), (626 - 24), " Start ", startStyle).setOrigin(0.5, 0.5);
    startText.setShadow(2, 2, "#000", 2);
    startText.depth = 20;
    startText.setScrollFactor(0);
    allUI.push(startText);


    // ==============================
    //   Camera
    // ==============================
    var cameraX = boxX;
    var cameraY = boxY + 24;
    var cameraWidth = 140;
    var cameraHeight = 550;
    var servantCam = this._game.cameras.add(cameraX, cameraY, cameraWidth, cameraHeight);

    var camIgnore = [promptText, manaBar, manaLabel, manaTotal, manaAmount,
                     servantBox, titleShadow, title, startButton, startText];
    camIgnore.push(this._tileInfoBox._baseSprite);
    for (const box of this._tileInfoBox._boxUI) { camIgnore.push(box.sprite); }
    camIgnore.push(this._unitInfoBox._baseSprite);
    for (const box of this._unitInfoBox._boxUI) { camIgnore.push(box.sprite); }
    camIgnore.push(this._playerInfoBox._baseSprite);
    for (const box of this._playerInfoBox._boxUI) { camIgnore.push(box.sprite); }
    servantCam.ignore(camIgnore);

    cameraX -= 3000;
    servantCam.useBounds = true;
    servantCam.setBounds(cameraX, cameraY, cameraWidth, cameraHeight);
    servantCam.centerOn(cameraX, cameraY);

    // Camera controls - mouse wheel
    this._game.input.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
        var mod = 40;
        if (deltaY < 0) { mod = -40; }
        servantCam.setScroll(0, (servantCam.worldView.y + mod))
    });

    // Start interactivity
    this.setPlacementStart(startButton, startText, allUI, servantCam, manaAmount);


    // ==============================
    //   Servants
    // ==============================
    var servantX = cameraX + 6;
    var servantY = cameraY + 10;
    var count = 0;

    for (const servant of loadPlayerServants(this._game, this._playerData, this._playerFactions[0])) {
      var servantUI = [];

      // Token
      var tokenBack = this._game.add.sprite(servantX, servantY, "token-" + servant.rank + "-back");
      tokenBack.setOrigin(0, 0);
      tokenBack.alpha = 0;
      servantUI.push(tokenBack);
      allUI.push(tokenBack);

      var portrait = this._game.add.sprite(servantX, servantY, servant.portrait + "-Token");
      portrait.setOrigin(0, 0);
      portrait.alpha = 0;
      servantUI.push(portrait);
      allUI.push(portrait);

      var tokenBot = this._game.add.sprite(servantX, servantY, "token-" + servant.rank + "-bot");
      tokenBot.setOrigin(0, 0);
      tokenBot.alpha = 0;
      servantUI.push(tokenBot);
      allUI.push(tokenBot);

      var tokenTop = this._game.add.sprite(servantX, servantY, "token-" + servant.rank + "-top");
      tokenTop.setOrigin(0, 0);
      tokenTop.alpha = 0;
      servantUI.push(tokenTop);
      allUI.push(tokenTop);

      var tokenClass = this._game.add.sprite(servantX, servantY, servant.unitClass + "-" + servant.rank + "-Token");
      tokenClass.setOrigin(0.3, 0.3);
      tokenClass.alpha = 0;
      servantUI.push(tokenClass);
      allUI.push(tokenClass);


      // Cost
      var costStyle = { font: "10px FrizQuadrata", fill: "#fff", stroke: "#000", strokeThickness: 3 };
      var costText = this._game.add.text((servantX + 32), (servantY + 63), " Cost: " + servant.cost + " ", costStyle).setOrigin(0.5, 1);
      costText.alpha = 0;
      servantUI.push(costText);
      allUI.push(costText);


      // Interactivity
      this.setPlacementServantPointer(portrait, servantUI, servant, manaAmount);

      // Fade in
      this._game.tweens.add({
        targets: servantUI,
        alpha: 1,
        ease: "Quad.easeIn",
        duration: 700,
        delay: 500 + (count * 100),
      });

      // Increase X offset
      servantX += 70;
      count++;

      // Increase camera bounds if at the end of a row
      if ((count % 2) == 0) {
        servantCam.setBounds(cameraX, cameraY, cameraWidth, (servantY + 72 - cameraY));
        servantX = cameraX + 6;
        servantY += 72;
      }
    }

    // Extra space at the bottom
    servantCam.setBounds(cameraX, cameraY, cameraWidth, (servantY + 72 - cameraY));
  }
  // ==============================
  //   Start Button
  // ==============================
  setPlacementStart(startButton, startText, allUI, servantCam, manaAmount) {
    startButton.setInteractive();

    startButton.on('pointerdown', (pointer) => { if (!pointer.rightButtonDown()) {
      var readyToStart = false;

      // Make sure there's at least one playable unit
      for (const bankUnit of this._unitBank) {
        var bankFaction = bankUnit.faction;
        if (bankFaction == this._playerFactions[0]) {
          readyToStart = true;
          break;
        }
      }

      if (!readyToStart) { return; }
      this._sounds.claim.play();
      this._playerFactions[0].mana = parseInt(manaAmount.text);

      // Destroy UI and start game
      this._game.tweens.add({
        targets: allUI,
        alpha: 0,
        ease: "Linear",
        duration: 1000,
        onComplete: () => {
          for (const sprite of allUI) { sprite.destroy(); }
          this._game.cameras.remove(servantCam);
          this.nextTurn();
        }
      });
    } });

    startButton.on('pointerover', (pointer) => { startButton.tint = 0xbbbbbb; startText.tint = 0xbbbbbb; } );
    startButton.on('pointerout',  (pointer) => { startButton.tint = 0xffffff; startText.tint = 0xffffff; } );
  }
  // ==============================
  //   Selection Tile
  // ==============================
  setPlacementPointer(sprite, xTile, yTile, manaAmount) {
    sprite.setInteractive();

    sprite.on('pointerdown', (pointer) => { if (!pointer.rightButtonDown()) {

      this._sounds.selectMenu.play();

      // No Unit selected
      if (!this._placementUnit) {
        if (!this._placementTile) {
          // Select this tile
          this._placementTile = { select: sprite, x: xTile, y: yTile };

          sprite.tint = 0x888888;
          sprite.on('pointerover', (pointer) => { sprite.tint = 0x888888; } );
          sprite.on('pointerout',  (pointer) => { sprite.tint = 0x888888; } );
        }
        else {
          // Deselect other tile
          var otherSprite = this._placementTile.select;
          otherSprite.tint = 0xffffff;
          otherSprite.on('pointerover', (pointer) => { otherSprite.tint = 0xbbbbbb; } );
          otherSprite.on('pointerout',  (pointer) => { otherSprite.tint = 0xffffff; } );

          // Don't reselect same tile
          if (this._placementTile.select == sprite) {
            this._placementTile = null;
            return;
          }

          // Select this tile
          this._placementTile = { select: sprite, x: xTile, y: yTile };

          sprite.tint = 0x888888;
          sprite.on('pointerover', (pointer) => { sprite.tint = 0x888888; } );
          sprite.on('pointerout',  (pointer) => { sprite.tint = 0x888888; } );
        }
      }

      // Unit selected
      else {

        // Deselect other tile
        if (this._placementTile) {
          var otherSprite = this._placementTile.select;
          this._placementTile = null;

          otherSprite.tint = 0xffffff;
          otherSprite.on('pointerover', (pointer) => { otherSprite.tint = 0xbbbbbb; } );
          otherSprite.on('pointerout',  (pointer) => { otherSprite.tint = 0xffffff; } );
        }

        // Fade out token
        var servant = this._placementUnit.unit;
        var otherPortrait = this._placementUnit.sprite;
        var otherServantUI = this._placementUnit.spriteUI;
        this._placementUnit = null;

        for (const sprite of otherServantUI) { sprite.tint = 0xffffff; sprite.alpha = 0.4; }
        otherPortrait.on('pointerover', (pointer) => { for (const sprite of otherServantUI) { sprite.tint = 0xbbbbbb; sprite.alpha = 0.9; } } );
        otherPortrait.on('pointerout',  (pointer) => { for (const sprite of otherServantUI) { sprite.tint = 0xffffff; sprite.alpha = 0.4; } } );

        // Spawn unit
        this.spawnUnit(servant, xTile, yTile);

        var amount = parseInt(manaAmount.text);
        manaAmount.text = (amount - servant.cost);
      }

    } });

    sprite.on('pointerover', (pointer) => { sprite.tint = 0xbbbbbb; } );
    sprite.on('pointerout',  (pointer) => { sprite.tint = 0xffffff; } );
  }
  // ==============================
  //   Selection Servant
  // ==============================
  setPlacementServantPointer(portrait, servantUI, servant, manaAmount) {
    portrait.setInteractive();

    portrait.on('pointerdown', (pointer) => { if (!pointer.rightButtonDown()) {

      // Already deployed - remove unit from placement
      if (portrait.alpha < 1) {
        this._sounds.cancel.play();

        // Fix tiles
        for (const sprite of servantUI) { sprite.tint = 0xffffff; sprite.alpha = 1; }
        portrait.on('pointerover', (pointer) => { for (const sprite of servantUI) { sprite.tint = 0xbbbbbb; sprite.alpha = 1; } } );
        portrait.on('pointerout',  (pointer) => { for (const sprite of servantUI) { sprite.tint = 0xffffff; sprite.alpha = 1; } } );

        // Remove unit
        this.killUnit(servant, true);

        var amount = parseInt(manaAmount.text);
        manaAmount.text = (amount + servant.cost);

        return;
      }

      // Cost too high
      var amount = parseInt(manaAmount.text);
      if (amount - servant.cost < 0) {
        this._sounds.click.play();
        return;
      }


      this._sounds.selectMenu.play();

      // No Tile selected
      if (!this._placementTile) {
        if (!this._placementUnit) {
          // Select this unit
          this._placementUnit = { spriteUI: servantUI, sprite: portrait, unit: servant };

          for (const sprite of servantUI) { sprite.tint = 0x888888; }
          portrait.on('pointerover', (pointer) => { for (const sprite of servantUI) { sprite.tint = 0x888888; } } );
          portrait.on('pointerout',  (pointer) => { for (const sprite of servantUI) { sprite.tint = 0x888888; } } );
        }
        else {
          // Deselect other unit
          var otherPortrait = this._placementUnit.sprite;
          var otherServantUI = this._placementUnit.spriteUI;
          for (const sprite of otherServantUI) { sprite.tint = 0xffffff; }
          otherPortrait.on('pointerover', (pointer) => { for (const sprite of otherServantUI) { sprite.tint = 0xbbbbbb; } } );
          otherPortrait.on('pointerout',  (pointer) => { for (const sprite of otherServantUI) { sprite.tint = 0xffffff; } } );

          // Don't reselect same unit
          if (this._placementUnit.unit == servant) {
            this._placementUnit = null;
            return;
          }

          // Select this unit
          this._placementUnit = { spriteUI: servantUI, sprite: portrait, unit: servant };

          for (const sprite of servantUI) { sprite.tint = 0x888888; }
          portrait.on('pointerover', (pointer) => { for (const sprite of servantUI) { sprite.tint = 0x888888; } } );
          portrait.on('pointerout',  (pointer) => { for (const sprite of servantUI) { sprite.tint = 0x888888; } } );
        }
      }

      // Tile selected
      else {

        // Deselect other unit
        if (this._placementUnit) {
          var otherPortrait = this._placementUnit.sprite;
          var otherServantUI = this._placementUnit.spriteUI;
          this._placementUnit = null;

          for (const sprite of otherServantUI) { sprite.tint = 0xffffff; }
          otherPortrait.on('pointerover', (pointer) => { for (const sprite of otherServantUI) { sprite.tint = 0xbbbbbb; } } );
          otherPortrait.on('pointerout',  (pointer) => { for (const sprite of otherServantUI) { sprite.tint = 0xffffff; } } );
        }

        // Deselect tile
        var xTile = this._placementTile.x;
        var yTile = this._placementTile.y;
        var tileSprite = this._placementTile.select;
        this._placementTile = null;

        tileSprite.tint = 0xffffff;
        tileSprite.on('pointerover', (pointer) => { tileSprite.tint = 0xffffff; } );
        tileSprite.on('pointerout',  (pointer) => { tileSprite.tint = 0xffffff; } );

        // Fade out token
        for (const sprite of servantUI) { sprite.tint = 0xffffff; sprite.alpha = 0.4; }
        portrait.on('pointerover', (pointer) => { for (const sprite of servantUI) { sprite.tint = 0xbbbbbb; sprite.alpha = 0.9; } } );
        portrait.on('pointerout',  (pointer) => { for (const sprite of servantUI) { sprite.tint = 0xffffff; sprite.alpha = 0.4; } } );

        // Spawn unit
        this.spawnUnit(servant, xTile, yTile);

        manaAmount.text = (amount - servant.cost);
      }

    } });

    portrait.on('pointerover', (pointer) => { for (const sprite of servantUI) { sprite.tint = 0xbbbbbb; } } );
    portrait.on('pointerout',  (pointer) => { for (const sprite of servantUI) { sprite.tint = 0xffffff; } } );
  }


  // ====================================================================================
  //                                TILES
  // ====================================================================================

  // Tile size
  get tileSize() { return this._tileSize; }
  set tileSize(x) { this._tileSize = x; }

  // Offsets
  get offsetX() { return this._offsetX; }
  get offsetY() { return this._offsetY; }

  // 2D Array of map tiles
  get tiles() { return this._tiles; }
  set tiles(tiles) {
    // Create separate references of each tile so they don't share unit info
    for (var i = 0; i < tiles.length; i++) {
      this._tiles[i] = [];
      for (var j = 0; j < tiles[i].length; j++) {
        this._tiles[i][j] = Object.create(tiles[i][j]);
      }
    }

    // Set corner/edge pieces as appropriate
    for (var y = 0; y < this._tiles.length; y++) {
      for (var x = 0; x < this._tiles[y].length; x++) {

        // Setup
        var curTile = this.getTile(x, y);
        var current = this.getTileImageBase(x, y);
        var direction = "";
        var sameCount = 0;

        if (curTile.bigImage) { continue; } // Skip tiles that have been replaced with a bigger image
        if (current != curTile.image) { continue; } // Skip tiles that are already different from the base

        // ==============================
        //   Grass
        // ==============================
        if (current == "grass") {
          curTile.image = getGrassTile();
          continue;
        }

        // ==============================
        //   Forest / Mountain
        // ==============================
        if ((current == "forest") || (current == "mountain")) {
          var tile2, tile3, tile4;

          // East
          var tile2T = this.getTile((x + 1), y);
          if (tile2T) { tile2 = tile2T.image; }
          var tile3T = this.getTile((x + 2), y);
          if (tile3T) { tile3 = tile3T.image; }
          var tile4T = this.getTile((x + 3), y);
          if (tile4T) { tile4 = tile4T.image; }


          sameCount = 1;
          if (tile2T && !tile2T.bigImage && this.sameTileImage(current, tile2, true)) { sameCount++; }
          if ((sameCount > 1) && (tile3T && !tile3T.bigImage && this.sameTileImage(current, tile3, true))) { sameCount++; }
          if ((current == "mountain") && (sameCount > 2) && (tile4T && !tile4T.bigImage && this.sameTileImage(current, tile4, true))) { sameCount++; }

          if (sameCount > 1) {
            if (current == "forest") { curTile.image = getForestTile(sameCount, "h"); }
            else { curTile.image = "mountain-" + sameCount + "-h"; }

            this.getTile((x + 1), y).bigImage = true;
            if (sameCount > 2) { this.getTile((x + 2), y).bigImage = true; }
            if (sameCount > 3) { this.getTile((x + 3), y).bigImage = true; }
            continue;
          }

          tile2 = null;
          tile3 = null;
          tile4 = null;

          // Check to the south
          tile2T = this.getTile(x, (y + 1));
          if (tile2T) { tile2 = tile2T.image; }
          tile3T = this.getTile(x, (y + 2));
          if (tile3T) { tile3 = tile3T.image; }
          tile4T = this.getTile(x, (y + 3));
          if (tile4T) { tile4 = tile4T.image; }


          sameCount = 1;
          if (tile2T && !tile2T.bigImage && this.sameTileImage(current, tile2, true)) { sameCount++; }
          if ((sameCount > 1) && (tile3T && !tile3T.bigImage && this.sameTileImage(current, tile3, true))) { sameCount++; }
          if ((current == "mountain") && (sameCount > 2) && (tile4T && !tile4T.bigImage && this.sameTileImage(current, tile4, true))) { sameCount++; }

          if (x == 15 && y == 9) {
            console.log(sameCount)
          }

          if (sameCount > 1) {
            if (current == "forest") {
              this.getTile(x, (y + sameCount - 1)).image = getForestTile(sameCount, "v");

              this.getTile(x, y).bigImage = true;
              this.getTile(x, (y + 1)).bigImage = true;
              if (sameCount > 2) { this.getTile(x, (y + 2)).bigImage = true; }
              if (sameCount > 3) { this.getTile(x, (y + 3)).bigImage = true; }
              this.getTile(x, (y + sameCount - 1)).bigImage = false;
            }
            else {
              curTile.image = "mountain-" + sameCount + "-v";

              this.getTile(x, (y + 1)).bigImage = true;
              if (sameCount > 2) { this.getTile(x, (y + 2)).bigImage = true; }
              if (sameCount > 3) { this.getTile(x, (y + 3)).bigImage = true; }
              continue;
            }
          }

          // Only one tile
          if (current == "forest") { curTile.image = getForestTile(); }
          else { curTile.image = "mountain-1"; }
          continue;
        }

        // ==============================
        //   Directional
        // ==============================
        // Check all other directions
        var north = this.getTileImageBase(x, (y - 1));
        var south = this.getTileImageBase(x, (y + 1));
        var west  = this.getTileImageBase((x - 1), y);
        var east  = this.getTileImageBase((x + 1), y);

        // Add up how many directions match the current tile
        // - Count bridges as same for direction matching
        if (this.sameTileImage(current, north)) { sameCount++; direction += "n"; }
        if ((current == "path") && (this.sameTileImage("bridge", this.getTileImageBase(x, (y - 1), true), true))) { sameCount++; direction += "n"; }
        if ((current == "stone") && (this.sameTileImage("wall", this.getTileImageBase(x, (y - 1)), true))) { sameCount++; direction += "n"; }

        if (this.sameTileImage(current, south)) { sameCount++; direction += "s"; }
        if ((current == "path") && (this.sameTileImage("bridge", this.getTileImageBase(x, (y + 1), true), true))) { sameCount++; direction += "s"; }
        if ((current == "stone") && (this.sameTileImage("wall", this.getTileImageBase(x, (y + 1)), true))) { sameCount++; direction += "s"; }

        if (this.sameTileImage(current, west))  { sameCount++; direction += "w"; }
        if ((current == "path") && (this.sameTileImage("bridge", this.getTileImageBase((x - 1), y, true), true))) { sameCount++; direction += "w"; }
        if ((current == "stone") && (this.sameTileImage("wall", this.getTileImageBase((x - 1), y), true))) { sameCount++; direction += "w"; }

        if (this.sameTileImage(current, east))  { sameCount++; direction += "e"; }
        if ((current == "path") && (this.sameTileImage("bridge", this.getTileImageBase((x + 1), y, true), true))) { sameCount++; direction += "e"; }
        if ((current == "stone") && (this.sameTileImage("wall", this.getTileImageBase((x + 1), y), true))) { sameCount++; direction += "e"; }

        // Set the specific tile
        curTile.image = current + "-" + sameCount + "-" + direction;  // Format:  image-#-nswe

        // Get a random type of horizontal wall tile
        if (curTile.image == "wall-2-we") { curTile.image = getWallTileHorizontal(curTile.image);  }

        // Get a random type of stone stile
        if (curTile.image == "stone-4-nswe") { curTile.image = getStoneTile();  }

        // Additional handling for ocean and river...
        if ((current == "ocean") || (current == "river")) {
          // Take into account a corner piece of land in the middle
          if ((sameCount == 2) && (!this.cornerTileImageMatches(current, direction, x, y))) {
            curTile.image += "-c";
          }
        }

        // ==============================
        //   Bridges
        // ==============================
        if (curTile.overImage == "bridge") {
          // Check all other directions
          var north = this.getTileImageBase(x, (y - 1), true);
          var south = this.getTileImageBase(x, (y + 1), true);
          var west  = this.getTileImageBase((x - 1), y, true);
          var east  = this.getTileImageBase((x + 1), y, true);

          // Add up how many directions match the current tile
          sameCount = 0;
          direction = "";
          if (this.sameTileImage("bridge", north, true)) { sameCount++; direction += "n"; }
          if (this.sameTileImage("bridge", south, true)) { sameCount++; direction += "s"; }
          if (this.sameTileImage("bridge", west,  true)) { sameCount++; direction += "w"; }
          if (this.sameTileImage("bridge", east,  true)) { sameCount++; direction += "e"; }

          // If no matches, find out which type to use
          if (sameCount == 0) {
            if ((this.getTileImageBase((x + 1), y) != "ocean") &&
                (this.getTileImageBase((x - 1), y) != "ocean") &&
                (this.getTileImageBase((x + 1), y) != "river") &&
                (this.getTileImageBase((x - 1), y) != "river") ) {
              curTile.overImage = "bridge-0-h";
            }
            else { curTile.overImage = "bridge-0-v"; }
          }
          else {
            curTile.overImage = "bridge-" + sameCount + "-" + direction;  // Format:  image-#-nswe
          }

          continue;
        }

      } // end x loop
    } // end y loop
  }

  //---------------
  // DESCRIPTION: Returns the tile image at the specified location
  // PARAMS:
  //  x (I,REQ) - Xth tile
  //  y (I,REQ) - Yth tile
  //  overImage (I,OPT) - If true, check the overImage instead
  // RETURNS: Image of the tile at the specified location
  //---------------
  getTileImage(x, y, overImage) {
    var tile = this.getTile(x, y);
    if (!tile) { return null; }

    if (overImage) { return tile.overImage; }
    return tile.image;
  }
  //---------------
  // DESCRIPTION: Returns base of the tile image at the specified location
  // PARAMS:
  //  x (I,REQ) - Xth tile
  //  y (I,REQ) - Yth tile
  //  overImage (I,OPT) - If true, check the overImage instead
  // RETURNS: Image of the tile at the specified location
  //---------------
  getTileImageBase(x, y, overImage) {
    var tile = this.getTile(x, y);
    if (!tile) { return null; }

    if (overImage) { return this.getImageBase(tile.overImage); }
    return this.getImageBase(tile.image);
  }
  //---------------
  // DESCRIPTION: Returns base of the tile image
  // PARAMS:
  //  image (I,REQ) - Image name to get the base of
  // RETURNS: Base of the given image name
  //---------------
  getImageBase(image) {
    if (!image) { return null; }

    var index = image.indexOf("-");
    if (index == -1) { return image; }
    return image.substr(0, index);
  }

  //---------------
  // DESCRIPTION: Returns whether the two given image tiles count as the same
  // PARAMS:
  //  current (I,REQ) - Current tile to compare with
  //  target  (I,REQ) - Other tile to compare to
  //  noCountNulls (I,OPT) - If true, will count out of bounds as false
  // RETURNS: True if the images are the same; otherwise false
  //---------------
  sameTileImage(current, target, noCountNulls) {
    if (!target) {
      if (noCountNulls) { return false; }
      return true;
    }
    return (current == target);
  }

  //---------------
  // DESCRIPTION: Returns whether a corner tile matches the current tile
  // PARAMS:
  //  x (I,REQ) - Xth tile
  //  y (I,REQ) - Yth tile
  // RETURNS: True if the images are the same; otherwise false
  //---------------
  cornerTileImageMatches(current, direction, x, y) {
    if (direction == "ne") { x++; y--; }
    if (direction == "nw") { x--; y--; }
    if (direction == "se") { x++; y++; }
    if (direction == "sw") { x--; y++; }

    var corner = this.getTileImageBase(x, y);
    return this.sameTileImage(current, corner);
  }

  //---------------
  // DESCRIPTION: Returns tile at the specified location
  // PARAMS:
  //  x (I,REQ) - Xth tile
  //  y (I,REQ) - Yth tile
  // RETURNS: Tile at the specified location
  //---------------
  getTile(x, y) {
    if ((y < 0) || (x < 0)) { return null; }
    if (y >= this._tiles.length) { return null; }
    if (x >= this._tiles[0].length) { return null; }

    var tile = this._tiles[y][x];
    tile.tileX = this.posX(x);
    tile.tileY = this.posY(y);

    // This is backwards because x is horizontal, but the array starts vertically
    return tile;
  }

  //---------------
  // DESCRIPTION: Draws the map tiles
  //---------------
  drawTiles() {
    // First display base tiles
    for (var y = 0; y < this._tiles.length; y++) {
      for (var x = 0; x < this._tiles[y].length; x++) {
        var xPos = this._offsetX + (x * this._tileSize);
        var yPos = this._offsetY + (y * this._tileSize);
        var image = this.getTile(x, y).image;
        var baseImage = this.getTile(x, y).baseImage;

        if (image == "ocean-4-nswe") { continue; }  // No base tile needed for full tiles

        // Add the base tile for
        var tileImage;
        if (baseImage) { tileImage = baseImage; }
        else if (this._baseTile == "grass") { tileImage = getGrassTile(); }
        else { tileImage = this._baseTile; }
        this._game.add.image(xPos, yPos, tileImage).setOrigin(0, 0);
      }
    } // end tile loop

    // Display non-base tiles
    for (var y = 0; y < this._tiles.length; y++) {
      for (var x = 0; x < this._tiles[y].length; x++) {
        var xPos = this.posX(x);
        var yPos = this.posY(y);
        var image = this.getTile(x, y).image;
        var baseImage = this.getImageBase(image);
        var overImage = this.getTile(x, y).overImage;

        // Don't display base tiles again
        if (baseImage == this._baseTile) { continue; }

        // Skip tiles replaced by a larger tile image
        if (this.getTile(x, y).bigImage) { continue; }

        // Handle special tiles that overlap others
        // - Forest tiles that aren't vertical need to be bumped up some
        if (baseImage == "forest") {
          yPos = this._offsetY + ((y + 1) * this._tileSize);
          var forestImage = this._game.add.image(xPos, yPos, image).setOrigin(0, 1);
          forestImage.depth = 1;
          continue;
        }

        // Structures
        if (image.indexOf("-struct") != -1) {
          // Display the structure in the middle-bottom
          xPos += (this._tileSize / 2)
          yPos = this._offsetY + ((y + 1) * this._tileSize);
          var structImage = this._game.add.image(xPos, yPos, image).setOrigin(0.5, 1);
          structImage.depth = 1.5;

          var tile = this.getTile(x, y);
          tile.tileSprite = structImage;
          tile.tileX = this.posX(x);
          tile.tileY = this.posY(y);

          // Workshops
          if (this.isWorkshop(tile)) {
            var faction = tile.faction;
            if (faction) {
              faction.addWorkshop(tile);
            }
          }

          continue;
        }

        // Walls near Stone
        if (baseImage == "wall") {
          this.addStoneUnder(x, y);
        }

        // Add the tile sprite
        var tileSprite = this._game.add.image(xPos, yPos, image).setOrigin(0, 0);
        if (baseImage == "wall") { tileSprite.depth = 0.5; }

        // Add overImages like bridges
        if (overImage) {
          this._game.add.image(xPos, yPos, overImage).setOrigin(0, 0);
        }
      } // end tile loop
    } // end tile loop
  }

  //---------------
  // DESCRIPTION: Adds stone tiles underneat wall tiles when appropriate
  //---------------
  addStoneUnder(x, y) {
    var added = false;

    // North
    if (this.getTileImageBase((x), (y - 1)) == "stone") {
      if (this.getTileImage((x), (y - 1)).split("-").length <= 2) {
        this._game.add.image((this.posX(x)), (this.posY(y) - 32), "stone-0").setOrigin(0, 0);
        added = true;
      }
    }
    // South
    if (this.getTileImageBase((x), (y + 1)) == "stone") {
      if (this.getTileImage((x), (y + 1)).split("-").length <= 2) {
        this._game.add.image((this.posX(x)), (this.posY(y) + 32), "stone-0").setOrigin(0, 0);
        added = true;
      }
    }

    // West
    if (this.getTileImageBase((x - 1), (y)) == "stone") {
      if (this.getTileImage((x - 1), (y)).split("-").length <= 2) {
        this._game.add.image((this.posX(x) - 32), (this.posY(y)), "stone-0").setOrigin(0, 0);
        added = true;
      }
    }
    // East
    if (this.getTileImageBase((x + 1), (y)) == "stone") {
      if (this.getTileImage((x + 1), (y)).split("-").length <= 2) {
        this._game.add.image((this.posX(x) + 32), (this.posY(y)), "stone-0").setOrigin(0, 0);
        added = true;
      }
    }

    // Only add corners if no direct attachment
    if (added) { return; }

    // North West
    if (this.getTileImageBase((x - 1), (y - 1)) == "stone") {
      this._game.add.image((this.posX(x) - 32), (this.posY(y) - 32), "stone-0").setOrigin(0, 0);
    }
    // North East
    if (this.getTileImageBase((x + 1), (y - 1)) == "stone") {
      this._game.add.image((this.posX(x) + 32), (this.posY(y) - 32), "stone-0").setOrigin(0, 0);
    }

    // South West
    if (this.getTileImageBase((x - 1), (y + 1)) == "stone") {
      this._game.add.image((this.posX(x) - 32), (this.posY(y) + 32), "stone-0").setOrigin(0, 0);
    }
    // South East
    if (this.getTileImageBase((x + 1), (y + 1)) == "stone") {
      this._game.add.image((this.posX(x) + 32), (this.posY(y) + 32), "stone-0").setOrigin(0, 0);
    }
  }

  //---------------
  // DESCRIPTION: Creates and initially hides the tile info
  //---------------
  createTileInfo() {
    // ==============================
    //   Hover
    // ==============================
    this._game.input.setPollAlways();   // Get the position even if only the camera moves
    this._tileHover = this._game.add.image(0, 0, "selection-cursor").setOrigin(0.5, 0.5);
    this.hideTileHover();


    // ==============================
    //   Tile Info
    // ==============================
    this._tileInfoBox = new InfoBox(this._game, -80, 489, "tile-info", -5, false);

    // Tile image
    this._tileInfoBox.addImageToBox(this.getImageBase("grass-0"), "tileImage", 7, 8, 0, 0);

    // Defense
    var style = { font: "13px Optima", fill: "#fff", fontStyle: "bold" };
    var text = this._tileInfoBox.addTextToBox("DEF: 1", style, "def", 39, 92, 0.5, 0.5, 1);

    // Other
    text = this._tileInfoBox.addTextToBox("", style, "otherText", 39, 112, 0.5, 0.5, 1);

    // ==============================
    //   Unit Info
    // ==============================
    this._unitInfoBox = new InfoBox(this._game, 75, 486, "shadow-unit-l", -5, false);
    var factionColor = "#4cc3ff";

    // Portrait
    this._unitInfoBox.addImageToBox("Astolfo-Portrait", "portrait", 0, 11, 0, 0);

    // Name and Faction info
    //  * A space is added after the unit name to avoid the end of the text shadow being cut off
    var nameStyle = { font: "20px FrizQuadrata", fill: factionColor, fontStyle: "bold" };
    text = this._unitInfoBox.addTextToBox("Astolfo" + " ", nameStyle, "name", 135, 32, 0, 1, 1);

    var factionStyle = { font: "13px Optima", fill: factionColor, fontStyle: "bold" };
    var xPos = text.displayWidth + 135;
    this._unitInfoBox.addTextToBox("(Ally)", factionStyle, "faction", xPos, 30, 0, 1, 1);

    // Class
    this._unitInfoBox.addImageToBox("Rider-Silver-Token", "classToken", 116, 29, 0, 0);

    var classStyle = { font: "13px Optima", fill: rankToColor(rankEnum.Silver), fontStyle: "bold" };
    var unitClass = this._unitInfoBox.addTextToBox("Rider", classStyle, "rankClass", 141, 34, 0, 0, 1);

    // HP
    var xLabel = 135;
    var xValue = 180;
    var labelStyle = { font: "13px Optima", fill: "#c1c1c1", fontStyle: "bold" };
    this._unitInfoBox.addTextToBox("HP", labelStyle, "labelHP", xLabel, 60, 0, 0, 1);

    var infoStyle = { font: "13px Optima", fill: "#fff", fontStyle: "bold" };
    this._unitInfoBox.addTextToBox("100 / 100", infoStyle, "valueHP", xValue, 60, 0, 0, 1);

    // Skills
    this._unitInfoBox.addTextToBox("Skills", labelStyle, "labelSkills", xLabel, 80, 0, 0, 1);

    this._unitInfoBox.addImageToBox("skill-Stun", "skill1", xValue, 75, 0, 0, 24);
    this._unitInfoBox.addTextToBox("0", infoStyle, "skill1Text", (xValue + 12), 87, 0.5, 0.5, 1);

    this._unitInfoBox.addImageToBox("skill-NP Charge", "skill2", (xValue + 28), 75, 0, 0, 24);
    this._unitInfoBox.addTextToBox("0", infoStyle, "skill2Text", (xValue + 40), 87, 0.5, 0.5, 1);

    // NP Charge
    var npX = 141 + 65;
    var npY = 34 + 7;

    this._unitInfoBox.addImageToBox("NP-text", "NPtext", (npX + 12), npY, 0, 0.5, 21, 12);

    npX += 21;
    npX -= 1;
    for (var i = 1; i < 6; i++) {
      this._unitInfoBox.addImageToBox("NP-bar-empty", "NPbar" + i, (npX + (10 * i)), npY, 0, 0.5, 16, 13);
    }


    // Status effects
    this._unitInfoBox.addImageToBox("status-None", "status1", 24, 12, 0.5, 0.5);
    this._unitInfoBox.addImageToBox("status-None", "status2", (24 + (24 * 1)), 12, 0.5, 0.5);
    this._unitInfoBox.addImageToBox("status-None", "status3", (24 + (24 * 2)), 12, 0.5, 0.5);
    this._unitInfoBox.addImageToBox("status-None", "status4", (24 + (24 * 3)), 12, 0.5, 0.5);
    this._unitInfoBox.addImageToBox("status-None", "status5", (24 + (24 * 4)), 12, 0.5, 0.5);

    // Range
    this._unitInfoBox.addTextToBox("Range", labelStyle, "labelRange", xLabel, 100, 0, 0, 1);
    this._unitInfoBox.addTextToBox("1", infoStyle, "valueRange", xValue, 100, 0, 0, 1);

    // Movement
    this._unitInfoBox.addTextToBox("Move", labelStyle, "labelMove", xLabel, 120, 0, 0, 1);
    this._unitInfoBox.addTextToBox("5", infoStyle, "valueMove", xValue, 120, 0, 0, 1);
    //this._unitInfoBox.addImageToBox("move-ground", "moveIcon", (xValue + 10), 118, 0, 0);
  }

  //---------------
  // DESCRIPTION: Creates and initially hides the player info
  //---------------
  createPlayerInfo() {
    this._playerInfoBox = new InfoBox(this._game, 0, -155, "menu-master", 20, false);

    // Player image
    this._playerInfoBox.addImageToBox(this._playerData.image, "player", 8, 6);

    // Turn count
    var style = { font: "16px FrizQuadrata", fill: "#fff" };
    var text = this._playerInfoBox.addTextToBox("Turn " + this._turnNum, style, "turnText", 2, 2, 0, 0);
    text.setStroke("#000", 3);
  }

  //---------------
  // DESCRIPTION: Sets the selection cursor to the tile at the given position
  //               and updates the tile / unit info
  // PARAMS:
  //  pointer (I, REQ) - Pointer object
  //---------------
  setTileHover(pointer) {
    if (this._isTurnTransition) { return; }

    // Do nothing if no tile hover created yet
    if (!this._tileHover) { return; }

    // If the pointer is near the info area, have it switch sides
    if (this._tileInfoSide == "left") {
      if (((pointer.x < 380) && (pointer.y > 460))
       || ((pointer.x < 220) && (pointer.y < 160 ))) { this.tileInfoRight(); }
    }
    else {
      if (((pointer.x > 640) && (pointer.y > 460))
       || ((pointer.x > 804) && (pointer.y < 160 ))) { this.tileInfoLeft(); }
    }

    // No updates if tile hover is paused at the current position
    if (this._pauseTileHover) { return; }

    // Do nothing if tile position hasn't changed
    var x = pointer.worldX;
    var y = pointer.worldY;
    if ((this._tileHover.x == x) && (this._tileHover.y == y)) {
      return;
    }

    // Get the tile
    var tileX = this.tileX(x);
    var tileY = this.tileY(y);

    // Move to center of new tile
    this._tileHover.x = this.posX(tileX) + (this._tileSize / 2);
    this._tileHover.y = this.posY(tileY) + (this._tileSize / 2);


    // Show tile information
    var tile = this.getTile(tileX, tileY);
    this.updateTileInfo(tile);
  }

  //---------------
  // DESCRIPTION: Hides the tile hover sprite
  //---------------
  hideTileHover() {
    if (this._tileHover) {
      this._pauseTileHover = true;
      this._tileHover.depth = -1;
    }
  }

  //---------------
  // DESCRIPTION: Shows the tile hover sprite again
  //---------------
  showTileHover() {
    if (this._tileHover) {
      this._pauseTileHover = false;
      this._tileHover.depth = 20;
    }
  }

  //---------------
  // DESCRIPTION: Shows tile and unit information at the bottom of the screen
  // PARAMS:
  //  tile (I,REQ) - Tile to show info for
  //---------------
  showTileInfo() {
    // Show tile info
    this._tileInfoBox.setDepth(50);
    if (this._tileInfoSide == "left") { this._tileInfoBox.animateXY(0, this._tileInfoBox.yPos, 150, "Quad.easeOut"); }
    else { this._tileInfoBox.animateXY(944, this._tileInfoBox.yPos, 150, "Quad.easeOut"); }

    // Unit info is only shown on update if a unit is selected
  }

  //---------------
  // DESCRIPTION: Shows tile and unit information at the bottom of the screen
  // PARAMS:
  //  tile (I,REQ) - Tile to show info for
  //---------------
  hideTileInfo() {
    // Hide tile info
    if (this._tileInfoSide == "left") { this._tileInfoBox.animateXY(-80, this._tileInfoBox.yPos, 150, "Quad.easeIn"); }
    else { this._tileInfoBox.animateXY(1104, this._tileInfoBox.yPos, 150, "Quad.easeIn"); }

    // Hide unit info
    if (this._unitInfoBox.depth > 0) { this._unitInfoBox.setDepth(-5); }
  }

  //---------------
  // DESCRIPTION: Moves the tile info to the left
  //---------------
  tileInfoLeft() {
    if (!this._allowTileInfoSide) { return; }
    if (!this._tileInfoBox || !this._unitInfoBox || !this._playerInfoBox) { return; }
    this._tileInfoSide = "left";

    // Tile info
    this._tileInfoBox.moveXY(0, this._tileInfoBox.yPos);

    // Unit info
    this._unitInfoBox.moveXY(75, this._unitInfoBox.yPos);

    // Player info
    this._playerInfoBox.moveXY(0, this._playerInfoBox.yPos);
    this._playerInfoBox._baseSprite.flipX = false;

    this._playerInfoBox.getBoxElement("player").x = this._playerInfoBox._baseSprite.x + 8;
    this._playerInfoBox.getBoxElement("turnText").x = this._playerInfoBox._baseSprite.x + 2;
    this._playerInfoBox.getBoxElement("turnText").setOrigin(0, 0);
  }

  //---------------
  // DESCRIPTION: Moves the tile info to the right
  //---------------
  tileInfoRight() {
    if (!this._allowTileInfoSide) { return; }
    if (!this._tileInfoBox || !this._unitInfoBox || !this._playerInfoBox) { return; }
    this._tileInfoSide = "right";

    // Tile info
    this._tileInfoBox.moveXY(946, this._tileInfoBox.yPos);

    // Unit info
    this._unitInfoBox.moveXY(649, this._unitInfoBox.yPos);

    // Player info
    this._playerInfoBox.moveXY(806, this._playerInfoBox.yPos);
    this._playerInfoBox._baseSprite.flipX = true;

    this._playerInfoBox.getBoxElement("player").x = this._playerInfoBox._baseSprite.x + 62;
    this._playerInfoBox.getBoxElement("turnText").x = 1022;
    this._playerInfoBox.getBoxElement("turnText").setOrigin(1, 0);
  }

  //---------------
  // DESCRIPTION: Updates tile info with the current tile
  // PARAMS:
  //  tile (I,REQ) - Tile to show info for
  //---------------
  updateTileInfo(tile) {
    if (!tile) { return; }

    // Tile info
    if (this._tileInfoBox) {
      // Image
      if (tile.overImage) {
        this._tileInfoBox.getBoxElement("tileImage").setTexture(this.getImageBase(tile.overImage));
      }
      else {
        this._tileInfoBox.getBoxElement("tileImage").setTexture(this.getImageBase(tile.image));
      }

      // Defense
      if (tile.groundDefense == -1) { this._tileInfoBox.getBoxElement("def").setText(""); }
      else { this._tileInfoBox.getBoxElement("def").setText("DEF: " + tile.groundDefense); }

      // Other
      // - Healing
      if (tile.image == "leyline-struct") {
        this._tileInfoBox.getBoxElement("otherText").setText("HP: +10%");
        this._tileInfoBox.getBoxElement("otherText").setFill("#b3e885");
      }
      else {
        this._tileInfoBox.getBoxElement("otherText").setText("");
        this._tileInfoBox.getBoxElement("otherText").setFill("#fff");
      }
    }

    // Unit info
    if (tile.unit) {
      var unit = tile.unit;
      var faction = unit.faction;

      // Don't show hidden units
      if (unit.hasStatus("Presence Concealment")) { return; }

      // Show tile info if not already visible
      if (this._unitInfoBox.depth < 1) { this._unitInfoBox.setDepth(48); }

      // Portrait
      this._unitInfoBox.getBoxElement("portrait").setTexture(unit.portrait + "-Portrait");

      // Name
      this._unitInfoBox.getBoxElement("name").setText(unit.name + " ");
      this._unitInfoBox.getBoxElement("name").setFill(faction.color);
      if (this._unitInfoBox.getBoxElement("name").text.length > 20) {
        this._unitInfoBox.getBoxElement("name").setFontSize(14);
      }
      else if (this._unitInfoBox.getBoxElement("name").text.length > 16) {
        this._unitInfoBox.getBoxElement("name").setFontSize(16);
      }
      else {
        this._unitInfoBox.getBoxElement("name").setFontSize(20);
      }

      // Faction
      if (faction.isPlayable) {                                   // Player
        this._unitInfoBox.getBoxElement("faction").setText("");
      }
      else if (!this._playerFactions.includes(faction)) {         // Enemy
        this._unitInfoBox.getBoxElement("faction").setText("");
      }
      else {                                                      // Ally (non-playable)
        this._unitInfoBox.getBoxElement("faction").setText("(Ally)");
        this._unitInfoBox.getBoxElement("faction").setFill(faction.color);
        this._unitInfoBox.getBoxElement("faction").x = this._unitInfoBox.getBoxElement("name").x + 132;
      }

      // Class
      this._unitInfoBox.getBoxElement("classToken").setTexture(unit.unitClass + "-" + unit.rank + "-Token");
      this._unitInfoBox.getBoxElement("rankClass").setText(unit.unitClass);
      this._unitInfoBox.getBoxElement("rankClass").setFill(rankToColor(unit.rank));

      // Stats
      this._unitInfoBox.getBoxElement("valueHP").setText(unit.curHP + " / " + unit.maxHP);

      this._unitInfoBox.getBoxElement("valueRange").setText(unit.attackRange);
      this._unitInfoBox.getBoxElement("valueMove").setText(unit.movement);
      // if (unit.moveType == moveTypeEnum.Flight) { this._unitInfoBox.getBoxElement("moveIcon").setTexture("move-flight"); }
      // else { this._unitInfoBox.getBoxElement("moveIcon").setTexture("move-ground"); }

      // Skills
      if (unit._activeSkills.length > 0) {
        // First skill
        this._unitInfoBox.getBoxElement("labelSkills").setText("Skills");

        var skill = unit._activeSkills[0];
        this._unitInfoBox.getBoxElement("skill1").setTexture(skill.image);
        if (skill.curTurn > 0) {
          this._unitInfoBox.getBoxElement("skill1").tint = 0x999999;
          this._unitInfoBox.getBoxElement("skill1Text").setText(skill.curTurn);
        }
        else {
          this._unitInfoBox.getBoxElement("skill1").tint = 0xffffff;
          this._unitInfoBox.getBoxElement("skill1Text").setText("");
        }

        if (unit._activeSkills.length > 1) {
          // Second skill
          skill = unit._activeSkills[1];
          this._unitInfoBox.getBoxElement("skill2").setTexture(skill.image);
          if (skill.curTurn > 0) {
            this._unitInfoBox.getBoxElement("skill2").tint = 0x999999;
            this._unitInfoBox.getBoxElement("skill2Text").setText(skill.curTurn);
          }
          else {
            this._unitInfoBox.getBoxElement("skill2").tint = 0xffffff;
            this._unitInfoBox.getBoxElement("skill2Text").setText("");
          }
        }
        else {
          // Only one skill
          this._unitInfoBox.getBoxElement("skill2").setTexture("skill-None");
          this._unitInfoBox.getBoxElement("skill2Text").setText("");
        }
      }
      else {
        // No skills
        this._unitInfoBox.getBoxElement("labelSkills").setText("");
        this._unitInfoBox.getBoxElement("skill1").setTexture("skill-None");
        this._unitInfoBox.getBoxElement("skill1Text").setText("");
        this._unitInfoBox.getBoxElement("skill2").setTexture("skill-None");
        this._unitInfoBox.getBoxElement("skill2Text").setText("");
      }

      // NP
      for (var i = 1; i <= unit.npChargeTime; i += 2) {
        var npImage = "NP-bar-empty";
        if ((i + 1) <= unit.curCharge) { npImage = "NP-bar-filled"; }
        else if (i <= unit.curCharge) { npImage = "NP-bar-half"; }

        this._unitInfoBox.getBoxElement("NPbar" + Math.ceil(i / 2)).setTexture(npImage);
      }

      if (i <= 1) { this._unitInfoBox.getBoxElement("NPtext").setTexture("skill-None"); }
      else {
        this._unitInfoBox.getBoxElement("NPtext").setTexture("NP-text");
      }

      if ((unit.curCharge < unit.npChargeTime) || (unit.npChargeTime == -1)) { }
      else {
        this._unitInfoBox.getBoxElement("NPtext").setTexture("NP-text-gold");
      }

      for (var j = Math.ceil(i / 2); j < 6; j++) {
        this._unitInfoBox.getBoxElement("NPbar" + j).setTexture("skill-None");
      }

      // Status effects
      for (var i = 0; i < 5; i++) {
        var statusImage = "status-None";
        if (unit.allStatuses.length > i) { statusImage = unit.allStatuses[i].image; }

        this._unitInfoBox.getBoxElement("status" + (i + 1)).setTexture(statusImage);
      }
    }
    else if (this._unitInfoBox.depth > 0) {
      // Hide the unit info box
      this._unitInfoBox.setDepth(-5);
    }
  }

  //---------------
  // DESCRIPTION: Creates a structure at the specified spot
  // PARAMS:
  //  xTile      (I,REQ) - X tile to create at
  //  yTile      (I,REQ) - Y tile to create at
  //  structure  (I,REQ) - Name of structure to create ("leyline", "foretress", etc.)
  //  groundCost (I,OPT) - Movement cost for ground units (default: 1)
  //                            A cost of -1 means it's impassable for this unit type.
  //  flightCost (I,OPT) - Movement cost for flying units (default: 1)
  //                            A cost of -1 means it's impassable for this unit type.
  //  groundDef  (I,OPT) - Defense modifier for ground units (default: 0)
  //                             1 = defense buff of 10%
  //                            -1 = defense debuff of 10%
  //  structureHP (I,OPT) - HP the unit has if it is damagable (default: no HP)
  //  faction     (I,OPT) - Faction the structure belongs to
  //---------------
  createStructure(xTile, yTile, image, groundCost, flightCost, groundDef, structureHP, faction, isClaimable, workshopUnits, cooldown) {
    var tile = this.getTile(xTile, yTile);
    if (tile.maxHP) { return; }   // Don't create where there's already a structure

    var newImage = image;
    if (newImage.indexOf("-struct") == -1) { newImage += "-struct"; }
    tile.image = newImage;

    if (!this.tileSprite) {
      var xPos = this.posX(xTile) + (this._tileSize / 2) ;
      var yPos = this.posY(yTile + 1);
      tile.tileSprite = this._game.add.image(xPos, yPos, newImage).setOrigin(0.5, 1);
      tile.tileSprite.depth = 1.5;
    }
    else {
      tile.tileSprite.setTexture(newImage);
    }

    tile.tileX = this.posX(xTile);
    tile.tileY = this.posY(yTile);
    tile.groundMoveCost = groundCost;
    tile.flightMoveCost = flightCost;
    tile.groundDefense = groundDef || 2;
    tile.maxHP = structureHP || 100;
    tile.curHP = tile.maxHP
    tile.isClaimable = isClaimable;

    if (faction) {
      tile.isClaimable = true;
      this.claimStructure(tile, faction);
    }
    if (workshopUnits) { tile.workshopUnits = [...workshopUnits]; }
    if (cooldown) { tile._workshopCooldown = cooldown; }
  }

  //---------------
  // DESCRIPTION: Claims a structure for a faction
  // PARAMS:
  //  tile      (I,REQ) - Tile / structure to claim
  //  faction   (I,OPT) - Faction the structure belongs to
  //  animation (I,OPT) - If true, play claiming animation
  //  callback  (I,OPT) - Callback when animation finishes
  //---------------
  claimStructure(tile, faction, animation, callback) {
    if (tile.claim(faction)) {
      var image = tile.image.replace("-", "_" + this._factions.indexOf(faction) + "-");

      // Workshops
      if (this.isWorkshop(tile)) {
        faction.addWorkshop(tile);
      }

      if (!animation) {
        tile.image = image;
        tile.tileSprite.setTexture(image);
      }
      else {
        var unit = tile.unit;
        var timeline = this._game.tweens.createTimeline();
        var placeholder = this._game.add.sprite(0, 0, "blank");

        timeline.add( {
          targets: placeholder,
          alpha: 0,
          ease: "Linear",
          duration: 500,
          onComplete: () => {
            unit.alphaHide();
           },
        } );

        timeline.add( {
          targets: placeholder,
          alpha: 0,
          ease: "Linear",
          duration: 1000,
          onComplete: () => {
            this._sounds.claim.play();
            tile.image = image;
            tile.tileSprite.setTexture(image);
           },
        } );

        timeline.add( {
          targets: placeholder,
          alpha: 1,
          ease: "Linear",
          duration: 500,
          delay: 500,
          onComplete: () => {
              unit.alphaShow();
           }
        } );

        timeline.add( {
          targets: placeholder,
          alpha: 0,
          ease: "Linear",
          duration: 1000,
          onComplete: () => {
              placeholder.destroy();
              controls.start();
              this._isTurnTransition = false;
              if (callback) { callback(); }
           }
        } );

        this._isTurnTransition = true;
        timeline.play();
        controls.stop();
      }
    }
    else if (callback) {
      callback();
    }
  }

  //---------------
  // DESCRIPTION: Checks if the unit is on an active leyline, and heals them if so
  // PARAMS:
  //  unit (I,REQ) - Unit to check
  //---------------
  leylineHeal(unit) {
    var tile = this.getTile(unit.xTile, unit.yTile);
    if (tile.image == "leyline-struct") {
      var amount = 10;
      if (unit.hasPassiveSkill("Territory Creation")) { amount -= 5; }

      var amount = Math.floor(unit.maxHP / amount);
      unit.heal(amount);
    }
  }

  //---------------
  // DESCRIPTION: Checks if a unit being attacked is on a damageable structure,
  //              and damages the structure if so
  // PARAMS:
  //  tile   (I,REQ) - Tile to check
  //  amount (I,REQ) - Amount of damage being done to the unit
  //  animate (I,OPT) - If true, animate the HP damage (default: false)
  // RETURNS: True if the structure was destroyed; otherwise false
  //---------------
  damageStructure(tile, amount, animate) {
    if (!tile) { return false; }
    var isDestroyed = false;

    // Do damage
    isDestroyed = tile.damage(amount, this._game, animate);

    // If destroyed, change tile appearance and stats
    if (isDestroyed) {
      this._sounds.destroy.play();

      var newImage = tile.image;
      if (tile.image.indexOf("_") > -1) {
        newImage = tile.image.substring(0, tile.image.indexOf("_")) + "-struct"
      }

      // Workshops
      if (this.isWorkshop(tile)) {
        var faction = tile.faction;
        if (faction) {
          faction.removeWorkshop(tile);
        }
      }

      newImage = "ruins_" + newImage;
      tile.image = newImage;
      tile.groundDefense = 2;
      tile.faction = null;
      tile.isClaimable = false;
      tile.tileSprite.setTexture(newImage);
    }

    return isDestroyed;
  }

  //---------------
  // DESCRIPTION: Checks if a tile contains an active workshop
  // PARAMS:
  //  tile   (I,REQ) - Tile to check
  // RETURNS: True if the structure is an active workshop; otherwise false
  //---------------
  isWorkshop(tile) {
    if (!tile) { return false; }
    var image = tile.image;

    if (image.indexOf("workshop") == -1) { return false; }
    if (image.indexOf("ruins") != -1) { return false; }
    return true;
  }

  // ====================================================================================
  //                                ZONES
  // ====================================================================================

  //---------------
  // DESCRIPTION: Adds rectangular zones to the map tiles
  // PARAMS:
  //  zoneAry     (I,REQ) - Array of zone objects, ie:
  //                         [{ zone: "A", start: { x: 0, y: 0 }, end: { x: 6, y: 6 } }]
  //  connections (I,REQ) - Array of zonnection objects, ie:
  //                         [{ from: "A", to: ["B", "C"], point: { x:  3, y:  7 }  }]
  //---------------
  addZones(zoneAry, connections) {
    // For each zone
    for (const zone of zoneAry) {
      var startX = zone.start.x;
      var endX   = zone.end.x;
      var startY = zone.start.y;
      var endY   = zone.end.y;

      // For each tile within the zone
      for (var y = startY; y <= endY; y++) {
        for (var x = startX; x <= endX; x++) {
          var tile = this.getTile(x, y);
          tile.zone = zone.name;
        }
      }

    } // end zoneAry loop

    // Set connections
    this._connections = connections;
  }

  //---------------
  // DESCRIPTION: Finds the zone the given unit is in
  // PARAMS:
  //  unit (I,REQ) - Unit to check
  // RETURNS: Zone the unit is currently in
  //---------------
  unitZone(unit) {
    var tile = this.getTile(unit.xTile, unit.yTile);
    return tile.zone;
  }

  //---------------
  // DESCRIPTION: Finds the nearest connection point from one unit's zone to another
  // PARAMS:
  //  fromUnit (I,REQ) - Unit starting from
  //  toUnit   (I,REQ) - Unit going to
  // RETURNS: an object with "x" and "y" properties for the connecting tile coordinates
  //---------------
  findConnection(fromUnit, toUnit) {
    var x, y;
    var shortestPoint;
    var shortestDistance = 999999;
    var fromPoint = { x: fromUnit.xTile, y: fromUnit.yTile };

    // Find the relevant zones
    var fromZone = this.unitZone(fromUnit);
    var toZone = this.unitZone(toUnit);

    // If same zone or no connections to work with, return the target unit's position
    if ((!this._connections) || (fromZone == toZone)) {
      return { x: toUnit.xTile, y: toUnit.yTile };
    }

    // Loop through connections
    for (const con of this._connections) {
      if (con.from != fromZone) { continue; }
      if (!con.to.includes(toZone)) { continue; }

      var distance = xyDistance(fromPoint, con.point);
      if (distance < shortestDistance) {
        shortestDistance = distance;
        shortestPoint = con.point;
      }
    }

    if (!shortestPoint) { return { x: toUnit.xTile, y: toUnit.yTile }; }
    return shortestPoint;
  }

  // ====================================================================================
  //                                UNITS & MOVEMENT
  // ====================================================================================

  //---------------
  // DESCRIPTION: Spawns all units in startUnits at the specified spots.
  //---------------
  spawnStartingUnits() {
    // Spawn starting units
    for (const unitObj of this._startUnits) {
      this.spawnUnit(unitObj.unit, unitObj.x, unitObj.y);
    }

    // Create starting structures
    for (const structObj of this._startStructs) {
      var struct = structObj.struct;
      this.createStructure(structObj.x, structObj.y, struct.image, struct.groundMoveCost, struct.flightMoveCost,
        struct.groundDefense, struct.structureHP, structObj.faction, struct.isClaimable, structObj.units, structObj.cooldown);
    }
  }

  //---------------
  // DESCRIPTION: Spawns the given unit at the specified point on the map.
  //              Does nothing if specified point is invalid.
  // PARAMS:
  //  unit (I,REQ) - Unit to spawn
  //  x    (I,REQ) - xth tile to spawn at
  //  y    (I,REQ) - yth tile to spawn at
  //---------------
  spawnUnit(unit, x, y) {
    // Out of bounds
    if ((x >= this._tiles[0].length) || (y >= this._tiles.length)) { return; }

    // Blocked tile
    if ((unit.moveType == moveTypeEnum.Ground) && (this.getTile(x, y).groundMoveCost == -1)) { return; }
    if ((unit.moveType == moveTypeEnum.Flight) && (this.getTile(x, y).flightMoveCost == -1)) { return; }

    // Unit already at tile
    if (this.getTile(x, y).unit) { return; }

    // ----------

    // Add them to the bank
    this.addUnit(unit);

    // Spawn the unit
    unit.xTile = parseInt(x);
    unit.yTile = parseInt(y);
    var xPos = this.posX(x);
    var yPos = this.posY(y);
    this.getTile(x, y).unit = unit;

    // Handle faction
    var faction = unit.faction;
    var isEnemy = false;
    if (faction) {
      if (!this._factions.includes(faction)) {
          this.addFaction(faction);     // Add the unit's faction if not already there
          this.setFactionColor(faction);
      }

      if (!this._playerFactions.includes(faction)) { isEnemy = true; }  // Determine if this is an enemy
    }

    // Unit sprites
    unit.addSprites(xPos, yPos, this._tileSize, isEnemy, this._factions.indexOf(faction) );
    unit.sprite.on('pointerdown', (pointer) => { if (!pointer.rightButtonDown()) {  this.selectUnit(unit); } });
    unit.sprite.on('pointerup', (pointer) => { if (!pointer.rightButtonDown()) {
      for (const sprite of this._tempRange) { sprite.destroy(); }
      this._tempRange.length = 0;
    } });
    unit.normal();

    // Passives if spawned after unit placement
    if (this._factionIndex > -1) {
      unit.applyPassiveSkills(this);
    }
  }

  //---------------
  // DESCRIPTION: Selects a unit, showing movement range and allowing for movement
  // PARAMS:
  //  unit (I,REQ) - Unit to select
  //---------------
  selectUnit(unit) {
    if (this._isTurnTransition) { return; }

    // Unit info
    if (this._unitInfo) {
      this._tileHover.setTexture("selection-cursor");
      this._unitInfo = false;

      var camIgnore = [];
      camIgnore.push(this._tileInfoBox._baseSprite);
      for (const box of this._tileInfoBox._boxUI) { camIgnore.push(box.sprite); }
      camIgnore.push(this._unitInfoBox._baseSprite);
      for (const box of this._unitInfoBox._boxUI) { camIgnore.push(box.sprite); }
      camIgnore.push(this._playerInfoBox._baseSprite);
      for (const box of this._playerInfoBox._boxUI) { camIgnore.push(box.sprite); }

      var unitInfo = new UnitInfo();
      unitInfo.showUnitInfo(this._game, unit, this._sounds.selectMenu, () => {
        this._tileHover.depth = 20;
        this.isTurnTransition = false;
        this._camera.centerOn(this.posX(unit.xTile), this.posY(unit.yTile));
        controls.start();

        this._noActionMenu = true;
        this._game.time.delayedCall(100, () => { this._noActionMenu = false; });
      }, camIgnore, true);

      this._tileHover.depth = -5;
      this.isTurnTransition = true;
      this._camera.centerOn(this.posX(0), this.posY(0));
      controls.stop();

      return;
    }

    // Handle attacking enemies in range
    if (this._enemyList.includes(unit)) {
      if (this._attackNeedsMovement) { this.moveToAttack(unit); }
      else if (this._usingTargetedSkill) { this.useTargetedSkill(this._usingTargetedSkill, unit); }
      else if (this._usingTargetedNP) { this.useTargetedNP(this._usingTargetedNP, unit); }
      else { this.attack(unit); }
      return;
    }

    // If an options menu is already up or unit is attacking
    if ((this._optionMenu.length > 0) ||
        ((this._attacker == unit) && (!this._attackNeedsMovement) && (!this._usingTargetedSkill) && (!this._usingTargetedNP) ) ) {
      return;
    }

    // If not this unit's turn, show their overall attack range
    if (!this.isActiveUnit(unit)) {
      this._sounds.selectMenu.play();
      this.showUnitRange(unit);
      return;
    }

    // If unit is already selected
    if (this._selectedUnit == unit) {
      this.cancelSelectUnit("select");
      this.showUnitActions(unit);
      return;
    }

    // If a different unit is selected, do nothing
    if (this._selectedUnit) {
      return;
    }

    // -----

    // Bring to front while selected
    this._selectedOrigX = unit.xTile;
    this._selectedOrigY = unit.yTile;
    if (unit.sprite.depth < 10) { unit.increaseDepth(10); }
    this._selectedUnit = unit;

    // Play sound
    this._sounds.select.play();

    // Get movement and attack range
    // - Default to moving onto structures instead of attacking them
    // - Attacking structures must be done manually
    var unitRange = this.getUnitRange(unit);
    var attackRange = this.getMovementAttackRange(unit, unitRange, true, this._enemyList);
    var moveSpacesXY = [];

    // Show movement range
    var selection = [];
    for (var i = 0; i < unitRange.length; i++) {
      var x = unitRange[i][0];
      var y = unitRange[i][1];
      var xPos = this.posX(x);
      var yPos = this.posY(y);

      moveSpacesXY.push(x + "-" + y);

      var sprite = this._game.add.sprite(xPos, yPos, 'selection');
      sprite.setOrigin(0, 0);
      sprite.setDisplaySize(this._tileSize, this._tileSize);
      sprite.depth = 5;

      sprite.setInteractive( useHandCursor() );
      this.setSelectPointerDown(sprite, unit, selection, x, y);
      sprite.on('pointerover', function (pointer) { this.tint = 0xbbbbbb; } );
      sprite.on('pointerout',  function (pointer) { this.tint = 0xffffff; } );

      selection.push(sprite);
    }
    this._selection = selection;

    // Show attack range
    moveSpacesXY.push(unit.xTile + "-" + unit.yTile);   // Don't show attack square under the unit
    var atkSelection = [];
    for (var i = 0; i < attackRange.length; i++) {
      var x = attackRange[i][0];
      var y = attackRange[i][1];
      var checkXY = x + "-" + y;

      // Ignore locations already showing as movement tiles
      if (moveSpacesXY.includes(checkXY)) { continue; }

      var xPos = this.posX(x);
      var yPos = this.posY(y);

      var sprite = this._game.add.sprite(xPos, yPos, 'selection-red');
      sprite.setOrigin(0, 0);
      sprite.setDisplaySize(this._tileSize, this._tileSize);
      sprite.depth = 1;

      atkSelection.push(sprite);
    }
    this._attackSelection = atkSelection;

    // Show attackable enemies
    if (this._enemyList.length > 0) {
      this._attackNeedsMovement = true;
      this._attacker = unit;
      this.hiliteAttackableEnemies(this._enemyList);
    }
  }

  //---------------
  // DESCRIPTION: Sets the pointer down event for a selection space.
  //              Need to do this in a function so that the x and y variables are scoped
  //               correctly; otherwise, only the last sprite's values are used.
  //---------------
  setSelectPointerDown(sprite, unit, spaces, x, y) {
    sprite.on('pointerdown', (pointer) => { if (!pointer.rightButtonDown()) { this.selectMoveSpace(unit, spaces, x, y); } });
  }

  //---------------
  // DESCRIPTION: Temporarily shows a unit's overall attack range
  // PARAMS:
  //  unit (I,REQ) - Unit to show range for
  //---------------
  showUnitRange(unit) {
    // Get movement and attack range
    var unitRange = this.getUnitRange(unit);
    var attackRange = this.getMovementAttackRange(unit, unitRange);
    var moveSpacesXY = [];
    var selection = [];

    // Show movement range
    for (var i = 0; i < unitRange.length; i++) {
      var x = unitRange[i][0];
      var y = unitRange[i][1];
      var xPos = this.posX(x);
      var yPos = this.posY(y);

      moveSpacesXY.push(x + "-" + y);

      var sprite = this._game.add.sprite(xPos, yPos, 'selection-red');
      sprite.setOrigin(0, 0);
      sprite.setDisplaySize(this._tileSize, this._tileSize);
      sprite.depth = 15;
      sprite.alpha = .7;

      selection.push(sprite);
    }

    // Show attack range
    moveSpacesXY.push(unit.xTile + "-" + unit.yTile);   // Don't show attack square under the unit
    for (var i = 0; i < attackRange.length; i++) {
      var x = attackRange[i][0];
      var y = attackRange[i][1];
      var checkXY = x + "-" + y;

      // Ignore locations already showing as movement tiles
      if (moveSpacesXY.includes(checkXY)) { continue; }

      var xPos = this.posX(x);
      var yPos = this.posY(y);

      var sprite = this._game.add.sprite(xPos, yPos, 'selection-red');
      sprite.setOrigin(0, 0);
      sprite.setDisplaySize(this._tileSize, this._tileSize);
      sprite.depth = 15;
      sprite.alpha = .7;

      selection.push(sprite);
    }

    this._tempRange = selection;
  }

  //---------------
  // DESCRIPTION: Cancels movement / selection and destroys unit action menu
  // PARAMS:
  //  noSound (I,OPT) - If true, no sound will play
  //  isTurnTransition (I,OPT) - If true, will cancel all even during a turn transition
  //---------------
  cancelAll(noSound, isTurnTransition) {
    // Unit placement
    if (this._placementTile) {
      this._sounds.selectMenu.play();
      var otherSprite = this._placementTile.select;
      otherSprite.tint = 0xffffff;
      otherSprite.on('pointerover', (pointer) => { otherSprite.tint = 0xbbbbbb; } );
      otherSprite.on('pointerout',  (pointer) => { otherSprite.tint = 0xffffff; } );
      this._placementTile = null;
    }
    if (this._placementUnit) {
      this._sounds.selectMenu.play();
      var otherPortrait = this._placementUnit.sprite;
      var otherServantUI = this._placementUnit.spriteUI;
      for (const sprite of otherServantUI) { sprite.tint = 0xffffff; }
      otherPortrait.on('pointerover', (pointer) => { for (const sprite of otherServantUI) { sprite.tint = 0xbbbbbb; } } );
      otherPortrait.on('pointerout',  (pointer) => { for (const sprite of otherServantUI) { sprite.tint = 0xffffff; } } );
      this._placementUnit = null;
    }
    // --------------

    // Normal Canceling
    if (this._unitInfo) { this._tileHover.setTexture("selection-cursor"); this._unitInfo = false; }
    if ((this._isTurnTransition) && (!isTurnTransition)) { return; }

    // Cancel unit selection
    var unit = this._selectedUnit;
    if (unit) {
      var sound;
      if (!noSound) { sound = "cancel"; }
      this.cancelSelectUnit(sound);
    }
    else {
      defaultCursor();
      this._pauseTileHover = false;
      if (!noSound) { this._sounds.cancel.play(); }
    }
    this._attacker = null;

    // Destroy action menu
    for (const sprite of this._optionMenu) { sprite.destroy(); }
    this._optionMenu.length = 0;

    for (const text of this._optionText) { text.destroy(); }
    this._optionText.length = 0;

    // Remove in-range enemies
    this._enemyList.length = 0;
    for (const enemySelect of this._enemySelect) { enemySelect.destroy(); }
    this._enemySelect.length = 0;
    for (const attackSelect of this._attackSelection) { attackSelect.destroy(); }

    this._attackSelection.length = 0;
    this._attackNeedsMovement = false;
    this._usingTargetedSkill = null;
    this._usingTargetedNP = null;

    for (const sprite of this._tempRange) { sprite.destroy(); }
    this._tempRange.length = 0;

    for (const select of this._aoeSelection) { select.destroy(); }
    this._aoeSelection.length = 0;

    // -----

    if (unit) {
      // Set new location on unit
      var xTile = parseInt(this._selectedOrigX);
      var yTile = parseInt(this._selectedOrigY);

      // Don't move if unit didn't change position
      if ((xTile == unit.xTile) && (yTile == unit.yTile)) {
        return;
      }

      this.getTile(unit.xTile, unit.yTile).unit = null;
      this.getTile(xTile, yTile).unit = unit;
      this._selectedOrigX = unit.xTile;
      this._selectedOrigY = unit.yTile;

      // Move unit back to original space
      unit.setPosition(xTile, yTile, this.posX(xTile), this.posY(yTile));
    }
  }

  //---------------
  // DESCRIPTION: Cancels selection of currently-selected unit
  // PARAMS:
  //  sound (I,OPT) - Sound to play
  //---------------
  cancelSelectUnit(soundName) {
    var unit = this._selectedUnit;

    // Do nothing if no unit is selected
    if (!unit) {
      return;
    }

    // Play cancel sound
    this._pauseTileHover = false;
    if (soundName == "select") { this._sounds.select.play(); }
    else if (soundName == "cancel") { this._sounds.cancel.play(); }
    else if (soundName) {
      var sound = this._game.sound.add(soundName, { volume: 0.7 } );
      sound.play();
    }

    // Remove the selection and kill selection sprites
    this._selectedUnit = null;
    for (const select of this._selection) { select.destroy(); }
    this._selection.length = 0;

    this._enemyList.length = 0;
    for (const enemySelect of this._enemySelect) { enemySelect.destroy(); }
    this._enemySelect.length = 0;
    for (const attackSelect of this._attackSelection) { attackSelect.destroy(); }
    this._attackSelection.length = 0;
    this._attackNeedsMovement = false;
    this._usingTargetedSkill = null;
    this._usingTargetedNP = null;

    // Fix cursor and depth
    if (unit.sprite.depth > 10) { unit.decreaseDepth(10); }
    defaultCursor();
  }

  //---------------
  // DESCRIPTION: Ends turn for a unit
  // PARAMS:
  //  unit    (I,REQ) - Unit to have wait
  //  noSound (I,OPT) - If true, will not play a sound
  //---------------
  waitUnit(unit, noSound) {
    // Do nothing if not already active
    if (!this.isActiveUnit(unit)) { return; }

    // Play sound, cancel select if selected
    if (unit == this._selectedUnit) {
      var sound;
      if (!noSound) { sound = "select"; }
      this.cancelSelectUnit(sound);
    }
    else {
      this._pauseTileHover = false;
      if (!noSound) { this._sounds.select.play(); }
    }

    // Clean up option menu
    for (const sprite of this._optionMenu) { sprite.destroy(); }
    this._optionMenu.length = 0;
    for (const text of this._optionText) { text.destroy(); }
    this._optionText.length = 0;


    // Mark the unit as inactive
    this.removeActiveUnit(unit);
    this._attacker = null;
    this._enemyList.length = 0;

    // Claim claimable structures
    var tile = this.getTile(unit.xTile, unit.yTile);
    if (tile && (tile.isClaimable)) {
      this.claimStructure(tile, unit.faction, true, () => {
        this.finishWaitUnit(unit);
      });
      return;
    }

    this.finishWaitUnit(unit);
  }
  finishWaitUnit(unit) {
    // Darken tint
    unit.darken();

    // Go to the next turn if no more active units
    if (this._activeUnits.length < 1) {
      this.nextTurn();
      return;
    }

    // If an AI turn, go to the next AI unit
    if (this._turnFaction) {
      var isPlayerTurn = this._turnFaction.isPlayable;
      if (!isPlayerTurn) {
          this.nextAIturn();
      }
    }
  }

  //---------------
  // DESCRIPTION: Selects a movement space for the selected unit
  // PARAMS:
  //  unit   (I,REQ) - Selected unit
  //  spaces (I,REQ) - Array of space sprites to destroy
  //  x      (I,REQ) - Xth tile of selected space
  //  y      (I,REQ) - Yth tile of selected space
  //---------------
  selectMoveSpace(unit, spaces, x, y) {
    // Cancel unit selection
    this._sounds.select.play();
    defaultCursor();
    this._pauseTileHover = true;

    // Kill all of the space sprites
    for (var i = 0; i < spaces.length; i++) {
      spaces[i].destroy();
    }

    // Clear enemy list
    this._enemyList.length = 0;
    for (const enemySelect of this._enemySelect) { enemySelect.destroy(); }
    this._enemySelect.length = 0;
    for (const attackSelect of this._attackSelection) { attackSelect.destroy(); }
    this._attackSelection.length = 0;
    this._attackNeedsMovement = false;
    this._usingTargetedSkill = null;
    this._usingTargetedNP = null;
    this._attacker = null;

    // Move unit to space
    this.moveUnit(unit, x, y);
  }

  //---------------
  // DESCRIPTION: Shows a menu of unit commands for selection
  // PARAMS:
  //  unit (I,REQ) - Unit to show actions for
  //---------------
  showUnitActions(unit) {
    var index;
    var depthMod = 1;
    this._optionMenu.length = 0;
    this._optionText.length = 0;
    this._pauseTileHover = true;

    this.updateTileInfo(this.getTile(unit.xTile, unit.yTile));
    this._unitInfoBox.setDepth(50);

    // Reposition Menu
    var xyCoord = this.actionMenuPosition(parseInt(unit.xTile) + 1, unit.yTile);
    var xPos = xyCoord.x;
    var yPos = xyCoord.y;


    // Attack
    this._enemyList.length = 0;
    var attackRange = [];
    this.checkEnemiesInRange(unit, this._enemyList, attackRange, unit.xTile, unit.yTile, unit.attackRange, 0);
    if (this._enemyList.length > 0) {
      index = this.createActionOption("Attack", this._optionMenu, this._optionText, xPos, yPos, depthMod);
      yPos += 29;
      depthMod++;

      this._optionMenu[index].on('pointerdown', (pointer) => {
        for (const sprite of this._optionMenu) { sprite.destroy(); }
        this._optionMenu.length = 0;
        for (const text of this._optionText) { text.destroy(); }
        this._optionText.length = 0;
        if (pointer.rightButtonDown()) { this.cancelAll(); }
        if (!pointer.rightButtonDown()) { this.showAttackTargets(unit, this._enemyList, attackRange); }
      });
    }

    // Noble Phantasm
    if ((unit.noblePhantasm) && (unit.curCharge >= unit.npChargeTime) && (!unit.hasStatus("Seal NP"))) {
      var npY = yPos;
      if (this._enemyList.length > 0) { npY -= 29; }

      index = this.createActionOption("", this._optionMenu, this._optionText, (xPos + 96), npY, depthMod, null, "option-box-small");
      depthMod++;

      var npIcon = this._game.add.sprite((xPos + 96 + 15), (npY + 14), "NP-text-gold").setOrigin(0.5, 0.5);
      npIcon.depth = 20 + depthMod;
      this._optionMenu.push(npIcon);

      this.npButton(unit, this._optionMenu[index]);
    }

    // Wait
    index = this.createActionOption("Wait", this._optionMenu, this._optionText, xPos, yPos, depthMod);
    yPos += 29;
    depthMod++;

    this._optionMenu[index].on('pointerdown', (pointer) => {
      for (const sprite of this._optionMenu) { sprite.destroy(); }
      this._optionMenu.length = 0;
      for (const text of this._optionText) { text.destroy(); }
      this._optionText.length = 0;
      if (pointer.rightButtonDown()) { this.cancelAll(); }
      if (!pointer.rightButtonDown()) { this.waitUnit(unit); }
    });

    // Cancel
    index = this.createActionOption("Cancel", this._optionMenu, this._optionText, xPos, yPos, depthMod);
    yPos += 29;
    depthMod++;

    this._optionMenu[index].on('pointerdown', (pointer) => {
      for (const sprite of this._optionMenu) { sprite.destroy(); }
      this._optionMenu.length = 0;
      for (const text of this._optionText) { text.destroy(); }
      this._optionText.length = 0;
      if (pointer.rightButtonDown()) { this.cancelAll(); }
      if (!pointer.rightButtonDown()) {
        this.cancelAll();
      }
    });

    // Active Skills
    this.showSkills(unit, xPos, yPos, depthMod);
  }

  //---------------
  // DESCRIPTION: Determines best place to show the action menu
  // PARAMS:
  //  tileX (I,REQ) - Requested Xth tile position
  //  tileY (I,REQ) - Requested Yth tile position
  // RETURNS: Object with new "x" and "y" pixel positions
  //---------------
  actionMenuPosition(tileX, tileY) {
    var xPos = this.posX(tileX);
    var yPos = this.posY(tileY);

    // If not space on the right, move it to the left
    if (!this.getTile((tileX + 1), tileY)) {
      xPos = this.posX(tileX - 3) + (this._tileSize / 2);
    }

    // There should always be space above since the top
    //  of the menu is level with the top of the tile

    // If no space below, move it up
    if (!this.getTile(tileX, (tileY + 1))) {
      yPos = this.posY(tileY - 1);
    }

    return { x: xPos, y: yPos};
  }

  //---------------
  // DESCRIPTION: Shows action menu when an empty tile is clicked
  // PARAMS:
  //  pointer (I,REQ) - Pointer object
  //---------------
  actionMenu(pointer) {
    // Do nothing if during a turn
    if (this._unitInfo) { this._tileHover.setTexture("selection-cursor"); this._unitInfo = false; return; }
    if (this._isTurnTransition) { return; }
    if (this._noActionMenu) { return; }

    // Get the tile
    var x = pointer.worldX;
    var y = pointer.worldY;
    var tileX = this.tileX(x);
    var tileY = this.tileY(y);
    var tile = this.getTile(tileX, tileY);

    if (!tile) { return; }

    // Do nothing if a unit is there to select
    if (tile.unit) { return; }

    // Attack structure if available
    if (this._attacker && this._enemyList.includes(tile)) {
      if (this._attackNeedsMovement) { this.moveToAttack(tile); }
      else if (this._usingTargetedSkill) { this.useTargetedSkill(this._usingTargetedSkill, tile); }
      else if (this._usingTargetedNP) { this.useTargetedNP(this._usingTargetedNP, tile); }
      else { this.attack(tile); }
      return;
    }

    // Do nothing if option menu is already open
    if (this._selectedUnit) { return; }
    if (this._optionMenu.length > 0) { return; }


    // ==============================
    //   Show Action Menu
    // ==============================
    var index;
    var depthMod = 1;
    this._pauseTileHover = true;
    this._sounds.select.play();

    // Reposition Menu
    var xyCoord = this.actionMenuPosition((tileX + 1), tileY);
    var xPos = xyCoord.x;
    var yPos = xyCoord.y;


    // End Turn
    index = this.createActionOption("End Turn", this._optionMenu, this._optionText, xPos, yPos, depthMod);
    yPos += 29;
    depthMod++;

    this._optionMenu[index].on('pointerdown', (pointer) => {
      for (const sprite of this._optionMenu) { sprite.destroy(); }
      this._optionMenu.length = 0;
      for (const text of this._optionText) { text.destroy(); }
      this._optionText.length = 0;
      if (pointer.rightButtonDown()) { this.cancelAll(); }
      if (!pointer.rightButtonDown()) {
        this._sounds.select.play();
        this.cancelAll(true);

        this.endTurnConfirmation();
      }
    });

    // Unit Info
    index = this.createActionOption("Unit Info", this._optionMenu, this._optionText, xPos, yPos, depthMod);
    yPos += 29;
    depthMod++;

    this._optionMenu[index].on('pointerdown', (pointer) => {
      for (const sprite of this._optionMenu) { sprite.destroy(); }
      this._optionMenu.length = 0;
      for (const text of this._optionText) { text.destroy(); }
      this._optionText.length = 0;
      if (pointer.rightButtonDown()) { this.cancelAll(); }
      if (!pointer.rightButtonDown()) {
        this._sounds.select.play();
        this.cancelAll(true);

        this._tileHover.setTexture("selection-cursor-q");
        this._unitInfo = true;
      }
    });

    // Help
    index = this.createActionOption("Help", this._optionMenu, this._optionText, xPos, yPos, depthMod);
    yPos += 29;
    depthMod++;

    this._optionMenu[index].on('pointerdown', (pointer) => {
      for (const sprite of this._optionMenu) { sprite.destroy(); }
      this._optionMenu.length = 0;
      for (const text of this._optionText) { text.destroy(); }
      this._optionText.length = 0;
      if (pointer.rightButtonDown()) { this.cancelAll(); }
      if (!pointer.rightButtonDown()) {
        this._sounds.select.play();
        this.cancelAll(true);

        var camIgnore = [];
        camIgnore.push(this._tileInfoBox._baseSprite);
        for (const box of this._tileInfoBox._boxUI) { camIgnore.push(box.sprite); }
        camIgnore.push(this._unitInfoBox._baseSprite);
        for (const box of this._unitInfoBox._boxUI) { camIgnore.push(box.sprite); }
        camIgnore.push(this._playerInfoBox._baseSprite);
        for (const box of this._playerInfoBox._boxUI) { camIgnore.push(box.sprite); }

        var help = new HelpTips();
        help.showHelpTips(this._game, this._sounds.selectMenu, () => {
          this._tileHover.depth = 20;
          this.isTurnTransition = false;
          this._camera.centerOn(xPos, yPos);
          controls.start();

          this._noActionMenu = true;
          this._game.time.delayedCall(100, () => { this._noActionMenu = false; });
        }, camIgnore, true);

        this._tileHover.depth = -5;
        this.isTurnTransition = true;
        this._camera.centerOn(this.posX(0), this.posY(0));
        controls.stop();
      }
    });

    // Retreat
    index = this.createActionOption("Retreat", this._optionMenu, this._optionText, xPos, yPos, depthMod);
    yPos += 29;
    depthMod++;

    this._optionMenu[index].on('pointerdown', (pointer) => {
      for (const sprite of this._optionMenu) { sprite.destroy(); }
      this._optionMenu.length = 0;
      for (const text of this._optionText) { text.destroy(); }
      this._optionText.length = 0;
      if (pointer.rightButtonDown()) { this.cancelAll(); }
      if (!pointer.rightButtonDown()) {
        this._sounds.select.play();
        this.cancelAll(true);

        this.retreatConfirmation();
      }
    });

    // Cancel
    index = this.createActionOption("Cancel", this._optionMenu, this._optionText, xPos, yPos, depthMod);
    yPos += 29;
    depthMod++;

    this._optionMenu[index].on('pointerdown', (pointer) => {
      for (const sprite of this._optionMenu) { sprite.destroy(); }
      this._optionMenu.length = 0;
      for (const text of this._optionText) { text.destroy(); }
      this._optionText.length = 0;
      if (pointer.rightButtonDown()) { this.cancelAll(); }
      if (!pointer.rightButtonDown()) {
        this._sounds.cancel.play();
        this.cancelAll();
      }
    });
  }

  //---------------
  // DESCRIPTION: Shows a confirmation popup for ending the turn
  //---------------
  endTurnConfirmation() {
    // Create the popup
    var popup = new PopUpBox(this._game, "End Turn", ["Are you sure you want to end your turn?"], this._turnFaction.color);
    popup.addButton("Yes", this._sounds.select, () => { this.nextTurn(); } );
    popup.addButton("Cancel", this._sounds.cancel, function() {  } );

    // Show popup
    popup.showPopUp(this);
  }

  //---------------
  // DESCRIPTION: Shows a confirmation popup for retreating from the battle
  //---------------
  retreatConfirmation() {
    // Create the popup
    var popup = new PopUpBox(this._game, "Retreat", ["Are you sure you want to retreat from the battle?",
      "Battle progress will not be saved."], "#ff4040");
    popup.addButton("Retreat", this._sounds.select, () => { this.endGame(true); }, "medium" );
    popup.addButton("Cancel", this._sounds.cancel, function() {  }, "medium" );

    // Show popup
    popup.showPopUp(this);
  }

  //---------------
  // DESCRIPTION: Creates buttons for the unit's skills
  // PARAMS:
  //  unit     (I,REQ) - Unit to show skills for
  //  xPos     (I,REQ) - X position
  //  yPos     (I,REQ) - Y position
  //  depthMod (I,OPT) - Additional depth to add to button
  //---------------
  showSkills(unit, xPos, yPos, depthMod) {
    var skillList = unit.activeSkills;
    if (!skillList) { return; }

    // Display each skill
    for (const skill of skillList) {
      this.createSkillButton(unit, skill, xPos, yPos, depthMod);
      xPos += 40;
    }
  }

  //---------------
  // DESCRIPTION: Creates a skill button
  // PARAMS:
  //  unit     (I,REQ) - Unit to show skills for
  //  skill    (I,REQ) - Unit to create button for
  //  xPos     (I,REQ) - X position
  //  yPos     (I,REQ) - Y position
  //  depthMod (I,OPT) - Additional depth to add to button
  //---------------
  createSkillButton(unit, skill, xPos, yPos, depthMod) {
    // Frame
    var skillFrame = this._game.add.sprite(xPos, yPos, "skill-frame");
    skillFrame.setOrigin(0, 0);
    skillFrame.depth = 20 + depthMod;
    this._optionMenu.push(skillFrame);

    depthMod++;
    xPos += 4;
    yPos += 4;

    // Skill
    var skillIcon = this._game.add.sprite(xPos, yPos, skill.image);
    skillIcon.setOrigin(0, 0);
    skillIcon.setDisplaySize(34, 34);
    skillIcon.depth = 20 + depthMod;
    this._optionMenu.push(skillIcon);


    // During Cooldown
    if ((skill.curTurn > 0) || (unit.hasStatus("Seal Skills"))) {
      // Tint
      skillIcon.tint = 0x999999;

      // Text to show cooldown
      if (skill.curTurn > 0) {
        xPos += 32;
        yPos += 34;

        var style = { font: "15px Optima", fill: "#fff" };
        var text = this._game.add.text(xPos, yPos, skill.curTurn, style).setOrigin(1, 1);
        text.depth = 20 + depthMod;
        text.setShadow(1, 1, "#000", 1);
        this._optionText.push(text);
      }
    }

    // Active
    else {
      skillIcon.setInteractive( useHandCursor() );
      skillIcon.on('pointerover', () => { skillIcon.tint = 0xbbbbbb; } );
      skillIcon.on('pointerout',  () => { skillIcon.tint = 0xffffff; } );
      skillIcon.on('pointerdown', (pointer) => {
        if (pointer.rightButtonDown()) { this.cancelAll(); return; }

        // Play sound
        this._sounds.selectMenu.play();

        // Popup confirmation
        var description = [...skill.description];
        if (skill.skillType != skillTypeEnum.Self) {
          description.push("Using this skill on a target will end the unit's turn.");
        }

        var popup = new PopUpBox(this._game, skill.name, description, this._turnFaction.color);
        var skillType = skill.skillType;
        var targetAllies = false;
        var useSound = null;

        // Handle ally-targeting Skills
        if (skillType == skillTypeEnum.Ally) {
          skillType = skillTypeEnum.Enemy;
          targetAllies = true;
        }
        else if (skillType == skillTypeEnum.AllyBurst) {
          skillType = skillTypeEnum.AoEburst;
          targetAllies = true;
        }

        /// ==============================
        //   Self skills
        // ==============================
        // Use the skill now
        if (skillType == skillTypeEnum.Self) {
          popup.addButton("Use Skill", this._sounds.skillUse, () => {

            // Mark as used
            skill.curTurn = skill.cooldown;

            // Don't end turn for self-target skills
            skill.effect(this, unit, [unit]);
            this.updateTileInfo(this.getTile(unit.xTile, unit.yTile));

            // Redraw menu
            for (const sprite of this._optionMenu) { sprite.destroy(); }
            this._optionMenu.length = 0;
            for (const text of this._optionText) { text.destroy(); }
            this._optionText.length = 0;
            this.showUnitActions(unit);

           }, "medium" );
        }

        // ==============================
        //   Space-targeting skills
        // ==============================
        // Show attack range and use skill on enemy selection
        else if (skillType == skillTypeEnum.Space)  {
          popup.addButton("Use Skill", null, () => {

            // Remove menu
            for (const sprite of this._optionMenu) { sprite.destroy(); }
            this._optionMenu.length = 0;
            for (const text of this._optionText) { text.destroy(); }
            this._optionText.length = 0;

            // Select unit
            this._selectedUnit = unit;
            if (unit.sprite.depth < 10) { unit.increaseDepth(10); }

            // Show avilable spaces
            this.showEmptySpacesRange(unit, skill.range, skill, null, () => {
              skill.curTurn = skill.cooldown;
              this.waitUnit(unit, true);
            });

           }, "medium" );
        }

        // ==============================
        //   AoE Burst Skills
        // ==============================
        // Show attack range and use NP on enemy selection
        else if (skillType == skillTypeEnum.AoEburst) {
          popup.addButton("Use Skill", null, () => {

            // Remove menu
            for (const sprite of this._optionMenu) { sprite.destroy(); }
            this._optionMenu.length = 0;
            for (const text of this._optionText) { text.destroy(); }
            this._optionText.length = 0;

            // Select unit
            this._selectedUnit = unit;
            if (unit.sprite.depth < 10) { unit.increaseDepth(10); }

            var aoeSound = this._sounds.skillUseDmg;
            if (targetAllies) { aoeSound = this._sounds.skillUse; }
            if (skill.image == "skill-Heal") { aoeSound = this._sounds.skillUse; }

            // Show attack range
            this.showAoEburstRange(unit, skill.range, skill, () => {
              skill.curTurn = skill.cooldown;
              this.waitUnit(unit, true);
            }, targetAllies, aoeSound);

           }, "medium" );
        }

       // ==============================
       //   Targeted skills
       // ==============================
       // Show attack range and use skill on enemy selection
       else {
         popup.addButton("Use Skill", null, () => {

           // Remove menu
           for (const sprite of this._optionMenu) { sprite.destroy(); }
           this._optionMenu.length = 0;
           for (const text of this._optionText) { text.destroy(); }
           this._optionText.length = 0;

           // Select unit
           this._selectedUnit = unit;
           if (unit.sprite.depth < 10) { unit.increaseDepth(10); }

           // Show attack range
           var attackRange = [];
           this._enemyList.length = 0;
           this._usingTargetedSkill = skill;

           this.checkEnemiesInRange(unit, this._enemyList, attackRange, unit.xTile, unit.yTile, skill.range, 0, null, null, true, null, targetAllies);
           this.showAttackTargets(unit, this._enemyList, attackRange, targetAllies);

          }, "medium" );
       }

        popup.addButton("Cancel", this._sounds.cancel, function() {  }, "medium" );
        popup.showPopUp(this);
      });
    }
  }

  //---------------
  // DESCRIPTION: Sets click event for NP button
  // PARAMS:
  //  unit   (I,REQ) - Unit that can use NP
  //  button (I,REQ) - Button sprite
  //---------------
  npButton(unit, button) {
    var noblePhantasm = unit.noblePhantasm;

    button.on('pointerdown', (pointer) => {
      if (pointer.rightButtonDown()) { this.cancelAll(); return; }

      // Play sound
      this._sounds.selectMenu.play();

      // Popup confirmation
      var description = [...noblePhantasm.description];
      description.push(" ");
      description.push("Using a Noble Phantasm will end the unit's turn.");

      var popup = new PopUpBox(this._game, noblePhantasm.name, description, this._turnFaction.color);
      var npType = noblePhantasm.npType;
      var targetAllies = false;
      var useSound = null;

      // Handle ally-targeting NPs
      if (npType == npTypeEnum.AllyBurst) {
        npType = npTypeEnum.AoEburst;
        targetAllies = true;
        useSound = this._sounds.npUse;
      }
      if (noblePhantasm.name == "Pain Breaker") { useSound = this._sounds.heal; }
      else if (noblePhantasm.name == "Eightfold Blessings of Amaterasu") { useSound = this._sounds.heal; }
      else if (noblePhantasm.strength == -1) { useSound = this._sounds.npUse; }

      /// ==============================
      //   Self NPs
      // ==============================
      // Use the NP now
      if (npType == npTypeEnum.Self) {
        popup.addButton("Use NP", this._sounds.npStart, () => {

          // Use the NP
          unit.curCharge = 0;
          unit.removeStatus(unit.allStatuses[0]);   // NP ready should always be the first status
          noblePhantasm.effect(this, unit, [unit], this._sounds.npUse);

         }, "medium" );
      }

      // ==============================
      //   Space-targeting NPs
      // ==============================
      // Show attack range and use NP on enemy selection
      else if (npType == npTypeEnum.Space)  {
        popup.addButton("Use NP", null, () => {

          // Remove menu
          for (const sprite of this._optionMenu) { sprite.destroy(); }
          this._optionMenu.length = 0;
          for (const text of this._optionText) { text.destroy(); }
          this._optionText.length = 0;

          // Select unit
          this._selectedUnit = unit;
          if (unit.sprite.depth < 10) { unit.increaseDepth(10); }

          // Show avilable spaces
          this.showEmptySpacesRange(unit, noblePhantasm.range, noblePhantasm, this._sounds.npUse, () => {
            unit.curCharge = 0;
            unit.removeStatus(unit.allStatuses[0]);   // NP ready should always be the first status
          });

          // Remove NP (Space NPs are once per battle only)
          unit.noblePhantasm = null;
          unit._npChargeTime = -1;

         }, "medium" );
      }

     // ==============================
     //   AoE Directional NPs
     // ==============================
     // Show attack range and use NP on enemy selection
     else if (npType == npTypeEnum.AoEdir) {
       popup.addButton("Use NP", null, () => {

         // Remove menu
         for (const sprite of this._optionMenu) { sprite.destroy(); }
         this._optionMenu.length = 0;
         for (const text of this._optionText) { text.destroy(); }
         this._optionText.length = 0;

         // Select unit
         this._selectedUnit = unit;
         if (unit.sprite.depth < 10) { unit.increaseDepth(10); }

         // Show attack range
         this.showAoEdirRange(unit, noblePhantasm.range, noblePhantasm, () => {
           unit.curCharge = 0;
           unit.removeStatus(unit.allStatuses[0]);   // NP ready should always be the first status
         });

        }, "medium" );
     }

     // ==============================
     //   AoE Cone NPs
     // ==============================
     // Show attack range and use NP on enemy selection
     else if (npType == npTypeEnum.AoEcone) {
       popup.addButton("Use NP", null, () => {

         // Remove menu
         for (const sprite of this._optionMenu) { sprite.destroy(); }
         this._optionMenu.length = 0;
         for (const text of this._optionText) { text.destroy(); }
         this._optionText.length = 0;

         // Select unit
         this._selectedUnit = unit;
         if (unit.sprite.depth < 10) { unit.increaseDepth(10); }

         // Show attack range
         this.showAoEconeRange(unit, noblePhantasm.range, noblePhantasm, () => {
           unit.curCharge = 0;
           unit.removeStatus(unit.allStatuses[0]);   // NP ready should always be the first status
         });

        }, "medium" );
     }

     // ==============================
     //   AoE Burst NPs
     // ==============================
     // Show attack range and use NP on enemy selection
     else if (npType == npTypeEnum.AoEburst) {
       popup.addButton("Use NP", null, () => {

         // Remove menu
         for (const sprite of this._optionMenu) { sprite.destroy(); }
         this._optionMenu.length = 0;
         for (const text of this._optionText) { text.destroy(); }
         this._optionText.length = 0;

         // Select unit
         this._selectedUnit = unit;
         if (unit.sprite.depth < 10) { unit.increaseDepth(10); }

         // Show attack range
         this.showAoEburstRange(unit, noblePhantasm.range, noblePhantasm, () => {
           unit.curCharge = 0;
           unit.removeStatus(unit.allStatuses[0]);   // NP ready should always be the first status
         }, targetAllies, useSound);

        }, "medium" );
     }

     // ==============================
     //   AoE All NPs
     // ==============================
     // Use NP on confirmation
     else if (npType == npTypeEnum.AoEall) {
       popup.addButton("Use NP", this._sounds.npStart, () => {

         // Remove menu
         for (const sprite of this._optionMenu) { sprite.destroy(); }
         this._optionMenu.length = 0;
         for (const text of this._optionText) { text.destroy(); }
         this._optionText.length = 0;

         // Select unit
         this._selectedUnit = unit;
         if (unit.sprite.depth < 10) { unit.increaseDepth(10); }

         // Gather targets
         var targets = [];
         for (const bankUnit of this._unitBank) {
           if (bankUnit.isEnemy(unit)) {
             targets.push(bankUnit);
           }
         }

         // Use the NP
         this._attacker = unit;
         unit.curCharge = 0;
         unit.removeStatus(unit.allStatuses[0]);   // NP ready should always be the first status
         noblePhantasm.effect(this, unit, targets);

         // Remove NP (AoE ALl NPs are once per battle only)
         unit.noblePhantasm = null;
         unit._npChargeTime = -1;

        }, "medium" );
     }

     // ==============================
     //   Single Target NPs
     // ==============================
     // Show attack range and use skill on enemy selection
     else if (npType == npTypeEnum.Single)  {
       popup.addButton("Use NP", null, () => {

         // Remove menu
         for (const sprite of this._optionMenu) { sprite.destroy(); }
         this._optionMenu.length = 0;
         for (const text of this._optionText) { text.destroy(); }
         this._optionText.length = 0;

         // Select unit
         this._selectedUnit = unit;
         if (unit.sprite.depth < 10) { unit.increaseDepth(10); }

         // Show attack range
         var attackRange = [];
         this._enemyList.length = 0;
         this._usingTargetedNP = noblePhantasm;

         this.checkEnemiesInRange(unit, this._enemyList, attackRange, unit.xTile, unit.yTile, noblePhantasm.range, 0);
         this.showAttackTargets(unit, this._enemyList, attackRange);

        }, "medium" );
     }

      popup.addButton("Cancel", this._sounds.cancel, function() {  }, "medium" );
      popup.showPopUp(this);
    });
  }

  //---------------
  // DESCRIPTION: Shows avilable spaces for "Space" skills
  // PARAMS:
  //  unit   (I,REQ) - Attacking unit
  //  range  (I,REQ) - Range of skill
  //  skill  (I,REQ) - Skill being used
  //---------------
  showEmptySpacesRange(unit, range, skill, sound, callback) {
    for (const select of this._aoeSelection) { select.destroy(); }
    this._aoeSelection.length = 0;

    // Sound and cursor fix
    this._sounds.selectMenu.play();
    defaultCursor();
    this._attacker = unit;
    this._pauseTileHover = false;

    // Get range
    var spaceRange = [];
    this.checkUnitRange(unit, spaceRange, unit.xTile, unit.yTile, range, 0, null, null, null, true);

    // Show range
    var selection = [];
    for (var i = 0; i < spaceRange.length; i++) {
      var x = spaceRange[i][0];
      var y = spaceRange[i][1];
      var xPos = this.posX(x);
      var yPos = this.posY(y);

      var sprite = this._game.add.sprite(xPos, yPos, 'selection');
      sprite.setOrigin(0, 0);
      sprite.setDisplaySize(this._tileSize, this._tileSize);
      sprite.depth = 5;

      sprite.setInteractive( useHandCursor() );
      this.setSpacePointerDown(sprite, unit, skill, x, y, sound, callback);
      sprite.on('pointerover', function (pointer) { this.tint = 0xbbbbbb; } );
      sprite.on('pointerout',  function (pointer) { this.tint = 0xffffff; } );

      selection.push(sprite);
    }
    this._aoeSelection = selection;
  }
  setSpacePointerDown(sprite, unit, skill, xTile, yTile, sound, callback) {
    sprite.on('pointerdown', (pointer) => { if (!pointer.rightButtonDown()) {
      for (const select of this._aoeSelection) { select.destroy(); }
      this._aoeSelection.length = 0;

      if (!sound) { sound = this._sounds.skillUse; }
      skill.effect(this, unit, [{ x: xTile, y: yTile }], sound);

      if (callback) { callback(); }
    } });
  }

  //---------------
  // DESCRIPTION: Shows attack range for AoE Directional attacks and allows for attacking
  // PARAMS:
  //  unit   (I,REQ) - Attacking unit
  //  range  (I,REQ) - Range of attack
  //  attack (I,REQ) - Attack that has an "effect" function that accepts the user and targets
  //  callback (I,OPT) - Code to run after attack happens
  //---------------
  showAoEdirRange(unit, range, attack, callback) {
    for (const select of this._aoeSelection) { select.destroy(); }
    this._aoeSelection.length = 0;

    // Sound and cursor fix
    this._sounds.selectMenu.play();
    defaultCursor();
    this._attacker = unit;
    this._pauseTileHover = false;
    this._enemyList.length = 0;

    // North
    var northRange = [];
    var northEnemy = [];
    var northSelect = [];
    this.checkEnemiesInRange(unit, northEnemy, northRange, unit.xTile, unit.yTile, range, 0, null, null, false, ["north"]);
    this.showAoEAttackTargets(unit, northEnemy, northRange, northSelect, attack, callback);

    // South
    var southRange = [];
    var southEnemy = [];
    var southSelect = [];
    this.checkEnemiesInRange(unit, southEnemy, southRange, unit.xTile, unit.yTile, range, 0, null, null, false, ["south"]);
    this.showAoEAttackTargets(unit, southEnemy, southRange, southSelect, attack, callback);

    // East
    var eastRange = [];
    var eastEnemy = [];
    var eastSelect = [];
    this.checkEnemiesInRange(unit, eastEnemy, eastRange, unit.xTile, unit.yTile, range, 0, null, null, false, ["east"]);
    this.showAoEAttackTargets(unit, eastEnemy, eastRange, eastSelect, attack, callback);

    // West
    var westRange = [];
    var westEnemy = [];
    var westSelect = [];
    this.checkEnemiesInRange(unit, westEnemy, westRange, unit.xTile, unit.yTile, range, 0, null, null, false, ["west"]);
    this.showAoEAttackTargets(unit, westEnemy, westRange, westSelect, attack, callback);

    this._aoeSelection = [...northSelect, ...southSelect, ...eastSelect, ...westSelect];
  }

  //---------------
  // DESCRIPTION: Shows attack range for AoE Cone attacks and allows for attacking
  // PARAMS:
  //  unit   (I,REQ) - Attacking unit
  //  range  (I,REQ) - Range of attack
  //  attack (I,REQ) - Attack that has an "effect" function that accepts the user and targets
  //  callback (I,OPT) - Code to run after attack happens
  //---------------
  showAoEconeRange(unit, range, attack, callback) {
    for (const select of this._aoeSelection) { select.destroy(); }
    this._aoeSelection.length = 0;

    // Sound and cursor fix
    this._sounds.selectMenu.play();
    defaultCursor();
    this._attacker = unit;
    this._pauseTileHover = false;
    this._enemyList.length = 0;

    // North
    var northRange = [];
    var northEnemy = [];
    var northSelect = [];
    var northVisited = [];
    this.checkEnemiesInRange(unit, northEnemy, northRange, unit.xTile, unit.yTile, 2, 0, null, northVisited, false, ["north"]);
    this.checkEnemiesInRange(unit, northEnemy, northRange, (unit.xTile - 2), (unit.yTile - 2), 2, 0, null, northVisited, false, ["east"]);
    this.checkEnemiesInRange(unit, northEnemy, northRange, (unit.xTile + 2), (unit.yTile - 2), 2, 0, null, northVisited, false, ["west"]);
    this.showAoEAttackTargets(unit, northEnemy, northRange, northSelect, attack, callback);

    // South
    var southRange = [];
    var southEnemy = [];
    var southSelect = [];
    var southVisited = [];
    this.checkEnemiesInRange(unit, southEnemy, southRange, unit.xTile, unit.yTile, 2, 0, null, southVisited, false, ["south"]);
    this.checkEnemiesInRange(unit, southEnemy, southRange, (unit.xTile - 2), (unit.yTile + 2), 2, 0, null, southVisited, false, ["east"]);
    this.checkEnemiesInRange(unit, southEnemy, southRange, (unit.xTile + 2), (unit.yTile + 2), 2, 0, null, southVisited, false, ["west"]);
    this.showAoEAttackTargets(unit, southEnemy, southRange, southSelect, attack, callback);

    // East
    var eastRange = [];
    var eastEnemy = [];
    var eastSelect = [];
    var eastVisited = [];
    this.checkEnemiesInRange(unit, eastEnemy, eastRange, unit.xTile, unit.yTile, 2, 0, null, eastVisited, false, ["east"]);
    this.checkEnemiesInRange(unit, eastEnemy, eastRange, (unit.xTile + 2), (unit.yTile + 2), 2, 0, null, eastVisited, false, ["north"]);
    this.checkEnemiesInRange(unit, eastEnemy, eastRange, (unit.xTile + 2), (unit.yTile - 2), 2, 0, null, eastVisited, false, ["south"]);
    this.showAoEAttackTargets(unit, eastEnemy, eastRange, eastSelect, attack, callback);

    // West
    var westRange = [];
    var westEnemy = [];
    var westSelect = [];
    var westVisited = [];
    this.checkEnemiesInRange(unit, westEnemy, westRange, unit.xTile, unit.yTile, 2, 0, null, westVisited, false, ["west"]);
    this.checkEnemiesInRange(unit, westEnemy, westRange, (unit.xTile - 2), (unit.yTile + 2), 2, 0, null, westVisited, false, ["north"]);
    this.checkEnemiesInRange(unit, westEnemy, westRange, (unit.xTile - 2), (unit.yTile - 2), 2, 0, null, westVisited, false, ["south"]);
    this.showAoEAttackTargets(unit, westEnemy, westRange, westSelect, attack, callback);

    this._aoeSelection = [...northSelect, ...southSelect, ...eastSelect, ...westSelect];
  }

  //---------------
  // DESCRIPTION: Shows attack range for AoE Burst attacks and allows for attacking
  // PARAMS:
  //  unit   (I,REQ) - Attacking unit
  //  range  (I,REQ) - Range of attack
  //  attack (I,REQ) - Attack that has an "effect" function that accepts the user and targets
  //  callback (I,OPT) - Code to run after attack happens
  //  targetAllies (I,OPT) - If true, target allies instead of enemies
  //  useSound     (I,OPT) - Sound to play when used, if not default
  //---------------
  showAoEburstRange(unit, range, attack, callback, targetAllies, useSound) {
    for (const select of this._aoeSelection) { select.destroy(); }
    this._aoeSelection.length = 0;

    // Sound and cursor fix
    this._sounds.selectMenu.play();
    defaultCursor();
    this._attacker = unit;
    this._pauseTileHover = false;
    this._enemyList.length = 0;

    // Range around user
    var aoeRange = [];
    var aoeEnemy = [];
    var aoeSelect = [];

    // If targeting allies, target self too
    if (targetAllies) {
      aoeEnemy.push(unit);
      aoeRange.push([unit.xTile, unit.yTile]);
    }

    this.checkEnemiesInRange(unit, aoeEnemy, aoeRange, unit.xTile, unit.yTile, range, 0, null, null, false, null, targetAllies);
    this.showAoEAttackTargets(unit, aoeEnemy, aoeRange, aoeSelect, attack, callback, targetAllies, useSound);

    this._aoeSelection = [...aoeSelect];
  }

  //---------------
  // DESCRIPTION: Shows attack targets for an AoE attack
  // PARAMS:
  //  unit        (I,REQ) - Attacking unit
  //  enemies     (I,REQ) - Array of enemy units in range
  //  attackRange (I,REQ) - 2D Array of tiles in range
  //  selection   (O,REQ) - Array of selection sprites
  //  attack      (I,REQ) - Attack that has an "effect" function that accepts the user and targets
  //  callback    (I,OPT) - Code to run after attack happens
  //  targetAllies (I,OPT) - If true, target allies instead of enemies
  //  useSound     (I,OPT) - Sound to play when used, if not default
  //---------------
  showAoEAttackTargets(unit, enemies, attackRange, selection, attack, callback, targetAllies, useSound) {
    var selectionSprite = "selection-red";

    // Ally targeting
    if (targetAllies) {
      selectionSprite = "selection-green";
    }


    // Show attack range
    for (var i = 0; i < attackRange.length; i++) {
      var x = attackRange[i][0];
      var y = attackRange[i][1];
      var xPos = this.posX(x);
      var yPos = this.posY(y);

      var sprite = this._game.add.sprite(xPos, yPos, selectionSprite);
      sprite.setOrigin(0, 0);
      sprite.setDisplaySize(this._tileSize, this._tileSize);
      sprite.depth = 15;
      sprite.alpha = .7;

      sprite.setInteractive( useHandCursor() );

      if (enemies.length > 0) {
        this.setAoEPointerDown(sprite, unit, enemies, attack, callback, useSound);
      }

      sprite.on('pointerover', function (pointer) {
        for (const select of selection) { select.tint = 0xaaaaaa; }
      } );
      sprite.on('pointerout',  function (pointer) {
        for (const select of selection) { select.tint = 0xffffff; }
      } );

      selection.push(sprite);
    }
  }
  setAoEPointerDown(sprite, unit, enemies, attack, callback, useSound) {
    sprite.on('pointerdown', (pointer) => { if (!pointer.rightButtonDown()) {
      for (const select of this._aoeSelection) { select.destroy(); }
      this._aoeSelection.length = 0;

      attack.effect(this, unit, enemies, useSound);
      if (callback) { callback(); }
    } });
  }

  //---------------
  // DESCRIPTION: Creates a button for unit actions
  // PARAMS:
  //  text     (I,REQ) - Text to display on the button
  //  options (IO,REQ) - Array of all option sprites
  //  textAry (IO,REQ) - Array of all text objects
  //  xPos     (I,REQ) - X position
  //  yPos     (I,REQ) - Y position
  //  depthMod (I,OPT) - Additional depth to add to button
  //  buttonSprite (I,OPT) - Sprite for the button (defaultL "option-box")
  //---------------
  createActionOption(text, options, textAry, xPos, yPos, depthMod, action, buttonSprite) {
    // Button sprite
    buttonSprite = buttonSprite || "option-box";
    var sprite = this._game.add.sprite(xPos, yPos, buttonSprite);
    sprite.setOrigin(0, 0);
    sprite.depth = 20 + depthMod;

    sprite.setInteractive( useHandCursor() );
    sprite.on('pointerover', () => { sprite.tint = 0xbbbbbb; } );
    sprite.on('pointerout',  () => { sprite.tint = 0xffffff; } );

    options.push(sprite);
    var index = options.length - 1;

    // Text
    var style = { font: "16px Optima", fill: "#000" };
    var textObj = this._game.add.text((xPos + 5), (yPos + 5), text, style).setOrigin(0, 0);
    textObj.depth = sprite.depth;
    textAry.push(textObj);

    return index;
  }

  //---------------
  // DESCRIPTION: Shows enemies available for attack and allows attacking
  // PARAMS:
  //  unit        (I,REQ) - Attacking unit
  //  enemies     (O,REQ) - Array of enemy Units that are available targets
  //  attackRange (O,REQ) - A 2D array of X-Y coordinates of the valid attack range tiles:
  //                         (ie: range[ [1,1], [1,2], [2,2] ])
  //  targetAllies (I,OPT) - If true, target allies instead of enemies
  //---------------
  showAttackTargets(unit, enemies, attackRange, targetAllies) {
    var selectionSprite = "selection-red";
    var depth = 1;

    // Sound and cursor fix
    this._sounds.select.play();
    defaultCursor();
    this._attacker = unit;
    this._pauseTileHover = false;

    if (targetAllies) {
      attackRange.push([unit.xTile, unit.yTile]);
      enemies.push(unit);
      selectionSprite = "selection-green";
      depth = 15;
    }

    // Show attack range
    var visited = [];
    var selection = [];
    for (var i = 0; i < attackRange.length; i++) {
      var x = attackRange[i][0];
      var y = attackRange[i][1];
      var xPos = this.posX(x);
      var yPos = this.posY(y);

      var here = x + "-" + y;
      if (visited.includes(here)) { continue; }
      visited.push(here);

      var sprite = this._game.add.sprite(xPos, yPos, selectionSprite);
      sprite.setOrigin(0, 0);
      sprite.setDisplaySize(this._tileSize, this._tileSize);
      sprite.depth = depth;

      if (targetAllies) {
        sprite.setInteractive();
        this.showAttackTargetsHover(sprite, this.getTile(x, y));
        sprite.alpha = 0.7;
      }

      selection.push(sprite);
    }
    this._attackSelection = selection;

    // Hilite enemies
    if (!targetAllies) {
      this.hiliteAttackableEnemies(enemies);
    }
  }
  showAttackTargetsHover(sprite, tile) {
    sprite.on('pointerover', function (pointer) { sprite.tint = 0xaaaaaa; } );
    sprite.on('pointerout',  function (pointer) { sprite.tint = 0xffffff; } );
    sprite.on('pointerdown', (pointer) => { if (!pointer.rightButtonDown()) {
      var tileTarget = tile.unit;

      if (tile.unit && (this._enemyList.includes(tile.unit))) {
        this.useTargetedSkill(this._usingTargetedSkill, tile.unit);
      }
    } });
  }

  //---------------
  // DESCRIPTION: Hilites enemies available for attack
  // PARAMS:
  //  enemies     (O,REQ) - Array of enemy Units that are available targets
  //---------------
  hiliteAttackableEnemies(enemies) {
    for (const enemy of enemies) {
      var xPos;
      var yPos;

      // Structures
      if (enemy.hasOwnProperty("_tileSprite")) {
        xPos = enemy.tileX;
        yPos = enemy.tileY;
      }

      // Enemies
      else {
        var xTile = enemy.xTile;
        var yTile = enemy.yTile;
        xPos = this.posX(xTile);
        yPos = this.posY(yTile);
      }

      var sprite = this._game.add.sprite(xPos, yPos, 'target-red');
      sprite.setOrigin(0, 0);
      sprite.depth = 25;
      sprite.alpha = 0;

      this._enemySelect.push(sprite);
    }

    // Animate fade in/out of selection squares
    this._game.tweens.add({
      targets: this._enemySelect,
      alpha: 1,
      ease: "Power2",
      yoyo: true,
      repeat: -1,
      duration: 1000,
    });
  }

  //---------------
  // DESCRIPTION: Moves and attacks a unit with the currently-selected unit
  // PARAMS:
  //  targetUnit (I,REQ) - Unit to attack
  //  attackAction (I,OPT) - Function to use to attack if different from standard attack
  //---------------
  moveToAttack(targetUnit, attackAction, range, unitsOnly, targetAllies) {
    var attackingUnit = this._attacker;
    if (!attackingUnit) { return; }
    range = range || attackingUnit.attackRange;

    // ==============================
    //   Already in Range
    // ==============================
    var enemyList = [];
    var attackRange = [];

    // If targeting allies, target self too
    if (targetAllies) {
      enemyList.push(attackingUnit);
      attackRange.push([attackingUnit.xTile, attackingUnit.yTile]);
    }

    this.checkEnemiesInRange(attackingUnit, enemyList, attackRange, attackingUnit.xTile, attackingUnit.yTile, range, 0, null, null, unitsOnly, null, targetAllies);

    // Attack normally
    if ((enemyList.includes(targetUnit)) || (attackingUnit == targetUnit)) {
      if (attackAction) { attackAction(); }
      else { this.attack(targetUnit); }
      return;
    }

    // ==============================
    //   Need to Move
    // ==============================
    // Find the tiles that can be attacked from
    // These are the possible spots to move to
    enemyList.length = 0;
    attackRange.length = 0;
    this.checkEnemiesInRange(attackingUnit, enemyList, attackRange, targetUnit.xTile, targetUnit.yTile, range, 0, null, null, unitsOnly, null, targetAllies);

    var path = this.getPathtoAttack(attackingUnit, attackRange, attackingUnit.xTile, attackingUnit.yTile, targetUnit.xTile, targetUnit.yTile, attackingUnit.movement);
    var moveX = path[path.length - 1][0];
    var moveY = path[path.length - 1][1];

    // Clear selection and enemy list early
    for (const select of this._selection) { select.destroy(); }
    this._selection.length = 0;

    this._enemyList.length = 0;
    for (const enemySelect of this._enemySelect) { enemySelect.destroy(); }
    this._enemySelect.length = 0;
    for (const attackSelect of this._attackSelection) { attackSelect.destroy(); }
    this._attackSelection.length = 0;

    // Move then attack
    this.moveUnit(attackingUnit, moveX, moveY, path, () => {
      if (attackAction) { attackAction(); }
      else { this.attack(targetUnit); }
    }, 0);
  }

  //---------------
  // DESCRIPTION: Attacks a unit with the currently-selected unit's skill
  // PARAMS:
  //  skill      (I,REQ) - Skill being used
  //  targetUnit (I,REQ) - Unit to attack
  //---------------
  useTargetedSkill(skill, targetUnit) {
    var attackingUnit = this._attacker;
    if (!attackingUnit) { return; }
    if (!skill)         { return; }
    if (!targetUnit)    { return; }

    // Use the skill
    if (!targetUnit.isEnemy(attackingUnit)) {
      this._sounds.heal.play();
    }
    else {
      this._sounds.skillUseDmg.play();
    }
    skill.curTurn = skill.cooldown;
    skill.effect(this, attackingUnit, [targetUnit]);

    // Clear enemy list
    this._enemyList.length = 0;
    for (const enemySelect of this._enemySelect) { enemySelect.destroy(); }
    this._enemySelect.length = 0;
    for (const attackSelect of this._attackSelection) { attackSelect.destroy(); }
    this._attackSelection.length = 0;
    this._attackNeedsMovement = false;
    this._usingTargetedSkill = null;
    this._usingTargetedNP = null;

    // Attacking unit is done
    this.waitUnit(attackingUnit, true);
  }

  //---------------
  // DESCRIPTION: Attacks a unit with the currently-selected unit's NP
  // PARAMS:
  //  noblePhantasm (I,REQ) - NP being used
  //  targetUnit    (I,REQ) - Unit to attack
  //---------------
  useTargetedNP(noblePhantasm, targetUnit) {
    var attackingUnit = this._attacker;
    if (!attackingUnit) { return; }
    if (!noblePhantasm) { return; }
    if (!targetUnit)    { return; }

    // Use different sound for non-damaging NPs
    var sound;
    if (noblePhantasm.strength == -1) { sound = this._sounds.npUse; }

    // Use the NP
    noblePhantasm.effect(this, attackingUnit, [targetUnit], sound);
    attackingUnit.curCharge = 0;
    attackingUnit.removeStatus(attackingUnit.allStatuses[0]);   // NP ready should always be the first status

    // Clear enemy list
    this._enemyList.length = 0;
    for (const enemySelect of this._enemySelect) { enemySelect.destroy(); }
    this._enemySelect.length = 0;
    for (const attackSelect of this._attackSelection) { attackSelect.destroy(); }
    this._attackSelection.length = 0;
    this._attackNeedsMovement = false;
    this._usingTargetedSkill = null;
    this._usingTargetedNP = null;
  }

  //---------------
  // DESCRIPTION: Attacks a unit with the currently-selected unit
  // PARAMS:
  //  targetUnit (I,REQ) - Unit to attack
  //  modifier   (I,OPT) - Extra modifier for damage. 1 = normal, 2 = 2x, etc. (default: 1)
  //  noSound    (I,OPT) - If true, don't play sound
  //  noWait     (I,OPT) - If true, don't wait unit
  //  ignoreDef  (I,OPT) - If true, ignore defense buffs
  // RETURNS: Amount of damage dealth
  //---------------
  attack(targetUnit, modifier, noSound, noWait, ignoreDef) {
    var attackingUnit = this._attacker;
    if (!attackingUnit) { return null; }
    modifier = modifier || 1;

    // Attacking units lose hidden status
    var hiddenStatus = attackingUnit.getStatus("Presence Concealment");
    if (hiddenStatus) {
      // Increase attack for certain skills
      var skill = attackingUnit.getActiveSkill("Murderer of the Misty Night")
      if (skill) { modifier += 0.4; }

      attackingUnit.alphaShow();
      attackingUnit.removeStatus(hiddenStatus);
    }
    var disguiseStatus = attackingUnit.getStatus("Disguise");
    if (disguiseStatus) { attackingUnit.removeStatus(disguiseStatus); }

    // Get damage amount
    var returnObj = { effective: effectiveEnum.Normal, blocked: false };
    var damage = this.damageCalc(attackingUnit, targetUnit, returnObj, null, modifier, ignoreDef);


    // Handle blocked attacks
    // - Block statuses that have strength are hit-based, so reduce hit count
    if (returnObj.blocked) {
      if (targetUnit.blockStatus.strength > 0) {
        targetUnit.blockStatus.strength--;
        if (targetUnit.blockStatus.strength < 1) { targetUnit.removeStatus(targetUnit.blockStatus); }
      }
    }

    // Damage sound
    if (!noSound) {
      if (returnObj.blocked) { this._sounds.damageMiss.play(); }
      else if (returnObj.effective == effectiveEnum.Strong) { this._sounds.damageEff.play(); }
      else if (returnObj.effective == effectiveEnum.Resist) { this._sounds.damageRes.play(); }
      else { this._sounds.damage.play(); }
    }

    // Damage a structure
    if (targetUnit.hasOwnProperty("_tileSprite")) {
      damage = Math.floor(damage / 1.5);      // Reduce damage amount some
      this.damageStructure(targetUnit, damage, true);
    }

    // Damage another unit
    else {
      // Damage structures target unit is on
      var tile = this.getTile(targetUnit.xTile, targetUnit.yTile);
      damage = Math.floor(damage / 2);        // Reduce damage amount more than usual
      var isDestroyed = this.damageStructure(tile, damage);

      // Damage color
      var damageColor = null;
      if (returnObj.effective == effectiveEnum.Strong) { damageColor = colorPositive(); }
      if (returnObj.effective == effectiveEnum.Resist) { damageColor = colorNegative(); }

      // Damage unit and kill if appropriate
      this.damageUnit(targetUnit, damage, damageColor);
    }

    if (!noWait) {
      // Clear enemy list
      this._enemyList.length = 0;
      for (const enemySelect of this._enemySelect) { enemySelect.destroy(); }
      this._enemySelect.length = 0;
      for (const attackSelect of this._attackSelection) { attackSelect.destroy(); }
      this._attackSelection.length = 0;
      this._attackNeedsMovement = false;
      this._usingTargetedSkill = null;
      this._usingTargetedNP = null;

      // Fifth Form
      var fifthForm = attackingUnit.getStatus("Fifth Form");
      if (fifthForm && (modifier <= 1)) {
        // Remove status and attack again
        this._game.time.delayedCall(1000, () => {
          attackingUnit.removeStatus(fifthForm);
          attackingUnit.increaseNPCharge(2);
          this.attack(targetUnit, modifier, noSound, noWait, ignoreDef);
        });
        return;
      }

      // Attacking unit is done
      this.waitUnit(attackingUnit, true);
    }

    return damage;
  }

  //---------------
  // DESCRIPTION: Damages a unit, killing it if necessary
  // PARAMS:
  //  targetUnit  (I,REQ) - Unit to damage
  //  damage      (I,REQ) - Calculated damage to deal
  //  damageColor (I,OPT) - Color of damage amount text
  // RETURNS: True if unit was killed
  //---------------
  damageUnit(targetUnit, damage, damageColor) {
    var isDead = targetUnit.damage(damage, damageColor);

    if (isDead) {
      isDead = this.killUnit(targetUnit);
    }

    return isDead;
  }

  //---------------
  // DESCRIPTION: Calculates damage to a unit based on a number of factors
  // PARAMS:
  //  attackingUnit (I,REQ) - Unit attacking
  //  targetUnit    (I,REQ) - Unit to attack
  //  returnObj    (IO,OPT) - Contains various values to return
  //  noRandom      (I,OPT) - If true, damage will not be slightly randomized (default: false)
  //  modifier      (I,OPT) - Extra modifier for damage. 1 = normal, 2 = 2x, etc. (default: 1)
  //  ignoreDef     (I,OPT) - If true, ignore defense buffs
  // RETURNS: Damage to deal
  //---------------
  damageCalc(attackingUnit, targetUnit, returnObj, noRandom, modifier, ignoreDef) {
    var dmgCut;

    // Check for block statuses on the target
    if (this.blockAttack(attackingUnit, targetUnit)) {
      if (returnObj) { returnObj.blocked = true; }
      return 0;
    }

    // The attacker's attack stat is the base
    var damage = attackingUnit.attack;
    damage = Math.ceil(damage / 2);

    modifier = modifier || 1;
    damage = damage * modifier;

    // Attack is between 5% weaker and 5% stronger
    if (!noRandom) {
      var rand = getRandomArbitrary(0.95, 1.05);
      damage = damage * rand;
    }

    // ==============================
    //   Structure
    // ==============================
    if (targetUnit.hasOwnProperty("_tileSprite")) {
      // Structure defense
      var tileModifier = targetUnit.groundDefense;
      damage = damage * (1 - (0.10 * tileModifier));
    }

    // ==============================
    //   Unit
    // ==============================
    else {
      // Unit ranking
      var rankModifier = (rankPower(attackingUnit.rank) - rankPower(targetUnit.rank));
      damage = damage * (1 + (0.05 * rankModifier));

      // Class effectiveness
      var classModifier = classEffectiveness(attackingUnit.unitClass, targetUnit.unitClass);
      if (returnObj) { returnObj.effective = classModifier; }
      damage = damage * classModifier;

      // Trait effectiveness
      var traitModifier = this.traitEffectiveness(attackingUnit, targetUnit);
      damage = damage * traitModifier;

      // Status effects
      var defenseStatuses = [];
      if (ignoreDef) {
        for (const status of targetUnit.defenseStatuses) {
          if (status.buffType != buffTypeEnum.Buff) { defenseStatuses.push(status); }
        }
      }
      else {
        defenseStatuses = [...targetUnit.defenseStatuses];
      }

      var statusModifier = this.checkDamageStatuses(attackingUnit.attackStatuses, defenseStatuses, attackingUnit, targetUnit);
      damage = damage * statusModifier;

      // Target's tile defense
      if (targetUnit.moveType == moveTypeEnum.Ground) {
        var tile = this.getTile(targetUnit.xTile, targetUnit.yTile);
        var tileModifier = tile.groundDefense;
        damage = damage * (1 - (0.10 * tileModifier));
      }

      // Damage Cut
      dmgCut = targetUnit.getStatus("Damage Cut");
    }

    // Static Damage Up / Damage Cut
    if (dmgCut) { dmgCut = dmgCut.strength; }
    else { dmgCut = 0; }

    damage += (attackingUnit.dmgAdd - dmgCut);
    if (damage < 0) { damage = 0; }

    return Math.round(damage);
  }

  //---------------
  // DESCRIPTION: Determines if the attack should be blocked entirely
  // PARAMS:
  //  attackingUnit (I,REQ) - Unit attacking
  //  targetUnit    (I,REQ) - Unit being attacked
  // RETURNS: True if attack is blocked; otherwise false
  //---------------
  blockAttack(attackingUnit, targetUnit) {
    var targetBlock = targetUnit.blockStatus;

    // No blocking buffs
    if (!targetBlock) { return false; }

    // Evasion
    if ((targetBlock.name == "Evasion") && (attackingUnit.hasStatus("Sure Hit"))) {
      return false;
    }

    // Invincible
    if ((targetBlock.name == "Invincible") && (attackingUnit.hasStatus("Pierce Invincible"))) {
      return false;
    }

    // Not blocked
    return true;
  }

  //---------------
  // DESCRIPTION: Determines modifier based on traits
  // PARAMS:
  //  attackingUnit (I,REQ) - Unit attacking
  //  targetUnit    (I,REQ) - Unit being attacked
  // RETURNS: Trait damage modifier (1 = normal, etc.)
  //---------------
  traitEffectiveness(attackingUnit, targetUnit) {
    var traitList = targetUnit.traits;
    var totalMod = 1;

    for (const trait of traitList) {
      var status = attackingUnit.getStatus("Damage Up (" + trait + ")");
      if (!status) { continue; }

      totalMod += (status.strength / 100);
    }

    return totalMod;
  }

  //---------------
  // DESCRIPTION: Determines overall attack/defense modifiers between the attacking and target units
  // PARAMS:
  //  attackStatuses  (I,REQ) - Array of attack statuses the attacking unit has
  //  defenseStatuses (I,REQ) - Array of defense statuses the defending unit has
  //  attackingUnit   (I,REQ) - Attacking unit
  //  targetUnit      (I,REQ) - Target unit
  // RETURNS: A damage modifier to apply to the damage
  //---------------
  checkDamageStatuses(attackStatuses, defenseStatuses, attackingUnit, targetUnit) {
    var attackMod = 1;
    var defenseMod = 1;

    // Attack
    if (attackStatuses.length > 0) {
      for (const status of attackStatuses) {
        attackMod = attackMod + (status.strength / 100);
      }
    }

    // Defense
    if (defenseStatuses.length > 0) {
      for (const status of defenseStatuses) {
        defenseMod = defenseMod + (status.strength / 100);
      }
    }

    // Fortress Attack Up
    if (attackingUnit.hasPassiveSkill("Territory Creation (Concert)")) {
      var tile = this.getTile(attackingUnit.xTile, attackingUnit.yTile);
      if (tile.image.indexOf("fortress") > -1) {
        attackMod += 0.15;
      }
    }

    // Teamwork (attacker)
    var skill = attackingUnit.getPassiveSkill("Teamwork");
    if (skill) {
      if (this.unitIsNearby(attackingUnit, skill.range, 3)) {
        attackMod += 0.15;
      }
    }
    // Teamwork (target)
    skill = targetUnit.getPassiveSkill("Teamwork");
    if (skill) {
      if (this.unitIsNearby(targetUnit, skill.range, 3)) {
        defenseMod += 0.15;
      }
    }

    return (1 + attackMod - defenseMod);
  }

  //---------------
  // DESCRIPTION: Removes a defeated unit and its sprites from the map
  // PARAMS:
  //  unit   (I,REQ) - Unit to kill
  //  silent (I,OPT) - If true, no animation or sound
  // RETURNS: True if unit died; otherwise false
  //---------------
  killUnit(unit,silent) {

    // Check Guts
    if (!silent) {
      var gutsStatus = unit.getStatus("Guts");
      if (gutsStatus) {
        // Skill sound
        this._sounds.skillUse.play();

        // Restore to 1/4th HP
        unit.curHP = Math.floor(unit.maxHP / 4);
        unit.updateHP(unit.curHP);
        unit.floatUnitText("Guts", colorPositive(), 500, 3, 500);

        // Remove 1 Guts
        if (gutsStatus.strength > 0) {
          gutsStatus.strength--;
          if (gutsStatus.strength < 1) { unit.removeStatus(gutsStatus); }
        }

        return false;
      }
    }

    // Remove from map
    this.removeUnit(unit);
    this.removeActiveUnit(unit);
    this.getTile(unit.xTile, unit.yTile).unit = null;

    // Destroy unit
    unit.kill(silent);

    if (silent) { return true; }

    this._sounds.death.play();
    this._noActionMenu = true;
    this._game.time.delayedCall(100, () => { this._noActionMenu = false; });  // Prevent empty tile selection from triggering

    // Figure out if that was the last enemy of a faction
    var faction = unit.faction;
    var factionStillExists = false;

    // Go through all map units
    for (const bankUnit of this._unitBank) {
      var bankFaction = bankUnit.faction;
      if (bankFaction == faction) {
        factionStillExists = true;
        break;
      }
    }

    // If the faction's units are all RIP
    if (!factionStillExists) {
      this.removeFaction(faction);

      // Are the remaining factions all allies?
      var firstFaction = this._factions[0];
      var allAllies = true;

      for (const remainingFaction of this._factions) {
        if (!firstFaction.isAlly(remainingFaction)) {
          allAllies = false;
        }
      }

      // The only remaining factions are allies with each other
      // Don't end the game if it's already ended (ie: Arash)
      if (allAllies && (this._factionIndex > -1)) {
        this.endGame();
      }
    }

    return true;
  }

  //---------------
  // DESCRIPTION: Determines if two units are near each other
  // PARAMS:
  //  unit       (I,REQ) - Unit to compare with
  //  targetName (I,REQ) - Name of other unit to look for
  //  distance   (I,REQ) - # of tiles away that counds as nearby (default: 3)
  // RETURNS: True of unit is nearby, otherwise false
  //---------------
  unitIsNearby(unit, targetName, distance) {
    if (!unit) { return false; }
    if (!targetName) { return false; }
    distance = distance || 3;

    // Find unit in bank
    var foundUnit = null;
    for (const bankUnit of this._unitBank) {
      if (unit.isEnemy(bankUnit)) { continue; }
      if (bankUnit.name != targetName) { continue; }

      foundUnit = bankUnit;
      break;
    }

    if (!foundUnit) { return false; }

    // Found unit
    var unitDistance = xyDistance({x: unit.xTile, y: unit.yTile}, {x: foundUnit.xTile, y: foundUnit.yTile});
    if (!unitDistance) { return false; }

    return (unitDistance <= distance);
  }

  //---------------
  // DESCRIPTION: Moves a unit to the specified space
  // PARAMS:
  //  unit (I,REQ) - Selected unit
  //  x    (I,REQ) - Xth tile of selected space
  //  y    (I,REQ) - Yth tile of selected space
  //  path (I,OPT) - Path to move through if already calculated (default: shows unit actions)
  //  hold (I,OPT) - Amount to hold after the last step is made (default: 0)
  //---------------
  moveUnit(unit, x, y, path, callBack, hold) {
    // Figure out how to get to the space
    if ((!path) || (path.length == 0)) {
      path = this.getPathtoSpace(unit, unit.xTile, unit.yTile, x, y, unit.movement);
    }

    // If already there, don't move
    if ((unit.xTile == x) && (unit.yTile == y)) {
      if (callBack) { callBack(); }
      else { this.showUnitActions(unit); }
      return;
    }


    // Clear unit from tile and set on target tile
    this.getTile(unit.xTile, unit.yTile).unit = null;
    this.getTile(x, y).unit = unit;
    this._selectedOrigX = unit.xTile;
    this._selectedOrigY = unit.yTile;

    // Set new location on unit
    unit.xTile = parseInt(x);
    unit.yTile = parseInt(y);

    // Animate each step of the path & mark unit as done when done
    var timeline = this._game.tweens.createTimeline();
    timeline.callbacks = { onComplete: { func: () => {
      this._game.input.enabled = true;
      unit.addAnimation(this.posY(y));

      if (callBack) { callBack(); }
      else { this.showUnitActions(unit); }
    } } };

    var spriteTargets = [ unit.sprite ];
    for (const sprite of unit.spriteUI) { spriteTargets.push(sprite); }

    var holdTime = 0;
    for (var i = 0; i < path.length; i++) {
      if ((hold > 0) && (i == (path.length - 1))) { holdTime = hold; }

      timeline.add( {
        targets: spriteTargets,
        x: this.posX(path[i][0]),
        y: this.posY(path[i][1]),
        ease: "Linear",
        duration: 200,
        hold: holdTime,
      } );
    }

    // Disable input while playing
    this._game.input.enabled = false;
    unit.anim.stop();
    timeline.play();
  }

  //---------------
  // DESCRIPTION: Finds the path from one tile to another
  // PARAMS:
  //  unit   (I,REQ) - Selected unit
  //  startX (I,REQ) - Starting X tile
  //  startY (I,REQ) - Starting Y tile
  //  endX   (I,REQ) - Ending X tile
  //  endY   (I,REQ) - Ending Y tile
  //  range  (I,REQ) - Maximum # of tiles to travel
  // RETURNS: A 2D array of single steps to take to the target tile
  //           (ie: path[ [1,1], [1,2], [2,2] ])
  //---------------
  getPathtoSpace(unit, startX, startY, endX, endY, range) {
    var path = [];
    var allPaths = [];
    var shortestPath = [];
    var shortestPathXY = [];

    // From the starting position, find a path to the target tile
    this.checkPathtoSpace(unit, path, startX, startY, endX, endY, range, 0, null, allPaths);

    for (var i = 0; i < allPaths.length; i++) {
      if (shortestPath.length == 0) {
        shortestPath = allPaths[i];
      }
      else if ((allPaths[i].length > 0) && (allPaths[i].length < shortestPath.length)) {
        shortestPath = allPaths[i];
      }
    }

    // Return an XY version of the shortest path
    for (var i = 0; i < shortestPath.length; i++) {
      var split = shortestPath[i].split("-");
      var x = split[0];
      var y = split[1];
      shortestPathXY.push( [x, y] );
    }

    return shortestPathXY;
  }

  //---------------
  // DESCRIPTION: Finds the path from one tile to a spot to attack a unit
  // PARAMS:
  //  unit   (I,REQ) - Selected unit
  //  attackRange (O,REQ) - A 2D array of X-Y coordinates of the valid tiles to attack from:
  //                         (ie: range[ [1,1], [1,2], [2,2] ])
  //  startX (I,REQ) - Starting X tile
  //  startY (I,REQ) - Starting Y tile
  //  endX   (I,REQ) - Ending X tile
  //  endY   (I,REQ) - Ending Y tile
  //  range  (I,REQ) - Maximum # of tiles to travel
  // RETURNS: A 2D array of single steps to take to the target tile
  //           (ie: path[ [1,1], [1,2], [2,2] ])
  //---------------
  getPathtoAttack(unit, attackRange, startX, startY, endX, endY, range) {
    var shortestPathAll = [];
    var shortestPathXY = [];
    var actualShortestPath = [];
    var validAttackRange = [];

    // Remove spaces that are invalid to attack from
    for (var a = 0; a < attackRange.length; a++) {
      var x = attackRange[a][0];
      var y = attackRange[a][1];
      var tile = this.getTile(x, y);

      if (tile.unit) { continue; }
      if (!this.isValidMoveTile(unit, tile)) { continue; }

      var distance = xyDistance({x: x, y: y}, {x: unit.xTile, y: unit.yTile});
      if (distance > range) { continue; }

      validAttackRange.push( [x, y] );
    }

    // For each tile in attack range, find the shortest path to it
    for (var a = 0; a < validAttackRange.length; a++) {
      var x = validAttackRange[a][0];
      var y = validAttackRange[a][1];

      // From the starting position, find a path to the target tile
      var path = [];
      var allPaths = [];
      var shortestPath = [];
      this.checkPathtoSpace(unit, path, startX, startY, x, y, range, 0, null, allPaths);

      for (var i = 0; i < allPaths.length; i++) {
        if (shortestPath.length == 0) {
          shortestPath = allPaths[i];
        }
        else if ((allPaths[i].length > 0) && (allPaths[i].length < shortestPath.length)) {
          shortestPath = allPaths[i];
        }
      }

      // Add this space's shortest path to the list
      shortestPathAll.push(shortestPath);
    }

    // Find the shortest of all paths
    for (var i = 0; i < shortestPathAll.length; i++) {
      if (actualShortestPath.length == 0) {
        actualShortestPath = shortestPathAll[i];
      }
      else if ((shortestPathAll[i].length > 0) && (shortestPathAll[i].length < actualShortestPath.length)) {
        actualShortestPath = shortestPathAll[i];
      }
    }

    // Return an XY version of the shortest path
    for (var i = 0; i < actualShortestPath.length; i++) {
      var split = actualShortestPath[i].split("-");
      var x = split[0];
      var y = split[1];
      shortestPathXY.push( [x, y] );
    }

    return shortestPathXY;
  }

  //---------------
  // DESCRIPTION: Recursively finds a path from start tile to end tile within the range limit
  // PARAMS:
  //  unit       (I,REQ) - Selected unit
  //  path     (IO,REQ) - A 2D array of single steps to take to the target tile
  //                        (ie: path[ [1,1], [1,2], [2,2] ])
  //  x         (I,REQ) - Starting X tile
  //  y         (I,REQ) - Starting Y tile
  //  endX      (I,REQ) - Ending X tile
  //  endY      (I,REQ) - Ending Y tile
  //  range     (I,REQ) - Maximum # of tiles to travel
  //  distance  (I,REQ) - Distance traveled so far
  //  cameFrom  (I,OPT) - Direction the function came from (only used recursively)
  //  allPaths (IO,REQ) - Array of all paths found to the target, in the format:
  //                        allPaths[ "1-2", "2-2" ]
  //  directions (I,OPT) - Array of directions in order of those to check first (default: ["north", "south", "west", "east"])
  // RETURNS: true if found a path to the end, false if found a dead end
  //---------------
  checkPathtoSpace(unit, path, x, y, endX, endY, range, distance, cameFrom, allPaths, directions) {
    // Check if now out of range
    if (distance >= range) {
      path.pop();
      return;
    }

    // Check each direction
    directions = directions || ["north", "south", "west", "east"];
    for (const dir of directions) {
      this.checkDirection("path", unit, x, y, dir, cameFrom, null, null, range, distance, path, allPaths, endX, endY, null, null, directions);
    }

    // Didn't find anything
    path.pop();
  }

  //---------------
  // DESCRIPTION: Gets a unit's movement range
  // PARAMS:
  //  unit (I,REQ) - Unit to select
  // RETURNS: A 2D array of X-Y coordinates of the valid movement range tiles
  //           (ie: range[ [1,1], [1,2], [2,2] ])
  //---------------
  getUnitRange(unit) {
    var unitRange = [];
    var x = unit.xTile;
    var y = unit.yTile;
    var range = unit.movement;

    // Starting from the unit's position, evaluate each tile in range
    this.checkUnitRange(unit, unitRange, x, y, range, 0);

    return unitRange;
  }

  //---------------
  // DESCRIPTION: Gets a unit's attack range for all possible movement spaces
  // PARAMS:
  //  unit      (I,REQ) - Unit to select
  //  unitRange (I,REQ) - A 2D array of X-Y coordinates of the valid movement range tiles
  //                        (ie: range[ [1,1], [1,2], [2,2] ])
  //  unitsOnly (I,OPT) - If true, will not target structures
  //  enemyList (I,OPT) - List of enemies found
  //  atkRange  (I,OPT) - Range of attack/skill (default: unit's attack range)
  //  targetAllies (I,OPT) - If true, target allies
  // RETURNS: A 2D array of X-Y coordinates of the valid attack range tiles
  //           (ie: range[ [1,1], [1,2], [2,2] ])
  //---------------
  getMovementAttackRange(unit, unitRange, unitsOnly, enemyList, atkRange, targetAllies) {
    var attackRange = [];
    var x = unit.xTile;
    var y = unit.yTile;
    var range = unit.movement;
    var unitAtkRange = atkRange || unit.attackRange;
    var visited = [];

    enemyList = enemyList || [];
    enemyList.length = 0;

    // Check range for current spot
    this.checkEnemiesInRange(unit, enemyList, attackRange, unit.xTile, unit.yTile, unitAtkRange, 0, null, visited, unitsOnly, null, targetAllies);

    // And for each movement spot
    for (var i = 0; i < unitRange.length; i++) {
      var x = unitRange[i][0];
      var y = unitRange[i][1];

      this.checkEnemiesInRange(unit, enemyList, attackRange, x, y, unitAtkRange, 0, null, visited, unitsOnly, null, targetAllies);
    }

    // Don't allow unit to attack structures it's standing on
    var validAttackRange = [];
    for (var i = 0; i < attackRange.length; i++) {
      x = attackRange[i][0];
      y = attackRange[i][1];

      if ((x != unit.xTile) || (y != unit.yTile)) {
        validAttackRange.push( [x, y] );
      }
    }

    return validAttackRange;
  }

  //---------------
  // DESCRIPTION: Recursively checks all possible paths in range of a unit
  //               to determine which tiles are in range
  // PARAMS:
  //  unit       (I,REQ) - Selected unit
  //  unitRange (IO,REQ) - A 2D array of X-Y coordinates of the valid movement range tiles:
  //                        (ie: range[ [1,1], [1,2], [2,2] ])
  //  x          (I,REQ) - Current X tile position
  //  y          (I,REQ) - Current Y tile position
  //  range      (I,REQ) - Maximum distance that can be traveled
  //  distance   (I,REQ) - Distance traveled so far
  //  cameFrom   (I,OPT) - Direction the function came from (only used recursively)
  //  visited   (IO,REQ) - Array of X-Y coordinates already recorded in unitRange
  //  directions (I,OPT) - Array of directions in order of those to check first (default: ["north", "south", "west", "east"])
  //  ignoreCost (I,OPT) - If true, ignore movement cost of tiles
  //---------------
  checkUnitRange(unit, unitRange, x, y, range, distance, cameFrom, visited, directions, ignoreCost) {
    // Check if now out of range
    if (distance >= range) {
      return;
    }

    visited = visited || [];

    // Check each direction
    directions = directions || ["north", "south", "west", "east"];
    for (const dir of directions) {
      this.checkDirection("range", unit, x, y, dir,  cameFrom, visited, unitRange, range, distance, null, null, null, null, null, null, directions, null, ignoreCost);
    }

  }

  //---------------
  // DESCRIPTION: Recursively checks all non-blocked tiles in range of a unit
  //               to determine which enemies are in range
  // PARAMS:
  //  unit        (I,REQ) - Unit to check
  //  enemies     (O,REQ) - Array of enemy Units that are available targets
  //  attackRange (O,REQ) - A 2D array of X-Y coordinates of the valid attack range tiles:
  //                         (ie: range[ [1,1], [1,2], [2,2] ])
  //  x           (I,REQ) - Current X tile position
  //  y           (I,REQ) - Current Y tile position
  //  range       (I,REQ) - Maximum distance that can be traveled
  //  distance    (I,REQ) - Distance traveled so far
  //  cameFrom    (I,OPT) - Direction the function came from (only used recursively)
  //  visited    (IO,OPT) - Array of X-Y coordinates already recorded in unitRange
  //  unitsOnly   (I,OPT) - If true, will only target units
  //  directions  (I,OPT) - Array of directions in order of those to check first (default: ["north", "south", "west", "east"])
  //  targetAllies (I,OPT) - If true, target allies instead of enemies
  //---------------
  checkEnemiesInRange(unit, enemies, attackRange, x, y, range, distance, cameFrom, visited, unitsOnly, directions, targetAllies) {
    // Check if now out of range
    if (distance >= range) {
      return;
    }

    visited = visited || [];

    // Check each direction
    directions = directions || ["north", "south", "west", "east"];
    for (const dir of directions) {
      this.checkDirection("attack", unit, x, y, dir, cameFrom, visited, attackRange, range, distance, null, null, null, null, enemies, unitsOnly, directions, targetAllies);
    }
  }

  //---------------
  // DESCRIPTION: Checks a direction for recursive function checkUnitRange
  // PARAMS:
  //  checkType  (I,REQ) - "range" for selection range
  //                       "path" for path to a target
  //                       "attack" for list of enemy units in attack range
  //  unit       (I,REQ) - Selected unit
  //  x          (I,REQ) - X tile position to check
  //  y          (I,REQ) - Y tile position to check
  //  direction  (I,REQ) - Direction to travel in
  //  cameFrom   (I,REQ) - Direction the function came from (only used recursively)
  //  visited   (IO,OPT) - Array of X-Y coordinates already recorded in unitRange
  //  unitRange (IO,OPT) - A 2D array of X-Y coordinates of the valid movement range tiles:
  //                        (ie: range[ [1,1], [1,2], [2,2] ])
  //  range      (I,REQ) - Maximum distance that can be traveled
  //  distance   (I,REQ) - Distance traveled so far
  //  path      (IO,OPT) - A 2D array of single steps to take to the target tile
  //                         (ie: path[ [1,1], [1,2], [2,2] ])
  //  allPaths  (IO,OPT) - Array of all paths found to the target, in the format:
  //                         allPaths[ "1-2", "2-2" ]
  //  endX       (I,OPT) - Ending X tile
  //  endY       (I,OPT) - Ending Y tile
  //  enemies   (IO,OPT) - Array of enemy Units that are available targets
  //  unitsOnly  (I,OPT) - If true, will only target units
  //  directions (I,OPT) - Array of directions in order of those to check first (default: ["north", "south", "west", "east"])
  //  targetAllies (I,OPT) - If true, target allies instead of enemies\
  //  ignoreCost   (I,OPT) - If true, ignore movement cost of tiles
  //---------------
  checkDirection(checkType, unit, x, y, direction, cameFrom, visited, unitRange, range, distance, path, allPaths, endX, endY, enemies, unitsOnly, directions, targetAllies, ignoreCost) {
    // ==============================
    //   Universal Checks
    // ==============================
    // Set tiles based on Direction
    var dirBack;
    var valid = true;
    if      (direction == "north") { y--; dirBack = "south"; valid = (y >= 0); }
    else if (direction == "south") { y++; dirBack = "north"; valid = (y < this._tiles.length); }
    else if (direction == "west")  { x--; dirBack = "east";  valid = (x >= 0); }
    else if (direction == "east")  { x++; dirBack = "west";  valid = (x < this._tiles[0].length); }
    else { return; }

    // Don't go back the way we came
    if (direction == dirBack) { return; }

    // Don't go out of bounds
    if (!valid) { return; }
    if (typeof x == 'undefined') { return; }
    if (typeof y == 'undefined') { return; }

    var tile = this.getTile(x, y);
    if (!tile) { return; }

    // Don't move into unpassable tiles
    // For attacks, use flight movement costs because ranged attacks will technically be "flying"
    if (checkType == "attack") {
      if (tile.flightMoveCost == -1) { return; }
    }
    else {
      if (!this.isValidMoveTile(unit, tile)) { return; }

      // Movement cost
      var moveCost = 0;
      if (unit.moveType == moveTypeEnum.Ground) { moveCost = tile.groundMoveCost; }
      else { moveCost = tile.flightMoveCost; }

      if (!ignoreCost && (moveCost > 0)) {
          distance = distance + moveCost - 1; // Add movement cost while accounting for the standard +1 cost
          if (distance >= range) { return false; }
      }
    }


    // ==============================
    //   Selection Range
    // ==============================
    if (checkType == "range") {
      // Check against visited tiles
      if (visited.includes(x + "-" + y) == false) {
        visited.push(x + "-" + y);

        // Pass through ally-occupied tiles, but don't allow landing on them
        if (!tile.unit) {
          unitRange.push( [x, y] ); // Add to the selection range
        }
      }

      // Go to the next direction
      this.checkUnitRange(unit, unitRange, x, y, range, (distance + 1), direction, visited, directions, ignoreCost);
    }

    // ==============================
    //   Path to Target
    // ==============================
    if (checkType == "path") {
      // Add this step to the path
      path.push( [x, y] );

      // Check if we've reached the target
      if ((x == endX) && (y == endY)) {
        var ary = [];
        for (var i = 0; i < path.length; i++) {
          ary.push(path[i][0] + "-" + path[i][1]);
        }
        allPaths.push(ary);
      }

      // Go to the next direction
      this.checkPathtoSpace(unit, path, x, y, endX, endY, range, (distance + 1), direction, allPaths, directions);
    }

    // ==============================
    //   Attack Range
    // ==============================
    if (checkType == "attack") {
      var foundUnit = tile.unit;


      // If this tile has a damageable enemy structure not on the list, add it
      if ( (!unitsOnly) && (!foundUnit) && (tile.curHP > 0) && tile.faction && (!unit.faction.isAlly(tile.faction))
          && (!enemies.includes(tile))) {
        enemies.push(tile);
      }

      // If this tile has an enemy that isn't on the list, add it
      // - Ignore hidden enemies
      var isTarget;
      if (!foundUnit) { isTarget = false; }
      else if (targetAllies && (foundUnit != unit)) { isTarget = !unit.isEnemy(foundUnit); }
      else { isTarget = unit.isEnemy(foundUnit); }
      if (isTarget && !enemies.includes(foundUnit) && !foundUnit.hasStatus("Presence Concealment")
          && !foundUnit.hasStatus("Disguise")) {
        enemies.push(foundUnit);
      }

      // Check against visited tiles for attack range
      if (visited.includes(x + "-" + y) == false) {
        visited.push(x + "-" + y);
        unitRange.push( [x, y] ); // Add to the selection range
      }

      // Go to the next direction
      this.checkEnemiesInRange(unit, enemies, unitRange, x, y, range, (distance + 1), direction, visited, unitsOnly, directions, targetAllies);
    }
  }

  //---------------
  // DESCRIPTION: Determines if a unit can land on a specific tile
  // PARAMS:
  //  unit (I,OPT) - Unit to check
  //  tile (I,REQ) - Tile to check
  // RETURNS: True if movement to this tile is valid; otherwise 0
  //---------------
  isValidMoveTile(unit, tile) {
    if (unit) {
      // Blocked off tiles
      if ((unit.moveType == moveTypeEnum.Ground) && (tile.groundMoveCost == -1)) { return false; }
      if ((unit.moveType == moveTypeEnum.Flight) && (tile.flightMoveCost == -1)) { return false; }

      // Enemy on tile
      var unitFaction = unit.faction;
      if (tile.unit && !unit.hasPassiveSkill("Shadow") && !unit.hasPassiveSkill("Teleportation")) {
        var otherFaction = tile.unit.faction;
        if (!unitFaction.isAlly(otherFaction)) { return false; }
      }

      // Enemy Structure on tile
      if (tile.maxHP && tile.faction) {
        var otherFaction = tile.faction;
        if (!unitFaction.isAlly(otherFaction)) { return false; }
      }
    }
    else {
      // Not unit/faction specific
      if (tile.groundMoveCost == -1) { return false; }
      if (tile.unit) { return false; }
      if (tile.faction) { return false; }
    }

    return true;
  }

  //---------------
  // DESCRIPTION: Checks the 4 directions adjacent to a tile and returns
  //               the ones that are empty and can support units.
  // PARAMS:
  //  tile (I,REQ) - Tile to check
  // RETURNS: 2D array of available nearby spaces
  //---------------
  nearbySpaces(tile) {
    if (!tile) { return null; }
    var xTile = tile.xTile;
    var yTile = tile.yTile;
    var spaces = [];

    var directions = [
      this.getTile((xTile + 1), (yTile)),
      this.getTile((xTile - 1), (yTile)),
      this.getTile((xTile), (yTile + 1)),
      this.getTile((xTile), (yTile - 1)),
    ];

    for (const dir of directions) {
      if (this.isValidMoveTile(null, dir)) {
        var x = this.tileX(dir.tileX);
        var y = this.tileY(dir.tileY);
        spaces.push([ x, y ]);
      }
    }

    return spaces;
  }

  //---------------
  // DESCRIPTION: Determines X pixel position of a tile
  // PARAMS:
  //  x (I,REQ) - The xth tile to get the position for
  // RETURNS: The top-left pixel value of the xth tile
  //          If out of bounds, returns 0
  //---------------
  posX(x) {
    // Check if out of bounds
    if (x >= this._tiles[0].length) {
      return 0;
    }

    // If valid, return position
    else {
      return this._offsetX + (x * this._tileSize);
    }
  }

  //---------------
  // DESCRIPTION: Determines Y pixel position of a tile
  // PARAMS:
  //  y (I,REQ) - The yth tile to get the position for
  // RETURNS: The top-left pixel value of the yth tile
  //          If out of bounds, returns 0
  //---------------
  posY(y) {
    // Check if out of bounds
    if (y >= this._tiles.length) {
      return 0;
    }

    // If valid, return position
    else {
      return this._offsetY + (y * this._tileSize);
    }
  }

  //---------------
  // DESCRIPTION: Determines Xth tile of a pixel position
  // PARAMS:
  //  x (I,REQ) - The X position to get the tile at
  // RETURNS: The Xth tile
  //---------------
  tileX(x) {
    if (!this._tileSize) { return null; }
    var tile = Math.floor((x / this._tileSize)) - this._offsetX;

    // Check if out of bounds
    if ((tile >= this._tiles[0].length) || tile < 0) {
      return 0;
    }

    return tile;
  }

  //---------------
  // DESCRIPTION: Determines Yth tile of a pixel position
  // PARAMS:
  //  y (I,REQ) - The Y position to get the tile at
  // RETURNS: The Yth tile
  //---------------
  tileY(y) {
    if (!this._tileSize) { return null; }
    var tile = Math.floor((y / this._tileSize)) - this._offsetX;

    // Check if out of bounds
    if ((tile >= this._tiles.length) || tile < 0) {
      return 0;
    }

    return tile;
  }

  //---------------
  // DESCRIPTION: Returns the tile at the given pixel position
  // PARAMS:
  //  x (I,REQ) - X position
  //  y (I,REQ) - Y position
  // RETURNS: Tile object if valid positions given; otherwise null
  //---------------
  tileAtXY(x, y) {
    var xTile = tileX(x);
    var yTile = tileY(y);
    return this.getTile(xTile, yTile);
  }


  // ====================================================================================
  //                                FACTIONS / etc
  // ====================================================================================

  // Faction list
  addFaction(faction) { addElement(faction, this._factions); }
  removeFaction(faction) { removeElement(faction, this._factions); }

  //---------------
  // DESCRIPTION: Sets a newly-added factions color
  // PARAMS:
  //  faction (I,REQ) - Faction to set color for
  //---------------
  setFactionColor(faction) {
    var i = this._factions.indexOf(faction);
    if (i == 0) { faction.color = "#4cc3ff"; }
    else if (i == 1) { faction.color = "#ff4136"; }
    else if (i == 2) { faction.color = "#8fd98c"; }
    else if (i == 3) { faction.color = "#fff68f"; }
  }

  //---------------
  // DESCRIPTION: Adds a faction to the list of players on the map.
  //              Also adds to the list of factions overall if not already there.
  // PARAMS:
  //  faction (I,REQ) - Faction to add
  //---------------
  addPlayerFaction(faction) {
    // Make sure the faction isn't already added
    if (this._playerFactions.includes(faction)) { return; }

    // Add the faction
    this._playerFactions.push(faction);
    this.addFaction(faction);
    this.setFactionColor(faction);
  }

  //---------------
  // DESCRIPTION: Shows debug info on top of the map tiles
  //---------------
  mapDebugInfo() {
    if (!this._debugMap) { return; }

    // For each tile
    for (var y = 0; y < this._tiles.length; y++) {
      for (var x = 0; x < this._tiles[y].length; x++) {
        var xPos = this.posX(x) + (this._tileSize / 2);
        var yPos = this.posY(y) + 20;
        var tile = this.getTile(x, y);

        // Tile coordinates
        var style = { font: "13px Optima", fill: "#fff", fontStyle: "bold" };
        var text = this._game.add.text(xPos, yPos, x + " - " + y, style).setOrigin(0.5, 0.5);
        text.setShadow(1, 1, "#000", 1);
        text.depth = 30;

        // Zone
        if (tile.zone) {
          var fill = "#c1c1c1";
          if (tile.zone == "A") { fill ="#4cc3ff"; }
          else if (tile.zone == "B") { fill ="#ff4136"; }
          else if (tile.zone == "C") { fill ="#8fd98c"; }
          else if (tile.zone == "D") { fill ="#fff68f"; }

          style = { font: "13px Optima", fill: fill, fontStyle: "bold" };
          text = this._game.add.text(xPos, (yPos + 20), "Zone " + tile.zone, style).setOrigin(0.5, 0.5);
          text.setShadow(1, 1, "#000", 1);
          text.depth = 30;
        }

      }
    } // end tile loop

  }

}
