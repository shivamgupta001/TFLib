/**
 * @author Shivam Gupta 
 * @constructor TFComboboxField
 * @property {string} id - id will be assigned to outer comp.
 * @property {string} labelId -  will be assigned to  label[id].
 * @property {string} fieldLayout - can be 'row' or 'column'.
 * @property {integer} flex - integer value to assign flex .
 * @property {object} styles - styles will be applied to outer div of component.
 * @property {string} displayLabel - 'none' will hide display part of component.
 * @property {object} attributes - attributes will be applied to textarea tag.
 * @property {object} validations - Does apply validations to component only 'isRequired' and 'customError' present.
 * @property {string} fieldLabel - label to component field.
 * @property {string} name - name will be assigned to select tag.
 * @property {boolean} multiple - can take true or false for multiple attribute to be set.
 * @property {integer} tabindex - integer value gets assigned to component field.
 * @property {(string|string[])} labelClass -  will be applied to  label wrapper.
 * @property {(string|string[])} compClass -  will be applied to  outermost div.
 * @property {(string|string[])} controlClass -  will be applied to div wraper of all teaxtarea wrapper.
 * @property {string} value - provide value field property in data object
 * @property {string} display - provide display field property in data object
 * @property {object[]} data -  will take array of object with two properties 'value' and 'display'
 * @property {function} render - this function will run when the component is generated but not yet returned.
 * @property {object} listeners - is an object where all listener handlers can be written as key value pair.
 */
TFLib.TFComboboxField = function() {

    var comboboxfield = {
        
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
            this.dynamicId = me.id || "tf-combo-" + (new Date().getTime()+""+getRandomInt(1,1000));
            this.labelId = me.labelId || "tf-combo-label-" + (new Date().getTime()+""+getRandomInt(1,1000));
            this.requiredId = "tf-combo-req-" + (new Date().getTime()+""+getRandomInt(1,1000));

            this.buttons = me.buttons || [];
            this.validations = me.validations || {};
            this.validations.__proto__ = {
                'isRequired': { value: false, errmsg: TFLib.TFConstants.COMMON.ISREQUIRED },
                'customError': { value: false, errmsg: TFLib.TFConstants.COMMON.CUSTOMERROR }
            };
            this.styles = me.styles || '';
            this.attributes = me.attributes || '';
            this.displayLabel = me.displayLabel || false;
            this.fieldLabel = me.fieldLabel || '';
            this.fieldLayout = me.fieldLayout || 'row';
            this.data = me.data || [];
            this.value = me.value || 'value';
            this.display = me.display || 'display';

            //style
            this.flex = me.flex || false;
            
            //class
            this.labelClass = (me.labelClass ? (me.labelClass.constructor === Array ? me.labelClass : [me.labelClass]) : false);
            this.compClass = (me.compClass ? (me.compClass.constructor === Array ? me.compClass : [me.compClass]) : false);
            this.controlClass = (me.controlClass ? (me.controlClass.constructor === Array ? me.controlClass : [me.controlClass]) : false);

            //attributes
            this.name = me.name || '';
            this.multiple = (me.multiple === true) ? 'multiple' : '';
            this.tabindex = me.tabindex || '';
            

            // methods
            this.render = me.render || '';
            this.listeners = me.listeners || '';

        },
        _generateTemplate: function() {
            
            var el = [
                    '<div control-type="tf-combofield-outer"',
                    'id="' + this.dynamicId + '"',
                    'class="tf-field-container tf-flex ' + ((this.fieldLayout === 'row') ? 'tf-flex-direction--row ' : 'tf-flex-direction--column ') + '">',
                        '<div control-type="tf-combo-label" class="tf-field-container--label tf-flex ' + (this.displayLabel ? 'tf-display--none' : '') + '">',
                            '<label class="tf-field--label" id="' + this.labelId + '">' + (this.fieldLabel ? this.fieldLabel : '') + '</label>',
                            '<span id="' + this.requiredId + '" class="tf-required--red" style="display:none;">*</span>',
                        '</div>',
                        '<div control-type="tf-combofield" class="tf-field-container--control tf-field-with-btn" >',
                            '<select class="tf-flex tf-flex--one"',
                                'type="text"',
                                '' + (this.name ? 'name="' + this.name + '"' : '') + '',
                                '' + (this.tabindex ? 'tabindex="' + this.tabindex + '"' : '') + '',
                                '' + this.multiple + '',
                            '></select>',
                        '</div>',
                    '</div>'
            ].join('\n');

            this.childTemplate = $(el)[0];
        },
        _cacheDom: function() {

            //cache DOM
            this.outerComp = this.childTemplate;
            this.innerComp = this.outerComp.querySelector("select");
            this.controlComp = this.outerComp.querySelector("[control-type='tf-combofield']");
            this.labelComp = this.outerComp.querySelector("[control-type='tf-combo-label']");
            this.requiredComp = this.labelComp.querySelector('#' + this.requiredId);
            
        },
        _applyProperty: function() {

            // add data to combobox
            this.data.forEach(function(val , index){
       	
                var opt = document.createElement("option");
            	opt.setAttribute("value", val[this.value]);
            	opt.innerHTML = val[this.display];
            	this.innerComp.appendChild(opt);
            }, this);


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

           // this.setValidations();

            //public listeners
            if (this.listeners != '') {
                for (var listener in this.listeners) {
                    this.innerComp.addEventListener(listener, this.listeners[listener].bind(me));
                }
            }
        },
        _render: function() {

            var me = this.scope;

            if (this.render != '') {
                this.render.call(me);
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
            me.requiredComp = this.requiredComp; 
            me.addData = this.addData;

            // add methods
            TFLib.TFComboboxFieldMethods.call(me);
            TFLib.TFCheckboxFieldMethods.call(me);
            TFLib.TFSharedMethods.call(me);

            // share methods to el
            this.outerComp.shared = me;

            // handle validations
            me.validationMethods = {};
            TFLib.TFValidations.call(me.validationMethods);

            if (Object.keys(this.validations).length > 0){
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

                        if (this.validations.isRequired.value) {
                            if (!this.isRequiredHandler) {
                                this.requiredComp.style.display = '';
                                this.isRequiredHandler = this.validationMethods.isRequired.bind(this);
                                for (var i = 0; i < this.innerComp.length; i++) {
                                    this.innerComp[i].addEventListener('change', this.isRequiredHandler);
                                }
                            }
                        } else {

                            this.requiredComp.style.display = 'none';
                            for (var i = 0; i < this.innerComp.length; i++) {
                                this.innerComp[i].removeEventListener('change', this.isRequiredHandler);
                            }
                            delete this.isRequiredHandler;
                        }
                        break;
                    case 'customError':
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

    return comboboxfield._init();

};
