const session = require('express-session');
const express = require('express');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const { SerialPort } = require('serialport');
const router = express.Router();


app.use(session({
  secret: 'mi-clave-secreta',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));





const bodyParser = require('body-parser');



const port = 3001;
const path = require('path');
const routes = require('./public/routes/routes');
const db = require('./public/config/database');
const adminDefault = require('./public/config/admindefault');
const dbtwo = require('./public/config/databasetwo');



app.set('views', path.join(__dirname, 'public/views'));
app.use('/resources', express.static(path.join(__dirname, 'resources')));
app.set('view engine', 'ejs');

app.use(express.json());

app.use((req, res, next) => {
  req.db = db;
  req.dbtwo = dbtwo;
  next();
});

// Imported Routes
app.use('/', routes);
app.use('/individual_arduino', routes);
app.use('/arduino_list', routes);
app.use('/worker_list', routes);
app.use('/pilones_list', routes);
app.use('/tasks_list', routes);
app.use('/graphics_history', routes);
app.use('/temp_history', routes);
app.use('/hum_history', routes);


/*
---------------------------------------------------

######################################
*   ARDUINO CONFIGURATION - SERVER   *
######################################

*/







app.use(bodyParser.json());




let arduinoPort1 = null;
let arduinoPort2 = null;
let incompleteData1 = '';
let incompleteData2 = '';
const sensorAddressesQueue = []; // Cola para almacenar las direcciones de los sensores
const ARDUINO_PORT_1 = '/dev/ttyACM0'; // Puerto del primer Arduino
const ARDUINO_PORT_2 = '/dev/ttyACM1'; // Puerto del segundo Arduino
const sensorData = {}; // Objeto para almacenar direcciones y temperaturas
let direccionesTemperaturas = [];

function initializeArduinoConnections() {
  establishConnection(1);
  establishConnection(2);
  startSendingSensorAddresses();
}

function establishConnection(arduinoNum) {
  let arduinoPort = null;
  let portPath = (arduinoNum === 1) ? ARDUINO_PORT_1 : ARDUINO_PORT_2;

  arduinoPort = new SerialPort({ path: portPath,  baudRate: 9600, autoOpen: false });

  function attemptConnection() {
    arduinoPort.open((err) => {
      if (err) {
        console.error(`Error al conectar con Arduino ${arduinoNum}:`, err.message);
        console.log(`Reintentando la conexión con Arduino ${arduinoNum} en 3 segundos...`);
        setTimeout(attemptConnection, 3000);
      } else {
        console.log(`Conexión establecida con Arduino ${arduinoNum}.`);
        if (arduinoNum === 1) {
          arduinoPort1 = arduinoPort;
        } else {
          arduinoPort2 = arduinoPort;
        }

        arduinoPort.on('data', (data) => {
          const receivedData = data.toString();
          if (arduinoNum === 1) {
            incompleteData1 += receivedData;
          } else {
            incompleteData2 += receivedData;
          }

          const lines = (arduinoNum === 1) ? incompleteData1.split('\n') : incompleteData2.split('\n');
          if (arduinoNum === 1) {
            incompleteData1 = lines.pop();
          } else {
            incompleteData2 = lines.pop();
          }

          lines.forEach((line) => {
            handleData(line.trim());
          });

          enviarDireccionesTemperaturas();
        });

        arduinoPort.on('error', (err) => {
          console.error(`Error en la conexión con Arduino ${arduinoNum}:`, err.message);
          if (err.message.includes('disconnected')) {
            console.log(`Arduino ${arduinoNum} desconectado. Intentando reconectar en 5 segundos...`);
            if (arduinoNum === 1) {
              arduinoPort1 = null;
            } else {
              arduinoPort2 = null;
            }
            setTimeout(() => {
              establishConnection(arduinoNum);
            }, 5000);
          }
        });

        arduinoPort.on('close', () => {
          console.log(`Puerto serie del Arduino ${arduinoNum} cerrado. Intentando reconexión...`);
          if (arduinoNum === 1) {
            arduinoPort1 = null;
          } else {
            arduinoPort2 = null;
          }
          setTimeout(() => {
            establishConnection(arduinoNum);
          }, 5000);
        });
      }
    });
  }

  attemptConnection();
}

function startSendingSensorAddresses() {
  setInterval(() => {
    if (sensorAddressesQueue.length > 0) {
      const sensorAddr = sensorAddressesQueue.shift();
      if (arduinoPort1 && arduinoPort1.isOpen) {
        startTemperatureInterval(sensorAddr, arduinoPort1);
      }
      if (arduinoPort2 && arduinoPort2.isOpen) {
        startTemperatureInterval(sensorAddr, arduinoPort2);
      }
      sensorAddressesQueue.push(sensorAddr);
    }
  }, 500);
}

function startTemperatureInterval(sensorAddr, port) {
  port.write(`getTemperature:${sensorAddr}\n`, (err) => {
    if (err) {
      console.error(`Error al enviar la dirección al Arduino: ${err.message}`);
    } else {
      console.log(`Enviada la dirección ${sensorAddr} al Arduino.`);
    }
  });
}


function handleData(data) {
  if (data.startsWith('Temperature:')) {
    const temperatureData = data.split(':');
    if (temperatureData.length === 4) {
      const temperature = parseFloat(temperatureData[1]);
      const sensorAddr = temperatureData[3].trim(); //

      console.log(`${sensorAddr}: ${temperature}`);

      sensorData[sensorAddr] = { ...sensorData[sensorAddr], temperature }; 
      io.emit('temperatureData', { direccionSensor: sensorAddr, temperatura: temperature });
    }
  }
}

// Enviar direcciones y temperaturas al cliente a través de Socket.IO
function enviarDireccionesTemperaturas() {
  const direccionesTemperaturas = Object.entries(sensorData).map(([direccionSensor, temperatura]) => ({
    direccionSensor,
    temperatura,
  }));
  io.emit('temperaturasDirecciones', direccionesTemperaturas);
}

// Resto del código del servidor...

// Enviar direcciones al cliente junto con las temperaturas asociadas
app.get('/api/direcciones-temperaturas', (req, res) => {
  const direccionesTemperaturas = Object.entries(sensorData).map(([direccionSensor, temperatura]) => ({
    direccionSensor,
    temperatura,
  }));
  res.json(direccionesTemperaturas);
});



// Configurar body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/enviar-direccion-sensor', (req, res) => {
  const { direccionSensor } = req.body;
  sensorAddressesQueue.push(direccionSensor); // Agrega la dirección a la cola
  res.sendStatus(200);
});






