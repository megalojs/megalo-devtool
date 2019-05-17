const Koa = require('koa');
const json = require('koa-json');
const logger = require('koa-logger');
const koaBodyparser = require('koa-bodyparser');
const http = require('http');

const router = require('./router');
const socketIO = require('./scoket-io');
const log = require('./utils/log');

const app = new Koa();

app.use(koaBodyparser());
app.use(json());
app.use(logger());

app.use(async (ctx, next) => {
  const startTime = new Date();
  await next();
  const ms = new Date() - startTime;
  log('%s %s - %s', ctx.method, ctx.url, ms);
});

app.on('error', (err) => {
  log('server error', err);
});

router.install(app);

const server = http.createServer(app.callback());
socketIO.install(app, server);

function start(port = 12222) {
  server.listen(port, '0.0.0.0', () => {
    log(`listening on ${port}`);
  });
  return server;
}

module.exports = {
  start,
};
