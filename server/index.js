const { port } = require('./env');
const Koa = require('koa');
const json = require('koa-json');
const logger = require('koa-logger');
const path = require('path');
const serve = require('koa-static');
const koaRouter = require('koa-router');
const koaBodyparser = require('koa-bodyparser');
const devRoute = require('./route');

const app = new Koa();
const router = koaRouter()
const http = require('http');

app.use(koaBodyparser())
app.use(json())
app.use(logger())

app.use(async function (ctx, next) {
  let start = new Date()
  await next()
  let ms = new Date() - start
  console.log('%s %s - %s', ctx.method, ctx.url, ms)
});

app.on('error', function (err, ctx) {
  console.log('server error', err)
})

router.use('/dev', devRoute.routes());
app.use(router.routes());
app.use(serve(path.resolve('dist')));

const server = http.createServer(app.callback());



const pageManager = require('./page-manager');
const io = require('socket.io')(server);

io.on('connection', function(client) {
  const pages = pageManager.all();
  console.log(`client connected ${client.id}`)
  client.emit('allpage', pages)
});

Object.assign(app, { io });

server.listen(port, '0.0.0.0', (...args) => {
  console.log(`listening on ${port}`)
});