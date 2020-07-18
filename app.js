const express = require('express');
const app = express();

const routes = require('./routes/router');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
// const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

// Connect to mongodb

const { url } = require('config/database');

mongoose.connect(url,{useMongoClient:true});

require('config/passport')(passport);

//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}));

app.use('/', routes);



// middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: "libertygram",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//routes

require('routes/router')(app,passport);

//static files

app.use(express.static(path.join(__dirname,'public')));

app.listen(app.get('port'),() =>{
    console.log('server on port',app.get('port'));
});



