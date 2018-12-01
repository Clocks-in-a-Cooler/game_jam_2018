/* this file also contains code for the player's home star */

var Player_planet = (function() {
    var pos = {x: null, y: null};
    
    var angle = Math.PI;
    
    var radius = 100;
    
    var orbit_speed  = 0.00001;
    var orbit_radius = 400;
    return {
        init: function() {
            pos.x = Player_home_star.x;
            pos.y = Player_home_star.y - orbit_radius;
        },
        
        get_new_position: function(lapse) {
            //get the position it should go to
            angle += orbit_speed * lapse;
            
            /*
            var should_x = Math.cos(angle) * orbit_radius + Player_home_star.x + radius;
            var should_y = Math.sin(angle) * orbit_radius + Player_home_star.y + radius;
            
            //now get the position it's actually going to
            pos.x += (should_x - pos.x - radius) * speed;
            pos.y += (should_y - pos.y - radius) * speed;
            */
            
            pos.x = Math.cos(angle) * orbit_radius + Player_home_star.x;
            pos.y = Math.sin(angle) * orbit_radius + Player_home_star.y;
        },
        
        draw: function(context) {
            //debug this.
            context.drawImage(Assets.player_planet, relative.x(pos.x - radius), relative.y(pos.y - radius));
        },
        
        get x() { return pos.x; },
        get y() { return pos.y; },
        get radius() { return radius; },
    };
})();

var Player_home_star = (function() {
    var pos = { x: Engine.map_size.x / 2, y: Engine.map_size.y / 2 };
    
    var radius = 100; //a bit small, but to give it arcade-y feel to the game
    
    var heat_radius = 200; //a bit hot here...
    
    return {
        get_new_position: function(lapse) {
            //ha ha, just kidding. this star ain't goin' anywhere!
        },
        
        draw: function(context) {
            //debug this
            
            context.drawImage(Assets.star, relative.x(pos.x - radius - 25), relative.y(pos.y - radius - 25));
        },
        
        get radius() { return radius; },
        get x() { return pos.x; },
        get y() { return pos.y; },
        get heat_radius() { return heat_radius; },
    };
})();