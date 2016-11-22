/** This is a description of the Textfield Module. */
var TFTextArea = function($fieldset){
		
		var textarea = {
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
				return this.$childTemplate[0];
			},
			 /** @access private */
			_initialize : function(){
				var me = this.scope;
				 
				this.dynamicId = me.id || "tf-textarea-"+getRandomInt(1, 10000);
				
				//config
				this.styles = this.styles || '';
				this.displayLabel = me.displayLabel || false;

				//style
				this.fieldLabel = me.fieldLabel || '';
				this.fieldType = me.fieldType || 'row';

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
						'<div class="tf-flex" '+(this.displayLabel ? 'tf-display--none': '')+'>',
							'<label>'+(this.fieldLabel ? this.fieldLabel : '')+'</label>',
							''+(this.required ? '<span>*</span>' : '')+'',
						'</div>',
						'<div control-type="tf-textarea" class="field-with-btn ">',
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
				
				
			},
			_cacheDom : function(){

				//cache Dom
				this.$innerComp = this.$childTemplate.find("textarea")[0];
				this.$outerComp = this.$childTemplate[0];
				this.$labelComp = this.$childTemplate.find('label')[0];
				this.$controlComp = this.$childTemplate.find('control-type=["tf-textarea"]');
			 
			},
			_applyProperty : function(){

				// apply class
				if(this.controlClass) this.$controlComp.classList.add.apply(this.$controlComp.classList , this.controlClass);
				if(this.labelClass) this.$labelComp.classList.add.apply(this.$labelComp.classList , this.labelClass);
				if(this.compClass) this.$outerComp.classList.add.apply(this.$outerComp.classList, this.compClass);

				//apply style
				if(this.styles != ''){
					Object.keys(this.styles).forEach(function(style){
						this.$outerComp.style[style] = this.styles[style];
					}, this);
				}
			},
			_bindEvents : function(){
				
				var me = this.scope;
				if(this.listeners != ''){
					for(var listener in this.listeners){
						this.$innerComp.addEventListener(listener , this.listeners[listener].bind(me));
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
			}
		};
		
				
		function getRandomInt(min, max){
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random()*(max - min)+min);
		}
		
	return	textarea._init();
	
};
