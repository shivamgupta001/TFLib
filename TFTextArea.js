/** This is a description of the Textfield Module. */
var TFTextArea = function(){
		
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

				//return el
				return this.$childTemplate[0];
			},
			 /** @access private */
			_initialize : function(){
				var me = this.scope;
				 
				this.dynamicId = me.id || "tf-textarea-"+getRandomInt(1, 10000);
				
				//config
				this.styles = me.styles || '';
				this.attributes = me.attributes || '';
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
				this.markRequired = me.markRequired || '';

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
						'<div control-type="tf-label" class="tf-flex" '+(this.displayLabel ? 'tf-display--none': '')+'>',
							'<label>'+(this.fieldLabel ? this.fieldLabel : '')+'</label>',
							'<span class="tf-required--red '+(this.markRequired ? '' : 'tf-display--none')+'">*</span>',
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
				this.innerComp = this.$childTemplate.find("textarea")[0];
				this.outerComp = this.$childTemplate[0];
				this.labelComp = this.$childTemplate.find('div[control-type="tf-label"]')[0];
				this.controlComp = this.$childTemplate.find('div[control-type="tf-textarea"]')[0];
			 
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
				me.innerComp = this.innerComp;
				me.labelComp = this.labelComp;
				me.outerComp = this.outerComp;
				me.controlComp = this.controlComp;
				
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
		
	return	textarea._init();
	
};
