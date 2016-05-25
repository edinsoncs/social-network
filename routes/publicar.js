var express = require('express');
var router = express.Router();

//Import passport
var passport = require('passport');

//Import passport-local
var LocalStrategy = require('passport-local').Strategy;

var bodyParser = require('body-parser');


var formMulti = require('connect-multiparty');

var form = formMulti();

var fs = require('fs');

var path = require('path');

//Initialize passport
router.use(passport.initialize());
router.use(passport.session());

var expressSession = require('express-session');
var cookieParser = require('cookie-parser');

require('./models-admin/login-local');

require('./models-admin/passport')(passport);

router.use(expressSession({ 
  secret: 'ilovescotchscotchyscotchscotch',  
  resave: false, 
  saveUninitialized: true, 
  cookie:{
     maxAge : 360000000000 // one hour in millis
   }
 }));


/*validation url*/

function permisosRoot(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	else {
		console.log('fallo en routes/publicar linea 38 login');
	}

}


/* GET users listing. */
router.get('/', function(req, res, next) {

  res.header('Access-Control-Allow-Credentials', 'true');

  res.render('Publicar', {title: 'Publicar - Viainti'});
  
  console.log(req.cookies);
  next();
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/publicarviainti/admin/',
    failureRedirect: '/incorrecto'
}))

router.get('/admin', permisosRoot, function(req, res, next) {
	res.render('admin', {title: 'Administrador - Viainti'});
	console.log('estoy aqui');
	next();
});

router.get('/vuelos', permisosRoot, function(req, res, next) {
	res.render('vuelos', {title: 'Vuelos - Administrator Viainti'});
	next();
});

router.get('/cruceros', permisosRoot, function(req, res, next) {
	res.render('crucerosBackend', {title: 'Cruceros - Administrador Viainti'});
	next();
});

router.get('/hoteles', permisosRoot, function(req, res, next) {
	res.render('hotelesBackend', {title: 'Hoteles - Administrador Viainti'});
	next();
});

router.get('/restaurantes', permisosRoot, function(req, res, next){
	res.render('restaurantesBackend', {
		title: 'Restaurantes - Administrador Viainti'
	})
	next();
});


//ABM DEVELOPER

router.post('/abm-home', form, function(req, res, next){

	
	var db = req.db;

	var collection = db.get('abmhome')

	var namearchivoimg = req.files.archivo.name;

	fs.readFile(req.files.archivo.path, function(err, imagenBinario){
		if(err) {
			return err;
		}
		else {

			var saveimg = path.join(__dirname, '..', 'public/uploads/', 'adversiting/' + namearchivoimg);

			fs.writeFile(saveimg, imagenBinario, function(err){
				if(err){
					return err;
				}
				else {

					collection.insert({
						'name': req.body.title,
						'subtitle': req.body.subtitle,
						'imagen': req.files.archivo.name
					}).success(function(data){
						res.json({inserted: true});

					}).error(function(err){
						console.log(err);
					});

				}

			});
		}
	});

	/**/


});





module.exports = router;
