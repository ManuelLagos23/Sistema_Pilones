const express = require('express');
const router = express.Router();
const etapaController = require('../../controllers/etapaController');
const db = require('../config/database');



//Obtener la variedad para el select
router.get('/', async (req, res) => {
    try {
        const results = await etapaController.getAllEtapa();
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obtaining finca registers' });
    }
});



// Etapa WHERE ID
router.get('/:etapaId', async (req, res) => {
    try {
        const etapaId = req.params.etapaId;
        const etapa = await etapaController.getEtapaById(etapaId);
        res.json(etapa);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching etapa', details: error.message });
    }
});


// Etapa UPDATE
router.put('/:etapaId', async (req, res) => {
    try {
        const etapaId = req.params.etapaId;
        
        const { codigo} = req.body;
        const { etapa} = req.body;
        const { descripcion} = req.body;

        await etapaController.updateEtapa(etapaId, codigo, etapa, descripcion);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating etapa', details: error.message});
    }
});


// Etapas CREATE
router.post('/', async (req, res) => {
    try {
        const {codigo_etapa, nombre_etapa, descripcion_etapa} = req.body;
        const newEtapaId = await etapaController.createEtapa(codigo_etapa, nombre_etapa,  descripcion_etapa);

        res.status(201).json({ message: 'Finca created', insertedId: newEtapaId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating worker', details: error.message });
    }
});


// Etapa DELETE
router.delete('/:etapaId', async (req, res) => {
    try {
        const etapaId = req.params.etapaId;
        const result = await etapaController.deleteEtapa(etapaId);
        res.json({ message: 'Etapa deleted', rowsAffected: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting etapa', details: error.message });
    }
});

module.exports = router;