import Vue from 'vue';
import Router from 'vue-router';
import Components from './views/Components/index.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'components',
      component: Components,
    },
  ],
});
