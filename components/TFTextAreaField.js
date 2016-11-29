/**
 * @author Shivam Gupta 
 * @constructor TFTextAreaField
 * @property {string} id - id will be assigned to outer component.
 * @property {string} innerId -  will be assigned to input[id] & label[for].
 * @property {string} markRequired - will add *.
 * @property {string} fieldLayout - can be 'row' or 'column'.
 * @property {object} styles - styles will be applied to outer div of component.
 * @property {string} displayLabel - 'none' will hide display part of component.
 * @property {object} attributes - attributes will be applied to textarea tag.
 * @property {object} validations - Does apply validations to component only 'isRequired' present.
 * @property {string} fieldLabel - label to component field.
 * @property {(string|string[])} labelClass -  will be applied to  label wrapper.
 * @property {(string|string[])} compClass -  will be applied to  outermost div.
 * @property {(string|string[])} controlClass -  will be applied to div wraper of all teaxtarea wrapper.
 * @property {function} render - this function will run when the component is generated but not yet returned.
 * @property {object} listeners - is an object where all listener handlers can be written as key value pair.
 */
var TFTextAreaField = function(){
		
		var textareafield = {
			
			scope : this,
			_init : function(){
				
				this._initialize();
				this._generateTemplate();
				this._cacheDom();
				this._applyProperty();
				this._bindEvents();
				this._attachProperties();
				this._render();	

				//return el
				return this.outerComp;
			},
			_initialize : function(){
				
				var me = this.scope;
				 
				//config
				this.dynamicId = me.id || "tf-textarea-comp-"+getRandomInt(1, 10000);
				this.innerId = me.innerId || "tf-textarea-"+ getRandomInt(1 , 10000);

				this.styles = me.styles || '';
				this.attributes = me.attributes || '';
				this.displayLabel = me.displayLabel || false;
				this.fieldLayout = me.fieldLayout || 'row';
				this.markRequired = me.markRequired || false;
				this.validations = me.validations || {};
	            this.validations.__proto__ =  {
	                'isRequired' : {value : false , errmsg : 'This field is Required'},
	                'onlyText' : {value : false},
	                'onlyNumber' : {value :false},
	                'regex' : {value : false, errmsg : 'Allowed Values are alphabets'}
	            };

				//innerHTML or innerText
				this.fieldLabel = me.fieldLabel || '';
				
				//class
				this.labelClass = (me.labelClass ? (me.labelClass.constructor === Array ? me.labelClass : [me.labelClass]) : false);
				this.compClass = (me.compClass ? (me.compClass.constructor === Array ? me.compClass : [me.compClass]) : false);
				this.controlClass = (me.controlClass ? (me.controlClass.constructor === Array ? me.controlClass : [me.controlClass]) : false);
											
				//attributes
				this.name = me.name || '';
				this.placeholder = me.placeholder || '';
				this.pattern = me.pattern || '';
				this.required = (me.required === true) ? 'required' : '';
				this.value = me.value || '';
				this.readOnly = (me.readOnly === true) ? 'readonly' : '';
				this.maxlength = me.maxlength || '';
				
				// methods
				this.render = me.render || '';
				this.listeners = me.listeners || '';

			},
			_generateTemplate : function(){
				var el =[
					'<div',
						'id="'+this.dynamicId+'"',
						'class="tf-flex '+((this.fieldLayout === 'row') ? 'tf-flex-direction--row ':'tf-flex-direction--column ')+'">',
						'<div control-type="tf-taf-label" class="tf-flex" '+(this.displayLabel ? 'tf-display--none': '')+'>',
							'<label for="'+this.innerId+'">'+(this.fieldLabel ? this.fieldLabel : '')+'</label>',
							'<span class="tf-required--red '+(this.markRequired ? '' : 'tf-display--none')+'">*</span>',
						'</div>',
						'<div control-type="tf-textareafield" class="tf-field-with-btn ">',
							'<textarea',
								'id="'+this.innerId+'"',
								''+(this.name ? 'name="'+this.name+'"' : '')+'',
								''+(this.placeholder ? 'placeholder="'+this.placeholder+'"' : '')+'',
								''+(this.cols ? 'cols="'+this.cols+'"' : '')+'',
								''+(this.rows ? 'rows="'+this.rows+'"' : '')+'',
								''+(this.maxlength ? 'maxlength="'+this.maxlength+'"' : '')+'',
								''+this.readOnly+'',
								''+this.required+'',
								''+this.disabled+'',
								'>',
								''+(this.value ? 'value="'+this.value+'"' : '')+'',
								'</textarea>',
						'</div>',
					'</div>'
				].join('\n');
				
				this.childTemplate = $(el)[0];
			},
			_cacheDom : function(){

				//cache Dom
				this.outerComp = this.childTemplate;
				this.innerComp = this.childTemplate.querySelector("textarea");
				this.labelComp = this.childTemplate.querySelector('[control-type="tf-taf-label"]');
				this.controlComp = this.childTemplate.querySelector('[control-type="tf-textareafield"]');
			 
			},
			_applyProperty : function(){
				
				//apply styles
				if(this.styles != ''){
					Object.keys(this.styles).forEach(function(style){
						this.outerComp.style[style] = this.styles[style];
					}, this);
				}

				//apply attributes
				if(this.attributes != ''){
					Object.keys(this.attributes).forEach(function(attribute){
						this.innerComp.setAttribute(attribute , this.attributes[attribute]);
					}, this);	
				}

				// apply class
				if(this.controlClass) this.controlComp.classList.add.apply(this.controlComp.classList , this.controlClass);
				if(this.labelClass) this.labelComp.classList.add.apply(this.labelComp.classList , this.labelClass);
				if(this.compClass) this.outerComp.classList.add.apply(this.outerComp.classList, this.compClass);
				
			},
			_bindEvents : function(){
				
				var me = this.scope;
				
				if(this.listeners != ''){
					for(var listener in this.listeners){
						this.innerComp.addEventListener(listener , this.listeners[listener].bind(me));
					}
				}
			},
			_attachProperties : function(){
				
				var me = this.scope;

				// add properties
				me.innerComp = this.innerComp;
				me.labelComp = this.labelComp;
				me.outerComp = this.outerComp;
				me.controlComp = this.controlComp;
				me.setValidations = this.setValidations;
            	me.validations = this.validations;
            	me.innerId = this.innerId;
				
				// add methods
				TFTextFieldMethods.call(me);
				TFSharedMethods.call(me);

				// share methods over el
				this.outerComp.shared = me;

				// handle validations
	            me.validationMethods = {};
	            TFValidations.call(me.validationMethods);

	            if(Object.keys(this.validations).length > 0)
	                this.setValidations.call(me);
			},
			_render : function(){

				var me = this;

				if(this.render != ''){
					this.render.call(me);
				}
			},
	        setValidations: function() {
	                
	                //adding validations
	                Object.keys(this.validations).forEach(function(val) {

	                    switch (val) {
	                        case 'isRequired':
	                        	if(this.validations.isRequired.value){
	                        		
	                                if(!this.isRequiredHandler){

	                                    this.isRequiredHandler = this.validationMethods.isRequired.bind(this);
	                                    this.innerComp.addEventListener('blur', this.isRequiredHandler);
	                                    this.innerComp.addEventListener('input', this.isRequiredHandler);
	                                }
	                                


	                        	}else {
	                        		this.innerComp.removeEventListener('blur', this.isRequiredHandler);
	                            	this.innerComp.removeEventListener('input', this.isRequiredHandler);
	                                delete this.isRequiredHandler;
	                           	}
	                            break;

	                        case 'onlyNumber':
	                        	if(this.validations.onlyNumber.value){
	                      		    
	                                if(!this.onlyNumberHandler){
	                                    this.onlyNumberHandler = this.validationMethods.onlyNumber.bind(this);
	                                    this.innerComp.addEventListener('keydown', this.onlyNumberHandler); 
	                                }
	                                
	                        	}else{
	                                this.innerComp.removeEventListener('keydown', this.onlyNumberHandler);
	                                delete this.onlyNumberHandler;
	                            }                            
	                            break;

	                        case 'regex':
	                        	if(this.validations.regex.value){

	                                if(!this.regexHandler){
	                                    this.regexHandler = this.validationMethods.regex.bind(this);
	                                    this.innerComp.addEventListener('blur', this.regexHandler);
	                                    this.innerComp.addEventListener('input', this.regexHandler);
	                                }
	                                
	                            }else {

	                                this.innerComp.removeEventListener('blur', this.regexHandler);
	                                this.innerComp.removeEventListener('input', this.regexHandler);
	                                delete this.regexHandler;
	                            } 
	                            break;

	                        case 'onlyText':
	                        	if(this.validations.onlyText.value){
	                        		
	                                if(!this.onlyTextHandler){
	                                    this.onlyTextHandler = this.validationMethods.onlyText.bind(this);
	                                    this.innerComp.addEventListener('keydown', this.onlyTextHandler);       
	                                }
	                                
	                        	}else{

	                                this.innerComp.removeEventListener('keydown', this.onlyTextHandler);
	                                delete this.onlyTextHandler;
	                            }
	                            break;
	                    }
	                }, this);
	            
	        }
		};
						
		function getRandomInt(min, max){
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random()*(max - min)+min);
		}
		
	return	textareafield._init();
	
};
