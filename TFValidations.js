var TFValidations = function(){
	
	this.isRequired = function(e){
		var control = this.$childTemplate[0];
		if(e.target.value === ''){
			control.classList.add('tooltip');
			control.setAttribute('data-tooltip', 'This field is required.');	
		}else{
			if(control.classList.contains('tooltip')){
				control.classList.remove('tooltip');
				control.setAttribute('data-tooltip', 'This field is required.');	
			}
		}
		
	};
	this.isNumber = function(){
		console.log('isNumber');
	};
	this.isOnlyText = function(){

	};
	this.isRegEx = function(){

	};
}