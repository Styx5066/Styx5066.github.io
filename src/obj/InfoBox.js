/*
* InfoBox object
*  - Menu and collection of UI elements that can move around
*/

class InfoBox {
  //---------------
  // DESCRIPTION: Creates a new Info Box
  // PARAMS:
  //  game       (I,REQ) - Game object
  //  xPos       (I,REQ) - X position to create the box at (must be the 0,0 origin)
  //  yPos       (I,REQ) - Y position to create the box at (must be the 0,0 origin)
  //  image      (I,REQ) - Image for the box itself
  //  depth      (I,OPT) - Starting depth (default: 0)
  //  scrollable (I,OPT) - If false, is absolutely positioned with the camera (default: false)
  //---------------
  constructor(game, xPos, yPos, image, depth, scrollable) {
    this._game = game;
    this._xPos = xPos || 0;
    this._yPos = yPos || 0;
    this._depth = depth || 0;
    this._isScrollable = scrollable || false;

    this._baseSprite = this._game.add.image(xPos, yPos, image).setOrigin(0, 0);
    this._baseSprite.depth = this._depth;
    if (!this._isScrollable) { this._baseSprite.setScrollFactor(0); }
    this._boxUI = [];
  }

  get xPos() { return this._xPos; }

  get yPos() { return this._yPos; }

  get depth() { return this._depth; }

  get isScrollable() { return this._isScrollable; }
  set isScrollable(x) { this._isScrollable = x; }

  //---------------
  // DESCRIPTION: Adds an image to the box
  // PARAMS:
  //  image     (I,REQ) - Sprite to add
  //  name      (I,REQ) - Name that can be used to reference this element later
  //  relativeX (I,REQ) - X position to place (relative to the container's 0,0 origin)
  //  relativeY (I,REQ) - Y position to place (relative to the container's 0,0 origin)
  //  originX   (I,OPT) - X origin of the sprite (default: 0)
  //  originY   (I,OPT) - Y origin of the sprite (default: 0)
  //  sizeXY    (I,OPT) - The size to scale the image to
  //  sizeY     (I,OPT) - The size to scale Y to, if sizeXY is used
  // RETURNS: The created element
  //---------------
  addImageToBox(image, name, relativeX, relativeY, originX, originY, sizeXY, sizeY) {
    originX = originX || 0;
    originY = originY || 0;

    // Add the element
    var sprite = this._game.add.image((this._xPos + relativeX), (this._yPos + relativeY), image);
    sprite.setOrigin(originX, originY);
    sprite.x = this._xPos + relativeX;
    sprite.y = this._yPos + relativeY;
    sprite.depth = this._depth + 1;

    if (sizeXY > 0) {
      sprite.displayWidth = sizeXY;
      sprite.displayHeight = sizeY || sizeXY;
    }
    if (!this._isScrollable) { sprite.setScrollFactor(0); }

    this._boxUI.push( { name: name, sprite: sprite } );
    return sprite;
  }

  //---------------
  // DESCRIPTION: Adds text to the box
  // PARAMS:
  //  text      (I,REQ) - Text to add
  //  style     (I,REQ) - Style for the text
  //  name      (I,REQ) - Name that can be used to reference this element later
  //  relativeX (I,REQ) - X position to place (relative to the container's 0,0 origin)
  //  relativeY (I,REQ) - Y position to place (relative to the container's 0,0 origin)
  //  originX   (I,OPT) - X origin of the text (default: 0)
  //  originY   (I,OPT) - Y origin of the text (default: 0)
  //  shadow    (I,OPT) - Size of text shadow (default: no text shadow)
  // RETURNS: The created element
  //---------------
  addTextToBox(text, style, name, relativeX, relativeY, originX, originY, shadow) {
    originX = originX || 0;
    originY = originY || 0;

    // Add the element
    var textElem = this._game.add.text((this._xPos + relativeX), (this._yPos + relativeY), text, style);
    textElem.setOrigin(originX, originY);
    textElem.x = this._xPos + relativeX;
    textElem.y = this._yPos + relativeY;
    textElem.depth = this._depth + 1;
    if (!this._isScrollable) { textElem.setScrollFactor(0); }
    if (shadow > 0) { textElem.setShadow(shadow, shadow, "#000", shadow); }

    this._boxUI.push( { name: name, sprite: textElem } );
    return textElem;
  }

  //---------------
  // DESCRIPTION: Returns the specified sprite or text element
  // PARAMS:
  //  name (I,REQ) - Name of element to retrieve
  //---------------
  getBoxElement(name) {
    for (const element of this._boxUI) {
      if (element.name == name) { return element.sprite; }
    }
  }

  //---------------
  // DESCRIPTION: Sets the base depth for the box and all UI elements
  // PARAMS:
  //  depth (I,REQ) - Base depth to set. All other UI elements will have a depth of this + 1.
  //---------------
  setDepth(depth) {
    this._depth = depth;
    this._baseSprite.depth = depth;
    for (const element of this._boxUI) { element.sprite.depth = (depth + 1); }
  }

  //---------------
  // DESCRIPTION: Moves the container and all UI elements to a specified spot
  // PARAMS:
  //  xPos     (I,REQ) - X position of the container at the 0,0 origin to move to
  //  yPos     (I,REQ) - Y position of the container at the 0,0 origin to move to
  //---------------
  moveXY(xPos, yPos) {
    // Base sprite
    this._baseSprite.x = xPos;
    this._baseSprite.y = yPos;

    // All UI
    for (const element of this._boxUI) {
      element.sprite.x = (xPos + (element.sprite.x - this._xPos));
      element.sprite.y = (yPos + (element.sprite.y - this._yPos));
    }

    // Update base positions
    this._xPos = xPos;
    this._yPos = yPos;
  }

  //---------------
  // DESCRIPTION: Animates the container and all UI elements moving to a specified spot
  // PARAMS:
  //  xPos     (I,REQ) - X position of the container at the 0,0 origin to move to
  //  yPos     (I,REQ) - Y position of the container at the 0,0 origin to move to
  //  duration (I,OPT) - Duration of animation (default: 1000)
  //  ease     (I,OPT) - Easing to use (default: Linear)
  //---------------
  animateXY(xPos, yPos, duration, ease) {
    duration = duration || 1000;
    ease = ease || "Linear";

    // Base sprite
    this._game.tweens.add({
      targets: this._baseSprite,
      x: xPos,
      y: yPos,
      ease: ease,
      duration: duration,
    });

    // All UI
    for (const element of this._boxUI) {
      this._game.tweens.add({
        targets: element.sprite,
        x: (xPos + (element.sprite.x - this._xPos)),
        y: (yPos + (element.sprite.y - this._yPos)),
        ease: ease,
        duration: duration,
      });
    }

    // Update base positions
    this._xPos = xPos;
    this._yPos = yPos;
  }

}
