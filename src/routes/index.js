//Ruta raíz, index controlador.

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { //congifura la ruta raiz del servidor.
    res.render('index');
})

module.exports = router;