initializeArduinoConnections();















app.post('/login', async (req, res) => {
  const { user, password } = req.body;

  try {
    const db = await connectDB(); 
 
    const [existingUsers] = await db.execute('SELECT COUNT(*) as count FROM users');

    if (existingUsers[0].count === 0) {
     
      const insertQuery = `
        INSERT INTO users(user, name, password, rol) 
        VALUES (?, ?, ?, ?)
      `;
      const insertValues = ["admin", 'Líder', "Eternal2028#", 'Jefe']; 

      try {
        const [insertResult] = await db.execute(insertQuery, insertValues);
        console.log('Nuevo usuario insertado:', insertResult);
      } catch (error) {
        console.error('Error al insertar nuevo usuario:', error);
        throw new Error('Error al insertar nuevo usuario');
      }
    }

    await db.end(); 
  } catch (error) {
    console.error('Error al verificar/insertar usuario:', error);
    throw new Error('Error al verificar/insertar usuario');
  }

  try {
    const db = await connectDB();
    const [results] = await db.execute('SELECT * FROM users WHERE user = ? AND password = ?', [user, password]);

    if (results.length > 0) {
      req.session.user = user;
      res.redirect('/home');
  } else {
      res.redirect('/?error=accesso_denegado'); 

  }
  
    await db.end();
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    res.status(500).send('Error en el servidor');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      return res.status(500).json({ error: 'Error al cerrar sesión' });
    }
  
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.json({ message: 'Sesión cerrada correctamente' });
  });
});


