/** 
	A tooltip object
	@param text what the tooltip actually says to the user
	@param id id of the new tooltip
	@param class_list classes of the new tooltip
	@author Frank Lai 2002
	@version 2018-12-23
	https://github.com/laifrank2002
*/
function DOMM_tooltip(text, id, class_list)
{
	var element = document.createElement("div");
	if(id) DOMM.set_id(element, id); // set id
	if(class_list) for(var index = 0; index < class_list.length; index++){element.classList.add(class_list[index])}; // set class
    element.innerHTML = text;
	return element;
}