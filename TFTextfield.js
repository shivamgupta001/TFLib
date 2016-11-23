/** This is a description of the Textfield Module. */
var TFTextField = function($fieldset){
		
		var textfield = {
			scope : this,
			 /** @access private */
			_init : function(){
				
				this._initialize();
				this._generateTemplate();
				this._cacheDom();
				this._applyProperty();
				this._bindEvents();
				this._attachProperties();
				this._render();
								
				//return el
				return this.$childTemplate[0];
			},
			 /** @access private */
			_initialize : function(){
				var me = this.scope;
				 
				this.dynamicId = me.id || "textfield-"+getRandomInt(1, 10000);
				
				//config
				this.buttons = me.buttons || [];
				this.validations = me.validations || '';
				
				//style
				this.fieldLabel = me.fieldLabel || '';
				this.flex = me.flex || false;
				this.fieldType = me.fieldType || 'row';

				this.styles = me.styles || '';
				this.attributes = me.attributes || '';

				//class
				this.labelClass = (me.labelClass ? (me.labelClass.constructor === Array ? me.labelClass : [me.labelClass]) : false);
				this.compClass = (me.compClass ? (me.compClass.constructor === Array ? me.compClass : [me.compClass]) : false);
				this.controlClass = (me.controlClass ? (me.controlClass.constructor === Array ? me.controlClass : [me.controlClass]) : false);
				this.displayLabel = me.displayLabel || false;
				
				//attributes
				this.name = me.name || '';
				this.placeholder = me.placeholder || '';
				this.pattern = me.pattern || '';
				this.required = (me.required === true) ? 'required' : '';
				this.value = me.value || '';
				this.readOnly = (me.readOnly === true) ? 'readonly' : '';
				this.maxlength = me.maxlength || '';
				this.tabindex = me.tabindex || '';
				this.markRequired = me.markRequired || false;

				 /** @access private */
				this.render = me.render || '';
				this.listeners = me.listeners || '';

			},
			 /** @access private */
			_generateTemplate : function(){
				var el =[
					'<div',
						'id="'+this.dynamicId+'"',
						'class="tf-flex '+((this.fieldType === 'row') ? 'tf-flex-direction--row ':'tf-flex-direction--column ')+'">',
						'<div control-type="tf-label" class="tf-flex '+(this.displayLabel ? 'tf-display--none': '')+'">',
							'<label>'+(this.fieldLabel ? this.fieldLabel : '')+'</label>',
							'<span class="tf-required--red '+(this.markRequired ? '' : 'tf-display--none')+'">*</span>',
						'</div>',
						'<div control-type="tf-textfield" class="field-with-btn">',
							'<input',
								'type="text"',
								''+(this.name ? 'name="'+this.name+'"' : '')+'',
								''+(this.value ? 'value="'+this.value+'"' : '')+'',
								''+(this.placeholder ? 'placeholder="'+this.placeholder+'"' : '')+'',
								''+(this.pattern ? 'pattern="'+this.pattern+'"' : '')+'',
								''+(this.maxlength ? 'maxlength="'+this.maxlength+'"' : '')+'',
								''+(this.tabindex ? 'tabindex="'+this.tabindex+'"' : '')+'',
								''+this.readOnly+'',
								''+this.required+'',
								'/>',
						'</div>',
					'</div>'
				].join('\n');
				
				this.$childTemplate = $(el);
			},
			_cacheDom : function(){

				//cache DOM
				this.innerComp = this.$childTemplate.find("input")[0];
				this.outerComp = this.$childTemplate[0];
				this.controlComp = this.$childTemplate.find("[control-type='tf-textfield']")[0];
				this.labelComp = this.$childTemplate.find("[control-type='tf-label']")[0];
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
				
				//applying classes
				if(this.controlClass) this.controlComp.classList.add.apply(this.controlComp.classList , this.controlClass);
				if(this.compClass) this.outerComp.classList.add.apply(this.outerComp.classList , this.compClass);
				if(this.labelClass) this.labelComp.classList.add.apply(this.labelComp.classList, this.labelClass);

				// handling buttons
				this.buttons.forEach(function(val){
				    this.controlComp.append(TFButton.call(val));
				}, this);
			},
			 /** @access private */
			_bindEvents : function(){
				var me = this.scope;

				//private listeners
				if(this.validations != ''){

					//adding validations 
					TFValidations.call(me);
					
					Object.keys(this.validations).forEach(function(val){

						switch(val){
							case 'isRequired' : this.innerComp.addEventListener('blur', this.scope.isRequired.bind(this.scope));
											  	this.innerComp.addEventListener('input', this.scope.isRequired.bind(this.scope));
												break;

							case 'onlyNumber' : this.innerComp.addEventListener('keydown', this.scope.isNumber);
												break;

							case 'regex'	: 	this.innerComp.addEventListener('blur', this.scope.isRegEx.bind(this.scope));
												this.innerComp.addEventListener('input', this.scope.isRegEx.bind(this.scope));
												break;

							case 'onlyText'	: 	this.innerComp.addEventListener('keydown', this.scope.isOnlyText);
											  	break;

						}
					}, this);
				}

				//public listeners
				if(this.listeners != ''){
					for(var listener in this.listeners){
						this.innerComp.addEventListener( listener , this.listeners[listener].bind(me));
					}
				}
			},
			 /** @access private */
			_render : function(){

				if(this.render != ''){
				
					this.render();
				}
			},
			 /** @access private */
			_attachProperties : function(){
				var me = this.scope;

				//properties
				me.outerComp = this.outerComp;
				me.innerComp = this.innerComp;
				me.controlComp = this.controlComp;
				me.labelComp = this.labelComp;
					
				//methods
				TFTextFieldMethods.call(me);

				this.outerComp.shared = me;
			}
		};
		
				
		function getRandomInt(min, max){
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random()*(max - min)+min);
		}
		
	return	textfield._init();
	
};
