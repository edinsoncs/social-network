var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){


	res.render('gracias', {
		web: 'Gracias por su visita - Viainti',
		agradecer: 'Te esperamos pronto'
	})

});

 module.exports = router;