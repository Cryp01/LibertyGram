const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', (req, res) =>{
    res.send('index.html');
});

router.get('/chat', (req,res) =>{
    res.redirect('chat.html');
});

router.get('/login', (req,res) =>{
    res.redirect('login.html');
});

router.get('/signup', (req,res) =>{
    res.redirect('signup.html');
});


module.exports = router;