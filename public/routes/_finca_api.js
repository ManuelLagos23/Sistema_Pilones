const express = require('express');
const router = express.Router();
const fincaController = require('../../controllers/fincaController');
const db = require('../config/database');


//Obtener la variedad para el select
router.get('/', async (req, res) => {
    try {
        const results = await fincaController.getAllFinca();
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obtaining finca registers' });
    }
});

// Finca WHERE ID
router.get('/:fincaId', async (req, res) => {
    try {
        const fincaId = req.params.fincaId;
        const finca = await fincaController.getFincaById(fincaId);
        res.json(finca);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching finca', details: error.message });
    }
});


// Finca UPDATE
router.put('/:fincaId', async (req, res) => {
    try {
        const fincaId = req.params.fincaId;
        
        const { codigo} = req.body;
        const { finca} = req.body;
        const { descripcion} = req.body;

        await fincaController.updateFinca(fincaId, codigo, finca, descripcion);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating finca', details: error.message});
    }
});



// Workers CREATE
router.post('/', async (req, res) => {
    try {
        const {codigo_finca, nombre_finca, descripcion_finca} = req.body;
        const newFincaId = await fincaController.createFinca(codigo_finca, nombre_finca,  descripcion_finca);

        res.status(201).json({ message: 'Finca created', insertedId: newFincaId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating worker', details: error.message });
    }
});



// Finca DELETE
router.delete('/:fincaId', async (req, res) => {
    try {
        const fincaId = req.params.fincaId;
        const result = await fincaController.deleteFinca(fincaId);
        res.json({ message: 'Finca deleted', rowsAffected: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting finca', details: error.message });
    }
});

module.exports = router;