var City = (
	// DOM elements
	// array of elements!
	function()
	{
		var INCOME_INTERVAL = 1000;
		var INCOME_RATE = 1;
		var BUY_SCALE = 1;
		var city = {};
		var wares = {};
		var utility = {};
		return {
			initialize: function()
			{
				// create buildings
				
				for (let building in buildings)
				{
					city[building] = {number: 0, maximum: buildings[building].maximum, enabled:false};
				}
				
				// create wares
				for (let ware in resources)
				{
					wares[ware] = {number: 0,maximum: 0};
				}
				
				// create utilities
				for (let index in utilities)
				{
					Engine.log(index);
					utility[index] = {capacity: 0,demand: 0};
				}
				// set intervals
				setInterval(City.income,INCOME_INTERVAL);
			},
			
			add_building: function(name, number)
			{
				if (city[name].number || city[name].number === 0) // so that even if city[name] is 0, it will still register
				{
					city[name].number = city[name].number + number;
					// also do DOM
					MPM.set_number(name+"_display_number",city[name].number);
					// NOT INFALLIBLE, PLEASE FIX WITH FOOLPROOF METHOD!
					DOMM.remove_class(document.getElementById(name+"_display"),"invisible"); // auto unlock if there's at least 1
				}
				return city[name].number;
			},
			
			add_building_maximum: function(name, number)
			{
				if (city[name].maximum || city[name].maximum === 0) // so that even if city[name] is 0, it will still register
				{
					city[name].maximum = city[name].maximum + number;
				}
				return city[name].maximum;
			},
			// this is the one that should be used when buying by the user, not by any events
			buy_building: function(name)
			{
				let cost = buildings[name].buy();
				// check max first
				if (city[name].number >= city[name].maximum)
				{
					Engine.notify(buildings[name].max_message);
					return false;
				}
				// check cost 
				for (let ware in cost)
				{
					if (City.get_ware(ware).number < cost[ware])
					{
						Engine.notify("Not enough " + resources[ware].name + ".");
						return false;
					}
				}
				// check utilities
				if (buildings[name].utility)
				{
					let utility_used = buildings[name].utility();
					for (let utility in utility_used)
					{
						if (City.get_utility(utility).demand + buildings[name].utility()[utility] > City.get_utility(utility).capacity)
						{
							Engine.notify("Exceeds utility for " + utility + ".");
							return false;
						}
					}
				}
				// subtract
				for (let ware in cost)
				{
					City.add_ware(ware, -cost[ware]);
				}
				if (buildings[name].utility)
				{
					let utility_used = buildings[name].utility();
					for (let utility in utility_used)
					{
						City.add_utility_demand(utility,buildings[name].utility()[utility]);
					}
				}
				// add
				City.add_building(name,1);
				let msgResult = Math.floor(Math.random() * Math.floor(5)) + 1;
				switch (msgResult) {
					case 1:
						Engine.notify(buildings[name].build_message);
						break;
					case 2:
						Engine.notify(buildings[name].build_message_2);
						break;
					case 3:
						Engine.notify(buildings[name].build_message_3);
						break;
					case 4:
						Engine.notify(buildings[name].build_message_4);
						break;
					case 5:
						Engine.notify(buildings[name].build_message_5);
						break;
					default:
						Engine.notify(buildings[name].build_message);
						break;
				}
				//Engine.notify(buildings[name].build_message);
				// onbuy fcn
				if (buildings[name]["on_buy"])
				{
					buildings[name]["on_buy"]();
				}
				return true;
			},
			
			add_ware: function(name, number)
			{
				if (wares[name]["number"] || wares[name]["number"] === 0) // so that even if wares[name] is 0, it will still register
				{
					wares[name]["number"] = wares[name]["number"] + number;
					// Check if less than 0
					if (wares[name]["number"] < 0){wares[name]["number"] = 0};
					// also do DOM
					MPM.set_number(name+"_display_number",wares[name]["number"]);
					// NOT INFALLIBLE, PLEASE FIX WITH FOOLPROOF METHOD!
					DOMM.remove_class(document.getElementById(name+"_display"),"invisible"); // auto unlock if there's at least 1
				}
				return wares[name]["number"];
			},
			
			add_ware_capacity: function(name, number)
			{
				if (wares[name]["maximum"] || wares[name]["maximum"] === 0) // so that even if wares[name] is 0, it will still register
				{
					wares[name]["maximum"] = wares[name]["maximum"] + number;
					// also do DOM
					MPM.set_number(name+"_display_number",wares[name]["maximum"]);
				}
				return wares[name]["maximum"];
			},
			
			add_utility_capacity: function(name, number)
			{
				if (utility[name] || utility[name] === 0) // so that even if utility[name] is 0, it will still register
				{
					utility[name].capacity = utility[name].capacity + number;
					// also do DOM
					MPM.set_number(name+"_display_number_maximum",utility[name].capacity);
					// NOT INFALLIBLE, PLEASE FIX WITH FOOLPROOF METHOD!
					DOMM.remove_class(document.getElementById(name+"_display"),"invisible"); // auto unlock if there's at least 1
				}
				return utility[name];
			},
			
			add_utility_demand: function(name, number)
			{
				if (utility[name] || utility[name] === 0) // so that even if utility[name] is 0, it will still register
				{
					utility[name].demand = utility[name].demand + number;
					// also do DOM
					MPM.set_number(name+"_display_number",utility[name].demand);
				}
				return utility[name];
			},
			
			get_ware: function(name)
			{
				return wares[name];
			},
			get_building: function(name)
			{
				return city[name];
			},
			get_utility: function(name)
			{
				return utility[name];
			},
			// mining
			mine_resources: function()
			{
				// finite resources
				
				// random doubling, crit!
				// please add in that text thing that says crit as well, if possible.
				
				// random gain checks
				City.add_ware("crovanite",Math.floor(Math.random()*10));
				City.add_ware("silicon",Math.floor(Math.random()*2));
				City.add_ware("plastic",Math.floor(Math.random()*3));
				City.add_ware("raw_iron",Math.floor(Math.random()*2));
				City.add_ware("raw_decinium",Math.floor(Math.random()*2));
				if(Math.floor(Math.random()*11)>9)
				{
					City.add_ware("battery",1);
				}
				
				if(Math.random() <= 0.1)
				{
					City.add_ware("crovanite",Math.floor(Math.random()*10));
					City.add_ware("silicon",Math.floor(Math.random()*2));
					City.add_ware("plastic",Math.floor(Math.random()*3));
					City.add_ware("raw_iron",Math.floor(Math.random()*2));
					City.add_ware("raw_decinium",Math.floor(Math.random()*2));
					City.add_ware("battery",1);
				}
			},
			
			// income
			income: function()
			{
				// goes through all buildings and performs income actions
				for (let building in city)
				{

					for (let count = 0; count < city[building].number; count++)
					{
						if(buildings[building].produce)
						{
							buildings[building].produce();
						}
					}

				}
				Engine.log("incomed");
			},
			// debugging dump 
			get_wares: function()
			{
				return wares;
			},
			
			get_buildings: function()
			{
				return city;
			},
			
			get_utilities: function()
			{
				return utility;
			},
			
			// DEBUGGING
			test_add_all: function(num)
			{
				var number = num || 10000;
				for (let ware in resources)
				{
					City.add_ware(ware, number);
				}
			},
		}
	} // 
)();