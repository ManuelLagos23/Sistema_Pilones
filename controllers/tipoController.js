const mysql = require('mysql2/promise');
const dbConfig = require('../public/config/database');


const tipoController = {


    getAllTipo: async () => {
        try {
            const connection = await mysql.createConnection(dbConfig); // DB connection
    
            const [results] = await connection.execute('SELECT * FROM tipo'); // Execute request
    
            connection.end(); // Cierra la conexión
    
            return results;
        } catch (error) {
            throw new Error('Error obtaining etapa registers: ' + error.message);
        }
    },


    
       // Tipo WHERE id
   getTipoById: async (tipoId) => {
    try {
        const connection = await mysql.createConnection(dbConfig); // DB connection

        const [results] = await connection.execute('SELECT * FROM tipo WHERE id = ?', [tipoId]); // Execute request

        connection.end(); // Cierra la conexión

        if (results.length === 0) {
            throw new Error('Tipo not found');
        }
        return results[0];
    } catch (error) {
        throw new Error('Error fetching tipo: ' + error.message);
    }
},


   // Tipo UPDATE
   updateTipo: async (tipoId, codigo, tipo, descripcion) => {
    try {
        const connection = await mysql.createConnection(dbConfig); // DB connection

        const updateQuery = 'UPDATE tipo SET codigo = ?, tipo_tabaco = ?, descripcion = ?  WHERE id = ?';
        await connection.execute(updateQuery, [codigo, tipo, descripcion, tipoId]);

        connection.end();

    } catch (error) {
        throw new Error('Error updating tipo: ' + error.message);
    }
},


    createTipo: async ( codigo_tipo, nombre_tipo, descripcion_tipo) => {
        try {
            const connection = await mysql.createConnection(dbConfig);
    
            const insertQuery = `
            INSERT INTO tipo (codigo, tipo_tabaco, descripcion)
            VALUES (?, ?, ?)`;
    
            await connection.execute(insertQuery, [codigo_tipo, nombre_tipo,  descripcion_tipo]);
    
            connection.end();
        } catch (error) {
            throw new Error('Error creating new etapa: ' + error.message);
        }
    },



         // Tipo DELETE
         deleteTipo: async (tipoId) => {
            try {
                const connection = await mysql.createConnection(dbConfig); // DB connection
    
                const deleteQuery = 'DELETE FROM tipo WHERE id = ?'; // Execute request
                const [result] = await connection.execute(deleteQuery, [tipoId]);
    
                connection.end(); // Cierra la conexión
    
                return result.affectedRows; // Devuelve la cantidad de filas eliminadas
            } catch (error) {
                throw new Error('Error deleting tipo: ' + error.message);
            }
        },
    
    
    
    
    
     };

  


     module.exports = tipoController;
