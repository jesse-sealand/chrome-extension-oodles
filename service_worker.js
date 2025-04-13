/*  Variables  */

let MemTotal = 0;
let MemUsed = 0;
let MemUsageSystem = 0;

let CpuSystemInfo = 0;
let CpuSystem = 0;
let CpuBrowser = 0;
let CpuTotal = 0;

let CpuUsageSystem = 0;
let CpuUsageBrowser = 0;

let SIZE = 32;


/*  Imports  */

import {
    Chart,
    DoughnutController,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    BarElement,
    ArcElement
} from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.8/+esm';
Chart.register(LineController, DoughnutController, LineElement, PointElement, LinearScale, Title, BarElement, ArcElement);


/*  Timers  */
const intervalID = setInterval(myCallback, 500, "Parameter 1", "Parameter 2");

/*  Callbacks  */
function myCallback(a, b) {
    try {
        getMemoryData();

        let imageData = getImageData();
        let settingIcon = chrome.action.setIcon({
            imageData
        });

    } catch (e) {
        console.error(e);
    }
}


/*  Methods  */

function getMemoryData() {
    /* Capture memory usage */

    let info = chrome.system.memory.getInfo(function(info) {
        MemTotal = info.capacity;
        MemUsed = info.availableCapacity;
        MemUsageSystem = MemUsed / MemTotal;
    });
}


function getImageData() {
    /* Get Chart.js donut chart of memory usage */

    let canvas = new OffscreenCanvas(SIZE, SIZE);
    let ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, SIZE, SIZE);

    var doughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Red', 'Blue', 'Yellow'],
            datasets: [{
                label: 'Votes',
                data: [1, 1, 1],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2);
                        }
                    }
                }
            }
        }
    })

    return ctx.getImageData(0, 0, SIZE, SIZE);
}