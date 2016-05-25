var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { web: 'Viainti Tu Libro Viajero' });
});

module.exports = router;
