var express = require('express');
var url = require('url');

var functions = require('../moduls/functions');


/**/
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var fs = require('fs');

var path = require('path');

var bodyParser = require('body-parser');
/**/

var router = express.Router();

var shortid = require('shortid');

//add var globals
var nameToImg = '';
var nameToVideo = '';
router.get('/:users', function(req, res, next) {
	//console.log("tesssssssst y");

	var db = req.db;

	var collection = db.get('users');
	
	collection.find({}, { sort : { points:1 } }, function(err, doc) {
		res.send(doc.reverse());
	});

	//var query = url.parse(req.url,true).query;
	
	/*var c = req.params.users;
	//var id = query.id;
	//console.log(c);

	var db = req.db;

	var collection = db.get('usuarios');

	collection.findOne({"Nickname": c}, function(err, doc) {
		res.render('libro', {
			nick: doc.Nickname,
			web: "hola"

		});
	});*/

	


});



/* Start User Profile */
router.get('/u/:id', function(req, res, next){
	var db = req.db;
	var usuarios = db.get('users');
	var idUser = req.params.id;
	
	
	usuarios.findById(idUser, function(err, post){
		

		if(err){
			console.log(err);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
		}
		else {
			
			var postUser = post.posts.reverse();
			var actividadesShow = post.Actividades.reverse();
			//console.log(post.post.id);
			res.render('usuarioProfile', {
				web: "Mi Libro - Viainti tu libro viajero",
				nombre: req.user.name,
				avatar: req.user.photo,
				nameProfile: post.name,
				avatarProfile: post.photo,
				userid: idUser,
				useridReq: req.user._id,
				invitacionID: req.user.InvitacionesEnviadas,
				cover: post.cover,
				posts: postUser,
				amigos: post.Amigos,
				actividades: actividadesShow
			});
		}
	});




});

router.post('/u/postprofile/', function(req, res, next){
	var idPost = req.body.id;
	var mensaje = req.body.mensaje;
	var idUsuarioFind = req.body.idUsuario;

	var db = req.db;
	var comentarios = db.get('users');
	var dashboard = db.get('dashboard');


	console.log(idUsuarioFind);

	comentarios.findAndModify({
		 query: { '_id': idUsuarioFind, 
		 		posts: { $elemMatch: { 'id': idPost}
		 }},
		 update: {
		 		$push: {
		 			'posts.$.comentarios': {
		 				'userId': req.user._id,
		 				'userComment': mensaje,
		 				'userName': req.user.name,
		 				'userPhoto': req.user.photo,
		 				'userTime': new Date()
		 			}
		 		}
		 },
		 new: true

	}).success(function(doc){
		res.json({
					userData: {
						name: doc.userName,
						photo: doc.userPhoto
					},
					userPost: doc.userComment,
		            date: doc.userTime,
					state: true
		});
		
	}).error(function(err){
		if(err){
			console.log(err);
		}
	});


	dashboard.findAndModify({
		 query: { 'id': idPost},
		 update: {
		 		$push: {
		 			'comentarios': {
		 				'userId': req.user._id,
		 				'userComment': mensaje,
		 				'userName': req.user.name,
		 				'userPhoto': req.user.photo,
		 				'userTime': new Date()
		 			}
		 		}
		 },
		 new: true

	}).success(function(doc){
		/*res.json({
					userData: {
						name: doc.userName,
						photo: doc.userPhoto
					},
					userPost: doc.userComment,
		            date: doc.userTime,
					state: true
		});*/
		
	}).error(function(err){
		if(err){
			console.log(err);
		}
	});



});


router.post('/u/likecoments/', function(req, res, next){
	
	console.log('estoy aqui edinson si');

	var idPost = req.body.id;
	var idUsuarioFind = req.body.idUsuario;
	var like = req.body.like;

	var db = req.db;
	var user = db.get('users');
	var dashboard = db.get('dashboard');


	user.findAndModify({
		 query: { '_id': idUsuarioFind, 
		 		posts: { $elemMatch: { 'id': idPost}
		 }},
		 update: {
		 		$push: {
		 			'posts.$.likes': {
		 				'cantidad': like,
		 				'idusuario': idUsuarioFind,
		 				'idpost': idPost,
		 				'usuarioname': req.user.name,
		 				'usuariophoto': req.user.photo,
		 				'time': new Date()
		 			}
		 		}
		 },
		 new: true

	}).success(function(doc){
		console.log('funcionoo');
		
	}).error(function(err){
		if(err){
			console.log(err);
		}
	});

	dashboard.findAndModify({
		 query: { 'id': idPost},
		 update: {
		 		$push: {
		 			'likes': {
		 				'cantidad': like,
		 				'idusuario': idUsuarioFind,
		 				'idpost': idPost,
		 				'usuarioname': req.user.name,
		 				'usuariophoto': req.user.photo,
		 				'time': new Date()
		 			}
		 		}
		 },
		 new: true

	}).success(function(doc){
		console.log('funcionoo');
		
	}).error(function(err){
		if(err){
			console.log(err);
		}
	});




});



