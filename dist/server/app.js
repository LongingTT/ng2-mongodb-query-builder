
var MongoClient = require('mongodb').MongoClient
var assert = require('assert');
var bodyParser = require('body-parser');
var express =require('express');
var path = require('path');

// Mongodb connection string
var url = 'mongodb://localhost:27017/longingdb';

var query =function(queryobject,res, next){
	MongoClient.connect(url,function(err,db){
		if(err)
		{
			console.log("Failed to connect to db server");
			next(new Error("Failed to connect to db server"));

		}else{
			console.log("Connected successfully to db server");
			findDocuments(queryobject, db,function (docs) {
				res.json({data:docs});
				db.close();
			},next)	
		}
	});
}

var findDocuments = function(queryobject,db,callback,next){
	if(!queryobject.collection 
		|| typeof queryobject.collection != 'string' 
		|| queryobject.collection.length==0 )
	{
		next( new Error('Invalid query object. Property "collection" is required.'));
	}
	else if(!queryobject.mongoquery)
	{
		next( new Error('Invalid query object. Property "mongoquery" is required.'));
	}

	var collection = db.collection(queryobject.collection);
	collection.find(queryobject.mongoquery).toArray(function (err,docs) {
		//console.log("Found the following records");
		//console.log(docs);
		callback(docs);
	});
}

var logErrors = function(err, req, res, next) {
	console.log(err);
  	console.error(err.stack);
  	next(err);
}

var errorHandler = function(err, req, res, next) {
  res.status(500);
  res.json({ name:err.name,message: err.message,stack: err.stack });
}


// create express service
var app=express();
// create application/json parser 
app.use(bodyParser.json({reviver:isoDateReviver}));

app.use('/scripts', express.static(__dirname+'/../client/scripts'));
app.use('/css', express.static(__dirname+'/../client/css'));
app.use('/views', express.static(__dirname+'/../client/views'));

app.get('/', function(req, res) {
	res.redirect('/index');
});

app.get('/index', function(req, res) {
	res.sendFile(path.resolve('../client/views/index.html'));
});

app.post('/api/query', function(req, res, next) {
	query(req.body,res,next);
});

app.use(logErrors);
app.use(errorHandler);

app.listen(3000,function(){console.log('Example app listening on port 3000')}); 


function isoDateReviver(key, value) {
    var regexIsoDate;
    if (typeof value === 'string') {
        regexIsoDate = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
        if (regexIsoDate) {
            return new Date(Date.UTC(+regexIsoDate[1], +regexIsoDate[2] - 1, +regexIsoDate[3], +regexIsoDate[4],
                            +regexIsoDate[5], +regexIsoDate[6]));
        }
    }
    return value;
};

