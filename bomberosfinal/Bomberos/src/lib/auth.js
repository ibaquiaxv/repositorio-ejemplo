module.exports = {
    isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        return res.redirect('/signin');
    },
    isNotLoggedIn(req, res, next){
        if(!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/profile');
    },

    admin(req, res, next){
        if(req.user.Tipo_usuario){
            return next();
        }
        return res.redirect('/profile');
    }


};