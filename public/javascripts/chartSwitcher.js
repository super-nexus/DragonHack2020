
let ids = ['chartdiv2', 'chartdiv3', 'chartdiv4', 'chartdiv5'];
let chartHeaders = ['Temperature', 'Humidity', 'Brightness', 'Noise']
let index = 0;


$(function (){

    let arrowRight = $('#arrow-right');
    let arrowLeft = $('#arrow-left');
    let chartTitle = $('#chart-header');

    arrowLeft.click(function (event){
        if(index > 0){
            let currentChart = $('#' + ids[index]);
            let nextChart = $('#' + ids[index - 1]);
            let nextChartTitle = chartHeaders[index - 1]
            currentChart.fadeOut('fast', function (){
                nextChart.fadeIn('fast');
                chartTitle.html(nextChartTitle)
            })
            index--;
        }
    })

    arrowRight.click(function (event){
        if(index < ids.length - 1){
            let currentChart = $('#' + ids[index]);
            let nextChart = $('#' + ids[index + 1]);
            let nextChartTitle = chartHeaders[index + 1]
            currentChart.fadeOut('fast', function (){
                nextChart.fadeIn('fast');
                chartTitle.html(nextChartTitle)
            })
            index++;
        }
    })


})
