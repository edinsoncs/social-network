var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;



router.post('/registro/', function(req, res, next) {

	var db = req.db;

	var email = req.body.email;
	var password = req.body.password;
	/*var apellidos = req.body.apellidos;
	var email = req.body.email;
	var password = req.body.password;
	var passwordR = req.body.passwordR;
	var mes = req.body.mes;
	var dia = req.body.dia;
	var ano = req.body.ano;
	var genero = req.body.genero;*/

	var collections = db.get('users');

	collections.insert({
		"email": email,
		"password": password
		/*"apellidos": apellidos,
		"email": email,
		"password": password,
		"passwordR": passwordR,
		"mes": mes,
		"dia": dia,
		"year": ano,
		"genero": genero*/
	}).success(function(err, doc){
		res.json({inserted: true});
	}).error(function(err){
		res.json({error: "Hay aqui un error"});
	});

	console.log("aqui");
});


router.post('/login/', function(req, res, next) {
  
 	var post = req.body;
	console.log(post);

 	var db = req.db;
 	
	var email = req.body.email;
	var password = req.body.password;

	var collections = db.get('usuarios');

	

	var find = collections.findOne({

		"Nickname": email,
		"Password": password

	}).success(function(doc){

		if(doc !== null) {
			res.json({inserted: true});
			
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