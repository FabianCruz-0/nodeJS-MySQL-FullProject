const express = require('express')
const morgan = require('morgan');
const exhbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport'); //se importa para poder ejecutar su codigo principal.
const {database } = require('./keys');

//Initializations
const app = express();
require('./lib/passport');

//Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views')) //se establece dónde está la carpeta views. __dirname es una cte de node que retorna la dirección del archivo actual.
//el método join concatena directorios, en este caso, "src/" + "views".


app.engine('.hbs', exhbs({ 
    defaultLayout:'main', //establece el layout main.
    layoutsDir: path.join(app.get('views'), 'layouts'), //busca la carpeta layouts donde están las vistas. views + layouts.
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs', //Opcion que dice la extensión que tendrán los archivos del handleBars.
    helpers: require('./lib/handlebars') //estamos definiendo las funciones de ayuda del handlebars.
}))
app.set('view engine', '.hbs'); //linea para utilizar el motor, y el nombre del motor.


//Middlewares

//Se crea las seciones.
app.use(session({
    secret: 'fabian',
    resave: false,
    saveUninitialized:false,
    store: new MySQLStore(database)
}));


app.use(flash()); //Uso de connect-flash para enviar mensajes a traves de las vistas.
app.use(morgan('dev')); //uso de morgan para ver peticiones HTTP al servidor
app.use(express.urlencoded({extended: false })); //metodo que recibe los datos desde los forumarios. el extended es para datos ssencillos, no imágenes ni datos complejos.
app.use(express.json()); //esto es para si en un futuro se decide trabajar con archivos JSON.
app.use(passport.initialize());
app.use(passport.session());

//Global Variables. 
//Sección dedicada para variables disponibles en todas las vistas.
app.use((req,res,next) => { //Funcion que toma la peticion del usuario, la respuesta del server y la función continua con el resto del código, para que no se quede atascado.
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
})


//Routes. Aquí se definen las acciones por rutas del navegador.
app.use(require('./routes/'));
app.use(require('./routes/autentication')); //se configura el router para autentication.js
app.use('/links',require('./routes/links')); //se configura el router para links.js con el precedente de Links para los futuros metodos HTTP.


//Public. Configuracion de la carpeta pública.
app.use(express.static(path.join(__dirname, 'public')));


//Starting the server. Para inicializar tienes que estar en la carpeta src y ejecutar: node index.js
app.listen(app.get('port'),  () =>{
    console.log('Server on port: ', app.get('port'));
});