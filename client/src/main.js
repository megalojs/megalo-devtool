import Vue from 'vue';
import App from './App.vue';
import router from './router';
import socket from './socket';
import store from './store';

// const url = `http://${window.location.host}/ui`;
const url = 'http://127.0.0.1:12222/ui';

Vue.config.productionTip = false;

socket.install(Vue, { store, url });

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
