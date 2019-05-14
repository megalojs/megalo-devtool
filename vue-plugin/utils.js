function collectVMInfo(vm) {
  let pageInfo = {};
  if (vm.$mp.page) {
    const page = vm.$mp.page;
    pageInfo = {
      webviewId: page.data.__webviewId__,
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
    computed: collectVMComputed(vm),
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

function collectVMComputed(vm) {
  let res = {};
  if (vm._computedWatchers) {
    res = Object.keys(vm._computedWatchers).reduce((res, key) => {
      res[key] = vm._computedWatchers[key].value;
      return res;
    }, res);
  }
  return res;
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

function resolveMPType(vm) {
  if (!vm) {
    return 'unknown';
  } else if (vm.$mp.page && vm === vm.$root) {
    return 'page';
  } else if (vm.$mp.app && vm === vm.$root) {
    return 'app';
  }
  return 'vm';
}

module.exports = {
  resolveComponentName,
  collectVMComputed,
  collectVMInfo,
  collectVNode,
  resolveMPType
};