(function () {
  var isNode = false;

  var host = 'ws://lively-reload.herokuapp.com/',
      ws;

  if (typeof module !== 'undefined' && module.exports) {
    var WebSocket = require('websocket').client;

    var connected = false;
    ws = new WebSocket();

    ws.connect(host);

    ws.on('connect', function(connection) {
      connected = true;

      module.exports.reload = function (id) {
        if (connected) {
          console.log('send reload');
          connection.send(JSON.stringify({
            payload: id,
            opcode: 2
          }));
        }
      }
    });

    module.exports = {
      reload: new Function()
    };

    root.reload = module.exports.reload;
    isNode = true;
  } else {
    ws = new WebSocket(host);

    ws.onopen = function () {
      console.log('opened');

      ws.send(JSON.stringify({
        payload: window.location.href,
        opcode: 1
      }));
    };

    ws.onmessage = function (evt) {
      var data = JSON.parse(evt.data);

      if (data.opcode === 3) {
        location.reload();
      }
    };
  }
})();
