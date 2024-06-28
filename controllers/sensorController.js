const mysql = require('mysql2/promise');
const dbConfig = require('../public/config/database');






const sensorController = {


 
    getAllSensores: async () => {
        try {
            const connection = await mysql.createConnection(dbConfig); // DB connection

            const [results] = await connection.execute('SELECT * FROM sensores'); // Execute request

            connection.end(); // Cierra la conexión

            return results;
        } catch (error) {
            throw new Error('Error al obtener los registros de arduinos: ' + error.message);
        }
    },






    createSensor: async ( nombre_sensor, direccion_sensor, arduino_asignado) => {
        try {
            const connection = await mysql.createConnection(dbConfig);
    
            const insertQuery = `
            INSERT INTO sensores (nombre, direccion, id_arduino)
            VALUES (?, ?, ?)`;
    
            await connection.execute(insertQuery, [nombre_sensor, direccion_sensor,  arduino_asignado]);
    
            connection.end();
        } catch (error) {
            throw new Error('Error creating new sensor: ' + error.message);
        }
    }
    
    


  }



  module.exports = sensorController;