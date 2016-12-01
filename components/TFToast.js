/**
 * @author Shivam Gupta 
 * @constructor TFToast
 * @property {string} msg - innerHTML value
 * @property {(string|string[])} compClass - compClass will be applied to component.
 * @property {string} animType - // All Possible Values for animType are ---
 *		 toast-top-left 		toast-bottom-left		toast-left-top		toast-right-top
 *		 toast-top-middle		toast-bottom-middle		toast-left-middle	toast-right-middle
 *		 toast-top-right		toast-bottom-right		toast-left-bottom	toast-right-bottom
 */
TFLib.TFToast = function(config){
		
		var toast = {
			scope : config,
			_init : function(){

				this._initialize();
				this._generateTemplate();
				this._applyProperty();
				this._bindEvents();
				this._render();

			},
			_initialize : function(){

				var me = this.scope;
				
				this.compClass = me.compClass ? (me.compClass.constructor === Array ? me.compClass : [me.compClass]) : false;
				this.msg = me.msg || null;
				this.animType = me.animType || 'toast-top-right';

			},
			_generateTemplate : function(){

				this.innerComp = document.createElement('div');
				
			},
			_applyProperty : function(){

				// add default class 
				this.innerComp.classList.add("toast-component");

				//apply property
				if(this.compClass) 	this.innerComp.classList.add.apply(this.innerComp.classList , this.compClass);
				if(this.animType) 	this.innerComp.style.animationName = this.animType;
				if(this.msg) 		this.innerComp.innerHTML = this.msg;
			
			},
			_bindEvents : function(){
				
				//this.$innerComp.addEventListener('animationstart', this._handleAnimationStart);
				this.innerComp.addEventListener('animationend', this._handleAnimationEnd);

			},
			_render : function(){

				document.body.appendChild(this.innerComp);
				
			},
			_handleAnimationEnd : function(){

				document.body.removeChild(this);
			}
		};	
		
		toast._init();	
	};