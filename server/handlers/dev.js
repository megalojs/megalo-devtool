const pageManager = require('./page-manager');

const lifecycle = {
  launch() {
    pageManager.clear();
  },
  mounted(type, data) {
    pageManager.addPage(data.pageInfo.id, data);
  },
  updated(type, data) {
    pageManager.updateVM(data.pageInfo.id, data);
  },
  beforeDestroy(type, data) {
    if (type === 'page') {
      pageManager.removePage(data.pageInfo.id, data);
    }
  },
};

module.exports = {
  message({ io }, data) {
    io.namespace.ui.emit('broadcast', data);

    if (lifecycle[data.lifecycle]) {
      lifecycle[data.lifecycle](data.type, data.data);
    }
  },
};
