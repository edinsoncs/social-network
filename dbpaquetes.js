var Mongo = require('mongodb').MongoClient;

Mongo.connect('mongodb://localhost:27017/vuelos', function(err, db) {

	db.collection('paquetes').insert({
		titulo: 'Fin de semana en Mendoza',
		precio: '15000',
		cantidadDias: '2 dias',
		cantidadNoches: '1 noche',
		paises: 'Argentina',
		contenido: 'Este paquete solo funciona en argentina con moneda pesos'
	});

	db.close();

});