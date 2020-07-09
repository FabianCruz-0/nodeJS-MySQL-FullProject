//ruta para la autentificación del usuario.
const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');
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

router.get('/signin', (req,res) => {
res.render('auth/signin');
});

router.post('/signin', (req,res,next) => {
passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash:true
})(req,res,next)
});


router.get('/profile', isLoggedIn, (req,res) => {
    res.render('profile');
});

router.get('/logout', (req,res) => {
req.logOut();
res.redirect('/signin');
});

module.exports = router;