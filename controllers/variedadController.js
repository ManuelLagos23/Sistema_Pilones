const mysql = require('mysql2/promise');
const dbConfig = require('../public/config/database');








const variedadController = {
 

      
        getAllVariedadlist: async () => {
            try {
                const connection = await mysql.createConnection(dbConfig); // DB connection
    
                const [results] = await connection.execute('SELECT * FROM variedad'); // Execute request
    
                connection.end(); // Cierra la conexión
    
                return results;
            } catch (error) {
                throw new Error('Error obtaining variedad registers: ' + error.message);
            }
        },


 getAllVariedad: async () => {
    try {
        const connection = await mysql.createConnection(dbConfig);
     

        const [results] = await connection.execute('SELECT * FROM variedad'); 
 
     


        connection.end(); 
        

        

    
          return results;


    } catch (error) {
        console.error('Error obtaining variety registers: ' + error.message);
        throw new Error('Error obtaining variety records: ' + error.message);
    }
},


   // Worker WHERE id
   getVariedadById: async (variedadesId) => {
    try {
        const connection = await mysql.createConnection(dbConfig); // DB connection

        const [results] = await connection.execute('SELECT * FROM variedad WHERE id = ?', [variedadesId]); // Execute request

        connection.end(); // Cierra la conexión

        if (results.length === 0) {
            throw new Error('Worker not found');
        }
        return results[0];
    } catch (error) {
        throw new Error('Error fetching variedad: ' + error.message);
    }
},



    // Variedad UPDATE
    updateVariedad: async (variedadId, codigo, variedad, descripcion) => {
        try {
            const connection = await mysql.createConnection(dbConfig); // DB connection

            const updateQuery = 'UPDATE variedad SET codigo = ?, variedad_tabaco = ?, descripcion = ?  WHERE id = ?';
            await connection.execute(updateQuery, [codigo, variedad, descripcion, variedadId]);

            connection.end();

        } catch (error) {
            throw new Error('Error updating variedad: ' + error.message);
        }
    },


 createVariedad: async ( codigo_variedad, nombre_variedad, descripcion_variedad) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        

        const insertQuery = `
        INSERT INTO variedad (codigo, variedad_tabaco, descripcion)
        VALUES (?, ?, ?)`;

        await connection.execute(insertQuery, [codigo_variedad, nombre_variedad,  descripcion_variedad]);
       

        connection.end();
      
    } catch (error) {
        throw new Error('Error creating new variedad: ' + error.message);
    }
},




    // Variedad DELETE
    deleteVariedad: async (variedadId) => {
        try {
            const connection = await mysql.createConnection(dbConfig); // DB connection

            const deleteQuery = 'DELETE FROM variedad WHERE id = ?'; // Execute request
            const [result] = await connection.execute(deleteQuery, [variedadId]);

            connection.end(); // Cierra la conexión

            return result.affectedRows; // Devuelve la cantidad de filas eliminadas
        } catch (error) {
            throw new Error('Error deleting variedad: ' + error.message);
        }
    },


 };


module.exports = variedadController;