//ruta para almacenar los enlaces.
const express = require('express');
const router = express.Router();

const pool = require('../database'); //importacion de la bd.

router.get('/add', (req,res) => {
    res.send('form');
}) 

module.exports = router;