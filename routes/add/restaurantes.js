var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next){

	var db = req.db;

	var titulo = req.body.name;
	var descript = req.body.des;
	var imagen = req.body.imagen;
	var cover = req.body.cover;
	var ubicacion = req.body.ubicacion;
	var direccion = req.body.direccion;
	var pais = req.body.pais;
	var tel = req.body.tel;
	var lat = req.body.lat;
	var lon = req.body.lon;

	var collection = db.get('restaurantes');
	collection.insert({
		'Nombre': titulo,
		'Descripccion': descript,
		'Imagen': imagen,
		'Cover': cover,
		'Ubicacion': ubicacion,
		'Direccion': direccion,
		'Pais': pais,
		'Tel': tel,
		'Latitud': lat,
		'Longitud': lon,
		'Post': Array
	}).success(function(doc){
		res.json({inserted: true});
	}).error(function(err){
		console.log(err);
	});

});

router.get('/restaurantes', function(req, res, next){
	var db = req.db;
	var collection = db.get('restaurantes');

	collection.find({}, function(err, doc){
		if(err){
			console.log(err);
		}
		else {
			res.json(doc.reverse());
		}
	});

});


router.post('/post', function(req, res, next){
	var db = req.db;
	var rest = db.get('restaurantes');

	var date = new Date();
	var time = date.getTime();


	var id = req.body.id;
	var text = req.body.text;
	
	rest.findAndModify({
			query: {"_id": id },
			sort: {
				id: -1
			},
			update: {
				$push: {
					"Post": {
						id: 0,
	                    content: text,
	                    date: time,
	                    name: req.user.name,
	                    foto: req.user.photo
					}
				}
			},
			
			new: true
	}).success(function(doc){
		console.log('se agrego ' + doc);
	}).error(function(err){
		console.log('hubo un error: '+ err);
	});


	//Insert Activitis

	var usuarioId = req.user._id;
	var nameActividad = req.body.service;

	function insertActividades(userId){
		var usuarios = db.get('users');
		usuarios.findAndModify({
			query: {"_id": userId},
			update: {
					$push: {
						"Actividades": {
							id: 0,
							mensaje: text,
							nameservicio: nameActividad,
							fotoUser: req.user.photo,
							idservicio: usuarioId
						}
					}
				},
			new: true
		}).success(function(doc){
			console.log('se modifico');
		}).error(function(err){
			console.log(err);
		});
	}
	insertActividades(usuarioId);
	
});

module.exports = router;