module("Currency Codes")
test('Simple 3 letter currency codes', function() {
    
    var crawler = new Crawler({
        id: "test crawler"
    })
    
    equal(crawler.getCurrencyCode("EUR"), "EUR", "Euro");
    equal(crawler.getCurrencyCode("eur"), "EUR", "Euro");
    
    equal(crawler.getCurrencyCode("USD"), "USD", "Dolari americani");
    equal(crawler.getCurrencyCode("usd"), "USD", "Dolari americani");
    
    equal(crawler.getCurrencyCode("AUD"), "AUD", "Dolari australieni");
    equal(crawler.getCurrencyCode("aud"), "AUD", "Dolari australieni");
    
    equal(crawler.getCurrencyCode("CAD"), "CAD", "Dolari canadieni");
    equal(crawler.getCurrencyCode("cad"), "CAD", "Dolari canadieni");
    
    equal(crawler.getCurrencyCode("CHF"), "CHF", "Franci elvetieni");
    equal(crawler.getCurrencyCode("chf"), "CHF", "Franci elvetieni");
    
    equal(crawler.getCurrencyCode("SEK"), "SEK", "Coroane suedeze");
    equal(crawler.getCurrencyCode("sek"), "SEK", "Coroane suedeze");
    
    equal(crawler.getCurrencyCode("DKK"), "DKK", "Coroane daneze");
    equal(crawler.getCurrencyCode("dkk"), "DKK", "Coroane daneze");
    
    equal(crawler.getCurrencyCode("IKK"), "IKK", "Coroane islandeze");
    equal(crawler.getCurrencyCode("ikk"), "IKK", "Coroane islandeze");
    
    equal(crawler.getCurrencyCode("NOK"), "NOK", "Coroane norvegiene");
    equal(crawler.getCurrencyCode("nok"), "NOK", "Coroane norvegiene");
    
    equal(crawler.getCurrencyCode("GBP"), "GBP", "Lire sterline");
    equal(crawler.getCurrencyCode("gbp"), "GBP", "Lire sterline");
    
    equal(crawler.getCurrencyCode("JPY"), "JPY", "Yen japonez");
    equal(crawler.getCurrencyCode("jpy"), "JPY", "Yen japonez");
    
    equal(crawler.getCurrencyCode("HUF"), "HUF", "Forinti unguresti");
    equal(crawler.getCurrencyCode("huf"), "HUF", "Forinti unguresti");
    
    equal(crawler.getCurrencyCode("PLN"), "PLN", "Zlot polonez");
    equal(crawler.getCurrencyCode("pln"), "PLN", "Zlot polonez");
    
    equal(crawler.getCurrencyCode("CZK"), "CZK", "Coroana ceha");
    equal(crawler.getCurrencyCode("czk"), "CZK", "Coroana ceha");
    
    equal(crawler.getCurrencyCode("RUB"), "RUB", "Rubla ruseasca");
    equal(crawler.getCurrencyCode("rub"), "RUB", "Rubla ruseasca");
    
    equal(crawler.getCurrencyCode("BGN"), "BGN", "Leva bulgaresti");
    equal(crawler.getCurrencyCode("bgn"), "BGN", "Leva bulgaresti");

});

test('3 letter currency codes with non-word characters', function() {
    
    var crawler = new Crawler({
        id: "test crawler"
    });
    
    equal(crawler.getCurrencyCode("HUF*"), "HUF", "HUF*");
    equal(crawler.getCurrencyCode("HUF *"), "HUF", "HUF *");    
    equal(crawler.getCurrencyCode("HUF**"), "HUF", "HUF**");
    equal(crawler.getCurrencyCode("HUF*100"), "HUF", "HUF*100");
    equal(crawler.getCurrencyCode("HUF100"), "HUF", "HUF100");
    equal(crawler.getCurrencyCode("100HUF"), "HUF", "100HUF");
    equal(crawler.getCurrencyCode("100 HUF"), "HUF", "100 HUF");
});

