const log = require('../utils/log');

async function manualRefresh(ctx, data, fn) {
  const { sockets } = ctx.io.namespace.dev;
  let socket;
  Object.keys(sockets)
    .forEach((key) => {
      socket = sockets[key];
    });

  if (socket) {
    socket.emit('refreshPages', ({ pages, versions, stores }) => {
      log('refreshPages', pages);
      fn({ versions, pages, stores });
    });
  }
}

module.exports = {
  manualRefresh,
};
