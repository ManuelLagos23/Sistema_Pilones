const express = require('express');
const router = express.Router();
const corteController = require('../../controllers/corteController');
const db = require('../config/database');



//Obtener el corte para el select
router.get('/', async (req, res) => {
    try {
        const results = await corteController.getAllCorte();
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obtaining worker registers' });
    }
});

// corte WHERE ID
router.get('/:corteId', async (req, res) => {
    try {
        const corteId = req.params.corteId;
        const corte = await corteController.getCorteById(corteId);
        res.json(corte);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching corte', details: error.message });
    }
});


// Corte UPDATE
router.put('/:corteId', async (req, res) => {
    try {
        const corteId = req.params.corteId;
        console.log(corteId);
        const { codigo} = req.body;
        const { corte} = req.body;
        const { descripcion} = req.body;

        await corteController.updateCorte(corteId, codigo, corte, descripcion);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating corte', details: error.message});
    }
});




// Workers CREATE
router.post('/', async (req, res) => {
    try {
        const {codigo_corte, nombre_corte, descripcion_corte} = req.body;
        const newCorteId = await corteController.createCorte(codigo_corte, nombre_corte,  descripcion_corte);

        res.status(201).json({ message: 'Corte created', insertedId: newCorteId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating worker', details: error.message });
    }
});


// Corte DELETE
router.delete('/:corteId', async (req, res) => {
    try {
        const corteId = req.params.corteId;
        const result = await corteController.deleteCorte(corteId);
        res.json({ message: 'Corte deleted', rowsAffected: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting corte', details: error.message });
    }
});




module.exports = router;