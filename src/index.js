const express = require('express')
const morgan = require('morgan');
const exhbs = require('express-handlebars');
const path = require('path');

//Initializations

const app = express();

//Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views')) //se establece dónde está la carpeta views. __dirname es una cte de node que retorna la dirección del archivo actual.
//el método join concatena directorios, en este caso, "src/" + "views".

app.engine('.hbs', exhbs({ 
    defaultLayout:'main', //establece el layout main.
    layoutsDir: path.join(app.get('views'), 'layouts'), //busca la carpeta layouts donde están las vistas. views + layouts.
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs' //Opcion que dice la extensión que tendrán los archivos del handleBars.
}))

//Middlewares
app.use(morgan('dev')); //uso de morgan para ver peticiones HTTP al servidor

//Global Variables. Sección dedicada para variables disponibles en todas las vistas.

//Routes. Aquí se definen las acciones por rutas del navegador.
app.use(require('./routes/'));

//Public

//Starting the server. Para inicializar tienes que estar en la carpeta src y ejecutar: node index.js
app.listen(app.get('port'),  () =>{
    console.log('Server on port: ', app.get('port'));
});