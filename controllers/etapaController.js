const mysql = require('mysql2/promise');
const dbConfig = require('../public/config/database');


const etapaController = {



    getAllEtapa: async () => {
        try {
            const connection = await mysql.createConnection(dbConfig); // DB connection
    
            const [results] = await connection.execute('SELECT * FROM etapa'); // Execute request
    
            connection.end(); // Cierra la conexión
    
            return results;
        } catch (error) {
            throw new Error('Error obtaining etapa registers: ' + error.message);
        }
    },

       // Etapa WHERE id
   getEtapaById: async (etapaId) => {
    try {
        const connection = await mysql.createConnection(dbConfig); // DB connection

        const [results] = await connection.execute('SELECT * FROM etapa WHERE id = ?', [etapaId]); // Execute request

        connection.end(); // Cierra la conexión

        if (results.length === 0) {
            throw new Error('Etapa not found');
        }
        return results[0];
    } catch (error) {
        throw new Error('Error fetching etapa: ' + error.message);
    }
},

   // Etapa UPDATE
   updateEtapa: async (etapaId, codigo, etapa, descripcion) => {
    try {
        const connection = await mysql.createConnection(dbConfig); // DB connection

        const updateQuery = 'UPDATE etapa SET codigo = ?, etapa_tabaco = ?, descripcion = ?  WHERE id = ?';
        await connection.execute(updateQuery, [codigo, etapa, descripcion, etapaId]);

        connection.end();

    } catch (error) {
        throw new Error('Error updating etapa: ' + error.message);
    }
},


    createEtapa: async ( codigo_etapa, nombre_etapa, descripcion_etapa) => {
        try {
            const connection = await mysql.createConnection(dbConfig);
    
            const insertQuery = `
            INSERT INTO etapa (codigo, etapa_tabaco, descripcion)
            VALUES (?, ?, ?)`;
    
            await connection.execute(insertQuery, [codigo_etapa, nombre_etapa,  descripcion_etapa]);
    
            connection.end();
        } catch (error) {
            throw new Error('Error creating new etapa: ' + error.message);
        }
    },


    
            // Etapa DELETE
            deleteEtapa: async (etapaId) => {
                try {
                    const connection = await mysql.createConnection(dbConfig); // DB connection
        
                    const deleteQuery = 'DELETE FROM etapa WHERE id = ?'; // Execute request
                    const [result] = await connection.execute(deleteQuery, [etapaId]);
        
                    connection.end(); // Cierra la conexión
        
                    return result.affectedRows; // Devuelve la cantidad de filas eliminadas
                } catch (error) {
                    throw new Error('Error deleting etapa: ' + error.message);
                }
            },
    
    
    
    
    
    
     };

  


  module.exports = etapaController;
