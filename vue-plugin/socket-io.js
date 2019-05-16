const io = require('weapp.socket.io');

let socket;

function init(url) {
  socket = io(url);

  socket.on('connect', () => {
    console.log(`[megalo devtool] connect with socket.io ${url}`);
  });
}

module.exports = function getSocket(url) {
  if (!socket) {
    init(url)
  }
  return socket
}