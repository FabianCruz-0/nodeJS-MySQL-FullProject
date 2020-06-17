const express = require('express')
const morgan = require('morgan');
const exhbs = require('express-handlebars');
const path = require('path');

//Initializations

const app = express();

//Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views')) //__dirname es una cte de node que retorna la dirección del archivo actual.
//el método join concatena directorios.

app.engine('.hbs', exhbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
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