const devHandlers = require('../handlers/dev');

async function dev(ctx) {
  const { app } = ctx;
  const { io } = app;
  const reqData = ctx.request.body;

  await devHandlers.message({ io }, reqData);

  ctx.body = {
    code: 200,
  };
}

module.exports = {
  dev,
};
