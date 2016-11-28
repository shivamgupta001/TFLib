var TFTextFieldMethods = function(){

	// display property handler
	this.displayLabelHide = function(){
		this.labelComp.style.display = "none";
	};
	this.displayLabelShow = function(){
		this.labelComp.style.display = "";
	};
	this.displayControlHide = function(){
		this.controlComp.style.display = "none";
	};
	this.displayControlShow = function(){
		this.controlComp.style.display = "";
	};

	// visibility property handler
	this.visibleLabelHide = function(){
		this.labelComp.style.visibility = "hidden";
	};
	this.visibleLabelShow = function(){
		this.labelComp.style.visibility = "";
	};
	this.visibleControlHide = function(){
		this.controlComp.style.visibility = "hidden";
	};
	this.visibleControlShow = function(){
		this.controlComp.style.visibility = "";
	};

	// add remove style
	this.addLabelStyle = function(prop , val){
		this.labelComp.style[prop] = val;
	};
	this.removeLabelStyle = function(prop){
		this.labelComp.style[prop] = '';
	};
	this.addControlStyle = function(prop , val){
		this.controlComp.style[prop] = val;
	};
	this.removeControlStyle = function(prop){
		this.controlComp.style[prop] = '';
	};
	
	// change label name 
	this.changeLabel = function(newLabelText){
		this.labelComp.querySelector('tf-tf-label').innerHTML = newLabelText;
	};

	// add remove class handler
	this.addLabelClass = function(newClass){
		newClass = newClass.constructor === Array ? newClass : [newClass];
		this.labelComp.classList.add.apply(this.labelComp.classList , newClass);
	};
	this.removeLabelClass = function(oldClass){
		oldClass = oldClass.constructor === Array ? oldClass : [oldClass];
		this.labelComp.classList.remove.apply(this.labelComp.classList , oldClass);		
	};
	this.addControlClass = function(newClass){
		newClass = newClass.constructor === Array ? newClass : [newClass];
		this.controlComp.classList.add.apply(this.controlComp.classList , newClass);
	};
	this.removeControlClass = function(oldClass){
		oldClass = oldClass.constructor === Array ? oldClass : [oldClass];
		this.controlComp.classList.remove.apply(this.controlComp.classList , oldClass);
	};

	// set and rmove validation
	/*this.setError = function(errmsg){
		
		// if initially validations config included 
		// this.isRequired = function 
		// else this.isRequired = undefined 
		//[ before or after running setError this.isRequired remains same]
		// if this.validations.isRequired was not set it will get set after setError called

		
		if(this.validations && this.validations.isRequired){
			
		}else {

			// this.scope gets set only when setError ran successfully once
			if(!this.scope){
				this.validations = { 'isRequired' : {value : true , errmsg : errmsg}};
				this.setValidations();	
			}	
		}
		
	};
	this.removeError = function(){
				
		if(this.scope && this.scope.isRequired){

			this.validations.isRequired.value = false;
			this.setValidations();
			
		}
	};*/

	// validation methods
	this.isRequired = function(obj){
	
		var status = obj.value;
		var errmsg = obj.errmsg;
		if(this.validations.hasOwnProperty("isRequired")){

			this.validations.isRequired.value = status;
			this.validations.isRequired.errmsg = errmsg;	

		}else{
			this.validations = Object.defineProperty(this.validations, 'isRequired', 
								{	value : {},
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
	this.onlyText = function(obj){
		
		var status = obj.value;
		
		if(this.validations.hasOwnProperty("onlyText")){
			this.validations.onlyText.value = status;
				
		}else{
			this.validations = Object.defineProperty(this.validations, 'onlyText', 
									{	value : { },
										writable : true,
										configurable : true,
										enumerable : true
									});
			if(status)
				this.validations.onlyText.value = status;
		}
		
		this.setValidations.call(this);
	
	};
	this.onlyNumber = function(obj){
		
		var status = obj.value;
		
		if(this.validations.hasOwnProperty("onlyNumber")){
			
			this.validations.onlyNumber.value = status;
			
		}else{

			this.validations = Object.defineProperty(this.validations, 'onlyNumber', 
									{	value : { },
										writable : true,
										configurable : true,
										enumerable : true
									});
			if(status)
				this.validations.onlyNumber.value = status;
		}
		
		this.setValidations.call(this);
	
	};
	this.regex = function(obj){
		
		var status = obj.value;
		var errmsg = obj.errmsg;
		var pattern = obj.pattern;
		if(this.validations.hasOwnProperty("regex")){
			this.validations.regex.value = status;
			this.validations.regex.errmsg = errmsg;	
			this.validations.regex.pattern = pattern;	
		}else{
			this.validations = Object.defineProperty(this.validations , 'regex',
								{
									value : {},
									writable : true,
									configurable : true,
									enumerable : true
								});
			if(status)
				this.validations.regex.value = status;
			if(errmsg)
				this.validations.regex.errmsg = errmsg;
			if(pattern)
				this.validations.regex.pattern = pattern;
		}
		this.setValidations.call(this);
	
	};

	this.validate = function(){
		
		Object.keys(this.validation).forEach(function(val){
			if(val === 'isRequired'){
				if(this.validations.isRequired.value){
					this.controlComp.classList.add('tooltip', 'tf-err-border--red');
					this.controlComp.setAttribute('data-tooltip', this.validations.isRequired.errmsg);	
				}
			}else if(val === 'regex'){
				if(this.validations.regex.value){
					var regex = new RegExp(this.validations.regex.pattern);
					if(!regex.test(e.target.value)){
						this.controlComp.classList.add('tooltip', 'tf-err-border--red');
						this.controlComp.setAttribute('data-tooltip', this.validations.regex.errmsg);			
					}					
				}
			}
		})
	};
};