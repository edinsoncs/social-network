var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('registro', { web: 'Registrate - Viainti Tu Libro Viajero' });
});

module.exports = router;
