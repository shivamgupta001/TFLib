/**
 * @author Vijay G. Thorat
 * @constructor TFLoader
 * @property {string} id - id will be assigned to outer comp.
 * @property {string} loaderText -  this will display as loader text.
 * @property {string} LoaderImage -  this will display as loader image it could be <svg> or <img>.
 * @property {object} styles - styles will be applied to outer div of component.
 * @property {object} attributes - attributes will be applied to textarea tag.
 * @property {(string|string[])} labelClass -  will be applied to  label wrapper.
 * @property {(string|string[])} compClass -  will be applied to  outermost div.
 * @property {(string|string[])} controlClass -  will be applied to div wraper of all teaxtarea wrapper.
 * @property {function} render - this function will run when the component is generated but not yet returned.
 * @property {object} listeners - is an object where all listener handlers can be written as key value pair.
 */
TFLib.TFLoader = function() {
	var loader = {

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
			this.dynamicId = me.id || "tf-loader-" + (TFLib.TFLoader.count = ++TFLib.TFLoader.count || 1);
			this.styles = me.styles || '';
			this.attributes = me.attributes || '';
			
			//class
			this.compClass = (me.compClass ? (me.compClass.constructor === Array ? me.compClass : [me.compClass]) : false);
			this.loaderClass = (me.loaderClass ? (me.loaderClass.constructor === Array ? me.loaderClass : [me.loaderClass]) : false);

			
			//Loder text
			this.LoaderText = me.loaderText  || 'Loading...';
			
			// LoaderImage 
			//this.LoaderImage = me.loaderImage || '';


		},/** @access private */
		_generateTemplate : function(){
			
			var el  =[
				'<section tabindex = "0" control-type="tf-loader-outer" class="tf-loader--main" id="'+this.dynamicId+'">',
				    '<div class="tf-loader--outer">',
				        '<div class="tf-loader" control-type="tf-loader">',
				            '<div class="tf-loader--image">',
				                '<div class="uil-ripple-css" style="transform:scale(0.97);"><div></div><div></div></div>',
				            '</div>',
				            '<div class="tf-loader--text">'+this.LoaderText+'</div>',
				        '</div>',
				    '</div>',
				'</section>',
			].join('\n');

			this.childTemplate = $(el)[0];
		},/** @access private */
		_cacheDom : function(){

			//cache DOM
			this.outerComp = this.childTemplate;
			this.innerComp = this.childTemplate.querySelector('[control-type="tf-loader"]');
			this.innerComp.loaderImage = this.innerComp.querySelector(".tf-loader--image");
			this.innerComp.loaderText = this.innerComp.querySelector(".tf-loader--text");
			this.innerComp.initLoaderImage = this.innerComp.loaderImage.innerHTML;
			this.innerComp.initLoaderText = this.innerComp.loaderText.innerText;
			
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
			if(this.LoaderText) this.innerComp.querySelector(".tf-loader--text").innerHTML = this.LoaderText;
			
			//apply class
			if(this.loaderClass) this.innerComp.classList.addmany(this.loaderClass);
			if(this.compClass) this.outerComp.classList.addmany(this.compClass);
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
			me.loaderCount = 0;

			// add methods
			TFLib.TFLoaderMethods.call(me);

			// shared methods over el
			me.outerComp.shared = me;
		},/** @access private */
		_render : function(){
			
			var me = this.scope;
			
			if(this.render && this.render != ''){
				me.render.call(me);	// last method , everything done
			}
		}
	};
	
	return loader._init();

};