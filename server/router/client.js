const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(
  path.resolve(__dirname, '../public/index.html'),
);

async function index(ctx) {
  ctx.body = html;
  ctx.type = 'text/html';
}

module.exports = {
  index,
};
