(function () {
  var isNode = false;

  var host = 'ws://lively-reload.herokuapp.com/'
  var ws = new WebSocket(host);

  // Export the Underscore object for **CommonJS**, with backwards-compatibility
  // for the old `require()` API. If we're not in CommonJS, add `_` to the
  // global object.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      reload: function (id) {
        ws.send({
          payload: id,
          opcode: 2
        });
      }
    };

    root.reload = module.exports.reload;
    isNode = true;
  } else {
    ws.onopen = function () {
      ws.send({
        payload: window.location.href,
        opcode: 1
      });
    };

    ws.onmessage = function (evt) {
      console.log(evt);
      if (evt.data.opcode === 3) {
        location.reload();
      }
    };
  }
})();
