/* this file also contains code for the player's home star */

var Player_planet = (function() {
    var angle = Math.PI;
    var pos   = { x: 2500, y: 2500 };
    
    var radius = 100;
    
    var orbit_speed  = 0.0001;
    var orbit_radius = 400;
    return {
        get_new_position: function(lapse) {
            //get the position it should go to
            angle += orbit_speed * lapse;
            var should_x = Math.cos(angle) * orbit_radius + Player_home_star.x + radius;
            var should_y = Math.sin(angle) * orbit_radius + Player_home_star.y + radius;
            
            //now get the position it's actually going to
            pos.x += (should_x - pos.x - radius) * orbit_speed;
            pos.y += (should_y - pos.y - radius) * orbit_speed;
        },
        
        draw: function(context) {
            //finish this.
            //remember to register the planet's sprite file
        },
        
        get x() { return pos.x; },
        get y() { return pos.y; },
        get radius() { return radius; },
    };
})();

var Player_home_star = (function() {
    
    var radius = 100; //a bit small, but to give it arcade-y feel to the game
    
    var heat_radius = 200; //a bit hot here...
    
    return {
        get_new_position: function(lapse) {
            //ha ha, just kidding. this star ain't goin' anywhere!
        },
        
        draw: function(context) {
            //finish the code for this.
            //remember to register the star sprite file
        },
        
        get radius() { return radius; },
        get x() { return Engine.map_size.x / 2; },
        get y() { return Engine.map_size.y / 2; },
        get heat_radius() { return heat_radius; },
    };
})();