const {
  send,
  resolve,
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
        })
      },
      onLoad() {
        send({
          lifecycle: 'load',
          type: this === this.$root ? 'page' : 'vm'
        })
      },
      mounted() {
        if (this.$mp.page && this === this.$root) {
          const vm = collectVMInfo(this);
          send({
            lifecycle: 'mounted',
            type: 'page',
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
        if (this.$mp.page && this === this.$root) {
          const vm = collectVMInfo(this);
          send({
            lifecycle: 'beforeDestroy',
            type: 'page',
            data: vm,
          });
        }
      },
    })
  }
}
