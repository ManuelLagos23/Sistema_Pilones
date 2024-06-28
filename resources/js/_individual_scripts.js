$(document).ready(function () {
    $('button:contains("Show pilones list"), button:contains("Mostrar lista de pilones")').click(function () {
        $('#pilonList').modal('show');
    });

    
    const pilonCheckboxList = $("#pilonCheckboxList");
    const searchInput = $("#searchInput");
    const pilonInfoContainer = $(".pilon_info");

    function updatePilonInfo(pilon) {
            const direccionSensor = pilon.direccion_sensor ? pilon.direccion_sensor : 'No hay sensor asignado.'
        pilonInfoContainer.html(`
            <p style="text-align: justify;" >Pilón:<strong > ${pilon.nombre}</strong></p>
            <p style="text-align: justify;">Propiedad:<strong> ${pilon.finca}</strong></p>
            <p style="text-align: justify;">Variedad:<strong> ${pilon.variedad}</strong></p>
               <p style="text-align: justify;">Corte:<strong> ${pilon.corte}</strong></p>
            <p style="text-align: justify;">Peso neto:<strong> ${pilon.pn}</strong></p>
            <p style="text-align: justify;">Temperatura mínima permitida:<strong> ${pilon.temp_min} Fº</strong></p>
            <p style="text-align: justify;">Temperatura máxima permitida:<strong> ${pilon.temp_max} Fº</strong></p>
            <p style="text-align: justify;">Dirección:<strong> ${direccionSensor}</strong></p>
            <p style="text-align: justify;">Fecha de empilonado:<strong> ${new Date(pilon.fecha_empilonado).toISOString().slice(0, 10)}</strong></p>
        `);
    }

    $.get("/api/pilones", function (data) {
        const generateCheckboxes = function (pilons) {
            pilonCheckboxList.empty();

            pilons.forEach(function (pilon) {
                if (pilon.estado !== "Finished") {
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.name = "opcion";
                    checkbox.value = pilon.id;

                    const label = document.createElement("label");
                    const textContentall = pilon.nombre;

                    var textoRecortado = textContentall.substring(0, 13); // Recorta a los primeros 13 caracteres

label.textContent = textoRecortado;

                    const div = document.createElement("div");
                    div.appendChild(checkbox);
                    div.appendChild(label);

                    pilonCheckboxList.append(div);
                }
            });
        };

        generateCheckboxes(data);









    // Conectarse al servidor de Socket.IO
    const socket = io();

    // Manejar la actualización de las temperaturas recibidas desde el servidor
    socket.on('temperaturasDirecciones', (direccionesTemperaturas) => {
        const selectedPilonId = $('input[name="opcion"]:checked').val();
        const selectedPilon = data.find(pilon => pilon.id === parseInt(selectedPilonId));

        if (selectedPilon) {
            const temperaturaPilon = direccionesTemperaturas.find(item => item.direccionSensor === selectedPilon.direccion_sensor);
            if (temperaturaPilon) {
                const { temperatura } = temperaturaPilon;
                // Actualizar el contenido del elemento displayTemp con la temperatura
                displayTemp.innerText = `${temperatura.toFixed(2)} Fº`;
            } else {
                // Si no hay temperatura asociada, se vacía el contenido
                displayTemp.innerText = '';
            }
        } else {
            // Si no se seleccionó ningún pilón, se vacía el contenido
            displayTemp.innerText = '';
        }
    });









        $("input[name='opcion']").on("change", function () {
            $("input[name='opcion']").not(this).prop("checked", false);

            const selectedPilonId = $(this).val();
            if (selectedPilonId) {
                $.get(`/api/pilones/${selectedPilonId}`, function (pilon) {
                    updatePilonInfo(pilon);
                });
            } else {
                pilonInfoContainer.empty();
            }
        });

        searchInput.on("input", function () {
            const searchTerm = searchInput.val().toLowerCase();
            const filteredPilons = data.filter(function (pilon) {
                return pilon.nombre.toLowerCase().includes(searchTerm) ||
                    pilon.finca.toLowerCase().includes(searchTerm);
            });
            generateCheckboxes(filteredPilons);
        });
    });

    function saveTemperatureAndHumidityData(selectedPilonId, temperature) {
        const temperatureData = {
            pilonId: parseFloat(selectedPilonId),
            temperature: temperature,
        };

   

        $.ajax({
            url: '/api/temperatures/save_temp',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(temperatureData),
            success: function (response) {
                console.log('Temperature saved:', response);
            },
            error: function (error) {
                console.error('Error saving temperature:', error);
            }
        });

       
    }

    $("#save_Temp_Hum").click(function () {
        const selectedPilonId = $("input[name='opcion']:checked").val();
        const temperatureValue = parseFloat($(".display_temp").text().replace('C°', ''));
        const humidityValue = parseFloat($(".display_hum").text().replace('%', ''));

        if (!selectedPilonId) {
            const errorModalBody = $("#errorModal").find(".modal-body");
            errorModalBody.html("Por favor seleccione el pilón para poder guardar su temperatura.");
            $('#pilonList').modal('hide');
            $("#errorModal").modal("show");
            return;
        }

        if (isNaN(temperatureValue)) {
            const errorModalBody = $("#errorModal").find(".modal-body");
            errorModalBody.html("El valor de la temperatura no es valido, inténtelo nuevamente.");
            $('#pilonList').modal('hide');
            $("#errorModal").modal("show");
            return;
        }

      

        saveTemperatureAndHumidityData(selectedPilonId, temperatureValue, humidityValue);
        $("#pilonList").modal("hide");
        $("#successModal").modal("show");
    });


   
});




        





const socket = io();

socket.on('sensorData', (data) => {
    console.log(data);
   
    const temperatureDisplay = document.querySelector('.display_temp');
    const humidityDisplay = document.querySelector('.display_hum');

    const parts = data.split(', ');
    if (parts.length === 4) {
        const temperaturePart = parts[1];
        const humidityPart = parts[3];

        const temperatureKeyValue = temperaturePart.split(':');
        const humidityKeyValue = humidityPart.split(':');

        if (temperatureKeyValue.length === 2 && humidityKeyValue.length === 2) {
            const temperature = temperatureKeyValue[1].trim();
            const humidity = humidityKeyValue[1].trim();

            temperatureDisplay.textContent = `${temperature}°`;
            humidityDisplay.textContent = `${humidity}`;
        }
    }
});