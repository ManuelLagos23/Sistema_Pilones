$(document).ready(function () {
    function getPilonesData() {
        return new Promise((resolve, reject) => {
            $.get("/api/pilones", function (data) {
                resolve(data);
            }).fail(function (error) {
                reject(error);
            });
        });
    }

    function getArduinosData() {
        return new Promise((resolve, reject) => {
            $.get("/api/arduinos", function (data) {
                resolve(data);
            }).fail(function (error) {
                reject(error);
            });
        });
    }

    Promise.all([getPilonesData(), getArduinosData()])
        .then(([pilonesData, arduinosData]) => {
            var table = $("#arduinosList");

            if (arduinosData.length === 0) {
                if (!$.fn.DataTable.isDataTable('#myTableArduinos')) {
                    $('#myTableArduinos').DataTable({
                        "columns": [
                            null,
                            null,
                            null,
                            null,
                            null
                        ]
                    });
                }

                table.html(`
                    <tr>
                        <td colspan="5" style="text-align: center;">
                            <strong>¿Desea agregar un sensor?</strong><br>
                            <button class="btn btn-primary" style="background-color: rgba(255,255,255,0); border: none;" type="button" data-bs-toggle="modal" data-bs-target="#createArduinoModal">
                                <img src="../../../../resources/images/plus.png" width="30" height="30" alt="Agregar proceso">
                            </button>
                        </td>
                    </tr>
                `);
            } else {
                arduinosData.forEach(function (arduino) {
                    const pilonData = pilonesData.find(pilon => pilon.id === arduino.pilon_encargado);
                    const pilonNombre = pilonData ? pilonData.nombre : 'No hay pilón seleccionado.';

                    $("#arduinosList").append(`
                        <tr>
                            <td>${arduino.nombre}</td>
                            <td>${arduino.direccion_bits}</td>
                            <td>${arduino.arduino_port}</td>
                            <td>${pilonNombre}</td>
                            <td>
                                <button class="btn btn-primary btn-sm" style="background-color: rgba(255,255,255,0); border: none;" type="button" data-bs-toggle="modal" data-bs-target="#createArduinoModal">
                                    <img src="../../../../resources/images/plus.png" width="30" height="30">
                                </button>
                                <button class="btn btn-primary btn-sm edit-btn" style="background-color: rgba(255,255,255,0); border: none;" data-id="${arduino.id}" data-bs-toggle="modal" data-bs-target="#editArduinoModal">
                                    <img src="../../../../resources/images/edit.png" width="30" height="30">
                                </button>
                                <button class="btn btn-danger btn-sm delete-btn" style="background-color: rgba(255,255,255,0); border: none;" data-id="${arduino.id}" data-bs-toggle="modal" data-bs-target="#deleteArduinoModal">
                                    <img src="../../../../resources/images/delete.png" width="30" height="30">
                                </button>
                            </td>
                        </tr>
                    `);
                });

                if (!$.fn.DataTable.isDataTable('#myTableArduinos')) {
                    $('#myTableArduinos').DataTable({
                        dom: 'lBfrtip',
                        buttons: [
                            {
                                extend: 'excelHtml5',
                                text: 'Exportar a Excel',
                                className: 'btn btn-primary dt-buttons btnExcel',
                                exportOptions: {
                                    columns: [0, 1, 2, 3]
                                }
                            },
                            {
                                extend: 'print',
                                text: 'Imprimir / Guardar en PDF',
                                className: 'btn btn-secondary dt-buttons btnPrint',
                                exportOptions: {
                                    columns: [0, 1, 2, 3]
                                }
                            }
                        ],
                        "iDisplayLength": 10,
                        "aoColumnDefs": [
                            { "bSearchable": true, "aTargets": [0] },
                            { "bSearchable": true, "aTargets": [1] },
                            { "bSearchable": false, "aTargets": [2] },
                            { "bSearchable": true, "aTargets": [3] },
                        ],
                    
                        
                        search: {
                            regex: true,
                            smart: false
                        },
                        "language": {
                            "lengthMenu": "Mostrar _MENU_ entradas",
                            "zeroRecords": "No se encontraron resultados",
                            "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
                            "infoEmpty": "Mostrando 0 a 0 de 0 entradas",
                            "infoFiltered": "(filtrado de _MAX_ entradas totales)",
                            "search": "Buscar:",
                            "paginate": {
                                "first": "Primero",
                                "last": "Último",
                                "next": "Siguiente",
                                "previous": "Anterior"
                            },
                            "loadingRecords": "Cargando...",
                            "processing": "Procesando...",
                            "emptyTable": "No hay datos disponibles en la tabla"
                        }
                    });

                    // Show/Hide columns
                    const table = $('#myTableArduinos').DataTable();

                    $('a.toggle-vis').on('click', function (e) {
                        e.preventDefault();

                        let columnIdx = $(this).data('column');
                        let column = table.column(columnIdx);

                        // Toggle the visibility
                        column.visible(!column.visible());

                        // Change color of options
                        if (column.visible()) {
                            $(this).addClass('active-option');
                            $(this).removeClass('inactive-option');
                        } else {
                            $(this).removeClass('active-option');
                            $(this).addClass('inactive-option');
                        }
                    });
                }
            }
        

        // DELETE
        $("#arduinosList").on("click", ".delete-btn", function () {
            const arduinoId = $(this).data("id");
            const deleteArduinoButton = document.getElementById('deleteArduinoButton');
            deleteArduinoButton.setAttribute('data-arduino-id', arduinoId);
            $("#deleteArduinoModal").modal("show");
        });

        // DELETE => On click
        $("#deleteArduinoButton").on("click", function () {
            const arduinoId = $(this).data("arduino-id");

            fetch(`/api/arduinos/${arduinoId}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        location.reload();
                    } else {
                        throw new Error('Error deleting arduino.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });

        // UPDATE MODAL
        $("#arduinosList").on("click", ".edit-btn", function () {
            const arduinoId = $(this).data("id");
            console.log("Primer ID: " + arduinoId);

            $.get(`/api/arduinos/${arduinoId}`, function (arduino) {
                $("#editNombre").val(arduino.nombre);
                $("#editDireccion").val(arduino.direccion_bits);
                $("#editPilonEncargado").val(arduino.pilon_encargado);
                $("#EditPort").val(arduino.arduino_port);

          
                $.get("/api/pilones", function (data) {
                    const pilonSelect = document.getElementById("editPilonEncargado");
                    pilonSelect.innerHTML = "";
                
              
                    const blankOption = document.createElement("option");
                    blankOption.value = "";  
                    blankOption.textContent = "No seleccionar pilón";  
                    blankOption.value = 0;  
                    pilonSelect.appendChild(blankOption);
                
                
                    data.forEach(function (pilon) {
                        const option = document.createElement("option");
                        option.value = pilon.id;
                        option.textContent = pilon.nombre;
                        pilonSelect.appendChild(option);
                
                      
                        if (pilon.id === arduino.pilon_encargado) {
                            option.selected = true;  
                        }
                    });
                


if (pilonAsignado) {
    pilonSelect.value = arduino.pilon_encargado;
}

                });
                
                
                
                

                    
                    if (arduino.pilon_encargado && data.some(pilon => pilon.id === arduino.pilon_encargado)) {
                        pilonSelect.value = arduino.pilon_encargado;
                    }
                });
                
                $("#editArduinoModal").modal("show");
                $("#updateArduinoButton").data("id", arduinoId);
                console.log("Arduino : " + arduinoId);
            });
        });

        // UPDATE => On click
        $("#updateArduinoButton").on("click", async function (event) {
            event.preventDefault();

            const arduinoId = $(this).data("id");
            const nombre = $("#editNombre").val();
            const direccion_bits = $("#editDireccion").val();
            const pilon_encargado = $("#editPilonEncargado").val();
            const arduino_port = $("#EditPort").val();

            const requestBody = {
                nombre,
                direccion_bits,
                pilon_encargado,
                arduino_port,
            };

            try {
                const response = await fetch(`/api/arduinos/${arduinoId}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                });

                if (response.ok) {
                    $("#editArduinoModal").modal("hide");
                    location.reload();
                } else {
                    const errorData = await response.json();
                    console.error("Error updating pilón:", errorData);
                }
            } catch (error) {
                console.error("Error updating pilón:", error);
            }
        });

        // CREATE 
        $("#createArduinoForm").submit(function (event) {
            event.preventDefault();

            const nombre = $("#nombre").val();
            const direccion_bits = $("#direccion_bits").val();
            const pilon_encargado = $("#pilon_encargado").val();
            const arduino_port = $("#arduino_port").val();

            fetch(`/api/arduinos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre,
                    direccion_bits,
                    pilon_encargado,
                    arduino_port
                })
            })
                .then(response => {
                    if (response.ok) {
                  
                        if (response.ok) {
                            $("#createArduinoModal").modal("hide");
                            $("#successModal").on("shown.bs.modal", function () {
                                setTimeout(function () {
                                    location.reload();
                                }, 3000); // Espera 5 segundo antes de recargar la página
                            }).modal("show");
                        }
                    } else {
                        $("#errorModal").modal("show");
                        throw new Error('Error creating arduino.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });


        //PILONES 
        $.get("/api/pilones", function (data) {
            const pilonSelect = document.getElementById("pilon_encargado");
            
         
            pilonSelect.innerHTML = "";
        
            // Crear una opción en blanco
            const blankOption = document.createElement("option");
            blankOption.value = 0;  
            blankOption.textContent = "No seleccionar pilón";  
            pilonSelect.appendChild(blankOption);
        
            data.forEach(function (pilon) {
         
                if (!pilon.direccion_sensor) {
                    const option = document.createElement("option");
                    option.value = pilon.id;
                    option.textContent = pilon.nombre;
                    pilonSelect.appendChild(option);
                }
            });
        })


      
         
            
    });
