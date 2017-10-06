let numberOfParticles = 500;
let particles = [];
let attractors = [];
let G = 6.67300;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  angleMode(DEGREES);

  for (var x = 0; x < numberOfParticles; x++) {
    particles.push(new Particle(random(width), random(height), random(2, 5)));
  }
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
}

function mousePressed() {
  attractors.push(new Attractor(mouseX, mouseY, random(2, 5)));
}