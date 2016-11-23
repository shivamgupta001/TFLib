var TFButtonMethods = function(){

	//display property handler
	this.displayHide = function(){
		this.$innerComp.style.display = "none";
	};
	this.displayShow = function(){
		this.$innerComp.style.display = "";
	};

	// visibility preoperty handler
	this.visibleHide = function(){
		this.$innerComp.style.visibility = "hidden";
	};
	this.visibleShow = function(){
		this.$innerComp.style.visibility = "";
	};

	// inner text handler
	this.replaceText = function(newText){
		this.$innerComp.innerText = newText;
	};

	// add remove class handler
	this.addClass = function(newClass){
		newClass = newClass.constructor === Array ? newClass : [newClass];  
		this.$innerComp.classList.add.apply(this.$innerComp.classList , newClass);
	};
	this.removeClass = function(oldClass){
		oldClass = oldClass.constructor === Array ? oldClass : [oldClass];
		this.$innerComp.classList.remove.apply(this.$innerComp.classList , oldClass);
	};

	// disable enable handler
	this.disable = function(){
		this.$innerComp.setAttribute('disabled' , true);
	};
	this.enable = function(){
		this.$innerComp.removeAttribute('disabled');
	};

};