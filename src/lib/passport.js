const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//passport permite autenticaciones con redes sociales.

const pool = require('../database');

passport.use('local.signup', new LocalStrategy({
//Aqui colocamos lo que recibamos del signup.
    usernameField: 'username',
    passwordField: 'password',

    passReqToCallback: true
    /*despues del objeto de configuración se define que es lo que
    va a hacer al momento de la autenticación.
    */
},
//esto es un callback, una función que se ejecuta despues de LocalStrategy.
//recibe algunos parámetros que asi mismo recibe el callback "done".
 async ( req, username, password, done) => {
     const {fullname} = req.body;
    const newUser = {
        username,
        password,
        fullname
    };
    await pool.query('INSERT INTO users SET ?', [newUser]);
    //console.log(req.body);

}

));

//******ES NECESARIO SERIALIZAR Y DESERIALIZAR EL USARIO.

/*passport.serializeUser((user,done) => {

});
*/