$(document).ready(function() {

    var phoneElement = $(".jsRestPhone");
    var elementDesactive = $(".DashboardUtils");
    var iconClose = $(".jsCloseUtils");
    activeElement(phoneElement, elementDesactive, iconClose);


    function activeElement(phoneActive, elementDesactive, icon) {
        $(phoneActive).on('click', function() {
            $(elementDesactive).css('display', 'block');
        });
        $(icon).on('click', function() {
            $(elementDesactive).css('display', 'none');
        });
    }


    $(".Aside--BtnMap").click(function() {

        var isParent = $(this).parent().parent().parent();
        var isResult_One = $(isParent).find('.List--Aside--Header .Title').text();
        var isResult_Two = $(isParent).find('.List--Aside--Description .List--Description--Hotels').text();
        var lat = $(this).attr('data-lat');
        var lon = $(this).attr('data-lon');

        showData(lat, lon, isResult_One, isResult_Two);
    });

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
				url: "../../addrestaurantes/post",
				type: "POST",
	            dataType: "JSON",
	            contentType: "application/json",
				data: JSON.stringify({
					id: id(window.location.search),
					text: message($("#textData")),
					service: service($(".Acerca--Title"))
				}),
				success: function(data){
					
				},
				error: function(err){
					console.log(err);
				}
			});
		});
	}
	postPublisherHotel();



});
