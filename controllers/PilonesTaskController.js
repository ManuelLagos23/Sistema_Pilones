const mysql = require('mysql2/promise');
const dbConfig = require('../public/config/database');

const pilonesTaskController = {

    // Tasks *
    getAllTasks: async () => {
        try {
            const connection = await mysql.createConnection(dbConfig); // DB connection

            const [results] = await connection.execute('SELECT * FROM pilones_virado_mojado'); // Execute request

            connection.end(); // Cierra la conexión

            return results;
        } catch (error) {
            throw new Error('Error al obtener los registros de pilones: ' + error.message);
        }
    },

     // Tasks WHERE id
     getPilonTaskById: async (tasksId) => {
        try {
            const connection = await mysql.createConnection(dbConfig); // DB connection

            const [results] = await connection.execute('SELECT * FROM pilones_virado_mojado WHERE id = ?', [tasksId]); // Execute request

            connection.end(); // Cierra la conexión

            if (results.length === 0) {
                throw new Error('Pilon task not found');
            }
            return results[0];
        } catch (error) {
            throw new Error('Error fetching pilón task: ' + error.message);
        }
    },
// Pilon task CREATE
createPilonTask: async (task, person_in_charge, pilon_selected, task_start_date, start_time, task_start_temp, task_end_date, end_time, orden, id_pilon) => {
    try {
        const connection = await mysql.createConnection(dbConfig);

      
        if (Array.isArray(person_in_charge)) {
            person_in_charge = person_in_charge.join(', '); 
        }

        const insertQuery = `
            INSERT INTO pilones_virado_mojado (task, person_in_charge, pilon_selected, task_start_date, start_time, task_start_temp, task_end_date, end_time, id_orden, id_pilon)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        await connection.execute(insertQuery, [task, person_in_charge, pilon_selected, task_start_date, start_time, task_start_temp, task_end_date, end_time, orden, id_pilon]);

        connection.end();
    } catch (error) {
        console.error('Error creating task:', error);
        throw new Error('Error creating task: ' + error.message);
    }
},

   // Tarea DELETE
   deleteTarea: async (taskId) => {
    try {
        const connection = await mysql.createConnection(dbConfig); // DB connection

        const deleteQuery = 'DELETE FROM pilones_virado_mojado WHERE id = ?'; // Execute request
        const [result] = await connection.execute(deleteQuery, [taskId]);

        connection.end(); // Cierra la conexión

        return result.affectedRows; // Devuelve la cantidad de filas eliminadas
    } catch (error) {
        throw new Error('Error deleting proceso: ' + error.message);
    }
},


    // Pilon task UPDATE
updatePilonTask: async (taskId, task, person_in_charge, task_start_date, task_end_date, start_time, end_time) => {
    try {
        const connection = await mysql.createConnection(dbConfig); 

    
        if (!Array.isArray(person_in_charge)) {
            throw new Error('person_in_charge should be an array');
        }

        
        const personInChargeString = person_in_charge.join(', ');

    
        const updateQuery = `
            UPDATE pilones_virado_mojado 
            SET task = ?, 
                person_in_charge = ?, 
                task_start_date = ?, 
                task_end_date = ?, 
                start_time = ?, 
                end_time = ?
            WHERE id = ?`;

        
        await connection.execute(updateQuery, [task, personInChargeString, task_start_date, task_end_date, start_time, end_time, taskId]);

    
        connection.end();

    } catch (error) {
        console.error('Error updating task:', error);
        throw new Error('Error updating task: ' + error.message);
    }
},


    

    obtenerDatosVirado: async (pilonId, callback) => {
        try {
            const connection = await mysql.createConnection(dbConfig);
            console.log("El controlador recibe el ID del pilón: " + pilonId);
    
            const [results] = await connection.execute(
                'SELECT COUNT(*) AS totalVirado FROM pilones_virado_mojado WHERE id_pilon = ? AND task = "Virado" or task = "Turning" ',
                [pilonId]
            );
    
            console.log("Cantidad de virados: " + results[0].totalVirado);
    
            connection.end();
            callback(null, { id_pilon: pilonId, totalVirado: results[0].totalVirado || 0 });
        } catch (error) {
            callback(error, null);
        }
    },
    
    obtenerDatosMojado: async (pilonId, callback) => {
        try {
            const connection = await mysql.createConnection(dbConfig);
    
            const [results] = await connection.execute(
                'SELECT COUNT(*) AS totalMojado FROM pilones_virado_mojado WHERE id_pilon = ? AND task = "Mojado" or  task = "Wetting"',
                [pilonId]
            );
            console.log("Cantidad de mojados: " + results[0].totalMojado);
            connection.end();
            callback(null, { id_pilon: pilonId, totalMojado: results[0].totalMojado || 0 });
        } catch (error) {
            callback(error, null);
        }
    },
    






};

module.exports = pilonesTaskController;
