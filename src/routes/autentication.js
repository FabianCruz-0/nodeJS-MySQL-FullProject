//ruta para la autentificación del usuario.
const express = require('express');
const router = express.Router();

const passport = require('passport');

//manejador de petición.
router.get('/signup', (req,res) => {
res.render('auth/signup');
});

/*-------------UNA MANERA DE CONFIG 
router.post('/signup', (req,res) => {
//console.log(req.body);

    passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    });

});
*/

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/profile', (req,res) => {
    res.send('profile');
})

module.exports = router;