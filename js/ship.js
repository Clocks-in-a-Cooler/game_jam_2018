//also contains the data for the special ship type...
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

/* -------------------------------------------------------------- */

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
}


function Torpedo = 