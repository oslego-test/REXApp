/** 
    @class
    EventManager is an object used to listen for, and dispatch, events.
    It can be used stand alone, or it can be inherited by another object.
    
    The EventManager's bind() method is similar to element.addEventListener().
    The EventManager's trigger() method is similar to element.dispatchEvent().
*/
/**
    @example
    <script type="text/javascript">
        
        var em = new EventManager(); 
        
        // add an event listener for a custom event
        em.bind("customEvent", function(data){ 
            alert(data.msg) 
        });
         
        // trigger a custom event with some data
        em.trigger("customEvent", {msg: "Hello World!"});
        
    </script>
*/
function EventManager(){
};

/** 
    Storage for the events and callback functions
*/  
EventManager.prototype.events = {}

/**
    Store an event listener for this instance.
    
    Provides a 'privileged' access to this.events store. Because of this it is defined in the constructor, 
    not directly through the prototype object.
    
    @param {String} eventName The name of the event to listen to.
    @param {Function} func The callback function to be called when the eventName is triggered.
    @param {Object} [context] Optional in which to execute the associated callback. Default: 'window'.
    
    @returns {Undefined}
*/
EventManager.prototype.bind = function(eventName, func, context){   
    
    // Create a storage for this custom event name if none exists
    if (!this.events[eventName]){
        this.events[eventName] = [];
    }             

    this.events[eventName].push({fn: func, ctx: context || this})
}

/**
    Execute the callback functions associated with a custom event for this instance.
    
    Provides a 'privileged' access to this.events store. Because of this it is defined in the constructor, 
    not directly through the prototype object.
    
    @param {String} eventName The name of the event for which to call the callback functions.
    @param {Object} [eventObj] Optional object with data to be used by the callback functions.  
    
    @returns {Undefined}
*/
EventManager.prototype.trigger = function(eventName, eventObj){  
	if (this.events[eventName]){
		this.events[eventName].map(function(cbObj){
			cbObj.fn.call(cbObj.ctx, eventObj)
		})
	}
}

function Crawler(settings){
  var _crawlService = "http://query.yahooapis.com/v1/public/yql/oslego/crawler";
  this.id = settings.id;
  this.url = settings.url;
  this.rowXPath = settings.rowXPath;
  this.parser = settings.parser || function (){};
  
  this.getCrawlServiceURL =  function(){
    return _crawlService + "?format=json" + "&url=" + encodeURIComponent(this.url) + "&xpath="+ encodeURIComponent(this.rowXPath);
  }

  this.events = {}
}

Crawler.prototype = EventManager.prototype;
 
Crawler.prototype.init = function(){
  var crawlerServiceURL = this.getCrawlServiceURL();
  
  var response = UrlFetchApp.fetch(crawlerServiceURL);
  var data = Utilities.jsonParse(response.getContentText());
  
  this.trigger("start", {message: "yahoo!"});

  if (typeof this.parser == "function"){
    this.parser.call(this, data);
  }
};

Crawler.prototype.getCurrencyValue = function(string){
    if (!string || typeof string !== "string"){
        return null
    }

    var floatString = string.replace(",",".");
    var value = parseFloat(floatString);
    
    if (!isNaN(value)){
        return value;
    }
};

/*
Takes a natural language string and tries to match a valid currency code.
@param {String} string 
	natural language string to be decoded.
	
@return {String}, null 
	string with the currency code. Example: USD	
	null if no currency code could be found.
	
Example: getCurrencyCode("USD") -> USD
Example: getCurrencyCode("usd") -> USD
Example: getCurrencyCode("Dolar american") -> USD
Example: getCurrencyCode("100 Forinti Ungaria") -> HUF
Example: getCurrencyCode("Skittles") -> null
*/

