import express from 'express'
import * as echarts from 'echarts';
import * as jsdom from 'jsdom'

const app = express()
const port = 5000
app.get('/', (_, res) => {

    const dom = new jsdom.JSDOM(`<div id="content"></div>`, {
        url: "https://example.org/",
        referrer: "https://example.com/",
        contentType: "text/html",
        includeNodeLocations: true,
        storageQuota: 10000000
    });

    //var document = dom.window.document;
    global.document = dom.window.document;

    let myDiv = dom.window.document.createElement('div');
    myDiv.style.width = "500px"
    myDiv.style.height = "500px"

    var myChart = echarts.init(myDiv);
    var option;

    option = {
        title: {
            text: 'Title'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['l1', 'l2', 'l3', 'l4', 'l5']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 's1',
                type: 'line',
                stack: 'st1',
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: 's2',
                type: 'line',
                stack: 'st2',
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: 's3',
                type: 'line',
                stack: 'st3',
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: 's4',
                type: 'line',
                stack: 'st4',
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: 's5',
                type: 'line',
                stack: 'st5',
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };

    option && myChart.setOption(option);

    let output = myChart.getDataURL({
        pixelRatio: 2,
        backgroundColor: '#fff'
    });


    res.status(200).send(output)
})
app.listen(port, () => console.log(`Running on port ${port}`))