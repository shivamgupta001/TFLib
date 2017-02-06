/**
 * @author Shivam Gupta 8 Jan 2017
 * @class TFDraggable
 * @property {string} childSel - child selector which will get dragged [ popup visible ]
 * @property {string} parentSel - parent selector which will cover draggable area [popup background]
 * @property {string} elemSel - area of child which is draggable [ popup header draggable] 
 */
TFLib.TFDraggable = function() {

    var draggable = {

        scope: this,

        _init: function() {
            this._initialize();
            this._bindEvents();
        },
        _initialize: function() {

            var me = this.scope;

            this.childEl = document.querySelector(me.childSel);
            this.parentEl = document.querySelector(me.parentSel);
            this.elemEl = document.querySelector(me.elemSel);
            
        },
        _bindEvents: function() {

            // mouse down event binding with current scope
            this._handleMouseDown = this._handleMouseDown.bind(this);
            this.childEl.addEventListener('mousedown', this._handleMouseDown);

            // mouse up event binding with current scope
            this._handleMouseUp = this._handleMouseUp.bind(this);
            this.childEl.addEventListener('mouseup', this._handleMouseUp);

        },
        _handleMouseDown: function(e) {
            
            if ($(this.elemEl).find(e.target).length === 1 || this.elemEl === e.target ) {
                if(e.buttons !== 2){

                    this.activeEl = document.activeElement;
                    
                    var X = e.clientX, // x-coordinate in window where clicked to start drag
                        Y = e.clientY, // y-coordinate in window where clicked to start drag

                    childTop = +this.childEl.getBoundingClientRect().top, // child top wrt parent  
                    childLeft = +this.childEl.getBoundingClientRect().left; // child left wrt parent

                    // child width and height 
                    this.childWidth = +this.childEl.getBoundingClientRect().width,
                    this.childHeight = +this.childEl.getBoundingClientRect().height,

                    // parent width and height
                    this.parentWidth = +this.parentEl.getBoundingClientRect().width,
                    this.parentHeight = +this.parentEl.getBoundingClientRect().height;



                    this.orgX = X - childLeft, // top left x - coordinate of child
                    this.orgY = Y - childTop, // top left y - coordinate of child

                    // mouse move binded with current scope
                    this._handleMouseMove = this._handleMouseMove.bind(this),
                    document.addEventListener('mousemove', this._handleMouseMove);

                    // required when cursor goes outside containing area and then mouse up fires
                    document.addEventListener('mouseup', this._handleMouseUp);

                    // solution for mouse getting attached to popup forever...
                    e.preventDefault();   
                }
            }
        },
        _handleMouseMove: function(e) {
            
            var X = e.clientX, // new x-coordinate in window where moved
                Y = e.clientY, // new y-coordinate in window where moved
                curX = X - this.orgX, // new top left x - coordinate of child
                curY = Y - this.orgY; // new top left y - coordinate of child

            if (curX < 0) curX = 0;
            if (curY < 0) curY = 0;

            if (curX + this.childWidth > this.parentWidth)
                curX = this.parentWidth - this.childWidth;
            if (curY + this.childHeight > this.parentHeight)
                curY = this.parentHeight - this.childHeight;

            this.childEl.style.cursor = 'move';
            this._move(curX, curY);
        },
        _handleMouseUp: function(e) {
            
            // on mouse up remove mousemove event
            document.removeEventListener('mousemove', this._handleMouseMove);
            this.childEl.style.cursor = 'default';

            if ($(this.elemEl).find(e.target).length === 1 || this.elemEl === e.target ) {
                if(e.buttons !== 2){

                    //focus back to last active element
                    setTimeout(function() {
                        if(this.activeEl)
                            this.activeEl.focus();
                    }.bind(this), 100);
                }
            }
            document.removeEventListener('mouseup', this._handleMouseUp);        
        },
        _move: function(xpos, ypos) {

            this.childEl.style.left = xpos + 'px';
            this.childEl.style.top = ypos + 'px';
        }
    };
    draggable._init();
};
