var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next){

	var db = req.db;

	var titulo = req.body.titulo;
	var precio = req.body.precio;
	var imagen = req.body.imagen;
	var coverImagen = req.body.coverImagen;
	var fechaIda = req.body.fechaIda;
	var fechaLlega = req.body.fechaLlega;
	var cantidadDias = req.body.cantidadDias;
	var cantidadNoches = req.body.cantidadNoches;
	var personas = req.body.personas;
	var paises = req.body.paises;
	var pasaje = req.body.pasaje;
	var mobilidad = req.body.mobilidad;
	var hotel = req.body.hotel;
	var seguroMedico = req.body.seguroMedico;
	var contenido = req.body.contenido;

	var collection = db.get('cruceros');

	collection.insert({
		"Titulo": titulo,
		"Precio": precio,
		"Imagen": imagen,
		"CoverImagen": coverImagen,
		"FechaIda": fechaIda,
		"FechaLlega": fechaLlega,
		"CantidadDias": cantidadDias,
		"CantidadNoches": cantidadNoches,
		"Personas": personas,
		"Paises": paises,
		"Pasaje": pasaje,
		"Mobilidad": mobilidad,
		"Hotel": hotel,
		"SeguroMedico": seguroMedico,
		"Contenido": contenido
	}).success(function(doc){
		res.json({inserted: true});
	}).error(function(err){
		res.json({error: "Ocurrio un error"});
		console.log(err);
	});

});

/* GET users listing. */
router.get('/', function(req, res, next) {

	var db = req.db;
	var collection = db.get('cruceros');

	collection.find({},{sort: {points : 1 }}, function(err, doc){
		res.send(doc.reverse());
	});


  //res.send('hola probando demo');

});

router.get('/:page', function(req, res, next) {

	var db = req.db;
	var paginator = req.params.page;
	var collection = db.get('cruceros');
	var limitViewPage = 10;
	var skip = paginator * limitViewPage;

	collection.find({}, {skip: skip, limit: limitViewPage}, function(err, doc){
		res.send(doc.reverse());
	});



});



module.exports = router;
