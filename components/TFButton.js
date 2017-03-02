	/**
 * @author Shivam Gupta 
 * @class TFButton
 * @property {string} id - id will be assigned to button tag.
 * @property {object} styles - styles will be applied to button tag.
 * @property {object} attributes - attributes will be applied to button tag.
 * @property {(string|string[])} compClass - compClass will be applied to TFButton component.
 * @property {(string|string[])} btnClass - btnClass will be applied to button tag.
 * @property {string} btnText - btnText value is text for button.
 * @property {function} render - this function will run when the coponent is generated but not yet appended.
 * @property {object} listeners - is an object where all listener handlers can be written as key value pair.
 */

 
TFLib.TFButton = function(){
		
		var button = {
			
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
				
				
				/** @return {Point} 
				 *         The location of the event
				 */
				return this.outerComp;
				
			},/** @access private */
			_initialize : function(){
				
				var me = this.scope;
				

				//  config
				this.dynamicId = me.id || "tf-btn-"+(TFLib.TFButton.count = ++TFLib.TFButton.count || 1);
				this.styles = me.styles || '';
				this.attributes = me.attributes || '';
				
				//class
				this.compClass = (me.compClass ? (me.compClass.constructor === Array ? me.compClass : [me.compClass]) : false);
				this.btnClass = (me.btnClass ? (me.btnClass.constructor === Array ? me.btnClass : [me.btnClass]) : false);

				
				//inner HTML or text
				this.btnText = me.btnText || '';
								
				//  methods
				this.render = me.render || '';
				this.listeners = me.listeners || '';

			},/** @access private */
			_generateTemplate : function(){
				
				var el  =[
					'<div control-type="tf-btn-outer" class="tf-field-container">',
						'<button type="button" control-type="tf-btn"',
							'id="'+this.dynamicId+'"',
							'class="tf-button"',
						'></button>',
					'</div>'
				].join('\n');

				this.childTemplate = $(el)[0];
			},/** @access private */
			_cacheDom : function(){

				//cache DOM
				this.outerComp = this.childTemplate;
				this.innerComp = this.childTemplate.querySelector('[control-type="tf-btn"]');
				
			},/** @access private */
			_applyProperty : function(){
				
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

				//apply inner text
				if(this.btnText) this.innerComp.innerHTML = this.btnText;
				
				//apply class
				if(this.btnClass) this.innerComp.classList.addmany(this.btnClass);
				if(this.compClass) this.outerComp.classList.addmany(this.compClass);
			},/** @access private */
			_bindEvents : function(){
				
				var me = this.scope;
				
				if(this.listeners != ''){
					for(var listener in this.listeners){
						this.innerComp.addEventListener(listener , this.listeners[listener].bind(me));
					}
				}

				// focus and blur detection
	            this.innerComp.addEventListener('focus',this.handleFocus);
	            this.innerComp.addEventListener('blur',this.handleBlur);
			},/** @access private */
			_attachProperties : function(){
				
				var me = this.scope;

				// add properties
				me.innerComp = this.innerComp;
				me.outerComp = this.outerComp;
										
				// add methods
				TFLib.TFButtonMethods.call(me);
				TFLib.TFSharedMethods.call(me);

				// shared methods over el
				me.outerComp.shared = me;
				
			},/** @access private */
			_render : function(){
				
				var me = this.scope;
				
				if(this.render != ''){
					me.render.call(me);	// last method , everything done
				}
			},
			handleFocus : function(e){
	            this.classList.add('tf-control-selected');
	        },
	        handleBlur : function(e){
	            this.classList.remove('tf-control-selected');
	        }
		};
		
	return button._init();
};
