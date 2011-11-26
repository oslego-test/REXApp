var Crawlers = {};

Crawlers["BRD"] = new Crawler({
  url: "http://www.brd.ro/piete-financiare/piata-valutara-si-monetara/curs-de-schimb/",
  rowXPath: '//div[@id="content"]//table[1]//td/table/tr',
  id: "BRD",
  parser: function(data){
  
    var rows = data.query.results.tr;
    var results = [];
    
    for (var i=0, len = rows.length; i<len; i++ ){
      // the currency code node
      var currNode = rows[i].td[1];
      
      // the buy value node
      var buyNode = rows[i].td[5];
      
      // the sell value node
      var sellNode = rows[i].td[6];    
      
      if (currNode && currNode.p && currNode.p.length == 3){
        // storage for the node output
        var resultNode = {};
        
        resultNode.bank = this.id;
        resultNode.currency = currNode.p;
        
        
        resultNode.buy = this.getCurrencyValue(buyNode.p);        
        resultNode.sell = this.getCurrencyValue(sellNode.p)
        
        results.push(resultNode);
      }
    }
   
    this.trigger("complete", { "results": results });
  }
});

Crawlers["BCR"] = new Crawler({
  url: "https://www.bcr.ro/ro/curs-valutar",
  rowXPath: '//div[@id="main0BCRExchange_result"]/table/tr',
  id: "BCR",
  parser: function(data){
  
    var rows = data.query.results.tr;
    var results = [];
    
    for (var i=0, len = rows.length; i<len; i++ ){
      
      try{
        // the currency code node
        var currNode = rows[i].td[1];
    
        // the buy value node
        var buyNode = rows[i].td[2];
        
        // the sell value node
        var sellNode = rows[i].td[3];    
        
        if (currNode && currNode.p){
  
          // storage for the node output
          var resultNode = {};
          
          resultNode.bank = this.id;
          resultNode.currency = this.getCurrencyCode(currNode.p);
  
          // return if there's no valid currency code
          if (resultNode.currency.length != 3){
              return false;
          }
          resultNode.buy = this.getCurrencyValue(buyNode.p);
          resultNode.sell = this.getCurrencyValue(sellNode.p)
          
          
          results.push(resultNode);
        }
      }
      catch(e){
          this.trigger("error", { "message": "Parsing error","error": e });
      }
    }
   
    this.trigger("complete", { "results": results });
  }
});

Crawlers["AlphaBank"] = new Crawler({
  url: "https://www.alphabank.ro/ro/rate/rate_si_dobanzi.php",
  rowXPath: '//table[@class="tabela_principala"]/tr[6]/td[4]/table[2]/tr',
  id: "AlphaBank",
  parser: function(data){
  
    var rows = data.query.results.tr;
    var results = [];
    
    for (var i=0, len = rows.length; i<len; i++ ){
      
      try{
        // the currency code node
        var currNode = rows[i].td[0];
    
        // the buy value node
        var buyNode = rows[i].td[4];
        
        // the sell value node
        var sellNode = rows[i].td[5];    
        
        if (currNode && currNode.p){
  
          // storage for the node output
          var resultNode = {};
          
          resultNode.bank = this.id;
          resultNode.currency = this.getCurrencyCode(currNode.p);
  
          // return if there's no valid currency code
          if (resultNode.currency.length != 3){
              return false;
          }
          
          resultNode.buy = this.getCurrencyValue(buyNode.p);
          resultNode.sell = this.getCurrencyValue(sellNode.p)          
          
          results.push(resultNode);
        }
      }
      catch(e){
         this.trigger("error", { "message": "Parsing error","error": e });
      }
    }
   
    this.trigger("complete", { "results": results });
  }
})

Crawlers["PiraeusBank"] = new Crawler({
  url: "http://www.piraeusbank.ro/Banca/Unelte/Istoric-Curs-Valutar.html",
  rowXPath: '//table[@id="ctl00_contentPlaceHolder_ctl02_gvIstoricCursValutar"]/tr',
  id: "PiraeusBank",
  parser: function(data){
  
    var rows = data.query.results.tr;
    var results = [];
    
    for (var i=0, len = rows.length; i<len; i++ ){
      
      try{
        // the currency code node
        var currNode = rows[i].td[1].span.content;
    
        // the buy value node
        var buyNode = rows[i].td[2];
        
        // the sell value node
        var sellNode = rows[i].td[3];    
        
        if (currNode){
  
          // storage for the node output
          var resultNode = {};
          
          resultNode.bank = this.id;
          resultNode.currency = this.getCurrencyCode(currNode);
  
          // return if there's no valid currency code
          if (resultNode.currency.length != 3){
              return false;
          }
          
          resultNode.buy = this.getCurrencyValue(buyNode.span.content);
          resultNode.sell = this.getCurrencyValue(sellNode.span.content);
          
          
          results.push(resultNode);
        }
      }
      catch(e){
          this.trigger("error", { "message": "Parsing error","error": e });
      }
    }
   
    this.trigger("complete", { "results": results });
  }
});

