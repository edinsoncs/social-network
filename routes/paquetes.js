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


router.get('/', function(req, res, next){
	
	res.render('paquetes', {title: 'La mejor variedad de paquetes turisticos - Viainti'});

});

router.get('/:paquetetitle', function(req, res, next){
	var query = require('url').parse(req.url,true).query;
	var a = req.params.paquetetitle;
	var id = query.id;

	var db = req.db;
	var collection = db.get('paquetes');


	/*collection.find({"_id":id}).success(function(err, doc){
		console.log(doc._id);
	})*/
    


	collection.findOne({ "_id": id }, function(err, doc){
    	
		//var key = doc.forEach(function(data){console.log(data.Titulo);});

        if(err){
            return err
        }

    	else {
            function price(){
                return Number(doc.Precio);
            }
            var preference = {
                "items": [{
                        "title": doc.Titulo,
                        "quantity": 1,
                        "currency_id": "ARS",
                        "unit_price": price()
                }]
            };

            mp.createPreference (preference, function (err, data){
                    if (err) {
                        res.send (err);
                    } else {

                             res.render('paquetePage', {
                                    title: id,
                                    titulo: doc.Titulo,
                                    precio: doc.Precio,
                                    dateida: doc.DateIda,
                                    datellegada: doc.DateLlegada,
                                    imagenCover: doc.ImagenCover,
                                    pais: doc.Paises,
                                    personas: doc.CantidadPersonas,
                                    pasaje: doc.Pasaje,
                                    mobilidad: doc.Mobilidad,
                                    hotel: doc.Hotel,
                                    seguroMedico: doc.SeguroMedico,
                                    Contenido: doc.Contenido,
                                    Payment: data,
                                    name: "Viainti"
                        });

                      
                    }
            });

            

           


                
        }

    	//console.log(doc.Titulo)
    	
	});
	
 	//var data = collection.find({"_id": id});

 	//console.log(data);

	//res.render('paquetePage', {title: a, name: "Web"});
});

module.exports = router;