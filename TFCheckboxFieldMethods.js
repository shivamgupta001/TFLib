var TFCheckboxFieldMethods = function(){

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
	this.changeLabelText = function(newLabelText){
		this.labelComp.querySelector('label').innerHTML = newLabelText;
	};

	// add remove class
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
	
	// isRequired method
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

	this.validate = function(){
		
		var chkstatus = false;
		for(var i = 0 ; i< this.innerComp.length ; i++){
			if(this.innerComp[i].checked){
				chkstatus = true;
				break;
			}
		}

		if(chkstatus){
			this.controlComp.classList.remove('tooltip', 'tf-err-border--red');
			this.controlComp.removeAttribute('data-tooltip');
		}else{
			this.controlComp.classList.add('tooltip', 'tf-err-border--red');
			this.controlComp.setAttribute('data-tooltip', this.validations.isRequired.errmsg);
		}
	};
};