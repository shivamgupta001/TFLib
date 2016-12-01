/** @mixin */
TFLib.TFSharedMethods = function(){
	
	/**This method will hide component as display 'none'
      * @mixes TFTextField
      * @mixes TFTextAreaField
      * @mixes TFCheckbox
      * @mixes TFCheckboxfield
      * @mixes TFRadio
      * @mixes TFRadioField
      * @mixes TFButton
      * @mixes TFComboboxField
      * @mixes TFContainer
      */
      this.hide = function(){
		this.outerComp.style.display = "none";
	};
	/**This method will show component if display 'none'
      * @mixes TFTextField
      * @mixes TFTextAreaField
      * @mixes TFCheckbox
      * @mixes TFCheckboxfield
      * @mixes TFRadio
      * @mixes TFRadioField
      * @mixes TFButton
      * @mixes TFComboboxField
      * @mixes TFContainer
      */
	this.show = function(){
		this.outerComp.style.display = "";
	};

	/**This method will hide component as visibility 'hidden'
      * @mixes TFTextField
      * @mixes TFTextAreaField
      * @mixes TFCheckbox
      * @mixes TFCheckboxfield
      * @mixes TFRadio
      * @mixes TFRadioField
      * @mixes TFButton
      * @mixes TFComboboxField
      * @mixes TFContainer
      */
	this.visibleHide = function(){
		this.outerComp.style.visibility = "hidden";
	};
	/**This method will show component if visibility 'hidden'
      * @mixes TFTextField
      * @mixes TFTextAreaField
      * @mixes TFCheckbox
      * @mixes TFCheckboxfield
      * @mixes TFRadio
      * @mixes TFRadioField
      * @mixes TFButton
      * @mixes TFComboboxField
      * @mixes TFContainer
      */
	this.visibleShow = function(){
		this.outerComp.style.visibility = "";
	};

	/**This method will  add class to component 
      * @mixes TFTextField
      * @mixes TFTextAreaField
      * @mixes TFCheckbox
      * @mixes TFCheckboxfield
      * @mixes TFRadio
      * @mixes TFRadioField
      * @mixes TFButton
      * @mixes TFComboboxField
      * @mixes TFContainer
      * @param {string} class - pass new class to add to component
      */
	this.addClass = function(newClass){
		newClass = newClass.constructor === Array ? newClass : [newClass];  
		this.outerComp.classList.add.apply(this.outerComp.classList , newClass);
	};
	/**This method will remove class to component 
      * @mixes TFTextField
      * @mixes TFTextAreaField
      * @mixes TFCheckbox
      * @mixes TFCheckboxfield
      * @mixes TFRadio
      * @mixes TFRadioField
      * @mixes TFButton
      * @mixes TFComboboxField
      * @mixes TFContainer
      * @param {string} class - pass old class to remove from component
      */
	this.removeClass = function(oldClass){
		oldClass = oldClass.constructor === Array ? oldClass : [oldClass];
		this.outerComp.classList.remove.apply(this.outerComp.classList , oldClass);
	};

	/**This method will add style to component 
      * @mixes TFTextField
      * @mixes TFTextAreaField
      * @mixes TFCheckbox
      * @mixes TFCheckboxfield
      * @mixes TFRadio
      * @mixes TFRadioField
      * @mixes TFButton
      * @mixes TFComboboxField
      * @mixes TFContainer
      * @param {string} prop - pass property name
      * @param {string} val - pass property value
      */
	this.addStyle = function(prop , val){
		this.outerComp.style[prop] = val;
	};
	/**This method will remove style to component 
      * @mixes TFTextField
      * @mixes TFTextAreaField
      * @mixes TFCheckbox
      * @mixes TFCheckboxfield
      * @mixes TFRadio
      * @mixes TFRadioField
      * @mixes TFButton
      * @mixes TFComboboxField
      * @mixes TFContainer
      * @param {string} prop - pass property name
      */
	this.removeStyle = function(prop){
		this.outerComp.style[prop] = '';
	};

	/**This method will append el to component 
      * @mixes TFTextField
      * @mixes TFTextAreaField
      * @mixes TFCheckbox
      * @mixes TFCheckboxfield
      * @mixes TFRadio
      * @mixes TFRadioField
      * @mixes TFButton
      * @mixes TFComboboxField
      * @mixes TFContainer
      * @param {object} el - pass dom el
      */
	this.append = function(el){
		this.outerComp.appendChild(el);
	};
	/**This method will prepend el to component 
      * @mixes TFTextField
      * @mixes TFTextAreaField
      * @mixes TFCheckbox
      * @mixes TFCheckboxfield
      * @mixes TFRadio
      * @mixes TFRadioField
      * @mixes TFButton
      * @mixes TFComboboxField
      * @mixes TFContainer
      * @param {object} el - pass dom el
      */
	this.prepend = function(el){
		this.outerComp.insertBefore(el , this.outerComp.childNodes[0]);
	};
	/**This method will insert before dom at provided selector
      * @mixes TFTextField
      * @mixes TFTextAreaField
      * @mixes TFCheckbox
      * @mixes TFCheckboxfield
      * @mixes TFRadio
      * @mixes TFRadioField
      * @mixes TFButton
      * @mixes TFComboboxField
      * @mixes TFContainer
      * @param {object} el - pass dom el
      * @param {string} selector - selector string 
      */
	this.insertDomAt = function(selector , el){
		this.outerComp.insertBefore(el , this.outerComp.querySelector(selector));
	};
      /**This method will append  dom at  selector found in dom
      * else if el provided than it will append to current component querying using selector and append el
      * @mixes TFTextField
      * @mixes TFTextAreaField
      * @mixes TFCheckbox
      * @mixes TFCheckboxfield
      * @mixes TFRadio
      * @mixes TFRadioField
      * @mixes TFButton
      * @mixes TFComboboxField
      * @mixes TFContainer
      * @param {object} el - pass dom el
      * @param {string} selector - selector string 
      */
      this.appendTo = function(selector , el){
            
            if(!el){
                  var ele = document.querySelector(selector);
                  if(ele)
                        ele.appendChild(this.outerComp);
            }else {
                  var ele = this.outerComp.querySelector(selector);
                  ele.appendChild(el);
            }

            return this.outerComp;
      };
      /**This method will append  dom at  selector found in dom
      * else if el provided than it will append to current component querying using selector and append el
      * @mixes TFTextField
      * @mixes TFTextAreaField
      * @mixes TFCheckbox
      * @mixes TFCheckboxfield
      * @mixes TFRadio
      * @mixes TFRadioField
      * @mixes TFButton
      * @mixes TFComboboxField
      * @mixes TFContainer
      * @param {object} el - pass dom el
      * @param {string} selector - selector string 
      */
      this.insertBefore = function(selector , el){

            if(!el){
                  var ele = document.querySelector(selector);
                  if(ele){
                        var callingEL = document.body == ele.parentElement ? document.body.parentElement : document.body ;
                        document.body.insertBefore(this.outerComp , ele.parentElement);
                  }
            }else{
                  var ele = this.outerComp.querySelector(selector);
                  if(ele){
                        var callingEL = this.outerComp == ele.parentElement ? this.outerComp.parentElement : this.outerComp ;
                        callingEL.insertBefore(el , ele.parentElement);
                  }
            }

            return this.outerComp;
      };
      
};