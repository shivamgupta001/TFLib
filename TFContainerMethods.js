var TFContainerMethods = function() {

    // display property handlers
    this.displayHide = function() {
        this.innerComp.style.display = "none";
    };
    this.displayShow = function() {
        this.innerComp.style.display = "";
    };
    
    //visibility property handlers
    this.visibleHide = function() {
        this.innerComp.style.visibility = "hidden";
    };
    this.visibleShow = function() {
        this.innerComp.style.visibility = "";
    };

    // add remove class handlers
    this.addClass = function(newClass){
		newClass = newClass.constructor === Array ? newClass : [newClass];  
		this.innerComp.classList.add.apply(this.innerComp.classList , newClass);
	};
	this.removeClass = function(oldClass){
		oldClass = oldClass.constructor === Array ? oldClass : [oldClass];
		this.innerComp.classList.remove.apply(this.innerComp.classList , oldClass);
	};
    
    // appending dom handlers
    this.appendDom = function(newItem){
    	this.innerComp.append(newItem);
    };
    this.prependDom = function(newItem){
    	this.innerComp.insertBefore(newItem , this.innerComp.childNodes[0]);
    };
    this.insertDomAt = function(newItem , index){
    	this.innerComp.insertBefore(newItem , this.innerComp.childNodes[index]);
    };

};
