const mysql = require('mysql2/promise');
const dbConfig = require('../public/config/database');


const claseController = {





    getAllClase: async () => {
        try {
            const connection = await mysql.createConnection(dbConfig); // DB connection
    
            const [results] = await connection.execute('SELECT * FROM clase'); // Execute request
    
            connection.end(); // Cierra la conexión
    
            return results;
        } catch (error) {
            throw new Error('Error obtaining workers registers: ' + error.message);
        }
    },

   // Finca WHERE id
   getClaseById: async (claseId) => {
    try {
        const connection = await mysql.createConnection(dbConfig); // DB connection

        const [results] = await connection.execute('SELECT * FROM clase WHERE id = ?', [claseId]); // Execute request

        connection.end(); // Cierra la conexión

        if (results.length === 0) {
            throw new Error('Clase not found');
        }
        return results[0];
    } catch (error) {
        throw new Error('Error fetching corte: ' + error.message);
    }
},


    // Clase UPDATE
    updateClase: async (claseId, codigo, clase, descripcion) => {
        try {
            const connection = await mysql.createConnection(dbConfig); // DB connection

            const updateQuery = 'UPDATE clase SET codigo = ?, clase_tabaco = ?, descripcion = ?  WHERE id = ?';
            await connection.execute(updateQuery, [codigo, clase, descripcion, claseId]);

            connection.end();

        } catch (error) {
            throw new Error('Error updating clase: ' + error.message);
        }
    },

    
    createClase: async ( codigo_clase, nombre_clase, descripcion_clase) => {
        try {
            const connection = await mysql.createConnection(dbConfig);
    
            const insertQuery = `
            INSERT INTO clase (codigo, clase_tabaco, descripcion)
            VALUES (?, ?, ?)`;
    
            await connection.execute(insertQuery, [codigo_clase, nombre_clase,  descripcion_clase]);
    
            connection.end();
        } catch (error) {
            throw new Error('Error creating new variedad: ' + error.message);
        }
    },


        
        // Clase DELETE
        deleteClase: async (claseId) => {
            try {
                const connection = await mysql.createConnection(dbConfig); // DB connection
    
                const deleteQuery = 'DELETE FROM clase WHERE id = ?'; // Execute request
                const [result] = await connection.execute(deleteQuery, [claseId]);
    
                connection.end(); // Cierra la conexión
    
                return result.affectedRows; // Devuelve la cantidad de filas eliminadas
            } catch (error) {
                throw new Error('Error deleting clase: ' + error.message);
            }
        },
    
    
    
    
    
    
     };

  


  module.exports = claseController;


      