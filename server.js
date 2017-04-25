var express 			= require('express');
var port				= 3000;
var app 				= express();
var todoController		= require('./controllers/todoController');

app.set('view engine', 'ejs');

todoController(app);

// Static Folders
app.use('/fa', express.static(__dirname + '/node_modules/font-awesome/'));

// routes
app.get("/", function(req, res){
	res.render('welcome');
});

app.listen(port, function(){
	console.log("Server is running on " + port);
});