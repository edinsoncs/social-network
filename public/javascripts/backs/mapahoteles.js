//not ready fixed in map
	//globals
	var mapOne, mapTwo;

	//api mapbox
	L.mapbox.accessToken = 'pk.eyJ1Ijoib2NrYW5nIiwiYSI6ImNpbTJwNXZvMzA5NWF1MmtzY25xb2J6OXoifQ.725OaUpVzVyWrGrVv-8v-Q';

	function miGeoLat(){
		
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(function(geo){
				var lat = geo.coords.latitude;
				var lon = geo.coords.longitude;
				
				mapOne = L.mapbox.map('mapHotel', 'mapbox.streets')
		  		.setView([lat, lon], 16);

		  		var myLayer = L.mapbox.featureLayer().addTo(mapOne);		

				var geojson = [
					  {
					    "type": "Feature",
					    "geometry": {
					      "type": "Point",
					      "coordinates": [lon, lat]
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
				mapOne.scrollWheelZoom.disable();

			});

		}
		else {
			alert('Su navegador no soporta geo');
		}
	}
	miGeoLat()

	
	

	

	function showData(lat, lon, name, description){
		mapOne.remove();
		var latData = lat;
		var lonData = lon;
		
		mapTwo = L.mapbox.map('mapHotel', 'mapbox.streets')
				.setView([latData, lonData], 16);
		var myLayer = L.mapbox.featureLayer().addTo(mapTwo);
		
		var geojson = [
				  {
				    "type": "Feature",
				    "geometry": {
				      "type": "Point",
				      "coordinates": [lonData, latData]
				    },
				    "properties": {
				      "title": name,
				      "description": description,
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

		mapTwo.featureLayer('ready', function(e){
			alert(e);
		});

			/*myLayer.on('layeradd', function(e) {
				  var marker = e.layer,
				      feature = marker.feature;
				  marker.setIcon(L.icon(feature.properties.icon));
			});*/
			/*myLayer.setGeoJSON(geojson);*/
			mapOne.scrollWheelZoom.disable();
	}

	

	