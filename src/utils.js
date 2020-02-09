/*
* General utility functions
*/

//---------------
// DESCRIPTION: Determines whether dev options appear
//---------------
function devMode() {
  return false;
}



//---------------
// DESCRIPTION: Loads the custom cursor
//---------------
function loadCursor() {
  game.input.setDefaultCursor('url(assets/ui/cursor-blue.cur), default');
}

//---------------
// DESCRIPTION: Clears the cursor back to the default
//---------------
function defaultCursor() {
  // Do nothing with custom cursor in use
  // game.canvas.style.cursor = "default";
}

//---------------
// DESCRIPTION: Uses hand cursor for interactive objects if appropriate
//---------------
function useHandCursor(state) {
  // Always use false with custom cursor in use
  return { useHandCursor: false };
  // if (state == null) { state = true; }
  // return { useHandCursor: state };
}

//---------------
// DESCRIPTION: Fades a scene in from black, to be called at the beginning of scenes
//              Requires "black" to be preloaded
// PARAMS:
//  game     (I,REQ) - Game object
//  duration (I,OPT) - Duration of transition (default: 1000)
//  ease     (I,OPT) - Ease (default: "Quad.easeIn")
//  noScroll (I,OPT) - If true, does not set scroll factor
//---------------
function fadeSceneIn(game, duration, ease, noScroll) {
  duration = duration || 1000;
  ease = ease || "Quad.easeIn";

  var fade = game.add.sprite(0, 0, "black").setOrigin(0, 0);
  fade.depth = 200;
  fade.setInteractive();
  if (!noScroll) { fade.setScrollFactor(0); }

  game.tweens.add({
    targets: fade,
    alpha: 0,
    ease: ease,
    duration: duration,
    onComplete: () => { fade.destroy(); }
  });
}

//---------------
// DESCRIPTION: Animates the amount of damage a unit was damaged/healed for
// PARAMS:
//  game   (I,REQ) - Game object
//  x      (I,REQ) - X position to spawn HP text
//  y      (I,REQ) - Y position to spawn HP text
//  height (I,REQ) - Y position to float up to
//  text   (I,REQ) - Text to display/float
//  color  (I,OPT) - Color of text in the format "#fff" (default: white)
//  hold   (I,OPT) - Amount of time to hold on the HP before fading away (default: 0)
//  delay  (I,OPT) - Amount of time to delay the start of the animation (default: 0)
//---------------
function floatHPchange(game, x, y, height, text, color, hold, delay) {
  // Find place to spawn text
  color = color || "#fff";
  hold = hold || 0;
  delay = delay || 0;

  // Create at origin
  var style = { font: "16px Optima", fill: color, fontStyle: "bold" };
  var text = game.add.text(x, y, text, style).setOrigin(0.5, 0.5);
  text.setStroke("#000", 3);
  text.depth = 50;
  text.alpha = 0;

  // Animation
  var timeline = game.tweens.createTimeline();
  timeline.callbacks = { onComplete: { func: () => {
    text.destroy();
  } } };

  timeline.add({
    targets: text,
    y: height,
    alpha: 1,
    ease: "Power2",
    duration: 1000,
    hold: hold,
    delay: delay,
  });

  timeline.add({
    targets: text,
    alpha: 0,
    ease: "Linear",
    duration: 300,
  });

  timeline.play();
}

//---------------
// DESCRIPTION: Saves data to file
// PARAMS:
//  data     (I,REQ) - Data to save
//  filename (I,REQ) - Filename
//  type     (I,REQ) - Filetype
//---------------
function saveFile(data, filename, type) {
  var file = new Blob([data], {type: type});

  // IE 10+
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, filename);
  }

  // Others
  else {
    var a = document.createElement("a");
    var url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
  }
}

//---------------
// DESCRIPTION: Returns a random battle map BGM from the following types:
//               normal, intense, japanese,
//---------------
function getBGM(game, type) {
  var tracks;

  // Type
  if (type == "intense") { tracks = ["intense01"]; }
  else if (type == "japanese") { tracks = ["japanese01"]; }
  else { tracks = ["battle01", "battle02", "battle03", "battle04"]; }

  var rand = getRandomInt(0, tracks.length);
  return game.sound.add(tracks[rand], { volume: 0.7 } );
}

//---------------
// DESCRIPTION: Removes spaces from a string
// PARAMS:
//  string (I,REQ) - String to remove spaces from
// RETURNS: String with spaces removed
//---------------
function noSpaces(string) {
  return string.replace(/\s+/g, '');
}

//---------------
// DESCRIPTION: Returns distance between two xy coordinates
// PARAMS:
//  from (I,REQ) - Object with "x" and "y" properties
//  to   (I,REQ) - Object with "x" and "y" properties
// RETURNS: Distance between the two points
//---------------
function xyDistance(from, to) {
  var xDistance = from.x - to.x;
  var yDistance = from.y - to.y;
  return Math.abs(xDistance) + Math.abs(yDistance);
}

//---------------
// DESCRIPTION: Adds an element to the given array if it isn't there already
// PARAMS:
//  element (I,REQ) - Element to add
//  array   (I,REQ) - Array to add to
//---------------
function addElement(element, array) {
  if (array.includes(element)) { return; }
  array.push(element);
}

//---------------
// DESCRIPTION: Removes an element from the given array
// PARAMS:
//  element (I,REQ) - Element to add
//  array   (I,REQ) - Array to add to
//---------------
function removeElement(element, array) {
  if (!array.includes(element)) { return; }

  var index;
  for (var i = 0; i < array.length; i++) {
    if (array[i] == element) { index = i; break; }
  }
  array.splice(index, 1);
}

//---------------
// DESCRIPTION: Random integer between two values
//  The maximum is exclusive and the minimum is inclusive
//---------------
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//---------------
// DESCRIPTION: Random floating number between two values
//  The maximum is exclusive and the minimum is inclusive
//---------------
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