async function connectDB() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'servidor',
      password: '123456',
      database: 'pilones_temps'
    });
    return connection;
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    throw error;
  }
}



















const mysql = require('mysql2/promise');
const { Console } = require('console');

// Función para conectar a la base de datos local
async function conectarLocalDB() {
  return await mysql.createPool(dbConfig);
}

// Función para conectar a la base de datos del servidor
async function conectarServerDB() {
  return await mysql.createPool(dbConfig2);
}

// Ruta para manejar la solicitud del botón
app.post('/actualizar', async (req, res) => {
  try {
    // Llamar a la función para actualizar la base de datos
    await actualizarBaseDatos(res);
  } catch (error) {
    console.error('Error en la actualización de la base de datos:', error);
    res.status(500).json({ message: 'Error en la actualización de la base de datos.' });
  }
});

// Función para actualizar la base de datos
async function actualizarBaseDatos(response) {
  const localDBConnection = await conectarLocalDB();
  const serverDBConnection = await conectarServerDB();

  try {
    await verificarConexion(serverDBConnection);

 

const [rowsFromServerArduinos] = await serverDBConnection.query('SELECT * FROM arduinos');

for (const rowServer of rowsFromServerArduinos) {
  const existingLocalRow = await localDBConnection.query('SELECT * FROM arduinos WHERE id = ?', [rowServer.id]);

  if (existingLocalRow[0].length > 0) {
    // El registro ya existe localmente, actualiza en lugar de insertar
    const updateQuery = `
      UPDATE arduinos
      SET nombre=?, direccion_bits=?, pilon_encargado=?, arduino_port=?
      WHERE id=?
    `;

    await localDBConnection.query(updateQuery, [
      rowServer.nombre,
      rowServer.direccion_bits,
      rowServer.pilon_encargado,
      rowServer.arduino_port,
      rowServer.id
    ]);
  } else {
    // El registro no existe localmente, realiza la inserción
    const insertQuery = `
      INSERT INTO arduinos (id, nombre, direccion_bits, pilon_encargado, arduino_port)
      VALUES (?, ?, ?, ?, ?)
    `;

    await localDBConnection.query(insertQuery, [
      rowServer.id,
      rowServer.nombre,
      rowServer.direccion_bits,
      rowServer.pilon_encargado,
      rowServer.arduino_port
    ]);
  }
}

// ... resto de tu código ...

    const [rowsFromServerPilones] = await serverDBConnection.query('SELECT * FROM pilones');

    for (const rowServer of rowsFromServerPilones) {
      const existingLocalRow = await localDBConnection.query('SELECT * FROM pilones WHERE id = ?', [rowServer.id]);

      if (existingLocalRow[0].length > 0) {
        // El registro ya existe localmente, actualiza en lugar de insertar
        const updateQuery = `
          UPDATE pilones 
          SET nombre=?, variedad=?, finca=?, etapa=?, pn=?, temp_min=?, temp_max=?, fecha_ingreso=?, estado=?, corte=?, cosecha=?, clase=?, tipo_tabaco=?, arduino_asignado=?, direccion_sensor=?
          WHERE id=? `;

        await localDBConnection.query(updateQuery, [
          rowServer.nombre,
          rowServer.variedad,
          rowServer.finca,
          rowServer.etapa,
          rowServer.pn,
          rowServer.temp_min,
          rowServer.temp_max,
          rowServer.fecha_ingreso,
          rowServer.estado,
          rowServer.corte,
          rowServer.cosecha,
          rowServer.clase,
          rowServer.tipo_tabaco,
          rowServer.arduino_asignado,
          rowServer.direccion_sensor,
          rowServer.id,
        ]);
      } else {
        // El registro no existe localmente, realiza la inserción
        const insertQuery = `
          INSERT INTO pilones (id, nombre, variedad, finca, etapa, pn, temp_min, temp_max, fecha_ingreso, estado, corte, cosecha, clase, tipo_tabaco, arduino_asignado, direccion_sensor)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        await localDBConnection.query(insertQuery, [
          rowServer.id,
          rowServer.nombre,
          rowServer.variedad,
          rowServer.finca,
          rowServer.etapa,
          rowServer.pn,
          rowServer.temp_min,
          rowServer.temp_max,
          rowServer.fecha_ingreso,
          rowServer.estado,
          rowServer.corte,
          rowServer.cosecha,
          rowServer.clase,
          rowServer.tipo_tabaco,
          rowServer.arduino_asignado,
          rowServer.direccion_sensor
        ]);



        
        }
      }
    



    console.log('Base de datos de pilones actualizada correctamente.');
    response.json({ success: true, message: 'Base de datos actualizada correctamente.' });
  } catch (error) {
    console.error('Error durante la actualización:', error);
    response.status(500).json({ success: false, message: 'Error durante la actualización.' });
  } finally {
    await serverDBConnection.end();
    await localDBConnection.end();
  }
}

// Función para verificar la conexión a la base de datos del servidor
async function verificarConexion(connection) {
  try {
    await connection.query('SELECT 1');
  } catch (error) {
    console.error('Error de conexión a la base de datos del servidor:', error);
    throw new Error('No se puede conectar a la base de datos del servidor.');
  }
}



















































// Conexión a la base de datos local
async function conectarLocalDB() {
  return await mysql.createPool(db);
}

// Conexión a la base de datos del servidor
async function conectarServerDB() {
  return await mysql.createPool(dbtwo);
}

// Ruta para manejar la solicitud del botón para actualizar desde local a servidor
app.post('/actualizar/local_a_servidor', async (req, res) => {
  try {
    // Llamar a la función para actualizar la base de datos
    await actualizarBaseDatosLocalAServidor(res);
  } catch (error) {
    console.error('Error en la actualización de la base de datos:', error);
    res.status(500).json({ message: 'Error en la actualización de la base de datos.' });
  }
});

// Función para actualizar la base de datos local a la del servidor
async function actualizarBaseDatosLocalAServidor(response) {
  const localDBConnection = await conectarLocalDB();

  try {
    const serverDBConnection = await conectarServerDB();

    try {
      await verificarConexion(serverDBConnection);

      // Actualización de la tabla 'temperaturas'
      const [localRows] = await localDBConnection.query('SELECT * FROM temperaturas');

      for (const localRow of localRows) {
        const [existingRow] = await serverDBConnection.query(
          'SELECT * FROM temperaturas WHERE fecha_lectura = ? AND hora_lectura = ?',
          [localRow.fecha_lectura, localRow.hora_lectura]
        );

        if (existingRow.length > 0) {
          // Si existe una coincidencia, actualiza los datos en la base de datos del servidor
          const updateQuery = `
            UPDATE temperaturas
            SET pilon_encargado = ?,
                unidad = ?,
                lectura = ?,
                modo_lectura = ?
            WHERE fecha_lectura = ? AND hora_lectura = ?
          `;
          const updateValues = [
            localRow.pilon_encargado,
            localRow.unidad,
            localRow.lectura,
            localRow.modo_lectura,
            localRow.fecha_lectura,
            localRow.hora_lectura
          ];

          await serverDBConnection.query(updateQuery, updateValues);
        } else {
          // Si no hay coincidencia, inserta un nuevo registro en la base de datos del servidor
          const insertQuery = `
            INSERT INTO temperaturas (pilon_encargado, fecha_lectura, hora_lectura, unidad, lectura, modo_lectura)
            VALUES (?, ?, ?, ?, ?, ?)
          `;
          const insertValues = [
            localRow.pilon_encargado,
            localRow.fecha_lectura,
            localRow.hora_lectura,
            localRow.unidad,
            localRow.lectura,
            localRow.modo_lectura
          ];

          await serverDBConnection.query(insertQuery, insertValues);
        }
      }

      // Actualización de la tabla 'humedad'
      const [localHumedadRows] = await localDBConnection.query('SELECT * FROM humedad');

      for (const localHumedadRow of localHumedadRows) {
        const [existingHumedadRow] = await serverDBConnection.query(
          'SELECT * FROM humedad WHERE fecha_lectura = ? AND hora_lectura = ?',
          [localHumedadRow.fecha_lectura, localHumedadRow.hora_lectura]
        );

        if (existingHumedadRow.length > 0) {
          // Si existe una coincidencia, actualiza los datos en la base de datos del servidor
          const updateHumedadQuery = `
            UPDATE humedad
            SET pilon_encargado = ?,
                lectura = ?
            WHERE fecha_lectura = ? AND hora_lectura = ?
          `;
          const updateHumedadValues = [
            localHumedadRow.pilon_encargado,
            localHumedadRow.lectura,
            localHumedadRow.fecha_lectura,
            localHumedadRow.hora_lectura
          ];

          await serverDBConnection.query(updateHumedadQuery, updateHumedadValues);
        } else {
          // Si no hay coincidencia, inserta un nuevo registro en la base de datos del servidor
          const insertHumedadQuery = `
            INSERT INTO humedad (pilon_encargado, fecha_lectura, hora_lectura, lectura)
            VALUES (?, ?, ?, ?)
          `;
          const insertHumedadValues = [
            localHumedadRow.pilon_encargado,
            localHumedadRow.fecha_lectura,
            localHumedadRow.hora_lectura,
            localHumedadRow.lectura
          ];

          await serverDBConnection.query(insertHumedadQuery, insertHumedadValues);
        }
      }

      console.log('Datos de las tablas actualizados en el servidor desde local.');
      response.json({ success: true, message: 'Datos de las tablas actualizados en el servidor desde local.' });
    } finally {
      await serverDBConnection.end();
    }
  } catch (error) {
    console.error('Error durante la actualización:', error);
    response.status(500).json({ success: false, message: 'Ocurrió  un error durante el envío de datos.' });
  } finally {
    await localDBConnection.end();
  }
}

// Función para verificar la conexión a la base de datos del servidor
async function verificarConexion(connection) {
  try {
    await connection.query('SELECT 1');
  } catch (error) {
    console.error('Error de conexión a la base de datos del servidor:', error);
    throw new Error('No se puede conectar a la base de datos del servidor.');
  }
}



























const nodemailer = require('nodemailer');



app.use(bodyParser.json());







app.post('/enviar-mensaje', async (req, res) => {
  try {
   
    const db = await mysql.createConnection({
      host: 'localhost',
      user: 'servidor',
      password: '123456',
      database: 'pilones_temps'
    });
    const [results] = await db.execute('SELECT correo FROM correos');
    const destinatarios = results.map(result => result.correo);
    console.log("Correos obtenidos de la base de datos:", destinatarios);


    const [resultslogin] = await db.execute('SELECT email, password FROM correo_login');

    const { email, password } = resultslogin[0];

    let transporter = nodemailer.createTransport({
      host: 'hub.nauen.davidoff.com',
      port: 25,
      secure: false,
      auth: {
        user: email,
     password:  password,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    console.log("Correo remitente: " + email);
    
    

    if (destinatarios.length === 0) {
      return res.status(400).json({ success: false, error: 'No hay destinatarios disponibles' });
    }

    const mensaje = req.body.mensaje;
    console.log("El mensaje es:", mensaje);


    const mailOptions = {
      from: email,
      subject: 'Asunto del correo',
      text: mensaje
    };


    for (const destinatario of destinatarios) {
      console.log("El correo fue enviado a:", destinatario);
      mailOptions.to = destinatario;

   
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error('Error al enviar el correo:', err);
        } else {
          console.log('Correo electrónico enviado a', destinatario);
        }
      });
    }

    res.status(200).json({ success: true, message: 'Correos electrónicos enviados' });
  } catch (error) {
    console.error('Error al enviar correos electrónicos:', error);
    res.status(500).json({ success: false, error: 'Error al enviar correos electrónicos' });
  }
});

































/*---------------------------
P U E R T O S - C O N F I G S
-----------------------------*/
// Puerto dev/ttyACM0

 const serverIP = "10.203.230.173";

// ---------------------------------------------------

// Start the server
http.listen(port, () => {
  console.log(`\nServer in http://localhost:${port}\n`);
});

