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
// DESCRIPTION: Determines whether dev options appear
//---------------
function version() {
  return "0.2.10";
}

// ------------------------------------------------------

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
// DESCRIPTION: Displays a Back button
// PARAMS:
//  game   (I,REQ) - Game object
//  sound  (I,OPT) - Sound to play when clicked
//  action (I,REQ) - Action to perform when clicked
// RETURNS: Array of UI elements created
//---------------
function backButton(game, sound, action) {
  // Back button
  var backButton = game.add.image(4, 622, "button-back").setOrigin(0, 1);

  var backStyle = { font: "35px Optima", fill: "#2b346d", stroke: "#000", strokeThickness: 1 };
  var backText = game.add.text(84, 591, "Back", backStyle).setOrigin(0.5, 0.5);

  backButton.setInteractive( useHandCursor() );
  backButton.on('pointerdown', (pointer) => { if (!pointer.rightButtonDown()) {
    if (sound) { sound.play(); }
    action();
  } } );
  backButton.on('pointerover', function (pointer) { backButton.tint = 0xaaaaaa; } );
  backButton.on('pointerout',  function (pointer) { backButton.tint = 0xffffff; } );

  return [backButton, backText];
}

//---------------
// DESCRIPTION: Shows an error message and allows the exception to be copied to the clipboard.
// PARAMS:
//  game      (I,REQ) - Game object
//  exception (I,REQ) - Exception caught
//  message   (I,REQ) - Error message
//---------------
function errorLog(game, exception, message) {
  // Log to console
  console.log(message);
  console.log(exception);

  // // Message
  // var allUI = [];
  //
  // var style = { font: "18px Optima", fill: "#e0301e", fontStyle: "bold" };
  // var title = game.add.text(512, 5, " Error ", style).setOrigin(0.5, 0);
  // title.setShadow(2, 2, "#000", 2);
  // title.alpha = 0;
  // title.depth = 9999;
  // title.setScrollFactor(0);
  // allUI.push(title);
  //
  // style = { font: "14px Optima", fill: "#fff", fontStyle: "bold" };
  // var message = game.add.text(377, 30, message, style).setOrigin(0, 0);
  // message.setShadow(2, 2, "#000", 2);
  // message.setWordWrapWidth(270);
  // message.alpha = 0;
  // message.depth = 9999;
  // message.setScrollFactor(0);
  // allUI.push(message);
  //
  // var y = 30 + message.displayHeight + 15;
  //
  //
  // // OK
  // var okButton = game.add.image(512, y, "option-box").setOrigin(0.5, 0);
  // okButton.alpha = 0;
  // okButton.depth = 9999;
  // okButton.setScrollFactor(0);
  // allUI.push(okButton);
  //
  // style = { font: "18px Optima", fill: "#000" };
  // var okText = game.add.text(512, (y + 15), "OK", style).setOrigin(0.5, 0.5);
  // okText.alpha = 0;
  // okText.depth = 9999;
  // okText.setScrollFactor(0);
  // allUI.push(okText);
  //
  // okButton.setInteractive( useHandCursor() );
  // okButton.on('pointerdown', (pointer) => { if (!pointer.rightButtonDown()) {
  //   game.tweens.add({
  //     targets: allUI,
  //     alpha: 0,
  //     ease: "Quad.easeOut",
  //     duration: 500,
  //     onComplete: () => {
  //       for (const element of allUI) { element.destroy(); }
  //     }
  //   });
  // } } );
  // okButton.on('pointerover', function (pointer) { okButton.tint = 0xaaaaaa; } );
  // okButton.on('pointerout',  function (pointer) { okButton.tint = 0xffffff; } );
  //
  // y += 30;
  //
  //
  // // Box
  // var box = game.add.graphics();
  // box.fillStyle(0x000000, 0.5);
  // box = box.fillRect(362, 0, 300, (y + 15));
  // box.alpha = 0;
  // box.depth = 9998;
  // box.setScrollFactor(0);
  // allUI.push(box);
  //
  //
  // // Appear
  // game.tweens.add({
  //   targets: allUI,
  //   alpha: 1,
  //   ease: "Quad.easeIn",
  //   duration: 500,
  // });
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
// DESCRIPTION: Loads data from a file
// PARAMS:
//  callback (I,REQ) - Callback that runs once the file is loaded.
//                     Should contain "game", "text", and "music" parameters.
//---------------
function loadFile(callback, game, music) {
  var input = document.getElementById("dataLoad");

  if (!input) {
    input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("id", "dataLoad");
    input.setAttribute("name", "files[]");
    input.setAttribute("accept", ".fgw");
    input.style.opacity = 0;
    input.style.position = "absolute";
    input.style.top = "-50px";
    input.style.left = "-50px";
    document.body.appendChild(input);

    input.addEventListener("change", (evt) => { handleFileSelect(evt, callback, game, music); }, false);
  }

  input.click();
}
function handleFileSelect(evt, callback, game, music) {
  var file = evt.target.files;

  var reader = new FileReader();
  reader.onload = (e) => {
    var text = e.target.result;
    window[callback](game, text, music);
  };
  reader.readAsText(file[0]);
}

//---------------
// DESCRIPTION: Returns the current date and time
//---------------
function curDateTime() {
  var d = new Date(),
    minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
    hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
    ampm = d.getHours() >= 12 ? 'pm' : 'am',
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  hours = (hours % 12);
  if (hours == 0) { hours = 12; }
  return days[d.getDay()]+' '+months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()+' '+hours+':'+minutes+ampm;
}

//---------------
// DESCRIPTION: Returns the current date
//---------------
function curDateSlashes() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  return mm + '/' + dd + '/' + yyyy;
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
  return game.sound.add(tracks[rand], { volume: 0.5 } );
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
// DESCRIPTION: Removes preloaded textures if already loaded
// PARAMS:
//  key (I,REQ) - Texture key to remove
//---------------
function removeTexture(game, key) {
  if (game.textures.get(key).key != "__MISSING") {
    game.textures.remove(key);
  }
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

//---------------
// (C) 2010 Andreas  Spindler. Permission to use, copy,  modify, and distribute
// this software and  its documentation for any purpose with  or without fee is
// hereby  granted.   Redistributions of  source  code  must  retain the  above
// copyright notice and the following disclaimer.
//
// THE SOFTWARE  IS PROVIDED  "AS IS" AND  THE AUTHOR DISCLAIMS  ALL WARRANTIES
// WITH  REGARD   TO  THIS  SOFTWARE   INCLUDING  ALL  IMPLIED   WARRANTIES  OF
// MERCHANTABILITY AND FITNESS.  IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
// SPECIAL,  DIRECT,   INDIRECT,  OR  CONSEQUENTIAL  DAMAGES   OR  ANY  DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
// OF  CONTRACT, NEGLIGENCE  OR OTHER  TORTIOUS ACTION,  ARISING OUT  OF  OR IN
// CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
//
// $Writestamp: 2010-06-09 13:07:07$
// $Maintained at: www.visualco.de$
//---------------
function ROT47(text) {
  // Hides all ASCII-characters from 33 ("!") to 126 ("~").  Hence can be used
  // to obfuscate virtually any text, including URLs and emails.
  var R = new String()
  R = ROTn(text,
  "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~")
  return R;
}
function ROTn(text, map) {
  // Generic ROT-n algorithm for keycodes in MAP.
  var R = new String()
  var i, j, c, len = map.length
  for(i = 0; i < text.length; i++) {
    c = text.charAt(i)
    j = map.indexOf(c)
    if (j >= 0) {
      c = map.charAt((j + len / 2) % len)
    }
    R = R + c
  }
  return R;
}
