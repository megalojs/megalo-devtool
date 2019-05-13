const pageManager = require('./page-manager');
const socketIO = require('socket.io');

function install(app, server) {
  const io = socketIO(server);

  io.on('connection', function(client) {
    const pages = pageManager.all();
    console.log(`client connected ${client.id}`)
    client.emit('allpage', pages)
  });

  Object.assign(app, { io });
}

module.exports = {
  install
};
