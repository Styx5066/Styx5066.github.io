/*
* PopUpBox object
*  - Menu and collection of buttons that pop up over the game
*/

class PopUpBox {
  //---------------
  // DESCRIPTION: Creates a new PopUp Box
  //              Add buttons with addButton before calling showPopUp to show everything.
  // PARAMS:
  //  game       (I,REQ) - Game object
  //  title      (I,REQ) - Title of the popup box to show
  //  messageAry (I,REQ) - Array of messages to show. Each message is shown on a separate line.
  //  titleColor (I,OPT) - Color for the title (default: "#fff")
  //---------------
  constructor(game, title, messageAry, titleColor) {
    this._game = game;
    this._title = title;
    this._titleColor = titleColor || "#fff";
    this._messageAry = messageAry;

    this._allUI = [];
    this._buttons = [];
  }

  // Title
  get title() { return this._title; }
  set title(x) { this._title = x; }

  // Title Color
  get titleColor() { return this._titleColor; }
  set titleColor(x) { this._titleColor = x; }

  // Message
  get messageAry() { return this._messageAry; }
  set messageAry(x) { this._messageAry = x; }

  //---------------
  // DESCRIPTION: Adds a button to be generated when showPopUp is called
  // PARAMS:
  //  text   (I,REQ) - Button text
  //  sound  (I,REQ) - Sound to play when clicked
  //  action (I,REQ) - Button click callback function
  //  size   (I,REQ) - "small", "medium", or "large" (default: "small")
  //---------------
  addButton(text, sound, action, size) {
    size = size || "small";
    this._buttons.push( { text: text, sound: sound, action: action, size: size } );
  }

  //---------------
  // DESCRIPTION: Shows the popup box
  // PARAMS:
  //  map (I,OPT) - Map object if popup is during battle
  //---------------
  showPopUp(map) {
    // Hide maps hover info
    if (map) {
      map._tileHover.depth = -5;
      map._tileInfoBox.setDepth(-5);
      map._unitInfoBox.setDepth(-5);
      map.isTurnTransition = true;
    }

    // Tint the screen and temporarily disable controls
    var tint = this._game.add.sprite(0, 0, "screentint");
    tint.setOrigin(0, 0);
    tint.setScrollFactor(0);
    tint.depth = 200;
    tint.setInteractive( useHandCursor(false) );
    tint.alpha = 0;
    this._allUI.push(tint);

    // Shadow
    var shadow = this._game.add.sprite(512, 313, "shadow-popup");
    shadow.setOrigin(0.5, 0.5);
    shadow.setScrollFactor(0);
    shadow.depth = 201;
    shadow.alpha = 0;
    this._allUI.push(shadow);

    // Title text
    var titleStyle = { font: "35px FrizQuadrata", fill: this._titleColor };
    var titleText = this._game.add.text(512, 235, this._title, titleStyle).setOrigin(0.5, 0.5);
    titleText.setScrollFactor(0);
    titleText.depth = 202;
    titleText.alpha = 0;
    titleText.setShadow(2, 2, "#000", 2);
    this._allUI.push(titleText);

    // Message text
    var messageStyle = { font: "18px Optima", fill: "#fff" };
    for (var i = 0; i < this._messageAry.length; i++) {
      var messageText = this._game.add.text(512, (275 + (i * 20)), this._messageAry[i], messageStyle).setOrigin(0.5, 0.5);
      messageText.setScrollFactor(0);
      messageText.depth = 202;
      messageText.alpha = 0;
      messageText.setShadow(1, 1, "#000", 1);
      this._allUI.push(messageText);
    }

    // Buttons
    var buttonX = 512;
    var buttonY = 380;
    var originX = 0.5;
    var buttonTextStyle = { font: "35px Optima", fill: "#000" };

    for (var i = 0; i < this._buttons.length; i++) {
      // Setup
      if (this._buttons.length == 2) {
        if (i == 0) { buttonX -= 16; originX = 1; }
        else        { buttonX += 32; originX = 0; }
      }
      var buttonObj = this._buttons[i];

      // Button image
      var button = this._game.add.sprite(buttonX, buttonY, "button-" + buttonObj.size);
      button.setOrigin(originX, 0.5);
      button.setScrollFactor(0);
      button.depth = 203;
      button.alpha = 0;
      this._allUI.push(button);

      this.setButtonInfo(button, map, buttonObj);

      // Button text
      var textX;
      if (this._buttons.length == 2) {
        if (i == 0) { textX = buttonX - (button.displayWidth / 2); }
        else        { textX = buttonX + (button.displayWidth / 2); }
      }
      var buttonText = this._game.add.text(textX, buttonY, buttonObj.text, buttonTextStyle).setOrigin(0.5, 0.5);
      buttonText.setScrollFactor(0);
      buttonText.depth = 204;
      buttonText.alpha = 0;
      this._allUI.push(buttonText);
    }

    // -----

    // Animate the fade in
    defaultCursor();
    var timeline = this._game.tweens.createTimeline();

    timeline.add( {
      targets: this._allUI,
      alpha: 1,
      ease: "Quad.easeOut",
      duration: 300,
      // delay: 50,
    } );

    if (controls) { controls.stop(); }
    timeline.play();
  }

  //---------------
  // DESCRIPTION: Sets button information
  // PARAMS:
  //  button    (I,REQ) - Button sprite
  //  map       (I,OPT) - Map object if during a battle
  //  buttonObj (I,REQ) - Button object
  //---------------
  setButtonInfo(button, map, buttonObj) {
    button.setInteractive( useHandCursor() );

    button.on('pointerdown', (pointer) => {
      if (pointer.rightButtonDown()) { return; }

      if (buttonObj.sound) { buttonObj.sound.play(); }

      for (const element of this._allUI) { element.destroy(); }

      if (controls) { controls.start(); }
      if (map) {
        map._tileHover.depth = 20;
        map._tileInfoBox.setDepth(50);
        map._unitInfoBox.setDepth(50);
        map.isTurnTransition = false;
      }

      buttonObj.action();
    } );

    button.on('pointerover', function (pointer) { button.tint = 0xbbbbbb; } );
    button.on('pointerout',  function (pointer) { button.tint = 0xffffff; } );
  }

}
