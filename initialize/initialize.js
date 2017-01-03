/**
 * @namespace TFLib
 */
var TFLib = TFLib || {};


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

