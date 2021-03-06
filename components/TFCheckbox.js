/**
 * @author Shivam Gupta 
 * @constructor TFCheckbox
 * @property {string} id - id will be assigned to checkbox[id] & label[for].
 * @property {string} fieldLayout - can be 'row' or 'column'.
 * @property {boolean} checked - can be true or false to be checked initially .
 * @property {string} name - name will be assigned to input as attribute.
 * @property {object} styles - styles will be applied to outer div tag.
 * @property {object} attributes - attributes will be applied to input tag.
 * @property {(string|string[])} labelClass -  will be applied to TFCheckbox label.
 * @property {(string|string[])} compClass -  will be applied to TFCheckbox.
 * @property {string} fieldLabel - field label value.
 * @property {function} render - this function will run when the coponent is generated but not yet appended.
 * @property {object} listeners - is an object where all listener handlers can be written as key value pair.
 */
TFLib.TFCheckbox = function(){
		
		var checkbox = {
			
			scope : this,
			/** @access private */
			_init : function(){
				
				this._initialize();
				this._generateTemplate();
				this._cacheDom();
				this._applyProperty();
				this._bindEvents();
				this._attachProperties();
				this._render();

				// return el
				return this.outerComp;
					
			},/** @access private */
			_initialize : function(){

				var me = this.scope;
				
				//  variables
				this.dynamicId = me.id || "tf-chk-"+ (me.attributes ? (me.attributes.name ? me.attributes.name : '') : '')+ (TFLib.TFCheckbox.count = ++TFLib.TFCheckbox.count || 1);
				this.fieldLayout = me.fieldLayout || 'row';
				this.styles = me.styles || '';
				this.attributes = me.attributes || '';
				this.name = me.name || '';

				//attributes
				this.checked = (me.checked === true ? true : false);

				// innerHTML configs
				this.fieldLabel = me.fieldLabel || '';
															
				//class
				this.labelClass = (me.labelClass ? (me.labelClass.constructor === Array ? me.labelClass : [me.labelClass]) : false);
				this.compClass = (me.compClass ? (me.compClass.constructor === Array ? me.compClass : [me.compClass]) : false); 
								
				//  methods 
				this.render = me.render || '';
				this.listeners = me.listeners || '';
			},/** @access private */
			_generateTemplate : function(){
				
				var el = [
					'<div control-type="tf-checkbox-outer" class="tf-flex '+((this.fieldLayout === "row") ? 'tf-flex-direction--row ' : 'tf-flex-direction--column ')+'">',
						'<input control-type="tf-checkbox" id="'+this.dynamicId+'" type="checkbox" '+(this.checked ? 'checked' :'')+'>',
						'<label control-type="tf-chk-label" for="'+this.dynamicId+'">'+this.fieldLabel+'</label>',
					'</div>'
				].join('\n');

				this.childTemplate = $(el)[0];
			},/** @access private */
			_cacheDom : function(){

				//cache Dom
				this.outerComp = this.childTemplate;
				this.innerComp = this.childTemplate.querySelector('[control-type="tf-checkbox"]');
				this.labelComp = this.childTemplate.querySelector('[control-type="tf-chk-label"]');
						
			},/** @access private */
			_applyProperty : function(){

				//apply styles
				if(this.styles != ''){
					Object.keys(this.styles).forEach(function(style){
						this.outerComp.style[style] = this.styles[style];
					}, this);
				}
				
				// apply name attribute
				if(this.name != '') this.innerComp.setAttribute( 'name' , this.name);
				
				//apply attributes
				if(this.attributes != ''){
					Object.keys(this.attributes).forEach(function(attr){
						this.innerComp.setAttribute( attr , this.attributes[attr]);
					}, this);
				}

				//apply classes
				if(this.compClass) this.outerComp.classList.addmany(this.compClass);
				if(this.labelClass) this.labelComp.classList.addmany(this.labelClass);
				
			},/** @access private */
			_bindEvents : function(){
				
				var me = this.scope;

				if(this.listeners != ''){
					for(var listener in this.listeners){
						this.innerComp.addEventListener(listener , this.listeners[listener].bind(me));
					}
				}
			},/** @access private */
			_attachProperties : function(){
				
				var me = this.scope;

				// add properties
				me.innerComp = this.innerComp;
				me.outerComp = this.outerComp;
				me.labelComp = this.labelComp;

				// add methods
				TFLib.TFCheckboxMethods.call(me);
				TFLib.TFSharedMethods.call(me);

				// share methods on el
				me.outerComp.shared = me;
			},/** @access private */
			_render : function(){

				var me = this.scope;

				if(this.render != ''){
					this.render.call(me);
				}
			}

		};
		
		
	return	checkbox._init();
	
};
