var TFEvents = {
	events : {},
	on : function(eventName , fn){
		this.events[eventName] = this.events[eventName] || [];
		this.events[eventName].push(fn);
	},
	off : function(eventName , fn){
		if(this.events[eventname]){
			for(var i=0;i< this.events[eventname].length; i++){
				if(this.events[eventName] === fn){
					this.events[eventName].splice(i,1);
					break;
				}
			}
		}
	},
	emit : function(eventName, data){
		if(this.events[eventName]){
			this.events[eventName].forEach(function(fn){
				fn(data);
			});
		}
	}

}