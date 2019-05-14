const pageManager = require('./page-manager');
const socketIO = require('socket.io');
const devController = require('./controller/dev');

function install(app, server) {
  const namespace = {};
  const io = socketIO(
    server,
    {
      transports: [ 'polling', 'websocket' ],
    },
  );
  io.namespace = namespace;
  namespace.dev = io.of('/dev');
  namespace.ui = io.of('/ui');

  namespace.dev.on('connection', (client) => {
    console.log(`dev client connected ${client.id}`);
    client.on('message', (reqData) => {
      devController(io, reqData);
    });
  });


  namespace.ui.on('connection', (client) => {
    console.log(`ui client connected ${client.id}`);
    const pages = pageManager.all();
    client.emit('allpage', pages)
  });

  io.on('connection', function(client) {
    // const { room } = client.handshake.query || {};
    // console.log(`client connected ${client.id} with type ${room}`)
    // client.join(room);
  });

  Object.assign(app, { io });
}

module.exports = {
  install
};
