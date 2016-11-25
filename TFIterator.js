
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

	// register new component module here
	function iterateItems(item){
		
		var el; 
		
		switch(item.type){
			
			case 'textfield' 	: el = TFTextField.call(item);
									break;
			case 'textareafield': el = TFTextAreaField.call(item);
									break;
			case 'checkboxfield': el = TFCheckboxField.call(item);
									break;
			case 'radiofield'	: el = TFRadioField.call(item);
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
	var el =  iterateStructure(config);
	
	el.appendTo = function(selector){
		
		var el = document.body.querySelector(selector);
		if(el) el.appendChild(this);
	};
	el.prependTo = function(selector){
		
		var el = document.body.querySelector(selector);
		if(el) el.insertBefore(this , el.childNodes[0]);
	};
	el.insertDomToAt = function(selector1 , selector2){

		var el = document.body.querySelector(selector1);
		if(el) el.insertBefore(this , el.querySelector(selector2));
	};

	return el;
}
