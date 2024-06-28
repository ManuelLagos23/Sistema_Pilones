const mysql = require('mysql2/promise');
const dbConfig = require('../public/config/database');







const correoController = {








    getAllCorreos: async () => {
        try {
            const connection = await mysql.createConnection(dbConfig); // DB connection

            const [results] = await connection.execute('SELECT * FROM correos'); // Execute request

            connection.end(); // Cierra la conexión

            return results;
        } catch (error) {
            throw new Error('Error al obtener los registros de arduinos: ' + error.message);
        }
    },


        //Proceso WHERE id
        getCorreoById: async (correoId) => {
            try {
                const connection = await mysql.createConnection(dbConfig); // DB connection
        
                const [results] = await connection.execute('SELECT * FROM correos WHERE id = ?', [correoId]); // Execute request
        
                connection.end(); // Cierra la conexión
        
                if (results.length === 0) {
                    throw new Error('Correo not found');
                }
                return results[0];
            } catch (error) {
                throw new Error('Error fetching proceso: ' + error.message);
            }
        },
        


    // Arduino's update
    updateCorreo: async (correoId, nombre, cargo, correo) => {
        try {
            const connection = await mysql.createConnection(dbConfig); // DB connection

            const updateQuery = 'UPDATE correos SET nombre = ?, cargo = ?, correo = ?  WHERE id = ?';
            await connection.execute(updateQuery, [nombre, cargo, correo, correoId]);

            
            connection.end();
            
        } catch (error) {
            throw new Error('Error updating correo: ' + error.message);
        }
    },

    createCorreo: async ( correo_nombre, correo_cargo, correo) => {
        try {
            const connection = await mysql.createConnection(dbConfig);
    
            const insertQuery = `
            INSERT INTO correos (nombre, cargo, correo)
            VALUES (?, ?, ?)`;
    
            await connection.execute(insertQuery, [correo_nombre, correo_cargo,  correo]);
    
            connection.end();
        } catch (error) {
            throw new Error('Error creating new correo: ' + error.message);
        }
    },



        // Correo DELETE
        deleteCorreo: async (correoId) => {
            try {
                const connection = await mysql.createConnection(dbConfig); // DB connection
    
                const deleteQuery = 'DELETE FROM correos WHERE id = ?'; // Execute request
                const [result] = await connection.execute(deleteQuery, [correoId]);
    
                connection.end(); // Cierra la conexión
    
                return result.affectedRows; // Devuelve la cantidad de filas eliminadas
            } catch (error) {
                throw new Error('Error deleting correo: ' + error.message);
            }
        },
    
    
    
    



};


module.exports = correoController;