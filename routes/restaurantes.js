var express = require('express');
var router = express.Router();
var url = require('url');



router.get('/', function(req, res, next){
  
  res.render('restUnique', {
    title: 'Restaurantes - Viainti tu libro viajero',
    nombre: req.user.name,
    avatar: req.user.photo,
    notificaciones: req.user.Notificaciones
  });

});

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
        res.render('errorRest', {
          web: 'Restaurantes - Viainti tu libro viajero',
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
      var inPostRest;
      if(err){
        console.log(err);
      }
      else {
        inPostRest = doc.Post;
        res.render('restaurantesProfile', { layout: 'layout',
            web: 'Restaurantes - Viainti tu libro viajero',
            nombre: req.user.name,
            avatar: req.user.photo,
            nombreRest: doc.Nombre,
            fotoRest: doc.Imagen,
            coverRest: doc.Cover,
            destRest: doc.Descripccion,
            ubiRest: doc.Ubicacion,
            direRest: doc.Direccion,
            latRest: doc.Latitud,
            lonRest: doc.Longitud,
            id: req.user._id,
            tel: doc.Tel,
            notificaciones: req.user.Notificaciones,
            posts: inPostRest
        });
      }
  });


  /**/
})



module.exports = router;
