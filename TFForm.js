var TFForm = function(){
	
		var form = {

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

				//  variables
				this.dynamicId = me.id || "tf-form-"+getRandomInt(1, 10000);
				this.layout = me.layout;

				// classes
				this.compClass = (me.compClass ? (me.compClass.constructor === Array ? me.compClass : [me.compClass]) : false);
								
				// styles
				this.flex = me.flex || false;

				//attributes
				this.action = me.action || false;
				this.method = me.method || false;
				this.name = me.name || false;
				this.target = me.target || false;
				this.enctype  = me.enctype || false;

				//  methods
				this.render = me.render || '';
				this.listeners = me.listeners || '';

			},
			_generateTemplate : function(){
				
				var el  =[
					'<form control-type="tf-form" ', 
						'id="'+this.dynamicId+'"',
						'class="tf-flex '+((this.layout === "row") ? 'tf-flex-direction--row ' : 'tf-flex-direction--column ')+'"',
						''+(this.action? ' action="'+this.action+'"' : '')+'',
						''+(this.method? ' action="'+this.method+'"' : '')+'',
						''+(this.name? ' action="'+this.name+'"' : '')+'',
						''+(this.target? ' action="'+this.target+'"' : '')+'',
						''+(this.enctype? ' action="'+this.enctype+'"' : '')+'',
						'>',
					'</form>'
				].join('\n');
				
				this.childTemplate = $(el)[0];
				
			},
			_cacheDom : function(){

				// cache Dom
				this.innerComp = this.childTemplate;
			},
			_applyProperty : function(){
				
				// apply class
				if(this.compClass) this.innerComp.classList.add.apply(this.innerComp.classList , this.compClass);	
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
				
				// add properties
				me.$innerComp = this.$innerComp;
							
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
		
	return form._init();
	
};
