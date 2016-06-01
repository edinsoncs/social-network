var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserDetail = new Schema({
      username: String,
      password: String,
      email: String,
      photo: 'String',
      cover: String,
      posts: [{
			id: Number,
			content: String,
			imagen: String,
			videon: String,
			date: Number,
			type: Number,
			comentarios: Array,
			likes: Array
	   }], // {type}
	   Actividades: Array,
	   InvitacionesEnviadas: Array,
	   Amigos: Array,
	   Notificaciones: Array

    }, {
      collection: 'users'
    });

var UserDetails = mongoose.model('userInfo', UserDetail);

