/**
 * @author Shivam Gupta 
 * @constructor TFConstants
 */

TFLib.TFConstants = {

		POPUP : {
			ERROR : 'Error',
			INFO : 'Info',
			CONFIRM : 'Confirm',
			SUCCESS : 'Sucess',
			OK : 'OK',
			CANCEL : 'CANCEL'
		},
		COMMON :{

			ISREQUIRED : 'This field is Required',
			REGEX : 'Failed regular expression',
			CUSTOMERROR : 'Custom Error'

		},
		/**This method will remove class from inner comp
	      * @memberof TFConstants
	      * @param {string} key - can be one of 'COMMON' or 'POPUP'
	      * @param {Object} valObj - {key : value} if present update otherwise add new constant
	      */
		config : function(parentKey , valObj ){

			Object.keys(valObj).forEach(function(val){

				this[parentKey][val] = valObj[val];
				
			}.bind(this)); 
		}
};
