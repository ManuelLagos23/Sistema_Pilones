const mysql = require('mysql2/promise');
const dbConfig = require('../public/config/database');

const arduinosController = {
    // Arduino's *
    getAllArduinos: async () => {
        try {
            const connection = await mysql.createConnection(dbConfig); // DB connection

            const [results] = await connection.execute('SELECT * FROM arduinos'); // Execute request

            connection.end(); // Cierra la conexión

            return results;
        } catch (error) {
            throw new Error('Error al obtener los registros de arduinos: ' + error.message);
        }
    },

    getAllNombrearduinos: async () => {
        try {
            const connection = await mysql.createConnection(dbConfig); // DB connection
    
            const [results] = await connection.execute('SELECT nombre FROM arduinos'); // Execute request
    
            connection.end(); // Cierra la conexión
    
            return results;
        } catch (error) {
            throw new Error('Error obtaining workers registers: ' + error.message);
        }
    },




    // Arduino's WHERE id
    getArduinoById: async (arduinoId) => {
        try {
            const connection = await mysql.createConnection(dbConfig); // DB connection

            const [results] = await connection.execute('SELECT * FROM arduinos WHERE id = ?', [arduinoId]); // Execute request

            connection.end(); // Cierra la conexión

            if (results.length === 0) {
                throw new Error('Arduino not found');
            }
            return results[0];
        } catch (error) {
            throw new Error('Error fetching arduino: ' + error.message);
        }
    },

    // Arduino's create
    createArduino: async (nombre, direccion_bits, pilon_encargado, arduino_port) => {
        try {
            const connection = await mysql.createConnection(dbConfig); // DB connection

            const insertQuery = 'INSERT INTO arduinos (nombre, direccion_bits, pilon_encargado, arduino_port) VALUES (?, ?, ?, ?)';
            const [result] = await connection.execute(insertQuery, [nombre, direccion_bits, pilon_encargado, arduino_port]);

 

;

            connection.end();

            return result.insertId;
        } catch (error) {
            throw new Error('Error creating arduino: ' + error.message);
        }
    },

       updateArduino: async (arduinoId, nombre, direccion_bits, pilon_encargado, arduino_port) => {
        try {
            const connection = await mysql.createConnection(dbConfig); 
    
  
            await connection.beginTransaction();
    
            try {
           
                const getArduinoInfoQuery = 'SELECT direccion_bits, pilon_encargado FROM arduinos WHERE id = ?';
                const [arduinoInfoRows] = await connection.execute(getArduinoInfoQuery, [arduinoId]);
    
                if (arduinoInfoRows.length > 0) {
                    const originalDireccionBits = arduinoInfoRows[0].direccion_bits;
                    const originalPilonEncargado = arduinoInfoRows[0].pilon_encargado;
    
                 
                    const clearOriginalArduinoQuery = 'UPDATE arduinos SET pilon_encargado = NULL WHERE pilon_encargado = ?';
                    await connection.execute(clearOriginalArduinoQuery, [pilon_encargado]);
    
          
                    const deleteFromArduinoQuery = 'UPDATE arduinos SET direccion_bits = NULL, pilon_encargado = NULL WHERE id = ?';
                    await connection.execute(deleteFromArduinoQuery, [arduinoId]);
    
                
                    const clearOriginalPilonQuery = 'UPDATE pilones SET direccion_sensor = NULL WHERE id = ?';
                    await connection.execute(clearOriginalPilonQuery, [originalPilonEncargado]);
    
               
                    const clearNewPilonQuery = 'UPDATE pilones SET direccion_sensor = NULL WHERE id = ?';
                    await connection.execute(clearNewPilonQuery, [pilon_encargado]);
    
              
                    const updatePilonesQuery = 'UPDATE pilones SET direccion_sensor = ? WHERE id = ?';
                    await connection.execute(updatePilonesQuery, [direccion_bits, pilon_encargado]);
    
             
                    const updateArduinoQuery = 'UPDATE arduinos SET nombre = ?, direccion_bits = ?, pilon_encargado = ?, arduino_port = ? WHERE id = ?';
                    await connection.execute(updateArduinoQuery, [nombre, direccion_bits, pilon_encargado, arduino_port, arduinoId]);
    
               
                    await connection.commit();
                } else {
                    throw new Error('No se encontró información para el Arduino con ID: ' + arduinoId);
                }
            } catch (error) {
       
                await connection.rollback();
                throw error;
            } finally {
       
                connection.end();
            }
    
        } catch (error) {
            throw new Error('Error updating arduino: ' + error.message);
        }
 
        
    },
    
    
    
    

    // Arduino's delete
    deleteArduino: async (arduinoId) => {
        try {
            const connection = await mysql.createConnection(dbConfig); // DB connection

            const deleteQuery = 'DELETE FROM arduinos WHERE id = ?'; // Execute request
            const [result] = await connection.execute(deleteQuery, [arduinoId]);

            connection.end(); // Cierra la conexión

            return result.affectedRows; // Devuelve la cantidad de filas eliminadas
        } catch (error) {
            throw new Error('Error deleting arduino: ' + error.message);
        }
    },

    // More functions
};

module.exports = arduinosController;
