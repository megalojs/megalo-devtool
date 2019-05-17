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
    socket.emit('refreshPages', ({ pages, versions }) => {
      log('refreshPages', pages);

      pageManager.clear();
      pages.forEach((page) => {
        pageManager.addPage(page.pageInfo.id, page);
      });

      fn({ versions, pages });
    });
  }
}

function connection(ctx) {
  const pagesObj = pageManager.all();
  const versions = pageManager.getVersions();
  const pages = Object.keys(pagesObj)
    .map(id => pagesObj[id]);

  ctx.client.emit('allpage', {
    versions,
    pages,
  });
}

module.exports = {
  connection,
  manualRefresh,
};
