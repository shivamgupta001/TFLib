/** @mixin */
TFLib.TFCheckboxMethods = function(){

	/**This method will hide label as display 'none'
      * @mixes TFCheckbox
      * @mixes TFRadio
      */
	this.displayLabelHide = function(){
		this.labelComp.style.display = "none";
	};
	/**This method will show label if display 'none'
      * @mixes TFCheckbox
      * @mixes TFRadio
      */
	this.displayLabelShow = function(){
		this.labelComp.style.display = "";
	};
	/**This method will inner comp as display 'none'
      * @mixes TFCheckbox
      * @mixes TFRadio
      */
	this.displayInnerHide = function(){
		this.innerComp.style.display = "none";
	};
	/**This method will inner comp as display 'none'
      * @mixes TFCheckbox
      * @mixes TFRadio
      */
	this.displayInnerShow = function(){
		this.innerComp.style.display = "";
	};

	/**This method will hide label as visibility 'hidden'
      * @mixes TFCheckbox
      * @mixes TFRadio
      */
	this.visibleLabelHide = function(){
		this.labelComp.style.visibility = "hidden";
	};
	/**This method will show label if visibility 'hidden'
      * @mixes TFCheckbox
      * @mixes TFRadio
      */
	this.visibleLabelShow = function(){
		this.labelComp.style.visibility = "";
	};
	/**This method will hide inner label as visibility 'hidden'
      * @mixes TFCheckbox
      * @mixes TFRadio
      */
	this.visibleInnerHide = function(){
		this.innerComp.style.visibility = "hidden";
	};
	/**This method will show inner label if visibility 'hidden'
      * @mixes TFCheckbox
      * @mixes TFRadio
      */
	this.visibleInnerShow = function(){
		this.innerComp.style.visibility = "";
	};

	/**This method will add style to label comp 
      * @mixes TFCheckbox
      * @mixes TFRadio
      * @param {string} property - property name 
      * @param {string} val - property value 
      */
	this.addLabelStyle = function(prop , val){
		this.labelComp.style[prop] = val;
	};
	/**This method will remove style to label comp 
      * @mixes TFCheckbox
      * @mixes TFRadio
      * @param {string} property - property name 
      */
	this.removeLabelStyle = function(prop){
		this.labelComp.style[prop] = '';
	};
	/**This method will add style to inner comp 
      * @mixes TFCheckbox
      * @mixes TFRadio
      * @param {string} property - property name 
      * @param {string} val - property value 
      */
	this.addInnerStyle = function(prop , val){
		this.innerComp.style[prop] = val;
	};
	/**This method will remove style to inner comp 
      * @mixes TFCheckbox
      * @mixes TFRadio
      * @param {string} property - property name 
      */
	this.removeInnerStyle = function(prop){
		this.innerComp.style[prop] = '';
	};

	/**This method will change label text 
      * @mixes TFCheckbox
      * @mixes TFRadio
      * @param {string} newLabelText - label text or html
      */
	this.changeLabel = function(newLabelText){
		this.labelComp.innerHTML = newLabelText;
		this.fieldLabel = newLabelText;
	};

	/**This method will add class to label comp 
      * @mixes TFCheckbox
      * @mixes TFRadio
      * @param {string|string[]} newClass - class name 
      */
	this.addLabelClass = function(newClass){
		newClass = newClass.constructor === Array ? newClass : [newClass];
		this.labelComp.classList.addmany(newClass); 
	};
	/**This method will remove class to label comp 
      * @mixes TFCheckbox
      * @mixes TFRadio
      * @param {string|string[]} oldClass - class name 
      */
	this.removeLabelClass = function(oldClass){
		oldClass = oldClass.constructor === Array ? oldClass : [oldClass];
		this.labelComp.classList.removemany(oldClass);
	};
	/**This method will add class to inner comp 
      * @mixes TFCheckbox
      * @mixes TFRadio
      * @param {string|string[]} newClass - class name 
      */
	this.addInnerClass = function(newClass){
		newClass = newClass.constructor === Array ? newClass : [newClass];
		this.innerComp.classList.addmany(newClass); 	
	};
	/**This method will remove class to inner comp 
      * @mixes TFCheckbox
      * @mixes TFRadio
      * @param {string|string[]} oldClass - class name 
      */
	this.removeInnerClass = function(oldClass){
		oldClass = oldClass.constructor === Array ? oldClass : [oldClass];
		this.innerComp.classList.removemany(oldClass);
	};

	/**This method will set attribute to inner comp 
      * @mixes TFCheckbox
      * @mixes TFRadio
      * @param {string} attrName - attribute name
      * @param {string} attrVal - attribute value
      */
	this.setAttribute = function( attrName , attrVal){
		this.innerComp.setAttribute(attrName , attrVal);
	};
	/**This method will remove attribute to inner comp 
      * @mixes TFCheckbox
      * @mixes TFRadio
      * @param {string} attrName - attribute name 
      */
	this.removeAttribute = function(attrName){
		this.innerComp.removeAttribute(attrName);
	};
};