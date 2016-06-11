var express = require('express');
var router = express.Router();
var url = require('url');



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('cruceros', {
    web: 'Viainti',
    nombre: req.user.name,
    avatar: req.user.photo,
    id: req.user._id,
    notificaciones: req.user.Notificaciones
 });
});

router.get('/:cruceros', function(req, res, next) {
	var query = url.parse(req.url,true).query;
	var c = req.params.cruceros;
	var id = query.id;

	var db = req.db;

	var collection = db.get('cruceros');

	collection.findOne({"_id": id}, function(err, doc) {
		res.render('crucerosPage', {
			title: id,
    		titulo: doc.Titulo,
    		precio: doc.Precio,
    		dateida: doc.FechaIda,
    		datellegada: doc.FechaLlega,
    		imagenCover: doc.CoverImagen,
    		pais: doc.Paises,
    		personas: doc.Personas,
    		pasaje: doc.Pasaje,
    		mobilidad: doc.Mobilidad,
    		hotel: doc.Hotel,
    		seguroMedico: doc.SeguroMedico,
    		Contenido: doc.Contenido,
            nombre: req.user.name,
            avatar: req.user.photo,
            id: req.user._id,
            notificaciones: req.user.Notificaciones,
    		name: "Viainti"
		});
	});


});

module.exports = router;
