var TFButton = function(){
		var button = {
			scope : this,
			_init : function(){
				
				this._initialize();
				this._generateTemplate();
				this._bindEvents();
				this._attachProperties();
				this._render();	
				return this.$childTemplate[0];
			},
			_initialize : function(){
				var me = this.scope;

				//  variables
				this.dynamicId = me.id || "tfbtn-"+getRandomInt(1, 10000);
<<<<<<< HEAD
				
				//class
				this.btnClass = (me.btnClass ? (me.btnClass.constructor === Array ? me.btnClass : [me.btnClass]) : false);
				
				//inner HTML or text
=======
				this.containerClass = (me.containerClass ? (me.containerClass.constructor === Array ? me.containerClass.join(' ') : me.containerClass) : false);
>>>>>>> 523a185a004b7234544b8f6653d842f619014da8
				this.btnText = me.btnText || '';
								
				//  methods
				this.render = me.render || '';
				this.listeners = me.listeners || '';

			},
			_generateTemplate : function(){
<<<<<<< HEAD
				
				var el  =[
					'<button control-type="tf-btn"',
						'id="'+this.dynamicId+'"',
						'class="tf-button"',
					'></button>'
				].join('\n');
				
				//cache DOM
				this.$childTemplate = $(el);
				this.$innerComp = this.$childTemplate[0];

				//apply inner text
				if(this.btnText) this.$innerComp.innerHTML = this.btnText;
				if(this.btnClass) this.$innerComp.classList.add.apply(this.$innerComp.classList , this.btnClass);

=======
				var el  =[
					'<button control-type="tf-btn"',
						'id="'+this.dynamicId+'"',
						'class="tf-button '+(this.containerClass ? this.containerClass : '')+'"',
					'>',
					''+(this.btnText)+'',
					'</button>'
				].join('\n');
				this.$childTemplate = $(el);
				this.$innerComp = this.$childTemplate[0];
>>>>>>> 523a185a004b7234544b8f6653d842f619014da8
				
			},
			_render : function(){
				var me = this.scope;
				if(this.render != ''){
<<<<<<< HEAD
					me.render();
=======
					me.render( 5 , 6);
>>>>>>> 523a185a004b7234544b8f6653d842f619014da8
				}
			},
			_bindEvents : function(){
				var me = this.scope;
				if(this.listeners != ''){
					for(var listener in this.listeners){

<<<<<<< HEAD
						/*var eventNamespace = 'fCompEvent-'+getRandomInt(1, 10000);	*/					
						this.$innerComp.addEventListener(listener , this.listeners[listener].bind(this.scope));
						/*this.$innerComp[listener] = this._handleEventsBefore.bind(this, eventNamespace);*/
=======
						var eventNamespace = 'fCompEvent-'+getRandomInt(1, 10000);						
						$(this.$innerComp).on(eventNamespace , this.listeners[listener].bind(this.scope));
						this.$innerComp[listener] = this._handleEventsBefore.bind(this, eventNamespace);
>>>>>>> 523a185a004b7234544b8f6653d842f619014da8
					}
				}
			},
			_attachProperties : function(){
				var me = this.scope;

				//properties
				me.$childTemplate = this.$childTemplate;
							
				//methods
				//sharedMethods.call(me);
<<<<<<< HEAD
			}/*,
			_handleEventsBefore : function(a,b){
				
				$(this.$innerComp).trigger(a , b.target.value);
			}*/
=======
			},
			_handleEventsBefore : function(a,b){
				
				$(this.$innerComp).trigger(a , b.target.value);
			}
>>>>>>> 523a185a004b7234544b8f6653d842f619014da8
		};
		
				
		function getRandomInt(min, max){
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random()*(max - min)+min);
		}
		
	return button._init();
};
