$(document).ready(function(){
    
    $.datepicker.regional['es'] = {
         closeText: 'Cerrar',
         prevText: '<Ant',
         nextText: 'Sig>',
         currentText: 'Hoy',
         monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
         monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
         dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
         dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
         dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
         weekHeader: 'Sm',
         dateFormat: 'dd/mm/yy',
         firstDay: 1,
         isRTL: false,
         showMonthAfterYear: false,
         yearSuffix: ''
         };
 $.datepicker.setDefaults($.datepicker.regional['es']);

    function viajes(request, response){
        $.ajax({
        jsonp:"cb",
        url: "https://picker.dohop.com/search/?lang=es&sid=completer",
        dataType: "jsonp",
        data: {m: 10,input: request.term},
        success: function(data) {
            response($.map(data.standard, function(item){
                 return {label: item.p + "("+item.ac+") "+item.c,value: item.p + "("+item.ac+") " +item.c};
            }));
        }
        });

        
    }



    $(".a").autocomplete({source: viajes,minLength: 2});
    $(".b").autocomplete({source: viajes,minLength: 2});

    $(".dateOne").datepicker({numberOfMonths: 2,showButtonPanel: true, dateFormat: "dd.mm.y",minDate: new Date(),
    onSelect:function(text,inst){
        $(".dateTwo").datepicker("option","minDate",$(".dateOne").datepicker("getDate"));
        }
    });
    
    $(".dateTwo").datepicker({numberOfMonths: 2,showButtonPanel: true, dateFormat: "dd.mm.y",minDate: new Date()});

     function via() {
        $url = document.location.search;
        $api = "https://whitelabel.dohop.com/w/viainti/";
       
        $(".info").html("<iframe width='100%' height='2153px' scrolling='no' style='overflow:hidden;border:none;' src="+$api+$url+"></iframe>");
        $(".logoHeader").click(function(){
            window.location.href = "/";
        });

    }
    via();
    
    
});
