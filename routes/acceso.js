var express = require('express');
var router = express.Router();


/* GET users listing. */
router.post('/', function(req, res, next) {
	
	var db = req.db;

	var nombre = req.body.name;
	var password = req.body.password;

	var collections = db.get('vuelos');

	var find = collections.findOne({

		"usuario": nombre,
		"password": password

	}).success(function(doc){
		if(doc !== null) {
			res.json({inserted: true});
		}
		else {
			res.json({error: "error"});
		}
		console.log(doc);
	}).error(function(err){
		res.json({error: "Hubo un error"});
	});



});

module.exports = router;
