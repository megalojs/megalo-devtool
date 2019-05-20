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
    socket.emit('refreshPages', ({ pages, versions, stores }) => {
      log('refreshPages', pages);

      pageManager.clear();
      pages.forEach((page) => {
        pageManager.addPage(page.pageInfo.id, page);
      });


      if (versions.vue) {
        pageManager.syncVersions(versions);
      }

      fn({ versions, pages, stores });
    });
  }
}

module.exports = {
  manualRefresh,
};
