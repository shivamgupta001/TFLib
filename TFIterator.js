
/** This is a description of the Iterator Module. */
var Iterator = function(config){

	// iterates object passed to iterator
	function iterateStructure(config){
		if(config.initEvents){
			config.initEvents.call(config);
		}
		
		//first item
		var el = iterateItems(config);
		
		//iterate internal structure
		if(config.items  && config.items.length > 0){
			config.items.forEach(function(item , index){
				if(item.id){
					if(iterateStructure.idList.indexOf(item.id) == -1){
						iterateStructure.idList.push(item.id);			
						if(item.ATTRIBUTE_NODE){
							el.appendChild(item);
						}else{
							var childEl = iterateStructure(item);
							el.appendChild(childEl);		
						}	
					}else throw "Duplicate id : "+item.id;
				}else{
					if(item.ATTRIBUTE_NODE){
						el.appendChild(item);
					}else{
						var childEl = iterateStructure(item);
						el.appendChild(childEl);		
					}
				} 
			});

		}else { return el;} 

		return el;
	}

	// static variable to identify duplicate ids
	iterateStructure.idList = [];

	// register new componenet module here
	function iterateItems(item){
		var el; 
		switch(item.type){
			
			case 'textfield' 	: el = TFTextField.call(item);
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

	// return iterated code block
	return  iterateStructure(config, document.createElement('template'));
}
