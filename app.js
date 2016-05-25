var express = require('express');
var cookieParser = require('cookie-parser');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var flash    = require('connect-flash');


var passport = require('passport');
var expressSession = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;




// Importamos el modelo usuario y la configuración de passport
require('./models/user');
require('./models/local');
require('./passport')(passport);


var mongodb = require('mongodb');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var monk = require('monk');
var db = monk("localhost:27017/vuelos");
var multer  = require('multer');
var subida = multer({dest: 'archivos/'});

var routes = require('./routes/index');
var users = require('./routes/users');

var places = require('./routes/places');

/*Publicar Admin Paquetes, Cruceros*/
var publicar = require('./routes/publicar');

/*Publicar en perfiles personales*/
var pUsuarios = require('./routes/ajax/post');
/*mildwares registro*/
var registro = require('./routes/registro');
var registrando = require('./routes/registrando');

/*mildwares plataforma*/
var libro = require('./routes/libro');

/*Vistas al frontend */
var hoteles = require('./routes/hoteles.js');
//var hotelesprofile = require('./routes/hotelesprofile.js');
var restaurantes = require('./routes/restaurantes.js');
var vuelos = require('./routes/vuelos.js');
var paquetes = require('./routes/paquetes.js');
var cruceros = require('./routes/cruceros.js');

/*Peticion al servidor desde el cliente*/
var acceso = require('./routes/acceso.js');
var addPaquetes = require('./routes/addpaquetes.js');
var addCruceros= require('./routes/addcruceros.js');

/*Restaurantes y Hoteles*/
var addHotel = require('./routes/add/hoteles');
var addRestaurantes = require('./routes/add/restaurantes');


/*Posts Users send invitation*/
var invitacionFriend = require('./routes/add/addfriend');
var otherfriend = require('./routes/add/other');


/*Others Routes*/
var gracias = require('./routes/gracias');


var app = express();

/*Iniciamos con socket*/
var io = require('socket.io');

var io = io();
app.io = io;

var socketIniatialize = require('./moduls/socket')(io);
/*End con socket*/





/*var socketIniatialize = require('./moduls/socket');
socketIniatialize('edinson');
*/

/*Conectado a la db con monk*/
app.use(function(req,res,next){
  req.db = db;
  next();
});

/*conectando a la db con mongoose*/
mongoose.connect('mongodb://localhost:27017/vuelos', 
  function(err, res) {
    if(err) throw err;
    console.log('Conectado con exito a la BD');
});

/*Cookies Login passport local*/
app.use(expressSession({ 
  secret: 'ilovescotchscotchyscotchscotch',  
  resave: false, 
  saveUninitialized: true, 
  cookie:{
     maxAge : 3600000 // one hour in millis
   }
 }));
/*End Cookies*/

/* chat */
var chat = require('./moduls/chat');

/*app.use(function(req, res, next){
  console.log(res);
});*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

//app.use(flash());

/*Activando passport*/
app.use(passport.initialize());
app.use(passport.session());

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  else {
    res.redirect('/registro');
  }
}

/* Rutas de la aplicación */
// Cuando estemos en http://localhost:puerto/ (la raiz) se ejecuta el metodo index
// del modulo 'routes'

//app.use('/libro/, ensureAuthenticated, libro');
//ensureAuthenticated autentificar usuario logeado
app.use('/libro/', ensureAuthenticated, libro);

app.use('/hoteles/', ensureAuthenticated, hoteles);

app.use('/restaurantes/', ensureAuthenticated, restaurantes);

app.use('/users/', users);

app.use('/publicarviainti/', publicar);

app.use('/places/', places);

/*Use Registro*/
app.use('/registro/', registro);
app.use('/add/', registrando);

/*Use Publicaciones*/
app.use('/ajax/post/', pUsuarios);

/*Use Viajes*/
app.use('/acceso/', acceso);
app.use('/vuelos/', ensureAuthenticated, vuelos);
app.use('/paquetes/', ensureAuthenticated, paquetes);
app.use('/addpaquetes/', addPaquetes);
app.use('/addcruceros/', addCruceros);
app.use('/cruceros/', ensureAuthenticated, cruceros);

/*Restaurantes y hoteles*/
app.use('/addhoteles', addHotel);
app.use('/addrestaurantes', addRestaurantes);

/*Send Invitation Friend*/
app.use('/addinvitate', invitacionFriend);
app.use('/otherfriend', otherfriend);


/*Others Routes*/
app.use('/gracias', gracias);


// Ruta para autenticarse con Facebook (enlace de login)
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

// Ruta de callback, a la que redirigirá tras autenticarse con Facebook.
// En caso de fallo redirige a o tra vista '/login'

app.post('/login', passport.authenticate('local', { successRedirect: '/loginSuccess',failureRedirect: '/loginFailure'}));

app.get('/loginDenegado', function(req, res, next) {
  //res.render('loginDenegado', {title: 'Se ha producido un error'});
  res.send("Se ha producido un error, intente nuevamente");
});

app.get('/loginSuccess', function(req, res, next) {
  res.send('Successfully authenticated');
});


app.get('/auth/twitter/callback', passport.authenticate('twitter',
  { successRedirect: '/libro/', 
    failureRedirect: '/registo/' }));

app.get('/auth/facebook/callback', passport.authenticate('facebook',
  { successRedirect: '/libro/', failureRedirect: '/registro/' }
));

app.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/gracias');
});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });

  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//require('routes.js')(app, passport); 





module.exports = app;
