const mysql = require('mysql2/promise'); 
const dbConfig = require('../public/config/database');

const reporteController = {

    getAllReporte: async () => {
        try {
            const connection = await mysql.createConnection(dbConfig); 

            const [resultsVirado] = await connection.execute('SELECT id_pilon, pilon_selected AS Pilón, MAX(task_start_date) AS último_virado FROM pilones_virado_mojado WHERE task="Virado" GROUP BY id_pilon'); 

            const [resultsmojado] = await connection.execute('SELECT id_pilon, pilon_selected AS Pilón, MAX(task_start_date) AS último_mojado FROM pilones_virado_mojado WHERE task="Mojado" GROUP BY id_pilon'); 

            const [totalVirado] = await connection.execute('SELECT id_pilon, pilon_selected AS Pilón, COUNT(*) AS total_virado FROM pilones_virado_mojado WHERE task="Virado" GROUP BY id_pilon'); 

            const [totalMojado] = await connection.execute('SELECT id_pilon, pilon_selected AS Pilón, COUNT(*) AS total_mojado FROM pilones_virado_mojado WHERE task="Mojado" GROUP BY id_pilon'); 

            const [viradofrecuencia] = await connection.execute(`
            SELECT 
                id_pilon, 
                pilon_selected,
                COUNT(*) AS total_virado,
                AVG(dias_entre_virados) AS frecuencia_virado
            FROM (
                SELECT 
                    id_pilon,
                    pilon_selected,
                    task_start_date,
                    DATEDIFF(task_start_date,LAG(task_start_date) OVER (PARTITION BY id_pilon ORDER BY task_start_date)) AS dias_entre_virados
                FROM pilones_virado_mojado 
                WHERE task = 'Virado'
            ) AS subquery
            GROUP BY id_pilon, pilon_selected
        `); 

        const [mojadofrecuencia] = await connection.execute(`
            SELECT 
                id_pilon, 
                pilon_selected,
                COUNT(*) AS total_virado,
                AVG(dias_entre_virados) AS frecuencia_mojado
            FROM (
                SELECT 
                    id_pilon,
                    pilon_selected,
                    task_start_date,
                    DATEDIFF(task_start_date,LAG(task_start_date) OVER (PARTITION BY id_pilon ORDER BY task_start_date)) AS dias_entre_virados
                FROM pilones_virado_mojado 
                WHERE task = 'Mojado'
            ) AS subquery
            GROUP BY id_pilon, pilon_selected
        `); 


            
            connection.end();

            return { 
                virado: resultsVirado, 
                mojado: resultsmojado, 
                totalVirado: totalVirado, 
                totalMojado: totalMojado, 
                viradofrecuencia: viradofrecuencia, 
                mojadofrecuencia: mojadofrecuencia
            };
        } catch (error) {
            throw new Error('Error al obtener los registros de reportes: ' + error.message);
        }
    },
};

module.exports = reporteController;
