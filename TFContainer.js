var TFContainer = function(){
		var container = {
			scope : this,
			_init : function(){
				
				this._initialize();
				this._generateTemplate();
		//		this._bindEvents();
				this._attachProperties();
				this._render();	
				return this.$childTemplate[0];
			},
			_initialize : function(){
				var me = this.scope;

				//  variables
				this.dynamicId = me.id || "tfcontainer-"+getRandomInt(1, 10000);
				this.containerClass = (me.containerClass ? (me.containerClass.constructor === Array ? me.containerClass.join(' ') : me.containerClass) : false);
				this.layout = me.layout;
				
				//styles
				this.flex = me.flex || false;
				this.height = me.height || false;
				this.innerText = me.innerText || false;
				this.justifyContent = me.justifyContent || false;
				this.alignItems = me.alignItems || false;
				this.innerHTML = me.innerHTML || false;
				this.color = me.color || false;				
				
				//  methods
				this.render = me.render || '';
				this.listeners = me.listeners || '';

			},
			_generateTemplate : function(){
				var el  =[
					'<div',
						'id="'+this.dynamicId+'"',
						'class="tf-flex '+((this.layout === "row") ? 'tf-flex-direction--row ' : 'tf-flex-direction--column ')+(this.containerClass ? this.containerClass : '')+'"',
						'>',
					'</div>'
				].join('\n');
				
				this.$childTemplate = $(el);
				this.$innerComp = this.$childTemplate[0];

				// applying styles
				if(this.height) this.$innerComp.style.height = this.height;
				if(this.flex) this.$innerComp.style.flex = this.flex;
				if(this.justifyContent) this.$innerComp.style.justifyContent = this.justifyContent;
				if(this.alignItems) this.$innerComp.style.alignItems = this.alignItems;
				if(this.color) this.$innerComp.style.color = this.color;

				// inner text or html
				if(this.innerText) this.$innerComp.innerText = this.innerText;
				if(this.innerHTML) this.$innerComp.innerHTML = this.innerHTML;

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
		
	return container._init();
	
};
