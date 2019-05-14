const devController = require('../controller/dev');

async function dev(ctx) {
  const { app } = ctx;
  const { io } = app;
  const reqData = ctx.request.body;

  await devController(io, reqData);

  ctx.body = {
    code: 200
  };
}

module.exports = {
  dev
};