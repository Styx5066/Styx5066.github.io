/*
* HelpTips
*  - Displays a screen showing help info and game tips
*/
class HelpTips {
  //---------------
  // DESCRIPTION: Creates a new HelpTips
  //---------------
  constructor(game, name, bgm, baseTile, tileSize) {
    this._allUI = [];
    this._fadeUI = [];
  }

  //---------------
  // DESCRIPTION: Shows Help/Tips
  // PARAMS:
  //  game          (I,REQ) - Game object
  //  selectSound   (I,REQ) - Sound to play on button click
  //  closeCallback (I,OPT) - Action to perform when unit info is closed
  //  camIgnore     (I,OPT) - Array of objects the scroll camera should ignore
  //---------------
  showHelpTips(game, selectSound, closeCallback, camIgnore, noFadeOut) {
    var depth = 150;

    // ==============================
    //   General UI
    // ==============================
    // Background
    fadeSceneIn(game, 700, null, true);
    var bg = game.add.sprite(0, 0, "blue-dark-bg").setOrigin(0, 0);
    bg.depth = depth;
    bg.setInteractive();
    this._allUI.push(bg);


    // Title bar
    var bar = game.add.image(0, 0, "top-bar").setOrigin(0, 0);
    bar.depth = depth;
    this._allUI.push(bar);

    var nameStyle = { font: "50px FrizQuadrata", fill: "#fff", stroke: "#000", strokeThickness: 1 };
    var nameText = game.add.text(512, 40, " Help / Tips ", nameStyle).setOrigin(0.5, 0.5);
    nameText.setShadow(2, 2, "#000", 2);
    nameText.depth = depth + 10;
    this._allUI.push(nameText);


    // Back button
    var backButton = game.add.image(4, 622, "button-back").setOrigin(0, 1);
    backButton.depth = depth + 10;
    this._allUI.push(backButton);

    var backStyle = { font: "35px Optima", fill: "#2b346d", stroke: "#000", strokeThickness: 1 };
    var backText = game.add.text(84, 591, "Back", backStyle).setOrigin(0.5, 0.5);
    backText.depth = depth + 10;
    this._allUI.push(backText);


    // Portrait
    var portrait = game.add.sprite(200, 0, "Bella_fr-glasses").setOrigin(0.5, 0);
    portrait.depth = depth;
    this._allUI.push(portrait);


    // ==============================
    //   Camera
    // ==============================
    var cameraX = 400;
    var cameraY = 75;
    var cameraWidth = 624;
    var cameraHeight = 551;
    var mapCamera = game.cameras.add(cameraX, cameraY, cameraWidth, cameraHeight);

    cameraX += 1024;
    cameraY += 700;
    mapCamera.useBounds = true;
    mapCamera.setBounds(cameraX, cameraY, cameraWidth, cameraHeight);
    mapCamera.centerOn(cameraX, cameraY);

    if (camIgnore) { mapCamera.ignore(camIgnore); }

    // Camera controls - mouse wheel
    game.input.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
        var mod = deltaY * 10;
        mapCamera.setScroll(0, (mapCamera.worldView.y + mod))
    });


    var xyCoord = { x: (cameraX + 15), y: (cameraY + 15) };
    depth += 2;


    // ==============================
    //   Info Sections
    // ==============================
    this.helpTipsClasses(game, depth, xyCoord);
    mapCamera.setBounds(cameraX, cameraY, cameraWidth, (xyCoord.y - cameraY));

    this.helpTipsControls(game, depth, xyCoord);
    mapCamera.setBounds(cameraX, cameraY, cameraWidth, (xyCoord.y - cameraY));

    this.helpTipsTerrain(game, depth, xyCoord);
    mapCamera.setBounds(cameraX, cameraY, cameraWidth, (xyCoord.y - cameraY));

    this.helpTipsCredits(game, depth, xyCoord);
    mapCamera.setBounds(cameraX, cameraY, cameraWidth, (xyCoord.y - cameraY));


    // Fade in
    game.tweens.add({
      targets: this._fadeUI,
      alpha: 1,
      ease: "Quad.easeIn",
      duration: 500,
      delay: 100,
    });


    // ==============================
    //   Back Button
    // ==============================
    backButton.setInteractive( useHandCursor() );
    backButton.on('pointerdown', (pointer) => { if (!pointer.rightButtonDown()) {
      selectSound.play();

      if (closeCallback) { closeCallback(); }

      // Fade out
      var duration = 500;
      if (noFadeOut) { duration = 0; }
      game.tweens.add({
        targets: this._allUI,
        alpha: 0,
        ease: "Quad.easeOut",
        duration: duration,
        onComplete: () => {
          for (const element of this._allUI) { element.destroy(); }
          game.cameras.remove(mapCamera);
        }
      });

    } } );
    backButton.on('pointerover', function (pointer) { backButton.tint = 0xaaaaaa; } );
    backButton.on('pointerout',  function (pointer) { backButton.tint = 0xffffff; } );
  }

  //---------------
  // DESCRIPTION: Adds text
  //---------------
  helpTipsAddText(game, textIn, depth, xPos, yPos, fill, shadow, fontSize, fontFamily, originX, originY) {
    fontFamily = fontFamily || "Optima";
    var style = { font: "20px " + fontFamily, fill: "#fff", fontStyle: "bold" };

    if (Array.isArray(textIn)) { textIn = textIn.join("\n"); }
    var text = game.add.text(xPos, yPos, textIn + " ", style);
    text.depth = depth;

    originX = originX || 0;
    originY = originY || 0;
    text.setOrigin(originX, originY);

    if (fill) { text.setFill(fill); }
    if (fontSize) { text.setFontSize(fontSize); }
    if (shadow > 0) { text.setShadow(shadow, shadow, "#000", shadow); }

    this._allUI.push(text);
    text.alpha = 0;
    this._fadeUI.push(text);

    return text;
  }

  //---------------
  // DESCRIPTION: Adds image
  //---------------
  helpTipsAddImage(game, image, depth, xPos, yPos, originX, originY) {
    var sprite = game.add.image(xPos, yPos, image);
    sprite.depth = depth;

    originX = originX || 0;
    originY = originY || 0;
    sprite.setOrigin(originX, originY);

    this._allUI.push(sprite);
    sprite.alpha = 0;
    this._fadeUI.push(sprite);

    return sprite;
  }

  //---------------
  // DESCRIPTION: Adds a shaded section
  //---------------
  helpTipsAddSection(game, title, depth, xyCoord, endY) {
    var xPos = xyCoord.x;
    var startY = xyCoord.y;
    depth--;

    // Bar
    var sectionBar = game.add.sprite(xPos, startY, "unit-info-bar").setOrigin(0, 0);
    sectionBar.depth = depth;
    this._allUI.push(sectionBar);
    sectionBar.alpha = 0;
    this._fadeUI.push(sectionBar);

    // Title text
    var style = { font: "18px Optima", fill: "#2b346d", stroke: "#000", strokeThickness: 1 };
    var text = game.add.text((xPos + 9), (startY + 3), title, style).setOrigin(0, 0);
    text.depth = depth;
    this._allUI.push(text);
    text.alpha = 0;
    this._fadeUI.push(text);

    // Shading
    var shadow = game.add.graphics();
    shadow.fillStyle(0x000000, 0.5);
    shadow = shadow.fillRoundedRect(xPos, (startY + 9), sectionBar.displayWidth, (endY - startY), 8);
    this._allUI.push(shadow);
    shadow.alpha = 0;
    this._fadeUI.push(shadow);

    // Camera updates
    xyCoord.y = endY + 20;
  }

  // ==============================================================================

  //---------------
  // DESCRIPTION: Shows info on class effectiveness
  //---------------
  helpTipsClasses(game, depth, xyCoord) {
    var xIcon = xyCoord.x + 34;
    var xText = xIcon + 32;
    var xLabel = xyCoord.x + 25;
    var xValue = xLabel + 140;
    var yPos = xyCoord.y + 45;

    var labelFill = "#c1c1c1";
    var valueFill = "#fff";

    // ----------

    // Image
    this.helpTipsAddImage(game, "class-effectiveness", depth, xIcon, yPos, 0, 0);

    // Text
    this.helpTipsAddText(game, "Not Effective", depth, xText, (yPos + 250), valueFill, 2, 14);
    this.helpTipsAddText(game, "Effective", depth, xText, (yPos + 270), valueFill, 2, 14);
    yPos += 286;
    yPos += 25;

    // Class
    this.helpTipsAddText(game, "Class", depth, xLabel, yPos, valueFill, 2);
    this.helpTipsAddText(game, ["Effective Class attacks deal 2x damage.",
                                "Not Efffective Class attacks deal 0.5x damage."], depth, xValue, yPos, labelFill, 2, 16);
    yPos += 50;

    // Rank
    this.helpTipsAddText(game, "Gold Units", depth, xLabel, yPos, rankToColor(rankEnum.Gold), 2);
    this.helpTipsAddText(game, ["Deal 10% more damage against Silver units.",
                                "Deal 20% more damage against Bronze units."], depth, xValue, yPos, labelFill, 2, 16);
    yPos += 50;

    this.helpTipsAddText(game, "Silver Units", depth, xLabel, yPos, rankToColor(rankEnum.Silver), 2);
    this.helpTipsAddText(game, ["Deal 10% less damage against Gold units.",
                                "Deal 10% more damage against Bronze units."], depth, xValue, yPos, labelFill, 2, 16);
    yPos += 50;

    this.helpTipsAddText(game, "Bronze Units", depth, xLabel, yPos, rankToColor(rankEnum.Bronze), 2);
    this.helpTipsAddText(game, ["Deal 20% less damage against Gold units.",
                                "Deal 10% less damage against Silver units."], depth, xValue, yPos, labelFill, 2, 16);
    yPos += 50;

    // ----------


    this.helpTipsAddSection(game, "Class Effectiveness", depth, xyCoord, yPos);
  }

  //---------------
  // DESCRIPTION: Shows info on game controls
  //---------------
  helpTipsControls(game, depth, xyCoord) {
    var xLabel = xyCoord.x + 25;
    var xValue = xLabel + 140;
    var yPos = xyCoord.y + 40;

    var labelFill = "#c1c1c1";
    var valueFill = "#fff";

    // ----------

    // Left Click
    var label = this.helpTipsAddText(game, "Left Click", depth, xLabel, yPos, valueFill, 2);
    var text = this.helpTipsAddText(game, [
      "[On Servant] Selects Servant",
      "[When attacking] Attacks enemy",
      "[On empty terrain] Opens menu",
    ], depth, xValue, yPos, labelFill, 2, 16);
    text.setWordWrapWidth(395);
    yPos += Math.max(label.displayHeight, text.displayHeight);
    yPos += 16;

    // Right Click
    label = this.helpTipsAddText(game, "Right Click", depth, xLabel, yPos, valueFill, 2);
    text = this.helpTipsAddText(game, [
      "[Servant selected] Cancels Selection",
      "[During turn transition] Skips turn transition animation",
    ], depth, xValue, yPos, labelFill, 2, 16);
    text.setWordWrapWidth(395);
    yPos += Math.max(label.displayHeight, text.displayHeight);
    yPos += 16;

    // WASD
    label = this.helpTipsAddText(game, "W A S D", depth, xLabel, yPos, valueFill, 2);
    text = this.helpTipsAddText(game, [
      "Scrolls battle map",
    ], depth, xValue, yPos, labelFill, 2, 16);
    text.setWordWrapWidth(395);
    yPos += Math.max(label.displayHeight, text.displayHeight);
    yPos += 16;

    // Tab
    label = this.helpTipsAddText(game, "Tab", depth, xLabel, yPos, valueFill, 2);
    text = this.helpTipsAddText(game, [
      "Scroll battle map to next active unit",
    ], depth, xValue, yPos, labelFill, 2, 16);
    text.setWordWrapWidth(395);
    yPos += Math.max(label.displayHeight, text.displayHeight);
    yPos += 16;

    // ----------

    this.helpTipsAddSection(game, "Controls", depth, xyCoord, yPos);
  }

  //---------------
  // DESCRIPTION: Shows info on map terrain
  //---------------
  helpTipsTerrain(game, depth, xyCoord) {
    var xIcon = xyCoord.x + 25;
    var xText = xIcon + 80;
    var yPos = xyCoord.y + 45;

    var labelFill = "#c1c1c1";
    var valueFill = "#fff";

    // ----------

    // Set up tiles
    var tiles = [
      { name: "Plains",   tileObj: Grass(), info: "Grassy fields that are easy to traverse but provide little cover." },
      { name: "Forest",   tileObj: Forest(), info: "Wooded areas that provide good protection." },
      { name: "Mountain", tileObj: Mountain(), info: "Very difficult to cross, but exremely defensive." },
      { name: "Road",     tileObj: Path(), info: "Paved roads that provide no cover at all." },
      { name: "Wall",     tileObj: Wall(), info: "Unpassable by units, but does not block ranged attacks." },
      { name: "Stone Ground", tileObj: Stone(), info: "Paved ground usually found indoors." },

      { name: "River",  tileObj: River(), info: "Difficult to cross and provides a disadvantage to defense." },
      { name: "Sea",    tileObj: Ocean(), info: "Deep water that units are unable to cross." },
      { name: "Bridge", tileObj: BridgeOverOcean(), info: "Pathways that allow units to cross bodies of water." },

      { name: "Ley Line", tileObj: LeyLine(), info: ["Small settlements that have sprung up around a Ley Line.",
               "Heals units occupying the Ley Line by 10% of their Max HP each turn.",
               "However, taking damage while on a Ley Line also damages the structure itself.",
               "When destroyed, turns into Ruins that provide less defense and no healing."] },
      { name: "Fortress", tileObj: Fortress(), info: ["Defensive structure that can be claimed by units when they end their turn on the Fortress.",
               "Once claimed, enemies cannot pass through the Fortress or claim it themselves.",
               "When destroyed, turns into Ruins that provide less defense and do not block enemies."] },
      { name: "Workshop", tileObj: Workshop(), info: ["A magic workshop that is able to spawn non-Servant units by constructing or summoning them to the battlefield.",
              "Mana is needed to spawn units, and generates at a rate of 50 mana per workshop each turn.",
              "When destroyed, turns into Ruins that is unable to spawn units."] },
      { name: "Ruins",    tileObj: RuinsLeyLine(), info: ["Ruins of a structure that was destroyed.",
               "Provides some defense, but has no other special behavior."] },
    ];

    // Go through each tile
    for (const tile of tiles) {
      var tileObj = tile.tileObj;
      var info = tile.info;
      var origY = yPos;

      // Image
      var image = tileObj.image;
      if (image.indexOf("-") != -1) { image = image.substr(0, image.indexOf("-")); }
      if (tileObj.overImage) { image = tileObj.overImage; }
      var icon = this.helpTipsAddImage(game, image, depth, xIcon, yPos, 0, 0);

      // Name
      var name = this.helpTipsAddText(game, tile.name, depth, xText, yPos, valueFill, 2);
      yPos += 25;

      if (tileObj.groundMoveCost != -1) {
        // Defense
        var defense = tileObj.groundDefense * 10;
        if (defense >= 0) { defense = "+" + defense; }
        this.helpTipsAddText(game, "Defense: ", depth, xText, yPos, labelFill, 2, 16);
        this.helpTipsAddText(game, defense + "%", depth, (xText + 80), yPos, valueFill, 2, 16);

        // Movement Cost
        this.helpTipsAddText(game, "Movement Cost: ", depth, (xText + 150), yPos, labelFill, 2, 16);
        this.helpTipsAddText(game, tileObj.groundMoveCost, depth, (xText + 285), yPos, valueFill, 2, 16);

        yPos += 21;
      }

      // Description
      if (info) {
        var text = this.helpTipsAddText(game, info, depth, xText, yPos, labelFill, 2, 16);
        text.setWordWrapWidth(455);

        if (text.displayHeight > 15) {
          yPos += text.displayHeight + 15;
        }
        else {
          yPos += 15;
        }
      }

      var yDiff = 85 - (yPos - origY);
      if (yDiff > 0) { yPos += yDiff; }
    }

    // ----------

    this.helpTipsAddSection(game, "Terrain", depth, xyCoord, yPos);
  }

  // DESCRIPTION: Shows game credits
  //---------------
  helpTipsCredits(game, depth, xyCoord) {
    var xPos = xyCoord.x + 25;
    var yPos = xyCoord.y + 40;

    var labelFill = "#c1c1c1";
    var valueFill = "#fff";

    var title, text, etc;

    // ----------

    // FGO
    title = this.helpTipsAddText(game, "Fate/Grand Order", depth, xPos, yPos, valueFill, 2);
    title.setWordWrapWidth(520);
    yPos += 25;

    text = this.helpTipsAddText(game, [
      "Inspiration, characters, UI, music, sounds, and other assets",
    ], depth, xPos, yPos, labelFill, 2, 16);
    text.setWordWrapWidth(520);
    yPos += text.displayHeight + 8;

    etc = this.helpTipsAddText(game, [
      "https://www.fate-go.jp/",
      "https://fate-go.us/"
    ], depth, xPos, yPos, labelFill, 2, 16);
    etc.setWordWrapWidth(520);
    yPos += etc.displayHeight + 25;

    // Advance Wars
    title = this.helpTipsAddText(game, "Advance Wars Series", depth, xPos, yPos, valueFill, 2);
    title.setWordWrapWidth(520);
    yPos += 25;
    title = this.helpTipsAddText(game, "Wargroove", depth, xPos, yPos, valueFill, 2);
    title.setWordWrapWidth(520);
    yPos += 25;

    text = this.helpTipsAddText(game, [
      "Gameplay inspiration, tiles, sounds, and other assets",
    ], depth, xPos, yPos, labelFill, 2, 16);
    text.setWordWrapWidth(520);
    yPos += text.displayHeight + 8;

    etc = this.helpTipsAddText(game, [
      "https://wargroove.com/",
    ], depth, xPos, yPos, labelFill, 2, 16);
    etc.setWordWrapWidth(520);
    yPos += etc.displayHeight + 25;

    // Wiki
    title = this.helpTipsAddText(game, "Fate/Grand Order Wikia", depth, xPos, yPos, valueFill, 2);
    title.setWordWrapWidth(520);
    yPos += 25;

    text = this.helpTipsAddText(game, [
      "Servant Info, Servant Dialogue, and Status Effect icons",
    ], depth, xPos, yPos, labelFill, 2, 16);
    text.setWordWrapWidth(520);
    yPos += text.displayHeight + 8;

    etc = this.helpTipsAddText(game, [
      "https://fategrandorder.fandom.com",
    ], depth, xPos, yPos, labelFill, 2, 16);
    etc.setWordWrapWidth(520);
    yPos += etc.displayHeight + 25;

    // Cursor
    title = this.helpTipsAddText(game, "Sirea", depth, xPos, yPos, valueFill, 2);
    title.setWordWrapWidth(520);
    yPos += 25;

    text = this.helpTipsAddText(game, [
      "Game Cursor",
    ], depth, xPos, yPos, labelFill, 2, 16);
    text.setWordWrapWidth(520);
    yPos += text.displayHeight + 8;

    etc = this.helpTipsAddText(game, [
      "http://www.rw-designer.com/user/5920",
      "http://www.rw-designer.com/cursor-set/mass-effect-3",
      "m.smejkalova@gmail.com",
    ], depth, xPos, yPos, labelFill, 2, 16);
    etc.setWordWrapWidth(520);
    yPos += etc.displayHeight + 25;

    // Dev
    title = this.helpTipsAddText(game, "Development", depth, xPos, yPos, valueFill, 2);
    title.setWordWrapWidth(520);
    yPos += 25;

    text = this.helpTipsAddText(game, [
      "Developed by Styx",
      "https://github.com/Styx5066"
    ], depth, xPos, yPos, labelFill, 2, 16);
    text.setWordWrapWidth(520);
    yPos += text.displayHeight + 15;

    etc = this.helpTipsAddText(game, [
      "Created with Phaser 3",
      "https://phaser.io/phaser3",
    ], depth, xPos, yPos, labelFill, 2, 16);
    etc.setWordWrapWidth(520);
    yPos += etc.displayHeight + 25;

    // ----------

    this.helpTipsAddSection(game, "Credits", depth, xyCoord, yPos);
  }

}
