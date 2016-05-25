var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { web: 'Registrate - Viainti Tu Libro Viajero' });
});

router.post('registrando/', function(req, res, next) {

	var db = req.db;

	var nombreApp = req.body.nombreapp;
	var email = req.body.email;
	var password = req.body.password;
	var passwordR = req.body.passwordR;
	var mes = req.body.mes;
	var dia = req.body.dia;
	var ano = req.body.ano;

	var collections = db.get('usuarios');

	collections.insert({
		"Nombres": nombreApp,
		"Email": email,
		"Password": password,
		"PasswordR": passwordR,
		"Mes": mes,
		"Dia": dia,
		"Year": ano
	}).success(function(err, doc){
		res.json({inserted: true});
	}).error(function(err){
		res.json({error: "Hay aqui un error"});
	});

	console.log("aqui");
});

module.exports = router;
