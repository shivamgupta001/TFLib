/** This is a description of the Textfield Module. */
var TFTextField = function($fieldset){
		
		var textfield = {
			scope : this,
			 /** @access private */
			_init : function(){
				
				this._initialize();
				this._generateTemplate();
				this._bindEvents();
				this._attachProperties();
				this._render();
<<<<<<< HEAD
				
				//sharing methods
				this.$childTemplate[0].shared = this.scope;	
				
				//return el
=======
				this.$childTemplate[0].shared = this.scope;	
>>>>>>> 523a185a004b7234544b8f6653d842f619014da8
				return this.$childTemplate[0];
			},
			 /** @access private */
			_initialize : function(){
				var me = this.scope;
				 
				this.dynamicId = me.id || "textfield-"+getRandomInt(1, 10000);
				
<<<<<<< HEAD
				//config
				this.buttons = me.buttons || [];
				this.validations = me.validations || '';
				
=======
>>>>>>> 523a185a004b7234544b8f6653d842f619014da8
				//style
				this.fieldLabel = me.fieldLabel || '';
				this.flex = me.flex || false;
				this.fieldType = me.fieldType || 'row';

				//class
				this.labelClass = (me.labelClass ? (me.labelClass.constructor === Array ? me.labelClass.join(' ') : me.labelClass) : false);
				this.compClass = (me.compClass ? (me.compClass.constructor === Array ? me.compClass.join(' ') : me.compClass) : false);
				this.btnClass = (me.controlClass ? (me.controlClass.constructor === Array ? me.controlClass.join(' ') : me.controlClass) : false);
				this.controlClass = (me.controlClass ? (me.controlClass.constructor === Array ? me.controlClass.join(' ') : me.controlClass) : false);
				this.iconClass = (me.iconClass ? (me.iconClass.constructor === String ? me.iconClass.split(',') : me.iconClass) : false);
				this.displayLabel = me.displayLabel || false;
				
				//attributes
				this.name = me.name || '';
				this.placeholder = me.placeholder || '';
				this.pattern = me.pattern || '';
				this.required = (me.required === true) ? 'required' : '';
				this.value = me.value || '';
				this.readOnly = (me.readOnly === true) ? 'readonly' : '';
				this.maxlength = me.maxlength || '';
				this.btn = (me.btn === false) ? false : true;
				this.label = (me.label === false) ? false : true;
				this.labelAreaDisplay = (me.labelDisplayArea === false)  ? false : true;
				this.btnAreaDisplay = (me.btnAreaDisplay === false) ? false : true;
				this.tabindex = me.tabindex || '';

				 /** @access private */
				this.render = me.render || '';
				this.listeners = me.listeners || '';

			},
			 /** @access private */
			_generateTemplate : function(){
				var el =[
					'<div',
						'id="'+this.dynamicId+'"',
						'class="tf-flex '+((this.fieldType === 'row') ? 'tf-flex-direction--row ':'tf-flex-direction--column ')+(this.compClass ? this.compClass : '')+'">',
						'<div class="tf-flex '+(this.displayLabel ? 'tf-display--none': '')+'"">',
							'<label class="'+(this.labelClass ? this.labelClass : '')+'">'+(this.fieldLabel ? this.fieldLabel : '')+'</label>',
							''+(this.required ? '<span style="color:red;">*</span>' : '')+'',
						'</div>',
<<<<<<< HEAD
						'<div control-type="textfield" class="field-with-btn '+(this.controlClass ? this.controlClass : '')+'">',
=======
						'<div class="field-with-btn '+(this.controlClass ? this.controlClass : '')+'">',
>>>>>>> 523a185a004b7234544b8f6653d842f619014da8
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
<<<<<<< HEAD
=======
							''+((this.iconClass && this.iconClass.length > 0) ? '<button class="'+this.iconClass.shift()+'"></button>' : '' )+'',
							''+((this.iconClass && this.iconClass.length > 0) ? '<button class="'+this.iconClass.shift()+'"></button>' : '')+'',
							''+((this.iconClass && this.iconClass.length > 0) ? '<button class="'+this.iconClass.shift()+'"></button>' : '')+'',
>>>>>>> 523a185a004b7234544b8f6653d842f619014da8
						'</div>',
					'</div>'
				].join('\n');
				
				this.$childTemplate = $(el);
				
<<<<<<< HEAD
				//cache DOM
				this.$innerComp = this.$childTemplate.find("input")[0];
				this.$outerComp = this.$childTemplate[0];
				this.$controlComp = this.$childTemplate.find("[control-type='textfield']");

				// handling buttons
				this.buttons.forEach(function(val){
				    this.$controlComp.append(TFButton.call(val));
				}, this);
				
=======
				this.$innerComp = this.$childTemplate.find("input")[0];
				this.$outerComp = this.$childTemplate[0];

>>>>>>> 523a185a004b7234544b8f6653d842f619014da8
				//apply styles 
				if(this.flex) this.$outerComp.style.flex = this.flex;

			},
			 /** @access private */
			_bindEvents : function(){
				var me = this.scope;
<<<<<<< HEAD

				//private listeners
				if(this.validations != ''){

					//adding validations 
					TFValidations.call(me);
					
					Object.keys(this.validations).forEach(function(val){
						
						switch(val){
							case 'required' : this.$innerComp.addEventListener('blur', this.scope.isRequired.bind(this.scope));
												break;
							case 'number' 	: this.$innerComp.addEventListener('keydown', this.scope.isNumber);
												break;
							case 'regex'	: this.$innerComp.addEventListener('blur', this.scope.isRegEx);
												break;
							case 'onlyText'	: this.$innerComp.addEventListener('blur', this.scope.isOnlyText);
												break;
						}
					}, this);
				}

				//public listeners
=======
>>>>>>> 523a185a004b7234544b8f6653d842f619014da8
				if(this.listeners != ''){
					for(var listener in this.listeners){
												
						/*var eventNamespace = 'tf-'+listener+getRandomInt(1, 10000);*/
<<<<<<< HEAD
						this.$innerComp.addEventListener( listener , this.listeners[listener].bind(me));
=======
						this.$innerComp.addEventListener( listener , this.listeners[listener].bind(this.scope));
>>>>>>> 523a185a004b7234544b8f6653d842f619014da8
						
						/*this.$innerComp[listener] = this._handleEventsBefore.bind(this, eventNamespace);*/
					}
				}
			},
			 /** @access private */
			_render : function(){

				if(this.render != ''){
<<<<<<< HEAD
				
=======
>>>>>>> 523a185a004b7234544b8f6653d842f619014da8
					this.render();
				}
			},
			 /** @access private */
			_attachProperties : function(){
				var me = this.scope;

				//properties
				me.$childTemplate = this.$childTemplate;
				me.$innerComp = this.$innerComp;
				
				//methods
				sharedMethods.call(me);
			},
			 /** @access private */
			/*_handleEventsBefore : function(a,b){
				
				$(this.$innerComp).trigger(a , b.target.value);
			}*/
		};
		
				
		function getRandomInt(min, max){
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random()*(max - min)+min);
		}
		
	return	textfield._init();
	
};
