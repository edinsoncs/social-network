var Mongo = require('mongodb').MongoClient;

Mongo.connect('mongodb://localhost:27017/vuelos', function(err, db){
	if(err){
		return err;
	}
	else {
		var paises = db.collection('paises');

		paises.insert([{
			'pais': 'argentina',
			'img': 'argentinacover.jpg',
			'galeria': [{
				'g1': 'imagengallery1.jpg',
				'g2': 'imagengallery2.jpg',
				'g3': 'imagengallery3.jpg'
			}]
			}, {
			'pais': 'bolivia',
			'img': 'boliviacover.jpg'
			}, {
			'pais': 'chile',
			'img': 'chilecover.jpg'
			}, {
			'pais': 'colombia',
			'img': 'colombiacover.jpg'
			}, {
			'pais': 'ecuador',
			'img': 'ecuadorcover.jpg'
			}, {
			'pais': 'paraguay',
			'img': 'paraguaycover.jpg'
			}, {
			'pais': 'peru',
			'img': 'perucover.jpg'
			}, {
			'pais': 'uruguay',
			'img': 'uruguaycover.jpg'
			}], 

		function(err, doc){
			if(err) {
				return err;
			} else {
				console.log('se inserto bien');
			}
		});
	}
});