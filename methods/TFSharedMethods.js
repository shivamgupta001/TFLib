var TFSharedMethods = function(){
	
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

	// add remove class handler
	this.addClass = function(newClass){
		newClass = newClass.constructor === Array ? newClass : [newClass];  
		this.outerComp.classList.add.apply(this.outerComp.classList , newClass);
	};
	this.removeClass = function(oldClass){
		oldClass = oldClass.constructor === Array ? oldClass : [oldClass];
		this.outerComp.classList.remove.apply(this.outerComp.classList , oldClass);
	};

	// add remove style
	this.addStyle = function(prop , val){
		this.outerComp.style[prop] = val;
	};
	this.removeStyle = function(prop){
		this.outerComp.style[prop] = '';
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
};