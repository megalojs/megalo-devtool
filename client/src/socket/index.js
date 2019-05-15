import IOClient from './IOClient';
import * as handlers from './handlers';
import * as api from './api';

function install(Vue, { store, url }) {
  const ioclient = new IOClient(url, store);

  ioclient
    .use('broadcast', handlers.broadcast)
    .use('allpage', handlers.allPage)
    .applyApi(api);

  Vue.mixin({
    beforeCreate() {
      this.$ioclient = ioclient;
    },
  });
}

export default {
  install,
};
