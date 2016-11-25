var TFCheckboxFieldMethods = function(){

	//display property handler
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

	// add remove class
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
	this.insertDomAt = function(el , selector){
		this.outerComp.insertBefore(el , this.outerComp.querySelector(selector));
	};
	
	
};