/** 
	A set of specific DOM actions relating to the main panel in ADR
		TODO:
		DESTROY THIS GOD OBJECT 
	@author Frank Lai 2002
	@version 2018-12-23
	https://github.com/laifrank2002
*/
var MPM = (
    function ()
    {
        
        var MINING_COOLDOWN = 250;
        var DEFAULT_COOLDOWN = 1000;
		var FLOATING_TEXT_TIME = 1000;
        var DEF_PANEL = "main_panel";
        var panel;
        // references
        var build_panel;
		var action_panel;
        var display_panel;
        var resources_panel;
        var utilities_panel;
        var buildings_panel;
        
        var buttons = {};
        return {
            initialize: function()
            {
                panel = document.getElementById("main_panel");
                // build_panel
                build_panel = MPM.create_panel("build_panel",["panel"]);
                // more elegant cascading events. Hey, I said more, not absolutely.
                events["initialize"]["event"]();
                
                // display panel
                display_panel = MPM.create_panel("display_panel",["panel"]);
                
                // resources panel
                resources_panel = MPM.create_panel("resources_panel",["panel","resource_panel"]);
                for (let index in resources)
                {
                    
                    resources_panel.appendChild(MPM.create_display(resources[index].name,index+"_display",["display","invisible"],MPM.create_tooltip(resources[index].tooltip_message,index+"_display_tooltip",["tooltip","bottom","right"])));
                }
                // buildings panel
                buildings_panel = MPM.create_panel("buildings_panel",["panel","resource_panel"]);
                // DO AUTO LATER TOO
                for (let index in buildings)
                {
                    buildings_panel.appendChild(MPM.create_display(buildings[index].name,index + "_display",["display","invisible"],MPM.create_tooltip(buildings[index].tooltip_message,index+"_display_tooltip",["tooltip","bottom","right"])));
                }
                
                // Utilities
                utilities_panel = MPM.create_panel("utilities_panel",["panel","resource_panel"]);
                // also do auto 
                for (let index in utilities)
                {
                    let utility_num_max = MPM.create_number(index + "_display" + "_number_maximum", ["display_number"]);
                    let utility_num = MPM.create_display(utilities[index].name,index + "_display",["display","invisible"],MPM.create_tooltip(utilities[index].tooltip_message,index+"_display_tooltip",["tooltip","bottom","right"]));
                    utility_num.appendChild(document.createTextNode("/"));
                    utility_num.appendChild(utility_num_max);
                    utilities_panel.appendChild(utility_num);
                }
                
                display_panel.appendChild(resources_panel);
                display_panel.appendChild(buildings_panel);
                display_panel.appendChild(utilities_panel);
				
				// action panel
				action_panel = MPM.create_panel("action_panel",["panel"]);

                // main 
                panel.appendChild(build_panel);
				panel.appendChild(action_panel);
                panel.appendChild(display_panel);
				
            },
            
            hide: function()
            {
                DOMM.add_class(panel,"invisible");
            },
            
            show: function()
            {
                DOMM.remove_class(panel,"invisible");
            },
            // DOM Managers
			// floating text 
			create_floating_text (element, message)
			{
				let floating_text = document.createElement('div');
				floating_text.classList.add("floating_text");
				
				// assign coordinates
				let coordinates = element.getBoundingClientRect();
				
				floating_text.style.left = coordinates.left + "px";
				floating_text.style.top = coordinates.top + "px";
				
				floating_text.appendChild(document.createTextNode(message));
				
				document.body.append(floating_text);
				setTimeout(() => floating_text.remove(), FLOATING_TEXT_TIME);
			},
			
            // buttons
            create_button: function(button_text,button_function,button_id,button_class,tooltip)
            {
                return DOMM_button(button_function, button_text, button_id, button_class, tooltip);
            },
            
			/*PROCESS OF DEPRECATING*/
            get_button: function(id)
            {
                return buttons[id];
            },
            
            remove_button: function(id)
            {
                MPM.remove_element(id);
				delete buttons[id];
            },
            
            // panels 
            create_panel: function(panel_id,panel_class)
            {
                var panel_element = document.createElement("div");
                if (panel_id)
                {
                    if (!document.getElementById(panel_id))
                    {
                        panel_element.id = panel_id;
                    }
                }
                else
                {
                    // do nothing because there is no id to set
                }
                if (panel_class)
                {
                    for(let index = 0; index<panel_class.length; index++)
                    {
                        panel_element.classList.add(panel_class[index]);
                    }
                }
                return panel_element;
            },
            
            // tooltip 
            create_tooltip: function(tooltip, tooltip_id, tooltip_class = ["tooltip"])
            {
                return DOMM_tooltip(tooltip, tooltip_id, tooltip_class);
            },
            
            // display
            create_display: function(display_name, display_id, display_class,tooltip)
            {
                var display_element = document.createElement("div");
                if (display_id)
                {
                    if (!document.getElementById(display_id))
                    {
                        display_element.id = display_id;
                    }
                }
                else
                {
                    // do nothing because there is no id to set
                }
                if (display_class)
                {
                    for(let index = 0; index<display_class.length; index++)
                    {
                        display_element.classList.add(display_class[index]);
                    }
                }
                display_element.innerHTML = display_name + ": ";
                // auto create number class and append 
                display_element.appendChild(MPM.create_number(display_id + "_number", ["display_number"]));
                // tooltip
                if (tooltip)
                {
                    display_element.appendChild(tooltip);
                }
                return display_element;
            },
            
            // updatable number element
            create_number: function(number_id, number_class)
            {
                var number_element = document.createElement("span");
                if (number_id)
                {
                    if (!document.getElementById(number_id))
                    {
                        number_element.id = number_id;
                    }
                }
                else
                {
                    // do nothing because there is no id to set
                }
                if (number_class)
                {
                    for(let index = 0; index<number_class.length; index++)
                    {
                        number_element.classList.add(number_class[index]);
                    }
                }
                number_element.innerHTML = "0";
                return number_element;
            },
            
            set_number: function(number_id, value)
            {
                if(document.getElementById(number_id))
                {
                    document.getElementById(number_id).innerHTML = value;
                }
            },
            
            append_build_panel: function(element)
            {
                if(element)
                {
                    build_panel.appendChild(element);
                }
            },
            
			append_action_panel: function(element)
            {
                if(element)
                {
                    action_panel.appendChild(element);
                }
            },
            // getters
            get DEFAULT_COOLDOWN() {return DEFAULT_COOLDOWN},
            get MINING_COOLDOWN() {return MINING_COOLDOWN},
        } //
    }
)();