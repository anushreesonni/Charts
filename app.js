var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , MongoClient = require('mongodb').MongoClient;
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

userEmailID = "anushree123@gmail.com";
currentUserEmailID = "anushree123@gmail.com";


// all environments
app.set('port', process.env.PORT || 3005);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('routes', __dirname + '/routes');
app.use(express.favicon());
app.use(express.logger('dev'));
//app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


var heartrate = require('./routes/heartrate'); 
app.get('/heartrate.ejs', heartrate.index);
app.get('/grab', function(req, res) { //AJAX call definition
	var data = "xyz";
	
	MongoClient.connect('mongodb://@ds0108.mlab.com:23108/charts', function(err, db) {
		  if (err) {
		    throw err;
		  }
		  
		  db.collection('heartrate').find({pid:userEmailID}).sort({_id:-1}).limit(1).toArray(function(err, result) {
		    if (err) {
		      throw err;
		    }
		    //console.log(result);
		    data = result;
		    console.log(data[0]['heartrate']);
		    res.send(result);	
		  });
		});
	
	//res.send(data);	
});


app.get('/', routes.index);		//Enable get call on index
var calorie = require('./routes/calorie'); 
app.get('/calorie.ejs', calorie.index);
app.get('/grabCal', function(req, res) { //AJAX call definition
	var data = "xyz";
	MongoClient.connect('mongodb://anu:anu@ds0230.mlab.com:23108/charts', function(err, db) {
		  if (err) {
		    throw err;
		  }
		  
		  db.collection('calories').find({pid:userEmailID}).sort({_id:-1}).limit(1).toArray(function(err, result) {
		    if (err) {
		      throw err;
		    }
		    //console.log(result);
		    data = result;
		    console.log(data[0]['calories']);
		    res.send(result);	
		  });
		});
	
	//res.send(data);	
});

var steps = require('./routes/steps'); 
app.get('/steps.ejs', steps.index);
app.get('/grabStep', function(req, res) { //AJAX call definition
	var data = "xyz";
	MongoClient.connect('mongodb://@ds023108.mlab.com:23108/charts', function(err, db) {
		  if (err) {
		    throw err;
		  }
		  
		  db.collection('steps').find({pid:userEmailID}).sort({_id:-1}).limit(1).toArray(function(err, result) {
		    if (err) {
		      throw err;
		    }
		    //console.log(result);
		    data = result;
		    console.log(data[0]['steps']);
		    res.send(result);	
		  });
		});
	
	//res.send(data);	
});
