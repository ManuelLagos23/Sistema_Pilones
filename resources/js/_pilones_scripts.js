
$("#pilonList").on("click", ".graphics-btn", function () {
    $("#turningWettingGraphicsModal").modal("show");
});

$(document).ready(function () {
    $.get("/api/pilones", function (data) {



        var table = $("#pilonList");
        
        if (data.length === 0) {
            if (!$.fn.DataTable.isDataTable('#myTablePilones')) {
                $('#myTablePilones').DataTable({
                    "columns": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
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
                    <td colspan="11" style="text-align: center;">
                        <strong>¿Desea agregar un pilón?</strong><br>
                        <a href="/crear_pilones">
                        <button class="btn btn-primary" style="background-color: rgba(255,255,255,0); border: none;" type="button" >
                            <img src="../../../../resources/images/plus.png" width="30" height="30" alt="Agregar tipo">
                        </button>
                        </a>
                    </td>
                </tr>
            `);
        } else {





        
        data.forEach(function (pilón) {
            const fechaIngreso = new Date(pilón.fecha_ingreso).toISOString().split('T')[0]; 
            const fechaEmpilonado = new Date(pilón.fecha_empilonado).toLocaleDateString('es-ES');

            $("#pilonList").append(`
                <tr>
                    <td>${pilón.nombre}</td>
                    <td>${pilón.variedad}</td>
                          <td>${pilón.corte}</td>
                    <td>${pilón.finca}</td>
                    <td>Etapa ${pilón.etapa}</td>
                    <td>${pilón.pn}</td>
                    <td>${pilón.temp_min}</td>
                    <td>${pilón.temp_max}</td>
              
                    <td>${pilón.estado}</td>
                    <td>${pilón.proceso_del_pilon}</td>
                    <td>${fechaEmpilonado}</td>
                    <td>
                        <button class="btn btn-danger btn-sm graphics-btn" style="background-color: transparent; border: none;" data-id="${pilón.id}" data-toggle="modal" data-target="#turningWettingGraphicsModal"><img
                        src="../../../../resources/images/graphics.png" width="30" height="30"></button></button>
                        <button class="btn btn-primary btn-sm details-btn" style="background-color: rgba(255,255,255,0); border: none;" data-id="${pilón.id}" data-toggle="modal" data-target="#detailsPilonModal"><img
                        src="../../../../resources/images/details.png" width="30" height="30"></button></button>

                        <a class="btn btn-primary btn-sm edit-btn" style="background-color: rgba(255,255,255,0); border: none;"  href="/crear_pilones">
                        <img src="../../../../resources/images/plus.png" width="30" height="30">
                    </a>
                    


                    <button class="btn btn-primary btn-sm edit-btn" style="background-color: rgba(255,255,255,0); border: none;" data-id="${pilón.id}" data-toggle="modal" data-target="#editPilonModal"><img
                    src="../../../../resources/images/edit.png" width="30" height="30"></button></button>
              
                        <button class="btn btn-danger btn-sm delete-btn" style="background-color: rgba(255,255,255,0); border: none;" data-id="${pilón.id}" data-toggle="modal" data-target="#deletePilonModal"><img
                        src="../../../../resources/images/delete.png" width="30" height="30"></button></button>
                    </td>
                    
                 
                </td>
                </tr>
            `);
        });


        $(document).ready(function () {
            $('#myTablePilones').DataTable({
                dom: 'lBfrtip',
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: 'Exportar a Excel',
                        className: 'btn btn-primary dt-buttons btnExcel',
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                        },
                    },
                    {
                        extend: 'print',
                        text: 'Imprimir / Guardar en PDF',
                        className: 'btn btn-secondary dt-buttons btnPrint',
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                        }
                    }
                ],
                "iDisplayLength": 10,
                "aoColumnDefs": [
                    { "bSearchable": true, "aTargets": [0] },
                    { "bSearchable": true, "aTargets": [1] },
                    { "bSearchable": true, "aTargets": [2] },
                    { "bSearchable": true, "aTargets": [3] },
                    { "bSearchable": false, "aTargets": [4] },
                    { "bSearchable": false, "aTargets": [5] },
                    { "bSearchable": false, "aTargets": [6] },
                    { "bSearchable": true, "aTargets": [7] },
                    { "bSearchable": false, "aTargets": [8] },
                    { "bSearchable": false, "aTargets": [9] }
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
            const table = $('#myTablePilones').DataTable();

            $('a.toggle-vis').on('click', function (e) {
                e.preventDefault();
        
                let columnIdx = $(this).data('column');
                let column = table.column(columnIdx);
        
                // Toggle the visibility
                column.visible(!column.visible());
        
                // Change color of options
                if (column.visible()) {
                    $(this).addClass('active-option').removeClass('inactive-option');
                } else {
                    $(this).removeClass('active-option').addClass('inactive-option');
                }
            });
        });
  

        // DELETE BUTTON
        $("#pilonList").on("click", ".delete-btn", function () {
            const pilonId = $(this).data("id");
            const deletePilonButton = document.getElementById('deletePilonButton');
            deletePilonButton.setAttribute('data-pilón-id', pilonId);
            $("#deletePilonModal").modal("show");
        });

        // On click
        $("#deletePilonButton").on("click", function () {
            const pilonId = $(this).data("pilón-id");

            fetch(`/api/pilones/${pilonId}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        location.reload();
                    } else {
                        throw new Error('Error al eliminar el pilón.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });

  // UPDATE MODAL
  $("#pilonList").on("click", ".edit-btn", function () {
    const pilonId = $(this).data("id");

    $.get(`/api/pilones/${pilonId}`, function (pilón) {

        const fechaEmpilonado = new Date(pilón.fecha_empilonado).toISOString().split('T')[0];
        $("#editNombre").val(pilón.nombre);
        $("#editFinca").val(pilón.finca);
        $("#editVariedad").val(pilón.variedad);
        $("#editCorte").val(pilón.corte);
        $("#editClase").val(pilón.clase);
        $("#editCosecha").val(pilón.cosecha);
        $("#editEtapa").val(pilón.etapa);
        $("#editPN").val(pilón.pn);
        $("#editTipo").val(pilón.tipo_tabaco);
        $("#editTempMin").val(pilón.temp_min);
        $("#editTempMax").val(pilón.temp_max);
        $("#editEstado").val(pilón.estado);
        $("#editEmpilonado").val(fechaEmpilonado);
       
        console.log("Fecha del pilón:", pilón.fecha_empilonado);

    
        $("#editProceso").val(pilón.proceso_del_pilon);

        $("#editPilonModal").modal("show");
        $("#updatePilonButton").data("id", pilonId);
    });
});
        
    

        // On click
        $("#updatePilonButton").on("click", async function (event) {
            event.preventDefault();

            const pilonId = $(this).data("id");
            const nombre = $("#editNombre").val();
            const finca = $("#editFinca").val();
            const variedad = $("#editVariedad").val();
            const corte = $("#editCorte").val();
            const clase = $("#editClase").val();
            const cosecha = $("#editCosecha").val();
            const etapa = $("#editEtapa").val();
            const pn = $("#editPN").val();
            const tipo_tabaco = $("#editTipo").val();
            const temp_min = $("#editTempMin").val();
            const temp_max = $("#editTempMax").val();
            const estado = $("#editEstado").val();
            const empilonado = $("#editEmpilonado").val();
            const proceso = $("#editProceso").val();

            const requestBody = {
                nombre,
                finca,
                variedad,
                corte,
                clase,
                cosecha,
                etapa,
                tipo_tabaco,
                pn,
                temp_min,
                temp_max,
                estado,
                empilonado,
                proceso,
            };

            try {
                const response = await fetch(`/api/pilones/${pilonId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                });

                if (response.ok) {
                    $("#editPilonModal").modal("hide");
                    location.reload();
                } else {
                    const errorData = await response.json();
                    console.error("Error updating pilón:", errorData);
                }
            } catch (error) {
                console.error("Error updating pilón:", error);
            }
        });

        // CREATE MODAL
        $("#createPilonForm").submit(async function (event) {
            event.preventDefault();

            const nombre = $("#nombre").val();
            const finca = $("#finca").val();
            const corte = $("#corte").val();
            const clase = $("#clase").val();
            const cosecha = $("#cosecha").val();
            const empilonado = $("#empilonado").val();
            const tipo_tabaco = $("#tipo_tabaco").val();
            const variedad = $("#variedad").val();
            const etapa = $("#etapa").val();
            const pn = $("#pn").val();
            const temp_min = $("#temp_min").val();
            const temp_max = $("#temp_max").val();
            const estado = $("#estado").val();
            const proceso = $("#proceso_pilon").val();

            const requestBody = {
                nombre,
                finca,
                corte,
                clase,
                cosecha,
                empilonado,
                tipo_tabaco,
                variedad,
                etapa,
                pn,
                temp_min,
                temp_max,
                estado,
                proceso,
            };

            try {
                const response = await fetch('/api/pilones', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });

                if (response.ok) {
                  

                    $("#successFormularioModal").modal("show");
                    setTimeout(function() {
                        window.location.href = "/pilones_list";
                    }, 3000);

    
            
                } else {

                    $("#errorformularioModal").modal("show");
                    const errorData = await response.json();
                    console.error('Error creating pilón:', errorData);

                 
                }
            } catch (error) {
                console.error('Error creating pilón:', error);
            }
        });




        //  Listado de variedad


        // DETAILS MODAL
        $("#pilonList").on("click", ".details-btn", function () {
            const pilonId = $(this).data("id");
            console.log('Selected pilón with ID', pilonId);

            $.get(`/api/pilones/${pilonId}`, function (pilon) {
              
                $("#detailsPilonModal .modal-body").empty();
                
              
                const detailsContainer = $("#detailsPilonModal .modal-body");
                const leftColumn = $('<div style="text-align: left; " class="col-md-6 text-left"></div>');
                const rightColumn = $('<div style="text-align: left; margin-bottom=10%" class="col-md-6 text-left00 "></div>');
                
                
                leftColumn.append(`<p ><strong>Nombre del pilón:</strong> ${pilon.nombre}</p>`);
                leftColumn.append(`<p><strong>Fecha de entrada:</strong> ${new Date(pilon.fecha_ingreso).toISOString().slice(0, 10)}</p>`);
                leftColumn.append(`<p><strong>Fuente:</strong> ${pilon.finca}</p>`); 
                leftColumn.append(`<p><strong>Variedad:</strong> ${pilon.variedad}</p>`);
                leftColumn.append(`<p><strong>Corte:</strong> ${pilon.corte}</p>`);
                leftColumn.append(`<p><strong>Clase:</strong> ${pilon.clase}</p>`);
                leftColumn.append(`<p><strong>Cosecha:</strong> ${pilon.cosecha}</p>`);
                leftColumn.append(`<p><strong>Etapa:</strong> Stage ${pilon.etapa}</p>`);
                
             
                rightColumn.append(`<p><strong>Tipo:</strong> ${pilon.tipo_tabaco}</p>`);
                rightColumn.append(`<p><strong>Peso neto:</strong> ${pilon.pn}</p>`);
                rightColumn.append(`<p><strong>Temperatura mínima permitida:</strong> ${pilon.temp_min} Cº</p>`);
                rightColumn.append(`<p><strong>Temperatura máxima permitida:</strong> ${pilon.temp_max} Cº</p>`);
                rightColumn.append(`<p><strong>Estado:</strong> ${pilon.estado}</p>`);
                rightColumn.append(`<p><strong>Sensor asignado:</strong> ${pilon.direccion_sensor}</p>`);
                rightColumn.append(`<p><strong>Fecha de empilonado:</strong> ${new Date(pilon.fecha_empilonado).toISOString().slice(0, 10)}</p>`);
                rightColumn.append(`<p><strong>Proceso del pilón:</strong> ${pilon.proceso_del_pilon}</p>`);
                
                
                const row = $('<div class="row"></div>');
                row.append(leftColumn);
                row.append(rightColumn);
                detailsContainer.append(row);
                    
                    

                // Abre el modal
                $("#detailsPilonModal").modal("show");
            });
        });
    }
    });
    
});




document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/etapa")
        .then(response => response.json())
        .then(data => {
            const Select = document.getElementById("etapa");
            data.forEach(results => {
                const option = document.createElement("option");
                option.value = results.etapa_tabaco;
                option.textContent = results.etapa_tabaco;
                Select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
});


document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/etapa")
        .then(response => response.json())
        .then(data => {
            const Select = document.getElementById("editEtapa");
            data.forEach(results => {
                const option = document.createElement("option");
                option.value = results.etapa_tabaco;
                option.textContent = results.etapa_tabaco;
                Select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
});
 



document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/variedad")
        .then(response => response.json())
        .then(data => {
            const Select = document.getElementById("variedad");
            data.forEach(results => {
                const option = document.createElement("option");
                option.value = results.variedad_tabaco;
                option.textContent = results.variedad_tabaco;
                Select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/variedad")
        .then(response => response.json())
        .then(data => {
            const Select = document.getElementById("editVariedad");
            data.forEach(results => {
                const option = document.createElement("option");
                option.value = results.variedad_tabaco;
                option.textContent = results.variedad_tabaco;
                Select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
});






document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/clase")
        .then(response => response.json())
        .then(data => {
            const Select = document.getElementById("clase");
            data.forEach(results => {
                const option = document.createElement("option");
                option.value = results.clase_tabaco;
                option.textContent = results.clase_tabaco;
                Select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
});





document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/clase")
        .then(response => response.json())
        .then(data => {
            const Select = document.getElementById("editClase");
            data.forEach(results => {
                const option = document.createElement("option");
                option.value = results.clase_tabaco;
                option.textContent = results.clase_tabaco;
                Select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
});




document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/corte")
        .then(response => response.json())
        .then(data => {
            const Select = document.getElementById("corte");
            data.forEach(results => {
                const option = document.createElement("option");
                option.value = results.corte_tabaco;
                option.textContent = results.corte_tabaco;
                Select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
});


document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/corte")
        .then(response => response.json())
        .then(data => {
            const Select = document.getElementById("editCorte");
            data.forEach(results => {
                const option = document.createElement("option");
                option.value = results.corte_tabaco;
                option.textContent = results.corte_tabaco;
                Select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
});





document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/finca")
        .then(response => response.json())
        .then(data => {
            const Select = document.getElementById("finca");
            data.forEach(results => {
                const option = document.createElement("option");
                option.value = results.finca_tabaco;
                option.textContent = results.finca_tabaco;
                Select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/finca")
        .then(response => response.json())
        .then(data => {
            const Select = document.getElementById("editFinca");
            data.forEach(results => {
                const option = document.createElement("option");
                option.value = results.finca_tabaco;
                option.textContent = results.finca_tabaco;
                Select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
});




document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/tipo")
        .then(response => response.json())
        .then(data => {
            const Select = document.getElementById("tipo_tabaco");
            data.forEach(results => {
                const option = document.createElement("option");
                option.value = results.tipo_tabaco;
                option.textContent = results.tipo_tabaco;
                Select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/tipo")
        .then(response => response.json())
        .then(data => {
            const Select = document.getElementById("editTipo");
            data.forEach(results => {
                const option = document.createElement("option");
                option.value = results.tipo_tabaco;
                option.textContent = results.tipo_tabaco;
                Select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
});






document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/proceso")
        .then(response => response.json())
        .then(data => {
            const Select = document.getElementById("proceso_pilon");
            data.forEach(results => {
                const option = document.createElement("option");
                option.value = results.proceso_tabaco;
                option.textContent = results.proceso_tabaco;
                Select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/proceso")
        .then(response => response.json())
        .then(data => {
            const Select = document.getElementById("editProceso");
            data.forEach(results => {
                const option = document.createElement("option");
                option.value = results.proceso_tabaco;
                option.textContent = results.proceso_tabaco;
                Select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
});
