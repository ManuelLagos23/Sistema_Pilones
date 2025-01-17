const paginationContainer = document.querySelector('.pagination');
const container = document.querySelector('.card-container');
const cardsPerPage = 12;
let currentPage = 1;

function goToNextPage() {
    const totalPages = Math.ceil(container.children.length / cardsPerPage);
    currentPage = (currentPage % totalPages) + 1;
    showPage(currentPage);
    updatePagination();
}

function showPage(pageNumber) {
    const startIndex = (pageNumber - 1) * cardsPerPage;
    const endIndex = pageNumber * cardsPerPage;

    const prevPageTransform = `translateX(-150%)`;
    const nextPageTransform = `translateX(150%)`;

    container.style.transition = 'transform 0.5s ease';

    if (pageNumber > currentPage) {
        container.style.transform = nextPageTransform;
    } else {
        container.style.transform = prevPageTransform;
    }

    setTimeout(() => {
        for (let i = 0; i < container.children.length; i++) {
            container.children[i].style.display = (i >= startIndex && i < endIndex) ? 'block' : 'none';
        }
        container.style.transition = '';
        container.style.transform = `translateX(0)`;
    }, 800);
}

function autoPagination() {
    goToNextPage();
}

function updatePagination() {
    const paginationButtons = paginationContainer.querySelectorAll('a');
    paginationButtons.forEach((button, index) => {
        if (index + 1 === currentPage) {
            button.classList.add('page-active');
        } else {
            button.classList.remove('page-active');
        }
    });
}

showPage(currentPage);

const intervalId = setInterval(autoPagination, 10000);

paginationContainer.addEventListener('click', () => {
    clearInterval(intervalId);
});










let selectedCard = null;
let datosDeArduinoAsignados = null;
let lastUpdateTimestamps = {};














function cargarDatosDeArduinoAsignados() {
    fetch('/api/arduinos')
        .then(response => response.json())
        .then(data => {
            datosDeArduinoAsignados = data;
            crearCardsConTemperatura();
        })
        .catch(error => {
            const errorModalBody = $("#errorModal").find(".modal-body");
            errorModalBody.html("Error getting data from Arduino assigned: " + error);
            $("#errorModal").modal("show");
        });
}


const socket = io();

const cardsWithSensors = {}; // Almacenar las tarjetas asociadas a cada dirección de sensor

// Escuchar el evento 'temperaturasDirecciones' desde el servidor
socket.on('temperatureData', (data) => {
  actualizarTemperaturaEnTarjeta(data.direccionSensor, data.temperatura);
});
// ...

function actualizarTemperaturaEnTarjeta(direccionSensor, temperatura) {
  const cardFooterElements = document.querySelectorAll(`.cardfooter_${direccionSensor}`);
  


  if (cardFooterElements.length > 0) {
    cardFooterElements.forEach((cardFooterElement) => {
      const pilon = cardsWithSensors[direccionSensor]; // Suponiendo que tienes los límites de temperatura en 'pilon.temp_min' y 'pilon.temp_max'
      cardFooterElement.textContent = temperatura.toFixed(2) + " Fº";



      
      if (pilon) {
        if (parseFloat(temperatura) > pilon.temp_max) {
          cardFooterElement.parentElement.classList.add('high-temperature');
          cardFooterElement.parentElement.classList.remove('low-temperature');
          cardFooterElement.parentElement.classList.remove('success-temperature');

          const mensaje = 'La temperatura está alta en el pilón ' + pilon.nombre +  ' con ' + temperatura + ' grados farenheit. \n La temperatura adecuada para el pilón debería ser entre ' + pilon.temp_min + ' y ' + pilon.temp_max + 'grados farenheit.';
          fetch('/enviar-mensaje', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mensaje })
          })
          .then(response => response.json())
          .then(data => {
            console.log('Mensaje enviado al servidor:', data);
          })
          .catch(error => {
            console.error('Error al enviar mensaje al servidor:', error);
          });
       
        } else if (parseFloat(temperatura) < pilon.temp_min) {
          cardFooterElement.parentElement.classList.add('low-temperature');
          cardFooterElement.parentElement.classList.remove('high-temperature');
          cardFooterElement.parentElement.classList.remove('success-temperature');

          const mensaje = 'La temperatura está baja en el pilón ' + pilon.nombre +  ' con ' + temperatura + ' grados farenheit. \n La temperatura adecuada para el pilón debería ser entre ' + pilon.temp_min + ' y ' + pilon.temp_max + 'grados farenheit.';
          fetch('/enviar-mensaje', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mensaje })
          })
          .then(response => response.json())
          .then(data => {
            console.log('Mensaje enviado al servidor:', data);
          })
          .catch(error => {
            console.error('Error al enviar mensaje al servidor:', error);
          });
      
        } else {
          cardFooterElement.parentElement.classList.add('success-temperature');
          cardFooterElement.parentElement.classList.remove('high-temperature');
          cardFooterElement.parentElement.classList.remove('low-temperature');
        }

        const currentText = cardFooterElement.textContent.substr(0, 5);

        if (previousTextMap[direccionSensor] !== currentText) {
          lastUpdateTimestamps[direccionSensor] = Date.now();
        }

        previousTextMap[direccionSensor] = currentText;
      } else {
        console.warn(`No se encontraron límites de temperatura para la dirección del sensor: ${direccionSensor}`);
      }
    });
  } else {
    console.warn(`No se encontró tarjeta para la dirección del sensor: ${direccionSensor}`);
  }
}


