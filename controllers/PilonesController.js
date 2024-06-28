const mysql = require('mysql2/promise');
const dbConfig = require('../public/config/database');


const pilonesController = {
    // Pilon's *
    getAllPilones: async () => {
        try {
            const connection = await mysql.createConnection(dbConfig); // DB connection
           

            const [results] = await connection.execute('SELECT * FROM pilones'); // Execute request
       

            connection.end(); // Cierra la conexión

          



            return results;
            
        } catch (error) {
            throw new Error('Error al obtener los registros de pilones: ' + error.message);
        }
    },

    // Pilon's WHERE id
    getPilonById: async (pilonesId) => {
        try {
            const connection = await mysql.createConnection(dbConfig); // DB connection

            const [results] = await connection.execute('SELECT * FROM pilones WHERE id = ?', [pilonesId]); // Execute request

            connection.end(); // Cierra la conexión

            if (results.length === 0) {
                throw new Error('Pilon not found');
            }
            return results[0];
        } catch (error) {
            throw new Error('Error fetching pilon: ' + error.message);
        }
    },

    // Pilon's create
   // Pilon's create
   createPilon: async (nombre, finca, variedad, corte, clase, cosecha, empilonado, etapa, tipo_tabaco, pn, temp_min, temp_max, estado, proceso) => {
    try {
        const connection = await mysql.createConnection(dbConfig);

        const insertQuery = `
        INSERT INTO pilones (nombre, finca, variedad, corte, clase, cosecha,  etapa, tipo_tabaco, pn, temp_min, temp_max, fecha_ingreso, estado, fecha_empilonado, proceso_del_pilon)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURDATE(), ?, ?, ?)`;

        await connection.execute(insertQuery, [nombre, finca, variedad, corte, clase, cosecha, etapa, tipo_tabaco, pn, temp_min, temp_max, estado, empilonado, proceso]);

        connection.end();
     
    } catch (error) {
        throw new Error('Error creating pilón: ' + error.message);
    }
},


// Pilon's update
updatePilones: async (pilonId, nombre, finca, variedad, corte, clase, cosecha, etapa, tipo_tabaco, pn, temp_min, temp_max, estado, empilonado, proceso) => {
    try {
        const connection = await mysql.createConnection(dbConfig); // DB connection

        const updateQuery = `
            UPDATE pilones
            SET nombre = ?,
                finca = ?,
                variedad = ?,
                corte = ?,
                clase = ?,
                cosecha = ?,
                etapa = ?,
                tipo_tabaco = ?,
                pn = ?,
                temp_min = ?,
                temp_max = ?,
                estado = ?, 
                fecha_empilonado = ?, 
                proceso_del_pilon = ?
            WHERE id = ?`;

        await connection.execute(updateQuery, [nombre, finca, variedad, corte, clase, cosecha, etapa, tipo_tabaco, pn, temp_min, temp_max, estado, empilonado, proceso, pilonId]);
        connection.end();
    } catch (error) {
        throw new Error('Error updating pilon: ' + error.message);
    }
},

    // Pilon's delete
    deletePilones: async (pilonesId) => {
        try {
            const connection = await mysql.createConnection(dbConfig); // DB connection

            const deleteQuery = 'DELETE FROM pilones WHERE id = ?'; // Execute request
            const [result] = await connection.execute(deleteQuery, [pilonesId]);

            connection.end(); // Cierra la conexión

            return result.affectedRows; // Devuelve la cantidad de filas eliminadas
        } catch (error) {
            throw new Error('Error deleting pilon: ' + error.message);
        }
    },
    getAllVariedad: async () => {
        try {
            const connection = await mysql.createConnection(dbConfig); // DB connection
    
            const [results] = await connection.execute('SELECT variedad_tabaco FROM variedad'); // Execute request
    
            connection.end(); // Cierra la conexión
    
            return results;
        } catch (error) {
            throw new Error('Error obtaining workers registers: ' + error.message);
        }
    }
    // More functions
};

module.exports = pilonesController;