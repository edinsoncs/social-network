var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var nodemailer = require('nodemailer');

var smtpTransport = require('nodemailer-smtp-transport');

router.post('/registro/', function(req, res, next) {

	var db = req.db;

	var username = req.body.username;
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
		"username": username,
		"email": email,
		"password": password,
		'photo': 'https://avatars1.githubusercontent.com/u/4240285?v=3&s=460',
		'notificaciones': []
	}).success(function(err, doc){

		/*Send message*/
		var transporter = nodemailer.createTransport(smtpTransport({
		    host: 'single-2364.banahosting.com',
		    port: 465,
		    auth: {
		        user: 'info@viainti.com',
		        pass: 'via123'
		    }
		}));

		var mailOptions = {
		    from: '"Viainti tu libro viajero 👥" <info@viainti.com>', // sender address
		    to: email, // list of receivers
		    subject: 'Hello ✔', // Subject line
		    text: 'Hello world 🐴', // plaintext body
		    html: '<b>Hello world 🐴</b>' // html body
		};

		transporter.sendMail(mailOptions, function(error, info){
			if(error) {
				return console.log(error)
			}
			else {
				console.log('se envio el mensaje');
			}
		});


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