module.exports = {
	elapsedTime: function (datetime) {
	    var date = new Date();
	    var time = date.getTime();

	    var elapsed = parseInt(time - datetime);

	    var minute = 60 * 1000;
	    var hour = minute * 60;
	    var day = hour * 24;
	    var year = day * 365;
	    
	    var month = day * 30;
		if (elapsed < minute) {
			var text = 'hace un momento';   
		} else if (elapsed < hour) {
			var text = 'hace ' + Math.round(elapsed / minute) + ' minutos';   
		} else if (elapsed < day) {
			var text = 'hace ' + Math.round(elapsed / hour ) + ' horas';   
		} else if (elapsed < month) {
			var text = 'hace ' + Math.round(elapsed / day) + ' dias';   
		} else {

			var date = new Date(datetime);

			var minuto = date.getMinutes();
			var hora = date.getHours();
			var dia =  date.getDay();
			var mes =  date.getMonth();
			var year = date.getYear();

			var dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
			var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Novienbre", "Diciembre"];

			var text = dias[dia] + ', ' + date.getDate() + ' de ' + meses[mes].toLowerCase() + ' a las ' + this.addZero(hora) + ':' + this.addZero(minuto);   
		}

	  return text;
	},
	addZero: function (n) {
	    if (n < 10) {
	        var n = "0" + n;
	    }
	  return n;
	}
};