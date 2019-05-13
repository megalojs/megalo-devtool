const api = require('./dev.js');
const index = require('./client.js');
const koaRouter = require('koa-router');
const router = koaRouter();

router.post('/', api.dev);

module.exports = router;