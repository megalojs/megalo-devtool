function handlerEvents(store, req) {
  store.dispatch('addEvent', req);
}

function handlerComponents(store, req) {
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

async function broadcast(store, req) {
  if (req.module === 'components') {
    handlerComponents(store, req);
  } else if (req.module === 'events') {
    handlerEvents(store, req);
  }
}

async function allPage(store, { versions, pages }) {
  store.dispatch('syncVersions', versions);
  store.dispatch('refreshPages', pages);
}

export {
  broadcast,
  allPage,
};
