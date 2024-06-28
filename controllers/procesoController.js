const mysql = require('mysql2/promise');
const dbConfig = require('../public/config/database');








const procesoController = {
 
 
    getAllProceso: async () => {
        try {
            const connection = await mysql.createConnection(dbConfig);
         
    
            const [results] = await connection.execute('SELECT * FROM procesos'); 
     
         
    
    
            connection.end(); 
            
    
            
    
        
              return results;
    
    
        } catch (error) {
            console.error('Error obtaining variety registers: ' + error.message);
            throw new Error('Error obtaining variety records: ' + error.message);
        }
    },



       //Proceso WHERE id
       getProcesoById: async (procesoId) => {
        try {
            const connection = await mysql.createConnection(dbConfig); // DB connection
    
            const [results] = await connection.execute('SELECT * FROM procesos WHERE id = ?', [procesoId]); // Execute request
    
            connection.end(); // Cierra la conexión
    
            if (results.length === 0) {
                throw new Error('Proceso not found');
            }
            return results[0];
        } catch (error) {
            throw new Error('Error fetching proceso: ' + error.message);
        }
    },
    




   // Proceso UPDATE
   updateProceso: async (procesoId, codigo, proceso, descripcion, proceso_actualizado) => {
    try {
        const connection = await mysql.createConnection(dbConfig); // DB connection

        const updateQuery = 'UPDATE procesos SET codigo = ?, proceso_tabaco = ?, descripcion = ?, agregar_proceso = ?  WHERE id = ?';
        await connection.execute(updateQuery, [codigo, proceso, descripcion, proceso_actualizado, procesoId]);

        connection.end();

    } catch (error) {
        throw new Error('Error updating proceso: ' + error.message);
    }
},


 createProceso: async ( codigo_proceso, nombre_proceso, descripcion_proceso, proceso_dashboard) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        

        const insertQuery = `
        INSERT INTO procesos (codigo, proceso_tabaco, descripcion, agregar_proceso)
        VALUES (?, ?, ?, ?)`;

        await connection.execute(insertQuery, [codigo_proceso, nombre_proceso,  descripcion_proceso, proceso_dashboard]);
       

        connection.end();
      
    } catch (error) {
        throw new Error('Error creating new proceso: ' + error.message);
    }
},


      // Correo DELETE
      deleteProceso: async (procesoId) => {
        try {
            const connection = await mysql.createConnection(dbConfig); // DB connection

            const deleteQuery = 'DELETE FROM procesos WHERE id = ?'; // Execute request
            const [result] = await connection.execute(deleteQuery, [procesoId]);

            connection.end(); // Cierra la conexión

            return result.affectedRows; // Devuelve la cantidad de filas eliminadas
        } catch (error) {
            throw new Error('Error deleting proceso: ' + error.message);
        }
    },






 };


module.exports = procesoController;