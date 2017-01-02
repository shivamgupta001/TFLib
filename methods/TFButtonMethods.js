
TFLib.TFButtonMethods = function(){

	
	/**
	  * This method will replace btnText
      * @memberof TFButton
      * @param {string} newText - pass text
      */
	this.replaceText = function(newText){
		this.innerComp.innerText = newText;
	};
	/**This method will add class to inner comp
      * @memberof TFButton
      * @param {string|string[]} newClass - pass classes
      */
	this.addInnerClass = function(newClass){
		newClass = newClass.constructor === Array ? newClass : [newClass];  
		this.innerComp.classList.addmany(newClass);
	};
	/**This method will remove class from inner comp
      * @memberof TFButton
      * @param {string|string[]} oldClass - pass oldClass will be removed to classList
      */
	this.removeInnerClass = function(oldClass){
		oldClass = oldClass.constructor === Array ? oldClass : [oldClass];
		this.innerComp.classList.removemany(oldClass);
	};

	/**This method will disable button
      * @memberof TFButton
      */
	this.disable = function(){
		this.innerComp.setAttribute('disabled' , true);
	};
	/**This method will enable button if disabled
      * @memberof TFButton
      */
	this.enable = function(){
		this.innerComp.removeAttribute('disabled');
	};

	/**This method will set attribute to inner comp
      * @memberof TFButton
      * @param {string} attrName - attribute name to set
      * @param {string} attrval - attribute value to set
      */
	this.setAttribute = function( attrName , attrVal){
		this.innerComp.setAttribute(attrName , attrVal);
	};
	/**This method will remove attribute from inner comp
      * @memberof TFButton
      * @param {string} attrName - attribute name to remove
      */
	this.removeAttribute = function(attrName){
		this.innerComp.removeAttribute(attrName);
	};
};