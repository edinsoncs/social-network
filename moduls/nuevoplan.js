"use strict";

module.exports = (req, res, next) => {

    res.render('nuevoplan', {
        web: req.user.name + " " + "Mi Libro - Viainti tu libro viajero",
        nombre: req.user.name,
        avatar: req.user.photo,
        imagenpost: 'hola',
        id: req.user._id,
        notificaciones: req.user.Notificaciones
    });

}
