const path = require('path');
const dev = require('./dev.js');
const index = require('./client');
const koaRouter = require('koa-router');
const serve = require('koa-static');
const router = koaRouter();

module.exports = {
  install(app) {
    router.post('/dev', dev.dev);
    router.get('/', index.index);
    app.use(router.routes());
    app.use(serve(path.resolve(__dirname, '../public')));
  }
}
