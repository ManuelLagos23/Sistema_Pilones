var ctx = document.getElementById("myChart").getContext("2d");
document.getElementById("exportToImage").disabled = true;
var myChart;

function obtenerDatosFiltrados(pilonId, fechaInicial, fechaFinal) {
    var url = "api/temperatures/" + pilonId + "?fechaInicial=" + fechaInicial + "&fechaFinal=" + fechaFinal;

    return fetch(url)
        .then(function (response) {
            return response.json();
        });
}

// AUTOSELECTED DATE (fechaFinalSelector)
$(document).ready(function () {
    var now = new Date();
    var month = (now.getMonth() + 1);
    var day = now.getDate();
    if (month < 10)
        month = "0" + month;
    if (day < 10)
        day = "0" + day;
    var today = now.getFullYear() + '-' + month + '-' + day;
    $('#fechaFinalSelector').val(today);
});

function crearGrafico(labels, data, fechas) {
    if (myChart) {
        myChart.data.labels = labels.map(function (hora, index) {
            return hora + " - " + fechas[index];
        });
        myChart.data.datasets[0].data = data;
        myChart.update();
    } else {
        myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: labels.map(function (hora, index) {
                    return hora + " - " + fechas[index];
                }),
                datasets: [
                    {
                        label: "Temperatures",
                        data: data,
                        backgroundColor: "rgba(255, 184, 115, 0.2)",
                        borderColor: "rgba(255, 184, 115, 0.8)",
                        pointStyle: 'circle',
                        pointRadius: 6,
                        pointHoverRadius: 15,
                        fill: {
                            target: "origin",
                            above: "rgba(255, 184, 115, 0.2)",
                        },
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, 
                scales: {
                    x: {
                        ticks: {
                            font: {
                                size: 12,
                            },
                        },
                    },
                    y: {
                        ticks: {
                            font: {
                                size: 16,
                            },
                        },
                    },
                },
            },
            plugins: {
                fill: {
                    propagate: true,
                },
            },
        });
    }
}

selectPilon.addEventListener("change", actualizarGrafica);
fechaInicialSelector.addEventListener("change", actualizarGrafica);
fechaFinalSelector.addEventListener("change", actualizarGrafica);

fechaFinalSelector.max = new Date().toISOString().split("T")[0];

function actualizarGrafica() {
    var pilonId = selectPilon.value;
    var fechaInicial = fechaInicialSelector.value;
    var fechaFinal = fechaFinalSelector.value;

    if (pilonId) {

     
        var formattedFechaInicial = fechaInicial ? fechaInicial : null;
        var formattedFechaFinal = fechaFinal ? fechaFinal : null;

        obtenerDatosFiltrados(pilonId, formattedFechaInicial, formattedFechaFinal)
            .then(function (data) {
                var horas = data.map(function (dato) {
                    return dato.hora_lectura;
                });
                var temperaturas = data.map(function (dato) {
                    return dato.lectura;
                });
                var fechas = data.map(function (dato) {
                    var fecha = new Date(dato.fecha_lectura);
                    return fecha.getFullYear() + '-' + (fecha.getMonth() + 1).toString().padStart(2, '0') + '-' + fecha.getDate().toString().padStart(2, '0');
                });

                crearGrafico(horas, temperaturas, fechas);

                if (temperaturas.length < 1) {
                    document.getElementById("exportToImage").disabled = true;
                } else {
                    document.getElementById("exportToImage").disabled = false;
                }
            })
            .catch(function (error) {
                console.error("Error al obtener los datos:", error);
            });
    } else {
        
        crearGrafico([], [], []);
    }
}


fetch("api/pilones")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
    
        data.forEach(function (pilón) {
            var option = document.createElement("option");
            option.value = pilón.id;
            option.textContent = pilón.nombre + ' - ' + pilón.finca;
            selectPilon.appendChild(option);
        });
    })
    .catch(function (error) {
        console.error("Error al obtener los pilones:", error);
    });

// Llamar a la función actualizarGrafica
actualizarGrafica();

function exportToImage() {
    var canvas = document.getElementById("myChart");

    var pilonName = selectPilon.options[selectPilon.selectedIndex].textContent;
    var formattedFechaInicial = fechaInicialSelector.value || "null";
    var formattedFechaFinal = fechaFinalSelector.value || "null";
    var filename = `Graphics to temperatures for ${pilonName} (${formattedFechaInicial} to ${formattedFechaFinal}).png`;

    var imageData = canvas.toDataURL("image/png");
    var link = document.createElement("a");
    link.href = imageData;
    link.download = filename;
    link.click();
}