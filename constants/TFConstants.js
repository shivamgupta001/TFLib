TFLib.Constants = {

		popup : {
			OK : 'OK',
			CANCEL : 'CANCEL',
			ISREQUIRED : 'This field is mandatory',
		},
		common :{
			txtOK : "OK",
			txtCncel : "C",
			errMSG : '6231463521'
		},
		config : function(parentKey , valObj ){

			Object.keys(valObj).forEach(function(val){

				this[parentKey][val] = valObj[val];
				
			}.bind(this)); 
			
		}
};
