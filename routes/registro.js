var express = require('express');
var router = express.Router();

var passport = require('passport');

var usuarioLocal = require('../models/local');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('registro', { web: 'Registrate - Viainti Tu Libro Viajero' });
});

router.post('/newuser', function(req, res, next){

	usuarioLocal.register(new Account({ username: req.body.username}), req.body.password, function(err, account){
		if(err){
			console.log(err);
		}
		else {
			 passport.authenticate('local')(req, res, function () {
	           console.log('registrado');
	         });
		}
	});


});

module.exports = router;