router.post('/u/post', multipartMiddleware, function(req, res, next){
	var db = req.db;
	var user = db.get('users');

	var id = req.user._id;

	var nameImagen = req.files.cover.name;

	fs.readFile(req.files.cover.path, function(err, data){
		if(err){
			console.log(err);
		}
		else {
			
			var coverSave = path.join(__dirname, '..', 'public/uploads/', 'coverusuarios/' + nameImagen);
			//var coverSave = __dirname + '../../public/uploads/coverusuarios/' + nameImagen;

			fs.writeFile(coverSave, data, function(err){
				if(err){
					console.log(err);
				}
				else {
					user.findAndModify({
						query: {'_id': id},
						update: {
							$set: {
								cover: nameImagen
							}
						},
						new: true
					}).success(function(doc){
						console.log(req.url)
						//res.redirect();
					}).error(function(err){
						console.log(err);
					});
				}
			});
		}
	});

});


/* End User Profile */

/* GET users listing. */
router.get('/', function(req, res, next) {
	
	//console.log("retorno " + req.isAuthenticated());
	
	var posts = req.user.posts;
	var id = req.user._id;
	//console.log(req.user.posts);
	//console.log(req.user._id);
	var db = req.db;
	var users = db.get('users');
	var dashboard = db.get('dashboard');


	//Set adversiting
	var ads = db.get('abmhome');

	//req.app.locals.functions = functions; //lifeline
	res.locals.functions = functions;

	dashboard.find({}, function(err, items){
        if(err) {
          console.log(err)
        }

        else{
          
          //limitar x posts
			var post = items.reverse();
			res.render('libro', {
				web: req.user.name +" " + "Mi Libro - Viainti tu libro viajero",
				nombre: req.user.name,
				avatar: req.user.photo,
				imagenpost: 'hola',
				id: req.user._id,
				posts: post
			});

			
        }
     });

	console.log('mostrando posts');
    
	/*users.find({}, function(err, items){
		if(err){
			return err;
		}
		else {
			

			res.render('libro', {
				web: req.user.name +" " + "Mi Libro - Viainti tu libro viajero",
				nombre: req.user.name,
				avatar: req.user.photo,
				imagenpost: 'hola',
				id: req.user._id,
				posts: it
			});

		}
	});

	/*users.find({}, {posts: true})
		.success(function(data){
			for(var i = 0; i < data.length; i++) {
				console.log(data[i].posts);

				res.render('libro', {
					web: req.user.name +" " + "Mi Libro - Viainti tu libro viajero",
					nombre: req.user.name,
					avatar: req.user.photo,
					imagenpost: 'hola',
					id: req.user._id,
					posts: data[i].posts
				});

			}
		});
	*/

	/*ads.find({}, function(err, result){
		console.log('hola edinson');
		if(err){
			return err;
		}
		else {
			res.render('libro-ads', {
				nameAds: 'hola'
			});
		}
	});*/
	

});

router.post('/post', multipartMiddleware, function(req, res, next) {
	
	var db = req.db;
	var users = db.get('users');

	var dashboard = db.get('dashboard');

	var id = req.user._id;
	//var text = req.body.text;
	var text = req.body.mensajepost;

	var date = new Date();
	var time = date.getTime();
	

	var imgPost = req.files.imagen.name;
	var videoPost = req.files.videon.name;
	
	if(imgPost.length>1 && videoPost.length>1){
		imgUpload(false);
	}else{
		if(imgPost.length>1){
		imgUpload(true);
		}
		if(videoPost.length>1){
			videoUpload();
		}
	}
	if(imgPost.length==0 && videoPost.length==0){
		userModifide();
	}
	
	function imgUpload(status){
		fs.readFile(req.files.imagen.path, function(err, data){
				var nombreImagen = req.files.imagen.name;
				//console.log('nombre de la imagen: ' + nombreImagen);
				if(err){
					console.log('sucedio un error: ' + err);
				}
				else {

					var newDirectory = path.join(__dirname, '..', 'public/', 'uploads/usuarios/', nombreImagen);

					fs.writeFile(newDirectory, data, function(err){
						if(err){
							console.log('hubo un error: '+ err);
						}
						else {
							
							nameToImg = nombreImagen;
							if(status){
								userModifide();
							}else{
								videoUpload();
							}
							
						}
					})
				}
			});

	}

	function videoUpload(){
		fs.readFile(req.files.videon.path, function(err, data){
						var nombreVideon = req.files.videon.name;
						//console.log('nombre de la imagen: ' + nombreImagen);
						if(err){
							console.log('sucedio un error: ' + err);
						}
						else {

							var newDirectory = path.join(__dirname, '..', 'public/', 'uploads/videos/', nombreVideon);

							fs.writeFile(newDirectory, data, function(err){
								if(err){
									console.log('hubo un error: '+ err);
								}
								else {
									
									nameToVideo = nombreVideon;
									userModifide();
									
								}
							})
						}
					});
	}
	
	function userModifide(){
		
		var idGenerate = shortid.generate();

		users.findAndModify({
				query: {"_id": id },
				update: {
					$push: {
						"posts": {
								id: idGenerate,
			                    content: text,
			                    imagen: imgPost,
			                    videon: videoPost,
			                    date: time,
			                    type: 1,
			                    comentarios: Array,
			                    likes: Array
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
					imagen: imgPost,
					videon: videoPost,
					content: text,
		            date: time,
					state: true
				});
			}).error(function(err) {
				res.json({err: err});
		});

		dashboard.insert({
			id: idGenerate,
			usuarioFoto: req.user.photo,
			usuarioName: req.user.name,
			usuarioId: req.user._id,
			content: text,
			imagen: imgPost,
			videon: videoPost,
			date: time,
			type: 1,
			comentarios: Array,
			likes: Array
		});

	}
	
	

})
module.exports = router;
