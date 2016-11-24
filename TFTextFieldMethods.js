var TFTextFieldMethods = function(){

	// display property handler
	this.displayHide = function(){
		this.outerComp.style.display = "none";
	};
	this.displayShow = function(){
		this.outerComp.style.display = "";
	};
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
	this.visibleHide = function(){
		this.outerComp.style.visibility = "hidden";
	};
	this.visibleShow = function(){
		this.outerComp.style.visibility = "";
	};
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
	this.addStyle = function(prop , val){
		this.outerComp.style[prop] = val;
	};
	this.removeStyle = function(prop){
		this.outerComp.style[prop] = '';
	};
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

	// add remove class handler
	this.addClass = function(newClass){
		newClass = newClass.constructor === Array ? newClass : [newClass];
		this.outerComp.classList.add.apply(this.outerComp.classList , newClass);
	};
	this.removeClass = function(oldClass){
		oldClass = oldClass.constructor === Array ? oldClass : [oldClass];
		this.outerComp.classList.remove.apply(this.outerComp.classList , oldClass);
	};
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

	// append dom handlers
	this.appendDom = function(el){
		this.outerComp.appendChild(el);
	};
	this.prependDom = function(el){
		this.outerComp.insertBefore(el , this.outerComp.childNodes[0]);
	};
	this.insertDomAt = function(el , index){
		this.outerComp.insertBefore(el , this.outerComp.childNodes[index]);
	};
	this.appendDomToLabel = function(el){
		this.labelComp.appendChild(el);
	};
	this.prependDomToLabel = function(el){
		this.labelComp.insertBefore(el , this.labelComp.childNodes[0]);
	};
	this.insertDomToLabelAt = function(el , index){
		this.labelComp.insertBefore(el , this.labelComp.childNodes[index]);
	};
	this.appendDomToControl = function(el){
		this.controlComp.appendChild(el);
	};
	this.prependDomToControl = function(el){
		this.controlComp.insertBefore(el , this.controlComp.childNodes[0]);
	};
	this.insertDomToControlAt = function(el , index){
		this.controlComp.insertBefore(el , this.controlComp.childNodes[index]);
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

};