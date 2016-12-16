/**
 * @author Shivam Gupta 
 * @constructor TFContainer
 * @property {string} id - id will be assigned to container.
 * @property {string} layout - can be 'row' or 'column' and is display flex , if not provided container will be display block.
 * @property {object} styles - styles will be applied to button tag.
 * @property {string} tagName - can pass tag name of which container can be formed.
 * @property {Object} attributes - can pass attributes key value
 * @property {number} flex - will define what %age of width to take in comparison to others.
 * @property {(string|string[])} compClass -  will be applied to outermost div of component.
 * @property {string} innerHTML - can pass html directly.
 * @property {string} innerText - can pass text.
 * @property {function} render - this function will run when the coponent is generated but not yet appended.
 * @property {object} listeners - is an object where all listener handlers can be written as key value pair.
 */
TFLib.TFContainer = function(){
		
		var container = {
			
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

				//  configs
				this.dynamicId = me.id || "tf-container-"+getRandomInt(1, 10000);
				this.layout = me.layout || false;
				this.styles = me.styles || '';
				this.tagName = me.tagName || 'div';
				this.attributes = me.attributes || '';
								
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

			},/** @access private */
			_generateTemplate : function(){
				
				var el = document.createElement(this.tagName);
				el.classList.add('tf-field-container');
				if(this.layout)
					el.classList.add('tf-flex');
				el.setAttribute('control-type','tf-container');
				el.setAttribute('id', this.dynamicId);
				
				this.childTemplate = el;
			},/** @access private */
			_cacheDom : function(){
				
				// cache Dom
				this.outerComp = this.childTemplate;
				
			},/** @access private *//** @access private */
			_applyProperty : function(){

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
				else if(this.layout === "column")
						this.outerComp.classList.add('tf-flex-direction--column');

				//apply attributes
				if(this.attributes != ''){
					Object.keys(this.attributes).forEach(function(attr){
						this.outerComp.setAttribute( attr , this.attributes[attr]);
					}, this);
				}

				// inner text or html
				if(this.innerText) this.outerComp.innerText = this.innerText;
				if(this.innerHTML) this.outerComp.innerHTML = this.innerHTML;
			},/** @access private */
			_bindEvents : function(){
				
				var me = this.scope;
				
				if(this.listeners != ''){
					for(var listener in this.listeners){
						this.outerComp.addEventListener(listener , this.listeners[listener].bind(this.scope));
					}
				}
			},/** @access private *//** @access private */
			_attachProperties : function(){
				
				var me = this.scope;

				// add properties
				me.outerComp = this.outerComp;

				// add methods
				TFLib.TFSharedMethods.call(me);

				// share methods to el
				me.outerComp.shared = me;
			},/** @access private */
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
