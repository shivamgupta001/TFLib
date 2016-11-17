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
				this.$childTemplate[0].shared = this.scope;	
				return this.$childTemplate[0];
			},
			 /** @access private */
			_initialize : function(){
				var me = this.scope;

				 
				this.dynamicId = me.id || "textfield-"+getRandomInt(1, 10000);
				
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
							''+(this.required ? '<span>*</span>' : '')+'',
						'</div>',
						'<div class="field-with-btn '+(this.controlClass ? this.controlClass : '')+'">',
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
							''+((this.iconClass && this.iconClass.length > 0) ? '<button class="'+this.iconClass.shift()+'"></button>' : '' )+'',
							''+((this.iconClass && this.iconClass.length > 0) ? '<button class="'+this.iconClass.shift()+'"></button>' : '')+'',
							''+((this.iconClass && this.iconClass.length > 0) ? '<button class="'+this.iconClass.shift()+'"></button>' : '')+'',
						'</div>',
					'</div>'
				].join('\n');
				
				this.$childTemplate = $(el);
				/*this.$childTemplate = $(`<div class="formComp-field" `+ (this.flex? 'style="flex:'+this.flex+'"' : '')+`> 
											`+(this.labelAreaDisplay ? "<span class='formComp-field-label "+(this.labelClass ? this.labelClass:'' )+" '>"+(this.label ? '<label for="'+this.dynamicId+'">'+this.fieldLabel+'</label>' : '')+"</span>" : '')+`
											<span 
												class="formComp-field-control `+ (this.required === 'required' ? ' formComp-field-req formComp-field-err':' formComp-field-blank')+``+(this.compClass ? this.compClass : '' )+`">
													<input 
														type="text" 
														id="`+this.dynamicId+`" 
														value="`+this.value+`"
														placeholder="`+this.placeHolder+`" 
														pattern = "`+this.pattern+`"
														maxlength = "`+this.maxlength+`" 
														`+this.required+` 
														`+this.readOnly+`> 
											</span>
											`+(this.btnAreaDisplay ? "<span class='formComp-field-btn "+(this.btnClass ? this.btnClass:'' )+" '>"+(this.btn ? '<button>Click</button>' : '')+"</span>" : '')+`
											</div>`);
				this.$childTemplate = $('<div class="field"> \
											<div> \
												<label>Name</label> \
												<span>*</span> \
											</div> \
											<div> \
												<input type="text" name="name"/> \
												<button>Search</button> \
											</div> \
										</div>');*/
				this.$innerComp = this.$childTemplate.find("input")[0];
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
				sharedMethods.call(me);
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
		
	return	textfield._init();
	
};
