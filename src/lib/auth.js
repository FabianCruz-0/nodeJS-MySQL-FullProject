module.exports = {
isLoggedIn(req, res, next) {
if ( req.isAuthenticated()){ //si existe sesión del usuario
    return next();
} else {
    return res.redirect('/signin');
}
},
isNotLoggedIn(req,res,next){
    if(!req.isAuthenticated())
    {
        return next();
    }else {
        return res.redirect('/profile');
    }
}
};