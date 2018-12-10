function Planet(star, orbit_radius, sprite) {
    this.star  = star;
    this.angle = Math.random() * 2 * Math.PI;
    
    this.orbit_radius = orbit_radius;
    //this part needs reworking to follow Kepler's third law
    //ignore: this.orbit_speed  = 1e-6; //also 0.000001
    
    this.orbit_speed = 0.0004 / this.orbit_radius;
    
    //now calculate its position
    this.x = Math.cos(angle) * this.orbit_radius + this.star.x;
    this.y = Math.sin(angle) * this.orbit_radius + this.star.y;
}

Planet.prototype.radius = 100;

Planet.prototype.get_new_position = function(lapse) {
    angle += orbit_speed * lapse;
    
    this.x = Math.cos(angle) * this.orbit_radius + this.star.x;
    this.y = Math.sin(angle) * this.orbit_radius + this.star.y;
};

Planet.prototype.draw = function(context) {
    context.drawImage(this.sprite, relative.x(this.x - this.radius), relative.y(this.y - this.radius));
};