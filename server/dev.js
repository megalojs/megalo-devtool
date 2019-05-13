const pageManager = require('./page-manager');

async function dev(ctx) {
  const { app } = ctx;
  const { io } = app;
  const reqData = ctx.request.body;

  io.emit('broadcast', reqData);

  if (reqData.lifecycle === 'launch') {
    pageManager.clear();
  } else if (reqData.lifecycle === 'mounted') {
    pageManager.addPage(reqData.data.pageInfo.id, reqData.data);
  } else if (reqData.lifecycle === 'updated') {
    pageManager.updateVM(reqData.data.pageInfo.id, reqData.data);
  }

  ctx.body = {
    code: 200
  };
}

module.exports = {
  dev
}