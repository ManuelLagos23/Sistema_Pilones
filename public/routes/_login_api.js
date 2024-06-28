const express = require('express');
const router = express.Router();
const CorreoLoginController = require('../../controllers/CorreoLoginController');
const db = require('../config/database');



router.get('/', async (req, res) => {
    try {
        const login = await CorreoLoginController.getAllLogin();
        res.json(login);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obtaining arduino registers' });
    }
});



router.put('/', async (req, res) => {
    try {
      
        const { id, email, password} = req.body;

        await CorreoLoginController. updateOrCreateLogin(id, email, password);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating correo', details: error.message});
    }
});





module.exports = router;
