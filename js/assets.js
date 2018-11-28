var Assets = (function() {
    //place image assets here
    var arrow       = create_image("assets/arrow.png");
    var player_ship = create_image("assets/player_ship.png");
    
    var player_planet  = create_image("assets/player_planet.png");
    var alien_planet_1 = create_image("assets/alien_planet_1.png");
    
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
        get alien_planet_1() { return alien_planet_1; },
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