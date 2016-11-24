/** This is a description of the Checkbox Module. */
var TFCheckbox = function(){
		
		var checkbox = {
			scope : this,
			_init : function(){
				
				this._initialize();
				this._generateTemplate();
				this._cacheDom();
				this._applyProperty();
				this._bindEvents();
				this._attachProperties();
				this._render();

				// return el
				return this.outerComp;
					
			},
			_initialize : function(){

				var me = this.scope;

				//  variables
				this.dynamicId = me.id || "tf-checkbox-"+getRandomInt(1, 10000);
				this.layout = me.layout || 'row';
				this.styles = me.styles || '';
				this.attributes = me.attributes || '';
								
				// innerHTML configs
				this.fieldLabel = me.fieldLabel || '';
															
				//class
				this.labelClass = (me.labelClass ? (me.labelClass.constructor === Array ? me.labelClass : [me.labelClass]) : false);
				this.compClass = (me.compClass ? (me.compClass.constructor === Array ? me.compClass : [me.compClass]) : false); 
								
				//  methods 
				this.render = me.render || '';
				this.listeners = me.listeners || '';
			},
			_generateTemplate : function(){
				
				var el = [
					'<div class="tf-flex '+((this.layout === "row") ? 'tf-flex-direction--row ' : 'tf-flex-direction--column ')+'">',
						'<input control-type="tf-checkbox" id="'+this.dynamicId+'" type="checkbox">',
						'<label control-type="tf-chk-label" for="'+this.dynamicId+'">'+this.fieldLabel+'</label>',
					'</div>'
				].join('\n');

				this.childTemplate = $(el)[0];
			},
			_cacheDom : function(){

				//cache Dom
				this.outerComp = this.childTemplate;
				this.innerComp = this.childTemplate.querySelector('[control-type="tf-checkbox"]');
				this.labelComp = this.childTemplate.querySelector('[control-type="tf-chk-label"]');
						
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
					Object.keys(this.attributes).forEach(function(attr){
						this.innerComp.setAttribute( attr , this.attributes[attr]);
					}, this);
				}

				//apply classes
				if(this.compClass) this.outerComp.classList.add.apply(this.outerComp.classList , this.compClass);
				if(this.labelClass) this.labelComp.classList.add.apply(this.labelComp.classList, this.labelClass);
				
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
				me.outerComp = this.outerComp;
				me.labelComp = this.labelComp;

				// add methods
				TFCheckboxMethods.call(me);

				// share methods on el
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
		
	return	checkbox._init();
	
};
