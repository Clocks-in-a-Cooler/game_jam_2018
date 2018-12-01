// Events, prewritten script neatly bunched up here.
// Trigger: some condition.
var events = {
	
	// CASCADING INIT
	"initialize":
	{
		"trigger": function()
		{
			return true;
		},
		
		"event": function()
		{
			MPM.append_build_panel(
				MPM.create_button("Where am I?",
					function()
					{
						Engine.notify("That's irrelevant for the moment. What you need to do is as following:");
						MPM.remove_element("hello_button");
						events["initialize_solar_panel_pickup"]["event"]();
					},"hello_button",["light_button"]));
			//
		}
	},
	
	"initialize_solar_panel_pickup":
	{
		"trigger": function()
		{
			
		},
		
		"event": function()
		{
			let solar_panels = 2;
			let pickup_button = MPM.create_button("Here is a Solar Panel, take it.",
				function()
				{
					Engine.notify("Yup, that's a solar panel alright.")
					solar_panels -= 1;
					City.add_ware("photovoltaic_panel",1);
					if(solar_panels <= 0)
					{
						MPM.remove_element("pickup_button");
						events["initialize_solar_panel_setup"]["event"]();
					}
					MPM.time_out(pickup_button, MPM.DEFAULT_COOLDOWN);
				},"pickup_button",["light_button"]);
			MPM.append_build_panel(pickup_button);
		}
	},
	
	"initialize_solar_panel_setup":
	{
		"trigger": function()
		{
			
		},
		
		"event": function()
		{
			let bot_button = MPM.create_button("Build a Mining Bot"
				,function()
				{
					City.buy_building("minerbot");
				}
				,"initialize_build_bot_button",["light_button"]
				,MPM.create_tooltip(JSON.stringify(buildings["minerbot"].buy())));
			build_panel.appendChild(MPM.disable(bot_button));
			build_panel.appendChild(MPM.create_button("Set it up"
				,function()
				{
					if(City.buy_building("solar_panel"))
					{
					}
					if(!City.get_ware("photovoltaic_panel").number)
					{
						MPM.remove_element('initialize_solar_panel_setup_button');	
						Engine.notify("A little more to the right?");
						Engine.notify("That's all of them.");
						events["initialize_mining"]["event"]();
					}
					MPM.time_out(bot_button, MPM.DEFAULT_COOLDOWN);
				}
				,"initialize_solar_panel_setup_button",["light_button"]));
		}
	},
	
	"initialize_mining": 
	{
		"trigger": function()
		{
			
		},
		
		"event": function()
		{
			var mine_button = MPM.create_button("Mine"
				,function()
				{
					City.mine_resources();
					MPM.time_out(mine_button,MPM.MINING_COOLDOWN);
					
				}
				,"mine_button",["light_button"]);
			build_panel.appendChild(mine_button);
			Engine.add_trigger("initialize_bot_button");
			Engine.add_trigger("initialize_trade_solar_panel");
			Engine.add_trigger("unlock_iron_smelter");
			
		}
	},
	
	"initialize_bot_button":
	{
		"trigger": function()
		{
			if (City.get_ware("crovanite").number>=50)
			{
				return true;
			}
			return false;
		},
		
		"event": function()
		{
			MPM.enable(MPM.get_button("initialize_build_bot_button"));
			Engine.remove_trigger("initialize_bot_button");
		}
	},
	
	"initialize_trade_solar_panel":
	{
		"trigger": function()
		{
			if (City.get_ware("battery").number>=10)
			{
				return true;
			}
			return false;
		},
		
		"event": function()
		{
			Engine.notify("A strange looking robot appears out of nowhere. It wants 100 pieces of crovanite and 10 batteries, says it can find solar panels.");
			var trade_button = MPM.create_button("Trade for a Solar Panel"
				,function()
				{
					if(City.get_ware("battery").number >= 10 && City.get_ware("crovanite").number >= 100)
					{
						City.add_ware("battery",-10);
						City.add_ware("crovanite",-100);
						City.add_ware("photovoltaic_panel",1);
					}
				}
				,"trade_button",["light_button"]
				,MPM.create_tooltip("100 pieces of crovanite and 10 batteries for 1 solar panel."));
			build_panel.appendChild(trade_button);
			
			build_panel.appendChild(MPM.create_button("Set up a solar panel"
				,function()
				{
					if(City.buy_building("solar_panel")){
						//Engine.notify("A little more to the right?");		
					}
				}
				,"initialize_solar_panel_setup_button2",["light_button"]));
			
			Engine.remove_trigger("initialize_trade_solar_panel");
			Engine.add_trigger("initialize_repair_ship_button");
			
		}
	},
	
	"initialize_repair_ship_button":
	{
		"trigger": function()
		{
			if (City.get_ware("decinium").number>=10)
			{
				return true;
			}
			return false;
		},
		
		"event": function()
		{
			build_panel.appendChild(MPM.create_button("Repair ship"
				,function()
				{
					if (City.get_ware("crovanite").number >= 10000 && City.get_ware("decinium").number >= 3000 && City.get_ware("battery").number >= 100 && City.get_ware("iron").number >= 2000 && City.get_ware("silicon").number >= 5000 && City.get_ware("plastic").number >= 5000 )
					{
						City.add_ware("crovanite",-10000);
						City.add_ware("decinium",-3000);
						City.add_ware("battery",-100);
						City.add_ware("iron",-2000);
						City.add_ware("silicon",-5000);
						City.add_ware("plastic",-5000);
						Engine.notify("With a bit of Engine grease and miracle work, you manage to fix the ship. Let's hope it's seaworthy.");
						MPM.remove_element("initialize_repair_ship_button");
						events["initialize_explore_button"]["event"]();
					}
					else 
					{
						Engine.notify("You don't have enough resources.");
					}
				}
				,"initialize_repair_ship_button",["light_button"]
				,MPM.create_tooltip("10000 crovanite 3000 decinium, 100 batteries, 2000 iron, 5000 silicon, 5000 plastic")));
			
			Engine.remove_trigger("initialize_repair_ship_button");
			Engine.notify("The mysterious robot returns, and guides you to a dark place you've not seen before. There is a ship here, and you want to repair it.");
		}
	},
	
	"initialize_explore_button":
	{
		"trigger": function()
		{
			
		},
		
		"event": function()
		{
			build_panel.appendChild(MPM.create_button("Explore"
				,function()
				{
					Engine.switch_explore();
					Engine.notify("The old engine creaks and cracks, but it flys!");
				}
				,"initialize_explore_button",["light_button"]
				,MPM.create_tooltip("Fly!")));
		}
	},
	
	"unlock_iron_smelter":
	{
		"trigger": function()
		{
			if (City.get_ware("raw_iron").number >= 50)
			{
				return true;
			}
			return false;
		},
		
		"event": function()
		{
			var button = MPM.create_button("Metal Forge"
				,function()
				{
					City.buy_building("iron_smelter");
					MPM.time_out(button, MPM.DEFAULT_COOLDOWN);
				}
				,"buy_iron_smelter",["light_button"]
				,MPM.create_tooltip(JSON.stringify(buildings["iron_smelter"].buy())));
			build_panel.appendChild(button);
			Engine.remove_trigger("unlock_iron_smelter");
			Engine.add_trigger("unlock_mining_depot");
			Engine.add_trigger("unlock_solar_distiller");
			Engine.add_trigger("unlock_helium_collector");
		}
	},
	
	"unlock_mining_depot":
	{
		"trigger": function()
		{
			if (City.get_ware("iron").number >= 10)
			{
				return true;
			}
			return false;
		},
		
		"event": function()
		{
			var button = MPM.create_button("Bot Depot"
				,function()
				{
					City.buy_building("mining_depot");
					MPM.time_out(button, MPM.DEFAULT_COOLDOWN);
				}
				,"buy_mining_depot",["light_button"]
				,MPM.create_tooltip(JSON.stringify(buildings["mining_depot"].buy())));
			build_panel.appendChild(button);
			Engine.remove_trigger("unlock_mining_depot");
		}
	},
	
	"unlock_solar_distiller":
	{
		"trigger": function()
		{
			if (City.get_ware("decinium").number >= 200)
			{
				return true;
			}
			return false;
		},
		
		"event": function()
		{
			var button = MPM.create_button("Distiller"
				,function()
				{
					City.buy_building("solar_distiller");
					MPM.time_out(button, MPM.DEFAULT_COOLDOWN);
				}
				,"buy_solar_distiller",["light_button"]
				,MPM.create_tooltip(JSON.stringify(buildings["solar_distiller"].buy())));
			build_panel.appendChild(button);
			Engine.remove_trigger("unlock_solar_distiller");
		}
	},
	
	"unlock_helium_collector":
	{
		"trigger": function()
		{
			if (City.get_ware("crovanite").number >= 100 && City.get_ware("decinium").number >= 200)
			{
				return true;
			}
			return false;
		},
		
		"event": function()
		{
			var button = MPM.create_button("Helium Collector"
				,function()
				{
					City.buy_building("helium_collector");
					MPM.time_out(button, MPM.DEFAULT_COOLDOWN);
				}
				,"buy_helium_collector",["light_button"]
				,MPM.create_tooltip(JSON.stringify(buildings["helium_collector"].buy())));
			build_panel.appendChild(button);
			Engine.remove_trigger("unlock_helium_collector");
			Engine.add_trigger("unlock_helium_fusion_plant");
		}
	},
	
	"unlock_helium_fusion_plant":
	{
		"trigger": function()
		{
			if (City.get_ware("helium3").number >= 1000 && City.get_ware("crovanite").number >= 5000 && City.get_ware("iron").number >= 500)
			{
				return true;
			}
			return false;
		},
		
		"event": function()
		{
			var button = MPM.create_button("Fusion Plant"
				,function()
				{
					City.buy_building("helium_fusion_plant");
					MPM.time_out(button, MPM.DEFAULT_COOLDOWN*3);
				}
				,"buy_helium_fusion_plant",["light_button"]
				,MPM.create_tooltip(JSON.stringify(buildings["helium_fusion_plant"].buy())));
			build_panel.appendChild(button);
			Engine.remove_trigger("unlock_helium_fusion_plant");
		}
	},
	
	// these triggers loop 
	"shutoff_helium_fusion_plant": 
	{
		"trigger": function()
		{
			if (City.get_ware("helium3").number <= 0 || City.get_ware("water").number <= 0)
			{
				return true;
			}
			return false;
		},
		
		"event": function()
		{
			// check global var 
			if (Engine.get_event_global("helium_plant_shutoff") === null)
			{
				Engine.add_event_global("helium_plant_shutoff",true);
				City.add_utility_capacity('energy',-100);
			}
			else
			{
				if (Engine.get_event_global("helium_plant_shutoff"))
				{
					
				}
				else 
				{
					Engine.set_event_global("helium_plant_shutoff",true);
					City.add_utility_capacity('energy',-100);
				}
			}
		}
	},
	
	"restart_helium_fusion_plant":
	{
		"trigger": function()
		{
			if (City.get_ware("helium3").number > 0 && City.get_ware("water").number > 0)
			{
				return true;
			}
			return false;
		},
		
		"event": function()
		{
			// check global var 
			if (Engine.get_event_global("helium_plant_shutoff") === null)
			{
				Engine.add_event_global("helium_plant_shutoff",false);
				City.add_utility_capacity('energy',100);
			}
			else
			{
				if (Engine.get_event_global("helium_plant_shutoff"))
				{
					Engine.set_event_global("helium_plant_shutoff",false);
					City.add_utility_capacity('energy',100);
				}
				else 
				{
					
				}
			}
		}
	},
	
	"explore_asteroid_mining_pickup_1":
	{
		"trigger": function()
		{
			return true;
		},
		
		"event": function()
		{
			let added = [Math.floor(Math.random()*10),Math.floor(Math.random()*5)];
			// adds stuff directly to warehouse! 
			City.add_ware("raw_iron",added[0]);
			City.add_ware("raw_decinium",added[1]);
			Engine.notify("Collected " + added[0] + " iron ore and " + added[1] + " decinium ore."); 
			Engine.log("Pickup " + added[0] + " iron ore and " + added[1] + " decinium ore.");
			if (Math.random() < 0.025)
			{
				let added_rare = [Math.floor(Math.random()*8)];
				City.add_ware("sternium",added_rare[0]);
				Engine.notify("We also found " + added_rare[0] + " sternium ore.");
				Engine.log("Pickup " + added_rare[0] + " sternium ore.");
			}
		}
	},
}