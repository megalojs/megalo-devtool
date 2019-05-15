async function broadcast(data, store) {
  console.log('broadcast', data);
  if (data.type === 'vm') {
    store.dispatch('updateVM', data.data);
  } else if (data.lifecycle === 'launch') {
    store.dispatch('refreshPages', []);
  } else if (data.lifecycle === 'mounted' && data.type === 'page') {
    store.dispatch('addPage', data.data);
  } else if (data.lifecycle === 'beforeDestroy' && data.type === 'page') {
    store.dispatch('removePage', data.data);
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
