const getSocket = require('./socket-io');
const { send } = require('./request');
const {
  resolveMPType,
  collectVMComputed,
  collectVMInfo,
  collectVNode,
} = require('./utils');

const pagesCache = [];
const socket = getSocket();

socket.on('manualRefreshPages', (fn) => {
  const pages = pagesCache.map(collectVMInfo);
  fn(pages);
});

module.exports = {
  install(Vue, options) {
    Vue.mixin({
      onLaunch() {
        send({
          lifecycle: 'launch',
          type: 'app'
        });
      },
      onLoad() {
        // new page load
        send({
          lifecycle: 'load',
          type: resolveMPType(this)
        });
      },
      mounted() {
        const type = resolveMPType(this);
        if (type === 'page') {
          const data = collectVMInfo(this);
          send({
            lifecycle: 'mounted',
            type,
            data,
          });

          pagesCache.push(this);
          console.log(pagesCache);
        }
      },
      updated() {
        if (this.$mp.page) {
          const vm = collectVMInfo(this);
          send({
            lifecycle: 'updated',
            type: 'vm',
            data: vm
          });
        }
      },
      beforeDestroy() {
        const type = resolveMPType(this);
        if (type === 'page') {
          const vm = collectVMInfo(this);
          send({
            lifecycle: 'beforeDestroy',
            type,
            data: vm,
          });

          const index = pagesCache.findIndex(vm => vm === this);
          pagesCache.splice(index, 1);
        }
      },
    })
  }
}
