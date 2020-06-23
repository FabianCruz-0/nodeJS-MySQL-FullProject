//ruta para almacenar los enlaces.
const express = require('express');
const router = express.Router();

const pool = require('../database'); //importacion de la bd.

router.get('/add', (req,res) => {
    //res.send('form'); escribe 'Form' en el html.
    res.render('links/add');
});

router.post('/add', (req,res) => {
    res.send('received');
})

module.exports = router;