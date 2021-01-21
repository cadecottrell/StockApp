
function getChartData(ticker){
    verifyTicker(ticker);
}

function verifyTicker(data){
    console.log(data);
    var unirest = require("unirest");

var req = unirest("GET", "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart");

//Currently only 10 year data cause max seems to be broken
req.query({
	"interval": "1d",
	"symbol": data,
	"range": "10y",
	"region": "US"
});

req.headers({
	"x-rapidapi-key": "5499da54dcmshbb4f64afb97186fp176e4ajsna521b84f5ed5",
	"x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
	"useQueryString": true
});



req.then(function (res) {
	if(res.body.chart.result == null) {
        console.log("TRUE");
        console.log(res.body.chart.result);

        $.getScript('mainPage.js', function(){
            displayTicker("Error Could Not Find Stock");
        });
    }
    else{
        $.getScript('mainPage.js', function(){
            displayTicker(data);
            var chartData = formatChartData(res.body);
            getChart(chartData, data);
        });
        console.log("THIS SHOULDNT BE TRUE");
        console.log(res.body);
        
    }
});

}


function formatChartData(chartData){
    var formatedChartData = {entries: []};
    console.log(chartData.chart.result[0].timestamp.length);

    for(var i = 0; i < chartData.chart.result[0].timestamp.length; i++){

        var timestamp = chartData.chart.result[0].timestamp[i];
        var close = chartData.chart.result[0].indicators.quote[0].close[i];
        var open = chartData.chart.result[0].indicators.quote[0].open[i];
        var high = chartData.chart.result[0].indicators.quote[0].high[i];
        var low = chartData.chart.result[0].indicators.quote[0].low[i];
        var volume = chartData.chart.result[0].indicators.quote[0].volume[i];

        formatedChartData['entries'].push([timestamp, open, high, low, close, volume]);
    }

    console.log(formatedChartData);

    return formatedChartData;
}
