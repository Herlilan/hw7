var a = 50
var b = 50
var amplitude

var volumehistory = [];

function setup() {
  createCanvas(400, 400);
   angleMode(DEGREES);
  amplitude = new p5.Amplitude();
}

function preload() {
  wind = loadSound('winding.wav')
  Lullaby = loadSound('Lullaby.mp3')
}

// press space to wind
function keyPressed() {
  if (keyCode === 32) {
  wind.play()
  }
}
function keyReleased() {
  if (keyCode === 32) {
  wind.stop()
  }
}



function draw() {
  background(0);
  noStroke()


  //winding process
  noFill()
  rect(100, 175, a, b)
  if (keyIsDown(32)) {
    a = a + 0.6
  }
  //winding finished
  if (a >= 200) {
    Lullaby.play()
    a = 0
    b = 0
    wind.setVolume(0)
  }

// amplitude path
  var vol = amplitude.getLevel();
  volumehistory.push(vol);
  stroke(255);
  strokeWeight(random(5))
  noFill();

  translate(width / 2, height / 2);
  //connect vertex to shape
  beginShape(TRIANGLE_FAN);
  for (var i = 0; i < 360; i++) {
    var r = map(volumehistory[i], 0, 1, 10, 1000);
    var x = r * cos(i);
    var y = r * sin(i);
    vertex(x * 4, y * 4);
  }
  endShape();

  if (volumehistory.length > 360) {
    volumehistory.splice(0, 1);
  }
}
