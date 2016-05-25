var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('vuelosViajes', {
  	web: "Viajes - Viainti tu libro viajero",
  	nombre: req.user.name,
  	avatar: req.user.photo

  });
});

router.get('/listado', function(req, res, next){
	res.render('listadoVuelos', {
		web: "Viajes - Viainti tu libro viajero",
	  	nombre: req.user.name,
	  	avatar: req.user.photo
	 });
});

module.exports = router;
