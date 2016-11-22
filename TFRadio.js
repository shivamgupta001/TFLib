/** This is a description of the Checkbox Module. */
var TFRadio = function($fieldset){
		
		var radio = {
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
				this.dynamicId = me.id || "tf-radio-"+getRandomInt(1, 10000);
				this.markRequired = me.markRequired || false;
				this.fieldLayout = me.fieldLayout || 'row';
				
				// innerHTML configs
				this.fieldLabel = me.fieldLabel || '';
				this.value = me.value || '';
				this.fieldGroup = me.fieldGroup || [];
				this.groupLayout = me.groupLayout || 'column';
				
				//class
				this.labelClass = (me.labelClass : (me.labelClass.constructor === Array ? me.labelClass : [me.labelClass]): false);
				this.compClass = (me.compClass ? (me.compClass.constructor === Array ? me.compClass : [me.compClass]) : false);
								
				//  methods
				this.render = me.render || '';
				this.listeners = me.listeners || '';

			},
			_generateTemplate : function(){
				var el = [
					'<div id="'+this.dynamicId+'"', 
						'class="tf-flex '+((this.fieldLayout === 'row')? 'tf-flex-direction--row ' : 'tf-flex-direction--column ')+(this.compClass ? this.compClass : '')+'">',
				        '<div class="'+((this.displayLabel === "none")? 'tf-display--none':'')+'">',
				            '<label>'+(this.fieldLabel ? this.fieldLabel : '')+'</label>',
				            '<span class="tf-required--red '+(this.markRequired ? 'tf-display--none':'')+'">*</span>',
				        '</div>',
				        '<div class="tf-flex '+((this.groupLayout === 'row') ? 'tf-flex-direction--row ' : 'tf-flex-direction--column ')+'" control-type="tf-checkbox">',
				         	// radio list  
				        '</div>',
				    '</div>'
				].join('\n');

				this.$childTemplate = $(el);
			},
			_cacheDom : function(){

				//cache Dom
				this.$outerComp = this.$childTemplate[0];
				this.$innerComp = this.$childTemplate.find('div[control-type="tf-checkbox"]')[0];
				this.$labelComp = this.$childTemplate.find('label');	
			},
			_applyProperty : function(){
				
				//apply classes
				if(this.compClass) this.$outerComp.classList.add.apply(this.$outerComp.classList , this.compClass);
				if(this.labelClass) this.$labelComp.classList.add.apply(this.$labelComp.classList, this.labelClass);

				// add check boxes to template
				this.fieldGroup.forEach(function(val , index){

					var dynamicId = 'radio-'+getRandomInt(1,10000);
					$('<div>').append(
	   					$('<input />', { type: 'radio', id:dynamicId , value: val.value, name : val.name}),
	   					$('<label>', { for: dynamicId, text: val.display})
	   				).appendTo(this.$innerComp);
				},this);
			},
			_bindEvents : function(){
				var me = this.scope;
				if(this.listeners != ''){
					for(var listener in this.listeners){
						this.$innerComp.addEventListener(listener , this.listeners[listener].bind(me));
					}
				}
			},
			_render : function(){
				
				if(this.render != ''){
					this.render();
				}
			},
			_attachProperties : function(){
				var me = this.scope;

				//properties
				me.$childTemplate = this.$childTemplate;
				me.$innerComp = this.$innerComp;
				
				//methods
				//sharedMethods.call(me);
			}

		};
		
				
		function getRandomInt(min, max){
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random()*(max - min)+min);
		}
		
	return	radio._init();
	
};
