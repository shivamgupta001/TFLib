
var TFCheckboxFieldMethods = function(){

	/**This method will hide label as display 'none'
      * @memberof TFCheckboxField
      * @memberof TFRadioField
      */
	this.displayLabelHide = function(){
		this.labelComp.style.display = "none";
	};
	/**This method will show label if display 'none'
      * @memberof TFCheckboxField
      * @memberof TFRadioField
      */
	this.displayLabelShow = function(){
		this.labelComp.style.display = "";
	};
	/**This method will control comp as display 'none'
      * @memberof TFCheckboxField
      * @memberof TFRadioField
      */
	this.displayControlHide = function(){
		this.controlComp.style.display = "none";
	};
	/**This method will show control comp if display 'none'
      * @memberof TFCheckboxField
      * @memberof TFRadioField
      */
	this.displayControlShow = function(){
		this.controlComp.style.display = "";
	};

	/**This method will hide label as visibility 'hidden'
      * @memberof TFCheckboxField
      * @memberof TFRadioField
      */
	this.visibleLabelHide = function(){
		this.labelComp.style.visibility = "hidden";
	};
	/**This method will show label as if visibility 'hidden'
      * @memberof TFCheckboxField
      * @memberof TFRadioField
      */
	this.visibleLabelShow = function(){
		this.labelComp.style.visibility = "";
	};
	/**This method will hide control as visibility 'hidden'
      * @memberof TFCheckboxField
      * @memberof TFRadioField
      */
	this.visibleControlHide = function(){
		this.controlComp.style.visibility = "hidden";
	};
	/**This method will show control if visibility 'hidden'
      * @memberof TFCheckboxField
      * @memberof TFRadioField
      */
	this.visibleControlShow = function(){
		this.controlComp.style.visibility = "";
	};

	/**This method will add style to label comp 
      * @memberof TFCheckboxField
      * @memberof TFRadioField
      * @param {string} property - property name 
      * @param {string} val - property value 
      */
	this.addLabelStyle = function(prop , val){
		this.labelComp.style[prop] = val;
	};
	/**This method will remove style to label comp 
      * @memberof TFCheckboxField
      * @memberof TFRadioField
      * @param {string} property - property name 
      */
	this.removeLabelStyle = function(prop){
		this.labelComp.style[prop] = '';
	};
	/**This method will add style to control comp 
      * @memberof TFCheckboxField
      * @memberof TFRadioField
      * @param {string} property - property name 
      * @param {string} val - property value 
      */
	this.addControlStyle = function(prop , val){
		this.controlComp.style[prop] = val;
	};
	/**This method will remove style to control comp 
      * @memberof TFCheckboxField
      * @memberof TFRadioField
      * @param {string} property - property name 
      */
	this.removeControlStyle = function(prop){
		this.controlComp.style[prop] = '';
	};

	/**This method will change label text 
      * @memberof TFCheckboxField
      * @memberof TFRadioField
      * @param {string} newLabelText - label text or html
      */
	this.changeLabel = function(newLabelText){
		
		this.labelComp.querySelector('#'+this.labelId).innerHTML = newLabelText;
		this.fieldLabel = newLabelText;
	};

	/**This method will add class to label comp 
      * @memberof TFCheckboxField
      * @memberof TFRadioField
      * @param {string} newClass - class name 
      */
	this.addLabelClass = function(newClass){
		newClass = newClass.constructor === Array ? newClass : [newClass];
		this.labelComp.classList.add.apply(this.labelComp.classList , newClass); 
	};
	/**This method will remove class to label comp 
      * @memberof TFCheckboxField
      * @memberof TFRadioField
      * @param {string} oldClass - class name 
      */
	this.removeLabelClass = function(oldClass){
		oldClass = oldClass.constructor === Array ? oldClass : [oldClass];
		this.labelComp.classList.remove.apply(this.labelComp.classList , oldClass);
	};
	/**This method will add class to control comp 
      * @memberof TFCheckboxField
      * @memberof TFRadioField
      * @param {string} newClass - class name 
      */
	this.addControlClass = function(newClass){
		newClass = newClass.constructor === Array ? newClass : [newClass];
		this.controlComp.classList.add.apply(this.controlComp.classList , newClass); 	
	};
	/**This method will remove class to control comp 
      * @memberof TFCheckboxField
      * @memberof TFRadioField
      * @param {string} oldClass - class name 
      */
	this.removeControlClass = function(oldClass){
		oldClass = oldClass.constructor === Array ? oldClass : [oldClass];
		this.controlComp.classList.remove.apply(this.controlComp.classList , oldClass);
	};
	
	/**This method will apply validation to component 
      * @memberof TFCheckboxField
      * @memberof TFRadioField
      * @param {object}
      * @property {boolean} value - true or false to apply or not apply validation
      * @property {string} errmsg - error message to show on tooltip
      */
	this.isRequired = function(status , errmsg){
	
		if(this.validations.hasOwnProperty("isRequired")){

			if(!status){
				this.controlComp.classList.remove('tooltip','tf-err-border--red');
				this.controlComp.removeAttribute("data-tooltip");
			}
			this.validations.isRequired.value = status;
			this.validations.isRequired.errmsg = errmsg;	

		}else{
			this.validations = Object.defineProperty(this.validations, 'isRequired', 
								{	value : {},
									writable : true,
									configurable : true,
									enumerable : true
								});
			if(status)
				this.validations.isRequired.value = status;
			if(errmsg)
				this.validations.isRequired.errmsg = errmsg;
		}
		
		this.setValidations.call(this);
	
	};
	/**This method will apply validate if validation applied to component at any point
      * @memberof TFCheckboxField
      * @memberof TFRadioField
      */
	this.validate = function(){
		
		var chkstatus = false;
		for(var i = 0 ; i< this.innerComp.length ; i++){
			if(this.innerComp[i].checked){
				chkstatus = true;
				break;
			}
		}

		if(chkstatus){
			this.controlComp.classList.remove('tooltip', 'tf-err-border--red');
			this.controlComp.removeAttribute('data-tooltip');
		}else{
			this.controlComp.classList.add('tooltip', 'tf-err-border--red');
			this.controlComp.setAttribute('data-tooltip', this.validations.isRequired.errmsg);
		}

		return chkstatus;
	};
};