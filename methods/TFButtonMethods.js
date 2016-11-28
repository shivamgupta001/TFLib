/**
 * @author Shivam Gupta <shivamcs3080@gmail.com>
 */
 /** This is a description of the Button Methods  Module. */
var TFButtonMethods = function(){

	// inner text handler
	this.replaceText = function(newText){
		this.innerComp.innerText = newText;
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

	// add remove attribute
	this.setAttribute = function( attrName , attrVal){
		this.innerComp.setAttribute(attrName , attrVal);
	};
	this.removeAttribute = function(attrName){
		this.innerComp.removeAttribute(attrName);
	};
};