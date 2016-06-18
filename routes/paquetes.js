var express = require('express');
var router = express.Router();


var MP = require('mercadopago');

var mp = new MP("8415390906318501", "5HHpyXdBIDTWZv3QpudlIMs0PEoNnL1c");


/*function paymentMercadopago(title, cantidad, precio) {
 
    var preference = {
            "items": [
                {
                    "title": title,
                    "quantity": cantidad,
                    "currency_id": "ARS",
                    "unit_price": precio
                }
            ]
        };

    accept(preference);
}


function accept(pref) {
    console.log(pref);
    mp.createPreference(pref, function (err, data){
        if (err) {
            res.send (err);
        } else {
            console.log('funciono');
            console.log(data);
        }
    });
}*/


router.get('/:numberpaquete', function(req, res, next){
	
	var db = req.db;
    var paquetes = db.get('paquetes');

    var estado = req.params.numberpaquete;
  
    var cantidadLimite = 10;

    var paginator = Number(estado) * cantidadLimite;


    paquetes.find({}, {skip: paginator, limit: cantidadLimite}, function(err, doc){
        if(err){
            throw err;
        }
        else {
            console.log(doc);

             res.render('paquetes', {
                title: 'La mejor variedad de paquetes turisticos - Viainti',
                nombre: req.user.name,
                avatar: req.user.photo,
                id: req.user._id,
                notificaciones: req.user.Notificaciones,
                paquetes: doc
            });
           
        }
    });

    

    

});

router.get('/view/:paquetetitle', function(req, res, next){
	var query = require('url').parse(req.url,true).query;
	var a = req.params.paquetetitle;
	var id = query.id;

	var db = req.db;
	var collection = db.get('paquetes');


	collection.findOne({ "_id": id }, function(err, doc){
        if(err){
            return err
        }
    	else {
          
           res.render('paquetePage', {
                paquete: doc,
                nombre: req.user.name,
                avatar: req.user.photo,
                id: req.user._id,
                notificaciones: req.user.Notificaciones,
                name: "Viainti"
            });
                
        }

    	
	});

});

module.exports = router;