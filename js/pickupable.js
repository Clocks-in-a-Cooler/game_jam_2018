function Pickupable(x, y) {
    this.x = x; this.y = y;
    
    this.active = true;
    
    this.speed  = 0.007;
    this.offset = 5;
}

Pickupable.prototype.get_new_position = function(lapse) {
    //these don't move, unless the player is nearby
    
    //"magnetic" effect
    if (Math.hypot(this.x - Player_ship.pos.x, this.y - Player_ship.pos.y) < 50) {
        var next_pos = {
            x: this.x + (Player_ship.pos.x - this.x - this.offset) * this.speed * lapse,
            y: this.y + (Player_ship.pos.y - this.y - this.offset) * this.speed * lapse,
        };
        
        this.x = next_pos.x;
        this.y = next_pos.y;
    }
    
    //but check for collision with the player. to simplify this,
    //treat the player as a 20 by 20 square
    //treat the pickup as a point
    var x = Player_ship.pos.x, y = Player_ship.pos.y;
    
    var same_x = (this.x < x + 10 && this.x > x - 10);
    var same_y = (this.y < y + 10 && this.y > y - 10);
    
    if (same_x && same_y) {
        this.pickup();
        this.active = false;
    }
};

Pickupable.prototype.draw = function(context) {
    context.drawImage(Assets.pickupable, relative.x(this.x - this.offset), relative.y(this.y - this.offset));
};

Pickupable.prototype.pickup = function() {
    //do something when the pickupable is touched
    Engine.log("a resource at (" + this.x + ", " + this.y + ") has been picked up.");
    
    //insert stuff below
	events["explore_asteroid_mining_pickup_1"]["event"]();
};