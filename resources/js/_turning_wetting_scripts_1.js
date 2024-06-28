
$("#options").on("click", function () {
    $("#turningWettingModal").modal("show");
});
$("#tasksList").on("click", ".graphics-btn", function () {
    $("#turningWettingGraphicsModal").modal("show");
});

$(document).ready(function () {
    $.get("/api/pilones_task", function (data) {
        data.forEach(function (pilonTask) {
            const task_start_date = new Date(pilonTask.task_start_date).toISOString().split('T')[0];
            const task_end_date = new Date(pilonTask.task_end_date).toISOString().split('T')[0];


const person_in_charge = pilonTask.person_in_charge.split(',');


const personasNumeradas = person_in_charge.map((persona, index) => {
    
    
    return `${persona}`;
});


const grupo1 = [];
const grupo2 = [];
personasNumeradas.forEach((persona, index) => {
    if (index % 2 === 0) {
        grupo1.push(persona);
    } else {
        grupo2.push(persona);
    }
});


const htmlColumna1 = `<ul>${grupo1.map(persona =>`<li>${persona}</li>`).join('')}</ul>`;
const htmlColumna2 = `<ul>${grupo2.map(persona =>`<li>${persona}</li>`).join('')}</ul>`;




            $("#tasksList").append(`
                <tr>
                <td>${pilonTask.id_orden}</td>   
                <td>
                <div style="float: left; width: 50%;">${htmlColumna1}</div>
                <div style="float: left; width: 50%;">${htmlColumna2}</div>
            </td>
     
                    <td>${pilonTask.task}</td>
                    <td>${pilonTask.pilon_selected}</td>
                    <td>${pilonTask.task_start_temp}</td>
                    <td>${task_start_date}</td>
                    <td>${pilonTask.start_time}</td>
                    <td>${task_end_date}</td>
                    <td>${pilonTask.end_time}</td>                   
                    <td>
                           <button class="btn btn-primary btn-sm details-btn" style="background-color: rgba(255,255,255,0); border: none;" data-id="${pilonTask.id}" data-toggle="modal" data-target="#detailsTaskModal"><img
                        src="../../../../resources/images/details.png" width="30" height="30"></button> 

                    <button class="btn btn-primary btn-sm" style="background-color: rgba(255,255,255,0); border: none;" type="button" class="nav-link px-2" style="color: #87ff8d;" data-bs-toggle="modal" data-bs-target="#turningWettingModal"><img src="../../../../resources/images/plus.png" width="30" height="30"></button>
                        <button class="btn btn-primary btn-sm edit-btn" style="background-color: transparent; border: none;" data-id="${pilonTask.id}" data-toggle="modal" data-target="#editPilonTaskModal"><img
                        src="../../../../resources/images/edit.png" width="30" height="30"></button>
                        <button class="btn btn-danger btn-sm delete-btn" style="background-color: transparent; border: none;" data-id="${pilonTask.id}" data-toggle="modal" data-target="#deletePilonTaskModal"><img
                        src="../../../../resources/images/delete.png" width="30" height="30"></button>
                    </td>
                </tr>
            `);
        });

        $(document).ready(function () {
            $('#turningTable').DataTable({
                dom: 'lBfrtip',
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: 'Exportar a Excel',
                        className: 'btn btn-primary dt-buttons btnExcel',
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8]
                        }
                    },
                    {
                        extend: 'print',
                        text: 'Imprimir / Guardar en PDF',
                        className: 'btn btn-secondary dt-buttons btnPrint',
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8 ]
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

            
       const table = $('#turningTable').DataTable();
       
       $('a.toggle-vis').on('click', function (e) {
        e.preventDefault();
  
        let columnIdx = $(this).data('column');
        let column = table.column(columnIdx);

        column.visible(!column.visible());

        if (column.visible()) {
            $(this).addClass('active-option');
            $(this).removeClass('inactive-option');
        } else {
            $(this).removeClass('active-option');
            $(this).addClass('inactive-option');
        }

        // Ajustar las columnas y redibujar la tabla
        table.columns.adjust().draw(false);
    });
});

    });

    
 // DELETE
 $("#tasksList").on("click", ".delete-btn", function () {
    const taskId = $(this).data("id");
    console.log(taskId);
    const deleteTareaButton = document.getElementById('deleteTareaButton');
    deleteTareaButton.setAttribute('data-task-id', taskId);
    $("#deletePilonTaskModal").modal("show");
});

// DELETE => On click
$("#deleteTareaButton").on("click", function () {
    const taskId = $(this).data("task-id");

    fetch(`/api/pilones_task/${taskId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
               location.reload();
            } else {
                throw new Error('Error deleting proceso');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});



    // UPDATE MODAL
    $("#tasksList").on("click", ".edit-btn", function () {
        const taskId = $(this).data("id");

        $.get(`/api/pilones_task/${taskId}`, function (task) {
            $("#id").val(task.id_orden);
            $("#editTask").val(task.task);
            $("#n_orden").val(task.id_orden);
            $("#EditPilon_selected").val(task.pilon_selected);

            const formattedStartDate = new Date(task.task_start_date).toISOString().split('T')[0];
            $("#EditTask_Start_Date").val(formattedStartDate);

            const formattedEndDate = new Date(task.task_end_date).toISOString().split('T')[0];
            $("#EditTask_End_Date").val(formattedEndDate);

            $.get("/api/workers", function (data) {
        
                const person_in_chargeSelect = document.getElementById("EditPerson_in_charge");
                const personasSeleccionadasDiv = document.getElementById("personas_seleccionadas");
                
                
                person_in_chargeSelect.innerHTML = "";
                personasSeleccionadasDiv.textContent = "";
            
        
                data.forEach(function (worker) {
                    const option = document.createElement("option");
                    option.value = worker.nombre;
                    option.textContent = worker.nombre;
                    person_in_chargeSelect.appendChild(option);
                });
            
                
                const persons_in_charge = task.person_in_charge.split(",");
            
            
                const trimmedPersons = persons_in_charge.map(person => person.trim());
            
                Array.from(person_in_chargeSelect.options).forEach(option => {
                    if (trimmedPersons.includes(option.value)) {
                        option.selected = true;
                    }
                });
        
            
                personasSeleccionadasDiv.textContent = trimmedPersons.join(", ");
                        
                    
                        
        

                $("#EditStart_time").val(task.start_time);
                $("#EditEnd_time").val(task.end_time);
                $("#EditTask_start_temp").val(task.task_start_temp );

                $("#editPilonTaskModal").modal("show");
                $("#updateTurningWettingButton").data("id", taskId);
            });
        });
    });

    // UPDATE => On click
    $("#updateTurningWettingButton").on("click", async function (event) {
        event.preventDefault();

        const taskId = $(this).data("id");
        const task = $("#editTask").val();
        const person_in_charge = $("#EditPerson_in_charge").val();
       

 
        const task_start_date = $("#EditTask_Start_Date").val();
        const task_end_date = $("#EditTask_End_Date").val();
        const start_time = $("#EditStart_time").val();
        const end_time = $("#EditEnd_time").val();

        const requestBody = {
            task,
            person_in_charge: Array.isArray(person_in_charge) ? person_in_charge : [person_in_charge], // Asegura que person_in_charge sea un arreglo
            task_start_date,
            task_end_date,
            start_time,
            end_time,
        };

        try {
            const response = await fetch(`/api/pilones_task/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                $("#editPilonTaskModal").modal("hide");
                $("#successUpdateModal").on("shown.bs.modal", function () {
                    setTimeout(function () {
                        location.reload();
                    }, 3000); // Espera 5 segundo antes de recargar la página
                }).modal("show");
            } else {
                const errorData = await response.json();
                console.error("Error updating pilón task:", errorData);
            }
        } catch (error) {
            console.error("Error updating pilón task:", error);
        }
    });

    // DETAILS MODAL
   
    $("#tasksList").on("click", ".details-btn", function () {
        const taskId = $(this).data("id");
        console.log(taskId); 
        
        if (taskId) {
            $.get(`/api/pilones_task/${taskId}`, function (task) {
                $("#detailsTaskModal .modal-body").empty();
                
                const detailsContainer = $("#detailsTaskModal .modal-body");
          

                function generateColumnsHtml(namesString) {
                    const names = namesString.split(',').map(name => name.trim()); // Dividir la cadena en un array y eliminar espacios en blanco
                
                    let htmlContent = '';
                
                    if (names.length > 0) {
                        const columnWidth = 100 / 3;
                        htmlContent += '<div style="display: flex; flex-wrap: wrap; width: 100%;">'; 
                
                        for (let i = 0; i < names.length; i++) {
                            htmlContent += `<div style="width: ${columnWidth}%; box-sizing: border-box; padding: 5px; text-align: left;">* ${names[i]}</div>`;
                        }
                
                        htmlContent += '</div>'; 
                    }
                
                    return htmlContent;
                }
         
                // Generar el HTML para las personas encargadas
                const personsInChargeHtml = generateColumnsHtml(task.person_in_charge);
                
                // Selecciona el elemento leftColumn
                const leftColumn = $('<div style="text-align: left;" class="col-md-6 text-left"></div>');
                const rightColumn = $('<div style="text-align: left; margin-bottom: 3%;" class="col-md-6 text-left"></div>');
                
                // Añade el contenido a leftColumn
                leftColumn.append(`<p><strong>Pilón:</strong> ${task.pilon_selected}</p><hr>`);
                leftColumn.append(`<p><strong>Tarea:</strong> ${task.task}</p><hr>`);
                leftColumn.append(`<p><strong>Fecha de inicio:</strong> ${task.task_start_date}</p><hr>`);
                leftColumn.append(`<p><strong>Hora de inicio:</strong> ${task.start_time}</p><hr>`);
                
                rightColumn.append(`<p><strong>Nº orden:</strong> ${task.id_orden}</p><hr>`);
                if (task.task_start_temp) {
                    rightColumn.append(`<p><strong>Temperatura:</strong> ${task.task_start_temp}</p><hr>`);
                } else {
                    rightColumn.append(`<p><strong>Temperatura:</strong> No hay temperatura.</p><hr>`);
                }
                rightColumn.append(`<p><strong>Fecha de finalización:</strong> ${task.task_end_date}</p><hr>`);
                rightColumn.append(`<p><strong>Hora de finalización:</strong> ${task.end_time}</p><hr>`);
                
                // Contenedor para las "Personas encargadas" que ocupa el 100% del modal
                const personsInChargeContainer = $(`<div style="width: 100%; ">
                    <p style="text-align: center;"><strong>Personas encargadas:</strong></p>
                    ${personsInChargeHtml}
                    
                </div>`);
                
                const row = $('<div class="row"></div>');
                row.append(leftColumn);
                row.append(rightColumn);
                
                // Añadir el contenedor de "Personas encargadas" fuera del contenedor `row`
                detailsContainer.append(row);
                detailsContainer.append(personsInChargeContainer);
                
                     
                
                
                $("#detailsTaskModal").modal("show");
            });
        } else {
            console.error("taskId no definido o es inválido.");
        }
    });

    // CREATE 
    $("#turning_wetting_Form").submit(function (event) {
        event.preventDefault();

        const task = $("#task").val();
       
        const pilon_selected = $("#pilon_selected").val();
        const task_start_date = $("#task_start_date").val();
        const task_start_temp = $("#task_start_temp").val();
        const task_end_date = $("#task_end_date").val();
        const start_time = $("#start_time").val();
        const end_time = $("#end_time").val();
        const orden = $("#id_orden").val();
        const id_pilon = $("#id_pilon").val();

       console.log(id_pilon);


       const selectedPersons = $("#person_in_charge").val(); 
    

        fetch(`/api/pilones_task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task,
                person_in_charge: selectedPersons, 
                pilon_selected,
                task_start_date,
                task_start_temp,
                task_end_date,
                start_time,
                end_time,
                orden,
                id_pilon,
            })
        })
        .then(response => {
            if (response.ok) {
                if (response.ok) {
                    $("#turningWettingModal").modal("hide");
                    $("#successTaskModal").on("shown.bs.modal", function () {
                        setTimeout(function () {
                            location.reload();
                        }, 3000); // Espera 3 segundo antes de recargar la página
                    }).modal("show");
                }
            } else {
                throw new Error('Error creating new task.');
            }
        })
            .catch(error => {
                console.error('Error:', error);
                $("#turningWettingModal").modal("hide");

                const errorModalBody = $("#errorModal").find(".modal-body");
                errorModalBody.html(error);
                $("#errorModal").modal("show");
            });

    
        });
});


