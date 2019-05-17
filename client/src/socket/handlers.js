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
}

async function broadcast(req, store) {
  console.log('broadcast', req);

  if (req.module === 'components') {
    handlerComponents(req, store);
  }
}

async function allPage(data, store) {
  const pages = Object.keys(data)
    .map(id => data[id]);
  store.dispatch('refreshPages', pages);
}

export {
  broadcast,
  allPage,
};
