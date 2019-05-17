const getSocket = require('./socket-io');
const { send } = require('./request');
const {
  resolveMPType,
  collectPageInfo,
  collectVMInfo,
} = require('./utils');

const rootVMCache = [];
const socket = getSocket();

socket.on('refreshPages', (fn) => {
  const pages = rootVMCache.map(rootVM => {
    return {
      pageInfo: collectPageInfo(rootVM),
      component: collectVMInfo(rootVM),
    };
  });
  fn(pages);
});

module.exports = {
  versions: {},
  install(Vue, options) {
    this.versions = {
      vue: Vue.version,
      megalo: Vue.megaloVersion,
    };

    Vue.mixin({
      onLaunch() {
        send({
          module: 'components',
          lifecycle: 'launch',
          type: 'app',
        });
      },
      onLoad() {
        // new page load
        send({
          module: 'components',
          lifecycle: 'load',
          type: resolveMPType(this)
        });
      },
      mounted() {
        const type = resolveMPType(this);
        if (type === 'page') {
          const pageInfo = collectPageInfo(this);
          const component = collectVMInfo(this);
          send({
            module: 'components',
            lifecycle: 'mounted',
            type,
            data: {
              pageInfo,
              component
            },
          });

          rootVMCache.push(this);
        }
      },
      updated() {
        if (this.$mp.page) {
          const pageInfo = collectPageInfo(this);
          const component = collectVMInfo(this);
          send({
            module: 'components',
            lifecycle: 'updated',
            type: 'component',
            data: {
              pageInfo,
              component
            },
          });
        }
      },
      beforeDestroy() {
        const type = resolveMPType(this);
        if (type === 'page') {
          const pageInfo = collectPageInfo(this);
          const component = collectVMInfo(this);
          send({
            module: 'components',
            lifecycle: 'beforeDestroy',
            type,
            data: {
              pageInfo,
              component
            },
          });

          const index = rootVMCache.findIndex(vm => vm === this);
          rootVMCache.splice(index, 1);
        }
      },
    })
  }
}
