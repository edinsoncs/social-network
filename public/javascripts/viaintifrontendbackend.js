 
$(document).ready(function(){



var dataLatitud =   0;
var dataLongitud = 0;
 function pubUsers() {
       var a = $(".Dashboard_Post textarea[name='mensajepost']");

       
       $("#mensajepost").keyup(function(){
       		if(a.val().length >= 194){
       			$("#mensajepost").animate({
       				'height': '150px'
       			});
       		}
       		else if(a.val().length == 0 || a.val().length == 1) {
       			$("#mensajepost").animate({
       				'height': '40px'
       			});
       		}
       		console.log(a.val().length);
       });
 }

 pubUsers();

 function widgetDashboard() {

 	$(".Dashboard_Left .jsWidget").click(function(){
 		$(".DashboardCityDescription").attr("contenteditable", 'true');
 		$(".DashboardCityDescription").text('Escribe lo más importante, y lo guardaremos en tu libro viajero');
 	});

 }
 widgetDashboard();

 function geoActive() {
       var geoApi = "https://freegeoip.net/json/";

       if(navigator.geolocation) {
            
            navigator.geolocation.getCurrentPosition(function(miPosition) {
              
              var saveLatitude = miPosition.coords.latitude;
              var saveLongitude = miPosition.coords.longitude;

              var t = saveLatitude.toFixed(0);

             $.getJSON(geoApi, successApi, false);

             function successApi(data) {
                     
                      dataLatitud = data.latitude;
                     var tFixed = dataLatitud.toFixed(0);
                      dataLongitud = data.longitude;
                     console.log(data);
                     
                    /* L.mapbox.accessToken = 'pk.eyJ1Ijoib2NrYW5nIiwiYSI6IkVpVFRfalEifQ.Lfzy-jAItxumw9Pu_E-cIQ';
                     var map = L.mapbox.map('map', 'mapbox.streets').setView([dataLatitud, dataLongitud], 9); */
                     if(tFixed == t) {
                           //alert("La ciudad es" + data.region_name);
                     }
             }

              
             
              
            });
       }
       else {
              alert("Porfavor verifique la geolocation");
       }

 }
  getLocation();
 function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
   console.log( "Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude);
   dataLatitud = position.coords.latitude;
   dataLongitud =  position.coords.longitude;  
}
 $('#formPublisher').submit(function(e) {
    e.preventDefault();
   $.ajax({
        url: "post", // Url to which the request is send
        type: "POST",             // Type of request to be send, called as method
        data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData:false,        // To send DOMDocument or non processed data file it is set to false
        success: function(data)   // A function to be called if request succeeds
        {
          var imgstr = data.imagen !='' ? '<img src="../../uploads/usuarios/'+data.imagen+'" alt="nombre de la foto" class="Post--Img">': '';
          var videostr = data.videon !='' ? '<video width="95%" controls=""><source src="../../uploads/videos/'+data.videon+'" type="video/mp4">Your browser does not support HTML5 video.</video>': '';

                     $(".Dashboard_Welcome").after('<article class="Dashboard_Post--User">'+
                                          '<article class="Post--User">'+
                                          '<div class="Post--User--Date">'+
                                             '<div class="Post--Date"><span class="name">'+data.user.name+'</span></div>'+
                                              '<div class="Post--Date"><span class="date">hace 2 horas</span></div>'+
                                          '</div>'+
                                        '<figure class="Post--User--Foto margen">'+
                                        '<img src="'+data.user.photo+'" alt="" class="User--Foto">'+
                                        '</figure></article><article class="Post--User--Txt">'+
                                        '<p class="Post--Txt margen">'+data.content+'</p>'+
                                        '<figure class="Post--Figure--Img margen">'+imgstr+videostr+'</figure>'+
                                        '</article>'+
                                        '<article class="Post--User--Opt"><div class="Post--User--Cont">'+
                                        '<div class="Post--User--Like"><div class="User--Like">'+
                                        '<i class="fa fa-heart"></i><div class="Like enLinea"><span class="Like--Num">0</span></div></div></div><div class="Post--User--Coment">'+
                                        '<div class="User--Coment">'+
                                        '<i class="fa fa-comments"></i><div class="Comment enLinea"><span class="Comment--Num">0</span></div></div></div><div class="Post--User-Shared"><div class="User--Shared">'+
                                        '<div class="Shared enLinea"><span class="Shared--Num">3</span></div>'+
                                        '<i class="fa fa-share"></i></div></div></div></article></article>')
        
        document.getElementById("formPublisher").reset();


        }

    });
 
 })
$('.Send_Ico_Geo.enLinea').on('click',function(){

  initMapn(dataLatitud,dataLongitud);
})
  function initMapn(lat,lng) {
    console.log(lat,lng )
                      var myLatLng = {lat: lat, lng: lng};
                      var map = new google.maps.Map(document.getElementById('map'), {
                      zoom: 9,
                      center: myLatLng
                    });
                    var marker = new google.maps.Marker({
                      position: myLatLng,
                      map: map
                    });
                  }

 //geoActive();


});