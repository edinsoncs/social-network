$(document).ready(function(){

	var socket = io.connect('localhost:3535', {'forceNew': true});


	function rSidebar(r){
		$(r).remove();
	}
	rSidebar($(".jsRemove"));
	
	function sendData(id){
		var s = $(id).attr('href');
		var result = s.replace('../u/', '');
		
		sendSocketID(result);
	}
	sendData($(".jsIDSocket"))

	function sendSocketID(isID){
		socket.on('connect', function(){
			socket.emit('idusuario', {
				idMongoDB: isID,
				idSocketClient: socket.io.engine.id
			});

			socket.on('notificacionComentarios', function(data){
				var mensajeInNotify = data;

				templatehtml(mensajeInNotify);


				//showNotify(mensajeInNotify);
			});

			socket.on('notificacionFriend', function(data){
				var dataInNotify = data;

				templatehtmlFriend(dataInNotify);

			});
		});

	}

	function sendSocketMensaje(){
		var id = $(".jsIDSocket").attr('href');
		var id_Replace = id.replace('../u/', '');
		
		function urlPathId(find) {
			var find = find.location.pathname;
			return find.replace('/libro/u/', '');
		}

		socket.emit('nuevoComentario', {
			usuarioID: urlPathId(window),
			nameUsuario: $(".menuViainti_Avatar img").attr('data-nameuser'),
			textComment: 'Hubo comentarios',
			imagen: $(".menuViainti_Avatar img").attr('src'),
			texto: $(".postComments input[type='text']").val()
		});
		

		socket.on('mensajeAlert', function(data){
			console.log(data);
		});
	}


	//NOTIFY///////FRIEND//////////////////
	
	function sendFriend() {
		
		var id = $(".jsIDSocket").attr('href');
		var id_Replace = id.replace('../u/', '');
		
		function urlPathId(find) {
			var find = find.location.pathname;
			return find.replace('/libro/u/', '');
		}
		function idEmisor(is) {
			var r = $(is).attr('href');
			return r.replace('../u/', '');
		}

		function accept(){
			return '<i class="fa fa-check" data-idAccept="'+idEmisor($(".jsIDSocket"))+'" aria-hidden="true"></i>';
		}

		socket.emit('friends', {
			usuarioID: urlPathId(window),
			nameUsuario: $(".menuViainti_Avatar img").attr('data-nameuser'),
			textComment: 'Nueva Notificacion',
			imagen: $(".menuViainti_Avatar img").attr('src'),
			acceptTheme: accept()
		});

	}

	//END//////NOTIFY FRIEND/////////////////////


	//START//////////PROFILE//////////////

	function readFile(input){
			if(input.files && input.files[0]){
				var reader  = new FileReader();
			
				reader.onload = function(e){
					$(".profile--De--Figure").attr('style', 'background-image:url('+e.target.result+')');
					$(".EditCover--Submit").fadeIn();
				}
				reader.readAsDataURL(input.files[0]);
			}
	}

	$("#editCover").change(function(){
			readFile(this);
	});;


	//END//////////PROFILE//////////////


	//START//////////////COMMENTS///////////
		function obtID(select){
			return select
		}
		function val(textarea){
			return textarea.val();
		}
		function idUser(obj){
			var path = obj.location.pathname;
			var path_Replace = path.replace('/libro/u/', '');
			return path_Replace
		}

		function commentsProfile(select){

			$(select).submit(function(e){
				e.preventDefault();
				var post = val($(".textareaVal"));
				
				var isID = $(this).find('.textareComments').attr('data-idpost');
				


				$.ajax({
						url: '../u/postprofile/',
						type: 'POST',
						dataType: 'JSON',
						contentType: 'application/json',
						data: JSON.stringify({
							id: isID,
							idUsuario: idUser(window),
							mensaje: post
						}),
						success: function(data){
							alert('se envio');
							sendSocketMensaje();
						},
						error: function(err){
							alert('error' + err);
						}
				});

			});
		
		}
		commentsProfile(obtID($(".postComments")));


		function commentsDashboard(select){

			$(select).submit(function(e){
				e.preventDefault();
				
				var post = $(this).find('.textareaVal');


				var isID = $(this).find('.textareComments').attr('data-idpost');
				
				console.log('edinsonnn');

				var isShowComments = $(this).parent().parent().parent();

				function idUserDash(n) {
					var id = $(n).attr('href');
					var replace = id.replace('u/', '');
					
					return replace;
				}	


				$.when(

					$.ajax({
						url: 'u/dashboardpost/',
						type: 'POST',
						dataType: 'JSON',
						contentType: 'application/json',
						data: JSON.stringify({
							id: isID,
							idUsuario: idUserDash($(".jsIDSocket")),
							mensaje: $(post).val()
						}),
						success: function(data){
							//Send Socket
							sendSocketMensaje();

							var sendComments = "<div class='CommentsViews--Show'>" +
														"<figure class='CommentsViews--Show--Figure'>" + 
															"<img src='"+data.userData.photo+"' alt=''>" + 
														"</figure>" + 
														"<aside class='CommentsViews--Show--Data'>" + 
															"<a href='"+data.userData.iduser+"' class='Show--Name'>" + 
																data.userData.name + 
															"</a>"+
															"<p class='Show--Comments'>" + 
																data.userPost
															"</p>" + 
														"</aside>" +
													"</div>";

							console.log(data);

							

							function showComments(comment) {
								$(comment).siblings('.Post--User--CommentsViews').fadeIn('slow');
								$(comment).siblings('.Post--User--CommentsViews').append(sendComments);
							}	
							showComments(isShowComments);

							//Send Append Dashboard
						},
						error: function(err){
							alert('error' + err);
						}
					}),

					$.ajax({
						url: 'u/postprofile/',
						type: 'POST',
						dataType: 'JSON',
						contentType: 'application/json',
						data: JSON.stringify({
							id: isID,
							idUsuario: idUserDash($(".jsIDSocket")),
							mensaje: $(post).val()
						}),
						success: function(data){
							alert('se envio');
							sendSocketMensaje();

							console.log(data);
						},
						error: function(err){
							alert('error' + err);
						}
					})

				).then(function(){
					//Done
				});

				

			});
		
		}
		commentsDashboard(obtID($(".postComments--Dashboard")));






		//START//////////LIKESCOMENTS///PROFILE/////
		
		function likesComentsProfile(select){
			$(select).click(function(e){
				e.preventDefault();

				var isID_ONE = $(this).parent().parent().parent().parent().siblings()[3];
				var isID_TWO = $(isID_ONE).find('.textareComments').attr('data-idpost');
				//alert($(isID).attr());
				
				alert(isID_TWO);

				$.ajax({
					url: '../u/likecoments/',
					type: 'POST',
					dataType: 'JSON',
					contentType: 'application/json',
					data: JSON.stringify({
						id: isID_TWO,
						idUsuario: idUser(window),
						like: 1
					}),
					success: function(data){
						alert('likeado');
					},
					error: function(err){
						console.log(err);
					}


				});
			});
		}
		
		likesComentsProfile($(".jsLike"));
		//END//////////ENDCOMMENTS//PROFILE////////

		//STAR//////////LIKESDASHBOARD////////////

		function likesComentsDashboard(select){
			$(select).click(function(e){
				e.preventDefault();

				var isID_ONE = $(this).parent().parent().parent().parent().siblings()[3];
				var isID_TWO = $(isID_ONE).find('.textareComments').attr('data-idpost');
				//alert($(isID).attr());
				
				var isID_USER = $(this).parent().parent().parent().parent().parent().attr('data-iduser');

				


				$.ajax({
					url: '../libro/u/likecoments/',
					type: 'POST',
					dataType: 'JSON',
					contentType: 'application/json',
					data: JSON.stringify({
						id: isID_TWO,
						idUsuario: isID_USER,
						like: 1
					}),
					success: function(data){
						alert('likeado');
					},
					error: function(err){
						console.log(err);
					}


				});
			});
		}
		likesComentsDashboard($(".jsLikeDashboard"));

		//END//////////LIKESDASHBOARD////////////

	//END///////////////COMMENTS///////////7
		
		function showComments(select) {
			$(select).click(function(){
				var n = $(this).parent().parent().parent().parent().find('.Post--User--CommentsViews').show('slow');
				console.log(n);
			});
		}
		showComments($(".jsShowComments"));

	//START////////////////EFFECTSPRELOADS////////////




	//END/////////////////EFECTSPRELOADS//////////////

	//START///////////////SOCKETS/////////////////////
		var arrayNotify = new Array();
		var arrayNotifyFriend = new Array();

		function templatehtml(data){
			
			arrayNotify.push(data);

			var templateNotify = "";

			console.log(arrayNotify);

			function cantNotifiyIcon(element){
				$(element).text(arrayNotify.length);
			}
			cantNotifiyIcon($(".jsNotifyServerShow"));

			for(var i = 0; i < arrayNotify.length; i++) {
				
				templateNotify += "<div class='Notify--Section'>"+
										"<div class='Notify--Section--Users'>"+
											"<figure class='Figure Notify--Iz'>"+
												"<img src='"+arrayNotify[i].usuarioImagen+"' alt=''> "+
											"</figure>"+
											"<div class='Notify--De'>"+
												"<header class='Notify--De--UserName'>"+
													"<h2 class='title'>"+arrayNotify[i].usuarioName+"</h2>"+
												"</header>"+
												"<p class='Notify--De--Alert'>"+
													arrayNotify[i].usuarioTexto+
												"</p>"+
											"</div>"+
										"</div>"+
									"</div>";
			}

			$(".menuViaintiShow .Notify--Container").html(templateNotify);

		
		}

		function templatehtmlFriend(data){

			
			arrayNotifyFriend.push(data);

			var templateNotify = "";

			console.log(arrayNotify);

			function cantNotifiyIcon(element){
				$(element).text(arrayNotifyFriend.length);
			}
			cantNotifiyIcon($(".jsNotifyServerShow"));

			for(var i = 0; i < arrayNotifyFriend.length; i++) {
				
				templateNotify += "<div class='Notify--Section'>"+
										"<div class='Notify--Section--Friend'>"+
											"<figure class='Figure Notify--Iz'>"+
												"<img src='"+arrayNotifyFriend[i].usuarioImagen+"' alt=''> "+
											"</figure>"+
											"<div class='Notify--De'>"+
												"<header class='Notify--De--UserName'>"+
													"<h2 class='title'>"+arrayNotifyFriend[i].usuarioName+"</h2>"+
												"</header>"+
												"<p class='Notify--De--Alert'>"+
													"Quiere ser tu amigo"+
												"</p>"+
											"</div>"+
											"<div class='Notify--Accept jsAddPostFriend'>"+
												arrayNotifyFriend[i].usuarioAccept +
											"</div>"
										"</div>"+
									"</div>";
			}

			console.log(arrayNotifyFriend);

			$(".menuViaintiShow .Notify--Container").html(templateNotify);


			///STAR/////////////ACCEPT FRIEND/////////////////

			function acceptFriend(element){
				$(element).click(function(){

					//Other Friend

					function friendOtherName(name){
						return $(name).text();
					}

					function friendOtherImg(url){
						return url;
					}

					function friendOtherId(id){
						return id;
					}





					function nameUser(name){
						return name
					}

					function fotoUser(foto) {
						return $(foto).attr('src');
					}
					function idUser(id) {
						return id;
					}



					//Usuario One
					var userOtherName = friendOtherName($(".Notify--Section--Friend .Notify--De .Notify--De--UserName .title"));
					var userOtherImg = friendOtherImg($(".Notify--Section--Friend .Notify--Iz img").attr('src'));
					var userOtherId = friendOtherId($(".jsIDSocket").attr('href'));


					//Usuario Two
					var name = nameUser($(".profile--Iz--Figure img").attr('data-profilename'));
					var foto = fotoUser($(".jsProfileNameUser"));
					var id = idUser($(".jsAddPostFriend i").attr('data-idaccept'));
					

					$.when(

						$.ajax({
								url: "../../addinvitate/accept/",
								type: "POST",
								dataType: 'JSON',
								contentType: 'application/json',
								data: JSON.stringify({
									nameUser: userOtherName,
									fotoUser: userOtherImg,
									idUser: id
								}),
								success: function(data){
									alert('funcionoo');
								},
								error: function(err){
									alert('error');
								}
						}),
						$.ajax({
								url: "../../otherfriend/",
								type: "POST",
								dataType: 'JSON',
								contentType: 'application/json',
								data: JSON.stringify({
									nameUser: name,
									fotoUser: foto,
									idUserOther: userOtherId,
									idUser: id
								}),
								success: function(data){
									alert('funcionoo');
								},
								error: function(err){
									alert('error');
								}
						})



					).then(function(){
						alert('edinson funciono');
					});
					
					

					
				});
			}
			acceptFriend($(".jsAddPostFriend"));
			///END/////////////ACCEPT FRIEND//////////////////

		}
		

		//Test Notificacion 08/05/2016

		/*function showNotify(data){
			console.log(data);
			$(".jsNotifyServerShow").text('1');
		}*/

		function iconNotify(elemet, sld, data){
			$(elemet).click(function(e){
				//$(".jsNotify--Show").html(sld.length)
				var notifyShow = $(".menuViaintiShow").addClass('cssNotifyShow');
				var elementVisible = $(".menuViainti_Alert").removeClass('jsNotify');


				function alertActive(icon) {
					return $(icon).css('color', 'white');
				}

				function addDataIcon(hide){
					$(".fa-bell").addClass(hide);
				}

				addDataIcon('hiddenClick');
				alertActive($(".menuViainti_Alert i"));

			});

			$(".hiddenClick").click(function(){
				alert('a');
			});

			
		}


		function activeSockets(){
			var notifyElement = $(".jsNotify");
			socket.on('connection', function(data){
				console.log('conectado');
			});
			socket.on('bienvenido', function(data){
				var dataWelcome = data.title;
				//show Element
				console.log(data);
				iconNotify(notifyElement, dataWelcome, data);
			});
		}
		activeSockets();




	//END////////////////SOCKETS//////////////////////





	//ADD////////////////FRIEND///////////////////////

		function inviteFriend(element) {

			$(element).click(function(){

				function isURLid_User(is){
					var uno = is.location.pathname;
					var dos = uno.replace('/libro/u/', '');
					return dos
				}

				function isName_User(is) {
					return $(is).attr('data-profilename');
				}

				function isImage_User(is) {
					return $(is).attr('src');
				}

				$.ajax({
					url: "../../addinvitate",
					type: "POST",
					dataType: 'JSON',
					contentType: 'application/json',
					data: JSON.stringify({
						idusuarioInvite: isURLid_User(window),
						nameusuarioInvite: isName_User($(".jsProfileNameUser")),
						nameimagenInvite: isImage_User($(".profile--Iz--Figure img"))
					}),
					success: function(data){
						alert('se envio la notificacion');
						
						var themeSend = "<button type='submit' class='SendInvitate'><i class='fa fa-check-square'></i>Solicitud Enviada</button>";
						$(".profile--De figure").append(themeSend);
						
						sendFriend();

					},
					error: function(err){
						alert('error');
						console.log(err);
					}
				});

			});

		}

		inviteFriend($(".AddFriend"));


	//END///////////////FRIEND////////////////////////


});