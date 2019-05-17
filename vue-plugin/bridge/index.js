const getSocket = require('./socket-io');
const bridge = module.exports = {};
let host;
let port;

try {
  host = MEGALO_DEVTOOL_HOST || '127.0.0.1';
  port = MEGALO_DEVTOOL_PORT || 12222;
} catch(err) {
  host = '127.0.0.1';
  port = 12222;
}

const url = `http://${host}:${port}/dev`

bridge.socket = getSocket(url);

let useSocketIO = false;
console.log(`[megalo devtool]: dev server address is ${url}`);

bridge.on = function() {
  const args = [].slice.call(arguments, 0);
  this.socket.on.apply(this.socket, args);
};

bridge.emit = function(data) {
  const timestamp = Date.now();
  Object.assign(data, { timestamp });
  return send(data);
}

bridge.on('connect', () => {
  useSocketIO = true;
});

function sendWithHttp(data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method: 'post',
      data,
      success(res) {
        resolve(res)
      }
    })
  });
}

function sendWithSocketIO(data) {
  return new Promise((resolve, reject) => {
    bridge.socket.send(data, (...args) => {
      console.log(...args)
      resolve()
    });
  });
}

function send(data) {
  return useSocketIO ? sendWithSocketIO(data) : sendWithHttp(data);
}
