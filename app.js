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
let users = [];

io.on('connection', (socket) =>{
  users.push(socket.id);
  console.log(users);
  socket.on('mensaje', (data)=>{
    console.log(data);
    io.sockets.emit('mensaje', data);
  })
  socket.on('conectado',(data)=>{
    console.log(data.id);
    io.sockets.emit('conectado',data,users);

  })
  socket.on('disconnect', () => {
    io.sockets.emit('desconectado',socket.id);
    
  
    for(var i = 0;i < users.length; i++){
      if(users[i] === socket.id){
        users.pop(i);
      }
    }
    
  });
   
  })

