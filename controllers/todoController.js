var mongojs             = require('mongojs');
var bodyParser          = require('body-parser');
var db 		            = mongojs('mongodb://root:onur1896@ds161890.mlab.com:61890/tododb', ['tasks']);
var urlencodedParser 	= bodyParser.urlencoded({extended : false});

module.exports = function(app){
    // welcome screen
    app.get("/", function(req, res){
    	res.render('welcome');
    });

    // select types
    app.get("/groups", function(req, res){
    	res.render('groups');
    });

    // get todos
    app.get('/tasks/', function(req, res){
        db.tasks.find(function(err, tasks){
    		if(err){
    			res.send(err);
    		}
            res.render('tasks', {todos: tasks});
            //console.log(tasks);
    	});
    });

    // new todo
    app.post('/tasks', urlencodedParser, function(req, res){
        console.log(req.body);
        var task = req.body;
    	if(!task.title){
    		res.status(400);
    		res.json({
    			"error" : "Bad data"
    		})
    	}else{
    		db.tasks.save(task, function(err, task){
    			if(err){
    				res.send(err);
    			}
    		});
            task.ok = 1;
    		res.json(task);
    	}
    });

    // delete todo
    app.delete('/tasks', urlencodedParser, function(req, res){
        db.tasks.remove({_id : mongojs.ObjectId(req.body.taskId)}, function(err, task){
    		if(err){
    			res.send(err);
    		}
    		res.json(task);
    	});
    });

    // update a todo
    app.put('/tasks', urlencodedParser, function(req, res){
        var updTaskIsdone =  (req.body.taskIsdone == 'false') ? true : false;
        db.tasks.update({_id : mongojs.ObjectId(req.body.taskId)}, {title: req.body.taskTitle, isdone : updTaskIsdone}, {}, function(err, task){
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    });
}
