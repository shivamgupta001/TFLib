/** This is a description of the Textfield Module. */
var TFTextArea = function($fieldset){
		
		var textarea = {
			scope : this,
			 /** @access private */
			_init : function(){
				
				this._initialize();
				this._generateTemplate();
				this._bindEvents();
				this._attachProperties();
				this._render();	
				return this.$childTemplate[0];
			},
			 /** @access private */
			_initialize : function(){
				var me = this.scope;

				 
				this.dynamicId = me.id || "tf-textarea-"+getRandomInt(1, 10000);
				
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
						'<div class="tf-flex" '+(this.displayLabel ? 'tf-display--none': '')+'>',
							'<label class="'+(this.labelClass ? this.labelClass : '')+'">'+(this.fieldLabel ? this.fieldLabel : '')+'</label>',
							''+(this.required ? '<span>*</span>' : '')+'',
						'</div>',
						'<div class="field-with-btn '+(this.controlClass ? this.controlClass : '')+'">',
							'<textarea',
								
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
				
				this.$childTemplate = $(el);
				
				this.$innerComp = this.$childTemplate.find("textarea")[0];
			},
			 /** @access private */
			_bindEvents : function(){
				var me = this.scope;
				if(this.listeners != ''){
					for(var listener in this.listeners){
												
						$(this.$innerComp).on(eventNamespace , this.listeners[listener].bind(this.scope));
						
						var eventNamespace = 'fCompEvent.'+getRandomInt(1, 10000);
						this.$innerComp[listener] = this._handleEventsBefore.bind(this, eventNamespace);
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
				me.$childTemplate = this.$childTemplate;
				me.$innerComp = this.$innerComp;
				
				//methods
				//sharedMethods.call(me);
			},
			 /** @access private */
			_handleEventsBefore : function(a,b){
				
				$(this.$innerComp).trigger(a , b.target.value);
			}
		};
		
				
		function getRandomInt(min, max){
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random()*(max - min)+min);
		}
		
	return	textarea._init();
	
};
