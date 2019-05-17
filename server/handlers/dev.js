const pageManager = require('./page-manager');

const components = {
  launch(ctx, { data }) {
    pageManager.clear();
    if (data.versions) {
      pageManager.syncVersions(data.versions);
    }
  },
  mounted(ctx, { data }) {
    pageManager.addPage(data.pageInfo.id, data);
  },
  updated(ctx, { data }) {
    pageManager.syncComponent(data.pageInfo.id, data.component);
  },
  beforeDestroy(ctx, { type, data }) {
    if (type === 'page') {
      pageManager.removePage(data.pageInfo.id, data);
    }
  },
};

module.exports = {
  message(ctx, req) {
    ctx.io.namespace.ui.emit('broadcast', req);

    if (req.module === 'components' && components[req.lifecycle]) {
      components[req.lifecycle](ctx, req);
    }
  },
};
