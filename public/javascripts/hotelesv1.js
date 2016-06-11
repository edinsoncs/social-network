$(document).ready(function(){

	

	function postPublisherHotel(){
		$(".btn_Post--Hotel").click(function(e){
			e.preventDefault();
			function message(text){
				var showText = $(text).val();
				return showText;
			}
			function id(show){
				var is = show.replace('?', '');
				var is_A = is.replace('id', '');
				var is_B = is_A.replace('=', '');
				return is_B
			}
			function service(name){
				return $(name).text();
			}
			

			$.ajax({
				url: "../../addhoteles/post",
				type: "POST",
	            dataType: "JSON",
	            contentType: "application/json",
				data: JSON.stringify({
					id: id(window.location.search),
					text: message($("#textData")),
					service: service($(".Acerca--Title"))
				}),
				success: function(data){
					console.log(data);
				},
				error: function(err){
					console.log(err);
				}
			});
		});
	}
	postPublisherHotel();

});