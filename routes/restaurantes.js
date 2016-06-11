var express = require('express');
var router = express.Router();
var url = require('url');

/* GET users listing. */
router.get('/:geo/', function(req, res, next) {
  
  var db = req.db;
  var rest = db.get('restaurantes');

  var isGeo = req.params.geo;

  var isGeoReplace = isGeo.replace('-', ' ');


  rest.find({'Ubicacion': isGeoReplace}, function(err, comida){
    if(err){
       throw err;
    }
    else {

      if(comida.length > 0 ){
        res.render('restaurantes', {
          web: 'Restaurantes - Viainti tu libro viajero',
          nombre: req.user.name,
          avatar: req.user.photo,
          listRest: comida,
          notificaciones: req.user.Notificaciones
       });
        console.log(req.user.Notificaciones);
      }
      else {
        res.render('errorHoteles', {
          web: 'Hoteles - Viainti tu libro viajero',
          nombre: req.user.name,
          avatar: req.user.photo
       });
      }
      
      
    }
  });



  
});

router.get('/show/:namehotel', function(req, res, next){
  var urlActual = req.url; 
  var toUrl = url.parse(urlActual, true).query;

  function idRest(id){
    return id;
  }

  var db = req.db;
  var collection = db.get('restaurantes');

  collection.findOne({'_id': idRest(toUrl.id)}, function(err, doc){
      var inPostHotel;
      if(err){
        console.log(err);
      }
      else {
        inPostHotel = doc.Post;
        res.render('restaurantesProfile', { layout: 'layout',
            web: 'Restaurantes - Viainti tu libro viajero',
            nombre: req.user.name,
            avatar: req.user.photo,
            nombreHotel: doc.Nombre,
            fotoHotel: doc.Imagen,
            coverHotel: doc.Cover,
            destHotel: doc.Descripccion,
            ubiHotel: doc.Ubicacion,
            direHotel: doc.Direccion,
            latHotel: doc.Latitud,
            lonHotel: doc.Longitud,
            id: req.user._id,
            notificaciones: req.user.Notificaciones,
            posts: inPostHotel
        });
      }
  });


  /**/
})



module.exports = router;
