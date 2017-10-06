let numberOfParticles = 600;
let particles = [];
let attractors = [];
let G = 2;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  angleMode(DEGREES);
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(5);
  noFill();

  for (var x = 0; x < particles.length; x++) {
    for (var y = 0; y < attractors.length; y++) {
      particles[x].attract(attractors[y]);
    }
    particles[x].update();
    particles[x].draw();
  }

  for (var x = 0; x < attractors.length; x++) {
    attractors[x].draw();
  }

  renderStats();
  if (particles.length < numberOfParticles) {
    particles.push(new Particle(random(width), random(height), random(2, 5)));
  }
}

function keyPressed() {
  if (keyCode == 65) {
    attractors.push(new Attractor(mouseX, mouseY, random(2, 5)));
  } else if (keyCode == 82) {
    attractors.push(new Attractor(mouseX, mouseY, random(-4, -7)));
  }
}

function renderStats() {
  var elements = document.getElementsByClassName("stats");
  var text = "";
  var stats = ["Total particles: " + particles.length];
  for (var x = 0; x < stats.length; x++) {
    text += "<p>" + stats[x] + "</p>\n";
  }
  for (var x = 0; x < elements.length; x++) {
    elements[x].innerHTML = text;
  }
}