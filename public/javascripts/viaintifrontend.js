$(document).ready(function(){

	$(".aClass").click(function(){
		$(".videoViainti").slideToggle();
	});

	$(".hotelTab").click(function(ocultar){
		var tab = $(".contenidoHome_Tab, .contenidoHome_Tab_Restaurante, .contenidoHome_Tab_Vuelos, .contenidoHome_Tab_Musica, .contenidoHome_Tab_Noticias, .contenidoHome_Tab_Juegos, .contenidoHome_selected_restaurante, .contenidoHome_selected_vuelos, .contenidoHome_selected_musica, .contenidoHome_selected_noticias, .contenidoHome_selected_juegos").hide();
		var tabOn = $(".contenidoHome_Tab_Hotel, .contenidoHome_selected_hotel").show();
		$("tabOn");
	});
	$(".restauranteTab").click(function(ocultar){
		var tab = $(".contenidoHome_Tab, .contenidoHome_Tab_Hotel, .contenidoHome_Tab_Vuelos, .contenidoHome_Tab_Musica, .contenidoHome_Tab_Noticias, .contenidoHome_Tab_Juegos, .contenidoHome_selected_hotel, .contenidoHome_selected_restaurante, .contenidoHome_selected_vuelos, .contenidoHome_selected_musica, .contenidoHome_selected_noticias, .contenidoHome_selected_juegos").hide();
		var tabOn = $(".contenidoHome_Tab_Restaurante, .contenidoHome_selected_restaurante").show();
		$("tabOn");
	});

	$(".vuelosTab").click(function(ocultar){
		var tab = $(".contenidoHome_Tab, .contenidoHome_Tab_Restaurante, .contenidoHome_Tab_Hotel, .contenidoHome_Tab_Musica, .contenidoHome_Tab_Noticias, .contenidoHome_Tab_Juegos, .contenidoHome_selected_hotel, .contenidoHome_selected_restaurante, .contenidoHome_selected_vuelos, .contenidoHome_selected_musica, .contenidoHome_selected_noticias, .contenidoHome_selected_juegos").hide();
		var tabOn = $(".contenidoHome_Tab_Vuelos, .contenidoHome_selected_vuelos").show();

		$("tabOn")
	});
	$(".musicaTab").click(function(ocultar){
		var tab = $(".contenidoHomeTab, .contenidoHome_Tab, .contenidoHome_Tab_Hotel, .contenidoHome_Tab_Restaurante, .contenidoHome_Tab_Vuelos, .contenidoHome_Tab_Noticias, .contenidoHome_Tab_Juegos, .contenidoHome_selected_hotel, .contenidoHome_selected_restaurante, .contenidoHome_selected_vuelos, .contenidoHome_selected_noticias, .contenidoHome_selected_juegos").hide();
		var tabOn = $(".contenidoHome_Tab_Musica, .contenidoHome_selected_musica").show();

		$("tabOn");
	});
	$(".noticiasTab").click(function(ocultar){

		var tab = $(".contenidoHomeTab, .contenidoHome_Tab, .contenidoHome_Tab_Hotel, .contenidoHome_Tab_Restaurante, .contenidoHome_Tab_Vuelos, .contenidoHome_Tab_Musica, .contenidoHome_Tab_Juegos, .contenidoHome_selected_hotel, .contenidoHome_selected_restaurante, .contenidoHome_selected_vuelos, .contenidoHome_selected_musica, .contenidoHome_selected_juegos").hide();
		var tabOn = $(".contenidoHome_Tab_Noticias, .contenidoHome_selected_noticias").show();

		$("tabOn");

	});
	$(".juegosTab").click(function(ocultar){
		var tab = $(".contenidoHomeTab, .contenidoHome_Tab, .contenidoHome_Tab_Hotel, .contenidoHome_Tab_Restaurante, .contenidoHome_Tab_Vuelos, .contenidoHome_Tab_Noticias, .contenidoHome_Tab_Musica, .contenidoHome_selected_hotel, .contenidoHome_selected_restaurante, .contenidoHome_selected_vuelos, .contenidoHome_selected_vuelos, .contenidoHome_selected_musica, .contenidoHome_selected_noticias, .contenidoHome_selected_noticias, .contenidoHome_selected_juegos").hide();
		var tabOn = $(".contenidoHome_Tab_Juegos, .contenidoHome_selected_juegos").show();

		$("tabOn");
	});

	$(".linkLogin").click(function(){
		
		var a = $(".viaRegistro").css("display","none")
		var b = $(".viaLogin").css("display","block");
		if(a === b){
			$("a");
		}
		else {
			$("b");
		}
	});
	$(".linkRegistro").click(function(){
		var a = $(".viaRegistro").css("display","block")
		var b = $(".viaLogin").css("display","none");
		if(a === b){
			$("b");
		}
		else {
			$("a");
		}
	});
	$(".linkRecovery").click(function(){
		$(".resetPasswordBG, .resetPassword").css("display","block");
	});
	$(".resetPasswordBG").click(function(){
		$(".resetPasswordBG, .resetPassword").css("display","none");
	});

	function homeApp () {
		$(".homeBTNTo").hover(function(){
			$(this).find(".iconAnimateTo--Hover").css("display","block");
		},function(){
			$(this).find(".iconAnimateTo--Hover").fadeOut('fast');
		});	
	}

	homeApp();
	
	$("main, .jsUserDown").click(function(){
		$(".menuViainti_ArrowDown--User").hide(10);
	});
	$(".jsUserDown").click(function(){
		$(".menuViainti_ArrowDown--User").show();
		
	});

	function r(){ 

		 /*$(".formRegistro").submit(function(e){
		 		e.preventDefault();
   			
	   			var Register = "../add/registro/";
			 	
			 	$.ajax({
			 		url: Register,
			 		type: "POST",
			 		dataType: "JSON",
			 		contentType: "application/json",
			 		data: JSON.stringify({
			 			username: $("input[name='username']").val(),
			 			email: $("input[name='miemail']").val(),
			 			password: $("input[name='mipassword']").val()
			 			/*apellidos: $("input[name='apellidos']").val(),
			 			email: $("input[name='miemail']").val(),
			 			password: $("input[name='password']").val(),
			 			passwordR: $("input[name='passwordr']").val(),
			 			mes: $("select[name='selectMonth']").val(),
			 			dia: $("input[name='day']").val(),
			 			ano: $("input[name='year']").val()
			 		}),
			 		success: function(data){
			 			console.log(data);

			 			if(data.inserted === true) {
			 				alert("registrado");
			 			}

			 		},
			 		error: function(err){
			 			console.log(err);
			 		}

		 		});

		 });*/

		 $(".menuHome_login").submit(function(e){
		 	
		 	e.preventDefault();

		 	var a = "../add/login/";

		 	$.ajax({
		 		url: a,
		 		type: "POST",
			 	dataType: "JSON",
			 	contentType: "application/json",
			 	data: JSON.stringify({
		 		  nickname: $("input[name='nameLogin']").val(),
		 		  password: $("input[name='password']").val()
		 		}),
		 		success: function(data) {
		 			//console.log("funciona" + data);
		 				 			
		 			if(data.inserted === true) {
		 				alert("Ingresastes");
		 				window.location = "/libro/alberto";
		 			}
		 			else if(data.inserted === null) {
		 				alert("Este usuario no existe");
		 			}

		 			
		 		},
		 		error: function(err) {
		 			console.log("Existe un error" + err);
		 		}
		 	});

		 });

	}
	r();

	/*function p() {

		$(".pubuser").submit(function(e) {
			e.preventDefault();

			var a = "/ajax/post/";

			var imagen = new FormData(document.getElementById("image"));

			$.ajax({
				url: a,
				type: "POST",
				dataType: "JSON",
				enctype: 'multipart/form-data',
				contentType: "application/json",
				data: JSON.stringify({
					text: $('textarea[name="mensajepost"]').val()
				}),
				success: function(data) {
					if(data.state == true) {
						$('.Dashboard_Welcome').after('<article class="Dashboard_Post--User"><article class="Post--User"><div class="Post--User--Date"><div class="Post--Date"><span class="name">' + data.user.name + '</span></div><div class="Post--Date"><span class="date">' + elapsedTime(data.date) + '</span></div></div><figure class="Post--User--Foto margen"><img src="' + data.user.photo + '" alt="" class="User--Foto"></figure></article><article class="Post--User--Txt"><p class="Post--Txt margen">' + data.content + '</p></article><article class="Post--User--Opt"><div class="Post--User--Cont"><div class="Post--User--Like"><div class="User--Like"><div class="Like enLinea"><span class="Like--Num">10</span></div><i class="fa fa-heart"></i></div></div><div class="Post--User--Coment"><div class="User--Coment"><div class="Comment enLinea"><span class="Comment--Num">8</span></div><i class="fa fa-comments"></i></div></div><div class="Post--User-Shared"><div class="User--Shared"><div class="Shared enLinea"><span class="Shared--Num">3</span></div><i class="fa fa-share"></i></div></div></div></article></article>');
						$(".pubuser textarea").val('');
					}
				},
				error: function(err) {
					console.log("esto es un error"+ JSON.stringify(err) );
				}
			});

		});
		


	}
	p();*/


		


});

function elapsedTime(datetime) {

    var date = new Date();
    var time = date.getTime();

    var elapsed = parseInt(time - datetime);

    var minute = 60 * 1000;
    var hour = minute * 60;
    var day = hour * 24;
    var month = day * 30;
    var year = day * 365;
    
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

		var text = dias[dia] + ', ' + date.getDate() + ' de ' + meses[mes].toLowerCase() + ' a las ' + addZero(hora) + ':' + addZero(minuto);   
	}

  return text;
}

function addZero(n) {
    if (n < 10) {
        var n = "0" + n;
    }
  return n;
}
