import Vue from 'vue';
import App from './App.vue';
import router from './router';
import socket from './socket';
import store from './store';

const url = process.env.NODE_ENV === 'production' ? `http://${window.location.host}/ui`
  : 'http://127.0.0.1:12222/ui';

Vue.config.productionTip = false;

socket.install(Vue, { store, url });

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
