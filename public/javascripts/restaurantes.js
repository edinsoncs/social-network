$(document).ready(function(){

	var phoneElement = $(".jsRestPhone");
	var elementDesactive = $(".DashboardUtils");
	var iconClose = $(".jsCloseUtils");
	activeElement(phoneElement, elementDesactive, iconClose);





	function activeElement(phoneActive, elementDesactive, icon) {
		$(phoneActive).on('click', function(){
			$(elementDesactive).css('display','block');
		});
		$(icon).on('click', function(){
			$(elementDesactive).css('display','none');
		});
	}

});
	
