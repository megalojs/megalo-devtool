const pageManager = require('./page-manager');

async function manualRefresh(ctx, data, fn) {
  fn(data);
  console.log(data, fn);
}

function connection(ctx) {
  const pages = pageManager.all();
  ctx.client.emit('allpage', pages);
}

module.exports = {
  connection,
  manualRefresh,
};
