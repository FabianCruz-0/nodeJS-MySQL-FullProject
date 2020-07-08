// funciones para ayuda.
const bcrypt = require('bcryptjs');
//bcryptjs
const helpers = { };

helpers.encryptPass = async (password) => {
const salt = await bcrypt.genSalt(10); //funcion que genera un hash. recibe de parametro el numero de ejecuciones (más, más seguro pero lento);

//metodo que cifra la contraseña.
const passCrypted = await bcrypt.hash(password,salt);
return passCrypted;
};

helpers.matchPass = async (password,savedPassword) => {
try{
    return await bcrypt.compare(password,savedPassword);
}catch(e){
    console.log(e); //también se puede usar req.flash.
}
}


module.exports = helpers;