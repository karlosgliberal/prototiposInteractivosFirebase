///////////////////////////////////
// P5.js code                    //
///////////////////////////////////

// Initialize Firebase
var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    storageBucket: "",
    projectId: "",
    messagingSenderId: ""
};

firebase.initializeApp(config);
var database = firebase.database();

var counter = 0;
var balls = [];

function setup() {
    createCanvas(1440, 900);
    background(0);
}


function draw() {
  background(0);

  for (var i=0; i<balls.length; i++) {
    for (var j=i+1; j<balls.length; j++) {
      if (checkIfIntersecting(balls[i], balls[j])) {
        var ang = atan2(balls[i].position.y - balls[j].position.y, balls[i].position.x - balls[j].position.x);
        balls[i].velocity = {x: balls[i].getSpeed() * cos(ang), y: balls[i].getSpeed() * sin(ang) };
        balls[j].velocity = {x: balls[j].getSpeed() * cos(ang+PI), y: balls[j].getSpeed() * sin(ang+PI) };
      }
    }
  }

  for (var i=0; i<balls.length; i++) {
    balls[i].update();
    balls[i].draw();
  }
}

function Ball() {
  this.position = {x:width/2+ random(2, 5), y:height/2 + random(2, 5)};
  this.velocity = {x:2, y:random(-1, 5)};
  this.radius = random(30, 50);
  r = random(255);
  g = random(255);
  b = random(255);
  noStroke();
  this.colorRnd = color(r,g,b,227);

  this.update = function() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.x > width - this.radius) {
      this.velocity.x = -abs(this.velocity.x);
    }
    else if (this.position.x < this.radius) {
      this.velocity.x = abs(this.velocity.x);
    }
    if (this.position.y > height - this.radius) {
      this.velocity.y = -abs(this.velocity.y);
    }
    else if (this.position.y < this.radius) {
      this.velocity.y = abs(this.velocity.y);
    }
  }

  this.getSpeed = function() {
    return sqrt(pow(this.velocity.x, 2) + pow(this.velocity.y, 2));
  }

  this.draw = function() {

    fill(this.colorRnd);
    //stroke(255, 255, 255);
    ellipse(this.position.x, this.position.y, 2 * this.radius, 2 * this.radius);
  }
}

function checkIfIntersecting(a, b) {
  var d = dist(a.position.x, a.position.y, b.position.x, b.position.y);
  if (d < a.radius + b.radius) {
    return true;
  } else {
    return false;
  }
}

database.ref('ejemploInteractivo').limitToLast(80).on('child_added', function(snapshot){
    var data = snapshot.val();
    var normalizedLight = map(data.dato, 40, 600, 0, 255);
    balls.push(new Ball());
    console.log(balls.length);
    var velocidadRnd = random(-10, 10);
    for (var i = 0; i < balls.length; i++) {
      balls[i].velocity = {x:velocidadRnd, y:velocidadRnd};
    }
})
