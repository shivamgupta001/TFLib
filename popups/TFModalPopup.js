/**
 * @author Shivam Gupta 
 * @constructor TFModalPopup
 * @property {string} popupId - popupId non existing value otherwise takes random value
 * @property {boolean} onConfig - This config allows to open manually popup . Need to call show() method on popup returned object and close() to close. 
 * @property {boolean} resizable - can be resized or not by default true
 * @property {boolean} footerVisible - enable or disable footer , by default false
 * @property {number}  width  - integer value , by default 800px
 * @property {number} height - integer value , by-default 600px
 * @property {string} title - title will be displayed in header part
 * @property {object} dataTemplate - requires parent node reference    
 * @property {function} modalOnClose - callback handle called when popup closed via Escape or click over close button
 * @property {function} modalOnOpen - callback handle called when popup is inserted in DOM
 * @property {function} close - close will internally click close btn at top right
 * @property {function} show - show will open popup if already in dom
 * @property {function} forceClose - this method will directly call destroy which will remove popup from dom 
 */

TFLib.ModalPopup = function(config) {

    var modalpopup = {

        scope: config,
        _init: function(){

            this._initialize();

            if (this._validateInitialize()) {

                this._generateTemplate();
                this._cacheDom();
                this._applyProperty();
                this._bindEvents();
                this._attachProperties();
                this._render();
                

                return Object.freeze(this.outerComp);
            } else {
                return false;
            }
        },
        _initialize: function() {

            var me = this.scope;

                 //config
                this.dynamicId = me.popupId || "tf-modal-" + (TFLib.ModalPopup = ++TFLib.ModalPopup || 1),
                this.onConfig = (me.onConfig == null || me.onConfig == false) ? false : true,
                this.resizable = (me.resizable == false) ? false : true,
                this.footerVisible = (me.footerVisible == true) ? true : false,


                // style
                this.width = me.width || 800,
                this.height = me.height || 600,
                this.styles = me.styles || '';

                // header text
                this.title = me.title || '',

                // callback
                this.modalCloseCallback = me.modalOnClose || '',
                this.modalOpenCallback = me.modalOnOpen || '',
                this.destroy = me.destroy || '',

                // user Template
                this.dataTemplate = me.dataTemplate || null;
                this.footerTemplate = me.footerTemplate || null;
                this.activeElement = document.activeElement;
        },
        _validateInitialize: function() {

            if (document.getElementById(this.dynamicId)) {
                console.log('Duplicate Id ' + this.dynamicId);
                return false;
            }
            return true;
        },
        _generateTemplate: function() {

            var el = [
                '<div id="'+this.dynamicId+'" class="tf-modal-outer">',
                    '<section class="tf-modal-inner">',
                        // header    
                        '<header class="tf-modal-header">',
                            '<span class="tf-modal-title">' + this.title + '</span>',
                            '<a  class= "tf-modal-close-btn"></a>',
                        '</header>',
                        //body
                        '<section class="tf-modal-body"></section>',
                        //footer
                        '<footer class="tf-modal-footer ' + (this.footerVisible ? '' : 'tf-display--none' ) + '"></footer>',
                    '</section>',
                '</div>'
            ].join('\n');

            this.childTemplate = $(el)[0];
        },
        _cacheDom: function() {
            
            // cache Dom
            this.outerComp = this.childTemplate;
            this.innerComp = this.outerComp.querySelector('.tf-modal-inner');
            
            this.modalHeader = this.innerComp.querySelector('.tf-modal-header');
            this.modalBody = this.innerComp.querySelector('.tf-modal-body');
            this.modalFooter = this.innerComp.querySelector('.tf-modal-footer');
            
            this.modalCloseNode = this.modalHeader.querySelector('.tf-modal-close-btn');

            this.currentPopupCount = document.getElementsByClassName('tf-modal-outer').length;
        
        },
        _applyProperty : function(){

            // data-zindex makes sure hierarchical modal popup closes in order of opening
            this.outerComp.setAttribute('data-zindex', (1000 + this.currentPopupCount));

            //apply styles
            if (this.styles != '') {
                Object.keys(this.styles).forEach(function(style) {
                    this.innerComp.style[style] = this.styles[style];
                }, this);
            }

            // apply dataTemplate if provided
            if(this.dataTemplate){
                this.modalBody.appendChild(this.dataTemplate);  
            }else{
                var tpl = document.querySelector('template[data-template-id="'+this.dynamicId+'"]')
                if(tpl){

                    var clone = this._templateContent(tpl);
                    this.modalBody.appendChild(clone);    
                }
            }

            // apply body and height
            this.innerComp.style.width = this.width+'px';
            this.innerComp.style.height = this.height+'px';

            // apply footerTemplate 
            if(this.footerTemplate){
                this.modalFooter.appendChild(this.footerTemplate);
            }

        },
        _templateContent : function(template) {

            if("content" in document.createElement("template")) {
                return document.importNode(template.content, true);
            } else {
                var fragment = document.createDocumentFragment();
                var children = template.childNodes;
                for (i = 0; i < children.length; i++) {
                    fragment.appendChild(children[i].cloneNode(true));
                }
                return fragment;
            }
        },
        _bindEvents: function() {

            var me = this.scope;
            if(!this.currentPopupCount)  document.body.addEventListener('keyup', this._handleModalKeyUp);
            this._handleModalCloseBtnClick = this._handleModalCloseBtnClick.bind(this);
            this.modalCloseNode.addEventListener('click', this._handleModalCloseBtnClick);
            
        },
        _attachProperties : function(){

            var me = this.scope;

            // add Properties 
            me.outerComp = this.outerComp;

            // add Methods
            me.outerComp.show = this.show.bind(this);
            me.outerComp.close = this.close.bind(this);
            me.outerComp.forceClose = this.forceClose.bind(this);

        },
        _render: function() {

            if(!this.onConfig) {
                
                document.body.appendChild(this.outerComp);
                this._handleDraggable();
                this.innerComp.focus();
                this._handleModalOpenCallback();
            }
        },
        _handleDraggable : function(){

            TFLib.TFDraggable.call({
                childSel : '#'+this.dynamicId+' .tf-modal-inner',
                parentSel : '#'+this.dynamicId,
                elemSel : '#'+this.dynamicId+' .tf-modal-header'
            });
        },
        _handleModalKeyUp : function(e){

            var itemId = '';
            var popups = document.getElementsByClassName('tf-modal-outer');
            if (popups.length > 0) {
                
                // retrieving id and data-zindex for all popups 
                var data = [].map.call(popups, function(value, index) {
                    var id = value.id;
                    var zindex = value.dataset.zindex;
                    var obj = {};
                    obj[zindex] = id;
                    return obj;
                });
                
                // sorting in descending order
                data.sort(function(a, b) {
                    var aVal = +Object.keys(a)[0];
                    var bVal = +Object.keys(b)[0];
                    return bVal - aVal;
                });

                for (var key in data[0]) {
                    if (data[0].hasOwnProperty(key)) {
                        itemId = data[0][key];
                    }
                }
                if (e.key === "Escape" || e.key === "Esc") {
                    var closeBtn = document.getElementById(itemId).querySelector('.tf-modal-close-btn');
                    if(closeBtn.style.display !== "none"){
                        closeBtn.click();
                    }
                }
            }
        },
        _handleModalOpenCallback: function() {
            
            var me = this.scope;
            if(this.modalOpenCallback != '') this.modalOpenCallback.call(me);
        },
        _handleModalCloseBtnClick: function(e) {
            
            var me = this.scope,
                toDestroy = true;
            setTimeout(function(){
                this.focus();
            }.bind(this.activeElement), 100);
            if (this.modalCloseCallback != '')  
                toDestroy = this.modalCloseCallback.call(me, e);

            toDestroy = toDestroy === false ? false : true;            
            if(toDestroy)
                this._destroy();
        },
        show: function() {
            
            if(!document.getElementById(this.dynamicId)){

                var me = this.scope;

                document.body.appendChild(this.outerComp);
                this._handleDraggable();
                this._handleModalOpenCallback.call(this);
            }
        },
        close: function() {
            
            if(document.getElementById(this.dynamicId)) {
                this.modalCloseNode.click();
            }
        },
        forceClose : function(){

            if(document.getElementById(this.dynamicId)) {
                this._destroy();
            }
        },
        _destroy: function() {
            
            this.outerComp.removeEventListener('click', this._handleModalCloseBtnClick);
            document.body.removeChild(this.outerComp);

            // when last popup removed , removing event from document.body
            if(!this.currentPopupCount) document.body.removeEventListener('keyup', this._handleModalKeyUp);
            
            // For standard popup removing events
            if(this.destroy != '')  this.destroy();      
        }
    };

    return modalpopup._init();

}