test('Natural language currency codes', function() {
    
    var crawler = new Crawler({
        id: "test crawler"
    });
    
    // eur
    equal(crawler.getCurrencyCode("Euro"), "EUR", "Euro");
    
    // usd
    equal(crawler.getCurrencyCode("1 DOLAR SUA"), "USD", "1 DOLAR SUA");
    equal(crawler.getCurrencyCode("1 DOLAR American"), "USD", "1 DOLAR American");
    equal(crawler.getCurrencyCode("DOLAR SUA"), "USD", "DOLAR SUA");
    equal(crawler.getCurrencyCode("Dolar S.U.A."), "USD", "Dolar S.U.A.");
    equal(crawler.getCurrencyCode("Dolarul S.U.A."), "USD", "Dolarul S.U.A.");
    equal(crawler.getCurrencyCode("Dolarul american"), "USD", "Dolarul american");
    equal(crawler.getCurrencyCode("Dolari americani"), "USD", "Dolari americani");
    equal(crawler.getCurrencyCode("Dolarii americani"), "USD", "Dolarii americani");
    
    // aud
    equal(crawler.getCurrencyCode("1 DOLAR AUSTRALIAN"), "AUD", "1 DOLAR AUSTRALIAN");
    equal(crawler.getCurrencyCode("DOLAR AUSTRALIAN"), "AUD", "DOLAR AUSTRALIAN");
    equal(crawler.getCurrencyCode("Dolari Australia"), "AUD", "Dolari Australia");
    equal(crawler.getCurrencyCode("Dolari Australiani"), "AUD", "Dolari Australiani");
    equal(crawler.getCurrencyCode("Dolari Australieni"), "AUD", "Dolari Australieni");
    
    
    // cad
    equal(crawler.getCurrencyCode("1 DOLAR CANADA"), "CAD", "1 DOLAR CANADA");
    equal(crawler.getCurrencyCode("DOLAR CANADA"), "CAD", "DOLAR CANADA");
    equal(crawler.getCurrencyCode("Dolari Canada"), "CAD", "Dolari Canada");
    equal(crawler.getCurrencyCode("Dolar Canadian"), "CAD", "Dolar Canadian");
    equal(crawler.getCurrencyCode("Dolari Canadieni"), "CAD", "Dolari Canadieni");
    
    // chf
    equal(crawler.getCurrencyCode("1 FRANC ELVETIAN"), "CHF", "1 FRANC ELVETIAN");
    equal(crawler.getCurrencyCode("FRANC ELVETIAN"), "CHF", "FRANC ELVETIAN");
    equal(crawler.getCurrencyCode("Francul elvetian"), "CHF", "Francul elvetian");
    equal(crawler.getCurrencyCode("Franci elvetieni"), "CHF", "Franci elvetieni");
    
    // sek
    equal(crawler.getCurrencyCode("1 COROANA SUEDEZA"), "SEK", "1 COROANA SUEDEZA");
    equal(crawler.getCurrencyCode("COROANA SUEDEZA"), "SEK", "COROANA SUEDEZA");
    equal(crawler.getCurrencyCode("Coroana Suedia"), "SEK", "Coroana Suedia");
    equal(crawler.getCurrencyCode("Coroane Suedeze"), "SEK", "Coroane Suedeze");
    
    // dkk
    equal(crawler.getCurrencyCode("1 COROANA DANEZA"), "DKK", "1 COROANA DANEZA");
    equal(crawler.getCurrencyCode("COROANA DANEZA"), "DKK", "COROANA DANEZA");
    equal(crawler.getCurrencyCode("Coroana Danemarca"), "DKK", "Coroana Danemarca");
    equal(crawler.getCurrencyCode("Coroane Danemarca"), "DKK", "Coroane Danemarca");
    equal(crawler.getCurrencyCode("Coroane Daneze"), "DKK", "Coroane Daneze");
    
    // ikk
    equal(crawler.getCurrencyCode("1 COROANA ISLANDEZA"), "IKK", "1 COROANA ISLANDEZA");
    equal(crawler.getCurrencyCode("COROANA ISLANDEZA"), "IKK", "COROANA ISLANDEZA");
    equal(crawler.getCurrencyCode("Coroana Islanda"), "IKK", "Coroana Islanda");
    equal(crawler.getCurrencyCode("Coroane Islandeze"), "IKK", "Coroane Islandeze");
	
    // nok
    equal(crawler.getCurrencyCode("1 COROANA NORVEGIA"), "NOK", "1 COROANA NORVEGIA");
    equal(crawler.getCurrencyCode("COROANA NORVEGIA"), "NOK", "COROANA NORVEGIA");
    equal(crawler.getCurrencyCode("Coroana Norvegiana"), "NOK", "Coroana Norvegiana");
    equal(crawler.getCurrencyCode("Coroane Norvegiene"), "NOK", "Coroane Norvegiene");
    
    // gbp
    equal(crawler.getCurrencyCode("1 LIRA STERLINA"), "GBP", "1 LIRA STERLINA");
    equal(crawler.getCurrencyCode("LIRA STERLINA"), "GBP", "LIRA STERLINA");
    equal(crawler.getCurrencyCode("Lire Sterline"), "GBP", "Lire Sterline");
    
	// jpy
	equal(crawler.getCurrencyCode("1 YEN JAPONEZ"), "JPY", "1 YEN JAPONEZ");
	equal(crawler.getCurrencyCode("YEN JAPONEZ"), "JPY", "YEN JAPONEZ");
	equal(crawler.getCurrencyCode("Yen Japonia"), "JPY", "Yen Japonia");
	equal(crawler.getCurrencyCode("Yenul Japonia"), "JPY", "Yenul Japonia");
	equal(crawler.getCurrencyCode("Yenul Japonez"), "JPY", "Yenul Japonez");
	equal(crawler.getCurrencyCode("100 YENI JAPONEZI"), "JPY", "100 YENI JAPONEZI");
	equal(crawler.getCurrencyCode("Yeni Japonezi"), "JPY", "Yeni Japonezi");
	
	// pln
	equal(crawler.getCurrencyCode("1 ZLOT POLONIA"), "PLN", "1 ZLOT POLONIA");
	equal(crawler.getCurrencyCode("ZLOT POLONIA"), "PLN", "ZLOT POLONIA");
	equal(crawler.getCurrencyCode("Zlot Polonez"), "PLN", "Zlot Polonez");
	equal(crawler.getCurrencyCode("Zlotul Polonez"), "PLN", "Zlotul Polonez");
	equal(crawler.getCurrencyCode("Zloti Polonia"), "PLN", "Zloti Polonia");
	equal(crawler.getCurrencyCode("Zloti Polonezi"), "PLN", "Zloti Polonezi");
	
	// huf
	equal(crawler.getCurrencyCode("1 FORINT UNGARIA"), "HUF", "1 FORINT UNGARIA");
	equal(crawler.getCurrencyCode("FORINT UNGARIA"), "HUF", "FORINT UNGARIA");
	equal(crawler.getCurrencyCode("Forint Unguresc"), "HUF", "Forint Unguresc");
	equal(crawler.getCurrencyCode("Forintul Unguresc"), "HUF", "Forintul Unguresc");
	equal(crawler.getCurrencyCode("Forinti Ungaria"), "HUF", "Forinti Ungaria");
	equal(crawler.getCurrencyCode("100 Forinti Ungaria"), "HUF", "100 Forinti Ungaria");
	equal(crawler.getCurrencyCode("100 Forinti Unguresti"), "HUF", "100 Forinti Unguresti");
	
	
	// czk
	equal(crawler.getCurrencyCode("1 COROANA CEHIA"), "CZK", "1 COROANA CEHIA");
	equal(crawler.getCurrencyCode("COROANA CEHIA"), "CZK", "COROANA CEHIA");
	equal(crawler.getCurrencyCode("Coroana ceha"), "CZK", "Coroana ceha");
	equal(crawler.getCurrencyCode("Coroane cehe"), "CZK", "Coroane cehe");
	equal(crawler.getCurrencyCode("Coroane cehesti"), "CZK", "Coroane cehesti");
	
	// rub
	equal(crawler.getCurrencyCode("1 RUBLA RUSEASCA"), "RUB", "1 RUBLA RUSEASCA");
	equal(crawler.getCurrencyCode("RUBLA RUSEASCA"), "RUB", "RUBLA RUSEASCA");
	equal(crawler.getCurrencyCode("Rubla Rusia"), "RUB", "Rubla Rusia");
	equal(crawler.getCurrencyCode("Rubla rusa"), "RUB", "Rubla rusa");
	equal(crawler.getCurrencyCode("Ruble Rusia"), "RUB", "Ruble Rusia");
	equal(crawler.getCurrencyCode("Ruble Rusesti"), "RUB", "Ruble Rusesti");
	equal(crawler.getCurrencyCode("100 Ruble Rusesti"), "RUB", "100 Ruble Rusesti");
	
	// bgn
	equal(crawler.getCurrencyCode("1 LEVA BULGARIA"), "BGN", "1 LEVA BULGARIA");
	equal(crawler.getCurrencyCode("LEVA BULGARIA"), "BGN", "LEVA BULGARIA");
    equal(crawler.getCurrencyCode("Leva bulgareasca"), "BGN", "Leva bulgareasca");
	equal(crawler.getCurrencyCode("Leva bulgara"), "BGN", "Leva bulgara");
	equal(crawler.getCurrencyCode("Leva bulgare"), "BGN", "Leva bulgare");
	equal(crawler.getCurrencyCode("Leva bulgaresti"), "BGN", "Leva bulgaresti");
	
    
});