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
	this.setError = function(errmsg){
		
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
	};
/*this.isRequired(true,message);
this.regex(true, regex, message);
this.onlyText(true);
this.onlyNumber(true);
this.hide()
this.prop("readonly", true);*/


};