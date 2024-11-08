function generateChart() {
    const tco = parseFloat(document.getElementById("tco").value);
    const lossPerHour = parseFloat(document.getElementById("lossPerHour").value);

    if (isNaN(tco) || isNaN(lossPerHour)) {
        alert("Please enter valid numbers for TCO and production loss per hour.");
        return;
    }

    const hours = Array.from({ length: 21 }, (_, i) => i);
    const cumulativeLoss = hours.map(hour => hour * lossPerHour);
    const intersectionPoint = tco / lossPerHour;

    const ctx = document.getElementById("chart").getContext("2d");
    if (window.myChart) window.myChart.destroy();

    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: hours, 
            datasets: [{
                label: 'Cumulative Production Loss (EUR)',
                data: cumulativeLoss,
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                fill: true,
                pointRadius: 0,  
                tension: 0  
            },
            {
                label: "HX270's TCO",
                data: Array(hours.length).fill(tco), 
                borderColor: '#ff0000',
                pointRadius: 0,
                borderDash: [10, 5] 
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Hours of Production Loss'
                    },
                    min: 0
                },
                y: {
                    title: {
                        display: true,
                        text: 'EUR'
                    }
                }
            },
            plugins: {
                annotation: {
                    annotations: {
                        point: {
                            type: 'point',
                            xValue: intersectionPoint,
                            yValue: tco,
                            backgroundColor: 'red',
                            radius: 8,
                            borderWidth: 2,
                            borderColor: 'white',
                        }
                    }
                }
            }
        }
    });

    document.getElementById("output").innerText = `HX270 can pay for itself in approximately ${intersectionPoint.toFixed(2)} hours of production loss.`;
}
