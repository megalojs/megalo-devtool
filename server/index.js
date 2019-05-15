const Koa = require('koa');
const json = require('koa-json');
const logger = require('koa-logger');
const path = require('path');
const koaBodyparser = require('koa-bodyparser');
const router = require('./router');

const app = new Koa();
const http = require('http');
const socketIO = require('./scoket-io');
const log = require('./utils/log');

app.use(koaBodyparser())
app.use(json())
app.use(logger())

app.use(async function (ctx, next) {
  let start = new Date()
  await next()
  let ms = new Date() - start
  log('%s %s - %s', ctx.method, ctx.url, ms)
});

app.on('error', function (err, ctx) {
  log('server error', err)
})

router.install(app);

const server = http.createServer(app.callback());
socketIO.install(app, server);

function start(port = 12222) {
  server.listen(port, '0.0.0.0', (...args) => {
    log(`listening on ${port}`)
  });
  return server;
}

module.exports = {
  start
};