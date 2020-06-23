//este archivo ayuda con funciones para la vista.

//se importa el 'format'
const {format} = require('timeago.js');


//objeto que se utiliza por las vistas de handlebars.
const helpers = {}; 
helpers.timeago = (timestamp) =>{ //se declara una funcion que recibe un timestamp y se pasa a timeago.
   return format(timestamp);
};
module.exports = helpers;