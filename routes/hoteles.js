var express = require('express');
var router = express.Router();
var url = require('url');

var bodyParser = require('body-parser');

/* GET users listing. */
router.get('/:geo/', function(req, res, next) {
  
  var db = req.db;
  var hoteles = db.get('hoteles');

  var isGeo = req.params.geo;

  var isGeoReplace = isGeo.replace('-', ' ');

  hoteles.find({'Ubicacion': isGeoReplace}, function(err, result){
  	if(err){
  		 throw err;
  	}
  	else {

  		if(result.length > 0 ){
  			res.render('hoteles', {
			  	web: 'Hoteles - Viainti tu libro viajero',
			  	nombre: req.user.name,
			  	avatar: req.user.photo,
			  	resultados: result,
			  	notificaciones: req.user.Notificaciones
			 });
  			console.log(req.user.Notificaciones);
  		}
  		else {
  			res.render('errorHoteles', {
			  	web: 'Hoteles - Viainti tu libro viajero',
			  	nombre: req.user.name,
			  	avatar: req.user.photo
			 });
  		}
  		
  		
  	}
  });

 
});

/*router.get('/:city/:hotel/', function(req, res, next){
	
	var urlShow = url.parse(req.url, true);
	var id = urlShow.search;
	var id_Replace = id.replace('?id=', '');

	var db = req.db;
	var hoteles = db.get('hoteles');

	hoteles.findOne({'_id': id_Replace}, function(err, hotel){
		if(err){
			console.log(err);
		}
		else {
			res.render('hotelesprofile', {
				web: hotel._id,
				nombre: req.user.name,
				avatar: req.user.photo

			});
		}
	});



});*/


router.get('/show/:namehotel', function(req, res, next){
	var toUrl = url.parse(req.url, true).query;
	var idHotel = toUrl.id;

	var db = req.db;
	var collection = db.get('hoteles');


	collection.findOne({'_id': idHotel},{sort: {amount: -1}}, function(err, doc){
		var inPostHotel;
		var fotoPost;
		
		if(err){
			console.log(err);
		}
		else {
			console.log(doc.Nombre);		

			res.render('hotelesprofile', { layout : 'layout',
				web: doc.Nombre + ' - ' + 'Viainti tu libro viajero',
				nombre: req.user.name,
				avatar: req.user.photo,
				nombreHotel: doc.Nombre,
				fotoHotel: doc.Imagen,
				coverHotel: doc.Cover,
				destHotel: doc.Descripccion,
				ubiHotel: doc.Ubicacion,
				direHotel: doc.Direccion,
				latHotel: doc.Latitud,
				lonHotel: doc.Longitud,
				id: req.user._id,
				notificaciones: req.user.Notificaciones,
				posts: doc.Post
			});

		}

		

	});

	
});

module.exports = router;
