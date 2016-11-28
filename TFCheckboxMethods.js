var TFCheckboxMethods = function(){

	//display property handler
	this.displayLabelHide = function(){
		this.labelComp.style.display = "none";
	};
	this.displayLabelShow = function(){
		this.labelComp.style.display = "";
	};
	this.displayInnerHide = function(){
		this.innerComp.style.display = "none";
	};
	this.displayInnerShow = function(){
		this.innerComp.style.display = "";
	};

	// visibility property handler
	this.visibleLabelHide = function(){
		this.labelComp.style.visibility = "hidden";
	};
	this.visibleLabelShow = function(){
		this.labelComp.style.visibility = "";
	};
	this.visibleInnerHide = function(){
		this.innerComp.style.visibility = "hidden";
	};
	this.visibleInnerShow = function(){
		this.innerComp.style.visibility = "";
	};

	// add remove style
	this.addLabelStyle = function(prop , val){
		this.labelComp.style[prop] = val;
	};
	this.removeLabelStyle = function(prop){
		this.labelComp.style[prop] = '';
	};
	this.addInnerStyle = function(prop , val){
		this.innerComp.style[prop] = val;
	};
	this.removeInnerStyle = function(prop){
		this.innerComp.style[prop] = '';
	};

	// change label name 
	this.changeLabelText = function(newLabelText){
		this.labelComp.innerHTML = newLabelText;
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
	this.addInnerClass = function(newClass){
		newClass = newClass.constructor === Array ? newClass : [newClass];
		this.innerComp.classList.add.apply(this.innerComp.classList , newClass); 	
	};
	this.removeInnerClass = function(oldClass){
		oldClass = oldClass.constructor === Array ? oldClass : [oldClass];
		this.innerComp.classList.remove.apply(this.innerComp.classList , oldClass);
	};

	// set remove attribute
	this.setAttribute = function( attrName , attrVal){
		this.innerComp.setAttribute(attrName , attrVal);
	};
	this.removeAttribute = function(attrName){
		this.innerComp.removeAttribute(attrName);
	};
};