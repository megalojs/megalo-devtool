const bridge = require('./bridge');
const {
  resolveComponentName,
  resolveMPType,
  collectPageInfo,
  collectVMInfo,
  decycle,
} = require('./utils');

const rootVMCache = [];

let versions = {};

bridge.on('refreshPages', (fn) => {
  const pages = rootVMCache.map(rootVM => {
    return {
      pageInfo: collectPageInfo(rootVM),
      component: collectVMInfo(rootVM),
    };
  });

  fn({
    versions,
    pages,
  });
});

module.exports = {
  install(Vue, options) {
    versions = {
      vue: Vue.version,
      megalo: Vue.megaloVersion,
    };

    const oEmit = Vue.prototype.$emit;

    Vue.prototype.$emit = function(type, data) {
      const vm = this;
      oEmit.call(vm, type, data);
      handleEvent(vm, type, data, 'component');
    }

    // const oGlobalEventHandler = Vue.config.globalEventHandler;
    // Vue.config.globalEventHandler = function(vm, data, handlers) {
    //   if (oGlobalEventHandler) {
    //     oGlobalEventHandler.call(this, vm, data, handlers);
    //   }
    //   handleEvent(vm, data.type, data);
    // }

    Vue.mixin({
      onLaunch() {
        bridge.emit({
          module: 'components',
          lifecycle: 'launch',
          type: 'app',
          data: {
            versions,
          }
        });
      },
      onLoad() {
        // new page load
        bridge.emit({
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
          bridge.emit({
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
          bridge.emit({
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
          bridge.emit({
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


function handleEvent(vm, type, data) {
  const event = decycle(data, 20, ['_isVue', 'state', '_vm', '$store']);
  const pageInfo = collectPageInfo(vm);
  let emitterName = 'Root';
  if (vm.$vnode) {
    emitterName = resolveComponentName(vm.$vnode.tag);
  }

  bridge.emit({
    module: 'events',
    data: {
      emitterName,
      pageInfo,
      type,
      event
    }
  });
}