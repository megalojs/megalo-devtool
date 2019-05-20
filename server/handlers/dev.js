module.exports = {
  message(ctx, req) {
    ctx.io.namespace.ui.emit('broadcast', req);
  },
};
