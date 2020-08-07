const express = require('express');
const router = express.Router();
const customerController = require('../controller/customerController');

router.get('/', (req,res) =>{
    res.redirect('index.html');
});

router.get('/signin', (req, res)=>{
    res.redirect('signin.html')
});

router.get('/signup', (req, res)=>{
    res.redirect('signup.html')
});

router.post('/signup', customerController.signup);

router.get('/profile', customerController.profile);

module.exports = router;