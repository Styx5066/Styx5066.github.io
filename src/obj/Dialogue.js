/*
* Dialogue object
*  - UI and events to handle showing dialogue
*/

class Dialogue {
  //---------------
  // DESCRIPTION: Creates a new Dialogue
  // PARAMS:
  //  game (I,REQ) - Game object
  //---------------
  constructor(game) {
    this._game = game;
    this._callback;

    // Dialogue info
    this._timeline = [];
    this._timeIdx = -1;

    this._curDialogue;
    this._lineIdx = -1;

    // Sprites and text
    this._bg;
    this._portraitLeft;
    this._portraitRight;
    this._portraitCenter;

    this._interactive;
    this._message;
    this._name;
    this._skip;
    this._nameText;
    this._messageText;

    this._selectSound;
  }

  // ====================================================================================
  //                                CONSTRUCTION
  // ====================================================================================

  //---------------
  // DESCRIPTION: Adds dialogue to the timeline
  // PARAMS:
  //  portraits      (I,OPT) - Array of images to display behind the dialoge box (max 2).
  //                            If 1, will be displayed at the center.
  //                            Otherwise, the first is displayed on the left and the second on the right.
  //  activePortrait (I,OPT) - Which of the portraits is speaking. (default: none)
  //  speakerName    (I,OPT) - Name of the speaker to show in the dialogue box.
  //  text           (I,OPT) - Array of text to display for the current active speaker.
  //                            Each line in the array requires clicking to proceed.
  //  background     (I,OPT) - Background image to switch to. If not set, continues using the last-set background.
  //  portraitFadeIn (I,OPT) - Duration of portrait fade in before text is shown (default: none)
  //---------------
  addDialogue(portraits, activePortrait, speakerName, text, background, portraitFadeIn) {
    portraits = portraits || [];
    text = text || [];
    portraitFadeIn = portraitFadeIn;

    this._timeline.push({
      portraits: portraits,
      active: activePortrait,
      speaker: speakerName,
      text: text,
      bg: background,
      portraitFadeIn: portraitFadeIn,
    });
  }


  // ====================================================================================
  //                                DISPLAY
  // ====================================================================================

  //---------------
  // DESCRIPTION: Begins playing the dialogue
  // PARAMS:
  //  callback (I,OPT) - Callback to call once the dialogue is over
  //  noFade   (I,OPT) - If true, will not fade dialogue in
  //---------------
  play(callback, noFade) {
    this._callback = callback;

    // Sounds
    this._selectSound = this._game.sound.add("menu-select");

    // BG and portraits
    this._bg = this._game.add.sprite(0, 0, "blank").setOrigin(0, 0);
    this._bg.depth = 100;
    this._bg.alpha = 0;
    this._bg.setInteractive();

    this._portraitLeft = this._game.add.sprite(256, 0, "blank").setOrigin(0.5, 0);
    this._portraitLeft.depth = 105;
    this._portraitLeft.alpha = 0;

    this._portraitRight = this._game.add.sprite(768, 0, "blank").setOrigin(0.5, 0);
    this._portraitRight.depth = 105;
    this._portraitRight.alpha = 0;

    this._portraitCenter = this._game.add.sprite(512, 0, "blank").setOrigin(0.5, 0);
    this._portraitCenter.depth = 105;
    this._portraitCenter.alpha = 0;


    // Message
    this._message = this._game.add.sprite(512, 614, "dialogue-base").setOrigin(0.5, 1);
    this._message.alpha = 0.7;
    this._message.alpha = 0;
    this._message.depth = 120;

    this._name = this._game.add.sprite(3, 429, "dialogue-name").setOrigin(0, 0);
    this._name.alpha = 0.7;
    this._name.alpha = 0;
    this._name.depth = 121;

    this._skip = this._game.add.sprite(1016, 8, "dialogue-skip").setOrigin(1, 0);
    // this._skip.alpha = 0.5;
    this._skip.alpha = 0;
    this._skip.depth = 135;


    // Text
    var nameStyle = { font: "35px Optima", fill: "#fff" };
    this._nameText = this._game.add.text(32, 437, "", nameStyle).setOrigin(0, 0);
    this._nameText.depth = 125;
    this._nameText.alpha = 0;
    this._nameText.setShadow(2, 2, "#000", 2);

    var messageStyle = { font: "35px Optima", fill: "#fff" };
    this._messageText = this._game.add.text(75, 501, "", messageStyle).setOrigin(0, 0);;
    this._messageText.depth = 125;
    this._messageText.alpha = 0;
    this._messageText.setShadow(2, 2, "#000", 2);
    this._messageText.setWordWrapWidth(874);

    var textMask = this._game.add.sprite(0, 0, "dialogue-text-mask").setOrigin(0, 0);
    textMask.depth = 125;
    this._messageText.setMask(textMask.createBitmapMask());
    textMask.destroy();


    // Interactivity
    this._interactive = this._game.add.sprite(0, 60, "full-blank").setOrigin(0, 0);
    this._interactive.depth = 130;

    this._interactive.setInteractive();
    this._interactive.on('pointerdown', (pointer) => {
        if (!pointer.rightButtonDown()) {
          this._selectSound.play();
          this.nextLine();
        }
      } );


    this._skip.setInteractive();
    this._skip.on('pointerdown', (pointer) => {
        if (!pointer.rightButtonDown()) {
          this._selectSound.play();
          this.skipConfirmation();
        }
      } );
    this._skip.on('pointerover', (pointer) => { this._skip.tint = 0xaaaaaa; } );
    this._skip.on('pointerout',  (pointer) => { this._skip.tint = 0xffffff; } );


    // Play
    if (!noFade) { fadeSceneIn(this._game); }
    var appearList = [this._message, this._name];
    if (!this._timeline[0].speaker) { removeElement(this._name, appearList); }

    this._game.tweens.add({
      targets: [this._skip],
      alpha: 0.7,
      ease: "Linear",
      duration: 500,
    });
    this._game.tweens.add({
      targets: appearList,
      alpha: 0.7,
      ease: "Linear",
      duration: 700,
      onComplete: () => { this.nextDialogue(true); }
    });
    this._game.tweens.add({
      targets: [this._bg, this._portraitCenter, this._portraitLeft, this._portraitRight],
      alpha: 1,
      ease: "Linear",
      duration: 1000,
    });
  }

