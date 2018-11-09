let flowChart;
let container = document.getElementById("validation");
let canvas = document.createElement("canvas");
canvas.height = 300;
canvas.width = 600;

flowChart = new Chart(canvas, {
    type: 'line',
    data: {
        labels: [0],
        datasets: [
            {
                label: "Einzeller Action",
                borderColor: 'rgb(0, 180, 0)',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                data: [0]
            }, {
                label: "Fruchtfliege Action",
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                data: [0]
            }, {
                label: "Fliegen Action",
                borderColor: 'rgb(0, 0, 0)',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                data: [0]
            }, {
                label: "Simply Celldivision Action",
                borderColor: 'rgb(0, 0, 255)',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                data: [0]
            }, {
                label: "Normal Celldivision Action",
                borderColor: 'rgb(200, 150, 0)',
                backgroundColor: 'rgba(0, 0, 0, 0)',
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
    secondCounter += 5;
    flowChart.data.labels.push(secondCounter);
    if (flowChart.data.labels.length > 36)
        flowChart.data.labels.shift();

    for (let i = 0; i < counter.length; i++) {
        flowChart.data.datasets[i].data.push(counter[i]);
        if (flowChart.data.datasets[i].data.length > 36)
            flowChart.data.datasets[i].data.shift();
        counter[i] = 0;
    }
    
    flowChart.update(0);
  }, 5000);