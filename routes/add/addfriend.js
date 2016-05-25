var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');

router.post('/', function(req, res, next){
	
	var db = req.db;
	var usersCollection = db.get('users');
	
	var idUsuario =  req.user._id;
	
	var usuario = req.body.idusuarioInvite;
	var nombreusuario = req.body.nameusuarioInvite;
	var imagenusuario = req.body.nameimagenInvite;
	console.log(req.body);
	
	usersCollection.findAndModify({
		query: {'_id': idUsuario},
		update: {
			$push: {
				InvitacionesEnviadas: {
					usuarioInvite: usuario,
					nameInvite: nombreusuario,
					imgInvite: imagenusuario
				}
			}
		},
		new: true
	}).success(function(invite){
		res.json(invite);
	}).error(function(err){
		console.log(err);
	});
});

router.post('/accept/', function(req, res, next){

	var db = req.db;

	var insertInMyCollection = db.get('users');

	var nameUserAccept = req.body.nameUser;
	var fotoUserAccept = req.body.fotoUser;
	var idUserAccept = req.body.idUser;

	console.log(idUserAccept);
	var idunique = req.user._id;
	console.log(idunique)
	

	insertInMyCollection.findAndModify({
		query: {
			'_id': idunique
		},
		update: {
			$push: {
				'Amigos': {
					usuario: idUserAccept,
					name: nameUserAccept,
					img: fotoUserAccept
				}
			}
		},
		new: true
	}).success(function(doc){
		res.json(doc);
	}).error(function(err){
		console.log(err);
	})

	


});


module.exports = router;