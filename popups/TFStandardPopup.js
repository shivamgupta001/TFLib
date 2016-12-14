/**
 * @author Shivam Gupta 
 * @constructor TFStandardPopup
 * @property {string} popupId - popupId non existing value otherwise gives error
 * @property {string} title - title will be displayed in header part
 * @property {function} modalCloseCallback - provide handle called when popup closed via Escape or click over close button
 * @property {function} modalOpenCallback - provide handle called when popup is inserted in DOM
 * @property {function} popupOnOk - callback handle to run when ok button clicked
 * @property {function} popupOnCancel - callback handle to run when cancel button clicked
 */
 
TFLib.ErrorPopup = function(config) {
    
    config.title = config.title || 'Error';
    config.imgClassName = 'tf-error-icon';
    StandardPopup.call(config);
};
TFLib.InfoPopup = function(config) {

    config.title = config.title || 'Info';
    config.imgClassName = 'tf-info-icon';
    StandardPopup.call(config);
};
TFLib.ConfirmPopup = function(config) {
    
    config.title = config.title || 'Confirm';
    config.imgClassName = 'tf-confirm-icon';
    StandardPopup.call(config);
};
TFLib.SuccessPopup = function(config) {
    
    config.title = config.title || 'Success';
    config.imgClassName = 'tf-success-icon';
    StandardPopup.call(config);
};

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
            
            this.popupId = me.popupId || 'popupId-'+getRandomInt(1, 10000);
            this.msg = me.msg,
            this.title = me.title;
            this.imgClassName = me.imgClassName;
            this.modalOnClose = me.modalOnClose || '';
            this.modalOnOpen = me.modalOnOpen || '';
            this.popupOnOk = me.popupOnOk || '';
            this.popupOnCancel = me.popupOnCancel || '';
            this.OK = ( me.OK == false ) ? false : true;
            this.CANCEL = ( me.CANCEL == false ) ? false : true;
            this.OKVal = me.OKVal || 'OK';
            this.CANCELVal = me.CANCELVal || 'CANCEL';
            
        },
        _generateTemplate : function(){
            
            var elData = [
                '<div class="tf-std-popup">',
                    '<div class="tf-std-popup-icon"><span class="' + this.imgClassName + '"></span></div>',
                    '<div class="tf-std-popup-msg"><span>' + this.msg + '</span></div>',
                '</div>'
            ].join("\n");
                       
            this.childTemplateData = $(elData)[0];
            
            var elFooter = [
                '<div>',
                    (this.OK ? '<input type="button" value="'+this.OKVal+'" ModalPopupOKBtn="true" autofocus>' : ''),
                    (this.CANCEL ? '<input type="button" value="'+this.CANCELVal+'" ModalPopupCancelBtn="true">' : ""),
                '</div>'
            ].join("\n");
            
            this.childTemplateFooter = $(elFooter)[0];
            
        },
        _cacheDom : function(){

            this.innerComp = this.childTemplateData;
            this.footerComp = this.childTemplateFooter;
            this.okComp = this.footerComp.querySelector('[ModalPopupOKBtn="true"]');
            this.cancelComp = this.footerComp.querySelector('[ModalPopupCancelBtn="true"]');

        },
        _applyProperty : function(){

        },
        _bindEvents : function(){
            
            if(this.okComp) {
                this.okComp.addEventListener('click', handlePopupOnOk);
                this.okComp.addEventListener('blur', handleOkBlur);
            } 
             if(this.cancelComp) {
                this.cancelComp.addEventListener('click', handlePopupOnCancel);
                this.cancelComp.addEventListener('blur', handleCancelBlur);
            }        
            
        },
        _attachProperties : function(){

        },
        _render : function(){
            
            TFLib.ModalPopup({
                styles: {
                    minWidth : '400px',
                    maxWidth : '500px',
                    minHeight : '180px' 
                },
                footerTemplate : this.footerComp,
                title: this.title,
                popupId: this.popupId,
                dataTemplate: this.innerComp,
                modalOnClose: this.modalOnClose,
                modalOnOpen: this.modalOnOpen,
                onConfig: true,
                resizable: false,
                footerVisible : false
            }).show();
            debugger;
        },
        function handleOkBlur() {
            if (OK && CANCEL) {
                // For IE
                cacheVar.$btnCancel.focus();
                //For Chrome & Moz
                cacheVar.$btnCancel.attr('tabindex', 10000);
                cacheVar.$btnOk.attr('tabindex', 10001);
            }
        },
        function handleCancelBlur() {
            if (OK && CANCEL) {
                //For IE
                cacheVar.$btnOk.focus();
                //For Chrome & Moz
                cacheVar.$btnCancel.attr('tabindex', 10001);
                cacheVar.$btnOk.attr('tabindex', 10000);
            }
        },
        function handlePopupOnOk(e) {
            if (popupOnOk != '')
                popupOnOk();
            destroy();
            cacheVar.$close.trigger('click');
        },
        function handlePopupOnCancel(e) {
            if (popupOnCancel != '')
                popupOnCancel();
            destroy();
            cacheVar.$close.trigger('click');
        }
    };
    
    standardpopup._init();

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
};
/*function generatePopup(title, imgClassName, config) {

    var popupId = config.popupId || "popupId-" + getRandomInt(1, 10000),
        msg = config.msg,
        modalOnClose = config.modalOnClose || '',
        modalOnOpen = config.modalOnOpen || '',
        popupOnOk = config.popupOnOk || '',
        popupOnCancel = config.popupOnCancel || '',
        OK = (config.OK == false) ? false : true,
        CANCEL = (config.CANCEL == false) ? false : true,
        OKVal = null,
        CANCELVal = null,
        dataTemplate, cacheVar = {};

    var init = function() {
        generateTemplate();
        cacheDom();
        bindEvents();
        render();
    };
    var cacheDom = function() {

        cacheVar.$footer = cacheVar.$dataTemplate.find('.popup-footer-btn');
        if (OK) {
            OKVal = config.OKVal || 'OK';
            cacheVar.$btnOk = $('<input type="button" value="' + OKVal + '" ModalPopupOKBtn="true" autofocus/>');
        }
        if (CANCEL) {
            CANCELVal = config.CANCELVal || 'CANCEL';
            cacheVar.$btnCancel = $('<input type="button" value="' + CANCELVal + '" ModalPopupCancelBtn="true"/>');
        }
    };
    var generateTemplate = function() {
        cacheVar.$dataTemplate = $(' <div class="modal-popup"> \
                    <div class="modal-popup-icon"><span class="' + imgClassName + '"></span></div> \
                    <div class="modal-popup-text"><span>' + msg + '</span></div> \
                </div>');
    };

    var bindEvents = function() {
        if (OK) {
            cacheVar.$btnOk.on({
                'click': handlePopupOnOk,
                'blur': handleOkBlur
            });
        }
        if (CANCEL) {
            cacheVar.$btnCancel.on({
                'click': handlePopupOnCancel,
                'blur': handleCancelBlur
            });
        }
    };

    var render = function() {
        if (OK) cacheVar.$footer.append(cacheVar.$btnOk);
        if (CANCEL) cacheVar.$footer.append(cacheVar.$btnCancel);


        var newPopup = ModalPopup({
            width: 600,
            height: 178,
            title: title,
            popupId: popupId,
            dataTemplate: cacheVar.$dataTemplate,
            modalOnClose: modalOnClose,
            modalOnOpen: modalOnOpen,
            onConfig: true,
            resizable: false,
            footerVisible : false
        }).show();
        cacheVar.$close = $('#' + popupId).find(".modal-close-btn");

        if (imgClassName == 'confirmPopupIcon') cacheVar.$close.hide();
        if (OK && CANCEL) handleCancelBlur();
    }

    function handleOkBlur() {
        if (OK && CANCEL) {
            // For IE
            cacheVar.$btnCancel.focus();
            //For Chrome & Moz
            cacheVar.$btnCancel.attr('tabindex', 10000);
            cacheVar.$btnOk.attr('tabindex', 10001);
        }
    }

    function handleCancelBlur() {
        if (OK && CANCEL) {
            //For IE
            cacheVar.$btnOk.focus();
            //For Chrome & Moz
            cacheVar.$btnCancel.attr('tabindex', 10001);
            cacheVar.$btnOk.attr('tabindex', 10000);
        }
    }

    function handlePopupOnOk(e) {
        if (popupOnOk != '')
            popupOnOk();
        destroy();
        cacheVar.$close.trigger('click');
    }

    function handlePopupOnCancel(e) {
        if (popupOnCancel != '')
            popupOnCancel();
        destroy();
        cacheVar.$close.trigger('click');

    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function destroy() {
        if (OK) cacheVar.$btnOk.off();
        if (CANCEL) cacheVar.$btnCancel.off();
    }
    init();
}*/