Crawler.prototype.getCurrencyCode = function(string){
    
    // remove non-word characters and digits optionally borderd by whitespace
    var string = string.replace(/\s*[\*]+\s*/, "").replace(/\s*\d+\s*/,"");

    // TODO: remove functions, keep key/value store and test patter in the iteration
	var _currencyTests = {
		// euro
		eur: function(str){ 
			var pattern =  /\beuro?\b>*/gi;
			return pattern.test(str) 
		},
		
		// dolar american
		usd: function(str){
			var pattern =  /\bdolar(ul|i{0,2})?\b\s*\bamerica(n|ni)?|s\.?u\.?a\.?\b/gi;
			return pattern.test(str) 
		},
		
		// dolar australian
		aud: function(str){
			var pattern =  /\bdolar(ul|i{0,1})?\b(\s*\baustrali(a|an|ani|eni)\b)/gi;
			return pattern.test(str) 
		},
		
		// dolar canada
		cad: function(str){
			var pattern =  /\bdolar(ul|i{0,1})?\b\s*\bcanad(a|ian|ieni)\b/gi;
			return pattern.test(str) 
		},
	
		// franc elvetian
		chf: function(str){
			var pattern =  /\bfranc(ul|i{0,1})?\b\s*\belveti(an|eni)\b/gi;
			return pattern.test(str) 
		},
	
		// coroana suedeza
		sek: function(str){
			var pattern =  /\bcoroan(a|e)\b\s*\bsued(ia|eza|eze)\b/gi;
			return pattern.test(str) 
		},
		
		// coroana daneza
		dkk: function(str){
			var pattern =  /\bcoroan(a|e)\b\s*\bdane(marca|za|ze)\b/gi;
			return pattern.test(str) 
		},

		// coroana islandeza
		ikk: function(str){
			var pattern =  /\bcoroan(a|e)\b\s*\bisland(a|eza|eze)\b/gi;
			return pattern.test(str) 
		},

		// coroana norvegiena
		nok: function(str){
			var pattern =  /\bcoroan(a|e)\b\s*\bnorvegi(a|ana|ene)\b/gi;
			return pattern.test(str) 
		},
		
		// lirea sterlina
		gbp: function(str){
			var pattern =  /\blir(a|e)\b\s*\bsterlin(a|e)\b/gi;
			return pattern.test(str) 
		},
	
		// yen japonez
		jpy: function(str){
			var pattern =  /\byen(i{0,1}|ul)\b\s*\bjapon(ia|ez|ezi)\b/gi;
			return pattern.test(str) 
		},
		
		// forint unguresc
		huf: function(str){
			var pattern =  /\bforint(i{0,1}|ul)\b\s*\bung(aria|uresc|uresti)\b/gi;
			return pattern.test(str) 
		},
		
		// zlot polonez
		pln: function(str){
			var pattern =  /\bzlot(i{0,1}|ul)\b\s*\bpolon(ia|ez|ezi)\b/gi;
			return pattern.test(str) 
		},
		
		// corona ceha
		czk: function(str){
			var pattern =  /\bcoroan(a|e)\b\s*\bceh(a|ia|e|esti)\b/gi;
			return pattern.test(str) 
		},
		
		// rubla ruseasca
		rub: function(str){
			var pattern =  /\brubl(a|e)\b\s*\brus(a|ia|easca|esti)\b/gi;
			return pattern.test(str) 
		},
		
		// leva bulgara
		bgn: function(str){
			var pattern =  /\bleva\b\s*\bbulgar(a|ia|easca|e|esti)\b/gi;
			return pattern.test(str) 
		}		
	}
	
	// run a quick ckech on keys for simple currency codes
	if (string.length == 3){
    	for (var i in _currencyTests){
    	    if (i === string.toLowerCase()){
    	        return i.toUpperCase()
    	    }
    	}	    
	}
	
	// check against the regex values
	for (var i in _currencyTests){
		if (_currencyTests[i].call(this, string)){
		    return i.toUpperCase()
		}
	}

};

Crawler.prototype.getCurencyMultiplier = function(string){
	var digits = string.match(/\d+/);
	return digits ? parseInt(digits[0], 10) : 1;
};