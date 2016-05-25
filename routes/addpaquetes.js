var express = require('express');
var app = express();
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.post('/', function(req, res, next) {


	var db = req.db;
	var titulo = req.body.titulo;
	var precio = req.body.precio;
	var dateida = req.body.dateida;
	var datellegada = req.body.datellegada;
	var cantidadDias = req.body.cantidadDias;
	var cantidadNoches = req.body.cantidadNoches;
	var cantidadPersonas = req.body.cantidadPersonas;
	var paises = req.body.paises;
	var imagen = req.body.imagen;
	var coverimagen = req.body.coverimagen;
	var pasaje = req.body.pasaje;
	var mobilidad = req.body.mobilidad;
	var hotel = req.body.hotel;
	var seguroMedico = req.body.seguroMedico;
	var contenido = req.body.contenido;

	var collection = db.get('paquetes');

	collection.insert({
		"Titulo": titulo,
		"Precio": precio,
		"DateIda": dateida,
		"DateLlegada": datellegada,
		"CantidadDias": cantidadDias,
		"CantidadNoches": cantidadNoches,
		"CantidadPersonas": cantidadPersonas,
		"Paises": paises,
		"Imagen": imagen,
		"ImagenCover": coverimagen,
		"Pasaje": pasaje,
		"Mobilidad": mobilidad,
		"Hotel": hotel,
		"SeguroMedico": seguroMedico,
		"Contenido": contenido
		
	}).success(function(doc){
		res.json({inserted: true});
	}).error(function(err){
		res.json({error: "ocurrio un error"});
		console.log(err);
	});

 
});

router.get('/', function(req, res, next) {
	
	var db = req.db;

	var collection = db.get('paquetes');
	
	collection.find({}, { sort : { points:1 } }, function(err, doc){
		res.send(doc.reverse());
	});


});

router.get('/:page', function(req, res, next){

	var db = req.db;
	var paginator = req.params.page;
	//console.log(paginator);
	var collection = db.get('paquetes');
	var limiteViewPage = 10;
	var skip = paginator * limiteViewPage;


	 collection.find({}, { skip: skip,  limit : limiteViewPage,  }, function(err, doc){
		res.send(doc.reverse());
	});



    /*var db = req.db;
    var page = req.params.page;
    var itemsPerPage = 8;
    var skip = page * itemsPerPage;

    var collection = db.get('mibd');
    collection.find({}, { skip: skip,  limit : itemsPerPage,  }, function(err, doc){
        res.send(doc.reverse());
    });*/

});




module.exports = router;
