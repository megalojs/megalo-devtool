const url = 'http://127.0.0.1:12222/dev'

function send(data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method: 'post',
      data,
      success(res) {
        resolve(res)
      }
    })
  })
}

module.exports = {
  install(Vue, options) {
    Vue.mixin({
      onLaunch() {
        send({
          lifecycle: 'launch'
        })
      },
      onLoad() {
        send({
          lifecycle: 'load'
        })
      },
      mounted() {
        console.log(this)
        if (this.$mp.page && this === this.$root) {
          const vm = collectVMInfo(this);
          send({
            lifecycle: 'mounted',
            type: 'rootVM',
            data: vm
          });
        }
      },
      updated() {
        const vm = collectVMInfo(this);
        send({
          lifecycle: 'updated',
          type: 'vm',
          data: vm
        });
      },
      beforeDestroy() {
        if (this.$mp.page && this === this.$root) {
          console.log('beforeDestroy', this)
          send({
            lifecycle: 'beforeDestroy',
            type: 'vm',
            data: vm,
          });
        }
      },
    })
  }
}

function collectVMInfo(vm) {
  let pageInfo = {};
  if (vm.$mp.page) {
    const page = vm.$mp.page;
    pageInfo = {
      id: page.__wxExparserNodeId__,
      path: page.is,
      wxExparserNodeId: page.__wxExparserNodeId__
    };
  }

  const info = {
    pageInfo,
    _uid: vm._uid,
    name: 'unknown',
    props: vm._props,
    data: vm._data,
    children: [],
    vnode: collectVNode(vm._vnode)
  };

  if (vm.$root === vm) {
    info.name = 'Root'
  } else if(vm.$vnode) {
    info.name = resolveComponentName(vm.$vnode.tag);
  }

  info.children = vm.$children.map(child => {
    return collectVMInfo(child);
  });

  if (vm.$vnode && vm.$vnode.data && vm.$vnode.data.attrs) {
    const { c_, h_, f_ } = vm.$vnode.data.attrs;
    info.componentId = c_;
    info.holderId = h_;
    info.forId = f_ || null;
  }
  return info;
}

function collectVNode(vnode) {
  let tag = resolveComponentName(vnode.tag);
  let data = vnode.data;
  let text = vnode.text;
  let children = [];
  if (vnode.children)  {
    children = vnode.children.map(collectVNode);
  }

  return {
    tag,
    data,
    text,
    children,
  };
}

function resolveComponentName(name) {
  return (name || '').replace(/vue-component-\d+-/, '');
}