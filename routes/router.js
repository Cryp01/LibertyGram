const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', (req, res) =>{
    res.send('index.html');
});

router.get('/chat', (req,res) =>{
    res.redirect('chat.html');
});
router.get('/video', (req,res) =>{
    res.redirect('video.html');
});


module.exports = router;