var express = require('express');
var router = express.Router();
var url = require('url');

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  var db = req.db;
  var hoteles = db.get('hoteles');

  hoteles.find({}, function(err, result){
  	if(err){
  		return err;
  	}
  	else {
  		
  		 res.render('hoteles', {
		  	web: 'Hoteles - Viainti tu libro viajero',
		  	nombre: req.user.name,
		  	avatar: req.user.photo,
		  	resultados: result
		 });
  	}
  });

 
});

router.get('/:namehotel', function(req, res, next){
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
			inPostHotel = doc.Post;
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
				posts: inPostHotel
			});

		}

		

	});

	
});

module.exports = router;
