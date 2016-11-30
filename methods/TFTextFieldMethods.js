
TFLib.TFTextFieldMethods = function(){

	/**This method will hide label as display 'none'
      * @memberof TFTextField
      * @memberof TFTextAreaField
      */
	this.displayLabelHide = function(){
		this.labelComp.style.display = "none";
	};
	/**This method will show label if display 'none'
      * @memberof TFTextField
      * @memberof TFTextAreaField
      */
	this.displayLabelShow = function(){
		this.labelComp.style.display = "";
	};
	/**This method will control comp as display 'none'
      * @memberof TFTextField
      * @memberof TFTextAreaField
      */
	this.displayControlHide = function(){
		this.controlComp.style.display = "none";
	};
	/**This method will show control comp if display 'none'
      * @memberof TFTextField
      * @memberof TFTextAreaField
      */
	this.displayControlShow = function(){
		this.controlComp.style.display = "";
	};

	/**This method will hide label as visibility 'hidden'
      * @memberof TFTextField
      * @memberof TFTextAreaField
      */
	this.visibleLabelHide = function(){
		this.labelComp.style.visibility = "hidden";
	};
	/**This method will show label as if visibility 'hidden'
      * @memberof TFTextField
      * @memberof TFTextAreaField
      */
	this.visibleLabelShow = function(){
		this.labelComp.style.visibility = "";
	};
	/**This method will hide control as visibility 'hidden'
      * @memberof TFTextField
      * @memberof TFTextAreaField
      */
	this.visibleControlHide = function(){
		this.controlComp.style.visibility = "hidden";
	};
	/**This method will show control if visibility 'hidden'
      * @memberof TFTextField
      * @memberof TFTextAreaField
      */
	this.visibleControlShow = function(){
		this.controlComp.style.visibility = "";
	};

	/**This method will add style to label comp 
      * @memberof TFTextField
      * @memberof TFTextAreaField
      * @param {string} property - property name 
      * @param {string} val - property value 
      */
	this.addLabelStyle = function(prop , val){
		this.labelComp.style[prop] = val;
	};
	/**This method will remove style to label comp 
      * @memberof TFTextField
      * @memberof TFTextAreaField
      * @param {string} property - property name 
      */
	this.removeLabelStyle = function(prop){
		this.labelComp.style[prop] = '';
	};
	/**This method will add style to control comp 
      * @memberof TFTextField
      * @memberof TFTextAreaField
      * @param {string} property - property name 
      * @param {string} val - property value 
      */
	this.addControlStyle = function(prop , val){
		this.controlComp.style[prop] = val;
	};
	/**This method will remove style to control comp 
      * @memberof TFTextField
      * @memberof TFTextAreaField
      * @param {string} property - property name 
      */
	this.removeControlStyle = function(prop){
		this.controlComp.style[prop] = '';
	};
	
	/**This method will change label text 
      * @memberof TFTextField
      * @memberof TFTextAreaField
      * @param {string} newLabelText - label text or html
      */
	this.changeLabel = function(newLabelText){
		this.labelComp.querySelector('[for="'+this.innerId+'"]').innerHTML = newLabelText;
		a.shared.fieldLabel = newLabelText;
	};


	/**This method will add class to label comp 
      * @memberof TFTextField
      * @memberof TFTextAreaField
      * @param {string} newClass - class name 
      */
	this.addLabelClass = function(newClass){
		newClass = newClass.constructor === Array ? newClass : [newClass];
		this.labelComp.classList.add.apply(this.labelComp.classList , newClass);
	};
	/**This method will remove class to label comp 
      * @memberof TFTextField
      * @memberof TFTextAreaField
      * @param {string} oldClass - class name 
      */
	this.removeLabelClass = function(oldClass){
		oldClass = oldClass.constructor === Array ? oldClass : [oldClass];
		this.labelComp.classList.remove.apply(this.labelComp.classList , oldClass);		
	};
	/**This method will add class to control comp 
      * @memberof TFTextField
      * @memberof TFTextAreaField
      * @param {string} newClass - class name 
      */
	this.addControlClass = function(newClass){
		newClass = newClass.constructor === Array ? newClass : [newClass];
		this.controlComp.classList.add.apply(this.controlComp.classList , newClass);
	};
	/**This method will remove class to control comp 
      * @memberof TFTextField
      * @memberof TFTextAreaField
      * @param {string} oldClass - class name 
      */
	this.removeControlClass = function(oldClass){
		oldClass = oldClass.constructor === Array ? oldClass : [oldClass];
		this.controlComp.classList.remove.apply(this.controlComp.classList , oldClass);
	};

	/**This method will add validation of custom error to control comp 
      * @memberof TFTextField
      * @memberof TFTextAreaField
      * @param {boolean} status - can be true or false
      * @param {string} errmsg - pass message
      */
	this.customError = function(status , errmsg){

		if(this.validations.hasOwnProperty("customError")){
			
			this.validations.customError.value = status;
			if(this.validations.customError.value){
				
				if(errmsg)
					this.validations.customError.errmsg = errmsg
				
				this.controlComp.classList.add('tooltip', 'tf-err-border--red');
				this.controlComp.setAttribute('data-tooltip',this.validations.customError.errmsg);
			}else{
				this.controlComp.classList.remove('tooltip', 'tf-err-border--red');
				this.controlComp.removeAttribute('data-tooltip');
			}
		}else{
			if(status){
				Object.defineProperty(this.validations , 'customError',{
							value : {},
							writable : true,
							configurable : true,
							enumerable : true
						});
				
				this.validations.customError.value = status;
				if(errmsg)
					this.validations.customError.errmsg = errmsg;
				else
					this.validations.customError.errmsg = this.validations.__proto__.customError.errmsg

				this.controlComp.classList.add('tooltip', 'tf-err-border--red');
				this.controlComp.setAttribute('data-tooltip',this.validations.customError.errmsg);	
			}
			
		}
	};

	/**This method will apply validation to component 
      * @memberof TFTextField
      * @memberof TFTextAreaField
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
				if(!this.validations.customError.value)
					this.controlComp.setAttribute('data-tooltip',this.validations.isRequired.errmsg);
				

			}else if(!this.validations.customError.value){
				this.controlComp.classList.remove('tooltip','tf-err-border--red');
				this.controlComp.removeAttribute("data-tooltip");
			}
			

		}else{
			
			if(status){
				Object.defineProperty(this.validations, 'isRequired', 
									{	value : {},
										writable : true,
										configurable : true,
										enumerable : true
									});
				
					this.validations.isRequired.value = status;
				 

				if(errmsg)
					this.validations.isRequired.errmsg = errmsg;
				else 
					this.validations.isRequired.errmsg = this.validations.__proto__.isRequired.errmsg;
			}
			
		}
		
		this.setValidations.call(this);
	
	};
	/**This method will apply validation to component 
      * @memberof TFTextField
      * @memberof TFTextAreaField
      * @param {object}
      * @property {boolean} value - true or false to apply or not apply validation
      */
	this.onlyText = function(status){

		
		if(this.validations.hasOwnProperty("onlyText")){
			this.validations.onlyText.value = status;
				
		}else{
			if(status){
				Object.defineProperty(this.validations, 'onlyText', 
									{	value : { },
										writable : true,
										configurable : true,
										enumerable : true
									});
			
				this.validations.onlyText.value = status;	
			}
			
		}
		
		this.setValidations.call(this);
	
	};
	/**This method will apply validation to component 
      * @memberof TFTextField
      * @memberof TFTextAreaField
      * @param {object}
      * @property {boolean} value - true or false to apply or not apply validation
      */
	this.onlyNumber = function(status){

		
		if(this.validations.hasOwnProperty("onlyNumber")){
			
			this.validations.onlyNumber.value = status;
			
		}else{

			if(status){
				Object.defineProperty(this.validations, 'onlyNumber', 
									{	value : { },
										writable : true,
										configurable : true,
										enumerable : true
									});
			
				this.validations.onlyNumber.value = status;	
			}
			
		}
		
		this.setValidations.call(this);
	
	};
	/**This method will apply validation to component 
      * @memberof TFTextField
      * @memberof TFTextAreaField
      * @param {object}
      * @property {boolean} value - true or false to apply or not apply validation
      * @property {string} errmsg - error message to show on tooltip
      * @property {string} pattern - regex pattern
      */
	this.regex = function(status, errmsg, pattern){
		
		if(this.validations.hasOwnProperty("regex")){
			
			this.validations.regex.value = status;
			if(this.validations.regex.value){
				if(errmsg)
					this.validations.regex.errmsg = errmsg;
				if(!this.validations.customError.value)
					this.controlComp.setAttribute('data-tooltip', this.validations.regex.errmsg);	
				
				if(pattern)
					this.validations.regex.pattern = pattern;	
				
			}else if(!this.validations.customError.value){
				this.controlComp.classList.remove('tooltip','tf-err-border--red');
				this.controlComp.removeAttribute("data-tooltip");
			}
			
			
			
		}else{
			if(status){
				Object.defineProperty(this.validations , 'regex',
									{
										value : {},
										writable : true,
										configurable : true,
										enumerable : true
									});
				
					this.validations.regex.value = status;
				if(errmsg)
					this.validations.regex.errmsg = errmsg;
				else 
					this.validations.regex.errmsg = this.validations.__proto__.regex.errmsg;
				if(pattern)
					this.validations.regex.pattern = pattern;
				else 
					this.validations.regex.pattern = this.validations.__proto__.regex.pattern;	
			}
			
		}
		this.setValidations.call(this);
	
	};
	/**This method will validate if validations present to component 
      * @memberof TFTextField
      * @memberof TFTextAreaField
      */
	this.validate = function(){

		this.isValidated = true;
		Object.keys(this.validations).forEach(function(val){
			if(val === 'isRequired'){
				if(this.validations.isRequired.value){
					this.controlComp.classList.add('tooltip', 'tf-err-border--red');
					this.controlComp.setAttribute('data-tooltip', this.validations.isRequired.errmsg);	
					this.isValidated = false;
				}
			}else if(val === 'regex'){
				if(this.validations.regex.value){
					var regex = new RegExp(this.validations.regex.pattern);
					if(!regex.test(this.innerComp.value)){
						this.controlComp.classList.add('tooltip', 'tf-err-border--red');
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