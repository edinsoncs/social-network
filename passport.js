var mongoose = require('mongoose');
var User = mongoose.model('User');

var path = require('path');

var fs = require('fs');

var UserDetails = mongoose.model('userInfo');
// Estrategia de autenticación con Twitter
var TwitterStrategy = require('passport-twitter').Strategy;
// Estrategia de autenticación con Facebook
var FacebookStrategy = require('passport-facebook').Strategy;

var LocalStrategy = require('passport-local').Strategy;
// Fichero de configuración donde se encuentran las API keys
// Este archivo no debe subirse a GitHub ya que contiene datos
// que pueden comprometer la seguridad de la aplicación.
//var config = require('./config');

// Exportamos como módulo las funciones de passport, de manera que
// podamos utilizarlas en otras partes de la aplicación.
// De esta manera, mantenemos el código separado en varios archivos
// logrando que sea más manejable.
module.exports = function(passport) {

    // Serializa al usuario para almacenarlo en la sesión
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // Deserializa el objeto usuario almacenado en la sesión para
    // poder utilizarlo
    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    // Configuración del autenticado con Twitter
    passport.use(new TwitterStrategy({
        consumerKey      : "qRzI4I1nL52dPRxNf0w1v4Sp1",
        consumerSecret  : "dbP5zWL2vP2RiwFHhj8TdTQq6jeoyJNsYyFA8rEiiYFwX3Qorq",
        callbackURL      : '/auth/twitter/callback'
    }, function(accessToken, refreshToken, profile, done) {
        // Busca en la base de datos si el usuario ya se autenticó en otro
        // momento y ya está almacenado en ella
        User.findOne({provider_id: profile.id}, function(err, user) {
            if(err) throw(err);
            // Si existe en la Base de Datos, lo devuelve
            if(!err && user!= null) return done(null, user);
            console.log(profile);
            // Si no existe crea un nuevo objecto usuario
            var user = new User({
                provider_id : profile.id,
                provider: profile.provider,
                token: accessToken,
                name: profile.displayName,
                photo: profile.photos[0].value,
                contenido: {
                    post: {
                        idPost: 0,
                        date: 'Reciente',
                        post: 'Hola gracias por unirte a viainti, disfruta de nuestra plataforma, viaja por el mundo con información exacta, escribe tu primer viaje y que conocistes. ',
                        imagen: 'http://www.que.es/archivos/201507/foodporn_nor-672xXx80.jpg'
                    }
                }     

            });
            //...y lo almacena en la base de datos
            user.save(function(err) {
                if(err) throw err;
                done(null, user);
            });
        });
    }));
    

    //Helpers
        //picture.type(large) para passport tomar la foto mas grande
    // Configuración del autenticado con Facebook
    passport.use(new FacebookStrategy({
        clientID : "892816844120117",
        clientSecret: "f5b63f25ef70c9f64704161cdeab6bc9",
        callbackURL : '/auth/facebook/callback',
        profileFields : ['id', 'displayName',/*'provider',*/ 'picture.type(large)', 'emails']
    }, function(accessToken, refreshToken, profile, done) {
        // El campo 'profileFields' nos permite que los campos que almacenamos
        // se llamen igual tanto para si el usuario se autentica por Twitter o
        // por Facebook, ya que cada proveedor entrega los datos en el JSON con
        // un nombre diferente.
        // Passport esto lo sabe y nos lo pone más sencillo con ese campo

        User.findOne({provider_id: profile.id}, function(err, user) {
            if(err) throw(err);
            if(!err && user!= null) return done(null, user);

            // Al igual que antes, si el usuario ya existe lo devuelve
            // y si no, lo crea y salva en la base de datos
            var user = new User({
                provider_id: profile.id,
                provider: profile.provider,
                token: accessToken,
                name: profile.displayName,
                photo: profile.photos[0].value,
                //cover: path.join(__dirname, '/uploads/coverusuarios/coverviainti.jpg'),
                cover: 'http://cooldpandcovers.weebly.com/uploads/1/7/7/7/17779915/7193211_orig.jpg',
                email: profile.emails[0].value,
                /*posts: {
                    id: 0,
                    content: 'Hola gracias por unirte a viainti, disfruta de nuestra plataforma, viaja por el mundo con información exacta, escribe tu primer viaje y que conocistes. ',
                    imagen: 'http://www.que.es/archivos/201507/foodporn_nor-672xXx80.jpg',
                    date: 0,
                    type: 1
                } */            
            });
            user.save(function(err) {
                if(err) throw err;
                done(null, user);
            });
        });
    }));

    // Configuracion del autenticado local
    passport.use(new LocalStrategy(function(username, password, done) {
      process.nextTick(function() {
        UserDetails.findOne({
          'username': username, 
        }, function(err, user) {
          if (err) {
            return done(err);
          }

          if (!user) {
            return done(null, false);
          }

          if (user.password != password) {
            return done(null, false);
          }

          return done(null, user);
        });
      });

    }));
           

};

