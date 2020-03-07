/*
* UnitInfo
*  - Displays a screen showing all unit info
*  - Used both in Servant List menu and during battle
*/
class UnitInfo {
  //---------------
  // DESCRIPTION: Creates a new Unit Info
  //---------------
  constructor(game, name, bgm, baseTile, tileSize) {
    this._allUI = [];
    this._fadeUI = [];
  }

  //---------------
  // DESCRIPTION: Shows Unit Info
  // PARAMS:
  //  game          (I,REQ) - Game object
  //  unit          (I,REQ) - Unit to show info for
  //  selectSound   (I,REQ) - Sound to play on button click
  //  closeCallback (I,OPT) - Action to perform when unit info is closed
  //  camIgnore     (I,OPT) - Array of objects the scroll camera should ignore
  //---------------
  showUnitInfo(game, unit, selectSound, closeCallback, camIgnore, noFadeOut) {
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
    var nameText = game.add.text(512, 40, unit.name + " ", nameStyle).setOrigin(0.5, 0.5);
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
    var portrait = game.add.sprite(200, 0, unit.portrait + "-Full").setOrigin(0.5, 0);
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

    cameraX -= 1024;
    cameraY += 700;
    mapCamera.useBounds = true;
    mapCamera.setBounds(cameraX, cameraY, cameraWidth, cameraHeight);
    mapCamera.centerOn(cameraX, cameraY);

    if (camIgnore) { mapCamera.ignore(camIgnore); }

    // Camera controls - mouse wheel
    game.input.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
        var mod = 40;
        if (deltaY < 0) { mod = -40; }
        mapCamera.setScroll(0, (mapCamera.worldView.y + mod))
    });


    var xyCoord = { x: (cameraX + 15), y: (cameraY + 15) };
    depth += 2;


    // ==============================
    //   Info Sections
    // ==============================
    this.unitInfoBasics(game, unit, depth, xyCoord);
    mapCamera.setBounds(cameraX, cameraY, cameraWidth, (xyCoord.y - cameraY));

    if (unit.allStatuses.length > 0) {
      this.unitInfoStatuses(game, unit, depth, xyCoord);
      mapCamera.setBounds(cameraX, cameraY, cameraWidth, (xyCoord.y - cameraY));
    }

    if (unit.activeSkills.length > 0) {
      this.unitInfoActiveSkills(game, unit, depth, xyCoord);
      mapCamera.setBounds(cameraX, cameraY, cameraWidth, (xyCoord.y - cameraY));
    }

    if (unit.passiveSkills.length > 0) {
      this.unitInfoPassiveSkills(game, unit, depth, xyCoord);
      mapCamera.setBounds(cameraX, cameraY, cameraWidth, (xyCoord.y - cameraY));
    }

    if (unit.noblePhantasm) {
      this.unitInfoNP(game, unit, depth, xyCoord);
      mapCamera.setBounds(cameraX, cameraY, cameraWidth, (xyCoord.y - cameraY));
    }


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
  // DESCRIPTION: Adds unit info text
  //---------------
  unitInfoAddText(game, textIn, depth, xPos, yPos, fill, shadow, fontSize, fontFamily, originX, originY) {
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
  // DESCRIPTION: Adds unit info image
  //---------------
  unitInfoAddImage(game, image, depth, xPos, yPos, originX, originY) {
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
  // DESCRIPTION: Adds a shaded section to the unit info
  //---------------
  unitInfoAddSection(game, title, depth, xyCoord, endY) {
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

  //---------------
  // DESCRIPTION: Shows the unit's basic info
  //---------------
  unitInfoBasics(game, unit, depth, xyCoord) {
    var xLabel = xyCoord.x + 25;
    var xValue = xLabel + 140;
    var yPos = xyCoord.y + 40;

    var labelFill = "#c1c1c1";
    var valueFill = "#fff";

    // ----------

    // Rank
    this.unitInfoAddText(game, "Rank", depth, xLabel, yPos, labelFill, 2);
    this.unitInfoAddText(game, unit.rank, depth, xValue, yPos, rankToColor(unit.rank), 2);
    yPos += 30;

    // Class
    this.unitInfoAddText(game, "Class", depth, xLabel, yPos, labelFill, 2);
    var classText = this.unitInfoAddText(game, unit.unitClass, depth, xValue, yPos, rankToColor(unit.rank), 2);

    var classIcon = this.unitInfoAddImage(game, unit.unitClass + "-" + unit.rank + "-Full", depth,
      (xValue + classText.displayWidth + 5), (yPos + (classText.displayHeight / 2)), 0, 0.5);
    classIcon.setDisplaySize(40, 40);

    yPos += 30;

    // Max HP
    this.unitInfoAddText(game, "Max HP", depth, xLabel, yPos, labelFill, 2);
    this.unitInfoAddText(game, unit.maxHP, depth, xValue, yPos, valueFill, 2);
    yPos += 30;

    // Attack Range
    this.unitInfoAddText(game, "Attack Range", depth, xLabel, yPos, labelFill, 2);
    this.unitInfoAddText(game, unit.attackRange, depth, xValue, yPos, valueFill, 2);
    yPos += 30;

    // Movement range
    this.unitInfoAddText(game, "Move Range", depth, xLabel, yPos, labelFill, 2);
    this.unitInfoAddText(game, unit.movement, depth, xValue, yPos, valueFill, 2);
    yPos += 30;

    // Traits
    this.unitInfoAddText(game, "Traits", depth, xLabel, yPos, labelFill, 2);
    var text = this.unitInfoAddText(game, unit.traits.join(", "), depth, xValue, yPos, valueFill, 2, 16);
    text.setWordWrapWidth(390);
    yPos += text.displayHeight + 10;

    // ----------

    this.unitInfoAddSection(game, "Info", depth, xyCoord, yPos);
  }

  //---------------
  // DESCRIPTION: Shows the unit's active skills
  //---------------
  unitInfoStatuses(game, unit, depth, xyCoord) {
    // var xIcon = xyCoord.x + 57;
    // var xText = xyCoord.x + 105;
    // var yPos  = xyCoord.y + 45;

    var xIcon = xyCoord.x + 25;
    var xText = xIcon + 35;
    var yPos  = xyCoord.y + 45;

    var labelFill = "#c1c1c1";
    var valueFill = "#fff";

    // ----------

    // For each skill
    for (const status of unit.allStatuses) {

      // Icon
      var icon = this.unitInfoAddImage(game, status.image, depth, xIcon, yPos, 0, 0);

      // Name
      var name = this.unitInfoAddText(game, status.name, depth, xText, yPos, valueFill, 2);

      // Duration
      if ((status.duration == -1) && (status.strength > 0)) {
        this.unitInfoAddText(game, "Remaining: " + status.strength, depth,
          (xyCoord.x + 522), (yPos + 5), labelFill, 2, 13, null, 1, 0);
      }
      else if (status.duration > 0) {
        this.unitInfoAddText(game, "Turns left: " + status.duration, depth,
          (xyCoord.x + 522), (yPos + 5), labelFill, 2, 13, null, 1, 0);
      }

      // Description
      var text = this.unitInfoAddText(game, status.description, depth, xText, (yPos + 25), labelFill, 2, 16);
      text.setWordWrapWidth(455);

      yPos += Math.max(icon.displayHeight, (text.displayHeight + 25));
      yPos += 16;
    }

    // ----------

    this.unitInfoAddSection(game, "Status Effects", depth, xyCoord, yPos);
  }

  //---------------
  // DESCRIPTION: Shows the unit's active skills
  //---------------
  unitInfoActiveSkills(game, unit, depth, xyCoord) {
    var xIcon = xyCoord.x + 25;
    var xText = xIcon + 80;
    var yPos = xyCoord.y + 45;

    var labelFill = "#c1c1c1";
    var valueFill = "#fff";

    // ----------

    // For each skill
    for (const skill of unit.activeSkills) {

      // Icon
      var icon = this.unitInfoAddImage(game, skill.image, depth, xIcon, yPos, 0, 0);

      // Name
      var name = this.unitInfoAddText(game, skill.name, depth, xText, yPos, valueFill, 2);

      // Cooldown
      this.unitInfoAddText(game, "(Cooldown: " + skill.cooldown + ")", depth,
        (xText + name.displayWidth + 2), (yPos + 5), labelFill, 2, 13);

      // Description
      var text = this.unitInfoAddText(game, skill.description, depth, xText, (yPos + 25), labelFill, 2, 16);
      text.setWordWrapWidth(455);

      yPos += Math.max(icon.displayHeight, (text.displayHeight + 25));
      yPos += 16;
    }

    // ----------

    this.unitInfoAddSection(game, "Skills", depth, xyCoord, yPos);
  }

  //---------------
  // DESCRIPTION: Shows the unit's passive skills
  //---------------
  unitInfoPassiveSkills(game, unit, depth, xyCoord) {
    var xIcon = xyCoord.x + 25;
    var xText = xIcon + 80;
    var yPos = xyCoord.y + 45;

    var labelFill = "#c1c1c1";
    var valueFill = "#fff";

    // ----------

    // For each skill
    for (const skill of unit.passiveSkills) {

      // Icon
      var icon = this.unitInfoAddImage(game, skill.image, depth, xIcon, yPos, 0, 0);

      // Name
      var name = this.unitInfoAddText(game, skill.name, depth, xText, yPos, valueFill, 2);

      // Description
      var text = this.unitInfoAddText(game, skill.description, depth, xText, (yPos + 25), labelFill, 2, 16);
      text.setWordWrapWidth(455);

      yPos += Math.max(icon.displayHeight, (text.displayHeight + 25));
      yPos += 16;
    }

    // ----------

    this.unitInfoAddSection(game, "Passive Skills", depth, xyCoord, yPos);
  }

  //---------------
  // DESCRIPTION: Shows the unit's Noble Phantasm
  //---------------
  unitInfoNP(game, unit, depth, xyCoord) {
    var xLabel = xyCoord.x + 25;
    var xValue = xLabel + 140;
    var xCenter = xyCoord.x + 286;
    var yPos = xyCoord.y + 35;

    var labelFill = "#c1c1c1";
    var valueFill = "#fff";

    var noblePhantasm = unit.noblePhantasm;

    // ----------

    // Subname
    var subName = this.unitInfoAddText(game, " " + noblePhantasm.subName, depth, xCenter, yPos, valueFill, 2, 16, null, 0.5, 0);
    subName.setWordWrapWidth(522);
    yPos += (subName.displayHeight);

    // Name
    var name = this.unitInfoAddText(game, " " + noblePhantasm.name, depth, xCenter, yPos, "#ffd700", 2, 40, "FrizQuadrata", 0.5, 0);
    name.setWordWrapWidth(522);
    name.setAlign("center");
    yPos += (name.displayHeight + 8);

    // Description
    var text = this.unitInfoAddText(game, noblePhantasm.description, depth, xLabel, yPos, labelFill, 2, 16);
    text.setWordWrapWidth(522);
    yPos += (text.displayHeight + 10);

    // Charge
    var charge = this.unitInfoAddText(game, "Charge:", depth, xLabel, yPos, labelFill, 2, 16);

    var npX = xLabel + charge.displayWidth + 5;
    var npY = yPos + (charge.displayHeight / 2);
    for (var i = 1; i <= unit.npChargeTime; i += 2) {
      var npImage = "NP-bar-empty";
      if ((i + 1) <= unit.curCharge) { npImage = "NP-bar-filled"; }
      else if (i <= unit.curCharge) { npImage = "NP-bar-half"; }

      this.unitInfoAddImage(game, npImage, depth, (npX + (14 * (i - 1) / 2)), npY, 0, 0.5);
    }

    yPos += 30;
    // ----------

    this.unitInfoAddSection(game, "Noble Phantasm", depth, xyCoord, yPos);
  }
}
