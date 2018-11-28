var Player_ship = (function() {
    var HEALTH = 150;
    
    var POS = {
        x: 100,
        y: 100,
    };
    
    var VECTOR = {
        x: 0,
        y: 0,
    };
    
    var THRUST    = 0.005;
    var MAX_SPEED = 0.5;
    var ROT_SPEED = 0.003;
    var FRICTION  = 0.0125; //coefficient of friction
    var angle     = -Math.PI / 2; //start facing...up?
    
    var time_since_fire = 0; //time since last fire
    var FIRE_TIME       = 250;
    
    var keys = {
        forward:   false,
        rot_left:  false,
        rot_right: false,
        reverse:   false,
        fire:      false,
    };
    
    //I'm retiring this; maybe use it somewhere else someday
    var wrap = function() {
        if (POS.x < 0) {
            POS.x += Engine.canvas_x;
        }
        
        if (POS.x > Engine.canvas_x) {
            POS.x = POS.x % Engine.canvas_x;
        }
        
        if (POS.y < 0) {
            POS.y += Engine.canvas_y;
        }
        
        if (POS.y > Engine.canvas_y) {
            POS.y = POS.y % Engine.canvas_y;
        }
    };
    
    var SHIP_WIDTH_OFFSET  = 15;
    var SHIP_HEIGHT_OFFSET = 10;
    
    var in_orbit  = false;
    var in_combat = false;
    
    var weapons   = [];
    var abilities = []; //store functions for them here.
    
    //changes the engine...of the ship, not the game
    function set_thrust(t) {
        //the thrust to friction ratio is 0.4, by the way.
        THRUST = t;
        Engine.log("player ship's THRUST changed to " + t + ".");
    }
    
    //movement functions
    function rotate(lapse) {
        //rotates the ship
        angle += (keys.rot_left ? -ROT_SPEED * lapse : 0);
        angle += (keys.rot_right ? ROT_SPEED * lapse : 0);
    }
    
    function get_friction() {
        //gets the friction vector
        return {
            x: -VECTOR.x * FRICTION,
            y: -VECTOR.y * FRICTION,
        };
    }
    
    function get_thrust() {
        //gets the thrust vector
        
        //make a bubble
        if (keys.forward) {
            Engine.projectiles.push(new Bubble(POS.x, POS.y, -Math.cos(angle), -Math.sin(angle)));
        }
        
        return {
            x: (keys.forward ? Math.cos(angle) * THRUST : 0),
            y: (keys.forward ? Math.sin(angle) * THRUST : 0),
        };
    }
    
    function keep_in_bounds() {
        POS.x = Math.max(POS.x, 0);
        POS.y = Math.max(POS.y, 0);
        
        POS.x = Math.min(POS.x, Engine.map_size.x);
        POS.y = Math.min(POS.y, Engine.map_size.y);
    }
    
    function fire_bullet() {
        return new Bullet(POS.x, POS.y, Math.cos(angle), Math.sin(angle));
    }
    
    return {
        enter_orbit: function() {
            //code for entering orbit around a planet
        },
        
        get_new_position(lapse) {
            //first, update the angles
            rotate(lapse);
            
            //get friction
            VECTOR.x += get_friction().x;
            VECTOR.y += get_friction().y;
            
            //get thrust
            VECTOR.x += get_thrust().x;
            VECTOR.y += get_thrust().y;
            
            POS.x += VECTOR.x * lapse;
            POS.y += VECTOR.y * lapse;
            
            //handle firing
            time_since_fire += lapse;
            
            if (keys.fire && time_since_fire > FIRE_TIME) {
                Engine.projectiles.push(fire_bullet());
                time_since_fire = 0;
            }
            
            keep_in_bounds();
        },
        
        draw: function(context) {
            context.save();
            
            context.translate(relative.x(POS.x), relative.y(POS.y));
            context.rotate(angle);
            context.drawImage(Assets.player_ship, -SHIP_WIDTH_OFFSET, -SHIP_HEIGHT_OFFSET);
            
            context.restore();
        },
        
        get is_moving() { return !(in_orbit && in_combat);},
        
        get angle() { return angle; },
        get pos() { return POS; },
        
        get weapons() { return weapons; },
        get abilities() { return abilities; },
        
        set forward(a)   { keys.forward   = a; },
        set rot_left(a)  { keys.rot_left  = a; },
        set rot_right(a) { keys.rot_right = a; },
        set reverse(a)   { keys.reverse = a; },
        set fire(a)      { keys.fire = a; },
        
        set thrust(t) { set_thrust(t); },
    };
})();

function draw_arrow(context) {
    //for drawing the little arrow that guides the player home
    
    //find the angle. TRIG all over again! *fun*!
    //tangent's a weird one, so i'll use sine.
    var angle;
    var opp = Player_ship.pos.y - Player_planet.y;
    var hyp = Math.hypot(Player_ship.pos.x - Player_planet.x, Player_ship.pos.y - Player_planet.y);
    
    angle = Math.asinh(opp / hyp);
    
    var draw_x = Math.cos(angle) * 100 + (Engine.viewport.width / 2);
    var draw_y = Math.sin(angle) * 100 + (Engine.viewport.height / 2);
    
    context.save();
    
    context.translate(draw_x, draw_y);
    context.rotate(angle);
    context.drawImage(Assets.arrow, -4, -8);
    
    context.restore();
}