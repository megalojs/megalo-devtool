function handlerComponents(req, store) {
  if (req.type === 'component') {
    store.dispatch('syncComponent', req.data);
  } else if (req.lifecycle === 'launch') {
    store.dispatch('refreshPages', []);
  } else if (req.lifecycle === 'mounted' && req.type === 'page') {
    store.dispatch('addPage', req.data);
  } else if (req.lifecycle === 'beforeDestroy' && req.type === 'page') {
    store.dispatch('removePage', req.data);
  }

  if (req.data && req.data.versions && req.data.versions.vue) {
    store.dispatch('syncVersions', req.data.versions);
  }
}

async function broadcast(req, store) {
  if (req.module === 'components') {
    handlerComponents(req, store);
  }
}

async function allPage({ versions, pages }, store) {
  store.dispatch('syncVersions', versions);
  store.dispatch('refreshPages', pages);
}

export {
  broadcast,
  allPage,
};
