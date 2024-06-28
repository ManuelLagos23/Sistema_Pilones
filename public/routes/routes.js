// routes.js
const express = require('express');
const router = express.Router();
const arduinosAPI = require('./_arduinos_api');
const pilonesAPI = require('./_pilones_api');
const pilonesTaskAPI = require('./_pilones_task_api');
const workerAPI = require('./_worker_api');
const variedadAPI = require('./_variedad_api');
const corteAPI = require('./_corte_api');
const claseAPI = require('./_clase_api');
const fincaAPI = require('./_finca_api');
const etapaAPI = require('./_etapa_api');
const tipoAPI = require('./_tipo_api');
const sensorAPI = require('./_sensor_api');
const correoAPI = require('./_correo_api');
const loginAPI = require('./_login_api');
const reporteAPI = require('./_reporte_api');
const temperaturesAPI = require('./_temperatures_api');
const humiditiesAPI = require('./_humidities_api');
const procesoAPI = require('./_proceso_api');




router.get('/', (req, res) => {
    res.render('Login/Login', { currentUrl: req.originalUrl });
});




function requireAuth(req, res, next) {
    
    if (req.session && req.session.user) {
      next();
    } else {
      res.redirect('/');
    }
  }
  

    router.get('/home', requireAuth, (req, res) => {
      res.render('home/home', { currentUrl: req.originalUrl });
    });
  








router.get('/individual_arduino', requireAuth, (req, res) => {
    res.render('home/individual_home', { currentUrl: req.originalUrl });
});


router.get('/language_change', requireAuth,  (req, res) => {
    res.render('language/language_change', { currentUrl: req.originalUrl });
});


router.get('/respaldo_datos', requireAuth, (req, res) => {
    res.render('language/copia_datos', { currentUrl: req.originalUrl });
});

router.get('/alerta_temperatura',requireAuth,  (req, res) => {
    res.render('language/alerta_temperatura', { currentUrl: req.originalUrl });
});





router.get('/enviar_datos',requireAuth,  (req, res) => {
    res.render('language/enviar_datos', { currentUrl: req.originalUrl });
});


router.get('/crear_pilones',requireAuth,  (req, res) => {
    res.render('formulario/_formulario_pilones', { currentUrl: req.originalUrl });
});



router.get('/reporte_pilones', requireAuth, (req, res) => {
    res.render('lists/reporte_list', { currentUrl: req.originalUrl });
});





router.get('/login', requireAuth,  (req, res) => {
    res.render('Login/Login', { currentUrl: req.originalUrl });
});



router.get('/crear_users',requireAuth,  (req, res) => {
    res.render('Login/_formulario_user', { currentUrl: req.originalUrl });
});

router.get('/pilones_list', requireAuth,  async (req, res) => {
    res.render('lists/pilones_list', { currentUrl: req.originalUrl });
});


//RUTAS PARA LAS VISTAS DE LOS DATOS MAESTROS
router.get('/variedad_list',requireAuth,  async (req, res) => {
    res.render('listas/variedad', { currentUrl: req.originalUrl });
});


router.get('/corte_list',requireAuth,  async (req, res) => {
    res.render('listas/corte', { currentUrl: req.originalUrl });
});



router.get('/clase_list', requireAuth,  async (req, res) => {
    res.render('listas/clase', { currentUrl: req.originalUrl });
});

router.get('/finca_list', requireAuth,  async (req, res) => {
    res.render('listas/finca', { currentUrl: req.originalUrl });
});

router.get('/etapa_list', requireAuth,  async (req, res) => {
    res.render('listas/etapa', { currentUrl: req.originalUrl });
});

router.get('/tipo_list', requireAuth,  async (req, res) => {
    res.render('listas/tipo', { currentUrl: req.originalUrl });
});


router.get('/proceso_list', requireAuth,  async (req, res) => {
    res.render('listas/proceso', { currentUrl: req.originalUrl });
});










router.get('/tasks_list', requireAuth,  async (req, res) => {
    res.render('tasks/pilones_tasks_list', { currentUrl: req.originalUrl });
});

router.get('/arduino_list', requireAuth,  async (req, res) => {
    res.render('lists/arduino_list', { currentUrl: req.originalUrl });
});


router.get('/sensores_list',requireAuth,  async (req, res) => {
    res.render('lists/sensores_list', { currentUrl: req.originalUrl });
});


router.get('/worker_list', requireAuth,  async (req, res) => {
    res.render('lists/worker_list', { currentUrl: req.originalUrl });
});


router.get('/tablas_list', requireAuth,  async (req, res) => {
    res.render('tablas/tablas_list', { currentUrl: req.originalUrl });
});


router.get('/temp_history', requireAuth,  (req, res) => {
    res.render('history/temp_history', { currentUrl: req.originalUrl });
});

router.get('/temperature_graphics_history', requireAuth,  (req, res) => {
    res.render('graphics/temp_graphics', { currentUrl: req.originalUrl });
});

router.get('/humidity_graphics_history', requireAuth,  (req, res) => {
    res.render('graphics/hum_graphics', { currentUrl: req.originalUrl });
});

router.get('/hum_history', requireAuth, (req, res) => {
    res.render('history/humidity_history', { currentUrl: req.originalUrl });
});

router.get('/not_implement_yet', requireAuth, (req, res) => {
    res.render('faqs/not_implement_yet', { currentUrl: req.originalUrl });
});

// API routes
router.use('/api/arduinos', arduinosAPI);
router.use('/api/pilones', pilonesAPI);
router.use('/api/pilones_task', pilonesTaskAPI);
router.use('/api/workers', workerAPI);
router.use('/api/variedad', variedadAPI);
router.use('/api/corte', corteAPI);
router.use('/api/clase', claseAPI);
router.use('/api/finca', fincaAPI);
router.use('/api/etapa', etapaAPI);
router.use('/api/tipo', tipoAPI);
router.use('/api/sensor', sensorAPI);
router.use('/api/correo', correoAPI);
router.use('/api/login', loginAPI);
router.use('/api/reporte', reporteAPI);


router.use('/api/temperatures', temperaturesAPI);
router.use('/api/humidities', humiditiesAPI);
router.use('/api/proceso', procesoAPI);

router.use('/api/pilones_task', pilonesTaskAPI);

// POST routes
router.post('/api/arduinos/arduino_list', arduinosAPI);
router.post('/api/temperatures/save_temp', temperaturesAPI);
router.post('/api/humidities/save_hum', humiditiesAPI);
router.post('/api/humidities/save_hum', humiditiesAPI);
module.exports = router;
