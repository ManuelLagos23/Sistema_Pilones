$(document).ready(function () {
    $.get("/api/proceso", function (data) {
        var table = $("#procesoList");
        
        if (data.length === 0) {
            if (!$.fn.DataTable.isDataTable('#myTableProceso')) {
                $('#myTableProceso').DataTable({
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
                        <strong>¿Desea agregar un proceso?</strong><br>
                        <button class="btn btn-primary" style="background-color: rgba(255,255,255,0); border: none;" type="button" data-bs-toggle="modal" data-bs-target="#createProcesoModal">
                            <img src="../../../../resources/images/plus.png" width="30" height="30" alt="Agregar proceso">
                        </button>
                    </td>
                </tr>
            `);
        } else {
            data.forEach(function (proceso) {
                table.append(`
                    <tr>
                        <td>${proceso.codigo}</td>
                        <td>${proceso.proceso_tabaco}</td>
                        <td>${proceso.descripcion}</td>
                        <td>${proceso.agregar_proceso}</td>
                        <td>
                            <button class="btn btn-primary btn-sm" style="background-color: rgba(255,255,255,0); border: none;" type="button" class="nav-link px-2" style="color: #87ff8d;" data-bs-toggle="modal" data-bs-target="#createProcesoModal"><img src="../../../../resources/images/plus.png" width="30" height="30"></button>
                            <button class="btn btn-primary btn-sm edit-btn" style="background-color: rgba(255,255,255,0); border: none;" data-id="${proceso.id}" type="button" class="nav-link px-2" style="color: #87ff8d;" data-bs-toggle="modal" data-bs-target="#editProcesoModal"><img src="../../../../resources/images/edit.png" width="30" height="30"></button>
                            <button class="btn btn-danger btn-sm delete-btn" style="background-color: rgba(255,255,255,0); border: none;" data-id="${proceso.id}" data-toggle="modal" data-target="#deleteProcesoModal"><img src="../../../../resources/images/delete.png" width="30" height="30"></button>
                        </td>
                    </tr>
                `);
            });

            $('#myTableProceso').DataTable({
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
                    { "bSearchable": true, "aTargets": [2] },
                    { "bSearchable": false, "aTargets": [3] },
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
            const tab = $('#myTableProceso').DataTable();

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
 $("#procesoList").on("click", ".delete-btn", function () {
    const procesoId = $(this).data("id");
    const deleteProcesoButton = document.getElementById('deleteProcesoButton');
    deleteProcesoButton.setAttribute('data-proceso-id', procesoId);
    $("#deleteProcesoModal").modal("show");
});

// DELETE => On click
$("#deleteProcesoButton").on("click", function () {
    const procesoId = $(this).data("proceso-id");

    fetch(`/api/proceso/${procesoId}`, {
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
  $("#procesoList").on("click", ".edit-btn", function () {
    const procesoId = $(this).data("id");

    $.get(`/api/proceso/${procesoId}`, function (proceso) {

     
        $("#editCodigo").val(proceso.codigo);

        $("#editProceso").val(proceso.proceso_tabaco);
        $("#editDescripcion").val(proceso.descripcion);
        $("#edit_proceso_dashboard").val(proceso.agregar_proceso);
        $("#proceso_real").val(proceso.agregar_proceso);

        $("#editProcesoModal").modal("show");
        $("#updateProcesoButton").data("id", procesoId);
    });
}); 


  // UPDATE => On click
  $("#updateProcesoButton").on("click", async function (event) {
    event.preventDefault();

    const procesoId = $(this).data("id");
    const codigo = $("#editCodigo").val();
    const proceso = $("#editProceso").val();
    const descripcion = $("#editDescripcion").val();
    const proceso_actualizado = $("#edit_proceso_dashboard").val();


    console.log(codigo + proceso + descripcion + proceso_actualizado);

    const requestBody = {
        codigo,
        proceso,
        descripcion,
        proceso_actualizado,

    };

    try {
        const response = await fetch(`/api/proceso/${procesoId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        if (response.ok) {
            if (response.ok) {
                $("#editProcesoModal").modal("hide");
                $("#successProcesoModalUpdate").on("shown.bs.modal", function () {
                    setTimeout(function () {
                        location.reload();
                    }, 3000); // Espera 3 segundo antes de recargar la página
                }).modal("show");
            }
     
        } else {
            const errorData = await response.json();
            console.error("Error updating proceso:", errorData);
        }
    } catch (error) {
        console.error("Error updating proceso:", error);
    }
});

 // CREATE 
 $("#createProcesoForm").submit(function (event) {
    event.preventDefault();

    const codigo_proceso = $("#codigo_proceso").val();
    const nombre_proceso = $("#nombre_proceso").val();
    const descripcion_proceso = $("#descripcion_proceso").val();
    const proceso_dashboard = $("#proceso_dashboard").val();

    console.log(nombre_proceso);
    console.log(codigo_proceso);
    console.log(descripcion_proceso);
    console.log(proceso_dashboard);

    fetch(`/api/proceso`, {


        
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        
        body: JSON.stringify({
            codigo_proceso, nombre_proceso, descripcion_proceso, proceso_dashboard,
        })
    })
        .then(response => {
            if (response.ok) {
                if (response.ok) {
                    $("#createProcesoModal").modal("hide");
                    $("#successProcesoModal").on("shown.bs.modal", function () {
                        setTimeout(function () {
                            location.reload();
                        }, 3000); // Espera 5 segundo antes de recargar la página
                    }).modal("show");
                }
            } else {
                throw new Error('Error creating new proceso.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
});
});









