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
				this.flex = me.flex || false;
				this.containerClass = (me.containerClass ? (me.containerClass.constructor === Array ? me.containerClass.join(' ') : me.containerClass) : false);
				this.layout = me.layout;
								
				//  methods
				this.render = me.render || '';
				this.listeners = me.listeners || '';

			},
			_generateTemplate : function(){
				var el  =[
					'<div',
						'id="'+this.dynamicId+'"',
						'class="tf-flex '+((this.layout === "row") ? 'tf-flex-direction--row ' : 'tf-flex-direction--column ')+(this.containerClass ? this.containerClass : '')+'"',
						''+(this.flex? ' style="flex:'+this.flex+';"' : '')+'>',
					'</div>'
				].join('\n');
				
				this.$childTemplate = $(el);
				
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
