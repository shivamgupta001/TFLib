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
				return this.$childTemplate[0];
				
			},
			_initialize : function(){
				var me = this.scope;

				//  variables
				this.dynamicId = me.id || "tfbtn-"+getRandomInt(1, 10000);
				
				//class
				this.btnClass = (me.btnClass ? (me.btnClass.constructor === Array ? me.btnClass : [me.btnClass]) : false);

				//styles
				this.styles = me.styles || '';
				
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

				this.$childTemplate = $(el);
			},
			_cacheDom : function(){
				//cache DOM
				this.$innerComp = this.$childTemplate[0];
				
			},
			_applyProperty : function(){
				//apply styles
				if(this.styles != ''){
					Object.keys(this.styles).forEach(function(style){
						this.$innerComp.style[style] = this.styles[style];
					}, this);
				}

				//apply inner text
				if(this.btnText) this.$innerComp.innerHTML = this.btnText;
				
				//apply class
				if(this.btnClass) this.$innerComp.classList.add.apply(this.$innerComp.classList , this.btnClass);
			},
			_render : function(){
				var me = this.scope;
				if(this.render != ''){
					me.render();
				}
			},
			_bindEvents : function(){
				var me = this.scope;
				if(this.listeners != ''){
					for(var listener in this.listeners){
						this.$innerComp.addEventListener(listener , this.listeners[listener].bind(this.scope));
					}
				}
			},
			_attachProperties : function(){
				var me = this.scope;

				//properties
				me.$childTemplate = this.$childTemplate;
							
				//methods
				//sharedMethods.call(me);
			}
		};
		
				
		function getRandomInt(min, max){
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random()*(max - min)+min);
		}
		
	return button._init();
};
