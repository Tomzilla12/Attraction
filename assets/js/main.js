let numberOfParticles = 600;
let particles = [];
let attractors = [];
let G = 2;
let mass = 4;
let randomMass = true;

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
  renderControls();
  if (particles.length < numberOfParticles) {
    particles.push(new Particle(random(width), random(height), random(2, 5)));
  }
}

function keyPressed() {
  if (keyCode == 65) {
    if (randomMass) {
      attractors.push(new Attractor(mouseX, mouseY, mass));
    } else {
      attractors.push(new Attractor(mouseX, mouseY, mass));
    }
  } else if (keyCode == 82) {
    if (randomMass) {
      attractors.push(new Attractor(mouseX, mouseY, (mass * - 1) - 2));
    } else {
      attractors.push(new Attractor(mouseX, mouseY, mass * -1));
    }
  } else if (keyCode == 80) {
    if (randomMass) {
      particles.push(new Particle(mouseX, mouseY, mass));
    } else {
      particles.push(new Particle(mouseX, mouseY, mass));
    }
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