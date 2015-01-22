var LiveReload = function () {
  var host = 'ws://lively-reload.herokuapp.com/'
  var ws = new WebSocket(host);
  ws.onmessage = function (event) {
    console.log(event);
  };
}
