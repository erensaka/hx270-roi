let productionLossChart, beltCostChart;

function generateCharts() {
    // Get the input values
    const tco = parseFloat(document.getElementById('tco').value);
    const lossPerHour = parseFloat(document.getElementById('lossPerHour').value);
    const beltPrice = parseFloat(document.getElementById('beltPrice').value);

    if (isNaN(tco) || isNaN(lossPerHour) || isNaN(beltPrice)) {
        alert("Please enter all values.");
        return;
    }

    if (productionLossChart) productionLossChart.destroy();
    if (beltCostChart) beltCostChart.destroy();

    const lossHours = [];
    const productionLoss = [];
    for (let i = 1; i <= 24; i++) {
        lossHours.push(i);
        productionLoss.push(lossPerHour * i);
    }

    const ctx1 = document.getElementById('productionLossChart').getContext('2d');
    productionLossChart = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: lossHours,
            datasets: [{
                label: 'Cumulative Production Loss (EUR)',
                data: productionLoss,
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                fill: true,
                pointRadius: 0,
                tension: 0
            }, {
                label: "HX270's TCO",
                data: Array(lossHours.length).fill(tco),
                borderColor: '#ff0000',
                pointRadius: 0,
                borderDash: [10, 5]
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    ticks: {
                        stepSize: 1, 
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const beltLengths = [];
    const beltCosts = [];
    for (let i = 0; i <= 2400; i += 200) { 
        beltLengths.push(i);
        beltCosts.push(beltPrice * 1.8 * i); 
    }

    const ctx2 = document.getElementById('beltCostChart').getContext('2d');
    beltCostChart = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: beltLengths,
            datasets: [{
                label: 'Total Belt Cost (EUR)',
                data: beltCosts,
                borderColor: '#28a745',
                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                fill: true,
                pointRadius: 0,
                tension: 0
            }, {
                label: "HX270's TCO",
                data: Array(beltLengths.length).fill(tco),
                borderColor: '#ff0000',
                pointRadius: 0,
                borderDash: [10, 5]
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    ticks: {
                        stepSize: 200 
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    
    const roiHours = (tco / lossPerHour).toFixed(2);
    const beltLength = (tco / (beltPrice * 1.8)).toFixed(2);

    
    document.getElementById('output').innerHTML = `
        HX270 can pay for itself in ${roiHours} hours of production loss or ${beltLength} meters of belt purchase.
    `;
}
