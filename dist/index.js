"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const echarts = __importStar(require("echarts"));
const jsdom = __importStar(require("jsdom"));
const app = express_1.default();
const port = 5000;
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
    myDiv.style.width = "500px";
    myDiv.style.height = "500px";
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
    res.status(200).send(output);
});
app.listen(port, () => console.log(`Running on port ${port}`));
//# sourceMappingURL=index.js.map