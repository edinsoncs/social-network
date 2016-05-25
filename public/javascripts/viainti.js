$(document).ready(function(){
    

    $(".loginAccess").submit(function(even){
        
        even.preventDefault();

        $.ajax({
            url: "/acceso",
            type: "POST",
            dataType: "JSON",
            contentType: "application/json",
            data: JSON.stringify({
               name: $(".usuariobackend").val(),
               password: $(".passwordbackend").val()
            }),
            success: function(data){
                console.log(data);

                if(data.inserted === true) {
                    window.location = "/";
                }
                else {
                    alert("hay un error");
                }
            },
            error: function(err){
                console.log(err);
            }
        });

    });
    
});

var page;
function APIPAGE(page) {

    var MIAPI = "/addcruceros/";
    if(page === undefined){
        page = "0";
    }
    console.log(page);

    $.getJSON(MIAPI+page, cruceros, false);

    function cruceros(data) {
       
        var toFront = "";

        for(var i = 0; i < data.length; i++) {

           var p = data[i].Precio;
           var q = data[i].Titulo;
           var r = encodeURIComponent(q);
           var z = r.replace(/%20/g, "-");
          

           toFront += "<article class='contenidos--Vuelos--PostPaquetes'><figure class='PostPaquetes--Figure'><img class='PostPaquetes--Img' src="+data[i].Imagen+"></figure><div class='PostPaquetes--Info'><div class='InfoPaquetes--Cont'><h2 class='Info--Precio margen'>"+"AR$"+Number(p).toLocaleString()+"</h2></div><div class='InfoPaquetes--Cont'><h2 class='Info--Precio margen'><i class='fa fa-map-marker'></i>"+data[i].Paises+"</h2></div></div><div class='PostPaquetes--Date'><div class='InfoPaquetes--Data'><span class='InfoPaquetes--Data--Ico'><i class='fa fa-calendar-o'></i></span><span class='InfoPaquetes--Data--Title'>De:"+" "+data[i].FechaIda+"</span></div><div class='InfoPaquetes--Data'><span class='InfoPaquetes--Data--Ico'><i class='fa fa-calendar-o'></i></span><span class='InfoPaquetes--Data--Title'>Hasta:"+" "+data[i].FechaLlega+"</span></div><button class='btn--sendArtilce'><a href='/cruceros/"+z+"?id="+data[i]._id+"'>Consultar</a></button></div></article>";
        }

         $(".contenidos--Vuelos--Cont").html(toFront);

          function mostrar(){
                //pageAddNext = $(".toPaginatorNext").html("<span onclick='APIPAGE("+(page + 1)+")'>Siguiente <i class='fa fa-angle-right'></i></span>");
                //pageAddPrevius = $(".toPaginatorPrevius").html("<span onclick='APIPAGE("+(page - 1)+")'><i class='fa fa-angle-left'></i>Atras</span>");
                
                if(Number(page) == 0){
                   $(".toPaginatorNext").html("<span onclick='APIPAGE("+Number(Number(page) + 1)+")'>Siguiente <i class='fa fa-angle-right'></i></span>");
                   $(".toPaginatorPrevius").html("<span onclick='APIPAGE("+(page - 1)+")'><i class='fa fa-angle-left'></i>Atras</span>").hide(); 
                    //alert(page);
                }
                else if(Number(page) === 1 || Number(page) > 1 || Number(page) <= 100) {
                     $(".toPaginatorNext").html("<span onclick='APIPAGE("+Number(Number(page) + 1)+")'>Siguiente <i class='fa fa-angle-right'></i></span>");
                     $(".toPaginatorPrevius").html("<span onclick='APIPAGE("+ Number(Number(page) - 1)+")'><i class='fa fa-angle-left'></i>Atras</span>").show();
                }
            }
            mostrar();

    }


}
APIPAGE();