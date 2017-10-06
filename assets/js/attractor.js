function Attractor(x, y, mass) {
    this.pos = createVector(x, y);
    this.mass = floor(mass * 100) / 100;

    this.draw = function() {
        push();
        if (this.mass >= 0) {
            stroke(0, 255, 0);
        } else {
            stroke(255, 0, 0);
        }
        strokeWeight(this.mass);
        noFill();
        point(this.pos.x, this.pos.y);

        if (this.mass >= 0) {
            fill(0, 255, 0);
        } else {
            fill(255, 0, 0);
        }
        noStroke();
        textSize(12);
        text(this.mass, this.pos.x - textWidth(this.mass) / 2, this.pos.y - 10);
        pop();
    }
}