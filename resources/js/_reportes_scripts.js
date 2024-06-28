$(document).ready(function () {
    $.get("/api/reporte", function (data) {
        data.virado.forEach(function (reporteVirado, index) {
            const reporteMojado = data.mojado[index];
            const totalVirado = data.totalVirado[index];
            const totalMojado = data.totalMojado[index];
            const viradofrecuencia = data.viradofrecuencia[index];
            const mojadofrecuencia = data.mojadofrecuencia[index];

            $("#reporteList").append(`
                <tr>
                    <td>${totalVirado.Pilón}</td>
                    <td>${new Date(reporteVirado.último_virado).toISOString().slice(0, 10)}</td>
                    <td>${new Date(reporteMojado.último_mojado).toISOString().slice(0, 10)}</td>
                    <td>${totalVirado.total_virado}</td>
                    <td>${totalMojado.total_mojado}</td>
                    <td>${viradofrecuencia && viradofrecuencia.frecuencia_virado !== null ? parseFloat(viradofrecuencia.frecuencia_virado).toFixed(2) : 'No hay datos.'}</td>
                    <td>${mojadofrecuencia && mojadofrecuencia.frecuencia_mojado !== null ? parseFloat(mojadofrecuencia.frecuencia_mojado).toFixed(2) : 'No hay datos.'}</td>
                </tr>
            `);
 

        
        if ($.fn.DataTable.isDataTable('#myTableReporte')) {
            $('#myTableReporte').DataTable().destroy();
        }
        const table = $('#myTableReporte').DataTable({
            dom: 'lBfrtip',
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: 'Exportar a Excel',
                        className: 'btn btn-primary dt-buttons btnExcel',
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6]
                        }
                    },
                    {
                        extend: 'print',
                        text: 'Imprimir / Guardar en PDF',
                        className: 'btn btn-secondary dt-buttons btnPrint',
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6]
                        }
                    }
                ],
                "iDisplayLength": 10,
                "aoColumnDefs": [
                    { "bSearchable": true, "aTargets": [0] },
                    { "bSearchable": true, "aTargets": [1] },
                    { "bSearchable": true, "aTargets": [2] },
                    { "bSearchable": false, "aTargets": [3] },
                    { "bSearchable": false, "aTargets": [4] },
                    { "bSearchable": true, "aTargets": [5] },
                    { "bSearchable": false, "aTargets": [6] },
                ],
             
                search: {
                    regex: true,
                    smart: false
                },
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

        // Toggle visibility of columns
        $('a.toggle-vis').on('click', function (e) {
            e.preventDefault();
            let columnIdx = $(this).data('column');
            let column = table.column(columnIdx);
            column.visible(!column.visible());

            if (column.visible()) {
                $(this).addClass('active-option');
                $(this).removeClass('inactive-option');
            } else {
                $(this).removeClass('active-option');
                $(this).addClass('inactive-option');
            }
        });
    });
});
});