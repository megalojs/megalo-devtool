const pageManager = require('./page-manager');

const components = {
  launch() {
    pageManager.clear();
  },
  mounted(type, data) {
    pageManager.addPage(data.pageInfo.id, data);
  },
  updated(type, data) {
    pageManager.updateComponent(data.pageInfo.id, data.component);
  },
  beforeDestroy(type, data) {
    if (type === 'page') {
      pageManager.removePage(data.pageInfo.id, data);
    }
  },
};

module.exports = {
  message({ io }, req) {
    io.namespace.ui.emit('broadcast', req);

    if (req.module === 'components' && components[req.lifecycle]) {
      components[req.lifecycle](req.type, req.data);
    }
  },
};
