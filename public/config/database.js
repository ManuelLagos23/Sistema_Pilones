//const mysql = require('mysql2/promise');
//cconst bcrypt = require ('bcrypt');

const dbConfig =    {
    host: 'localhost',
    user: 'servidor',
    password: '123456',
    database: 'pilones_temps'
  } ;
  

/*const User = {};

User.findByUsername = function (username, callback) {
    const query = 'SELECT * FROM users WHERE user = ?';
    dbConfig.query(query, [username], function (err, results, fields) {
        if (err) {
            return callback(err);
        }
        if (results.length === 0) {
            return callback(null, null);
        }
        const user = results[0];
        callback(null, {
            id: user.id,
            username: user.user,
            password: user.password,
            rol: user.rol
        });
    });
};

User.findById = function (id, callback) {
    const query = 'SELECT * FROM users WHERE id = ?';
    dbConfig.query(query, [id], function (err, results, fields) {
        if (err) {
            return callback(err);
        }
        if (results.length === 0) {
            return callback(null, null);
        }
        const user = results[0];
        callback(null, {
            id: user.id,
            username: user.user,
            password: user.password
        });
    });
};

User.create = function (username, password, callback) {
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            return callback(err);
        }
        const query = 'INSERT INTO users (user, password) VALUES (?, ?)';
        dbConfig.query(query, [username, hash], function (err, results, fields) {
            if (err) {
                return callback(err);
            }
            const id = results.insertId;
            callback(null, { id, username, password });
        });
    });
};

User.checkPassword = function (password, hash, callback) {
    bcrypt.compare(password, hash, function (err, res) {
        if (err) {
            return callback(err);
        }
        callback(null, res);
    });
}

// Función para insertar el usuario por defecto
function insertDefaultUser() {
    const defaultUsername = 'admin';
    const defaultPassword = 'Diadema.2023';
    const defaultHashedPassword = bcrypt.hashSync(defaultPassword, 10);
    const defaultFullName = 'Administrator'; 
    const defaultRole = 'admin'; 

    // Verificar si el usuario por defecto ya existe en la base de datos
    const checkQuery = 'SELECT * FROM users WHERE User = ?';
    con.query(checkQuery, [defaultUsername], function (err, results, fields) {
        if (err) {
            console.error('Error al verificar el usuario por defecto:', err);
        } else {
            if (results.length === 0) {
                // Si el usuario por defecto no existe, entonces lo insertamos
                const insertQuery = 'INSERT INTO users (user, password, name, rol) VALUES (?, ?, ?, ?)';
                dbConfig.query(insertQuery, [defaultUsername, defaultHashedPassword, defaultFullName, defaultRole], function (err, results, fields) {
                    if (err) {
                        console.error('Error al insertar el usuario por defecto:', err);
                    } else {
                        console.log('Usuario por defecto insertado con éxito:', results);
                    }
                });
            } else {
                // Si el usuario por defecto ya existe, simplemente mostramos un mensaje
                console.log('El usuario por defecto ya existe en la base de datos.');
            }
        }
    });
}*/

module.exports = dbConfig;




