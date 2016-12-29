/**
 * @author Shivam Gupta 
 * @constructor TFTextField
 * @property {string} id - id will be assigned to outer comp.
 * @property {string} innerId -  will be assigned to input[id] & label[for].
 * @property {string} fieldLayout - can be 'row' or 'column'.
 * @property {object} styles - styles will be applied to outer div of component.
 * @property {integer} flex - can take flex value as integer will be assigned to outerComp.
 * @property {string} displayLabel - 'none' will hide display part of component.
 * @property {object} attributes - attributes will be applied to textarea tag.
 * @property {object} validations - Does apply validations to component only 'isRequired' present.
 * @property {string} fieldLabel - label to component field.
 * @property {(string|string[])} labelClass -  will be applied to  label wrapper.
 * @property {(string|string[])} compClass -  will be applied to  outermost div.
 * @property {(string|string[])} controlClass -  will be applied to div wraper of all teaxtarea wrapper.
 * @property {function} render - this function will run when the component is generated but not yet returned.
 * @property {object} listeners - is an object where all listener handlers can be written as key value pair.
 */
TFLib.TFTextField = function() {

    var textfield = {
        
        scope: this,
        _init: function() {

            this._initialize();
            this._generateTemplate();
            this._cacheDom();
            this._applyProperty();
            this._bindEvents();
            this._attachProperties();
            this._render();

            //return el
            return this.outerComp;
        },
        _initialize: function() {
            
            var me = this.scope;

            //config
            this.dynamicId = me.id ||  "tf-textfield-" + (new Date().getTime()+""+getRandomInt(1,1000));
            this.innerId = me.innerId || me.name || "tf-input-text-"+ (new Date().getTime()+""+getRandomInt(1,1000));
            this.requiredId = "tf-input-req-"+(new Date().getTime()+""+getRandomInt(1,1000));
            
            this.buttons = me.buttons || [];
            this.validations = me.validations || {};
            this.validations.__proto__ =  {
                'isRequired' : {value : false , errmsg : TFLib.TFConstants.COMMON.ISREQUIRED },
                'onlyText' : {value : false},
                'onlyNumber' : {value :false},
                'regex' : {value : false, pattern:"*", errmsg : TFLib.TFConstants.COMMON.REGEX },
                'customError' : {value : false , errmsg : TFLib.TFConstants.COMMON.CUSTOMERROR }
            };
            this.styles = me.styles || '';
            this.attributes = me.attributes || '';
            this.displayLabel = me.displayLabel || false;
            this.fieldLabel = me.fieldLabel || '';
            this.fieldLayout = me.fieldLayout || 'row';

            //style
            this.flex = me.flex || false;
            
            //class
            this.labelClass = (me.labelClass ? (me.labelClass.constructor === Array ? me.labelClass : [me.labelClass]) : false);
            this.compClass = (me.compClass ? (me.compClass.constructor === Array ? me.compClass : [me.compClass]) : false);
            this.controlClass = (me.controlClass ? (me.controlClass.constructor === Array ? me.controlClass : [me.controlClass]) : false);
            

            //attributes
            this.name = me.name || '';
            this.placeholder = me.placeholder || '';
            this.pattern = me.pattern || '';
            this.required = (me.required === true) ? 'required' : '';
            this.value = me.value || '';
            this.readOnly = (me.readOnly === true) ? 'readonly' : '';
            this.maxlength = me.maxlength || '';
            this.tabindex = me.tabindex || '';
            
            // methods
            this.render = me.render || '';
            this.listeners = me.listeners || '';

        },
        _generateTemplate: function() {
            
            var el = [
                '<div control-type="tf-textfield-outer"',
                    'id="' + this.dynamicId + '"',
                    'class="tf-field-container tf-flex ' + ((this.fieldLayout === 'row') ? 'tf-flex-direction--row ' : 'tf-flex-direction--column ') + '">',
                        '<div control-type="tf-tf-label" class="tf-field-container--label tf-flex  ' + (this.displayLabel ? 'tf-display--none' : '') + '">',
                            '<label for="'+this.innerId+'">' + (this.fieldLabel ? this.fieldLabel : '') + '</label>',
                            '<span id="'+this.requiredId+'" class="tf-required--red" style="display:none;">*</span>',
                        '</div>',
                        '<div control-type="tf-textfield" class="tf-field-container--control tf-field-with-btn">',
                            '<input class="tf-flex tf-flex--one"',
                                'type="text"',
                                'id="'+this.innerId+'"',
                                '' + (this.name ? 'name="' + this.name + '"' : '') + '',
                                '' + (this.value ? 'value="' + this.value + '"' : '') + '',
                                '' + (this.placeholder ? 'placeholder="' + this.placeholder + '"' : '') + '',
                                '' + (this.pattern ? 'pattern="' + this.pattern + '"' : '') + '',
                                '' + (this.maxlength ? 'maxlength="' + this.maxlength + '"' : '') + '',
                                '' + (this.tabindex ? 'tabindex="' + this.tabindex + '"' : '') + '',
                                '' + this.readOnly + '',
                                '' + this.required + '',
                            '/>',
                        '</div>',
                    '</div>'
            ].join('\n');

            this.childTemplate = $(el)[0];
        },
        _cacheDom: function() {

            //cache DOM
            this.outerComp = this.childTemplate;
            this.innerComp = this.childTemplate.querySelector("input");
            this.controlComp = this.childTemplate.querySelector("[control-type='tf-textfield']");
            this.labelComp = this.childTemplate.querySelector("[control-type='tf-tf-label']");
            this.requiredComp = this.labelComp.querySelector('#'+this.requiredId);
        },
        _applyProperty: function() {

            //apply styles
            if (this.styles != '') {
                Object.keys(this.styles).forEach(function(style) {
                    this.outerComp.style[style] = this.styles[style];
                }, this);
            }

            //apply attributes
            if (this.attributes != '') {
                Object.keys(this.attributes).forEach(function(attribute) {
                    this.innerComp.setAttribute(attribute, this.attributes[attribute]);
                }, this);
            }

            //applying classes
            if (this.controlClass) this.controlComp.classList.add.apply(this.controlComp.classList, this.controlClass);
            if (this.compClass) this.outerComp.classList.add.apply(this.outerComp.classList, this.compClass);
            if (this.labelClass) this.labelComp.classList.add.apply(this.labelComp.classList, this.labelClass);

            if(this.flex) this.outerComp.style.flex = this.flex;

            // handling buttons
            this.buttons.forEach(function(val) {
                this.controlComp.appendChild(TFLib.TFButton.call(val));
            }, this);
        },
        _bindEvents: function() {
            
            var me = this.scope;

            //public listeners
            if (this.listeners != '') {
                for (var listener in this.listeners) {
                    this.innerComp.addEventListener(listener, this.listeners[listener].bind(me));
                }
            }
        },
        _attachProperties: function() {
            
            var me = this.scope;

            // add properties
            me.outerComp = this.outerComp;
            me.innerComp = this.innerComp;
            me.controlComp = this.controlComp;
            me.labelComp = this.labelComp;
            me.setValidations = this.setValidations;
            me.validations = this.validations; 
            me.innerId = this.innerId;
            me.requiredComp = this.requiredComp;

            // add methods
            TFLib.TFTextFieldMethods.call(me);
            TFLib.TFSharedMethods.call(me);

            // share methods to el
            this.outerComp.shared = me;

            // handle validations
            me.validationMethods = {};
            TFLib.TFValidations.call(me.validationMethods);

            if(Object.keys(this.validations).length > 0){
                this._handleValidationsFallback();
                this.setValidations.call(me);
            }
        },
        _handleValidationsFallback: function(){
            
            Object.keys(this.validations).forEach(function(val){
                if(!this[val].errmsg)
                    this[val].errmsg = this.__proto__[val].errmsg;
            }.bind(this.validations));
        },
        _render: function() {

            var me = this.scope;

            if (this.render != '') {
                this.render.call(me);
            }
        },
        setValidations: function() {
                
                //adding validations
                Object.keys(this.validations).forEach(function(val) {

                    switch (val) {
                        case 'isRequired':
                        	if(this.validations.isRequired.value){
                        		
                                if(!this.isRequiredHandler){
                                    this.requiredComp.style.display = '';
                                    this.isRequiredHandler = this.validationMethods.isRequired.bind(this);
                                    this.innerComp.addEventListener('blur', this.isRequiredHandler);
                                    this.innerComp.addEventListener('input', this.isRequiredHandler);
                                }
                                


                        	}else {
                                this.requiredComp.style.display = 'none';
                        		this.innerComp.removeEventListener('blur', this.isRequiredHandler);
                            	this.innerComp.removeEventListener('input', this.isRequiredHandler);
                                delete this.isRequiredHandler;
                           	}
                            break;

                        case 'onlyNumber':
                        	if(this.validations.onlyNumber.value){
                      		    
                                if(!this.onlyNumberHandler){
                                    this.onlyNumberHandler = this.validationMethods.onlyNumber.bind(this);
                                    this.innerComp.addEventListener('keydown', this.onlyNumberHandler); 
                                }
                                
                        	}else{
                                this.innerComp.removeEventListener('keydown', this.onlyNumberHandler);
                                delete this.onlyNumberHandler;
                            }                            
                            break;

                        case 'regex':
                        	if(this.validations.regex.value){

                                if(!this.regexHandler){
                                    this.regexHandler = this.validationMethods.regex.bind(this);
                                    this.innerComp.addEventListener('blur', this.regexHandler);
                                    this.innerComp.addEventListener('input', this.regexHandler);
                                }
                                
                            }else {

                                this.innerComp.removeEventListener('blur', this.regexHandler);
                                this.innerComp.removeEventListener('input', this.regexHandler);
                                delete this.regexHandler;
                            } 
                            break;

                        case 'onlyText':
                        	if(this.validations.onlyText.value){
                        		
                                if(!this.onlyTextHandler){
                                    this.onlyTextHandler = this.validationMethods.onlyText.bind(this);
                                    this.innerComp.addEventListener('keydown', this.onlyTextHandler);       
                                }
                                
                        	}else{

                                this.innerComp.removeEventListener('keydown', this.onlyTextHandler);
                                delete this.onlyTextHandler;
                            }
                            break;
                        case 'customError' : 
                            if(this.validations.customError.value)
                                this.customError(this.validations.customError.value);
                            break;
                    }
                }, this);
            
        }
    };


    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    return textfield._init();

};
