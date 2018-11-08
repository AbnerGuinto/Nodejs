const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/registrar', (req, res, next) => {
    res.render('registrar');
});

router.post('/registrar', passport.authenticate('local-registrar', {
    successRedirect: '/perfil',
    failureRedirect: '/registrar',
    passReqToCallback: true
}));

router.get('/login', (req, res, next) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/perfil',
    failureRedirect: '/login',
    passReqToCallback: true
}));

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

router.get('/perfil',isAuthenticated, (req, res, next) => {
    res.render('perfil');
});

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
  
    res.redirect('/')
  }

module.exports = router;