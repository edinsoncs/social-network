$(document).ready(function(){

	function nameCity(name){
		var is = $(name).text();
		var encode = encodeURIComponent(is);
		var encode__Replace = encode.replace('%20', '_');
		return encode__Replace;
	}

	function isCityHome() {

		var _APIPRIV = "http://es.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=";
		var _APICITY = nameCity($(".jsCityFind"));
		var _APICALL = "&callback=?";


		$.getJSON(_APIPRIV + _APICITY + _APICALL, city, false);

		function city(data){
			var insertData = data.parse.text['*'];
			var dataAppend = $(".jsonCityShow").append(insertData);

				var _DeletePrimary = $(".infobox, .rellink, .references, sup").remove();
				var _ReplaceSecondary = dataAppend.find('a');

				_ReplaceSecondary.each(function(i){
					$(this).replaceWith($(this).html());
				});

			console.log(data.parse.text['*']);
		}

	}

	isCityHome();

});