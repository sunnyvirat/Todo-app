var bodyParser = require('body-parser');
// var mongoose = require('mongoose');

//Connect to the database
// mongoose.connect('mongodb+srv://tester:Sunny@123@todo-b8oli.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
//
//
// //Create a schema - this is like a blueprint
// var todoSchema = new mongoose.Schema({
//   item: String
// });
//
// var Todo = mongoose.model('Todo', todoSchema);

// var data = [{item: 'get milk'}, {item: 'Watch TV'}, {item: 'Study Hard'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app,connection){

app.get('/todo', function(req, res){
  //get data from mongodb and pass it to view
  connection.query('SELECT * FROM todo', function(err,result,fields){
    if (err) throw err;
    res.render('todo', {todo: result});
  });
});

app.post('/todo', urlencodedParser, function(req, res){
  //get data from the view and add it to mongodb
  var newTodo = req.body.item;
  connection.query('INSERT INTO todo (todos) VALUES (?)',newTodo);
  connection.query('SELECT * FROM todo', function(err,result,fields){
    if (err) throw err;
    else
    res.json(result);
  });
  // res.redirect('/todo');
});

app.delete('/todo/:item', function(req, res){
  // delete the requested item from mongodb
  var del=req.params.item;
  connection.query('DELETE FROM todo WHERE todos = ?',del);
  connection.query('SELECT * FROM todo',function(err,result,fields){
    if (err) throw err;
    res.send(result);
  });

});

};
