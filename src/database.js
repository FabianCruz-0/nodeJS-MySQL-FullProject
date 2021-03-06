const mysql = require('mysql');
//destructuring el objeto del modulo util.
const { promisify } = require('util');

/*CON EL MODULO DE MYSQL SE TIENEN QUE USAR CALL-BACKS, ESTE MODULO NO SOPORTA PROMISES NI POR LO TANTO ASYNC, AWAIT.
    NodeJS tiene un modulo que permite el soporte de call backs hacia promesas, llamado -promisify-
*/ 

//destructuring el objeto del archivo de keys.
const { database } = require('./keys'); //se trae solamente el valor 'database' del archivo 'keys'

/*createPool es un método más cercano al entorno de produccion a diferencia de createConnection
Genera algo similar a "hilos" que se ejecutan simultaneamente, ejecutándose a la vez.
*/
const pool = mysql.createPool(database);
pool.getConnection((err,connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE ONNECTION WAS CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TOO MANY CONNECTIONS');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    if(connection) connection.release();
    console.log('DB is Connected');
    return;
});

pool.query = promisify(pool.query) //cada que se quiera hacer una consulta a la bd se va a poder utilizar promesas o async await.

module.exports = pool; //solo se exporta esto por que esto es donde se está haciendo la conexion.