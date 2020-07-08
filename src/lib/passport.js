const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//passport permite autenticaciones con redes sociales.

const pool = require('../database');
const helpers = require('../lib/helpers')
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
    //uso del encriptamiento de contraseña.
    newUser.password = await helpers.encryptPass(password);

    const result = await pool.query('INSERT INTO user SET ?', [newUser]);
    
    //console.log(result);
    newUser.id = result.insertId;

    //EJECUTAR EL Método done(Error(ninguno), user(para almacenarlo en sesion));
    //esto ejecutará la parte del codigo de authentication.js donde se valida si 
    //el signup fué correcto o no.

    return done(null,newUser);
}

));

//******ES NECESARIO SERIALIZAR Y DESERIALIZAR EL USARIO.
// Es para guardar el usuario dentro de la sesión del cliente.
passport.serializeUser((user,done) => {
done(null,user.id);
});

//CUANDO SERIALIZO ESTOY GUARDANDO EL ID DEL USUARIO
//CUANDO DESERIALIZO ESTOY TOMANDO EL ID ALMACENAODO PARA TOMAR LOS DATOS.

passport.deserializeUser(async (id,done) => {
const rows = await pool.query('SELECT * FROM user WHERE id = ?', [id]);
done(null, rows[0]);
});