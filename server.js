// var WebSocketServer = require('ws').Server;
// var http = require('http');
// var express = require('express');
// var app = express();
// var port = process.env.PORT || 5000;
// var clients = {};

// app.use(express.static(__dirname + '/'));

// var server = http.createServer(app);
// server.listen(port);

// var wss = new WebSocketServer({server: server});

// wss.on('connection', function(ws) {
//   // send client id
//   ws.send(JSON.stringify(new Date()), function() {  })

//   ws.on('message', function (message) {
//     var payload = message.payload;
//     var opcode = messsage.opcode;

//     if (opcode === 0) {
//       clients[payload]
//     } else if (opcode === 1) {

//     }
//   });

//   ws.on('close', function() {
//     clearInterval(id);
//   });
// });

var WebSocketServer = require('ws').Server;
var http = require('http');
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var url = require('url');

app.use(express.static(__dirname + '/'));

var server = http.createServer(app);
server.listen(port);

var wss = new WebSocketServer({server: server});
var clients = {}; // userID: webSocket

// CONNECT /:userID
// wscat -c ws://localhost:5000/1
wss.on('connection', function (ws) {
  var id = -1;

  ws.on('message', function(message) {
    var m = JSON.parse(JSON.stringify(message));
    var op = m.opcode;
    var payload = m.payload;

    console.log('recieved message ' + typeof(m) + ' ' + typeof(message) + ' ' + JSON.stringify(message) + ' . op: ' + op + ' payload: ' + payload);

    if (op === 1) {
      console.log('client connected from ' + payload);
      id = payload;
      clients[payload] = ws;
    } else if (op === 2) {
      console.log('sending reload to ' + payload);
      clients[payload].send({
        opcode: 3
      });
    }
  });

  ws.on('close', function () {
    delete clients[id];
    console.log('deleted: ' + id);
  });
})
