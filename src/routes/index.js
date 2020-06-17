const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { //congifura la ruta raiz del servidor.
    res.send('Hello world');
})

module.exports = router;
