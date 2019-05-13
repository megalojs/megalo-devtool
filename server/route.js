const api = require('./dev.js');
const koaRouter = require('koa-router');
const router = koaRouter();

router.post('/', api.dev);

module.exports = router;