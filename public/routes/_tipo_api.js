const express = require('express');
const router = express.Router();
const tipoController = require('../../controllers/tipoController');
const db = require('../config/database');






//Obtener la variedad para el select
router.get('/', async (req, res) => {
    try {
        const results = await tipoController.getAllTipo();
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obtaining finca registers' });
    }
});



// Tipo WHERE ID
router.get('/:tipoId', async (req, res) => {
    try {
        const tipoId = req.params.tipoId;
        const tipo = await tipoController.getTipoById(tipoId);
        res.json(tipo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching tipo', details: error.message });
    }
});


// Tipo UPDATE
router.put('/:tipoId', async (req, res) => {
    try {
        const tipoId = req.params.tipoId;
        
        const { codigo} = req.body;
        const { tipo} = req.body;
        const { descripcion} = req.body;

        await tipoController.updateTipo(tipoId, codigo, tipo, descripcion);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating tipo', details: error.message});
    }
});


// Workers CREATE
router.post('/', async (req, res) => {
    try {
        const {codigo_tipo, nombre_tipo, descripcion_tipo} = req.body;
        const newTipoId = await tipoController.createTipo(codigo_tipo, nombre_tipo,  descripcion_tipo);

        res.status(201).json({ message: 'Tipo created', insertedId: newTipoId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error tipo worker', details: error.message });
    }
});


// Tipo DELETE
router.delete('/:tipoId', async (req, res) => {
    try {
        const tipoId = req.params.tipoId;
        const result = await tipoController.deleteTipo(tipoId);
        res.json({ message: 'Tipo deleted', rowsAffected: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting tipo', details: error.message });
    }
});

module.exports = router;