
$(function () {

    /* Class WebSocket */

    window.WebSocket = window.WebSocket || window.MozWebSocket;

    var socket = new WebSocket('ws://echo.websocket.org'); // ws://echo.websocket.org/   ws://127.0.0.1:1337

    socket.onopen = function () {
        Chat.init();
    };

    //socket.readyState

    socket.onclose = function () {
        console.log('onclose');
        // reconnected 10 seconds !
    };

    socket.onerror = function (error) {
        console.log('onerror');
    };

    socket.onmessage = function (evt) {
        try {
            var data = JSON.parse(evt.data);
            if (data.id == 1) {
                $('#messages1').append('<ol><span><b>Edinsoncs</b>' + emotics(data.msg) + '</span><figure><a href=""><img src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAIVAAAAJGExMjVkNjZiLTE3NTQtNDJmNy05YjQzLTBhOWY0NDhjNzY1NA.jpg"></a></figure></ol></span></li>');
            } else {
                $('#messages1').append('<li><figure><a href=""><img src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAIVAAAAJGExMjVkNjZiLTE3NTQtNDJmNy05YjQzLTBhOWY0NDhjNzY1NA.jpg"></a></figure><span><b>Ockang</b>' + emotics(data.msg) + '</span></li>');
            }
            $('.chat-box-messages').animate({
                scrollTop: $('.chat-box-messages').height()
            }, 300);
            console.log(data);
        } catch (e) {
            console.log(evt.data);
          return;
        }
    };

    Chat = {
        init: function() {
            console.log('Client connected.');

        },
        send: function(text) {
            socket.send(text);
        }
    };

    var emotics = function(text) {
        var replaces = [
            {text : ':D',  img : '<i class="i-grin"></i>'},
            {text : '>.<', img : '<i class="i-upset"></i>'},
            {text : ':)',  img : '<i class="i-smile"></i>'},
            {text : ';)',  img : '<i class="i-wink"></i>'},
            {text : ':(',  img : '<i class="i-frown"></i>'},
            {text : ':/',  img : '<i class="i-unsure"></i>'},
            {text : '-.-', img : '<i class="i-squint"></i>'}
        ];

        for(var i in replaces) {
            var text = text.replace("/" + replaces[i].text + "/g", replaces[i].img);
        }
      return text;
    };

    $('#chat-input').on('keyup', function(e) {
        if (e.which == 13) {
            Chat.send(JSON.stringify({id:1, msg: $(this).val()}));
            $(this).val('');
        }
    });




    
});

