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

app.listen(app.get('port'),() =>{

});


