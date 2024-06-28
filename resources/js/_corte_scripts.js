$(document).ready(function () {
    $.get("/api/corte", function (data) {
        var table = $("#corteList");
        
        if (data.length === 0) {
            if (!$.fn.DataTable.isDataTable('#myTableCorte')) {
                $('#myTableCorte').DataTable({
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
                        <strong>¿Desea agregar un corte?</strong><br>
                        <button class="btn btn-primary" style="background-color: rgba(255,255,255,0); border: none;" type="button" data-bs-toggle="modal" data-bs-target="#createCorteModal">
                            <img src="../../../../resources/images/plus.png" width="30" height="30" alt="Agregar corte">
                        </button>
                    </td>
                </tr>
            `);
        } else {
            data.forEach(function (corte) {
                table.append(`
                    <tr>
                        <td>${corte.codigo}</td>
                        <td>${corte.corte_tabaco}</td>
                        <td>${corte.descripcion}</td>
                        <td>
                            <button class="btn btn-primary btn-sm" style="background-color: rgba(255,255,255,0); border: none;" type="button" class="nav-link px-2" style="color: #87ff8d;" data-bs-toggle="modal" data-bs-target="#createCorteModal"><img src="../../../../resources/images/plus.png" width="30" height="30"></button>
                            <button class="btn btn-primary btn-sm edit-btn" style="background-color: rgba(255,255,255,0); border: none;" data-id="${corte.id}" type="button" class="nav-link px-2" style="color: #87ff8d;" data-bs-toggle="modal" data-bs-target="#editCorteModal"><img src="../../../../resources/images/edit.png" width="30" height="30"></button>
                            <button class="btn btn-danger btn-sm delete-btn" style="background-color: rgba(255,255,255,0); border: none;" data-id="${corte.id}" data-toggle="modal" data-target="#deleteCorteModal"><img src="../../../../resources/images/delete.png" width="30" height="30"></button>
                        </td>
                    </tr>
                `);
            });

            $('#myTableCorte').DataTable({
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
            const tab = $('#myTableCorte').DataTable();

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
 $("#corteList").on("click", ".delete-btn", function () {
    const corteId = $(this).data("id");
    const deleteCorteButton = document.getElementById('deleteCorteButton');
    deleteCorteButton.setAttribute('data-corte-id', corteId);
    $("#deleteCorteModal").modal("show");
});

// DELETE => On click
$("#deleteCorteButton").on("click", function () {
    const corteId = $(this).data("corte-id");

    fetch(`/api/corte/${corteId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
               location.reload();
            } else {
                throw new Error('Error deleting corte');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});



         // UPDATE MODAL
         $("#corteList").on("click", ".edit-btn", function () {
            const corteId = $(this).data("id");

            $.get(`/api/corte/${corteId}`, function (corte) {

             
                $("#editCodigo").val(corte.codigo);

                $("#editCorte").val(corte.corte_tabaco);
                $("#editDescripcion").val(corte.descripcion);


                $("#editCorteModal").modal("show");
                $("#updateCorteButton").data("id", corteId);
            });
        }); 
 





        
        // UPDATE => On click
        $("#updateCorteButton").on("click", async function (event) {
            event.preventDefault();

            const corteId = $(this).data("id");
            const codigo = $("#editCodigo").val();
            const corte = $("#editCorte").val();
            const descripcion = $("#editDescripcion").val();


            console.log (corteId + codigo + corte + descripcion);

            const requestBody = {
                codigo,
                corte,
                descripcion,

            };

            try {
                const response = await fetch(`/api/corte/${corteId}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                });

                if (response.ok) {
                    if (response.ok) {
                        $("#editCorteModal").modal("hide");
                        $("#successCorteModalUpdate").on("shown.bs.modal", function () {
                            setTimeout(function () {
                                location.reload();
                            }, 3000); // Espera 3 segundo antes de recargar la página
                        }).modal("show");
                    }
                } else {
                    const errorData = await response.json();
                    console.error("Error updating corte:", errorData);
                }
            } catch (error) {
                console.error("Error updating corte:", error);
            }
        });





 // CREATE 
 $("#createCorteForm").submit(function (event) {
    event.preventDefault();

    const nombre_corte = $("#nombre_corte").val();
    const codigo_corte = $("#codigo_corte").val();
    const descripcion_corte = $("#descripcion_corte").val();

    console.log(nombre_corte);
    console.log(codigo_corte);
    console.log(descripcion_corte);

    fetch(`/api/corte`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre_corte, codigo_corte, descripcion_corte,
        })
    })
        .then(response => {
            if (response.ok) {
                if (response.ok) {
                    $("#createCorteModal").modal("hide");
                    $("#successCorteModal").on("shown.bs.modal", function () {
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
