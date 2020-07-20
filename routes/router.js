const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', (req, res) =>{
    res.send('index.html');
});

router.get('/chat', (req,res) =>{
    res.redirect('chat.html');
});


module.exports = router;