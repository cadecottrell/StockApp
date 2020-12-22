var unirest = require("unirest");

var req = unirest("GET", "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-trending-tickers");

req.query({
	"region": "US"
});

req.headers({
	"x-rapidapi-key": "5499da54dcmshbb4f64afb97186fp176e4ajsna521b84f5ed5",
	"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
	var count = res.body.finance.result[0].count;
	console.log(count);
	document.getElementById("trendingPage").innerHTML = "";

	var trendingTickers = "";
	for(i = 0; i < count; i++){
		var temp = res.body.finance.result[0].quotes[i].regularMarketChangePercent;
		var decimalSpot = temp.toString().indexOf('.');
		var edited = temp.toString().substring(0, decimalSpot) + "" + temp.toString().substring(decimalSpot, decimalSpot + 3);
		trendingTickers = trendingTickers + res.body.finance.result[0].quotes[i].symbol + "  " + edited + "%"+ "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;";
	}

	document.getElementById("trendingPage").innerHTML = trendingTickers;

});