const express = require('express');
const router = express.Router();
const customerController = require('../controller/customerController');
const passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

router.get('/', (req,res) =>{
    res.redirect('index.html');
});

router.get('/signin', (req, res)=>{
    res.render('signin');
});

router.get('/signup', (req, res)=>{
    res.redirect('signup.html')
});

router.get('/profile', (req, res)=>{
    res.render("profile")
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/signup' }));

router.get('/auth/facebook',
  passport.authenticate('facebook', { scope: 'read_stream' })
);

router.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['read_stream', 'publish_actions'] })
);

router.post('/signup', customerController.signup);

router.get('/profile', customerController.profile);

router.post('/signin',customerController.signin);

module.exports = router;
