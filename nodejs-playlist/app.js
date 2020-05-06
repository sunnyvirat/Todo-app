var express = require('express');
var mysql = require('mysql');
var todoController = require('./controllers/todoController.js');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '30Jan1998#',
  database : 'adi'
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
var app = express();

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controllers
todoController(app,connection);


// listen to port
app.listen('3000');
console.log('Listening to port 3000');
