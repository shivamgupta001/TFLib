/**
 * @author Shivam Gupta <shivamcs3080@gmail.com>
 * @constructor Iterator
 */

TFLib.Iterator = function(config){

	// iterates object passed to iterator
	function iterateStructure(config){
				
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
			
			case 'textfield' 	: el = TFLib.TFTextField.call(item);
									break;
			case 'textareafield': el = TFLib.TFTextAreaField.call(item);
									break;
			case 'checkboxfield': el = TFLib.TFCheckboxField.call(item);
									break;
			case 'radiofield'	: el = TFLib.TFRadioField.call(item);
									break;
			case 'checkbox'		: el = TFLib.TFCheckbox.call(item);
									break;
			case 'radio'		: el = TFLib.TFRadio.call(item);
									break;
			case 'container'	: el = TFLib.TFContainer.call(item);
									break;
			/*case 'form'			: el = TFLib.TFForm.call(item);
									break;*/
			case 'button' 		: el = TFLib.TFButton.call(item);
									break;
			/*case 'comboboxfield': el = TFLib.TFComboboxField.call(item);
									break;*/
			default 			: el = TFLib.TFContainer.call(item);
									break;
		}
		
		if(el)
			return el;
	}

	// return iterated code block
	var el =  iterateStructure(config);
	/**This method will apply validation to component 
      * @memberof Iterator
      * @param {string} selector - pass selector
      * @param {object} el - dom object
      */	
	el.appendTo = function(selector , el){
            
            if(!el){
                  var ele = document.querySelector(selector);
                  if(ele)
                        ele.appendChild(this.shared.outerComp);
            }else {
                  var ele = this.shared.outerComp.querySelector(selector);
                  ele.appendChild(el);
            }
    };
    /**This method will apply validation to component 
      * @memberof Iterator
      * @param {string} selector - pass selector
      * @param {object} el - dom object
      */
    el.insertBefore = function(selector , el){

            if(!el){
                  var ele = document.querySelector(selector);
                  if(ele){
                  		var callingEL = document.body == ele.parentElement ? document.body.parentElement : document.body ;
                        callingEL.insertBefore(this.shared.outerComp , ele.parentElement);
                  }
            }else{
                  var ele = this.shared.outerComp.querySelector(selector);
                  if(ele){
                  		var callingEL = this.shared.outerComp == ele.parentElement ? this.shared.outerComp.parentElement : this.shared.outerComp ;
                        callingEL.insertBefore(el , ele.parentElement);
                  }
            }
    };
	return el;
}
