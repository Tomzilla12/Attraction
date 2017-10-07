function Particle(x, y, mass) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.mass = mass;

    this.attract = function(target) {
        let direction = p5.Vector.sub(target.pos, this.pos);
        let distance = direction.mag();
        let distanceSquared = Math.sqrt(distance);
        // distanceSquared = constrain(distanceSquared, 50, 1000);
        // let force = G / distanceSquared;
        distanceSquared = constrain(distanceSquared, 0, 0.1);
        let force = G / ((target.mass * this.mass) / distanceSquared);
        if (distance < 30) {
            this.vel.mult(-1);
        }
        this.acc.add(direction.setMag(force));
    }

    this.update = function() {
        this.pos.add(this.vel);
        this.vel.mult(f);
        this.vel.add(this.acc);
        this.acc = createVector();
    }

    this.draw = function() {
        strokeWeight(Math.abs(this.mass));
        point(this.pos.x, this.pos.y);
    }
}