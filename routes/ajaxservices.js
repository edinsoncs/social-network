var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');

var multipart = require('connect-multiparty');
var dataForm = multipart();

var fs = require('fs');

var path = require('path');

var shortid = require('shortid');

router.post('/', dataForm, function(req, res, next){
	var db = req.db;

	var fileOne = req.files.imagen;
	var fileTwo = req.files.coverimagen;


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

	var itemFileOne = shortid.generate() + fileOne.name;
	var itemFileTwo = shortid.generate() + fileTwo.name;

	var saveDirectory = path.join(__dirname, '..', 'public/uploads/', 'services' + itemFileOne);
	var saveDirectory2 = path.join(__dirname, '..', 'public/uploads/', 'services' + itemFileTwo);

	fs.readFile(fileOne.path, function(err, data){
		if(err){
			throw err;
		}
		else {
			
			fs.writeFile(saveDirectory, data, function(err){
				if(err){
					throw err;
				}
			});
		}
	});

	setTimeout(function(){
		fs.readFile(fileTwo.path, function(err, data){
			if(err){
				throw err;
			} 
			else {
				fs.writeFile(saveDirectory2, data, function(err){
					if(err) {
						throw err;
					}
				})
			}
		});

	}, 1000);


	collection.insert({
		"IdUser": req.user._id,
		"Titulo": Titulo,
		"Precio": precio,
		"DateIda": dateida,
		"DateLlegada": datellegada,
		"CantidadDias": cantidadDias,
		"CantidadNoches": cantidadNoches,
		"CantidadPersonas": cantidadPersonas,
		"Paises": paises,
		"Imagen": itemFileOne,
		"ImagenCover": itemFileTwo,
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


router.post('/restaurantes', dataForm, function(req, res, next){
	var db = req.db;

	var fileOne = req.files.imagenRest;
	var fileTwo = req.files.coverRest;
	console.log(req.body);

	var titulo = req.body.tituloHotel;
	var descript = req.body.textRest;
	var ubicacion = req.body.ubicacionRest;
	var direccion = req.body.direccionRest;
	var pais = req.body.paisesRest;
	var tel = req.body.telRest;
	var lat = req.body.latitud;
	var lon = req.body.longitud;


	var collection = db.get('restaurantes');

	var itemFileOne = shortid.generate() + fileOne.name;
	var itemFileTwo = shortid.generate() + fileTwo.name;

	var saveDirectory = path.join(__dirname, '..', 'public/uploads/', 'services/' + itemFileOne);
	var saveDirectory2 = path.join(__dirname, '..', 'public/uploads/', 'services/' + itemFileTwo);

	fs.readFile(fileOne.path, function(err, data){
		if(err){
			throw err;
		}
		else {
			
			fs.writeFile(saveDirectory, data, function(err){
				if(err){
					throw err;
				}
			});
		}
	});

	setTimeout(function(){
		fs.readFile(fileTwo.path, function(err, data){
			if(err){
				throw err;
			} 
			else {
				fs.writeFile(saveDirectory2, data, function(err){
					if(err) {
						throw err;
					}
				})
			}
		});

	}, 1000);


	collection.insert({
		'Nombre': titulo,
		'Descripccion': descript,
		'Imagen': itemFileOne,
		'Cover': itemFileTwo,
		'Ubicacion': ubicacion,
		'Direccion': direccion,
		'Pais': pais,
		'Tel': tel,
		'Latitud': lat,
		'Longitud': lon,
		'Post': Array
	}).success(function(doc){
		res.render('acceptservice', {
			web: req.user.name + " " + "Mi Libro - Viainti tu libro viajero",
            nombre: req.user.name,
            avatar: req.user.photo,
            id: req.user._id,
            notificaciones: req.user.Notificaciones,
			data: doc
		});
	}).error(function(err){
		console.log(err);
	});


});


module.exports = router;