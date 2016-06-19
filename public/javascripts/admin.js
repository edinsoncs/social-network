$(document).ready(function(){


	$(".jsUser").on('click', function(){
		var id = $(this).parent().parent();
		 $.ajax({
            url: "isadmin/accept",
            type: "POST",
            dataType: "JSON",
            contentType: "application/json",
            data: JSON.stringify({
				idshow: $(id).attr('data-id')
			}),
			success: function(data){
				alert('enviado');
			},
			error: function(err){
				alert('error');
			}
		})		
		
	});



});