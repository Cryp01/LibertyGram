const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');

module.exports = (app, passport) => {

    app.get('/', (req, res) =>{
        res.render('../views/index.html');
    });
    
    app.get('/login', (req, res) =>{
        res.render('../views/login.html', {
            message: req.flash('loginMessage')
        });

    });
    
    app.post('/login', passport.authenticate('local-login', {
        sucessRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/signup', (req, res) =>{
        res.render('../views/signup.html',{
            message: req.flash('signupMessage')
        });
    });
    
    app.post('/signup', passport.authenticate('local-signup', {
        sucessRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/profile', (req, res) => {
        res.render('../views/profile.html', {
            user: req.user
        });
    });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

};

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}



// module.exports = router;