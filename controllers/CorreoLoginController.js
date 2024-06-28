
const mysql = require('mysql2/promise'); 
const dbConfig = require('../public/config/database');

const CorreoLoginController = {

   
    getAllLogin: async () => {
        try {
            const connection = await mysql.createConnection(dbConfig); 

            const [results] = await connection.execute('SELECT * FROM correo_login'); 

            connection.end();

            return results;
        } catch (error) {
            throw new Error('Error al obtener los registros de arduinos: ' + error.message);
        }
    },


    updateOrCreateLogin: async (id, email, newPassword) => {
        try {
           
    
            const connection = await mysql.createConnection(dbConfig);
    
       
            const checkQuery = `SELECT COUNT(*) AS count FROM correo_login`;
            const [result] = await connection.execute(checkQuery);
            const recordCount = result[0].count;
    
            if (recordCount === 0) {
       
                const insertQuery = `INSERT INTO correo_login (id, email, password) VALUES (?, ?, ?)`;
                await connection.execute(insertQuery, [1, email, newPassword]);
            } else {
              
                const updateQuery = `UPDATE correo_login SET password = ?, email= ? WHERE id = ?`;
                await connection.execute(updateQuery, [newPassword, email, id]);
            }
    
            connection.end();
    
            return true; 
        } catch (error) {
            throw new Error('Error updating or creating correo login: ' + error.message);
        }
    }
    
};
    
    


module.exports = CorreoLoginController;
