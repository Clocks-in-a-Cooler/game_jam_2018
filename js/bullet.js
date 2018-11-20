function Bullet(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    
    this.vector = {
        x: vx,
        y: vy,
    };
    
    this.lifetime = 0;
    this.active   = true;
}

Bullet.prototype.max_lifetime = 2500; //in milliseconds
Bullet.prototype.speed        = 0.4;

Bullet.prototype.get_new_position = function(lapse) {
    if (this.lifetime + lapse > this.max_lifetime) {
        this.active = false;
    } else {
        this.lifetime += lapse;
    }
    
    this.x += this.vector.x * lapse * this.speed;
    this.y += this.vector.y * lapse * this.speed;
};

Bullet.prototype.draw = function(context) {
    context.drawImage(Assets.bullet, this.x - 2.5, this.y - 2.5);
};

Bullet.prototype.collision = function() {
    this.active = false;
};