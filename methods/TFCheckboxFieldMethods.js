/** @mixin */
TFLib.TFCheckboxFieldMethods = function(){

	/**This method will hide label as display 'none'
      * @mixes TFCheckboxField
      * @mixes TFComboboxField
      * @mixes TFRadioField
      */
	this.displayLabelHide = function(){
		this.labelComp.style.display = "none";
	};
	/**This method will show label if display 'none'
      * @mixes TFCheckboxField
      * @mixes TFComboboxField
      * @mixes TFRadioField
      */
	this.displayLabelShow = function(){
		this.labelComp.style.display = "";
	};
	/**This method will control comp as display 'none'
      * @mixes TFCheckboxField
      * @mixes TFComboboxField
      * @mixes TFRadioField
      */
	this.displayControlHide = function(){
		this.controlComp.style.display = "none";
	};
	/**This method will show control comp if display 'none'
      * @mixes TFCheckboxField
      * @mixes TFComboboxField
      * @mixes TFRadioField
      */
	this.displayControlShow = function(){
		this.controlComp.style.display = "";
	};

	/**This method will hide label as visibility 'hidden'
      * @mixes TFCheckboxField
      * @mixes TFComboboxField
      * @mixes TFRadioField
      */
	this.visibleLabelHide = function(){
		this.labelComp.style.visibility = "hidden";
	};
	/**This method will show label as if visibility 'hidden'
      * @mixes TFCheckboxField
      * @mixes TFComboboxField
      * @mixes TFRadioField
      */
	this.visibleLabelShow = function(){
		this.labelComp.style.visibility = "";
	};
	/**This method will hide control as visibility 'hidden'
      * @mixes TFCheckboxField
      * @mixes TFComboboxField
      * @mixes TFRadioField
      */
	this.visibleControlHide = function(){
		this.controlComp.style.visibility = "hidden";
	};
	/**This method will show control if visibility 'hidden'
      * @mixes TFCheckboxField
      * @mixes TFComboboxField
      * @mixes TFRadioField
      */
	this.visibleControlShow = function(){
		this.controlComp.style.visibility = "";
	};

	/**This method will add style to label comp 
      * @mixes TFCheckboxField
      * @mixes TFComboboxField
      * @mixes TFRadioField
      * @param {string} property - property name 
      * @param {string} val - property value 
      */
	this.addLabelStyle = function(prop , val){
		this.labelComp.style[prop] = val;
	};
	/**This method will remove style to label comp 
      * @mixes TFCheckboxField
      * @mixes TFComboboxField
      * @mixes TFRadioField
      * @param {string} property - property name 
      */
	this.removeLabelStyle = function(prop){
		this.labelComp.style[prop] = '';
	};
	/**This method will add style to control comp 
      * @mixes TFCheckboxField
      * @mixes TFComboboxField
      * @mixes TFRadioField
      * @param {string} property - property name 
      * @param {string} val - property value 
      */
	this.addControlStyle = function(prop , val){
		this.controlComp.style[prop] = val;
	};
	/**This method will remove style to control comp 
      * @mixes TFCheckboxField
      * @mixes TFComboboxField
      * @mixes TFRadioField
      * @param {string} property - property name 
      */
	this.removeControlStyle = function(prop){
		this.controlComp.style[prop] = '';
	};

	/**This method will change label text 
      * @mixes TFCheckboxField
      * @mixes TFComboboxField
      * @mixes TFRadioField
      * @param {string} newLabelText - label text or html
      */
	this.changeLabel = function(newLabelText){
		
		this.labelComp.querySelector('#'+this.labelId).innerHTML = newLabelText;
		this.fieldLabel = newLabelText;
	};

	/**This method will add class to label comp 
      * @mixes TFCheckboxField
      * @mixes TFComboboxField
      * @mixes TFRadioField
      * @param {string} newClass - class name 
      */
	this.addLabelClass = function(newClass){
		newClass = newClass.constructor === Array ? newClass : [newClass];
		this.labelComp.classList.addmany(newClass); 
	};
	/**This method will remove class to label comp 
      * @mixes TFCheckboxField
      * @mixes TFComboboxField
      * @mixes TFRadioField
      * @param {string} oldClass - class name 
      */
	this.removeLabelClass = function(oldClass){
		oldClass = oldClass.constructor === Array ? oldClass : [oldClass];
		this.labelComp.classList.removemany(oldClass);
	};
	/**This method will add class to control comp 
      * @mixes TFCheckboxField
      * @mixes TFComboboxField
      * @mixes TFRadioField
      * @param {string} newClass - class name 
      */
	this.addControlClass = function(newClass){
		newClass = newClass.constructor === Array ? newClass : [newClass];
		this.controlComp.classList.addmany(newClass); 	
	};
	/**This method will remove class to control comp 
      * @mixes TFCheckboxField
      * @mixes TFComboboxField
      * @mixes TFRadioField
      * @param {string} oldClass - class name 
      */
	this.removeControlClass = function(oldClass){
		oldClass = oldClass.constructor === Array ? oldClass : [oldClass];
		this.controlComp.classList.removemany(oldClass);
	};
	
	/**This method will apply validation to component 
      * @mixes TFCheckboxField
      * @mixes TFComboboxField
      * @mixes TFRadioField
      * @param {object}
      * @property {boolean} value - true or false to apply or not apply validation
      * @property {string} errmsg - error message to show on tooltip
      */
	this.isRequired = function(status , errmsg){
		
		if(this.validations.hasOwnProperty("isRequired")){

			this.validations.isRequired.value = status;

			if(this.validations.isRequired.value){
				if(errmsg)
					this.validations.isRequired.errmsg = errmsg;
				//if(!this.validations.customError.value)
				//	this.controlComp.setAttribute('data-tooltip',this.validations.isRequired.errmsg);
			}else if(!this.validations.customError.value){

				this.controlComp.classList.removemany(['tooltip','tf-err-border--red']);
				this.controlComp.removeAttribute("data-tooltip");
			}

		}else{
			Object.defineProperty(this.validations, 'isRequired',{	
									value : {},
									writable : true,
									configurable : true,
									enumerable : true
								});
			if(status)
				this.validations.isRequired.value = status;
			if(errmsg)
				this.validations.isRequired.errmsg = errmsg;
		}
		
		this.setValidations.call(this);
	
	};
	/**This method will apply custom validation  to component at any point
      * @mixes TFCheckboxField
      * @mixes TFComboboxField
      * @mixes TFRadioField
      */
	this.customError = function(status,errmsg){
		
		/*var chkstatus = false;
		for(var i = 0 ; i< this.innerComp.length ; i++){
			if(this.innerComp[i].checked){
				chkstatus = true;
				break;
			}
		}

		if(chkstatus){
			this.controlComp.classList.remove('tooltip', 'tf-err-border--red');
			this.controlComp.removeAttribute('data-tooltip');
		}else{*/
			if(this.validations.hasOwnProperty("customError")){
				
				this.validations.customError.value = status;
				if(this.validations.customError.value){
					if(errmsg)
						this.validations.customError.errmsg = errmsg

					this.controlComp.classList.addmany(['tooltip', 'tf-err-border--red']);
					this.controlComp.setAttribute('data-tooltip',this.validations.customError.errmsg);
				}else{
					this.controlComp.classList.removemany(['tooltip', 'tf-err-border--red']);
					this.controlComp.removeAttribute('data-tooltip');
				}
					
			}else{

				Object.defineProperty(this.validations ,'customError',{
					value : {},
					writable : true,
					configurable : true,
					enumerable : true,
				});
				
				if(status)
					this.validations.customError.value = status;
				if(errmsg)
					this.validations.customError.errmsg = errmsg;

				this.controlComp.classList.addmany(['tooltip', 'tf-err-border--red']);
				this.controlComp.setAttribute('data-tooltip',this.validations.customError.errmsg);

			}
			
		/*}*/
	
	};
	/**This method will validate if validations present to component 
      * @mixes TFCheckboxField
      * @mixes TFComboboxField
      * @mixes TFRadioField
      */
	this.validate = function(){

		this.isValidated = true;
		if(this.validations) 
			Object.keys(this.validations).forEach(function(val){
				if(val === 'isRequired'){
					if(this.validations.isRequired.value){

						this.controlComp.classList.addmany(['tooltip', 'tf-err-border--red']);
						this.controlComp.setAttribute('data-tooltip', this.validations.isRequired.errmsg);	
						this.isValidated = false;	
						
						if(this.innerComp.tagName === "SELECT" && this.innerComp.selectedOptions.length > 0 && this.innerComp.selectedOptions[this.innerComp.selectedOptions.length-1].value != '') {
							
							this.controlComp.classList.removemany(['tooltip', 'tf-err-border--red']);
							this.controlComp.removeAttribute('data-tooltip', this.validations.isRequired.errmsg);	
							this.isValidated = true;	
						}
					}
				}else if(val === 'regex'){
					if(this.validations.regex.value){
						var regex = new RegExp(this.validations.regex.pattern);
						if(!regex.test(this.innerComp.value)){
							this.controlComp.classList.addmany(['tooltip', 'tf-err-border--red']);
							this.controlComp.setAttribute('data-tooltip', this.validations.regex.errmsg);			
							this.isValidated = false;
						}					
					}
				}else if(val === 'customError'){
					if(this.validations.customError.value)
						this.isValidated = false;
				}
			}, this);
		
		return this.isValidated;
	};
};