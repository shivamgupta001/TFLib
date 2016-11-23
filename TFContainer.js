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
				return this.$childTemplate[0];
			},
			_initialize : function(){
				
				var me = this.scope;

				//  variables
				this.dynamicId = me.id || "tfcontainer-"+getRandomInt(1, 10000);
				this.containerClass = (me.containerClass ? (me.containerClass.constructor === Array ? me.containerClass : [me.containerClass]) : false);
				this.layout = me.layout;
				
				//styles
				this.styles = me.styles || '';
				this.attributes = me.attributes || '';
				this.flex = me.flex || '';
				
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
				
				this.$childTemplate = $(el);
			},
			_cacheDom : function(){
				// cache Dom
				this.innerComp = this.$childTemplate[0];
				
			},
			_applyStyles : function(){

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

				// apply flex
				if(this.flex) this.innerComp.style.flex = this.flex;

				//apply class
				if(this.containerClass) this.innerComp.classList.add.apply(this.innerComp.classList , this.containerClass);

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
			_render : function(){
				var me = this.scope;
				if(this.render != ''){
					me.render( 5 , 6);
				}
			},
			_attachProperties : function(){
				var me = this.scope;

				//properties
				me.innerComp = this.innerComp;

				//methods
				TFContainerMethods.call(me);

				me.innerComp.shared = me;
			}
		};
		
				
		function getRandomInt(min, max){
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random()*(max - min)+min);
		}
		
	return container._init();
	
};
