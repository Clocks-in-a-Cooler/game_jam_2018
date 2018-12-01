// def assets in JSON
var buildings = {
    'solar_panel': {
        'name': "Solar Panel",  
        'button': null,
        'maximum': 50,
        'tooltip_message': "What a nice solar panel.",
        'build_message': "One small step, one giant leap, blah blah blah.",
        'build_message_2': "Power to the people.",
        'build_message_3': "Green energy! In space?",
        'build_message_4': "Never stops working. Unless the star explodes.",
        'build_message_5': "Don Quixote proof!",
        'max_message': "No more space to put 'em up.",
        'buy': function()
        {
            return {
                'photovoltaic_panel': 1,
            };
        },
        'produce': function()
        {
            return
        },
        'utility': function()
        {
            return
        },
        'on_buy': function()
        {
            City.add_utility_capacity('energy',2);
        },
    },
    
    'minerbot': {
        'name': "Automatic Mining Rover",
        'button': null,
        'maximum': 3,
        'tooltip_message': "Mines ores automatically.",
        'build_message': "Good bot.",
        'build_message_2': "Bad bot.",
        'build_message_3': "If a bot could think, could it also think of dirty jokes?",
        'build_message_4': "NASA wants its bots back.",
        'build_message_5': "One bot two bot three bot - not four! They'll crash!",
        'max_message': "Any more and they'll crash into each other!",
        'buy': function()
        {
            return {
                'crovanite': 50,
                'silicon': 5,
                'plastic': 25,
                'battery': 2,
            };
        },
        'utility': function()
        {
            return {
                'energy': 1,
            }
        },
        'produce': function()
        {
            City.mine_resources();
        },
    },
    
    'mining_depot': {
        'name': "Mining Rover Depot",
        'button': null,
        'maximum': 3,
        'tooltip_message': "Holds 3 more mining bots.",
        'build_message': "A good bot to manage more bots.",
        'build_message_2': "If you stare at one long enough, it blinks.",
        'build_message_3': "Sector 2-4k is reporting for duty.",
        'build_message_4': "State of the art computer used to sort through trash.",
        'build_message_5': "A better bot that manages bots.",
        'max_message': "You'll need more garages to house these depots.",
        'buy': function()
        {
            return {
                'crovanite': 1000,
                'silicon': 500,
                'plastic': 250,
                'iron': 50,
            };
        },
        'utility': function()
        {
            return {
                'energy': 2,
            }
        },
        'on_buy': function()
        {
            City.add_building_maximum('minerbot', 3);
        },
    },
    
    'iron_smelter': {
        'name': "Metal Forge",
        'button': null,
        'maximum': 5,
        'tooltip_message': "Transforms 1 [metal] ore into 1 [metal]. Consumes water if possible to double output.",
        'build_message': "More iron!",
        'build_message_2': "Cap and trade policies have no effect in space.",
        'build_message_3': "The Chairman would be proud.",
        'build_message_4': "Twelve and twenty, six and four, another in the furnace, another out before.",
        'build_message_5': "Look at that blue smoke!",
        'max_message': "Carbon monoxide poisoning is never fun to have.",
        'buy': function()
        {
            return {
                'crovanite': 2500,
				'raw_iron': 200,
                'silicon': 100,
                'plastic': 50,
            };
        },
        'utility': function()
        {
            return {
                'energy': 3,
            }
        },
        'produce': function()
        {
            if (City.get_ware('raw_iron').number >= 1)
            {
                City.add_ware('raw_iron', -1);
                City.add_ware('iron', 1);
				
				if (City.get_ware('water').number >= 1)
				{	
					City.add_ware('water', -1);
					City.add_ware('iron', 1);
				}
            }
            if (City.get_ware('raw_decinium').number >= 1)
            {
                City.add_ware('raw_decinium', -1);
                City.add_ware('decinium', 1);
				
				if (City.get_ware('water').number >= 1)
				{	
					City.add_ware('water', -1);
					City.add_ware('decinium', 1);
				}
            }
        },
    },
    
    'solar_distiller': {
        'name': "Water Distiller",
        'button': null,
        'maximum': 10,
        'tooltip_message': "Uses the power of the sun and a polluted source to turn into clean (mostly) drinkable water at no cost to you in terms of energy!",
        'build_message': "We are now officially a second world country!",
        'build_message_2': "Technically you could just drink this sludge.",
        'build_message_3': "Basically just a big boiler.",
        'build_message_4': "You could make a statue out of all this pollution.",
        'build_message_5': "It looks like a horse if you squint. And suffer from oxygen deprivation.",
        'max_message': "There are only so many polluted streams to clean!",
        'buy': function()
        {
            return {
				'crovanite': 1000,
                'decinium': 200,
                'iron': 100,
                'plastic': 500,
            };
        },
        'produce': function()
        {
            City.add_ware('water', 1);
        },
    },
    
    'helium_fusion_plant': {
        'name': "Fusion Plant",
        'button': null,
        'maximum': 1,
        'tooltip_message': "Turns 1 He3 and 1 H2O into 100 Q.",
        'build_message': "(Almost) free energy!",
        'build_message_2': "(Almost) free energy!",
        'build_message_3': "(Almost) free energy!",
        'build_message_4': "(Almost) free energy!",
        'build_message_5': "(Almost) free energy!",
        'max_message': "There can be only one!",
        'buy': function()
        {
            return {
                'crovanite': 10000,
                'silicon': 500,
                'iron': 500,
                'plastic': 200,
                'helium3': 100,
                'water': 100,
            };
        },
        'produce': function()
        {
			City.add_ware("helium3",-1);
			City.add_ware("water",-1);
        },
        'on_buy': function()
        {
            City.add_utility_capacity('energy',100);
        },
    },
    
    'helium_collector': {
        'name': "Helium Collector Receivers",
        'button': null,
        'maximum': 10,
        'tooltip_message': "Freeride off of the limitless network of pre-existing He3 infrastructure! From [REDACTED] to your doorstep.",
        'build_message': "Nationalized Infrastructure!",
        'build_message_2': "From gas giants to your doorstep.",
        'build_message_3': "Collects and distributes tons of He3.",
        'build_message_4': "Don't you love the smell of helium in the morning.",
        'build_message_5': "Helium makes your voice sound funny.",
        'max_message': "Even government waste has its limits, the rest is coming after the paperwork is done.",
        'buy': function()
        {
            return {
                'decinium': 200,
                'crovanite': 100,
                'silicon': 25,
                'iron': 50,
                'plastic': 200,
                'water': 50,
            };
        },
        'produce': function()
        {
            City.add_ware("helium3",1);
        },
    },
    
    'chemical_plant': {
        'name': "Chemical Processing Plant",
        'button': null,
        'maximum': 5,
        'tooltip_message': "Refines all sorts of chemicals en masse into compounds and other products.",
        'build_message_2': "Now with clean and healthy purple smoke.",
        'build_message_3': "Certainly not taken from Penultimo's backyard and repainted to say <<Chemical Processing Plant>>.",
        'build_message_4': "Chemically sound. Structurally? I'm not so sure.",
        'build_message_5': "We're all made out of chemicals! So this is a chemical processing other chemicals into other other chemicals!",
        'max_message': "",
		'produce': function()
        {
            City.add_ware("chemicals",1);
        },
    },
	
	'manufacturing_plant': {
        'name': "Manufacturing Plant",
        'button': null,
        'maximum': 10,
        'tooltip_message': "Put those resources to good use, make some nice polished shinies!",
        'build_message': "",
        'build_message_2': "",
        'build_message_3': "",
        'build_message_4': "",
        'build_message_5': "",
        'max_message': "",
        'buy': function()
        {
            return {
                'decinium': 500,
                'crovanite': 250,
                'silicon': 100,
                'iron': 50,
                'plastic': 200,
                'water': 50,
            };
        },
    },
}