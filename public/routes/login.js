const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const { User } = require('../config/db');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');


// Ruta para procesar el formulario de login
app.post('/api/login', (req, res) => {
  const { user, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [user, password], (err, results) => {
      if (err) {
          console.error('Error ejecutando la consulta:', err);
          return res.status(500).send('Error en el servidor');
      }

      if (results.length > 0) {
          res.status(200).send('Autenticación exitosa');
      } else {
          res.status(401).send('Nombre de usuario o contraseña incorrectos');
      }
  });
});


module.exports = router;