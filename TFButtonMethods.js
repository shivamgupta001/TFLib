var TFButtonMethods = function(){

	//display property handler
	this.hide = function(){
		this.outerComp.style.display = "none";
	};
	this.show = function(){
		this.outerComp.style.display = "";
	};

	// visibility property handler
	this.visibleHide = function(){
		this.outerComp.style.visibility = "hidden";
	};
	this.visibleShow = function(){
		this.outerComp.style.visibility = "";
	};

	// inner text handler
	this.replaceText = function(newText){
		this.innerComp.innerText = newText;
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
	this.addInnerClass = function(newClass){
		newClass = newClass.constructor === Array ? newClass : [newClass];  
		this.innerComp.classList.add.apply(this.innerComp.classList , newClass);
	};
	this.removeInnerClass = function(oldClass){
		oldClass = oldClass.constructor === Array ? oldClass : [oldClass];
		this.innerComp.classList.remove.apply(this.innerComp.classList , oldClass);
	};

	// disable enable handler
	this.disable = function(){
		this.innerComp.setAttribute('disabled' , true);
	};
	this.enable = function(){
		this.innerComp.removeAttribute('disabled');
	};

	// append prepend dom
	this.append = function(el){
		this.outerComp.appendChild(el);
	};
	this.prepend = function(el){
		this.outerComp.insertBefore(el , this.outerComp.childNodes[0]);
	};
	this.insertDomAt = function(el , selector){
		this.outerComp.insertBefore(el , this.outerComp.querySelector(selector));
	};

	// add remove attribute
	this.setAttribute = function( attrName , attrVal){
		this.innerComp.setAttribute(attrName , attrVal);
	};
	this.removeAttribute = function(attrName){
		this.innerComp.removeAttribute(attrName);
	};
};