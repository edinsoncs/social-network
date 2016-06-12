 
$(document).ready(function(){

    var fileCitis = [{
      'nameCity': 'Buenos Aires',
      'img': 'http://www.apertura.com/__export/1440099509296/sites/revistaap/img/clase/2015/08/20/obelisco_img_buenos_aires_crop1440099509161.jpg_1913337537.jpg'
    }, {
      'nameCity': 'Cajamarca',
      'img': 'http://cde.peru.com/ima/0/1/0/3/1/1031194/611x458/cajamarca.jpg'
    }]

    var dataLatitud =   0;
    var dataLongitud = 0;


    L.mapbox.accessToken = 'pk.eyJ1Ijoib2NrYW5nIiwiYSI6ImNpbTJwNXZvMzA5NWF1MmtzY25xb2J6OXoifQ.725OaUpVzVyWrGrVv-8v-Q';

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
     

     function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
            console.log("Geolocation is not supported by this browser.");
        }
    }
    
    getLocation();
    
    function showPosition(position) {
       console.log( "Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude);
       dataLatitud = position.coords.latitude;
       dataLongitud =  position.coords.longitude;  

       inCity(dataLongitud, dataLatitud);

       var view = L.mapbox.map('map', 'mapbox.streets')
                    .setView([dataLatitud, dataLongitud], 16);

       var myLayer = L.mapbox.featureLayer().addTo(view);

       var geojson = [
            {
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [dataLongitud, dataLatitud]
              },
              "properties": {
                "title": 'Mi Ubicación',
                "icon": {
                    "iconUrl": "https://www.mapbox.com/mapbox.js/assets/images/astronaut1.png",
                    "iconSize": [50, 50], // size of the icon
                    "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
                    "popupAnchor": [0, -25], // point from which the popup should open relative to the iconAnchor
                    "className": "dot"
                }
              }
            }
        ];

        myLayer.on('layeradd', function(e) {
            var marker = e.layer,
                feature = marker.feature;
            marker.setIcon(L.icon(feature.properties.icon));
        });
        

        myLayer.setGeoJSON(geojson);


        /////SET//////////////////////////////CITYUSER/////////

        function inCity(lon, lat) {

            $.getJSON('http://maps.googleapis.com/maps/api/geocode/json' + '?latlng=' + lat + ',' + lon, showInCity, false);
            
            function showInCity(data) {

              var paisLocalize = data.results[0].address_components[3].long_name;
              
              console.log(data);

               function dashboardCity(elem){
                
                   for(var i = 0; i < fileCitis.length; i++) {

                      if(fileCitis[i].nameCity == paisLocalize) {
                        var imagen = fileCitis[i].img;
                        $(".Dashboard_Show--City").css('background-image', 'url("'+imagen+'")');
                      }
                      
                   }
                 
                   $(elem).text(data.results[0].address_components.long_name);
               }
               //include city
                dashboardCity($(".jsTxtCityDashboard"));
             
                var hoteles = function(name){
                  var _nameMin = name;
                  var convertName = encodeURIComponent(_nameMin);
                  var _link = convertName.replace('%20', '-').toLowerCase();

                  var h = $(".jsHot a").attr('href', '../hoteles/' + _link );
                  
                }
                hoteles(data.results[0].address_components[2].long_name);

            }


        }



    }

     $('#formPublisher').submit(function(e) {
        e.preventDefault();
        

        function videoYoutube(dataVideo) {
          var yt = dataVideo.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
          var ytIframe = "<iframe width='560' height='315' src='https://www.youtube.com/embed/"+ yt +"' frameborder='0' allowfullscreen></iframe>";
        }

        videoYoutube($(this).find('textarea').val());
        
        $(this).find('input[type="submit"]').val('Subiendo...');
        $(this).find('input[type="submit"]').attr('disabled', 'disabled');

        if($(this).find('textarea[name="mensajepost"]').length >= 1 ){
            
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
                                                  '<div class="Post--Date"><span class="date">hace un momento</span></div>'+
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
                                            '<!-- <div class="Shared enLinea"><span class="Shared--Num">3</span></div>'+
                                            '<i class="fa fa-share"></i>--></div></div></div></article></article>')
            
            document.getElementById("formPublisher").reset();

            $(".jsPostInLoading").val('Publicar');
            $(".jsPostInLoading").removeAttr('disabled');

            }

        });

        }
     
     })

    /*$('.Send_Ico_Geo.enLinea').on('click',function(){
        initMapn(dataLatitud,dataLongitud);
    });*/


     /* function initMapn(lat,lng) {
            var myLatLng = {lat: lat, lng: lng};
            var map = new google.maps.Map(document.getElementById('map'), {
                          zoom: 9,
                          center: myLatLng
                      });
            var marker = new google.maps.Marker({
                          position: myLatLng,
                          map: map
                        });
      }*/

     geoActive();


});