/** This is a description of the Button Module. */
var TFButton = function(){
		
		var button = {
			
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
				return this.innerComp;
				
			},
			_initialize : function(){
				
				var me = this.scope;
				
				//  config
				this.dynamicId = me.id || "tf-btn-"+getRandomInt(1, 10000);
				this.styles = me.styles || '';
				this.attributes = me.attributes || '';
				
				//class
				this.btnClass = (me.btnClass ? (me.btnClass.constructor === Array ? me.btnClass : [me.btnClass]) : false);

				
				//inner HTML or text
				this.btnText = me.btnText || '';
								
				//  methods
				this.render = me.render || '';
				this.listeners = me.listeners || '';

			},
			_generateTemplate : function(){
				
				var el  =[
					'<button control-type="tf-btn"',
						'id="'+this.dynamicId+'"',
						'class="tf-button"',
					'></button>'
				].join('\n');

				this.childTemplate = $(el)[0];
			},
			_cacheDom : function(){

				//cache DOM
				this.innerComp = this.childTemplate;
				
			},
			_applyProperty : function(){
				
				//apply styles
				if(this.styles != ''){
					Object.keys(this.styles).forEach(function(style){
						this.innerComp.style[style] = this.styles[style];
					}, this);
				}

				//apply attributes
				if(this.attributes != ''){
					Object.keys(this.attributes).forEach(function(attribute){
						this.innerComp.setAttribute(attribute , this.attributes[attribute]);
					}, this);	
				}

				//apply inner text
				if(this.btnText) this.innerComp.innerHTML = this.btnText;
				
				//apply class
				if(this.btnClass) this.innerComp.classList.add.apply(this.innerComp.classList , this.btnClass);
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
										
				// add methods
				TFButtonMethods.call(me);

				// shared methods over el
				me.innerComp.shared = me;
			},
			_render : function(){
				
				var me = this.scope;
				
				if(this.render != ''){
					me.render.call(me);	// last method , everything done
				}
			}
		};
		
				
		function getRandomInt(min, max){
			
			min = Math.ceil(min);
			max = Math.floor(max);
			
			return Math.floor(Math.random()*(max - min)+min);
		}
		
	return button._init();
};
