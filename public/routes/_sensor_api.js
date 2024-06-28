const express = require('express');
const router = express.Router();
const sensorController = require('../../controllers/sensorController');
const db = require('../config/database');






//Obtener la variedad para el select
router.get('/', async (req, res) => {
    try {
        const results = await sensorController.getAllSensores();
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obtaining sensores registers' });
    }
});








// Sensor CREATE
router.post('/', async (req, res) => {
    try {
        const { nombre_sensor, direccion_sensor, arduino_asignado} = req.body;
        const newSensorId = await sensorController.createSensor(nombre_sensor, direccion_sensor,  arduino_asignado);

        res.status(201).json({ message: 'Sensor created', insertedId: newSensorId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating sensor', details: error.message });
    }
});


module.exports = router;