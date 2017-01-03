/**
 * @namespace TFLib
 */
var TFLib = TFLib || {};

if(!'selectedOptions' in document.createElement('select')){
    
    Object.defineProperty(HTMLSelectElement.prototype, "selectedOptions", {
        get: (function() {
            try {
                document.querySelector(":checked");
                return function() {
                    return this.querySelectorAll(":checked");
                };
            } catch (e) {
                return function() {
                    if (!this.multiple) {
                        return this.selectedIndex >= 0
                                ? [this.options[this.selectedIndex]] : [];
                    }
                    for (var i = 0, a = []; i < this.options.length; i++)
                        if (this.options[i].selected) a.push(this.options[i]);
                    return a;
                };
            }
        })()
    });    
}


// For IE [Does not support elem.classList.add.apply(elem.classList , ['class1','class2'])]	
DOMTokenList.prototype.addmany = function(arrClassList) {
    arrClassList.forEach(function(val){
    	this.add(val);
    }.bind(this));
};


// For IE [Does not support elem.classList.add.apply(elem.classList , ['class1','class2'])]
DOMTokenList.prototype.removemany = function(arrClassList) {
    arrClassList.forEach(function(val){
    	this.remove(val);
    }.bind(this));
};

