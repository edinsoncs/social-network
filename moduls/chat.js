var express = require('express');
var http = require('http');

var id = "";



var WebSocketServer = require('ws').Server;



var wss = new WebSocketServer({ port: 1337 });

return function (req, socket, upgradeHead) {
    wss.on('connection', function connection(ws) {
      ws.send('Server connected.');
      ws.on('message', function incoming(data) {
        wss.broadcast(data);
        console.log('hola');
      });
    });

    wss.handleUpgrade(req, socket, head, function (client) {
        //client.req = req; res.req
        wss.emit('connection'+req.user._id, client);
        wss.emit('connection', client);
        cb(client);
    });


    console.log('hola');

    wss.broadcast = function broadcast(data) {
      wss.clients.forEach(function each(client) {
        client.send(data);
        console.log('hola');
      });
    };

}


/*express.use(function(req, res, next){
  console.log(req);
});*/




/*
module.exports = {
	req: function(data) {
		console.log(data);
	}
};

module.exports = express;*/