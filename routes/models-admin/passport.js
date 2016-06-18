var mongoose = require('mongoose');

var UserDetails = mongoose.model('userAdmin');

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
        console.log('edinson');
        console.log(user)
        done(null, user.id);
    });

    // Deserializa el objeto usuario almacenado en la sesión para
    // poder utilizarlo
    passport.deserializeUser(function(obj, user) {
        user(null, obj);
    });


  

    // Configuracion del autenticado local
    passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },function(username, password, done) {
      process.nextTick(function() {
        UserDetails.findOne({
          'email': username,
          'password': password
        }, function(err, user) {
           if(err) {
              return done(err)
            }
            if(!user) {
              return done(null, false);
            }
            if(user.password != password) {
              return done(null, false);
            }
            return done(null, user);
        });
      });

    }));
           

};

