function collectPageInfo(vm) {
  let res = {};
  if (vm.$mp.page) {
    const page = vm.$mp.page;
    const webviewId = page.data.__webviewId__;
    const path = page.route;
    res = {
      id: webviewId,
      webviewId,
      path,
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
  } else if (vm.$mp.app && vm === vm.$root) { return 'app'; }
   return 'vm';
}

function decycle(val, maxDepth, ignoreKeys) {
  ignoreKeys = ignoreKeys || [];
  const memo = [];
  function doDecycle (val, depth) {
    const type = typeof val;
    if (depth > maxDepth) {
      return '[!Exceed depth ' + maxDepth + ']';
    }
      
    if (val !== null && type === 'object') {
      if (memo.indexOf(val) !== -1) {
        return '[!Circle]';
      }
      memo.push(val);
    }
    
    if (Array.isArray(val)) {
      const res = []
      for(let i = 0; i < val.length; ++i) {
        if (typeof val[i] !== 'function') {
          res.push(doDecycle(val[i], depth + 1));
        }
      }
      return res;
    } else if (type === 'object') {
      const res = {}
      for(let k in val) {
        if (
          typeof val[k] !== 'function' && ignoreKeys.indexOf(k) === -1
        ) {
          res[k] = doDecycle(val[k], depth + 1);
        }
      }
      return res;
    } else if(type === 'function') {
      return '[' + type + ']';
    } else {
      return val;
    }
  }

  return doDecycle(val, 0);
}

module.exports = {
  resolveComponentName,
  collectVMComputed,
  collectVMInfo,
  collectVNode,
  resolveMPType,
  collectPageInfo,
  decycle
};