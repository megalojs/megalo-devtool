function handleVuex(store, req) {
  const { data, timestamp } = req;
  const {
    storeId,
    mutation,
    state,
    subscribedPages,
  } = data;
  const payload = {
    storeId,
    mutation,
    state,
    subscribedPages,
    timestamp,
  };

  if (mutation.type === '__devtool__:init') {
    store.dispatch('vuex/addStore', payload);
  } else {
    store.dispatch('vuex/addMutation', payload);
  }
}

function handleEvents(store, req) {
  store.dispatch('addEvent', req);
}

function handleComponents(store, req) {
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
  const { module } = req;
  if (module === 'components') {
    handleComponents(store, req);
  } else if (module === 'events') {
    handleEvents(store, req);
  } else if (module === 'vuex') {
    console.log(store);
    handleVuex(store, req);
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
