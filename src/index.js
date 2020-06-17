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
app.use(morgan('dev'));

//Global Variables

//Routes
app.use(require('./routes/'));
//Public

//Starting the server
app.listen(app.get('port'),  () =>{
    console.log('Server on port: ', app.get('port'));
})