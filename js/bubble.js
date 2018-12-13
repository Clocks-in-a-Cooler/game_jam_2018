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

/*------------------------------------------------------------------ */

function Explosion_particle(x, y) {
    this.x = x;
    this.y = y;
    
    this.lifetime     = 0;
    this.max_lifetime = Math.trunc(Math.random() * 50) + 225;
    
    this.active = true;
}

Explosion_particle.prototype.explode_speed = 0.25;

Explosion_particle.prototype.collision = function() { /* do nothing */ };

Explosion_particle.prototype.get_new_position = function(lapse) {
    if (this.lifetime + lapse > this.max_lifetime) {
        this.active = false;
    } else {
        this.lifetime += lapse;
    }
};

Explosion_particle.prototype.draw = function(context) {
    context.save();
    
    var radius = this.lifetime * this.explode_speed;
    var alpha  = 1 - Math.pow((this.lifetime / this.max_lifetime), 4);
    
    context.beginPath();
    context.arc(relative.x(this.x), relative.y(this.y), radius, 0, 2 * Math.PI);
    context.fillStyle = "rgba(255, 99, 71, " + alpha + ")";
    context.fill();
    
    context.restore();
};