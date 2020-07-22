const express = require('express');
const app = express();

const path = require('path');
const mongoose = require('mongoose');

const passport = require('passport');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

//database
const {url} = require('./config/database');
mongoose.connect(url,{
useNewUrlParser: true,
useUnifiedTopology:true
});

require('./config/passport')(passport);

//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

//middleware
app.use(morgan('dev'));
app.use(cookie());
app.use(session({
  'secret': 'Mugiwara',
  resave: false,
  saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


require('./routes/router')(app,passport,flash);

var server = app.listen(app.get('port'),() =>{
    console.log("listen port 3000");
});


//socket io
const sk = require('socket.io');
const { Socket } = require('dgram');
const cookieParser = require('cookie-parser');
const io = sk.listen(server);


//websocket
let users = [];
io.on('connection', (socket) =>{
  users.push(socket.id);
 
  socket.on('mensaje', (data)=>{
    
    io.sockets.emit('mensaje', data);
  })
  socket.on('conectado',(data)=>{

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

