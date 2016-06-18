var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userAdmin = new Schema({
	username: String,
	password: String,
	servicio: String,
	publicaciones: Array
	}, {
		collection: 'publicaradmin'
	});


var userDetails = mongoose.model('userAdmin', userAdmin);