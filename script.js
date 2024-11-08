function generateChart() {
    const tco = parseFloat(document.getElementById("tco").value);
    const lossPerHour = parseFloat(document.getElementById("lossPerHour").value);

    if (isNaN(tco) || isNaN(lossPerHour)) {
        alert("Please enter valid numbers for TCO and production loss per hour.");
        return;
    }

    // Generate labels for the x-axis: 1, 2, 3... up to 20 hours
    const hours = Array.from({ length: 21 }, (_, i) => i);  // Labels for x-axis
    const cumulativeLoss = hours.map(hour => hour * lossPerHour);
    const intersectionPoint = tco / lossPerHour;

    const ctx = document.getElementById("chart").getContext("2d");
    if (window.myChart) window.myChart.destroy();

    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: hours,  // This will label the x-axis as 1, 2, 3...
            datasets: [{
                label: 'Cumulative Production Loss (EUR)',
                data: cumulativeLoss,
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                fill: true,
                pointRadius: 0,  // Hide points to make it a smooth line
                tension: 0  // Set tension to 0 for a straight line
            },
            {
                label: "HX270's TCO",
                data: Array(hours.length).fill(tco),  // Constant value line for TCO
                borderColor: '#ff0000',
                pointRadius: 0,
                borderDash: [10, 5]  // Dashed line for HX270's TCO
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
