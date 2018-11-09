let flowChart;
let container = document.getElementById("validation");
let canvas = document.createElement("canvas");

flowChart = new Chart(canvas, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: "Einzeller Action",
                borderColor: 'rgb(0, 180, 0)',
                data: [0]
            }, {
                label: "Fruchtfliege Action",
                borderColor: 'rgb(255, 99, 132)',
                data: [0]
            }, {
                label: "Fliegen Action",
                borderColor: 'rgb(255, 99, 132)',
                data: [0]
            }, {
                label: "Simply Celldivision Action",
                borderColor: 'rgb(255, 99, 132)',
                data: [0]
            }, {
                label: "Normal Celldivision Action",
                borderColor: 'rgb(255, 99, 132)',
                data: [0]
            }
        ]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false
    }
});
container.appendChild(canvas);


window.setInterval(() => {
    flowChart.data.datasets[0].data.push(countEinzellerActions);
    flowChart.data.datasets[1].data.push(countFruchtfliegenActions);
    flowChart.data.datasets[2].data.push(countFliegenActions);
    flowChart.data.datasets[3].data.push(countSimplyDivisionActions);
    flowChart.data.datasets[4].data.push(countNormalDivisionActions);
    flowChart.update(0);
  }, 5000);