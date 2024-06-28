$(document).ready(function () {
    $.get("/api/variedad", function (data) {
        var table = $("#variedadList");
        
        if (data.length === 0) {
            if (!$.fn.DataTable.isDataTable('#myTableVariedad')) {
                $('#myTableVariedad').DataTable({
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
                        <strong>¿Desea agregar una variedad?</strong><br>
                        <button class="btn btn-primary" style="background-color: rgba(255,255,255,0); border: none;" type="button" data-bs-toggle="modal" data-bs-target="#createVariedadModal">
                            <img src="../../../../resources/images/plus.png" width="30" height="30" alt="Agregar variedad">
                        </button>
                    </td>
                </tr>
            `);
        } else {
            data.forEach(function (variedad) {
                table.append(`
                    <tr>
                        <td>${variedad.codigo}</td>
                        <td>${variedad.variedad_tabaco}</td>
                        <td>${variedad.descripcion}</td>
                        <td>
                            <button class="btn btn-primary btn-sm" style="background-color: rgba(255,255,255,0); border: none;" type="button" class="nav-link px-2" style="color: #87ff8d;" data-bs-toggle="modal" data-bs-target="#createVariedadModal"><img src="../../../../resources/images/plus.png" width="30" height="30"></button>
                            <button class="btn btn-primary btn-sm edit-btn" style="background-color: rgba(255,255,255,0); border: none;" data-id="${variedad.id}" type="button" class="nav-link px-2" style="color: #87ff8d;" data-bs-toggle="modal" data-bs-target="#editVariedadModal"><img src="../../../../resources/images/edit.png" width="30" height="30"></button>
                            <button class="btn btn-danger btn-sm delete-btn" style="background-color: rgba(255,255,255,0); border: none;" data-id="${variedad.id}" data-toggle="modal" data-target="#deleteVariedadModal"><img src="../../../../resources/images/delete.png" width="30" height="30"></button>
                        </td>
                    </tr>
                `);
            });

            $('#myTableVariedad').DataTable({
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
            const tab = $('#myTableVariedad').DataTable();

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
 $("#variedadList").on("click", ".delete-btn", function () {
    const variedadId = $(this).data("id");
    const deleteVariedadButton = document.getElementById('deleteVariedadButton');
    deleteVariedadButton.setAttribute('data-variedad-id', variedadId);
    $("#deleteVariedadModal").modal("show");
});

// DELETE => On click
$("#deleteVariedadButton").on("click", function () {
    const variedadId = $(this).data("variedad-id");

    fetch(`/api/variedad/${variedadId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                location.reload();
            } else {
                throw new Error('Error deleting variedad');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});









         // UPDATE MODAL
         $("#variedadList").on("click", ".edit-btn", function () {
            const variedadId = $(this).data("id");

            $.get(`/api/variedad/${variedadId}`, function (variedad) {

                console.log("Datos de la variedad: " + variedad.codigo + variedad.variedad_tabaco + variedad.descripcion);
                $("#editCodigo").val(variedad.codigo);

                $("#editVariedad").val(variedad.variedad_tabaco);
                $("#editDescripcion").val(variedad.descripcion);


                $("#editVariedadModal").modal("show");
                $("#updateVariedadButton").data("id", variedadId);
            });
        });


        
        // UPDATE => On click
        $("#updateVariedadButton").on("click", async function (event) {
            event.preventDefault();

            const variedadId = $(this).data("id");
            const codigo = $("#editCodigo").val();
            const variedad = $("#editVariedad").val();
            const descripcion = $("#editDescripcion").val();

            const requestBody = {
                codigo,
                variedad,
                descripcion,

            };

            try {
                const response = await fetch(`/api/variedad/${variedadId}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                });

                if (response.ok) {
                    if (response.ok) {
                        $("#editVariedadModal").modal("hide");
                        $("#successVariedadModalUpdate").on("shown.bs.modal", function () {
                            setTimeout(function () {
                                location.reload();
                            }, 3000); // Espera 3 segundo antes de recargar la página
                        }).modal("show");
                    }
                } else {
                    const errorData = await response.json();
                    console.error("Error updating variedad:", errorData);
                }
            } catch (error) {
                console.error("Error updating worker:", error);
            }
        });



         // CREATE 
         $("#createVariedadForm").submit(function (event) {
            event.preventDefault();

            const nombre_variedad = $("#nombre_variedad").val();
            const codigo_variedad = $("#codigo_variedad").val();
            const descripcion_variedad = $("#descripcion_variedad").val();

            console.log(nombre_variedad);
            console.log(codigo_variedad);
            console.log(descripcion_variedad);

            fetch(`/api/variedad`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre_variedad, codigo_variedad, descripcion_variedad,
                })
            })
                .then(response => {
                    if (response.ok) {
                        if (response.ok) {
                            $("#createVariedadModal").modal("hide");
                            $("#successVariedadModal").on("shown.bs.modal", function () {
                                setTimeout(function () {
                                    location.reload();
                                }, 3000); // Espera 3 segundo antes de recargar la página
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
      
