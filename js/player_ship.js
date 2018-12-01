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
    
    var SHIP_WIDTH_OFFSET  = 15;
    var SHIP_HEIGHT_OFFSET = 10;
    
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
        
        //reset the vectors if the player's ship is at the edge
        if (POS.x == 0 || POS.x == Engine.map_size.x) {
            VECTOR.x = 0;
        }
        
        if (POS.y == 0 || POS.y == Engine.map_size.y) {
            VECTOR.y = 0;
        }
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
        
        init: function() {
            //just above the planet
            POS.x = Player_planet.x;
            POS.y = Player_planet.y - 200;
        },
        
        get is_moving() { return !(in_orbit && in_combat);},
        
        get angle() { return angle; },
        get pos() { return POS; },
        
        set forward(a)   { keys.forward   = a; },
        set rot_left(a)  { keys.rot_left  = a; },
        set rot_right(a) { keys.rot_right = a; },
        set reverse(a)   { keys.reverse = a; },
        set fire(a)      { keys.fire = a; },
    };
})();

function draw_arrow(context) {
    //for drawing the little arrow that guides the player home
    
    //find the angle. TRIG all over again! *fun*!
    //tangent's a weird one, so i'll use sine.
    var angle;
    var opp = (Player_ship.pos.y - Player_planet.y) * -1;
    var hyp = Math.hypot(Player_ship.pos.x - Player_planet.x, Player_ship.pos.y - Player_planet.y);
    
    angle = Math.asin(opp / hyp);
    
    if (Player_ship.pos.x >= Player_planet.x) {
        angle = Math.PI - angle;
    }
    
    var draw_x = Math.cos(angle) * 100 + (Engine.viewport.width / 2);
    var draw_y = Math.sin(angle) * 100 + (Engine.viewport.height / 2);
    
    context.save();
    
    context.translate(draw_x, draw_y);
    context.rotate(angle);
    context.drawImage(Assets.arrow, -4, -8);
    
    context.restore();
}

function get_angle() {
        var angle;
    var opp = -1 * (Player_ship.pos.y - Player_planet.y);
    var hyp = Math.hypot(Player_ship.pos.x - Player_planet.x, Player_ship.pos.y - Player_planet.y);
    
    angle = Math.asin(opp / hyp);
    
    if (Player_ship.pos.x >= Player_planet.x) {
        angle = Math.PI - angle;
    }
    
    return angle;
}

function toDeg(x) { return x * 180 / Math.PI; }
