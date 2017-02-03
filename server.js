var express= require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname));

mongoose.connect('mongodb://sashikodi:omsai28@ds151927.mlab.com:51927/whitebox');
var db= mongoose.connection;
db.on('error', function(){
   console.log('Error trying to connect to Mongo DB databased'); 
});

db.once('open', function(){
    console.log('database connection has been established');
});

app.use('/', require('./routes'));
app.listen(3000);
console.log('Server is listening at port 3000');