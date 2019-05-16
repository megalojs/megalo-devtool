const getSocket = require('./socket-io');

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

let useSocketIO = false;
const socket = getSocket(url);
console.log(`[megalo devtool]: dev server address is ${url}`);

socket.on('connect', () => {
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
    socket.send(data, (...args) => {
      console.log(...args)
      resolve()
    });
  });
}

function send(data) {
  return useSocketIO ? sendWithSocketIO(data) : sendWithHttp(data);
}

module.exports = {
  send
}