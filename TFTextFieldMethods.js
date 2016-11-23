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
		this.outerComp.append(el);
	};
	this.prependDom = function(el){
		this.outerComp.insertBefore(el , this.outerComp.childNodes[0]);
	};
	this.insertDomAt = function(el , index){
		this.outerComp.insertBefore(el , this.outerComp.childNodes[index]);
	};
	this.appendDomToLabel = function(el){
		this.labelComp.append(el);
	};
	this.prependDomToLabel = function(el){
		this.labelComp.insertBefore(el , this.labelComp.childNodes[0]);
	};
	this.insertDomToLabelAt = function(el , index){
		this.labelComp.insertBefore(el , this.labelComp.childNodes[index]);
	};
	this.appendDomToControl = function(el){
		this.controlComp.append(el);
	};
	this.prependDomToControl = function(el){
		this.controlComp.insertBefore(el , this.controlComp.childNodes[0]);
	};
	this.insertDomToControlAt = function(el , index){
		this.controlComp.insertBefore(el , this.controlComp.childNodes[index]);
	};

	// set and rmove validation
	/*this.setError = function(){
		TFValidations.call(this);
		this.innerComp.addEventListener('blur', this.scope.isRequired.bind(this.scope));
		this.innerComp.addEventListener('input', this.scope.isRequired.bind(this.scope));
	};
	this.removeError = function(){

	};*/

};