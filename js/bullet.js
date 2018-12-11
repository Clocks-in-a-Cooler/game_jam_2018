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

Bullet.prototype.speed  = 0.4;
Bullet.prototype.damage = 1;

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
    context.drawImage(Assets.bullet, relative.x(this.x - 2.5), relative.y(this.y - 2.5));
};

Bullet.prototype.collision = function(a) {
    a.collision(this.damage);
    this.active = false;
};