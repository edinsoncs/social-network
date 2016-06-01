var express = require('express');
var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
  
	var db = req.db;

	var nombre = req.body.usuariobackend;
	var password = req.body.passwordbackend;

	var collections = db.get('vuelos');

	console.log('registrando..')

	var find = collections.findOne({
		"usuario": nombre,
		"password": password
	}).success(function(doc){
		if(doc !== null) {
			console.log(doc)
		}
		else {
			res.json({error: "error"});
		}
	}).error(function(err){
		res.json({error: "Hubo un error"});
		console.log(err);
	});

	 

});


module.exports = router;
