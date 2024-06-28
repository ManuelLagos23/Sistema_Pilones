$(document).ready(function () {
    $.get("/api/finca", function (data) {
        var table = $("#fincaList");
        
        if (data.length === 0) {
            if (!$.fn.DataTable.isDataTable('#myTableFinca')) {
                $('#myTableFinca').DataTable({
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
                        <strong>¿Desea agregar una finca?</strong><br>
                        <button class="btn btn-primary" style="background-color: rgba(255,255,255,0); border: none;" type="button" data-bs-toggle="modal" data-bs-target="#createFincaModal">
                            <img src="../../../../resources/images/plus.png" width="30" height="30" alt="Agregar finca">
                        </button>
                    </td>
                </tr>
            `);
        } else {
            data.forEach(function (finca) {
                table.append(`
                    <tr>
                        <td>${finca.codigo}</td>
                        <td>${finca.finca_tabaco}</td>
                        <td>${finca.descripcion}</td>
                        <td>
                            <button class="btn btn-primary btn-sm" style="background-color: rgba(255,255,255,0); border: none;" type="button" class="nav-link px-2" style="color: #87ff8d;" data-bs-toggle="modal" data-bs-target="#createFincaModal"><img src="../../../../resources/images/plus.png" width="30" height="30"></button>
                            <button class="btn btn-primary btn-sm edit-btn" style="background-color: rgba(255,255,255,0); border: none;" data-id="${finca.id}" type="button" class="nav-link px-2" style="color: #87ff8d;" data-bs-toggle="modal" data-bs-target="#editFincaModal"><img src="../../../../resources/images/edit.png" width="30" height="30"></button>
                            <button class="btn btn-danger btn-sm delete-btn" style="background-color: rgba(255,255,255,0); border: none;" data-id="${finca.id}" data-toggle="modal" data-target="#deleteFincaModal"><img src="../../../../resources/images/delete.png" width="30" height="30"></button>
                        </td>
                    </tr>
                `);
            });

            $('#myTableFinca').DataTable({
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
            const tab = $('#myTableFinca').DataTable();

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
 $("#fincaList").on("click", ".delete-btn", function () {
    const fincaId = $(this).data("id");
    const deleteFincaButton = document.getElementById('deleteFincaButton');
    deleteFincaButton.setAttribute('data-finca-id', fincaId);
    $("#deleteFincaModal").modal("show");
});

// DELETE => On click
$("#deleteFincaButton").on("click", function () {
    const fincaId = $(this).data("finca-id");

    fetch(`/api/finca/${fincaId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
               location.reload();
            } else {
                throw new Error('Error deleting finca');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});



   // UPDATE MODAL
   $("#fincaList").on("click", ".edit-btn", function () {
    const fincaId = $(this).data("id");

    $.get(`/api/finca/${fincaId}`, function (finca) {

     
        $("#editCodigo").val(finca.codigo);

        $("#editFinca").val(finca.finca_tabaco);
        $("#editDescripcion").val(finca.descripcion);


        $("#editFincaModal").modal("show");
        $("#updateFincaButton").data("id", fincaId);
    });
}); 



  // UPDATE => On click
  $("#updateFincaButton").on("click", async function (event) {
    event.preventDefault();

    const fincaId = $(this).data("id");
    const codigo = $("#editCodigo").val();
    const finca = $("#editFinca").val();
    const descripcion = $("#editDescripcion").val();


    

    const requestBody = {
        codigo,
        finca,
        descripcion,

    };

    try {
        const response = await fetch(`/api/finca/${fincaId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });
        if (response.ok) {
            if (response.ok) {
                $("#editFincaModal").modal("hide");
                $("#successFincaModalUpdate").on("shown.bs.modal", function () {
                    setTimeout(function () {
                        location.reload();
                    }, 3000); // Espera 3 segundo antes de recargar la página
                }).modal("show");
            }
          
        } else {
            const errorData = await response.json();
            console.error("Error updating clase:", errorData);
        }
    } catch (error) {
        console.error("Error updating clase:", error);
    }
});



 
 
 // CREATE 
 $("#createFincaForm").submit(function (event) {
    event.preventDefault();

    const nombre_finca = $("#nombre_finca").val();
    const codigo_finca = $("#codigo_finca").val();
    const descripcion_finca = $("#descripcion_finca").val();

    console.log(nombre_finca);
    console.log(codigo_finca);
    console.log(descripcion_finca);

    fetch(`/api/finca`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre_finca, codigo_finca, descripcion_finca,
        })
    })
        .then(response => {
            if (response.ok) {
                if (response.ok) {
                    $("#createFincaModal").modal("hide");
                    $("#successFincaModal").on("shown.bs.modal", function () {
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



 
