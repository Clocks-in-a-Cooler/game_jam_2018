/** 
	A set of general DOM Managers so I don't have to keep writer the same thing over and over again.
	@author Frank Lai 2002
	@version 2018-12-22
	https://github.com/laifrank2002
*/
var DOMM = {
	
	/**
		@param id the id of the element
		@param new_parent_id the id of the new parent to be appended to
	 */
	move_element: function(id, new_parent_id)
	{
		if(document.getElementById(id) && document.getElementById(new_parent_id))
		{
			document.getElementById(new_parent_id).appendChild(document.getElementById(id));
		}
	},
	
	/**
		@param element the element to timeout
		@param cooldown time in miliseconds to time out for 
	 */
	time_out: function(element,cooldown)
	{
		if (element)
		{
			DOMM.add_class(element,"disabled");
			element.disabled = true;
			setTimeout(function(){element.disabled = false;DOMM.remove_class(element,"disabled")},cooldown);
		}
		return element;
	},
	
	/**
		@param element the element to disable
	 */
	disable: function(element)
	{
		if (element)
		{
			DOMM.add_class("disabled",element);
			element.disabled = true;
		}
		return element;
	},
	
	/**
		@param element the element to enable
	 */
	enable: function(element)
	{
		if (element)
		{
			DOMM.remove_class("disabled",element);
			element.disabled = false;
		}
		return element;
	},
	
	/**
		@param id the id of the element to remove
	 */
	remove_element: function(id)
	{
		if(document.getElementById(id))
		{
			document.getElementById(id).parentNode.removeChild(document.getElementById(id));
		}
	},
	
	/** 
		@param element the element
		@param id the new id
	 */
	set_id: function(element, id)
	{
		if (id)
		{
			if (!document.getElementById(id))
			{
				element.id = id;
			}
		}
	},
	
	/**
		@param element the element
		@param class the class to be added 
	 */
	add_class: function(element, element_class)
	{
		if (element)
		{
			element.classList.add(element_class);
		}
	},
	
	/**
		@param element the element
		@param class the class to be removed 
	 */
	remove_class: function(element, element_class)
	{
		if (element)
		{
			element.classList.remove(element_class);
		}
	},
}