$(document).ready(function () {
    $.get("/api/workers", function (data) {


        var table = $("#workersList");
        
        if (data.length === 0) {
            if (!$.fn.DataTable.isDataTable('#myTableEmpleados')) {
                $('#myTableEmpleados').DataTable({
                    "columns": [
                        null,
                        null
                    ]
                });
            }
            
            table.html(`
                <tr>
                    <td colspan="4" style="text-align: center;">
                        <strong>¿Desea agregar un empleado?</strong><br>
                        <button class="btn btn-primary" style="background-color: rgba(255,255,255,0); border: none;" type="button" data-bs-toggle="modal" data-bs-target="#createWorkerModal">
                            <img src="../../../../resources/images/plus.png" width="30" height="30" alt="Agregar empleado">
                        </button>
                    </td>
                </tr>
            `);
        } else {
        data.forEach(function (worker) {
            $("#workersList").append(`
                <tr>
                    <td>${worker.nombre}</td>
                    <td>
                     <button class="btn btn-primary" style="background-color: rgba(255,255,255,0); border: none;" type="button" data-bs-toggle="modal" data-bs-target="#createWorkerModal">
                            <img src="../../../../resources/images/plus.png" width="30" height="30" alt="Agregar empleado">
                        </button>
                        <button class="btn btn-primary btn-sm edit-btn" style="background-color: rgba(255,255,255,0); border: none;" data-id="${worker.id}" data-toggle="modal" data-target="#editWorkerModal"><img
                        src="../../../../resources/images/edit.png" width="30" height="30"></button></button>
                        <button class="btn btn-danger btn-sm delete-btn" style="background-color: rgba(255,255,255,0); border: none;" data-id="${worker.id}" data-toggle="modal" data-target="#deleteWorkerModal"><img
                        src="../../../../resources/images/delete.png" width="30" height="30"></button></button>
                    </td>
                </tr>
            `);
        });

        $('#myTableEmpleados').DataTable({
            dom: 'lBfrtip',
            buttons: [
                {
                    extend: 'excelHtml5',
                    text: 'Exportar a Excel',
                    className: 'btn btn-primary dt-buttons btnExcel',
                    exportOptions: {
                        columns: [0, ]
                    }
                },
                {
                    extend: 'print',
                    text: 'Imprimir / Guardar en PDF',
                    className: 'btn btn-secondary dt-buttons btnPrint',
                    exportOptions: {
                        columns: [0, ]
                    }
                }
            ],
            "iDisplayLength": 10,
            "aoColumnDefs": [
                { "bSearchable": true, "aTargets": [0] },
                { "bSearchable": true, "aTargets": [1] },
          
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
            const tab = $('#myTableEmpleados').DataTable();

            $('a.toggle-vis').on('click', function (e) {
                e.preventDefault();

                let columnIdx = $(this).data('column');
                let column = tab.column(columnIdx);

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
    











        // DELETE
        $("#workersList").on("click", ".delete-btn", function () {
            const workerId = $(this).data("id");
            const deleteWorkerButton = document.getElementById('deleteWorkerButton');
            deleteWorkerButton.setAttribute('data-worker-id', workerId);
            $("#deleteWorkerModal").modal("show");
        });

        // DELETE => On click
        $("#deleteWorkerButton").on("click", function () {
            const workerId = $(this).data("worker-id");

            fetch(`/api/workers/${workerId}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        location.reload();
                    } else {
                        throw new Error('Error deleting worker');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    
        // UPDATE MODAL
        $("#workersList").on("click", ".edit-btn", function () {
            const workerId = $(this).data("id");

            $.get(`/api/workers/${workerId}`, function (worker) {
                $("#editNombre").val(worker.nombre);

                $("#editWorkerModal").modal("show");
                $("#updateWorkerButton").data("id", workerId);
            });
        });

        // UPDATE => On click
        $("#updateWorkerButton").on("click", async function (event) {
            event.preventDefault();

            const workerId = $(this).data("id");
            const nombre = $("#editNombre").val();

            const requestBody = {
                nombre,
            };

            try {
                const response = await fetch(`/api/workers/${workerId}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                });

                if (response.ok) {
                    if (response.ok) {
                        $("#editWorkerModal").modal("hide");
                        $("#successEmpleadoModalUpdate").on("shown.bs.modal", function () {
                            setTimeout(function () {
                                location.reload();
                            }, 3000); // Espera 3 segundo antes de recargar la página
                        }).modal("show");
                    }
                } else {
                    const errorData = await response.json();
                    console.error("Error updating worker:", errorData);
                }
            } catch (error) {
                console.error("Error updating worker:", error);
            }
        });







        
        
        
        // CREATE 
        $("#createWorkerForm").submit(function (event) {
            event.preventDefault();

            const nombre = $("#nombre").val();

            console.log(nombre);

            fetch(`/api/workers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre,
                })
            })
                .then(response => {
                    if (response.ok) {
                        $("#createWorkerModal").modal("hide");

                        const successModalBody = $("#successWorkerModal").find(".modal-body");
                        successModalBody.html("El nuevo empleado ha sido creado correctamente.");
                        $("#successWorkerModal").modal("show");
                    } else {
                        throw new Error('Error creating new worker.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    });
});