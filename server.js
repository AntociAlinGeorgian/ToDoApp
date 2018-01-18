//SETUP ========================================================================

var express = require('express');
var app = express();                          //create app with express
var mongoose = require('mongoose');           //mongoose for mongodb
var port = process.env.PORT || 3000;          //set the PORT
var database = require('./config/database');  //load the db config
var morgan = require('morgan');               //log every request to the console
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//CONFIGURATION ================================================================

mongoose.connect(database.localUrl);          //connect to local mongodb instance

app.use(express.static('./public'));          //set the static files location
app.use(morgan('dev'));                       //log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

//ROUTES =======================================================================

require('./app/routes/routes.js')(app);

//START THE SERVER =============================================================

app.listen(port, function(){
  console.log('Server started on '+port);
});
