function Attractor(x, y, mass) {
    this.pos = createVector(x, y);
    this.mass = mass;

    this.draw = function() {
        push();
        stroke(0, 255, 0);
        strokeWeight(this.mass);
        noFill();
        point(this.pos.x, this.pos.y);
        pop();
    }
}