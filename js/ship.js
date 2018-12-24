//also contains the data for torpedos
function Ship(x, y, is_enemy) {
    this.x = x;
    this.y = y;
    this.v = { x: 0, y: 0, };
    
    this.angle = -Math.PI / 2;
    
    this.is_enemy = is_enemy;
    
    this.time_since_fire = 0;
    
    //variable stuff, to make each ship different
    this.thrust = Math.random() * 0.002 + 0.004;
    this.rot    = Math.random() * 0.001 + 0.0025;
    this.reload = Math.trunc(Math.random() * 150) + 175;
    
    this.active = true;
}

//constants
Ship.prototype.friction = 0.0125;
Ship.prototype.width    = 30;
Ship.prototype.height   = 20;

Ship.prototype.fire = function() {
    
};

Ship.prototype.draw = function(context) {
    context.save();
    
    context.translate(relative.x(this.x), relative.y(this.y));
    context.rotate(angle);
    context.drawImage(this.sprite, -this.width / 2, -this.height / 2);
    
    context.restore();
};

/* ----------------------------------------------------------------- */

function Torpedo(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.v = { x: vx, y: vy, };
    
    this.angle = Math.asin(vy);
    if (vx < 0) { this.angle = Math.PI - this.angle; }
    
    this.active = true;
}

Torpedo.prototype.sprite = Assets.torpedo;
Torpedo.prototype.speed  = 0.6;
Torpedo.prototype.damage = 10;

Torpedo.prototype.get_new_position = function(lapse) {
    this.x += this.v.x * lapse * this.speed;
    this.y += this.v.y * lapse * this.speed;
    
    //create a bubble
    Engine.projectiles.push(new Bubble(this.x, this.y, -Math.cos(this.angle), -Math.sin(this.angle)));
    
    //despawning behaviour
    if (this.x < 0 || this.x > Engine.map_size.x) {
        this.active = false;
    }
    
    if (this.y < 0 || this.y > Engine.map_size.y) {
        this.active = false;
    }
};

Torpedo.prototype.collision = function(a) {
    a.collision(this.damage);
    
    Engine.projectiles.push(new Explosion_particle(this.x, this.y));
    
    this.active = false;
};

Torpedo.prototype.draw = function(context) {
    context.save();
    
    context.translate(relative.x(this.x), relative.y(this.y));
    context.rotate(this.angle);
    context.drawImage(this.sprite, -7.5, -3);
    
    context.restore();
};

/* ----------------------------------------------------------------- */

function Special_ship(x, y) {
    this.x = x;
    this.y = y;
    this.v = { x: 0, y: 0, };
    
    this.angle = -Math.PI / 2;
    
    this.friction = 0.013; //slightly more
    this.width    = 30;
    this.height   = 20;
    
    this.rot    = 0.0025;
    this.thrust = 0.0045;
    
    this.reload = 1250;
    
    this.time_since_fire = 0;
    
    this.sprite = Assets.special_ship;
    
    this.true;
}