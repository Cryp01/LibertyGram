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


const socketio = require('socket.io');
const io = socketio(server);

io.on('connection', function(socket){
  console.log('an user connect')
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});