  //---------------
  // DESCRIPTION: Stops the dialogue, destroying all sprites and calling the callback
  //---------------
  stop() {
    var allSprites = [];
    allSprites.push(this._bg);
    allSprites.push(this._portraitLeft);
    allSprites.push(this._portraitRight);
    allSprites.push(this._portraitCenter);
    allSprites.push(this._interactive);
    allSprites.push(this._message);
    allSprites.push(this._name);
    allSprites.push(this._skip);
    allSprites.push(this._nameText);
    allSprites.push(this._messageText);

    // Immediately destroy any sprites not visible
    var animSprites = [];
    for (const sprite of allSprites) {
      if (sprite.depth < 0) { sprite.destroy(); }
      else { animSprites.push(sprite); }
    }


    var stopAnim = this._game.tweens.createTimeline();
    stopAnim.add( {
      targets: animSprites,
      alpha: 0,
      ease: "Linear",
      duration: 500,
      onComplete: () => {
        for (const sprite of animSprites) { sprite.destroy(); }

        if (this._callback) {
          this._callback();
        }
       },
    } );

    // Fade out
    this._nameText.destroy();
    this._messageText.destroy();

    stopAnim.play();
  }

  //---------------
  // DESCRIPTION: Shows a confirmation popup for skipping dialogue
  //---------------
  skipConfirmation() {
    // Create the popup
    var popup = new PopUpBox(this._game, "Skip", ["Are you sure you want to skip this dialogue?"], "#fff");
    popup.addButton("Yes", this._selectSound, () => { this.stop(); } );
    popup.addButton("Cancel", this._selectSound, function() {  } );

    // Show popup
    popup.showPopUp();
  }

