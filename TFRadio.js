/** This is a description of the Checkbox Module. */
var TFRadio = function($fieldset){
		
		var radio = {
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
				this.dynamicId = me.id || "tf-radio-"+getRandomInt(1, 10000);
				this.required = me.required || false;
				this.fieldLayout = me.fieldLayout || 'row';
				
				// innerHTML configs
				this.fieldLabel = me.fieldLabel || '';
				this.value = me.value || '';
				this.fieldGroup = me.fieldGroup || [];
				this.groupLayout = me.groupLayout || 'column';
				
				//atrributes
				this.btn = (me.btn === false) ? false : true;
				this.label = (me.label === false) ? false : true;
				this.labelAreaDisplay = (me.labelDisplayArea === false)  ? false : true;
				this.btnAreaDisplay = (me.btnAreaDisplay === false) ? false : true;
				
				//class
				this.labelClass = me.labelClass || false;
				this.compClass = me.compClass || false;
				this.btnClass = me.btnClass||false;
				
				//  methods
				this.render = me.render || '';
				this.listeners = me.listeners || '';

			},
			_generateTemplate : function(){
				var el = [
					'<div id="'+this.dynamicId+'"', 
						'class="tf-flex '+((this.fieldLayout === 'row')? 'tf-flex-direction--row' : 'tf-flex-direction--column')+(this.compClass ? this.compClass : '')+'">',
				        '<div class="'+((this.displayLabel === "none")? 'display--none':'')+'">',
				            '<label>'+(this.fieldLabel ? this.fieldLabel : '')+'</label>',
				            ''+(this.required ? '<span>*</span>' : '')+'',
				        '</div>',
				        '<div class="tf-flex '+((this.groupLayout === 'row') ? 'tf-flex-direction--row' : 'tf-flex-direction--column')+'" control-type="tf-radio">',
				         	// radio list  
				        '</div>',
				    '</div>'
				].join('\n');

				this.$childTemplate = $(el);
				
				this.$innerComp = this.$childTemplate.find('div[control-type="tf-radio"]')[0];
				
				this.fieldGroup.forEach(function(val , index){

					var dynamicId = 'tf-radio'+getRandomInt(1,10000);
					$('<div>').append(
	   					$('<input>', { type: 'radio', id:dynamicId , value: val.value, name : val.name}),
	   					$('<label>', { for: dynamicId, text: val.display})
	   				).appendTo(this.$innerComp);
				},this);
				
			},
			_bindEvents : function(){
				var me = this.scope;
				if(this.listeners != ''){
					for(var listener in this.listeners){
			
						var eventNamespace = 'fComp.'+getRandomInt(1, 10000);
						$(this.$innerComp).on(eventNamespace , this.listeners[listener].bind(this.scope));
						this.$innerComp[listener] = this._handleEventsBefore.bind(this, eventNamespace);
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
			},
			_handleEventsBefore : function(a,b){
				
				$(this.$innerComp).trigger(a , b.target.value);
			}

		};
		
				
		function getRandomInt(min, max){
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random()*(max - min)+min);
		}
		
	return	radio._init();
	
};