Crawlers["CEC"] = new Crawler({
  url: "https://www.cec.ro/curs-valutar.aspx",
  rowXPath: '//div[@id="content-b"]/div[2]/table/tr',
  id: "CEC",
  parser: function(data){
  
    var rows = data.query.results.tr;
    var results = [];
    
    for (var i=0, len = rows.length; i<len; i++ ){
      
      try{
        // the currency code node
        var currNode = rows[i].td[0].p;
    
        // the buy value node
        var buyNode = rows[i].td[1];
        
        // the sell value node
        var sellNode = rows[i].td[2];    
        
        if (currNode){
  
          // storage for the node output
          var resultNode = {};
          
          resultNode.bank = this.id;
          resultNode.currency = this.getCurrencyCode(currNode);
  
          // return if there's no valid currency code
          if (resultNode.currency.length != 3){
              return false;
          }
          
          resultNode.buy = this.getCurrencyValue(buyNode.p);
          resultNode.sell = this.getCurrencyValue(sellNode.p);
          
          
          results.push(resultNode);
        }
      }
      catch(e){
          this.trigger("error", { "message": "Parsing error","error": e });
      }
    }

    if (results.length){
      this.trigger("complete", { "results": results });
    }
    
  }
})

Crawlers["BT"] = new Crawler({
  url: "http://www.bancatransilvania.ro/bt/curs_valutar_spot.html",
  rowXPath: '/html/body/table/tr[3]/td[@class=\'main_table\']/table/tr[3]/td/table/tr/td/table/tr[5]/td[2]/table/tr[4]/td/table/tr',
  id: "BT",
  parser: function(data){
  
    var rows = data.query.results.tr;
    var results = [];
    
    for (var i=0, len = rows.length; i<len; i++ ){
      
      try{
        // the currency code node
        var currNode = rows[i].td[2].p;
    
        // the buy value node
        var buyNode = rows[i].td[5];
        
        // the sell value node
        var sellNode = rows[i].td[6];    
        
        if (currNode){
  
          // storage for the node output
          var resultNode = {};
          
          resultNode.bank = this.id;
          resultNode.currency = this.getCurrencyCode(currNode);
  
          // return if there's no valid currency code
          if (resultNode.currency.length != 3){
              return false;
          }
          
          resultNode.buy = this.getCurrencyValue(buyNode.p);
          resultNode.sell = this.getCurrencyValue(sellNode.p);
          
          
          results.push(resultNode);
        }
      }
      catch(e){
          this.trigger("error", { "message": "Parsing error","error": e });
      }
    }

    if (results.length){
      this.trigger("complete", { "results": results });
    }
    
  }
});

Crawlers["Volksbank"] = new Crawler({
  url: "http://www.volksbank.ro/ro/AfisareCursValutar",
	rowXPath: '//table[@id="tr-no-line"]/tr[3]/td[2]/table/tr[8]/td/div/table/tr',
	id: "Volksbank",
	parser: function(data){

		var rows = data.query.results.tr;
		var results = [];

		for (var i=0, len = rows.length; i<len; i++ ){

			try{
				// the currency code node
				var currNode = rows[i].td[0];

				// the buy value node
				var buyNode = rows[i].td[2];

				// the sell value node
				var sellNode = rows[i].td[3];

				if (currNode){

					// storage for the node output
					var resultNode = {};

					resultNode.bank = this.id;
					resultNode.currency = this.getCurrencyCode(currNode.span);

					// return if there's no valid currency code
					if (resultNode.currency.length != 3){
							return false;
					}

					resultNode.buy = this.getCurrencyValue(buyNode.span);
					resultNode.sell = this.getCurrencyValue(sellNode.span);


					results.push(resultNode);
				}
			}
			catch(e){
					this.trigger("error", { "message": "Parsing error","error": e });
			}
		}

		if (results.length){
			this.trigger("complete", { "results": results });
		}

  }
});

Crawlers["Raiffeisen"] = new Crawler({
  url: "http://www.raiffeisen.ro/curs-valutar",
  rowXPath: '//div[@class="rzbContentTextNormal"]/table/tr',
  id: "Raiffeisen Bank",
  parser: function(data){

    var rows = data.query.results.tr;
    var results = [];

    for (var i=0, len = rows.length; i<len; i++ ){
  
      try{
        // the currency code node
        var currNode = rows[i].td[1].p;

        // the buy value node
        var buyNode = rows[i].td[5];
    
        // the sell value node
        var sellNode = rows[i].td[6];    
    
        if (currNode){

          // storage for the node output
          var resultNode = {};
      
          resultNode.bank = this.id;
          resultNode.currency = this.getCurrencyCode(currNode);

          // return if there's no valid currency code
          if (resultNode.currency.length != 3){
              return false;
          }
      
          resultNode.buy = this.getCurrencyValue(buyNode.p);
          resultNode.sell = this.getCurrencyValue(sellNode.p);
      
      
          results.push(resultNode);
        }
      }
      catch(e){
          this.trigger("error", { "message": "Parsing error","error": e });
      }
    }

    if (results.length){
      this.trigger("complete", { "results": results });
    }

  }
});