$(document).ready(function () {
    $.get("/api/tipo", function (data) {
        var table = $("#tipoList");
        
        if (data.length === 0) {
            if (!$.fn.DataTable.isDataTable('#myTableTipo')) {
                $('#myTableTipo').DataTable({
                    "columns": [
                        null,
                        null,
                        null,
                        null
                    ]
                });
            }
            
            table.html(`
                <tr>
                    <td colspan="4" style="text-align: center;">
                        <strong>¿Desea agregar un tipo?</strong><br>
                        <button class="btn btn-primary" style="background-color: rgba(255,255,255,0); border: none;" type="button" data-bs-toggle="modal" data-bs-target="#createTipoModal">
                            <img src="../../../../resources/images/plus.png" width="30" height="30" alt="Agregar tipo">
                        </button>
                    </td>
                </tr>
            `);
        } else {
            data.forEach(function (tipo) {
                table.append(`
                    <tr>
                        <td>${tipo.codigo}</td>
                        <td>${tipo.tipo_tabaco}</td>
                        <td>${tipo.descripcion}</td>
                        <td>
                            <button class="btn btn-primary btn-sm" style="background-color: rgba(255,255,255,0); border: none;" type="button" class="nav-link px-2" style="color: #87ff8d;" data-bs-toggle="modal" data-bs-target="#createTipoModal"><img src="../../../../resources/images/plus.png" width="30" height="30"></button>
                            <button class="btn btn-primary btn-sm edit-btn" style="background-color: rgba(255,255,255,0); border: none;" data-id="${tipo.id}" type="button" class="nav-link px-2" style="color: #87ff8d;" data-bs-toggle="modal" data-bs-target="#editTipoModal"><img src="../../../../resources/images/edit.png" width="30" height="30"></button>
                            <button class="btn btn-danger btn-sm delete-btn" style="background-color: rgba(255,255,255,0); border: none;" data-id="${tipo.id}" data-toggle="modal" data-target="#deleteTipoModal"><img src="../../../../resources/images/delete.png" width="30" height="30"></button>
                        </td>
                    </tr>
                `);
            });

            $('#myTableTipo').DataTable({
                dom: 'lBfrtip',
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: 'Exportar a Excel',
                        className: 'btn btn-primary dt-buttons btnExcel',
                        exportOptions: {
                            columns: [0, 1, 2]
                        }
                    },
                    {
                        extend: 'print',
                        text: 'Imprimir / Guardar en PDF',
                        className: 'btn btn-secondary dt-buttons btnPrint',
                        exportOptions: {
                            columns: [0, 1, 2]
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
            const tab = $('#myTableTipo').DataTable();

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
 $("#tipoList").on("click", ".delete-btn", function () {
    const tipoId = $(this).data("id");
    const deleteTipoButton = document.getElementById('deleteTipoButton');
    deleteTipoButton.setAttribute('data-tipo-id', tipoId);
    $("#deleteTipoModal").modal("show");
});

// DELETE => On click
$("#deleteTipoButton").on("click", function () {
    const tipoId = $(this).data("tipo-id");

    fetch(`/api/tipo/${tipoId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
               location.reload();
            } else {
                throw new Error('Error deleting tipo');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});



   // UPDATE MODAL
   $("#tipoList").on("click", ".edit-btn", function () {
    const tipoId = $(this).data("id");

    $.get(`/api/tipo/${tipoId}`, function (tipo) {

     
        $("#editCodigo").val(tipo.codigo);

        $("#editTipo").val(tipo.tipo_tabaco);
        $("#editDescripcion").val(tipo.descripcion);


        $("#editTipoModal").modal("show");
        $("#updateTipoButton").data("id", tipoId);
    });
}); 


  // UPDATE => On click
  $("#updateTipoButton").on("click", async function (event) {
    event.preventDefault();

    const tipoId = $(this).data("id");
    const codigo = $("#editCodigo").val();
    const tipo = $("#editTipo").val();
    const descripcion = $("#editDescripcion").val();


    

    const requestBody = {
        codigo,
        tipo,
        descripcion,

    };

    try {
        const response = await fetch(`/api/tipo/${tipoId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            if (response.ok) {
                $("#editTipoModal").modal("hide");
                $("#successTipoModalUpdate").on("shown.bs.modal", function () {
                    setTimeout(function () {
                        location.reload();
                    }, 3000); // Espera 3 segundo antes de recargar la página
                }).modal("show");
            }
        } else {
            const errorData = await response.json();
            console.error("Error updating tipo:", errorData);
        }
    } catch (error) {
        console.error("Error updating tipo:", error);
    }
});



 // CREATE 
 $("#createTipoForm").submit(function (event) {
    event.preventDefault();

    const nombre_tipo = $("#nombre_tipo").val();
    const codigo_tipo = $("#codigo_tipo").val();
    const descripcion_tipo = $("#descripcion_tipo").val();

    console.log(nombre_tipo);
    console.log(codigo_tipo);
    console.log(descripcion_tipo);

    fetch(`/api/tipo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre_tipo, codigo_tipo, descripcion_tipo,
        })
    })
        .then(response => {
            if (response.ok) {
                if (response.ok) {
                    $("#createTipoModal").modal("hide");
                    $("#successTipoModal").on("shown.bs.modal", function () {
                        setTimeout(function () {
                            location.reload();
                        }, 3000); // Espera 5 segundo antes de recargar la página
                    }).modal("show");
                }
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










