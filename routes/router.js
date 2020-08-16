const express = require('express');
const router = express.Router();
const customerController = require('../controller/customerController');
const { authenticate } = require('passport');
var passport = require('passport')
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

router.post('/signup', customerController.signup);

router.get('/profile', customerController.profile);

router.post('/signin',customerController.signin);

module.exports = router;
