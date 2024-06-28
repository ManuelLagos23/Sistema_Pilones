const express = require('express');
const router = express.Router();
const correoController = require('../../controllers/correoController');
const db = require('../config/database');
const { composer_v1 } = require('googleapis');


router.get('/', async (req, res) => {
    try {
        const results = await correoController.getAllCorreos();
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obtaining sensores registers' });
    }
});

// Proceso WHERE ID
router.get('/:correoId', async (req, res) => {
    try {
        const correoId = req.params.correoId;
        const correo = await correoController.getCorreoById(correoId);
        res.json(correo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching correo', details: error.message });
    }
});


// Correo CREATE
router.post('/', async (req, res) => {
    try {
        const {correo_nombre, correo_cargo, correo} = req.body;


        console.log(correo_nombre + correo_cargo + correo);
        const newCorreoId = await correoController.createCorreo(correo_nombre, correo_cargo, correo);

        res.status(201).json({ message: 'Correo created', insertedId: newCorreoId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating correo', details: error.message });
    }
});



// Arduino's UPDATE
router.put('/:correoId', async (req, res) => {
    try {
        const correoId = req.params.correoId;
        const { nombre, cargo, correo} = req.body;

    await correoController.updateCorreo(correoId, nombre, cargo, correo);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating correo', details: error.message});
    }
});



// Proceso DELETE
router.delete('/:correoId', async (req, res) => {
    try {
        const correoId = req.params.correoId;
        const result = await correoController.deleteCorreo(correoId);
        res.json({ message: 'Correo deleted', rowsAffected: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting correo', details: error.message });
    }
});







module.exports = router;