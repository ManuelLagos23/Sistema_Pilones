$(document).ready(function () {
    $.get("/api/clase", function (data) {
        var table = $("#claseList");
        
        if (data.length === 0) {
            if (!$.fn.DataTable.isDataTable('#myTableClase')) {
                $('#myTableClase').DataTable({
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
                        <strong>¿Desea agregar una clase?</strong><br>
                        <button class="btn btn-primary" style="background-color: rgba(255,255,255,0); border: none;" type="button" data-bs-toggle="modal" data-bs-target="#createClaseModal">
                            <img src="../../../../resources/images/plus.png" width="30" height="30" alt="Agregar clase">
                        </button>
                    </td>
                </tr>
            `);
        } else {
            data.forEach(function (clase) {
                table.append(`
                    <tr>
                        <td>${clase.codigo}</td>
                        <td>${clase.clase_tabaco}</td>
                        <td>${clase.descripcion}</td>
                        <td>
                            <button class="btn btn-primary btn-sm" style="background-color: rgba(255,255,255,0); border: none;" type="button" class="nav-link px-2" style="color: #87ff8d;" data-bs-toggle="modal" data-bs-target="#createClaseModal"><img src="../../../../resources/images/plus.png" width="30" height="30"></button>
                            <button class="btn btn-primary btn-sm edit-btn" style="background-color: rgba(255,255,255,0); border: none;" data-id="${clase.id}" type="button" class="nav-link px-2" style="color: #87ff8d;" data-bs-toggle="modal" data-bs-target="#editClaseModal"><img src="../../../../resources/images/edit.png" width="30" height="30"></button>
                            <button class="btn btn-danger btn-sm delete-btn" style="background-color: rgba(255,255,255,0); border: none;" data-id="${clase.id}" data-toggle="modal" data-target="#deleteClaseModal"><img src="../../../../resources/images/delete.png" width="30" height="30"></button>
                        </td>
                    </tr>
                `);
            });

            $('#myTableClase').DataTable({
                dom: 'lBfrtip',
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: 'Exportar a Excel',
                        className: 'btn btn-primary dt-buttons btnExcel',
                        exportOptions: {
                            columns: [0, 1]
                        }
                    },
                    {
                        extend: 'print',
                        text: 'Imprimir / Guardar en PDF',
                        className: 'btn btn-secondary dt-buttons btnPrint',
                        exportOptions: {
                            columns: [0, 1]
                        }
                    }
                ],
                "iDisplayLength": 10,
                "aoColumnDefs": [
                    { "bSearchable": true, "aTargets": [0] },
                    { "bSearchable": true, "aTargets": [1] },
                    { "bSearchable": false, "aTargets": [2] },
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
            const tab = $('#myTableClase').DataTable();

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
 $("#claseList").on("click", ".delete-btn", function () {
    const claseId = $(this).data("id");
    const deleteClaseButton = document.getElementById('deleteClaseButton');
    deleteClaseButton.setAttribute('data-clase-id', claseId);
    $("#deleteClaseModal").modal("show");
});

// DELETE => On click
$("#deleteClaseButton").on("click", function () {
    const claseId = $(this).data("clase-id");

    fetch(`/api/clase/${claseId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
               location.reload();
            } else {
                throw new Error('Error deleting clase');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});





         // UPDATE MODAL
         $("#claseList").on("click", ".edit-btn", function () {
            const claseId = $(this).data("id");

            $.get(`/api/clase/${claseId}`, function (clase) {

             
                $("#editCodigo").val(clase.codigo);

                $("#editClase").val(clase.clase_tabaco);
                $("#editDescripcion").val(clase.descripcion);


                $("#editClaseModal").modal("show");
                $("#updateClaseButton").data("id", claseId);
            });
        }); 
 

    
        // UPDATE => On click
        $("#updateClaseButton").on("click", async function (event) {
            event.preventDefault();

            const claseId = $(this).data("id");
            const codigo = $("#editCodigo").val();
            const clase = $("#editClase").val();
            const descripcion = $("#editDescripcion").val();


            

            const requestBody = {
                codigo,
                clase,
                descripcion,

            };

            try {
                const response = await fetch(`/api/clase/${claseId}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                });

                if (response.ok) {
                    if (response.ok) {
                        $("#editClaseModal").modal("hide");
                        $("#successClaseModalUpdate").on("shown.bs.modal", function () {
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
 $("#createClaseForm").submit(function (event) {
    event.preventDefault();

    const nombre_clase = $("#nombre_clase").val();
    const codigo_clase = $("#codigo_clase").val();
    const descripcion_clase = $("#descripcion_clase").val();

    console.log(nombre_clase);
    console.log(codigo_clase);
    console.log(descripcion_clase);

    fetch(`/api/clase`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre_clase, codigo_clase, descripcion_clase,
        })
    })
        .then(response => {
            if (response.ok) {
                if (response.ok) {
                    $("#createClaseModal").modal("hide");
                    $("#successClaseModal").on("shown.bs.modal", function () {
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




