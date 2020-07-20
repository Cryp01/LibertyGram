const express = require('express');
const app = express();
const routes = require('./routes/router');
const path = require('path');





//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}));

app.use('/', routes);


var server = app.listen(app.get('port'),() =>{
    console.log("listen port 3000");
});

const sk = require('socket.io');
const { Socket } = require('dgram');
const io = sk.listen(server);

//websocket
io.on('connection', (socket) =>{
  console.log('new connection', socket.id);
  socket.on('mensaje', (data)=>{
    console.log(data);
    io.sockets.emit('mensaje', data);
  })
})

