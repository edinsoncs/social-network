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

//var nuevoplan = require('../moduls/nuevoplan');


/*Geolocation*/




//add var globals
var nameToImg = '';
var nameToVideo = '';
/*router.get('/:users', function(req, res, next) {
    //console.log("tesssssssst y");

    var db = req.db;

    var collection = db.get('users');

    collection.find({}, { sort: { points: 1 } }, function(err, doc) {
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
    });
});
*/


/* Start User Profile */
router.get('/u/:id', function(req, res, next) {
    var db = req.db;
    var usuarios = db.get('users');
    var idUser = req.params.id;

    res.locals.functions = functions;


    usuarios.findById(idUser, function(err, post) {


        if (err) {
            console.log(err);
        } else {

            var postUser = post.posts.reverse();
            console.log(postUser);
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

router.post('/u/postprofile/', function(req, res, next) {
    var idPost = req.body.id;
    var mensaje = req.body.mensaje;
    var idUsuarioFind = req.body.idUsuario;

    var db = req.db;
    var comentarios = db.get('users');
    var dashboard = db.get('dashboard');

    comentarios.findAndModify({
        query: {
            '_id': idUsuarioFind,
            posts: {
                $elemMatch: { 'id': idPost }
            }
        },
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

    }).success(function(doc) {
        /*res.json({
        			userData: {
        				name: doc.userName,
        				photo: doc.userPhoto
        			},
        			userPost: doc.userComment,
                    date: doc.userTime,
        			state: true
        });*/
        console.log('funciono');
        res.json({ inserted: true });

    }).error(function(err) {
        if (err) {
            console.log(err);
        }
    });

});


router.post('/u/postprofilenotificaciones/', function(req, res, next) {

    var idPost = req.body.id;

    var mensaje = req.body.mensaje;
    var idUsuarioFind = req.body.idUsuario;

    var db = req.db;
    var notificaciones = db.get('users');


    notificaciones.findAndModify({
        query: { '_id': idUsuarioFind },
        update: {
            $push: {
                'Notificaciones': {
                    'userId': req.user._id,
                    'userComment': mensaje,
                    'userName': req.user.name,
                    'userPhoto': req.user.photo,
                    'userTime': new Date()
                }
            }
        },
        new: true

    }).success(function(doc) {
        res.json({ inserted: true });
    }).error(function(err) {
        if (err) {
            console.log(err);
        }
    });


    /*if(idUsuarioFind !== req.user._id) {
    	notificaciones.findAndModify({
    		 query: { '_id': idUsuarioFind},
    		 update: {
    		 		$push: {
    		 			'Notificaciones': {
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
    		console.log('se agrego notificacion');

    		res.json({inserted: true});
    		
    	}).error(function(err){
    		if(err){
    			console.log(err);
    		}
    	});
    }
    else {
    	console.log('bla');
    }

    */


});


router.post('/u/dashboardpost/', function(req, res, next) {

    var idPost = req.body.id;
    var mensaje = req.body.mensaje;
    var idUsuarioFind = req.body.idUsuario;

    var db = req.db;
    var comentarios = db.get('users');
    var dashboard = db.get('dashboard');


    dashboard.findAndModify({
        query: { 'id': idPost },
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

    }).success(function(doc) {
        res.json({
            userData: {
                name: req.user.name,
                photo: req.user.photo,
                iduser: doc.usuarioId
            },
            userPost: mensaje,
            date: doc.date,
            state: true
        });




    }).error(function(err) {
        if (err) {
            console.log(err);
        }
    });

});


router.post('/u/likecoments/', function(req, res, next) {



    var idPost = req.body.id;
    var idUsuarioFind = req.body.idUsuario;
    var like = req.body.like;

    var db = req.db;
    var user = db.get('users');
    var dashboard = db.get('dashboard');


    user.findAndModify({
        query: {
            '_id': idUsuarioFind,
            posts: {
                $elemMatch: { 'id': idPost }
            }
        },
        update: {
            $push: {
                'posts.$.likes': {
                    'cantidad': like,
                    'id': idUsuarioFind,
                    'idusuario': req.user._id,
                    'idpost': idPost,
                    'usuarioname': req.user.name,
                    'usuariophoto': req.user.photo,
                    'time': new Date()
                }
            }
        },
        new: true

    }).success(function(doc) {
        //console.log('funcionoo');
        res.json({ inserted: true })

    }).error(function(err) {
        if (err) {
            console.log(err);
        }
    });

    dashboard.findAndModify({
        query: { 'id': idPost },
        update: {
            $push: {
                'likes': {
                   'cantidad': like,
                    'id': idUsuarioFind,
                    'idusuario': req.user._id,
                    'idpost': idPost,
                    'usuarioname': req.user.name,
                    'usuariophoto': req.user.photo,
                    'time': new Date()
                }
            }
        },
        new: true

    }).success(function(doc) {
        //console.log('funcionoo');

    }).error(function(err) {
        if (err) {
            console.log(err);
        }
    });




});



router.post('/u/post', multipartMiddleware, function(req, res, next) {
    var db = req.db;
    var user = db.get('users');

    var id = req.user._id;

    var nameImagen = req.files.cover.name;

    fs.readFile(req.files.cover.path, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            //console.log('edinson este id es');

            var idRefresh = req.user._id;

            var coverSave = path.join(__dirname, '..', 'public/uploads/', 'coverusuarios/' + nameImagen);
            //var coverSave = __dirname + '../../public/uploads/coverusuarios/' + nameImagen;

            fs.writeFile(coverSave, data, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    user.findAndModify({
                        query: { '_id': id },
                        update: {
                            $set: {
                                cover: nameImagen
                            }
                        },
                        new: true
                    }).success(function(doc) {
                        /*res.json({
                        	'nameResult': 'Se Actualizo Correctamente',
                        });*/
                        console.log(idRefresh);
                        res.redirect(idRefresh);

                        //res.redirect();
                    }).error(function(err) {
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

    dashboard.find({}, function(err, items) {
        if (err) {
            console.log(err)
        } else {



            var post = items.reverse();
            res.render('libro', {
                web: req.user.name + " " + "Mi Libro - Viainti tu libro viajero",
                nombre: req.user.name,
                avatar: req.user.photo,
                imagenpost: 'hola',
                id: req.user._id,
                notificaciones: req.user.Notificaciones,
                posts: post
            });

        }
    });

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

    if (imgPost.length > 1 && videoPost.length > 1) {
        imgUpload(false);
    } else {
        if (imgPost.length > 1) {
            imgUpload(true);
        }
        if (videoPost.length > 1) {
            videoUpload();
        }
    }
    if (imgPost.length == 0 && videoPost.length == 0) {
        userModifide();
    }

    function imgUpload(status) {
        fs.readFile(req.files.imagen.path, function(err, data) {
            var nombreImagen = req.files.imagen.name;
            //console.log('nombre de la imagen: ' + nombreImagen);
            if (err) {
                console.log('sucedio un error: ' + err);
            } else {

                var newDirectory = path.join(__dirname, '..', 'public/', 'uploads/usuarios/', nombreImagen);

                fs.writeFile(newDirectory, data, function(err) {
                    if (err) {
                        console.log('hubo un error: ' + err);
                    } else {

                        nameToImg = nombreImagen;
                        if (status) {
                            userModifide();
                        } else {
                            videoUpload();
                        }

                    }
                })
            }
        });

    }

    function videoUpload() {
        fs.readFile(req.files.videon.path, function(err, data) {
            var nombreVideon = req.files.videon.name;
            //console.log('nombre de la imagen: ' + nombreImagen);
            if (err) {
                console.log('sucedio un error: ' + err);
            } else {

                var newDirectory = path.join(__dirname, '..', 'public/', 'uploads/videos/', nombreVideon);

                fs.writeFile(newDirectory, data, function(err) {
                    if (err) {
                        console.log('hubo un error: ' + err);
                    } else {

                        nameToVideo = nombreVideon;
                        userModifide();

                    }
                })
            }
        });
    }

    function userModifide() {

        var idGenerate = shortid.generate();

        users.findAndModify({
            query: { "_id": id },
            update: {
                $push: {
                    "posts": {
                        id: idGenerate,
                        idUser: req.user._id,
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
            res.json({ err: err });
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



});


router.get('/ultimate/3xa04c/', function(req, res, next) {
    var db = req.db;
    var ultimate = db.get('lastedservices');

    ultimate.find({}, function(err, doc) {
        var reverse = doc.reverse();
        res.json(reverse);
    })
});

router.get('/miservicios', function(req, res, next) {
	
    res.render('miservicios', {
        web: req.user.name + " " + "Mi Servicios - Viainti tu libro viajero",
        nombre: req.user.name,
        avatar: req.user.photo,
        id: req.user._id,
        notificaciones: req.user.Notificaciones,
        permisoServicios: req.user.permisoServicios,
        activeService: req.user.activeService,
        category: req.user.miServicio
    });

   
});

router.post('/solicitud', function(req, res, next){
	var db = req.db;
	var user = db.get('users');

	var serviciosolicitado = req.body.miservicioresponse;

	user.findAndModify({
		query: {
			'_id': req.user._id
		},
		update: {
			$set: {
				'permisoServicios': true,
				'miServicio': serviciosolicitado,
				'activeService': false
			}
		},
		new: true
	}).success(function(resultado){
		res.redirect('./miservicios');
	});

});


/*router.get('/nuevo/plan', function(req, res, next){
    nuevoplan(req, res, next);
});*/


module.exports = router;
