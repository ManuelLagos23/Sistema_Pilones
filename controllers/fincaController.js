const mysql = require('mysql2/promise');
const dbConfig = require('../public/config/database');


const fincaController = {



    getAllFinca: async () => {
        try {
            const connection = await mysql.createConnection(dbConfig); // DB connection
    
            const [results] = await connection.execute('SELECT * FROM finca'); // Execute request
    
            connection.end(); // Cierra la conexión
    
            return results;
        } catch (error) {
            throw new Error('Error obtaining workers registers: ' + error.message);
        }
    },

   // Finca WHERE id
   getFincaById: async (fincaId) => {
    try {
        const connection = await mysql.createConnection(dbConfig); // DB connection

        const [results] = await connection.execute('SELECT * FROM finca WHERE id = ?', [fincaId]); // Execute request

        connection.end(); // Cierra la conexión

        if (results.length === 0) {
            throw new Error('finca not found');
        }
        return results[0];
    } catch (error) {
        throw new Error('Error fetching finca: ' + error.message);
    }
},

   // Finca UPDATE
   updateFinca: async (fincaId, codigo, finca, descripcion) => {
    try {
        const connection = await mysql.createConnection(dbConfig); // DB connection

        const updateQuery = 'UPDATE finca SET codigo = ?, finca_tabaco = ?, descripcion = ?  WHERE id = ?';
        await connection.execute(updateQuery, [codigo, finca, descripcion, fincaId]);

        connection.end();

    } catch (error) {
        throw new Error('Error updating finca: ' + error.message);
    }
},


    createFinca: async ( codigo_finca, nombre_finca, descripcion_finca) => {
        try {
            const connection = await mysql.createConnection(dbConfig);
    
            const insertQuery = `
            INSERT INTO finca (codigo, finca_tabaco, descripcion)
            VALUES (?, ?, ?)`;
    
            await connection.execute(insertQuery, [codigo_finca, nombre_finca,  descripcion_finca]);
    
            connection.end();
        } catch (error) {
            throw new Error('Error creating new variedad: ' + error.message);
        }
    },


            // Finca DELETE
            deleteFinca: async (fincaId) => {
                try {
                    const connection = await mysql.createConnection(dbConfig); // DB connection
        
                    const deleteQuery = 'DELETE FROM finca WHERE id = ?'; // Execute request
                    const [result] = await connection.execute(deleteQuery, [fincaId]);
        
                    connection.end(); // Cierra la conexión
        
                    return result.affectedRows; // Devuelve la cantidad de filas eliminadas
                } catch (error) {
                    throw new Error('Error deleting finca: ' + error.message);
                }
            },
    
    
    
    
    
     };

  


  module.exports = fincaController;

