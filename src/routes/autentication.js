//ruta para la autentificación del usuario.
const express = require('express');
const router = express.Router();

//manejador de petición.
router.get('/signup', (req,res) => {
res.render('auth/signup');
});

router.post('/signup', (req,res) => {

});

module.exports = router;