/* CAUTION -- DIFFERENT FROM map_adventure's SCENE_HANDLER */

var scene_handler = (function() {
    var overlay = (function() {
        var e = create_element("div", "overlay");
        
        e.style.visibility = "hidden";
        
        return e;
    })();
    
    var scene_display = (function() {
        var e = create_element("div", "scene_display");
        
        e.style.visibility = "hidden";
        
        return e;
    })();
    
    function create_element(tag, class, inner_html) {
        var elt = document.createElement(tag);
        
        if (class) {
            var att   = document.createAttribute("class");
            att.value = class;
            
            elt.setAttributeNode(att);
        }
        
        if (inner_html) {
            elt.innerHtml = inner_html;
        }
        
        return elt;
    }
    
    function parse_style(style) {
        //let's be honest, just use offsetHeight and offsetWidth
        return parseFloat(style.slice(0, -2));
    }
    
    function reposition_display() {
        scene_display.style.top  = (window.innerHeight - scene_display.offsetHeight) / 2;
        scene_display.style.left = (window.innerWidth - scene_display.offsetWidth) / 2;
        
        Engine.log("repositioned the scene display.");
    }
    
    function create_title(title) {
        //do i really need this here?
        return create_element("p", "scene_title", title);
    }
    
    return {
        init: function() {
            document.body.appendChild(overlay);
            document.body.appendChild(scene_display);
        },
        
        show_scene: function() {
            overlay.style.visbility        = "visible";
            scene_display.style.visibility = "visible";
        },
        
        hide_scene: function() {
            overlay.style.visibility       = "hidden";
            scene_display.style.visibility = "hidden";
        },
        
        get current_scene() { return current_scene; },
        set current_scene(s) { current_scene = s; },
    };
})();

//alias
var SH = scene_handler;