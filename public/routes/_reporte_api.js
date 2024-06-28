const express = require('express');
const router = express.Router();
const reporteController = require('../../controllers/reporteController');
const db = require('../config/database');



router.get('/', async (req, res) => {
    try {
        const reporte = await reporteController.getAllReporte();
        res.json(reporte);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obtaining reporte registers' });
    }
});









module.exports = router;
