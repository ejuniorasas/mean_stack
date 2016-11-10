 var express = require('express');
 var wagner = require('wagner-core');

 require('./models')(wagner);

var app = express();

app.use('/api/v1', require('./api')(wagner));
app.listen(9998);
console.log('listenning .... ....');

/*var mongoose = require('mongoose');
var schema = require('./schema');

//var uri ='mongodb://192.168.99.100:32768/example';
mongoose.connect('mongodb://192.168.99.100:32768/example');

var User = mongoose.model('User', schema, 'users');


var user = new User({
	name: 'John Smith',
	email: 'john@smith.io'
});

user.save(function(error){
	if(error) {
		console.log(error);
		process.exit(1);
	}
	User.find({email: 'john@smith.io'}, function(error, docs) {
		if (error) {
			console.log(error);
			process.exit(1);
		}
		console.log(require('util').inspect(docs));
		process.exit(0);
	});
});
/*
mongodb.MongoClient.connect(uri, function(error,db){
	if (error) {
		console.log(error);
		process.exit(1);
	}

	db.collection('sample').insert({ x:1 }, function(error, result){
		if(error) {
			console.log(error);
			process.exit(1);
		}

		db.collection('sample').find().toArray(function(error, docs) {
			if (error) {
				console.log(error);
				process.exit(1);
			}

			console.log('found docs:');
			docs.forEach(function (doc){
				console.log(JSON.stringify(doc));
				process.exit(0);
			});
		});
	});
});*/