const express = require('express');
const router = express.Router();
const claseController = require('../../controllers/claseController');
const db = require('../config/database');


//Obtener la variedad para el select
router.get('/', async (req, res) => {
    try {
        const results = await claseController.getAllClase();
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obtaining class registers' });
    }
});

// clase WHERE ID
router.get('/:claseId', async (req, res) => {
    try {
        const claseId = req.params.claseId;
        const clase = await claseController.getClaseById(claseId);
        res.json(clase);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching clase', details: error.message });
    }
});



// Clase UPDATE
router.put('/:claseId', async (req, res) => {
    try {
        const claseId = req.params.claseId;
        
        const { codigo} = req.body;
        const { clase} = req.body;
        const { descripcion} = req.body;

        await claseController.updateClase(claseId, codigo, clase, descripcion);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating clase', details: error.message});
    }
});


// Workers CREATE
router.post('/', async (req, res) => {
    try {
        const {codigo_clase, nombre_clase, descripcion_clase} = req.body;
        const newClaseId = await claseController.createClase(codigo_clase, nombre_clase,  descripcion_clase);

        res.status(201).json({ message: 'Clase created', insertedId: newClaseId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating worker', details: error.message });
    }
});


// Finca DELETE
router.delete('/:claseId', async (req, res) => {
    try {
        const claseId = req.params.claseId;
        const result = await claseController.deleteClase(claseId);
        res.json({ message: 'Clase deleted', rowsAffected: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting clase', details: error.message });
    }
});




module.exports = router;