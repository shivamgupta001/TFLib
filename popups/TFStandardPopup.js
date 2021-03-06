/**
 * @author Shivam Gupta 
 * @constructor TFStandardPopup
 * @property {string} popupId - popupId non existing value otherwise gives error
 * @property {string} msg - pass your msg here
 * @property {string} title - title will be displayed in header part
 * @property {function} modalOnClose - provide handle called when popup closed via Escape or click over close button
 * @property {function} modalOnOpen - provide handle called when popup is inserted in DOM
 * @property {function} popupOnOk - callback handle to run when ok button clicked
 * @property {function} popupOnCancel - callback handle to run when cancel button clicked
 */
 
TFLib.ErrorPopup = function(config) {
    
    config.title = config.title || TFLib.TFConstants.POPUP.ERROR;
    config.imgClassName = 'tf-error-icon';
    config.CANCEL = config.CANCEL || false;
    StandardPopup.call(config);    
    
};
TFLib.InfoPopup = function(config) {

    config.title = config.title || TFLib.TFConstants.POPUP.INFO;
    config.imgClassName = 'tf-info-icon';
    config.CANCEL = config.CANCEL || false;
    StandardPopup.call(config);
};
TFLib.ConfirmPopup = function(config) {
    
    config.title = config.title || TFLib.TFConstants.POPUP.CONFIRM;
    config.imgClassName = 'tf-confirm-icon';
    StandardPopup.call(config);
};
TFLib.SuccessPopup = function(config) {
    
    config.title = config.title || TFLib.TFConstants.POPUP.SUCCESS;
    config.imgClassName = 'tf-success-icon';
    config.CANCEL = config.CANCEL || false;
    StandardPopup.call(config);
};
TFLib.PromptPopup = function(config){
    config.title = config.title || TFLib.TFConstants.POPUP.SUCCESS;
    config.promptPopup = true;
    config.imgClassName = null;
    StandardPopup.call(config);
}
StandardPopup = function(){
    
    var standardpopup = {

        scope : this,
        _init : function(){
            
            this._initialize();
            this._generateTemplate();
            this._cacheDom();
            this._applyProperty();
            this._bindEvents();
            this._attachProperties();
            this._render();
                
        },
        _initialize : function(){
            
            var me = this.scope;
            
            this.popupId = me.popupId || 'popupId-'+(StandardPopup.count = ++StandardPopup.count || 1);
            this.msg = me.msg,
            this.title = me.title;
            this.imgClassName = me.imgClassName || '';
            this.promptPopup = me.promptPopup || false;

            if(this.promptPopup)
                this.dataTemplate = me.dataTemplate || '';

            // callbacks
            this.modalOnClose = me.modalOnClose || '';
            this.modalOnOpen = me.modalOnOpen || '';
            this.popupOnOk = me.popupOnOk || '';
            this.popupOnCancel = me.popupOnCancel || '';
            
            // buttons and there value
            this.OK = ( me.OK == false ) ? false : true;
            this.CANCEL = ( me.CANCEL == false ) ? false : true;
            this.OKVal = me.OKVal || TFLib.TFConstants.POPUP.OK;
            this.CANCELVal = me.CANCELVal || TFLib.TFConstants.POPUP.CANCEL;
            
        },
        _generateTemplate : function(){
            
            if(!this.promptPopup){

                var elData = [
                    '<div class="tf-std-popup">',
                        '<div class="tf-std-popup-icon"><span class="' + this.imgClassName + '"></span></div>',
                        '<div class="tf-std-popup-msg"><span>' + this.msg + '</span></div>',
                    '</div>'
                ].join("\n");
                           
                this.childTemplateData = $(elData)[0];   
            }else{
                this.childTemplateData = $(this.dataTemplate)[0];
            }
            
            var elFooter = [
                '<div>',
                    (this.OK ? '<input type="button" class="tf-std-btn" value="'+this.OKVal+'" ModalPopupOKBtn="true" autofocus>' : ''),
                    (this.CANCEL ? '<input type="button" class="tf-std-btn" value="'+this.CANCELVal+'" ModalPopupCancelBtn="true">' : ""),
                '</div>'
            ].join("\n");
            
            this.childTemplateFooter = $(elFooter)[0];
            
        },
        _cacheDom : function(){

            this.innerComp = this.childTemplateData;
            this.footerComp = this.childTemplateFooter;
            if(this.OK) this.okComp = this.footerComp.querySelector('[ModalPopupOKBtn="true"]');
            if(this.CANCEL) this.cancelComp = this.footerComp.querySelector('[ModalPopupCancelBtn="true"]');

        },
        _applyProperty : function(){

        },
        _bindEvents : function(){
            
            if(this.okComp) {
                this.okComp.addEventListener('click', this.handlePopupOnOk);
                this.okComp.addEventListener('blur', this.handleOkBlur);
                
            } 
            if(this.cancelComp) {
                this.cancelComp.addEventListener('click', this.handlePopupOnCancel);
                this.cancelComp.addEventListener('blur', this.handleCancelBlur);
            }
            if(Boolean(this.okComp)^Boolean(this.cancelComp))
                document.addEventListener('keydown', this.handleKeyDown);
        },
        _attachProperties : function(){

            var me = this.scope;

            me.destroy = this.destroy;
            me.closeComp = this.closeComp;
            me.cancelComp = this.cancelComp;
            me.okComp = this.okComp;
            
            if(this.okComp){

                me.popupOnOk = this.popupOnOk;  
                this.okComp.shared = me;
            } 
            if(this.cancelComp){

                me.popupOnCancel = this.popupOnCancel;  
                this.cancelComp.shared = me;
            } 
        },
        _render : function(){
            
            var me = this.scope;
            
            var stdPopup = TFLib.ModalPopup({
                styles: {
                    minWidth : '400px',
                    maxWidth : '500px',
                    minHeight : '180px'
                },
                width : '400px',    // this is invalid value will not work , just need to pass number without px , done to prevent default case
                height : '180px',   // this is invalid value will not work , just need to pass number without px , done to prevent default case
                footerTemplate : this.footerComp,
                title: this.title,
                popupId: this.popupId,
                dataTemplate: this.innerComp,
                modalOnClose: this.modalOnClose,
                modalOnOpen: this.modalOnOpen,
                activeElement : me.activeElement,
                destroy : this.destroy.bind(this),
                onConfig: true,
                resizable: false,
                footerVisible : true
            });
            if(stdPopup)
                stdPopup.show();
            // caching after render
            this.closeComp = document.getElementById(this.popupId).querySelector('.tf-modal-close-btn');
            this._attachProperties();
                        
            if (this.imgClassName == 'tf-confirm-icon') 
                this.closeComp.style.display = 'none';

            if (this.okComp && this.cancelComp) 
                this.handleCancelBlur.call(me.cancelComp);
            else if(this.okComp && !this.cancelComp) 
                this.handleCancelBlur.call(me.okComp);
            
        },
        handleKeyDown : function(e){
            
            if(e.key === "Tab")
                e.preventDefault();
        },
        handleOkBlur : function(e) {
            
            if (this.shared.okComp && this.shared.cancelComp) {
                // For IE
                this.shared.cancelComp.focus();
                //For Chrome & Moz
                this.shared.cancelComp.setAttribute('tabindex', 10000);
                this.shared.okComp.setAttribute('tabindex', 10001);
            }
        },
        handleCancelBlur : function(e) {
            
            if (this.shared.okComp && this.shared.cancelComp) {
                //For IE
                this.shared.okComp.focus();
                //For Chrome & Moz
                this.shared.cancelComp.setAttribute('tabindex', 10001);
                this.shared.okComp.setAttribute('tabindex', 10000);
            }else if(this.shared.okComp && !this.shared.cancelComp){
                this.shared.okComp.focus();   
            }
                
        },
        handlePopupOnOk : function(e) {

            if (this.shared.popupOnOk != '')
                this.shared.popupOnOk();
            this.shared.destroy();
            this.shared.closeComp.click();
        },
        handlePopupOnCancel : function(e) {
            
            if (this.shared.popupOnCancel != '')
                this.shared.popupOnCancel();
            this.shared.destroy();
            this.shared.closeComp.click();
        },
        destroy : function(){

            if(this.okComp) {
                this.okComp.removeEventListener('click', this.handlePopupOnOk);
                this.okComp.removeEventListener('blur', this.handleOkBlur);
            } 
            if(this.cancelComp) {
                this.cancelComp.removeEventListener('click', this.handlePopupOnCancel);
                this.cancelComp.removeEventListener('blur', this.handleCancelBlur);
            }
            if(Boolean(this.okComp) ^ Boolean(this.cancelComp))
                document.removeEventListener('keydown', this.handleKeyDown);
        }
    };
    
    standardpopup._init();
};
