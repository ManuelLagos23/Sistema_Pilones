const express = require('express');
const router = express.Router();
const variedadController = require('../../controllers/variedadController');
const db = require('../config/database');



//Obtener la variedad para el select
router.get('/', async (req, res) => {
    try {
        const results = await variedadController.getAllVariedad();
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obtaining variedad registers' });
    }
});


// Variedad WHERE ID
router.get('/:variedadId', async (req, res) => {
    try {
        const variedadId = req.params.variedadId;
        const variedad = await variedadController.getVariedadById(variedadId);
        res.json(variedad);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching variedad', details: error.message });
    }
});


// Variedad UPDATE
router.put('/:variedadId', async (req, res) => {
    try {
        const variedadId = req.params.variedadId;
        const { codigo} = req.body;
        const { variedad} = req.body;
        const { descripcion} = req.body;

        await variedadController.updateVariedad(variedadId, codigo, variedad, descripcion);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating variedad', details: error.message});
    }
});

// Workers CREATE
router.post('/', async (req, res) => {
    try {
        const {codigo_variedad, nombre_variedad, descripcion_variedad} = req.body;
        const newVariedadId = await variedadController.createVariedad(codigo_variedad, nombre_variedad,  descripcion_variedad);

        res.status(201).json({ message: 'Variedad created', insertedId: newVariedadId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating worker', details: error.message });
    }
});



// Variedad DELETE
router.delete('/:variedadId', async (req, res) => {
    try {
        const variedadId = req.params.variedadId;
        const result = await variedadController.deleteVariedad(variedadId);
        res.json({ message: 'Variedad deleted', rowsAffected: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting variedad', details: error.message });
    }
});


module.exports = router;