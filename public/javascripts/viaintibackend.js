$(document).ready(function(){
	
    
    /*$(".loginAccess").submit(function(even){
        
        even.preventDefault();

        var u = $("input[name='usuariobackend']").val();
        var p = $("input[name='passwordbackend']").val();

        $.ajax({
            url: "/acceso",
            type: "POST",
            dataType: "JSON",
            contentType: "application/json",
            data: JSON.stringify({
               name: $("input[name='usuariobackend']").val(),
               password: $("input[name='passwordbackend']").val()
            }),
            success: function(data){
                console.log(data);

                if(data.inserted === true) {
                    
                    function headerVuelos() {
                        $(".contenidoPrincipal").remove();
                        $(".contenidoBackendAdmin").css("display","block");
                        $(".menuViainti_UserAdmin").append("<i class='fa fa-user'></i>" + "<span class='userViainti'>"+u+"</span>");
                        
                    };
                    headerVuelos();
                }
                else {
                    alert("hay un error");
                }
            },
            error: function(err){
                console.log(err);
            }
        });

    });*/
    
    /*$(".Form--Backend").submit(function(event){
        event.preventDefault();
        var a = $("select[name='cantidadDias']").val();
        var b = $("select[name='cantidadNoches']").val();
        var c = $("select[name='paises']").val();
        var d =$("textarea[name='contenido']").val();

        alert(d);
    });*/

     $("#addPaquetes").kendoEditor({
                tools: [
                    "bold",
                    "italic",
                    "underline",
                    "strikethrough",
                    "justifyLeft",
                    "justifyCenter",
                    "justifyRight",
                    "justifyFull",
                    "insertUnorderedList",
                    "insertOrderedList",
                    "indent",
                    "outdent",
                    "createLink",
                    "unlink",
                    "insertImage",
                    "insertFile",
                    "subscript",
                    "superscript",
                    "createTable",
                    "addRowAbove",
                    "addRowBelow",
                    "addColumnLeft",
                    "addColumnRight",
                    "deleteRow",
                    "deleteColumn",
                    "viewHtml",
                    "formatting",
                    "cleanFormatting",
                    "fontName",
                    "fontSize",
                    "foreColor",
                    "backColor",
                    "print"
                ],
                resizable: {
                            content: false,
                            toolbar: true
                        }
     });

    
    
    
    
    
    $(".Form--Backend").submit(function(even){
       
        even.preventDefault();

        var editor = $("#addPaquetes").data("kendoEditor");
        
        /*$(".dassasa").click(function(){
            alert(editor.value());
        });*/

        $.ajax({
            url: "/addpaquetes",
            type: "POST",
            dataType: "JSON",
            contentType: "application/json",
            data: JSON.stringify({
                titulo: $("input[name='titulo']").val(),
                precio: $("input[name='precio']").val(),
                dateida: $("input[name='dateida']").val(),
                datellegada: $("input[name='datellegada']").val(),
                cantidadDias: $("select[name='cantidadDias']").val(),
                cantidadNoches: $("select[name='cantidadNoches']").val(),
                cantidadPersonas: $("select[name='cantidadPersonas']").val(),
                paises: $("select[name='paises']").val(),
                imagen: $("input[name='imagen']").val(),
                coverimagen: $("input[name='coverimagen']").val(),
                pasaje: $("input[name='pasaje']").val(),
                mobilidad: $("input[name='mobilidad']").val(),
                hotel: $("input[name='hotel']").val(),
                seguroMedico: $("input[name='seguromedico']").val(),
                contenido: editor.value()
            }),
            success: function(data) {
                console.log(data);
                if(data.inserted === true) {
                    alert("agregado");
                }
            },
            error: function(err) {
                console.log("surgio un error");
                console.log(err);
            }
        });

         alert(editorVal);
    });

    $(".Form--BackendCruceros").submit(function(even){
        
        even.preventDefault();
        
        var editor = $("#addPaquetes").data("kendoEditor");


        $.ajax({
            url: "/addcruceros",
            type: "POST",
            dataType: "JSON",
            contentType: "application/json",
            data: JSON.stringify({
                titulo: $("input[name='tituloCruceros']").val(),
                precio: $("input[name='precioCruceros']").val(),
                imagen: $("input[name='imagenCruceros']").val(),
                coverImagen: $("input[name='coverimagenCruceros']").val(),
                fechaIda: $("input[name='dateidaCruceros']").val(),
                fechaLlega: $("input[name='datellegadaCruceros']").val(),
                cantidadDias: $("select[name='cantidadDiasCruceros']").val(),
                cantidadNoches: $("select[name='cantidadNochesCruceros']").val(),
                personas: $("select[name='cantidadPersonasCruceros']").val(),
                paises: $("select[name='paisesCruceros']").val(),
                pasaje: $("input[name='pasajeCruceros']").val(),
                mobilidad: $("input[name='mobilidadCruceros']").val(),
                hotel: $("input[name='hotelCruceros']").val(),
                seguroMedico: $("input[name='seguromedicoCruceros']").val(),
                contenido: editor.value()
            }),
            success: function(data) {
                console.log(data);
                if(data.inserted === true) {
                    alert("agregado");
                }
            },
            error: function(err){
                console.log("Aqui hay un error"+err);
            }
        });
    });

    $(".Form--BackendHoteles").submit(function(e){
        e.preventDefault();
        var nameRest = $("input[name='tituloHotel']").val();
        var desRest = $("input[name='textHotel']").val();
        var imagenRest = $("input[name='imagenHotel']").val();
        var coverRest = $("input[name='coverHotel']").val();
        var ubiRest = $("input[name='ubicacionHotel']").val();
        var direRest = $("input[name='direccionHotel']").val();
        var paisRest = $("select[name='paisesHotel']").val();
        var telRest = $("input[name='telHotel']").val();
        var longitud = $("input[name='longitud']").val();
        var latitud = $("input[name='latitud']").val();
        
        $.ajax({
            url: "/addhoteles",
            type: "POST",
            dataType: "JSON",
            contentType: "application/json",
            data: JSON.stringify({
                name: nameRest,
                des: desRest,
                imagen: imagenRest,
                cover: coverRest,
                ubicacion: ubiRest,
                direccion: direRest,
                pais: paisRest,
                tel: telRest,
                lat: latitud,
                lon: longitud
            }),
            success: function(data){
                alert('se agrego')
            },
            error: function(err){
                alert('error');
            }

        });
        
    });

    $(".Form--BackendRestaurantes").submit(function(e){
        e.preventDefault();
        var nameRest = $("input[name='tituloHotel']").val();
        var desRest = $("input[name='textRest']").val();
        var imagen = $("input[name='imagenRest']").val();
        var cover = $("input[name='coverRest']").val();
        var ubicacion = $("input[name='ubicacionRest']").val();
        var direccion = $("input[name='direccionRest']").val();
        var pais = $("select[name='paisesRest']").val();
        var telefono = $("input[name='telRest']").val();
        var latitud = $("input[name='latitud']").val();
        var longitud = $("input[name='longitud']").val();


        $.ajax({
            url: "/addrestaurantes",
            type: "POST",
            dataType: "JSON",
            contentType: "application/json",
            data: JSON.stringify({
                name: nameRest,
                des: desRest,
                imagen: imagen,
                cover: cover,
                ubicacion: ubicacion,
                direccion: direccion,
                pais: pais,
                tel: telefono,
                lat: latitud,
                lon: longitud
            }),
            success: function(data){
                alert('se agrego');
            },
            error: function(err){
                alert('error!!!!!!!!!');
                console.log(err);
            }
        });


    });
     
    
});

    var page;

    function APIPAGE(page){
        var MIAPI = "/addpaquetes/";
        
        if(page === undefined) {
            page = "0";
        }
        //console.log(page);

        $.getJSON(MIAPI+page, paquetes, false);

        function paquetes(data) {

            //var result;
            var add;
            var pageAddNext, pageAddPrevius;
            var toAdd = "";
            

            for (var i = 0; i < data.length; i++) {
               // result = console.log("e"+data[i]);
                var p = data[i].Precio;
                var q = data[i].Titulo;
                var r = encodeURIComponent(q);
                var z = r.replace(/%20/g, "-");
                //console.log(z);
                toAdd += "<article class='contenidos--Vuelos--PostPaquetes'><figure class='PostPaquetes--Figure'><img class='PostPaquetes--Img' src="+data[i].Imagen+"></figure><div class='PostPaquetes--Info'><div class='InfoPaquetes--Cont'><h2 class='Info--Precio margen'>"+"AR$"+Number(p).toLocaleString()+"</h2></div><div class='InfoPaquetes--Cont'><h2 class='Info--Precio margen'><i class='fa fa-map-marker'></i>"+data[i].Paises+"</h2></div></div><div class='PostPaquetes--Date'><div class='InfoPaquetes--Data'><span class='InfoPaquetes--Data--Ico'><i class='fa fa-calendar-o'></i></span><span class='InfoPaquetes--Data--Title'>De:"+" "+data[i].DateIda+"</span></div><div class='InfoPaquetes--Data'><span class='InfoPaquetes--Data--Ico'><i class='fa fa-calendar-o'></i></span><span class='InfoPaquetes--Data--Title'>Hasta:"+" "+data[i].DateLlegada+"</span></div><button class='btn--sendArtilce'><a href='/paquetes/"+z+"?id="+data[i]._id+"'>Consultar</a></button></div></article>";
                //pageAdd = $(".contenidosVuelos--De").append("<div class='contenidos--Vuelos--Pagination'><ul><li>Siguiente</li></ul></div>");
                /*<div onclick='APIPAGE(\"" + Number(Number(page) + 1) +"\");'>SIGUIENTE</div>*/              
                
            }

            $(".contenidos--Vuelos--Cont").html(toAdd);
           


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
            

             

            //console.log(data);

            //return result;
        }
    }
    APIPAGE();