var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');


router.post('/', function(req, res, next){

	var db = req.db;

	var insertInMyCollection = db.get('users');

	var nameUserAccept = req.body.nameUser;
	var fotoUserAccept = req.body.fotoUser;
	var idUserAccept = req.body.idUser;
	var idAdd = req.body.idUserOther;

	console.log(idUserAccept);
	var idunique = req.user._id;
	console.log(idunique)
	

	insertInMyCollection.findAndModify({
		query: {
			'_id': idUserAccept
		},
		update: {
			$push: {
				'Amigos': {
					usuario: idAdd,
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