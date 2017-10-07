let numberOfParticles = 500;
let particles = [];
let attractors = [];
let G = 2;
let f = 0.998;
let mass = 4;
let randomMass = true;
let drawLines = false;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  angleMode(DEGREES);
}

function draw() {
  if (!drawLines) {
    background(0);
    stroke(255);
  } else {
    stroke(255, 2);
  }
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
  renderControls();
  if (particles.length < numberOfParticles) {
    particles.push(new Particle(random(width), random(height), random(2, 5)));
  }
}

function keyPressed() {
  if (keyCode == 65) {
    attractors.push(new Attractor(mouseX, mouseY, mass));
  } else if (keyCode == 82) {
    attractors.push(new Attractor(mouseX, mouseY, (mass * - 1) - 2));
  } else if (keyCode == 80) {
    generateParticles(10);
  }
}

function generateParticles(amount) {
  for (var x = 0; x < amount; x++) {
    particles.push(new Particle(random(width), random(height), mass));
  }
}

function renderStats() {
  var elements = $(".stats");
  var text = "";
  var stats = ["Total particles: " + particles.length];
  for (var x = 0; x < stats.length; x++) {
    text += "<p>" + stats[x] + "</p>\n";
  }
  for (var x = 0; x < elements.length; x++) {
    elements[x].innerHTML = text;
  }
}

function renderControls() {
  randomMass = $(".controls .formgroup.mass .checkbox input").is(':checked');
  var massRounded;
  var massText;
  if (randomMass) {
    mass = random(2, 5);
    massRounded = floor(mass * 100) / 100;
    massText = "Random";
  } else {
    mass = $(".controls .formgroup.mass .input input").val();
    massRounded = floor(mass * 100) / 100;
    massText = massRounded;
  }
  $(".controls .formgroup.mass .value").html(massText);

  if (!drawLines) {
    push();
    stroke(255);
    strokeWeight(mass);
    noFill();
    point(mouseX, mouseY);

    fill(255);
    noStroke();
    textSize(12);
    text(massText, mouseX - textWidth(massText) / 2, mouseY - 10);
    pop();
  }

  
  var gRounded;
  var gText;
  G = $(".controls .formgroup.gravitation .input input").val();
  gRounded = floor(G * 100) / 100;
  gText = gRounded;
  $(".controls .formgroup.gravitation .value").html(gText);
  
  var fRounded;
  var fText;
  f = $(".controls .formgroup.friction .input input").val();
  fRounded = floor(f * 10000) / 10000;
  fText = fRounded;
  $(".controls .formgroup.friction .value").html(fText);
  
  drawLines = $(".controls .formgroup.alpha .checkbox input").is(':checked');
}