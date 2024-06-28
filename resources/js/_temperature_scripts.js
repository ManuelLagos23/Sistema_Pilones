fetch('/api/temperatures')
    .then((response) => response.json())
    .then((data) => {
        const tableBody = document.getElementById('tableBody');

        data.forEach((row) => {
            const newRow = document.createElement('tr');
            const fechaLectura = new Date(row.fecha_lectura).toISOString().split('T')[0]; // UTC format
            const lecturaRedondeada = parseFloat(row.lectura).toFixed(2); // Two digits format
       newRow.innerHTML = `
      <td>${row.nombre}</td>
      <td>${fechaLectura}</td>
      <td>${row.hora_lectura}</td>
      <td>${lecturaRedondeada} F°</td>`;
            tableBody.appendChild(newRow);
        });



        $(document).ready(function () {
            $('#myTableTemperaturas').DataTable({
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
                    { "bSearchable": false, "aTargets": [2] },
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
        const table = $('#myTableTemperaturas').DataTable();

        $('a.toggle-vis').on('click', function (e) {
            e.preventDefault();

            let columnIdx = $(this).data('column');
            let column = table.column(columnIdx);

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
        });

        
    })
    
    .catch((error) => {
        console.error('Error fetching data:', error);


    });

