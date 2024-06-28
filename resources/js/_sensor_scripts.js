
$(document).ready(function () {
    $.get("/api/sensor", function (data) {
        data.forEach(function (sensor) {
            $("#sensoresList").append(`
                <tr>
                    <td>${sensor.nombre}</td>
                    <td>${sensor.direccion}</td>
                    <td>${sensor.id_arduino}</td>
                    <td>
                        <button class="btn btn-primary btn-sm edit-btn" style="background-color: rgba(255,255,255,0); border: none;" data-id="${sensor.id}" data-toggle="modal" data-target="#editArduinoModal">
                            <img src="../../../../resources/images/edit.png" width="30" height="30">
                        </button>
                        <button class="btn btn-danger btn-sm delete-btn" style="background-color: rgba(255,255,255,0); border: none;" data-id="${sensor.id}" data-toggle="modal" data-target="#deleteArduinoModal">
                            <img src="../../../../resources/images/delete.png" width="30" height="30">
                        </button>
                    </td>
                </tr>
            `);
        });





        
$('#mitabla').DataTable({
    dom: 'lBfrtip',
    buttons: [
        {
            extend: 'excelHtml5',
            text: 'Export to Excel',
            className: 'btn btn-primary dt-buttons btnExcel',
            exportOptions: {
                columns: [0, 1, 2, 3]
            }
        },
        {
            extend: 'print',
            text: 'Print / Save PDF',
            className: 'btn btn-secondary dt-buttons btnPrint',
            exportOptions: {
                columns: [0, 1, 2, ]
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
    }
});

// Show/Hide columns
const tab = $('#mitabla').DataTable();

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

  
  





 
 
 
 // CREATE 
 $("#createSensorForm").submit(function (event) {
    event.preventDefault();

    const nombre_sensor = $("#nombre_sensor").val();
    const direccion_sensor = $("#direccion_sensor").val();
    const arduino_asignado = $("#arduino_asignado").val();

    console.log(nombre_sensor);
    console.log(direccion_sensor);
    console.log(arduino_asignado);

    fetch(`/api/sensor`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre_sensor, direccion_sensor, arduino_asignado,
        })
    })
        .then(response => {
            if (response.ok) {
                $("#createSensorModal").modal("hide");

                const successModalBody = $("#successSensorModal").find(".modal-body");
                successModalBody.html("New sensor created correctly.");
                $("#successSensorModal").modal("show");
             
            } else {
                $("#errorsensorModal").modal("show");
                throw new Error('Error al crear nuevo sensor.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});



 
});
});


document.addEventListener("DOMContentLoaded", function () {
    fetch("/api/arduinos")
        .then(response => response.json())
        .then(data => {
            const Select = document.getElementById("arduino_asignado");
            data.forEach(results => {
                const option = document.createElement("option");
                option.value = results.id;
                option.textContent = results.nombre;
                Select.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error:", error);
        });
});



