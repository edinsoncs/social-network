var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');

var multipart = require('connect-multiparty');
var dataForm = multipart();

var fs = require('fs');

var path = require('path');

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

	var saveDirectory = path.join(__dirname, '..', 'public/uploads/', 'services' + fileOne.name);
	var saveDirectory2 = path.join(__dirname, '..', 'public/uploads/', 'services' + fileTwo.name);

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
		"Imagen": fileOne.name,
		"ImagenCover": fileTwo.name,
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


module.exports = router;