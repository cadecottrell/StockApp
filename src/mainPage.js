$(function(){

    $('#search').keypress(function(k) {
        //ONLY GOD KNOWS WHY EVENTS BUBBLE
        k.stopImmediatePropagation();
        var key = k.which;
        if(key == 13){
            var ticker = $('#search').val().trim();

            if(ticker != ''){
                alert(ticker);
                $.getScript(getChart.js, function(){
                    getChartData(ticker);
                });
            }
        }
    });
});

function displayTicker(ticker){
    document.getElementById("stockName").innerHTML = "<h2 style=\'color: white \'>" + ticker + "</h2>";
}

function getChart(chartData, ticker){

    console.log("HERE IS THE ARRAY");
    console.log(chartData);

    var ohlc = [];
    var volume = [];
    var dataLength = chartData.entries.length;
    console.log(dataLength);

    for(var i = 0; i < dataLength; i++){
        
        ohlc.push([
            chartData.entries[i][0],
            chartData.entries[i][1],
            chartData.entries[i][2],
            chartData.entries[i][3],
            chartData.entries[i][4]
        ]);

        volume.push([
            chartData.entries[i][0],
            chartData.entries[i][5]
        ]);
    }


    // create the chart
    Highcharts.stockChart('stock', {

        //Below is gernerously provided by HighCharts
        yAxis: [{
            labels: {
                align: 'left'
            },
            height: '80%',
            resize: {
                enabled: true
            }
        }, {
            labels: {
                align: 'left'
            },
            top: '80%',
            height: '20%',
            offset: 0
        }],
        tooltip: {
            shape: 'square',
            headerShape: 'callout',
            borderWidth: 0,
            shadow: false,
            positioner: function (width, height, point) {
                var chart = this.chart,
                    position;

                if (point.isHeader) {
                    position = {
                        x: Math.max(
                            // Left side limit
                            chart.plotLeft,
                            Math.min(
                                point.plotX + chart.plotLeft - width / 2,
                                // Right side limit
                                chart.chartWidth - width - chart.marginRight
                            )
                        ),
                        y: point.plotY
                    };
                } else {
                    position = {
                        x: point.series.chart.plotLeft,
                        y: point.series.yAxis.top - chart.plotTop
                    };
                }

                return position;
            }
        },
        series: [{
            type: 'ohlc',
            id: ticker + '-ohlc',
            name: ticker + ' Stock Price',
            data: ohlc
        }, {
            type: 'column',
            id: ticker + '-volume',
            name: ticker + ' Volume',
            data: volume,
            yAxis: 1
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 800
                },
                chartOptions: {
                    rangeSelector: {
                        inputEnabled: false
                    }
                }
            }]
        }
        //Below is some slight modifications

    });
}