const express = require('express');
const router = express.Router();
const procesoController = require('../../controllers/procesoController');
const db = require('../config/database');


//Obtener la variedad para el select
router.get('/', async (req, res) => {
    try {
        const results = await procesoController.getAllProceso();
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obtaining procesos registers' });
    }
});



// Proceso WHERE ID
router.get('/:procesoId', async (req, res) => {
    try {
        const procesoId = req.params.procesoId;
        const proceso = await procesoController.getProcesoById(procesoId);
        res.json(proceso);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching proceso', details: error.message });
    }
});


// Proceso UPDATE
router.put('/:procesoId', async (req, res) => {
    try {
        const procesoId = req.params.procesoId;
        
        const { codigo} = req.body;
        const { proceso} = req.body;
        const { descripcion} = req.body;
        const { proceso_actualizado} = req.body;


        await procesoController.updateProceso(procesoId, codigo, proceso, descripcion, proceso_actualizado);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating proceso', details: error.message});
    }
});


router.post('/', async (req, res) => {
    try {
        const {codigo_proceso, nombre_proceso, descripcion_proceso, proceso_dashboard} = req.body;
        const newProcesoId = await procesoController.createProceso(codigo_proceso, nombre_proceso,  descripcion_proceso, proceso_dashboard );

        res.status(201).json({ message: 'Proceso created', insertedId: newProcesoId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating Proceso', details: error.message });
    }
});


// Proceso DELETE
router.delete('/:procesoId', async (req, res) => {
    try {
        const procesoId = req.params.procesoId;
        const result = await procesoController.deleteProceso(procesoId);
        res.json({ message: 'Proceso deleted', rowsAffected: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting proceso', details: error.message });
    }
});



module.exports = router;
