$(document).ready(function () {
    $.get("/api/etapa", function (data) {
        var table = $("#etapaList");
        
        if (data.length === 0) {
            if (!$.fn.DataTable.isDataTable('#myTableEtapa')) {
                $('#myTableEtapa').DataTable({
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
                <strong>¿Desea agregar una etapa?</strong >   <br>
                <button class="btn btn-primary" style="background-color: rgba(255,255,255,0); border: none;" type="button" data-bs-toggle="modal" data-bs-target="#createEtapaModal">
                    <img src="../../../../resources/images/plus.png" width="30" height="30" alt="Agregar etapa">
                </button>
            </td>
        </tr>
            `);
        } else {
            data.forEach(function (etapa) {
                table.append(`
                    <tr>
                        <td>${etapa.codigo}</td>
                        <td>${etapa.etapa_tabaco}</td>
                        <td>${etapa.descripcion}</td>
                        <td>
                            <button class="btn btn-primary btn-sm" style="background-color: rgba(255,255,255,0); border: none;" type="button" class="nav-link px-2" style="color: #87ff8d;" data-bs-toggle="modal" data-bs-target="#createEtapaModal"><img src="../../../../resources/images/plus.png" width="30" height="30"></button>
                            <button class="btn btn-primary btn-sm edit-btn" style="background-color: rgba(255,255,255,0); border: none;" data-id="${etapa.id}" type="button" class="nav-link px-2" style="color: #87ff8d;" data-bs-toggle="modal" data-bs-target="#editEtapaModal"><img src="../../../../resources/images/edit.png" width="30" height="30"></button>
                            <button class="btn btn-danger btn-sm delete-btn" style="background-color: rgba(255,255,255,0); border: none;" data-id="${etapa.id}" data-toggle="modal" data-target="#deleteEtapaModal"><img src="../../../../resources/images/delete.png" width="30" height="30"></button>
                        </td>
                    </tr>
                `);
            });


            
        $('#myTableEtapa').DataTable({
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
const tab = $('#myTableEtapa').DataTable();

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
 $("#etapaList").on("click", ".delete-btn", function () {
    const etapaId = $(this).data("id");
    const deleteEtapaButton = document.getElementById('deleteEtapaButton');
    deleteEtapaButton.setAttribute('data-etapa-id', etapaId);
    $("#deleteEtapaModal").modal("show");
});

// DELETE => On click
$("#deleteEtapaButton").on("click", function () {
    const etapaId = $(this).data("etapa-id");

    fetch(`/api/etapa/${etapaId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
               location.reload();
            } else {
                throw new Error('Error deleting etapa');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});


   // UPDATE MODAL
   $("#etapaList").on("click", ".edit-btn", function () {
    const etapaId = $(this).data("id");

    $.get(`/api/etapa/${etapaId}`, function (etapa) {

     
        $("#editCodigo").val(etapa.codigo);

        $("#editEtapa").val(etapa.etapa_tabaco);
        $("#editDescripcion").val(etapa.descripcion);


        $("#editEtapaModal").modal("show");
        $("#updateEtapaButton").data("id", etapaId);
    });
}); 

 


  // UPDATE => On click
  $("#updateEtapaButton").on("click", async function (event) {
    event.preventDefault();

    const etapaId = $(this).data("id");
    const codigo = $("#editCodigo").val();
    const etapa = $("#editEtapa").val();
    const descripcion = $("#editDescripcion").val();


    

    const requestBody = {
        codigo,
        etapa,
        descripcion,

    };

    try {
        const response = await fetch(`/api/etapa/${etapaId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            if (response.ok) {
                $("#editEtapaModal").modal("hide");
                $("#successEtapaModalUpdate").on("shown.bs.modal", function () {
                    setTimeout(function () {
                        location.reload();
                    }, 3000); // Espera 3 segundo antes de recargar la página
                }).modal("show");
            }
          
        } else {
            const errorData = await response.json();
            console.error("Error updating etapa:", errorData);
        }
    } catch (error) {
        console.error("Error updating etapa:", error);
    }
});


 // CREATE 
 $("#createEtapaForm").submit(function (event) {
    event.preventDefault();

    const nombre_etapa = $("#nombre_etapa").val();
    const codigo_etapa = $("#codigo_etapa").val();
    const descripcion_etapa = $("#descripcion_etapa").val();

    console.log(nombre_etapa);
    console.log(codigo_etapa);
    console.log(descripcion_etapa);

    fetch(`/api/etapa`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre_etapa, codigo_etapa, descripcion_etapa,
        })
    })
        .then(response => {
            if (response.ok) {
                if (response.ok) {
                    $("#createEtapaModal").modal("hide");
                    $("#successEtapaModal").on("shown.bs.modal", function () {
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






