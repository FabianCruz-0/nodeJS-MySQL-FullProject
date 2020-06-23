const mysql = require('mysql');
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

module.exports = pool; //solo se exporta esto por que esto es donde se está haciendo la conexion.