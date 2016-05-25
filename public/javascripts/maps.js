(function(){

	function dataMap_Lat(lat){
		lat = $("#map").attr('data-latitud');
		return lat;
	}	
	function dataMap_Lon(lon){
		lon = $("#map").attr('data-longitud'); 
		return lon;
	}
	function dataMap_Name(name){
		name = $(".DashboardHotel--Acerca .Acerca--Title").text();
		return name;
	}
	function dataMap_Direc(direc){
		direc = $(".jsDireccion").text();
		return direc;
	}

	L.mapbox.accessToken = 'pk.eyJ1Ijoib2NrYW5nIiwiYSI6ImNpbTJwNXZvMzA5NWF1MmtzY25xb2J6OXoifQ.725OaUpVzVyWrGrVv-8v-Q';
	var mapOne = L.mapbox.map('map', 'mapbox.streets')
	  .setView([dataMap_Lat(), dataMap_Lon()], 16);
	var myLayer = L.mapbox.featureLayer().addTo(mapOne);

	var geojson = [
	  {
	    "type": "Feature",
	    "geometry": {
	      "type": "Point",
	      "coordinates": [dataMap_Lon(),dataMap_Lat()]
	    },
	    "properties": {
	      "title": dataMap_Name(),
	      "description": dataMap_Direc(),
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



})();