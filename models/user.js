// Modelo Usuario para la base de datos

// Mongoose es una libreria de Node que nos permite
// conectarnos a una base de datos MongoDB y modelar un esquema
// para ella.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Campos que vamos a guardar en la base de datos
var UserSchema = new Schema({
	name: String, // Nombre del usuario
	provider: String, // Cuenta del usuario (Twitter o Facebook en este ejemplo)
	provider_id : {type: String, unique: true}, // ID que proporciona Twitter o Facebook
	email: { type : String , lowercase : true},
	photo : String, // Avatar o foto del usuario
	cover: String,
	email: String,
	token: String,
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
	Notificaciones: Array,
	permisoServicios: false,
	miServicio: String,
	activeService: false,
	createdAt : {type: Date, default: Date.now} // Fecha de creación
});




// Exportamos el modelo 'User' para usarlo en otras
// partes de la aplicación
var User = mongoose.model('User', UserSchema);

