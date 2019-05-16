const log = require('../utils/log');
const pageManager = require('./page-manager');

async function manualRefresh(ctx, data, fn) {
  const { sockets } = ctx.io.namespace.dev;
  let socket;
  Object.keys(sockets)
    .forEach((key) => {
      socket = sockets[key];
    });
  if (socket) {
    socket.emit('refreshPages', (pages) => {
      log('refreshPages', pages);

      pageManager.clear();
      pages.forEach((page) => {
        pageManager.addPage(page.pageInfo.id, page);
      });

      fn(pages);
    });
  }
}

function connection(ctx) {
  const pages = pageManager.all();
  ctx.client.emit('allpage', pages);
}

module.exports = {
  connection,
  manualRefresh,
};
