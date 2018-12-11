function Asteroid(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vector = {
        x: vx,
        y: vy,
    };
    
    this.speed = 0.05;
    
    this.angle       = Math.random() * 2 * Math.PI;
    this.angle_speed = Math.random() > 0.5 ? 0.0007 : -0.0007;
    
    this.health = 15;
    this.active = true;
    
    this.horizontal_offset = -39;
    this.vertical_offset   = -33;
    
    this.offset = 36;
}

Asteroid.prototype.get_new_position = function(lapse) {
    this.x += this.vector.x * lapse * this.speed;
    this.y += this.vector.y * lapse * this.speed;
    
    this.angle += this.angle_speed * lapse;
    
    this.check_collision();
    
    this.bounce();
};

Asteroid.prototype.draw = function(context) {
    context.save();
    
    context.translate(relative.x(this.x), relative.y(this.y));
    context.rotate(this.angle);
    context.drawImage(Assets.asteroid, this.horizontal_offset, this.vertical_offset);
    
    context.restore();
};

Asteroid.prototype.bounce = function() {
    if (this.x < 0 && this.vector.x < 0) {
        this.vector.x *= -1;
    }
    
    if (this.x > Engine.map_size.x && this.vector.x > 0) {
        this.vector.x *= -1;
    }
    
    if (this.y < 0 && this.vector.y < 0) {
        this.vector.y *= -1;
    }
    
    if (this.y > Engine.map_size.y && this.vector.y > 0) {
        this.vector.y *= -1;
    }
};

Asteroid.prototype.check_collision = function() {
    var x = this.x, y = this.y;
    var a = this;
    
    var bullets = Engine.projectiles.filter(function(b) {
        return (
            b.x >= x - 35 &&
            b.x <= x + 35 &&
            b.y >= y - 35 &&
            b.y <= y + 35
        ) && (b instanceof Bullet || b instanceof Torpedo);
    });
    
    bullets.forEach(function(b) {
        b.collision(a);
    });
};

Asteroid.prototype.collision = function(n) {
    this.health -= n || 1;
    
    if (this.health <= 0) {
        this.explode();
    }
};

Asteroid.prototype.explode = function() {
    this.active = false;
    Engine.log("an asteroid has been destroyed.");
    
    //then scatter some resources
    var num = Math.random() * 8 + 3;
    while (num > 0) {
        var angle  = Math.random() * 2 * Math.PI;
        var radius = Math.random() * 75;
        
        Engine.resources.push(new Pickupable(Math.cos(angle) * radius + this.x, Math.sin(angle) * radius + this.y));
        num -= 1;
    }
};