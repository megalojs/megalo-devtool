const { send } = require('./request');
const {
  resolveMPType,
  collectVMComputed,
  collectVMInfo,
  collectVNode,
} = require('./utils');

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
          const vm = collectVMInfo(this);
          send({
            lifecycle: 'mounted',
            type,
            data: vm
          });
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
        }
      },
    })
  }
}
