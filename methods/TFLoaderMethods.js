
TFLib.TFLoaderMethods = function(){

	
	/**This method will add class to inner comp
      * @memberof TFLoaderMethods
      * @param {string|string[]} newClass - pass classes
      */
	this.addInnerClass = function(newClass){
		newClass = newClass.constructor === Array ? newClass : [newClass];  
		this.innerComp.classList.addmany(newClass);
	};
	/**This method will remove class from inner comp
      * @memberof TFLoaderMethods
      * @param {string|string[]} oldClass - pass oldClass will be removed to classList
      */
	this.removeInnerClass = function(oldClass){
		oldClass = oldClass.constructor === Array ? oldClass : [oldClass];
		this.innerComp.classList.removemany(oldClass);
	};

	/**This method will show loader 
      * @memberof TFLoaderMethods
      * @param {string} loader text 
      */
	this.show = function(loaderText){
		this.loaderCount++;
		if(loaderText) this.innerComp.loaderText.innerText = loaderText;
		this.outerComp.style["display"] = "table";
		this.activeElement = document.activeElement;
		this.outerComp.focus();
	}

	/**This method will hide loader 
      * @memberof TFLoaderMethods
      */
	this.hide = function(){
		if (--this.loaderCount <= 0){
			this.loaderCount;
			this.outerComp.style["display"] = "none";
			this.innerComp.loaderImage.innerHTML = this.innerComp.initLoaderImage;
			this.innerComp.loaderText.innerText = this.innerComp.initLoaderText;
			this.activeElement.focus();
		}
		
	}

	/**This method will show loader 
      * @memberof TFLoaderMethods
      * @param {string} loader image 
      * @param {boolean} true if set as default
      */
	this.changeLoaderImage = function(loaderImage, isDefault){
		if(loaderImage) {
			if (isDefault) 
				this.innerComp.loaderImage.innerHTML = this.innerComp.initLoaderImage = loaderImage;
			else
				this.innerComp.loaderImage.innerHTML = loaderImage;		}
	}

	/**This method will show loader 
      * @memberof TFLoaderMethods
      * @param {string} loader text 
      * @param {boolean} true if set as default
      */
	this.changeLoaderText = function(loaderText, isDefault){
		if(loaderText) {
			if (isDefault) 
				this.innerComp.loaderText.innerHTML = this.innerComp.initLoaderText = loaderText;
			else
				this.innerComp.loaderText.innerHTML = loaderText;
		}
	}

	/**This method will set attribute to inner comp
      * @memberof TFLoaderMethods
      * @param {string} attrName - attribute name to set
      * @param {string} attrval - attribute value to set
      */
	this.setAttribute = function( attrName , attrVal){
		this.innerComp.setAttribute(attrName , attrVal);
	};
	/**This method will remove attribute from inner comp
      * @memberof TFLoaderMethods
      * @param {string} attrName - attribute name to remove
      */
	this.removeAttribute = function(attrName){
		this.innerComp.removeAttribute(attrName);
	};
};