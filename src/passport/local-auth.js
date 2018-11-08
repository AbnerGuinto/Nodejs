const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
   const user = await User.findById(id);
   done(null, user);
});

passport.use('local-registrar', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {
    const user = await User.findOne({email: email});
    if(user){
        return done(null, false, req.flash('registroMensaje', 'El email ya existe!'));
    } else {
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();
        done(null, newUser);
    }
}));

passport.use('local-login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({email: email});
    if(!user){
        done(null, false, req.flash('loginMensaje', 'El correo no se encuentra registrado'));
    } 
    if(!user.compararPassword(password)){
        done(null, false, req.flash('loginMensaje', 'password incorrecto'));
    }
    done(null, user);
})); 