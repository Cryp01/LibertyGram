const express = require('express');
const router = express.Router();
const routes = require('../controller/customerController');

router.get('/', (req,res) =>{
    res.redirect('index.html');
});

router.get('/signin', (req, res)=>{
    res.redirect('signin.html')
});

router.get('/signup', (req, res)=>{
    res.redirect('signup.html')
});

module.exports = router;