const log = require('../utils/log');
const pageManager = require('./page-manager');

async function manualRefresh(ctx, data, fn) {
  const { sockets } = ctx.io.namespace.dev;
  let socket;
  Object.keys(sockets)
    .forEach((key) => {
      socket = sockets[key];
    });
  socket.emit('manualRefreshPages', (pages) => {
    log('manualRefreshPages', pages);
    fn(pages);
  });
}

function connection(ctx) {
  const pages = pageManager.all();
  ctx.client.emit('allpage', pages);
}

module.exports = {
  connection,
  manualRefresh,
};
