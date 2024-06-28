const mysql = require('mysql2/promise');
const dbConfig = require('../public/config/database');


const corteController = {



    getAllCorte: async () => {
        try {
            const connection = await mysql.createConnection(dbConfig); // DB connection
    
            const [results] = await connection.execute('SELECT * FROM corte'); // Execute request
    
            connection.end(); // Cierra la conexión
    
            return results;
        } catch (error) {
            throw new Error('Error obtaining workers registers: ' + error.message);
        }
    },


    
   // Worker WHERE id
   getCorteById: async (corteId) => {
    try {
        const connection = await mysql.createConnection(dbConfig); // DB connection

        const [results] = await connection.execute('SELECT * FROM corte WHERE id = ?', [corteId]); // Execute request

        connection.end(); // Cierra la conexión

        if (results.length === 0) {
            throw new Error('Corte not found');
        }
        return results[0];
    } catch (error) {
        throw new Error('Error fetching corte: ' + error.message);
    }
},




    // Clase UPDATE
    updateCorte: async (corteId, codigo, corte, descripcion) => {
        try {
            const connection = await mysql.createConnection(dbConfig); // DB connection

            const updateQuery = 'UPDATE corte SET codigo = ?, corte_tabaco = ?, descripcion = ?  WHERE id = ?';
            await connection.execute(updateQuery, [codigo, corte, descripcion, corteId]);

            connection.end();

        } catch (error) {
            throw new Error('Error updating corte: ' + error.message);
        }
    },






    createCorte: async ( codigo_corte, nombre_corte, descripcion_corte) => {
        try {
            const connection = await mysql.createConnection(dbConfig);
    
            const insertQuery = `
            INSERT INTO corte (codigo, corte_tabaco, descripcion)
            VALUES (?, ?, ?)`;
    
            await connection.execute(insertQuery, [codigo_corte, nombre_corte,  descripcion_corte]);
    
            connection.end();
        } catch (error) {
            throw new Error('Error creating new variedad: ' + error.message);
        }
    },


        // Corte DELETE
        deleteCorte: async (corteId) => {
            try {
                const connection = await mysql.createConnection(dbConfig); // DB connection
    
                const deleteQuery = 'DELETE FROM corte WHERE id = ?'; // Execute request
                const [result] = await connection.execute(deleteQuery, [corteId]);
    
                connection.end(); // Cierra la conexión
    
                return result.affectedRows; // Devuelve la cantidad de filas eliminadas
            } catch (error) {
                throw new Error('Error deleting corte: ' + error.message);
            }
        },
    

    
    
    
    
    
     };

  


  module.exports = corteController;