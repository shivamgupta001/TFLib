
/** This is a description of the Iterator Module. */
var Iterator = function(config){
	var el = iterateStructure(config, document.createElement('template'));

	function iterateStructure(config){
		if(config.initEvents){
			config.initEvents.call(config);
		}
		var el = iterateItems(config);
		if(config.items  && config.items.length > 0){
			config.items.forEach(function(item , index){
				if(item.ATTRIBUTE_NODE){
					el.appendChild(item);
				}else{
					var childEl = iterateStructure(item);
					el.appendChild(childEl);		
				}
			});
		}else { return el;} 

		return el;
	}

	function iterateItems(item){
		var el; 
		switch(item.type){
			
			case 'textfield' 	: el = TFTextfield.call(item);
									break;
			case 'textarea' 	: el = TFTextArea.call(item);
									break;
			case 'checkbox'		: el = TFCheckbox.call(item);
									break;
			case 'radio'		: el = TFRadio.call(item);
									break;
			case 'container'	: el = TFContainer.call(item);
									break;
			case 'form'			: el = TFForm.call(item);
									break;
			case 'button' 		: el = TFButton.call(item);
									break;
			default 			: el = TFContainer.call(item);
									break;
		}
		if(el)
			return el;
	}
	
	document.body.appendChild(el);
	
	/*	
	function iterateStructure(fStructure,flex , formLayout, $template){
		
		var $fieldset;
		if(fStructure.length > 0){

			if(formLayout === 'row') $fieldset = $('<div class="formComp-fieldset-row">');
			else $fieldset = $('<div class="formComp-fieldset-col">');
						
			fStructure.forEach(function(item , index){
				
				if(item.formItems && item.formItems.length > 0) iterateStructure(item.formItems,item.flex, item.formLayout, $fieldset);
				else iterateItems(item , $fieldset);
			});
			if(flex) $fieldset.attr("style","flex:"+flex);	
			$template.append($fieldset);
		}
	}*/

}
