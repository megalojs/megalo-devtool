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
let storeId = 0;

bridge.on('refreshPages', (fn) => {
  const stores = [];
  const pages = rootVMCache.map(rootVM => {
    const $store = rootVM.$store;

    if ($store) {
      const timestamp = Date.now();
      const storeId = $store.__devtoolStoreId;
      const subscribedPages = $store.__devtoolSubscribedPages;
      const exist = stores.some(s => s.storeId === storeId);
      if (!exist) {
        stores.push({
          storeId,
          mutation: { type: '__devtool__:init' },
          state: $store.state,
          subscribedPages,
          timestamp,
        });
      }
    }

    return {
      pageInfo: collectPageInfo(rootVM),
      component: collectVMInfo(rootVM),
    };
  });

  fn({
    versions,
    pages,
    stores,
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

          handleStore(this.$store, pageInfo);

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

function handleStore(store, pageInfo) {
  if (store.__devtoolStoreId === undefined) {
    store.__devtoolStoreId = storeId;
    storeId++;
  }

  // record pages subscribed to this store
  if (!store.__devtoolSubscribedPages) {
    store.__devtoolSubscribedPages = []
  }
  store.__devtoolSubscribedPages.push(pageInfo)

  if (store && !store.__devtoolSubscribed) {
      const storeId = store.__devtoolStoreId;
      const subscribedPages = store.__devtoolSubscribedPages;
      bridge.emit({
        module: 'vuex',
        data: {
          storeId,
          mutation: { type: '__devtool__:init' },
          state: store.state,
          subscribedPages,
        },
      });

      store.subscribe((mutation, state) => {
        bridge.emit({
          module: 'vuex',
          data: {
            storeId,
            mutation,
            state,
            subscribedPages,
          },
        });
      });
      store.__devtoolSubscribed = true;
  }
}