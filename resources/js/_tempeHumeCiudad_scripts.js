$(document).ready(function () {
    const openWeatherMapApiKey = 'b6fd02793bcdf03c591ced7c7b5d9fa0';
    const ciudad = 'Danlí';

    function obtenerDatosMeteorologicos() {
        const openWeatherMapUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${openWeatherMapApiKey}&units=imperial`;

        $.ajax({
            url: openWeatherMapUrl,
            method: 'GET',
            success: function (data) {
                const temperaturaFahrenheit = data.main.temp;
                const temperaturaCelsius = convertirFahrenheitACelsius(temperaturaFahrenheit);
                const humedad = data.main.humidity;
                const tipoClima = data.weather[0].main;

                // Actualiza la temperatura en la interfaz del home
                $('#temperaturaHomeF').text(`Danlí: ${temperaturaFahrenheit}°F`);
                $('#temperaturaHomeC').text(`${temperaturaCelsius}°C`);

                // Actualiza la humedad en la interfaz del home
                $('#humedadHome').text(`Humedad: ${humedad}%`);

                // Actualiza el gif según el tipo de clima
                actualizarGifClima(tipoClima);
            },
            error: function (error) {
                console.error('Error al obtener los datos meteorológicos:', error);
            }
        });
    }

    function convertirFahrenheitACelsius(fahrenheit) {
        return ((fahrenheit - 32) * 5 / 9).toFixed(2);
    }

    function mostrarHora() {
        const ahora = new Date();
        const horas = ahora.getHours();
        const minutos = ahora.getMinutes();
        const segundos = ahora.getSeconds();
        const horaActual = `${horas}:${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;

        $('#horaFechaHome').text(`Hora: ${horaActual}⌚`);
    }

    function actualizarGifClima(tipoClima) {
        const rutaGif = obtenerRutaGifClima(tipoClima);
        $('#weather-animation').attr('src', rutaGif);
        console.log(tipoClima)
    }

    function obtenerRutaGifClima(tipoClima) {
        switch (tipoClima) {
            case 'Clear':
                return '/resources/images/gifs/animation1.gif';
            case 'Rain':
                return '/resources/images/gifs/animation2.gif';
            case 'Clouds':
                return '/resources/images/gifs/animation3.gif ';
            case 'Wind':
                return '/resources/images/gifs/animation4.gif';
            case 'Thunderstorm':
                return '/resources/images/gifs/animation5.gif';
            case 'Partly Cloudy':
                return '/resources/images/gifs/animation6.gif';
            default:
                return 'assets/default.gif';
        }
    }

    obtenerDatosMeteorologicos();
    mostrarHora();

    setInterval(obtenerDatosMeteorologicos, 300000);
    setInterval(mostrarHora, 1000);
});
