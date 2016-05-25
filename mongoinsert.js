var Mongo = require('mongodb').MongoClient;


Mongo.connect('mongodb://localhost:27017/vuelos', function(err, db){

	db.collection('vuelos').insert([{

		usuario: 'edimix',
		password: 'sancarlos'
	}, {
		names: 'viainti2015',
		time: 'sancarlos'
	}]);

	db.close();


});