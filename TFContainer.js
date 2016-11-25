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
				return this.outerComp;
			},
			_initialize : function(){
				
				var me = this.scope;

				//  configs
				this.dynamicId = me.id || "tf-container-"+getRandomInt(1, 10000);
				this.layout = me.layout || 'row';
				this.styles = me.styles || '';
				this.tagName = me.tagName || 'div';
								
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
				
				var el = document.createElement(this.tagName);
				el.classList.add('tf-flex');
				el.setAttribute('control-type','tf-container');
				el.setAttribute('id', this.dynamicId);
				
				this.childTemplate = el;
			},
			_cacheDom : function(){
				
				// cache Dom
				this.outerComp = this.childTemplate;
				
			},
			_applyStyles : function(){

				//apply styles
				if(this.styles != ''){
					Object.keys(this.styles).forEach(function(style){
						this.outerComp.style[style] = this.styles[style];
					}, this);
				}

				// apply flex
				if(this.flex) this.outerComp.style.flex = this.flex;

				//apply class
				if(this.compClass) this.outerComp.classList.add.apply(this.outerComp.classList , this.compClass);
				
				//apply layout
				if(this.layout === "row")
					this.outerComp.classList.add('tf-flex-direction--row');
				else this.outerComp.classList.add('tf-flex-direction--column');

				// inner text or html
				if(this.innerText) this.outerComp.innerText = this.innerText;
				if(this.innerHTML) this.outerComp.innerHTML = this.innerHTML;
			},
			_bindEvents : function(){
				
				var me = this.scope;
				
				if(this.listeners != ''){
					for(var listener in this.listeners){
						this.outerComp.addEventListener(listener , this.listeners[listener].bind(this.scope));
					}
				}
			},
			_attachProperties : function(){
				
				var me = this.scope;

				// add properties
				me.outerComp = this.outerComp;

				// add methods
				TFContainerMethods.call(me);

				// share methods to el
				me.outerComp.shared = me;
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
