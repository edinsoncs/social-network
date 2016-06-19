var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');

router.get('/', function(req, res, next) {

   	var db = req.db;
   	var users = db.get('users');

    function nameUser() {
    	return req.user.name;
    }

    if(nameUser() === "Edinson Carranza") {
    	
    	users.find({}, function(err, resultado) {
    		if(err){
    			throw err;
    		} else {
    			res.render('adminshow', {
			        web: req.user.name + " " + "Mi Libro - Viainti tu libro viajero",
			        nombre: req.user.name,
			        avatar: req.user.photo,
			        imagenpost: 'hola',
			        id: req.user._id,
			        usuarios: resultado,
			        notificaciones: req.user.Notificaciones
			    });
    		}
    	});

    		

    } else {
    	res.status(400);
    	res.send('Que chismosooo!!! xD');
    }
 
    

});

router.post('/accept', function(req, res, next){
	var db = req.db;
	var usuarios = db.get('users');
	
	var id = req.body.idshow
	

	usuarios.findAndModify({
		query: {
			'_id': id
		},
		update: {
			$set: {
				'activeService': true
			}
		},
		new: true
	}).success(function(data){
	});



});

module.exports = router;
