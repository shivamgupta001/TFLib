/**
 * @author Shivam Gupta 
 * @constructor TFRadioField
 * @property {string} id - id will be assigned to outer component.
 * @property {string} labelId - will be assigned to label[id].
 * @property {string} fieldLayout - can be 'row' or 'column'.
 * @property {integer} flex - can take flex value as integer will be assigned to outerComp.
 * @property {object} styles - styles will be applied to button tag.
 * @property {object[]} fieldGroup - pass all checkboxes details as each item.
 * @property {string} groupLayout - layout of items provided in fieldGroup can be 'row' or 'column'.
 * @property {string} name - will be common to all checkboxes , no need to provide individually , but you can override.
 * @property {object} validations - Does apply validations to component only 'isRequired' present.
 * @property {string} fieldLabel - label to component field.
 * @property {(string|string[])} labelClass -  will be applied to TFCheckboxField label wrapper.
 * @property {(string|string[])} compClass -  will be applied to TFCheckboxField outermost div.
 * @property {(string|string[])} controlClass -  will be applied to div wraper of all checkboxes.
 * @property {function} render - this function will run when the component is generated but not yet returned.
 * @property {object} listeners - is an object where all listener handlers can be written as key value pair.
 */
TFLib.TFRadioField = function() {

    var radiofield = {

        scope: this,
        _init: function() {

            this._initialize();
            this._generateTemplate();
            this._cacheDom();
            this._applyProperty();
            this._bindEvents();
            this._attachProperties();
            this._render();

            // retrun el
            return this.outerComp;
        },
        _initialize: function() {

            var me = this.scope;

            //  configs
            this.dynamicId = me.id || "tf-radiof-" + getRandomInt(1, 10000);
            this.labelId = me.labelId || "tf-radio-label-" + getRandomInt(1, 10000);
            this.requiredId = "tf-radio-req-" + getRandomInt(1, 10000);


            this.fieldLayout = me.fieldLayout || 'row';
            this.styles = me.styles || '';
            this.fieldGroup = me.fieldGroup || [];
            this.groupLayout = me.groupLayout || 'column';
            this.name = me.name || '';
            this.validations = me.validations || {};
            this.validations.__proto__ = {
                'isRequired': { value: false, errmsg: TFLib.TFConstants.COMMON.ISREQUIRED },
                'customError': { value: false, errmsg: TFLib.TFConstants.COMMON.CUSTOMERROR }
            };

            //style
            this.flex = me.flex || '';
            
            // innerHTML configs
            this.fieldLabel = me.fieldLabel || '';

            //class
            this.labelClass = (me.labelClass ? (me.labelClass.constructor === Array ? me.labelClass : [me.labelClass]) : false);
            this.compClass = (me.compClass ? (me.compClass.constructor === Array ? me.compClass : [me.compClass]) : false);
            this.controlClass = (me.controlClass ? (me.controlClass.constructor === Array ? me.controlClass : [me.controlClass]) : false);

            //  methods
            this.render = me.render || '';
            this.listeners = me.listeners || '';

        },
        _generateTemplate: function() {

            var el = [
                '<div id="' + this.dynamicId + '"',
                'class="tf-field-container tf-flex ' + ((this.fieldLayout === 'row') ? 'tf-flex-direction--row ' : 'tf-flex-direction--column ') + '">',
                    '<div control-type="tf-radiof-label" class="tf-field-container--label"' + ((this.displayLabel === "none") ? 'tf-display--none' : '') + '">',
                        '<label id="' + this.labelId + '" class="tf-field--label">' + (this.fieldLabel ? this.fieldLabel : '') + '</label>',
                        '<span id="' + this.requiredId + '" class="tf-required--red" style="display:none;">*</span>',
                    '</div>',
                    '<div control-type="tf-radiofield" class="tf-field-container--control tf-flex ' + ((this.groupLayout === 'row') ? 'tf-flex-direction--row ' : 'tf-flex-direction--column ') + '">',
                        // radio list  
                    '</div>',
                '</div>'
            ].join('\n');

            this.childTemplate = $(el)[0];
        },
        _cacheDom: function() {

            //cache Dom
            this.outerComp = this.childTemplate;
            this.controlComp = this.childTemplate.querySelector('[control-type="tf-radiofield"]');
            this.labelComp = this.childTemplate.querySelector('[control-type="tf-radiof-label"]');
            this.requiredComp = this.labelComp.querySelector('#' + this.requiredId);

        },
        _applyProperty: function() {

            //apply styles
            if (this.styles != '') {
                Object.keys(this.styles).forEach(function(style) {
                    this.outerComp.style[style] = this.styles[style];
                }, this);
            }

            // apply flex
            if(this.flex) this.outerComp.style.flex = this.flex;

            //apply classes
            if (this.compClass) this.outerComp.classList.add.apply(this.outerComp.classList, this.compClass);
            if (this.labelClass) this.labelComp.classList.add.apply(this.labelComp.classList, this.labelClass);
            if (this.controlClass) this.controlComp.classList.add.apply(this.controlComp.classList, this.controlClass);

            // add check boxes to template
            this.fieldGroup.forEach(function(item) {
                if (this.name != '')
                    item.name = this.name;
                this.controlComp.appendChild(TFLib.TFRadio.call(item));
            }, this);

            // cache Dom
            this.innerComp = this.controlComp.getElementsByTagName('input');
        },
        _bindEvents: function() {

            var me = this.scope;

            if (this.listeners != '') {
                for (var listener in this.listeners) {
                    this.controlComp.addEventListener(listener, this.listeners[listener].bind(me));
                }
            }
        },
        _attachProperties: function() {

            var me = this.scope;

            // add properties
            me.controlComp = this.controlComp;
            me.outerComp = this.outerComp;
            me.labelComp = this.labelComp;
            me.innerComp = this.innerComp;
            me.labelId = this.labelId;
            me.requiredComp = this.requiredComp;
            me.setValidations = this.setValidations;

            // add methods
            TFLib.TFCheckboxFieldMethods.call(me);
            TFLib.TFSharedMethods.call(me);

            // share methods to el
            me.outerComp.shared = me;

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

    return radiofield._init();

};
