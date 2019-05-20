import Vue from 'vue';
import Router from 'vue-router';
import Components from './views/Components/index.vue';
import Events from './views/Events/index.vue';
import Vuex from './views/Vuex/index.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/components',
      name: 'components',
      component: Components,
    },
    {
      path: '/events',
      name: 'events',
      component: Events,
    },
    {
      path: '/vuex',
      name: 'vuex',
      component: Vuex,
    },
    {
      path: '/',
      redirect: '/components',
    },
  ],
});
