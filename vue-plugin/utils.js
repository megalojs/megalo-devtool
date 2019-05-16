function collectPageInfo(vm) {
  let res = {};
  if (vm.$mp.page) {
    const page = vm.$mp.page;
    const webviewId = page.data.__webviewId__;
    const wxExparserNodeId = page.__wxExparserNodeId__;
    const path = page.is;
    res = {
      id: webviewId,
      webviewId,
      path,
      wxExparserNodeId,
    };
  }
  return res;
}

function collectVMInfo(vm) {
  const component = {
    name: '',
    _uid: vm._uid,
    props: vm._props,
    data: vm._data,
    computed: collectVMComputed(vm),
    children: [],
    vnode: collectVNode(vm._vnode)
  };

  if (vm.$vnode) {
    component.name = resolveComponentName(vm.$vnode.tag);
  }

  component.children = vm.$children.map(child => {
    return collectVMInfo(child);
  });

  if (vm.$vnode && vm.$vnode.data && vm.$vnode.data.attrs) {
    const { c_, h_, f_ } = vm.$vnode.data.attrs;
    component.componentId = c_;
    component.holderId = h_;
    component.forId = f_ || null;
  }
  return component;
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
  resolveMPType,
  collectPageInfo,
};