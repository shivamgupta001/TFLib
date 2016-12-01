
TFLib.TFComboboxFieldMethods = function(){


	/**This method will hide component as display 'none'
      * @memberof TFComboboxField
      * @property {object[]} data - pass data as array of object where each object having value , display
      * @property {string} value - value property name in data 
      * @property {string} display - display property name in data 
      */

	this.addData = function(data , value , display){
		
		this.value = value;
		this.display = display;
		data.forEach(function(val , index){
			var option = document.createElement('option');
			option.setAttribute('value', val[this.value]);
			option.innerHTML = val[this.display];
			this.innerComp.appendChild(option);
		},this);
		
	};
};