var TFContainerMethods = function() {

    // display property handlers
    this.displayHide = function() {
        this.outerComp.style.display = "none";
    };
    this.displayShow = function() {
        this.outerComp.style.display = "";
    };
    
    // add remove style
    this.addStyle = function(prop , val){
        this.outerComp.style[prop] = val;
    };
    this.removeStyle = function(prop){
        this.outerComp.style[prop] = '';
    };
  
    //visibility property handlers
    this.visibleHide = function() {
        this.outerComp.style.visibility = "hidden";
    };
    this.visibleShow = function() {
        this.outerComp.style.visibility = "";
    };

    // add remove class handlers
    this.addClass = function(newClass){
		newClass = newClass.constructor === Array ? newClass : [newClass];  
		this.outerComp.classList.add.apply(this.outerComp.classList , newClass);
	};
	this.removeClass = function(oldClass){
		oldClass = oldClass.constructor === Array ? oldClass : [oldClass];
		this.outerComp.classList.remove.apply(this.outerComp.classList , oldClass);
	};
    
    // appending dom handlers
    this.appendDom = function(newItem){
    	this.outerComp.appendChild(newItem);
    };
    this.prependDom = function(newItem){
    	this.outerComp.insertBefore(newItem , this.outerComp.childNodes[0]);
    };
    this.insertDomAt = function(newItem , selector){
    	this.outerComp.insertBefore(newItem , this.outerComp.querySelector(selector));
    };

};
