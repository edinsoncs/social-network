
(function(){

	function url(url){
		var x = url;
		return x;
	}

	function lat(data){
		return data
	}
	function lon(data){
		return data
	}
	
	$.getJSON(url('/addhoteles/hoteles'), hoteles, false);

	function hoteles(data){
        for(i in data){
        	console.log(data[i]);
        	var url = data[i].Nombre;
        	var urlTo = encodeURIComponent(url);
        	var urlFormat = urlTo.replace("%20", '-');
        	var urlCaracters = urlFormat.toLowerCase();
        	var template = "<article class='Locals--List'>"+	
	            "<figure class='Locals--List--Figure margen'><img src='"+data[i].Imagen+"' alt='"+data[i].Nombre+"' class='imgListHotel'>"+"</figure>"+
	            "<aside class='Locals--List--Aside'>"+
	              "<header class='List--Aside--Header'>"+
	                "<h2 class='Title margen'>"+data[i].Nombre+"</h2>"+
	              "</header>"+
	              "<div class='List--Aside--Description'>"+
	                "<p class='List--Description--Hotels margen'>"+
	                 data[i].Descripccion+
	                "</p>"+
	              "</div>"+
	              "<div class='List--Aside--Data'>"+
	                "<ul class='List--Aside--Data--Iz'>"+
	                  "<label class='Data--Iz--TitleUb'>Ubicación</label>"+
	                  "<li class='Data--Iz--TitleUb--Detail'><span class='TitleUb--Detail--Adress'>"+data[i].Direccion+"</span><span class='TitleUb--Detail--City'>"+data[i].Ubicacion+"</span></li>"+
	                "</ul>"+
	                "<!--<ul class='List--Aside--Data--De'>"+
	                  "<label class='Title'>Calificaci&#243;n:</label>"+
	                  "<li class='List--VotStart'><i class='fa fa-heart'></i></li>"+
	                  "<li class='List--VotStart'><i class='fa fa-heart'></i></li>"+
	                  "<li class='List--VotStart'><i class='fa fa-heart'></i></li>"+
	                  "<li class='List--VotStart'><i class='fa fa-heart-o'></i></li>"+
	                  "<li class='List--VotStart'><i class='fa fa-heart-o'></i></li>"+
	                "</ul>-->"+
	              "</div>"+
	              "<div class='List--Aside--Btn'>"+
	                "<a class='Aside--BtnMap' data-lat='"+lat(data[i].Latitud)+"' data-lon='"+lon(data[i].Longitud)+"'>"+
	                  "<span class='BtnMap--Ico'><i class='fa fa-map-marker'></i></span><span class='BtnMap--Title'>Ver Mapa</span>"+
	                "</a>"+
	                "<a href='"+urlCaracters+"?id="+data[i]._id+"' class='Aside--BtnMap' data-hoteles='"+data[i]._id+"'>"+
	                  "<btn class='BtnMap--Ico'>"+
	                  "<i class='fa fa-info-circle'></i>"+
	                  "</btn><span class='BtnMap--Title'>Info</span>"+
	                "</a>"+
	              "</div>"+
	            "</aside>"+
	          "</article>";
        	$(".Locals--Show").append(template);
        	
        	$(".Aside--BtnMap").click(function(){
        		var isParent = $(this).parent().parent().parent();
        		var isResult_One = $(isParent).find('.List--Aside--Header .Title').text();
        		var isResult_Two = $(isParent).find('.List--Aside--Description .List--Description--Hotels').text();
        		var lat = $(this).attr('data-lat');
        		var lon = $(this).attr('data-lon');
        		showData(lat, lon, isResult_One, isResult_Two);
        	});
        }
	}




})();

	
