var express = require('express');
var router = express.Router();

/* places */
router.get('/', function(req, res, next) {

	var db = req.db;
	var places = db.get('places');

	places.find({}, function(err, doc) {
		res.render('places/places', {
			title: 'Places',
			paises: doc
		});
	});

});

router.get('/:pais', function(req, res, next) {

	var db = req.db;
	var places = db.get('places');

	places.findOne({"pais": req.params.pais}, function(err, doc) {
		res.render('places/pais', {
			title: doc.pais,
			ciudades: doc.ciudades
		});
		console.log(doc);
	});

});

router.get('/:pais/:ciudad', function(req, res, next) {

	var db = req.db;
	var places = db.get('places');

	places.findOne({"pais": req.params.pais, "ciudades.ciudad": req.params.ciudad}, function(err, doc) {
		/*res.render('places/pais', {
			title: doc.ciudad,
			ciudades: doc.ciudades
		});*/
		console.log(doc);
	});

});

module.exports = router;