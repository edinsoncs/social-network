var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs');


/* GET users listing. */
router.post('/', function(req, res, next) {

  
	var db = req.db;

	var mensajepost = req.body.mensajepost;
	
	var user = req.user._id;
	var find = db.get('users');
	var collection = db.get('users');

	/*Fecha de posteo*/
	var datePost = new Date();
	var hora = datePost.getTime();

	var oneDate = function(dia,hora,year){
		var a = new Date();
		var b = a.getTime();

		var dia =  a.getDay();
		var hora = a.getHours();
		var year = a.getYear();

		if(dia == 0){
			dia = "Domingo";
		}
		else if (dia == 1) {
			dia = "Lunes"
		}
		else if (dia == 2) {
			dia = "Martes";
		}
		else if ( dia == 3 ) {
			dia = "Miercoles";
		}
		else if ( dia == 4) {
			dia = "Jueves";
		}
		else if ( dia == 5) {
			dia = "Viernes"
		}
		else if ( dia == 6) {
			dia = "Sabado"
		}
		else {
			dia = "No se encontro ningun día de la semana";
		}

		var result = "Publicado: "+dia + " " + hora;
		return result;
	}


	find.findOne({'_id': user}, function(err, doc){
		console.log("encontre:" + doc._id);
		
		//update --> update actualizar la db
		//findAndModify --> recomendado para este caso

		collection.findAndModify({
			
			query: {'_id': user},
			update: {
				$set: {
					'contenido': {

							'post': {
								'idPost': 0,
								'date': oneDate(),
								'post': mensajepost
							}
					}
				}
			},
			upsert: true,
			new: true

		}).success(function(doc){
			res.json({inserted: true});
		}).error(function(err){
			res.json({err: 'Ocurrio un error'});
		});


	});

	

 
});




module.exports = router;
