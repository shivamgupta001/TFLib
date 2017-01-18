/** @mixin */
TFLib.TFTextFieldMethods = function(){

	/**This method will hide label as display 'none'
      * @mixes TFTextField
      * @mixes TFTextAreaField
      */
	this.displayLabelHide = function(){
		this.labelComp.style.display = "none";
	};
	/**This method will show label if display 'none'
      * @mixes TFTextField
      * @mixes TFTextAreaField
      */
	this.displayLabelShow = function(){
		this.labelComp.style.display = "";
	};
	/**This method will control comp as display 'none'
      * @mixes TFTextField
      * @mixes TFTextAreaField
      */
	this.displayControlHide = function(){
		this.controlComp.style.display = "none";
	};
	/**This method will show control comp if display 'none'
      * @mixes TFTextField
      * @mixes TFTextAreaField
      */
	this.displayControlShow = function(){
		this.controlComp.style.display = "";
	};

	/**This method will hide label as visibility 'hidden'
      * @mixes TFTextField
      * @mixes TFTextAreaField
      */
	this.visibleLabelHide = function(){
		this.labelComp.style.visibility = "hidden";
	};
	/**This method will show label as if visibility 'hidden'
      * @mixes TFTextField
      * @mixes TFTextAreaField
      */
	this.visibleLabelShow = function(){
		this.labelComp.style.visibility = "";
	};
	/**This method will hide control as visibility 'hidden'
      * @mixes TFTextField
      * @mixes TFTextAreaField
      */
	this.visibleControlHide = function(){
		this.controlComp.style.visibility = "hidden";
	};
	/**This method will show control if visibility 'hidden'
      * @mixes TFTextField
      * @mixes TFTextAreaField
      */
	this.visibleControlShow = function(){
		this.controlComp.style.visibility = "";
	};

	/**This method will add style to label comp 
      * @mixes TFTextField
      * @mixes TFTextAreaField
      * @param {string} property - property name 
      * @param {string} val - property value 
      */
	this.addLabelStyle = function(prop , val){
		this.labelComp.style[prop] = val;
	};
	/**This method will remove style to label comp 
      * @mixes TFTextField
      * @mixes TFTextAreaField
      * @param {string} property - property name 
      */
	this.removeLabelStyle = function(prop){
		this.labelComp.style[prop] = '';
	};
	/**This method will add style to control comp 
      * @mixes TFTextField
      * @mixes TFTextAreaField
      * @param {string} property - property name 
      * @param {string} val - property value 
      */
	this.addControlStyle = function(prop , val){
		this.controlComp.style[prop] = val;
	};
	/**This method will remove style to control comp 
      * @mixes TFTextField
      * @mixes TFTextAreaField
      * @param {string} property - property name 
      */
	this.removeControlStyle = function(prop){
		this.controlComp.style[prop] = '';
	};
	
	/**This method will change label text 
      * @mixes TFTextField
      * @mixes TFTextAreaField
      * @param {string} newLabelText - label text or html
      */
	this.changeLabel = function(newLabelText){
		this.labelComp.querySelector('[for="'+this.innerId+'"]').innerHTML = newLabelText;
		a.shared.fieldLabel = newLabelText;
	};


	/**This method will add class to label comp 
      * @mixes TFTextField
      * @mixes TFTextAreaField
      * @param {string} newClass - class name 
      */
	this.addLabelClass = function(newClass){
		newClass = newClass.constructor === Array ? newClass : [newClass];
		this.labelComp.classList.addmany(newClass);
	};
	/**This method will remove class to label comp 
      * @mixes TFTextField
      * @mixes TFTextAreaField
      * @param {string} oldClass - class name 
      */
	this.removeLabelClass = function(oldClass){
		oldClass = oldClass.constructor === Array ? oldClass : [oldClass];
		this.labelComp.classList.removemany(oldClass);		
	};
	/**This method will add class to control comp 
      * @mixes TFTextField
      * @mixes TFTextAreaField
      * @param {string} newClass - class name 
      */
	this.addControlClass = function(newClass){
		newClass = newClass.constructor === Array ? newClass : [newClass];
		this.controlComp.classList.addmany(newClass);
	};
	/**This method will remove class to control comp 
      * @mixes TFTextField
      * @mixes TFTextAreaField
      * @param {string} oldClass - class name 
      */
	this.removeControlClass = function(oldClass){
		oldClass = oldClass.constructor === Array ? oldClass : [oldClass];
		this.controlComp.classList.removemany(oldClass);
	};

	/**This method will add validation of custom error to control comp 
      * @mixes TFTextField
      * @mixes TFTextAreaField
      * @param {boolean} status - can be true or false
      * @param {string} errmsg - pass message
      */
	this.customError = function(status , errmsg){

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

				this.controlComp.classList.addmany(['tooltip', 'tf-err-border--red']);
				this.controlComp.setAttribute('data-tooltip',this.validations.customError.errmsg);	
			}
			
		}
	};

	/**This method will apply validation to component 
      * @mixes TFTextField
      * @mixes TFTextAreaField
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
      * @mixes TFTextField
      * @mixes TFTextAreaField
      * @param {object}
      * @property {boolean} value - true or false to apply or not apply validation
      */
	this.onlyText = function(status){

		
		if(this.validations.hasOwnProperty("onlyText")){
			this.validations.onlyText = status;
				
		}else{
			if(status){
				Object.defineProperty(this.validations, 'onlyText', 
									{	value : { },
										writable : true,
										configurable : true,
										enumerable : true
									});
			
				this.validations.onlyText = status;	
			}
			
		}
		
		this.setValidations.call(this);
	
	};
	/**This method will apply validation to component 
      * @mixes TFTextField
      * @mixes TFTextAreaField
      * @param {object}
      * @property {boolean} value - true or false to apply or not apply validation
      */
	this.onlyNumber = function(status){

		
		if(this.validations.hasOwnProperty("onlyNumber")){
			
			this.validations.onlyNumber = status;
			
		}else{

			if(status){
				Object.defineProperty(this.validations, 'onlyNumber', 
									{	value : { },
										writable : true,
										configurable : true,
										enumerable : true
									});
			
				this.validations.onlyNumber = status;	
			}
			
		}
		
		this.setValidations.call(this);
	
	};
	/**This method will apply validation to component 
      * @mixes TFTextField
      * @mixes TFTextAreaField
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
				this.controlComp.classList.removemany(['tooltip','tf-err-border--red']);
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
      * @mixes TFTextField
      * @mixes TFTextAreaField
      */
	this.validate = function(){

		this.isValidated = true;
		if(this.validations) Object.keys(this.validations).forEach(function(val){
			if(val === 'isRequired' && this.validations[val].value === true){
				if(this.innerComp.value.trim().length == 0){
					this.controlComp.classList.addmany(['tooltip', 'tf-err-border--red']);
					this.controlComp.setAttribute('data-tooltip', this.validations.isRequired.errmsg);	
					this.isValidated = false;
				}else{
					this.controlComp.classList.removemany(['tooltip', 'tf-err-border--red']);
					this.controlComp.removeAttribute('data-tooltip', this.validations.isRequired.errmsg);	
				}
			}else if(val === 'regex'){
				if(this.validations.regex.value){
					var regex = new RegExp(this.validations.regex.pattern);
					if(!regex.test(this.innerComp.value)){
						this.controlComp.classList.addmany(['tooltip', 'tf-err-border--red']);
						this.controlComp.setAttribute('data-tooltip', this.validations.regex.errmsg);			
						this.isValidated = false;
					}else{
						this.controlComp.classList.removemany(['tooltip', 'tf-err-border--red']);
						this.controlComp.removeAttribute('data-tooltip', this.validations.regex.errmsg);			
					}					
				}
			}else if(val === 'customError'){
				if(this.validations.customError.value){
					this.controlComp.classList.addmany(['tooltip', 'tf-err-border--red']);
					this.controlComp.setAttribute('data-tooltip', this.validations.regex.errmsg);			
					this.isValidated = false;
				}
			}
		}, this);
		
		return this.isValidated;
	};
	/**This method will clear tooltip and border if validations present to component 
      * @mixes TFTextField
      * @mixes TFTextAreaField
      */
    this.clearError = function(){
    	this.controlComp.removeAttribute('data-tooltip');
    	this.controlComp.classList.removemany(['tooltip','tf-err-border--red']);
    }
};