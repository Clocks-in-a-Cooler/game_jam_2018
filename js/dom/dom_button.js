/** 
	A button that is nothing but DIV, CSS, and smoke
	
	@param onclick what happens when the user clicks the button 
	@param text what the button actually says to the user
	@param id id of the new button
	@param class_list classes of the new button
	@param tooltip the tooltip to be displayed when hovering over it
	@param sidebar an array of side buttons to be appended in
	@author Frank Lai 2002
	@version 2018-12-23
	https://github.com/laifrank2002
*/
function DOMM_button(onclick, text, id, class_list, tooltip, side_button)
{
	var button = document.createElement("div");
	if(id) DOMM.set_id(button, id); // set id
	if(class_list) for(var index = 0; index < class_list.length; index++){button.classList.add(class_list[index])}; // set class
	button.innerHTML = text; // set name 
	button.addEventListener("click", function(){if (!this.disabled){onclick();}});
	if (typeof tooltip === "object" && tooltip) // bloody typeof null === "object"
	{
		button.appendChild(tooltip);
	}
	else if (typeof tooltip === "string")
	{
		button.appendChild(new DOMM_tooltip(tooltip,null,"tooltip"));
	}
	return button;
}