function enviarDireccionAlServidor(direccionSensor) {
  // Función para enviar la dirección del sensor al servidor
  return fetch('/enviar-direccion-sensor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ direccionSensor }),
  })
    .then(response => {
      if (response.ok) {
        console.log('Dirección del sensor enviada con éxito al servidor');
      } else {
        console.error('Error al enviar la dirección del sensor al servidor');
      }
    })
    .catch(error => {
      console.error('Error de red:', error);
    });
}


function crearCardsConTemperatura() {

  fetch('/api/pilones')
  .then(response => response.json())
  .then(data => {
    const pilones = data;



  fetch('/api/proceso')
    .then(response => response.json())
    .then(procesosData => {
      
   


      const procesosValidos = procesosData.filter(proceso => proceso.agregar_proceso === 'Sí' || proceso.agregar_proceso=== "si");
      console.log("Procesos validos:", procesosValidos);
          const direccionesEnviadas = pilones
            .filter(pilon => pilon.estado !== "Finished")
            .map(pilon => pilon.direccion_sensor);

          const direccionesUnicas = [...new Set(direccionesEnviadas)];
          direccionesUnicas.forEach(direccionSensor => enviarDireccionAlServidor(direccionSensor));

          for (let i = 0; i < pilones.length; i++) {
            const pilon = pilones[i];

            const proceso = procesosValidos.find(proceso => proceso.proceso_tabaco === pilon.proceso_del_pilon);
            if (pilon.estado !== "Finished" && proceso) {

              console.log("Tabla procesos:" + proceso.proceso_tabaco);
              console.log("Tabla pilones:" + pilon.proceso_del_pilon);
              const pilonId = pilon.id;
              obtenerDatosViradoMojado(pilonId);

              const card = document.createElement('div');
              card.classList.add('card');
              const direccionSensor = pilon.direccion_sensor ? pilon.direccion_sensor : 'No hay sensor asignado.';
              const cardContent = `
                <h3 class="card__title">${pilon.nombre.slice(0, 13)}</h3>  
                <img src="../../../../resources/images/QR.png" style="margin-left:92%; margin-top:-40%;" width="15%" height="8%">
                <p class="card__content">
                  ${'Propiedad: ' + pilon.finca.slice(0, 13)}<br>
                  ${'Variedad: ' + pilon.variedad.slice(0, 13)}<br>
                    ${'Corte: ' + pilon.corte}<br>
                  ${'Peso neto: ' + pilon.pn}<br>
                  ${'Temperatura. min: ' + pilon.temp_min}<br>
                  ${'Temperatura. max: ' + pilon.temp_max}<br>
                  Virado:  
                  <span id="virado_${pilon.id}"></span><br>
                  Mojado: 
                  <span id="mojado_${pilon.id}"></span><br>
                  ${direccionSensor}<br>
                </p>
                <div class="card__date">${new Date(pilon.fecha_ingreso).toISOString().slice(0, 10)}</div>
                <div class="card__footer cardfooter_${pilon.direccion_sensor}"> </div>
              `;


          
    

card.innerHTML = cardContent;
document.body.appendChild(card);

function obtenerDatosViradoMojado(pilonId) {
  console.log("Enviando ID de pilón: " + pilonId);
  
  Promise.all([
    fetch(`/api/pilones_task/obtenerDatosVirado/${pilonId}`).then(response => response.json()),
    fetch(`/api/pilones_task/obtenerDatosMojado/${pilonId}`).then(response => response.json())
  ])
  .then(([dataVirado, dataMojado]) => {
    console.log("Datos recibidos del servidor para Virado:", dataVirado);
    console.log("Datos recibidos del servidor para Mojado:", dataMojado);

    const totalVirado = dataVirado.totalVirado || 0;
    const totalMojado = dataMojado.totalMojado || 0;

    const viradoElement = document.getElementById(`virado_${pilon.id}`);
    const mojadoElement = document.getElementById(`mojado_${pilon.id}`);

    

    if (viradoElement) {
      viradoElement.innerHTML = `${totalVirado}`;
    }

    if (mojadoElement) {
      mojadoElement.innerHTML = `${totalMojado}`;
    }
  })
  .catch(error => console.error("Error al obtener datos de Virado y Mojado:", error));
}










          // Almacenar las tarjetas asociadas a cada dirección de sensor
          if (!cardsWithSensors[pilon.direccion_sensor]) {
            cardsWithSensors[pilon.direccion_sensor] = {
              temp_min: pilon.temp_min,
              temp_max: pilon.temp_max,
              nombre: pilon.nombre 
            };
          }

          // Agregar elemento de pie de tarjeta para mostrar la temperatura
          const cardFooter = document.querySelector(`.cardfooter_${pilon.direccion_sensor}`);
          if (cardFooter) {
  
          }
        




              

                    card.innerHTML = cardContent;
                    const optionsLink = document.getElementById('options');
                    const options = document.getElementById('optionsinfo');
 
                    card.addEventListener('click', () => {
                        if (selectedCard === card) {
                            card.classList.remove('card-clicked');
                            optionsLink.style.display = 'none';
                            options.style.display = 'none';
                            selectedCard = null;
                            document.getElementById('selected_pilon').value = '';
                            document.getElementById('task_start_temp').value = ''; // Limpiar el campo al deseleccionar

                      
                       
                        } else {
                            if (selectedCard) {
                                selectedCard.classList.remove('card-clicked');
                                optionsLink.style.display = 'none';
                                options.style.display = 'none';
                                document.getElementById('task_start_temp').value = ''; // Limpiar el campo al deseleccionar


                            
                            }

                            card.classList.add('card-clicked');
                            optionsLink.style.display = 'inline-block';
                            options.style.display = 'inline-block';
                            selectedCard = card;
                          
                            // Get the pilón name to selected_pilon (turning_wetting)
                            const pilonInfo = card.querySelector('.card__title').textContent;
                            document.getElementById('pilon_selected').value = pilonInfo;
                            document.getElementById('pilon_seleccionado').value = pilonInfo;
                            document.getElementById('id_pilon').value = pilon.id;
                            document.getElementById('pilon_finca').value = pilon.finca;
                            document.getElementById('pilon_variedad').value = pilon.variedad;
                            document.getElementById('pilon_etapa').value = pilon.etapa;
                            document.getElementById('pilon_peso').value = pilon.pn;
                            document.getElementById('pilon_min').value = pilon.temp_min;
                            document.getElementById('pilon_max').value = pilon.temp_max;
                            document.getElementById('pilon_fecha').value = new Date(pilon.fecha_ingreso).toISOString().slice(0, 10);
                            document.getElementById('pilon_corte').value = pilon.corte;
                            document.getElementById('pilon_cosecha').value = pilon.cosecha;
                            document.getElementById('pilon_clase').value = pilon.clase;
                            document.getElementById('pilon_tipo').value = pilon.tipo_tabaco;
                         
                           
                      

                       
                            const temperaturainfo = card.querySelector('.card__footer').textContent;
                            const temperaturepilon = temperaturainfo.split('º');
                               const temperaturamodal = temperaturepilon[0].trim();
                               const humedadmodal = temperaturepilon[1].trim();
                                                      
                            document.getElementById('task_start_temp').value = temperaturamodal;
                
                            document.getElementById('pilon_humedad').value = humedadmodal;


                            // Obtener la temperatura del card y asignarla al campo task_start_temp
                            const cardFooter = card.querySelector('.card__footer');
                            const temperatureAndHumidity = cardFooter.textContent.match(/\d+\.\d+/g);

                            if (temperatureAndHumidity && temperatureAndHumidity.length === 2) {
                                const temperature = parseFloat(temperatureAndHumidity[0]);

                                if (!isNaN(temperature)) {
                                    const taskStartTempInput = document.getElementById('task_start_temp');
                                    taskStartTempInput.value = temperature.toFixed(2); // Ajusta la precisión decimal si es necesario
                                } else {
                                    console.error('Invalid temperature data format');
                                }
                            }
                        }
         
        }); 

                    container.appendChild(card);

                    card.classList.add('card', `pilon-${pilon.id}`);

                    const arduinoAsignado = datosDeArduinoAsignados.find(arduino => arduino.pilon_encargado === pilon.id);
                    if (arduinoAsignado) {
                        const cardFooter = card.querySelector('.card__footer');
                        cardFooter.innerHTML = `${arduinoAsignado.temperatura}`;
                    }
                }
            }


      

          
        });

          

            
            // Objeto para realizar un seguimiento del texto anterior de los primeros 5 caracteres de cada cardFooter
            const previousTextMap = {};


            fetch('/api/sensor')
            .then(response => response.json())
            .then(data => {
              const sensores = data;
              
              
             

              for (let i = 0; i < sensores.length; i++) {
                const ident = sensores[i]; 
                const aide = ident.id_arduino;
                const address = ident.direccion;
         

            socket.on('temperatureData', (temperature) => {
                console.log(temperature);
               
           

                if (parts.length === 2) {
                    const temperaturePart = parts[0];
                    const humidityPart = parts[1];
               

                    const temperatureKeyValue = temperaturePart.split(':');
                    const humidityKeyValue = humidityPart.split(':');
              

                    if (temperatureKeyValue.length === 2 && humidityKeyValue.length === 2 ) {
                        const temperature = temperatureKeyValue[1].trim();
                        const humidity = humidityKeyValue[1].trim();
                 

                        const cardFooters = document.querySelectorAll('.card__footer');
                        cardFooters.forEach((cardFooter, index) => {
                            const pilonId = cardFooter.parentElement.classList[1].split('-')[1];
                            const pilon = pilones.find(p => p.id == pilonId);

                           
                           
                          //  const arduinoAsignado = datosDeArduinoAsignados.find(arduino => arduino.pilon_encargado == pilonId);


                            //const identificador = pilon.arduino_asignado;


                            cardFooter.innerHTML = temperature  ;

                            if (1 ==  1) {
                                cardFooter.innerHTML = `${temperature}º ${humidity} `  ;
                            
             
                              
                                if (parseFloat(temperature) > pilon.temp_max) {
                                    cardFooter.parentElement.classList.add('high-temperature');
                                    cardFooter.parentElement.classList.remove('low-temperature');
                                    cardFooter.parentElement.classList.remove('success-temperature');

                                } else if (parseFloat(temperature) < pilon.temp_min) {
                                    cardFooter.parentElement.classList.add('low-temperature');
                                    cardFooter.parentElement.classList.remove('high-temperature');
                                    cardFooter.parentElement.classList.remove('success-temperature');

                                } else {
                                    cardFooter.parentElement.classList.add('success-temperature');
                                    cardFooter.parentElement.classList.remove('high-temperature');
                                    cardFooter.parentElement.classList.remove('low-temperature');
                                }

                                const currentText = cardFooter.textContent.substr(0, 5);

                                if (previousTextMap[pilonId] !== currentText) {
                                    lastUpdateTimestamps[pilonId] = Date.now();
                                }

                                previousTextMap[pilonId] = currentText;
                            }    
                        })          
                     
                     } 
                     
                
                }
             
            });
            }            
           }); 
                       

            setInterval(() => {
                const currentTime = Date.now();
                const cardFooters = document.querySelectorAll('.card__footer');
                cardFooters.forEach(cardFooter => {
                    const pilonId = cardFooter.parentElement.classList[1].split('-')[1];
                    const lastUpdate = lastUpdateTimestamps[pilonId];

                    if (lastUpdate && (currentTime - lastUpdate > 2000)) { // 2000 ms = 2 seconds
                        cardFooter.parentElement.classList.add('warning-temperature');
                        cardFooter.parentElement.classList.remove('success-temperature');
                        cardFooter.parentElement.classList.remove('high-temperature');
                        cardFooter.parentElement.classList.remove('low-temperature');

            
                 
                        document.getElementById('temperatura_uno');
                        document.getElementById('temperatura_dos');
                    }
                });
            }, 2000); // Every 2 seconds

            const totalPages = Math.ceil(pilones.length / cardsPerPage);

            for (let i = 1; i <= totalPages; i++) {
                const link = document.createElement('a');
                link.href = '#';
                link.textContent = i;
                paginationContainer.appendChild(link);
            }

            const paginationLinks = document.querySelectorAll('.pagination a');
            paginationLinks[0].classList.add('page-active');

            paginationLinks.forEach(link => {
                link.addEventListener('click', event => {
                    event.preventDefault();
                    showPage(link.textContent);

                    paginationLinks.forEach(paginationLink => {
                        paginationLink.classList.remove('page-active');
                    });

                    link.classList.add('page-active');
                });
            });

            function showPage(pageNumber) {
                const startIndex = (pageNumber - 1) * cardsPerPage;
                const endIndex = startIndex + cardsPerPage;

                Array.from(container.children).forEach(card => {
                    card.style.display = 'none';
                });

                for (let i = startIndex; i < endIndex; i++) {
                    if (container.children[i]) {
                        container.children[i].style.display = 'block';
                    }
                }
            }

            showPage(1);

        })
        .catch(error => {
            const errorModalBody = $("#errorModal").find(".modal-body");
            errorModalBody.html('<strong>Error fetching pilones data: </strong>' + error);
            $("#errorModal").modal("show");
        });
}
cargarDatosDeArduinoAsignados();





















