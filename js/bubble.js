function Bubble(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vector = {
        x: vx,
        y: vy,
    };

    this.radius = Math.random() * 5;

    this.lifetime     = 0;
    this.max_lifetime = 500 + Math.random() * 2000;
    this.active       = true;
}

Bubble.prototype.speed = 0.1;

Bubble.prototype.get_new_position = function(lapse) {
    if (this.lifetime + lapse > this.max_lifetime) {
        this.active = false;
    } else {
        this.lifetime += lapse;
    }
    
    this.x += lapse * this.speed * this.vector.x;
    this.y += lapse * this.speed * this.vector.y;
};

Bubble.prototype.draw = function(context) {
    context.save();
    
    var alpha = 1 - (this.lifetime / this.max_lifetime);
    
    context.beginPath();
    context.arc(relative.x(this.x), relative.y(this.y), this.radius, 0, 2 * Math.PI);
    context.fillStyle = "rgba(255, 255, 255, " + alpha + ")";
    context.fill();
    
    context.restore();
};

Bubble.prototype.collision = function() {
    //do nothing
};