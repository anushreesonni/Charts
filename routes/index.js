var MongoClient = require('mongodb').MongoClient;
var data = "xyz";
MongoClient.connect('mongodb://@ds023108.mlab.com:23108/charts', function(err, db) {
	  if (err) {
	    throw err;
	  }
	  setInterval(function() {		  
		  respond();
		}, 5000);
	  function respond(){
		  db.collection('').find().sort({_id:-1}).toArray(function(err, result) { //Pick all data in the db
			    if (err) {
			      throw err;
			    }
			    data = result;
			  });	  
	  }	  
	});

exports.index = function send_again(req, res){	
	  res.render('index', { title: "Heartrate vs Time", result:data});	  
	};

