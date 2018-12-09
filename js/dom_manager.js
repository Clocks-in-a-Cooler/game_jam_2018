/** 
	A set of general DOM Managers so I don't have to keep writer the same thing over and over again.
	@author Frank Lai 2002
	https://github.com/laifrank2002
*/
var DOMM = {
	
	time_out: function(element,cooldown)
	{
		if (element)
		{
			DOMM.add_class("disabled",element);
			element.disabled = true;
			setTimeout(function(){element.disabled = false;DOMM.remove_class("disabled",element)},cooldown);
		}
		return element;
	},
	
	disable: function(element)
	{
		if (element)
		{
			DOMM.add_class("disabled",element);
			element.disabled = true;
		}
		return element;
	},
	
	enable: function(element)
	{
		if (element)
		{
			DOMM.remove_class("disabled",element);
			element.disabled = false;
		}
		return element;
	},
	
	remove_element: function(id)
	{
		if(document.getElementById(id))
		{
			document.getElementById(id).parentNode.removeChild(document.getElementById(id));
		}
	},
	
	set_id: function(id, element)
	{
		if (id)
		{
			if (!document.getElementById(id))
			{
				element.id = id;
			}
		}
	},
	
	add_class: function(element, element_class)
	{
		if (element)
		{
			element.classList.add(element_class);
		}
	},
	
	remove_class: function(element, element_class)
	{
		if (element)
		{
			element.classList.remove(element_class);
		}
	},
}