var express = require('express');
var router = express.Router();

/* places */
router.get('/', function(req, res, next) {

	res.render('places/places', {
			title: 'Viainti en ' + 'Latinoamerica',
			nombre: req.user.name,
			avatar: req.user.photo
	});

});

router.get('/:pais', function(req, res, next) {


	var db = req.db;
	var paises = db.get('paises');

	paises.findOne({
		'pais': req.params.pais
	}).success(function(result, err){

		if(result !== null) {
			res.render('places/pais', {
				title: 'Viainti en ' + req.params.pais,
				nombre: req.user.name,
				avatar: req.user.photo,
				img: result.galeria
			});

			console.log(err);
		}
		else {
			res.render('places/trabajando', {
				title: 'Viainti',
				nombre: req.user.name,
				avatar: req.user.photo
			});
		}
		

		
	}).error(function(err){
		console.log('no encontro');
	})


});

router.get('/:pais/:ciudad', function(req, res, next) {

	var nameCiudad = req.params.ciudad;

	res.render('places/ciudad', {
		title: 'Viainti en ' + nameCiudad,
		nombre: req.user.name,
		avatar: req.user.photo
	});

});

module.exports = router;