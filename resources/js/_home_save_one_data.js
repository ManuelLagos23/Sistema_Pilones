// Manejar el clic en el botón para guardar la temperatura en grados Fahrenheit
const saveTempButton = document.getElementById('saveTemps');
saveTempButton.addEventListener('click', () => {
    if (selectedCard) {
        const pilonId = selectedCard.classList[1].split('-')[1];
        const cardFooter = selectedCard.querySelector('.card__footer');

        const temperatureText = cardFooter.textContent.trim();
        const temperatureMatch = temperatureText.match(/([\d.]+)\sFº/); // Busca el número en grados Fahrenheit

        if (temperatureMatch && temperatureMatch.length === 2) {
            const temperatureValue = parseFloat(temperatureMatch[1]);

            if (!isNaN(temperatureValue)) {
                const temperatureData = {
                    pilonId,
                    temperature: temperatureValue,
                };

                const jsonTemperatureData = JSON.stringify(temperatureData);

                fetch('/api/temperatures/save_temp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: jsonTemperatureData
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Temperature saved:', data);
                    $("#successModal").modal("show");
                })
                .catch(error => {
                    console.error('Error saving temperature:', error);
                    $("#errorModal").modal("show");
                });
            } else {
                console.error('Valor de temperatura invalido');
                $("#errorModal").modal("show");
            }
        } else {
            console.error('Temperatura no encontrada o formato invalido');
            $("#errorModal").modal("show");
        }
    } else {
        console.error('No card is selected');

        const errorModalBody = $("#errorModal").find(".modal-body");
        errorModalBody.html("Por favor seleccione un pilón para poder guardar su temperatura.");
        $("#errorModal").modal("show");
    }
});