  //---------------
  // DESCRIPTION: Plays next piece of dialogue.
  //---------------
  nextDialogue(isFirst) {
    // Start next dialogue if available
    this._timeIdx++;
    if (this._timeIdx < this._timeline.length) {
      this._curDialogue = this._timeline[this._timeIdx];
      this._lineIdx = -1;

      // ==============================
      //   Background
      // ==============================
      var bg = this._curDialogue.bg;
      if ((bg) && (bg != this._bg.texture.key)) {
        var bgAnim = this._game.tweens.createTimeline();

        var tempBlack = this._game.add.sprite(0, 0, "black").setOrigin(0, 0);
        tempBlack.depth = 99;

        bgAnim.add( {
          targets: this._bg,
          alpha: 0,
          ease: "Quad.easeOut",
          duration: 500,
          onComplete: () => {
              this._bg.setTexture(bg);
           },
        } );

        bgAnim.add( {
          targets: this._bg,
          alpha: 1,
          ease: "Quad.easeIn",
          duration: 500,
          delay: 250,
          onComplete: () => {
              tempBlack.destroy();
           }
        } );

        bgAnim.play();
      }

      // ==============================
      //   Portraits
      // ==============================
      var portraits = this._curDialogue.portraits;
      var active = this._curDialogue.active;
      var portraitAnim = this._game.tweens.createTimeline();

      var portraitFadeOut = [];
      var portraitFadeIn = [];

      if (portraits.length == 1) {
        portraitFadeOut = [this._portraitLeft, this._portraitRight];
        if (this.baseImage(this._portraitCenter.texture.key) != this.baseImage(portraits[0])) { portraitFadeOut.push(this._portraitCenter); }
        portraitFadeIn = this._portraitCenter;
      }
      else {
        portraitFadeOut = [this._portraitCenter];
        if (this.baseImage(this._portraitLeft.texture.key  != this.baseImage(portraits[0])))  { portraitFadeOut.push(this._portraitLeft); }
        if (this.baseImage(this._portraitRight.texture.key != this.baseImage(portraits[1]))) { portraitFadeOut.push(this._portraitRight); }
        portraitFadeIn = [this._portraitLeft, this._portraitRight];
      }

      portraitAnim.add( {
        targets: portraitFadeOut,
        alpha: 0,
        ease: "Linear",
        duration: 100,
        onComplete: () => {
          for (const sprite of portraitFadeOut) { sprite.depth = -1; }

          if (portraits.length == 1) {
            this._portraitCenter.depth = 105;
            this._portraitCenter.setTexture(portraits[0]);
            if (portraits[0] == active) { this._portraitCenter.tint = 0xffffff; }
            else { this._portraitCenter.tint = 0x999999; }
          }
          else {
            this._portraitLeft.depth = 105;
            this._portraitLeft.setTexture(portraits[0]);
            if (portraits[0] == active) { this._portraitLeft.tint = 0xffffff; this._portraitLeft.depth++; }
            else { this._portraitLeft.tint = 0x999999; }

            this._portraitRight.depth = 105;
            this._portraitRight.setTexture(portraits[1]);
            if (portraits[1] == active) { this._portraitRight.tint = 0xffffff; this._portraitRight.depth++; }
            else { this._portraitRight.tint = 0x999999; }
          }

         },
      } );

      portraitAnim.add( {
        targets: portraitFadeIn,
        alpha: 1,
        ease: "Linear",
        duration: this._curDialogue.portraitFadeIn || 100,
      } );

      portraitAnim.play();


      // ==============================
      //   Text
      // ==============================
      var speaker = this._curDialogue.speaker;
      if (speaker) {
        this._name.depth = 121;
        this._name.alpha = 0.7;
        this._nameText.setText(speaker);
      }
      else {
        this._name.alpha = 0;
        this._nameText.setText("");
      }

      this._messageText.setText("");
      this.nextLine(isFirst);
    }

    // Otherwise end dialogue
    else {
      this.stop();
    }
  }

  //---------------
  // DESCRIPTION: Displays next line of dialogue.
  //---------------
  nextLine(isFirst) {
    // Display next line if available
    this._lineIdx++;
    if (this._lineIdx < this._curDialogue.text.length) {
      this._game.input.enabled = false;

      // Fade in
      var fadeIn = this._curDialogue.portraitFadeIn || 0;
      this._curDialogue.portraitFadeIn = 0;

      if (isFirst) {
        var line = this._curDialogue.text[this._lineIdx];
        this._messageText.setText(line);
        this._game.tweens.add({
          targets: [this._messageText, this._nameText],
          alpha: 1,
          ease: "Linear",
          duration: 300,
          onComplete: () => { this._game.input.enabled = true; }
        });
        return;
      }

      fadeIn -= 300;
      if (fadeIn < 0) { fadeIn = 0; }

      // Animation
      var lineAnim = this._game.tweens.createTimeline();
      lineAnim.add( {
        targets: this._messageText,
        y: 365,
        ease: "Linear",
        duration: 300,
        onComplete: () => {
          this._messageText.setText("");
          this._messageText.y = 501;

          this._game.time.delayedCall(fadeIn, () => {
            var line = this._curDialogue.text[this._lineIdx];
            this._messageText.setText(line);
            this._game.input.enabled = true;
          });
        }
      } );

      lineAnim.play();
    }

    // Otherwise go to the next dialogue
    else {
      this.nextDialogue();
    }
  }

  //---------------
  // DESCRIPTION: Returns the base of the image for image keys that use expressions
  // PARAMS:
  //  image (I,REQ) - Image to get base of
  // RETURNS: image base
  //---------------
  baseImage(image) {
    if (!image) { return null; }
    image = image + "";

    var index = image.indexOf("-");
    if (index == -1) { return image; }
    return image.substr(0, index);
  }

}
