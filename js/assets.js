var Assets = (function() {
    //place image assets here
    var arrow       = create_image("assets/arrow.png");
    var player_ship = create_image("assets/player_ship.png");
    
    var player_planet  = create_image("assets/player_planet.png");
    var star           = create_image("assets/star.png");
    var alien_planet_1 = create_image("assets/alien_planet_1.png");
    
    var allied_ship  = create_image("assets/allied_ship.png");
    var enemy_ship   = create_image("assets/enemy_ship.png");
    var special_ship = create_image("assets/special_ship.png");
    
    var asteroid = create_image("assets/asteroid.png");
    var bullet   = create_image("assets/bullet.png");
    var pickup   = create_image("assets/pickupable.png");
    
    return {
        get arrow() { return arrow; },
        get player_ship() { return player_ship; },
        
        get asteroid() { return asteroid; },
        get bullet() { return bullet; },
        get pickupable() { return pickup; },
        
        get player_planet() { return player_planet; },
        get star() { return star; },
        get alien_planet_1() { return alien_planet_1; },
        
        get allied_ship() { return allied_ship; },
        get enemy_ship() { return enemy_ship; },
        get special_ship() { return special_ship; },
    };
})();

function create_image(path) {
    var img = document.createElement("img");
    img.src = path;
    return img;
}

function create_audio(path) {
    return new Audio(path);
}