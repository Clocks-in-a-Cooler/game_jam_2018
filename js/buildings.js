// def assets in JSON
var buildings = {
	'solar_panel': {
		'name': "Solar Panel",	
		'button': null,
		'maximum': 10,
		'tooltip_message': "What a nice solar panel.",
		'build_message': "One small step, one giant leap, blah blah blah.",
		'build_message_2': "One small step, one giant leap, blah blah.",
		'build_message_3': "One small step, one giant leap, blah.",
		'build_message_4': "One small step, one giant leap.",
		'build_message_5': "One small step, one giant.",
		'max_message': "That's about all the free space there is to set up these darn things.",
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
			City.add_utility_capacity('energy',1);
		},
	},
	
	'minerbot': {
		'name': "Automatic Mining Rover",
		'button': null,
		'maximum': 3,
		'tooltip_message': "Mines ores automatically.",
		'build_message': "Good bot.",
		'build_message_2': "One small step, one giant leap, blah blah.",
		'build_message_3': "One small step, one giant leap, blah.",
		'build_message_4': "One small step, one giant leap.",
		'build_message_5': "One small step, one giant.",
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
		'maximum': 2,
		'tooltip_message': "Holds 3 more mining bots.",
		'build_message': "A Good bot to manage more bots.",
		'build_message_2': "One small step, one giant leap, blah blah.",
		'build_message_3': "One small step, one giant leap, blah.",
		'build_message_4': "One small step, one giant leap.",
		'build_message_5': "One small step, one giant.",
		'max_message': "You'll need more garages to house these depots.",
		'buy': function()
		{
			return {
				'crovanite': 500,
				'silicon': 500,
				'plastic': 250,
				'iron': 400,
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
		'maximum': 2,
		'tooltip_message': "Transforms 1 iron ore into 1 iron.",
		'build_message': "More iron!",
		'build_message_2': "One small step, one giant leap, blah blah.",
		'build_message_3': "One small step, one giant leap, blah.",
		'build_message_4': "One small step, one giant leap.",
		'build_message_5': "One small step, one giant.",
		'max_message': "Little Timmy will soon discover the hazards of Carbon Monoxide poisoning.",
		'buy': function()
		{
			return {
				'crovanite': 100,
				'silicon': 100,
				'plastic': 50,
			};
		},
		'utility': function()
		{
			return {
				'energy': 5,
			}
		},
		'produce': function()
		{
			if (City.get_ware('raw_iron').number >= 1)
			{
				City.add_ware('raw_iron', -1);
				City.add_ware('iron', 1);
			}
		},
	},
	
	'solar_distiller': {
		'name': "Water Distiller",
		'button': null,
		'maximum': 3,
		'tooltip_message': "Uses the power of the sun and a polluted source to turn into clean (mostly) drinkable water at no cost to you in terms of energy!",
		'build_message': "We are now officially a second world country!",
		'build_message_2': "One small step, one giant leap, blah blah.",
		'build_message_3': "One small step, one giant leap, blah.",
		'build_message_4': "One small step, one giant leap.",
		'build_message_5': "One small step, one giant.",
		'max_message': "There are only so many polluted streams!",
		'buy': function()
		{
			return {
				'decinium': 200,
				'iron': 300,
				'plastic': 500,
			};
		},
		'produce': function()
		{
			City.add_ware('water',1);
		},
	},
	
	'helium_fusion_plant': {
		'name': "Fusion Plant",
		'button': null,
		'maximum': 1,
		'tooltip_message': "Turns He3 and H2O into Q.",
		'build_message': "(Almost) free energy!",
		'build_message_2': "One small step, one giant leap, blah blah.",
		'build_message_3': "One small step, one giant leap, blah.",
		'build_message_4': "One small step, one giant leap.",
		'build_message_5': "One small step, one giant.",
		'max_message': "You can only have one!",
		'buy': function()
		{
			return {
				'crovanite': 5000,
				'silicon': 500,
				'iron': 5000,
				'plastic': 200,
				'helium3': 10000,
				'water': 1000,
			};
		},
		'produce': function()
		{
			// implement consumption
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
		'build_message_2': "One small step, one giant leap, blah blah.",
		'build_message_3': "One small step, one giant leap, blah.",
		'build_message_4': "One small step, one giant leap.",
		'build_message_5': "One small step, one giant.",
		'max_message': "That's all of the outlets there are. Even government waste has its limits.",
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
		'name': "Chemical Plant",
		'button': null,
		'maximum': 1,
		'tooltip_message': "Refines all sorts of chemicals en masse into usable products.",
		'build_message_2': "One small step, one giant leap, blah blah.",
		'build_message_3': "One small step, one giant leap, blah.",
		'build_message_4': "One small step, one giant leap.",
		'build_message_5': "One small step, one giant.",
	},
}