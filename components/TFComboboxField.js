/** This is a description of combobox field */
TFLib.TFComboboxField = function($fieldset) {

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
            this.dynamicId = me.id || "tf-combo-" + getRandomInt(1, 10000);
            this.buttons = me.buttons || [];
            this.validations = me.validations || false;
            this.styles = me.styles || '';
            this.attributes = me.attributes || '';
            this.displayLabel = me.displayLabel || false;
            this.fieldLabel = me.fieldLabel || '';
            this.fieldType = me.fieldType || 'row';
            this.options = me.options || [];

            //style
            this.flex = me.flex || false;
            
            //class
            this.labelClass = (me.labelClass ? (me.labelClass.constructor === Array ? me.labelClass : [me.labelClass]) : false);
            this.compClass = (me.compClass ? (me.compClass.constructor === Array ? me.compClass : [me.compClass]) : false);
            this.controlClass = (me.controlClass ? (me.controlClass.constructor === Array ? me.controlClass : [me.controlClass]) : false);

            //attributes
            this.name = me.name || '';
            this.required = (me.required === true) ? 'required' : '';
            this.multiple = (me.multiple === true) ? 'multiple' : '';
            this.tabindex = me.tabindex || '';
            this.markRequired = me.markRequired || false;

            // methods
            this.render = me.render || '';
            this.listeners = me.listeners || '';

        },
        _generateTemplate: function() {
            
            var el = [
                '<div',
                    'id="' + this.dynamicId + '"',
                    'class="tf-flex ' + ((this.fieldType === 'row') ? 'tf-flex-direction--row ' : 'tf-flex-direction--column ') + '">',
                        '<div control-type="tf-combo-label" class="tf-flex ' + (this.displayLabel ? 'tf-display--none' : '') + '">',
                            '<label>' + (this.fieldLabel ? this.fieldLabel : '') + '</label>',
                            '<span class="tf-required--red ' + (this.markRequired ? '' : 'tf-display--none') + '">*</span>',
                        '</div>',
                        '<div control-type="tf-combofield" class="tf-field-with-btn">',
                            '<select class="tf-flex tf-flex--one"',
                                'type="text"',
                                '' + (this.name ? 'name="' + this.name + '"' : '') + '',
                                '' + (this.tabindex ? 'tabindex="' + this.tabindex + '"' : '') + '',
                                '' + this.required + '',
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
            this.innerComp = this.childTemplate.querySelector("select");
            this.controlComp = this.childTemplate.querySelector("[control-type='tf-combofield']");
            this.labelComp = this.childTemplate.querySelector("[control-type='tf-combo-label']");
        },
        _applyProperty: function() {

            // add data to combobox
            this.options.forEach(function(val , index){
            	var opt = document.createElement("option");
            	opt.setAttribute("value", val.value);
            	opt.innerHTML = val.display;
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

            // handling buttons
            this.buttons.forEach(function(val) {
                this.controlComp.appendChild(TFButton.call(val));
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

            // add methods
            TFLib.TFTextFieldMethods.call(me);
            TFLib.TFSharedMethods.call(me);

            // share methods to el
            this.outerComp.shared = me;
        },
        setValidations: function() {
            
            //private listeners
            if (this.validations  && Object.keys(this.validations).length) {
            	       
                
                if(!this.scope){
                    // executes when setError is called
                    // will not execute when removeError is called	
                    this.scope = this.scope ? this.scope : {};
                	TFValidations.call(this.scope);	
                
                }else if(this.scope.type === "textfield" ){
                	
                    //exceutes from initial this.validations
                    TFValidations.call(this.scope);	
                }
                
                //adding validations
                Object.keys(this.validations).forEach(function(val) {

                    switch (val) {
                        case 'isRequired':
                        	
                        	if(this.validations.isRequired.value){

                        		this.scope.isRequiredHandler = this.scope.isRequired.bind(this);

                        		this.innerComp.addEventListener('blur', this.scope.isRequiredHandler);
                            	this.innerComp.addEventListener('input', this.scope.isRequiredHandler);


                        	}else {
                        		this.innerComp.removeEventListener('blur', this.scope.isRequiredHandler);
                            	this.innerComp.removeEventListener('input', this.scope.isRequiredHandler);
                           	}
                            break;

                        case 'onlyNumber':
                        	if(this.validations.onlyNumber.value){
                      		
                        		this.innerComp.addEventListener('keydown', this.scope.onlyNumber);	
                        	}                            
                            break;

                        case 'regex':
                        	if(this.validations.regex.value){

                        		this.innerComp.addEventListener('blur', this.scope.regex.bind(this));
                            	this.innerComp.addEventListener('input', this.scope.regex.bind(this));
                            }
                            break;

                        case 'onlyText':
                        	if(this.validations.onlyText.value){
                        		this.innerComp.addEventListener('keydown', this.scope.onlyText);	
                        	}
                            break;
                    }
                }, this);
            }
        }
    };


    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    return comboboxfield._init();

};