let autosaveInterval;

document.addEventListener("DOMContentLoaded", function () {
    const intervalSelect = document.getElementById('intervalSelect');



    const saveTempsButton = document.getElementById('saveAllTemps');
    saveTempsButton.addEventListener('click', saveAllTemperatures);
    function saveAllTemperatures() {
      const cardsWithNumericData = document.querySelectorAll('.card');
      let hasTemperatures = false;
  
      cardsWithNumericData.forEach(card => {
          const cardFooter = card.querySelector('.card__footer');
          if (hasNumericValues(cardFooter.textContent)) {
              hasTemperatures = true;
              saveTemperature(card);
          }
      });
  
      if (!hasTemperatures) {
          // Si no hay temperaturas, mostrar el modal de error
          $("#errorModal").modal("show");
          return;
      }
  
      console.log('All temperatures saved!');
      $("#successModal").on("shown.bs.modal", function () {
          setTimeout(function () {
              location.reload();
          }, 5000);
      }).modal("show");
  }
  

  

    // Genera dinámicamente las opciones del select
    for (let i = 1; i <= 24; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        intervalSelect.appendChild(option);
    }

    // Recupera la última opción seleccionada almacenada en localStorage
    const lastSelectedOption = localStorage.getItem('lastSelectedOption');

    if (lastSelectedOption) {
        intervalSelect.value = lastSelectedOption;
    } else {
        // Si no hay una última opción seleccionada, establece predeterminadamente el valor en 2
        intervalSelect.value = '12';
        // Guarda esta opción predeterminada en el almacenamiento local
        localStorage.setItem('lastSelectedOption', '12');
    }

    // Guardar automáticamente según la opción seleccionada
    autosaveInterval = setInterval(saveTemperatureAutomatically, intervalSelect.value * 60 * 60 * 1000);

    function setAutosaveInterval() {
        const newInterval = parseInt(intervalSelect.value, 10) * 60 * 60  * 1000;

        // Almacena la opción seleccionada en localStorage
        localStorage.setItem('lastSelectedOption', intervalSelect.value);

        clearInterval(autosaveInterval);
        autosaveInterval = setInterval(saveTemperatureAutomatically, newInterval);
    }

    function saveTemperatureAutomatically() {
        const cardsWithNumericData = document.querySelectorAll('.card');

        cardsWithNumericData.forEach(card => {
            const cardFooter = card.querySelector('.card__footer');
            if (hasNumericValues(cardFooter.textContent)) {
                saveTemperature(card);
            }
        });
    }

    // Agrega el evento de cambio al select
    intervalSelect.addEventListener('change', setAutosaveInterval);

    // Resto de tu código...

    function hasNumericValues(text) {
        const regex = /\d+\.\d+\sFº/g;
        return regex.test(text);
    }

    function saveTemperature(card) {
        const cardFooter = card.querySelector('.card__footer');
        const temperatureMatch = cardFooter.textContent.match(/\d+\.\d+\sFº/);

        if (temperatureMatch) {
            const pilonId = card.classList[1].split('-')[1];
            const temperatureValue = parseFloat(temperatureMatch[0]);

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
                    $("#successModal").on("shown.bs.modal", function () {
                      setTimeout(function () {
                          location.reload();
                      }, 5000);
                  }).modal("show");
                })
                .catch(error => {
                    console.error('Error saving temperature:', error);
                    $("#errorModal").modal("show");
                });
            } else {
                console.error('Invalid temperature value');
                $("#errorModal").modal("show");
            }
        } else {
            console.error('Temperature not found or invalid format');
            $("#errorModal").modal("show");
        }
    }
});
