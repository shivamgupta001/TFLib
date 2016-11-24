/** This is a description of the RadioField Module. */
var TFRadioField = function($fieldset){
		
		var radiofield = {
			
			scope : this,
			_init : function(){
				
				this._initialize();
				this._generateTemplate();
				this._cacheDom();
				this._applyProperty();
				this._bindEvents();
				this._attachProperties();
				this._render();

				// retrun el
				return this.outerComp;	
			},
			_initialize : function(){
				
				var me = this.scope;

				//  configs
				this.dynamicId = me.id || "tf-radiof-"+getRandomInt(1, 10000);
				this.markRequired = me.markRequired || false;
				this.fieldLayout = me.fieldLayout || 'row';
				this.styles = me.styles || '';
				this.fieldGroup = me.fieldGroup || [];
				this.groupLayout = me.groupLayout || 'column';

				// innerHTML configs
				this.fieldLabel = me.fieldLabel || '';
												
				//class
				this.labelClass = (me.labelClass ? (me.labelClass.constructor === Array ? me.labelClass : [me.labelClass]) : false);
				this.compClass = (me.compClass ? (me.compClass.constructor === Array ? me.compClass : [me.compClass]) : false);
				this.controlClass = (me.controlClass ? (me.controlClass.constructor === Array ? me.controlClass : [me.controlClass]) : false);
								
				//  methods
				this.render = me.render || '';
				this.listeners = me.listeners || '';

			},
			_generateTemplate : function(){
				
				var el = [
					'<div id="'+this.dynamicId+'"', 
						'class="tf-flex '+((this.fieldLayout === 'row')? 'tf-flex-direction--row ' : 'tf-flex-direction--column ')+'">',
				        '<div control-type="tf-radiof-label" class="'+((this.displayLabel === "none")? 'tf-display--none':'')+'">',
				            '<label>'+(this.fieldLabel ? this.fieldLabel : '')+'</label>',
				            '<span class="tf-required--red '+(this.markRequired ? 'tf-display--none':'')+'">*</span>',
				        '</div>',
				        '<div control-type="tf-radiofield" class="tf-flex '+((this.groupLayout === 'row') ? 'tf-flex-direction--row ' : 'tf-flex-direction--column ')+'">',
				         	// radio list  
				        '</div>',
				    '</div>'
				].join('\n');

				this.childTemplate = $(el)[0];
			},
			_cacheDom : function(){

				//cache Dom
				this.outerComp = this.childTemplate;
				this.controlComp = this.childTemplate.querySelector('[control-type="tf-radiofield"]');
				this.labelComp = this.childTemplate.querySelector('[control-type="tf-radiof-label"]');
			},
			_applyProperty : function(){
				
				//apply styles
				if(this.styles != ''){
					Object.keys(this.styles).forEach(function(style){
						this.outerComp.style[style] = this.styles[style];
					}, this);
				}

				//apply classes
				if(this.compClass) this.outerComp.classList.add.apply(this.outerComp.classList , this.compClass);
				if(this.labelClass) this.labelComp.classList.add.apply(this.labelComp.classList, this.labelClass);
				if(this.controlClass) this.controlComp.classList.add.apply(this.controlComp.classList, this.controlClass);

				// add check boxes to template
				this.fieldGroup.forEach(function(item){
					this.controlComp.appendChild(TFRadio.call(item));
				},this);
			},
			_bindEvents : function(){
				
				var me = this.scope;
				
				if(this.listeners != ''){
					for(var listener in this.listeners){
						this.controlComp.addEventListener(listener , this.listeners[listener].bind(me));
					}
				}
			},
			_attachProperties : function(){
				
				var me = this.scope;

				// add properties
				me.controlComp = this.controlComp;
				me.outerComp = this.outerComp;
				me.labelComp = this.labelComp;
				
				// add methods
				TFCheckboxFieldMethods.call(me);

				// share methods to el
				me.outerComp.shared = me;
			},
			_render : function(){
				
				var me = this.scope;
				
				if(this.render != ''){
					this.render.call(me);
				}
			}
		};
				
		function getRandomInt(min, max){
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random()*(max - min)+min);
		}
		
	return	radiofield._init();
	
};
