var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userAdmin = new Schema ({
	username: String,
	password: String,
	},
	{
		collection: 'usuarioAdmin'
	});

var userDetails = mongoose.model('userAdmin', userAdmin);