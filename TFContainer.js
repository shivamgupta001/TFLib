var TFContainer = function(){
		
		var container = {
			
			scope : this,
			_init : function(){
				
				this._initialize();
				this._generateTemplate();
				this._cacheDom();
				this._applyStyles();
				this._bindEvents();
				this._attachProperties();
				this._render();	
				
				// return el
				return this.innerComp;
			},
			_initialize : function(){
				
				var me = this.scope;

				//  configs
				this.dynamicId = me.id || "tf-container-"+getRandomInt(1, 10000);
				this.layout = me.layout;
				this.styles = me.styles || '';
								
				//style
				this.flex = me.flex || '';
				
				// classes
				this.compClass = (me.compClass ? (me.compClass.constructor === Array ? me.compClass : [me.compClass]) : false);

				// inner HTML or Text
				this.innerHTML = me.innerHTML || false;
				this.innerText = me.innerText || false;				
				
				//  methods
				this.render = me.render || '';
				this.listeners = me.listeners || '';

			},
			_generateTemplate : function(){
				
				var el  =[
					'<div control-type="tf-container"',
						'id="'+this.dynamicId+'"',
						'class="tf-flex '+((this.layout === "row") ? 'tf-flex-direction--row ' : 'tf-flex-direction--column ')+'"',
						'>',
					'</div>'
				].join('\n');
				
				this.childTemplate = $(el)[0];
			},
			_cacheDom : function(){
				
				// cache Dom
				this.innerComp = this.childTemplate;
				
			},
			_applyStyles : function(){

				//apply styles
				if(this.styles != ''){
					Object.keys(this.styles).forEach(function(style){
						this.innerComp.style[style] = this.styles[style];
					}, this);
				}

				// apply flex
				if(this.flex) this.innerComp.style.flex = this.flex;

				//apply class
				if(this.compClass) this.innerComp.classList.add.apply(this.innerComp.classList , this.compClass);

				// inner text or html
				if(this.innerText) this.innerComp.innerText = this.innerText;
				if(this.innerHTML) this.innerComp.innerHTML = this.innerHTML;
			},
			_bindEvents : function(){
				
				var me = this.scope;
				
				if(this.listeners != ''){
					for(var listener in this.listeners){
						this.innerComp.addEventListener(listener , this.listeners[listener].bind(this.scope));
					}
				}
			},
			_attachProperties : function(){
				
				var me = this.scope;

				// add properties
				me.innerComp = this.innerComp;

				// add methods
				TFContainerMethods.call(me);

				// share methods to el
				me.innerComp.shared = me;
			},
			_render : function(){
				
				var me = this.scope;
				
				if(this.render != ''){
					me.render.call(me);
				}
			}
		};
		
				
		function getRandomInt(min, max){
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random()*(max - min)+min);
		}
		
	return container._init();
	
};
