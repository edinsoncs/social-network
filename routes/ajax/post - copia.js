var express = require('express');
var router = express.Router();


var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var fs = require('fs');

var path = require('path');
var bodyParser = require('body-parser');

//add var globals
var nameToImg = '';

router.use(bodyParser.json());

router.post('/', multipartMiddleware, function(req, res, next) {
  	
	//files
	//console.log(req.files);
	//globals
	

	/*fs.readFile(req.files.imagen.path, function(err, data){
		var nombreImagen = req.files.imagen.name;
		//console.log('nombre de la imagen: ' + nombreImagen);
		if(err){
			console.log('sucedio un error: ' + err);
		}
		else {

			var newDirectory = __dirname + '../../../uploads/usuarios/' + nombreImagen;

			fs.writeFile(newDirectory, data, function(err){
				if(err){
					console.log('hubo un error: '+ err);
				}
				else {
					console.log('se agrego');
					nameToImg = nombreImagen;
				}
			})
		}
	});*/

	var imgPost = path.join(__dirname + '../../../uploads/usuarios/' + req.files.imagen.name);
	
	var db = req.db;
	var users = db.get('users');

	var id = req.user._id;
	var text = req.body.text;
	//var text = req.body.mensajepost;

	var date = new Date();
	var time = date.getTime();

	users.findAndModify({
		query: {"_id": id },
		update: {
			$push: {
				"posts": {
					id: 0,
                    content: text,
                    /*imagen: imgPost,*/
                    date: time,
                    type: 1
				}
			}
		},
		new: true
	}).success(function(doc) { 
		
		res.json({
			user: {
				name: doc.name,
				photo: doc.photo
			},
			content: text,
            date: time,
			state: true
		});
	}).error(function(err) {
		res.json({err: err});
	});

});

module.exports = router;