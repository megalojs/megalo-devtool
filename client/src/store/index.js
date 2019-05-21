/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
import Vue from 'vue';
import Vuex from 'vuex';
import components from '../views/Components/module';
import events from '../views/Events/module';
import vuex from '../views/Vuex/module';
import { doUpdateComponent, findComponent } from '../utils';

Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    versions: {},
    pages: [],
    currentPage: {},
  },
  modules: {
    vuex,
    components,
    events,
  },
  mutations: {
    updateCurrentPage(state, page) {
      Object.assign(state, { currentPage: page });
    },
    refreshPages(state, pages) {
      Object.assign(state, { pages });
    },
    addPage(state, page) {
      state.pages.unshift(page);
    },
    removePage(state, target) {
      const index = state.pages.findIndex(
        page => page.pageInfo.id === target.pageInfo.id,
      );
      if (index >= 0) {
        state.pages.splice(index, 1);
      }
    },
    syncVersions(state, versions) {
      Object.assign(state, { versions });
    },
    syncComponent(state, { component, pageInfo }) {
      const page = state.pages.find(rootVM => (
        rootVM.pageInfo.id === pageInfo.id
      ));

      if (page) {
        doUpdateComponent(page.component, component);
      }
    },
    addEvent(state, data) {
      const { pageInfo } = data;
      const page = state.pages.find(p => (
        p.pageInfo.id === pageInfo.id
      ));

      if (page) {
        page.events.push(data);
      }
    },
  },
  actions: {
    syncVersions({ commit }, versions) {
      commit('syncVersions', versions);
    },
    updateCurrentPage({ commit, dispatch }, page) {
      commit('updateCurrentPage', page);

      dispatch('components/updateCurrentRootComponent', page.component);
      dispatch('events/updateCurrentEvents', page.events);
    },
    refreshPages({ commit, dispatch }, pages) {
      pages.forEach((page) => {
        if (!page.events) {
          Object.assign(page, { events: [] });
        }
      });

      commit('refreshPages', pages);

      const page = pages[0] || {};
      dispatch('updateCurrentPage', page);

      dispatch('components/updateCurrentRootComponent', page.component);
      dispatch('events/updateCurrentEvents', page.events);
    },
    addPage({ commit, dispatch }, page) {
      if (!page.events) {
        Object.assign(page, { events: [] });
      }
      commit('addPage', page);

      dispatch('components/updateCurrentRootComponent', page.component);
      dispatch('events/updateCurrentEvents', page.events);
    },
    removePage({ commit, state, dispatch }, page) {
      commit('removePage', page);

      const currentPage = state.pages[0];
      const currentComponent = (currentPage && currentPage.component) || null;
      dispatch('components/updateCurrentRootComponent', currentComponent);
    },
    syncComponent({ commit, state, dispatch }, { pageInfo, component }) {
      const { pages, currentPage } = state;
      const { currentComponent } = state.components;
      commit('syncComponent', { component, pages, pageInfo });

      if (
        currentComponent
        && currentPage
        && currentPage.pageInfo.id === pageInfo.id
      ) {
        const changedInCurrentComponent = findComponent(component, currentComponent);
        if (changedInCurrentComponent) {
          const res = findComponent(currentPage.component, currentComponent);
          dispatch('components/updateCurrentComponent', res);
        }
      }
    },
    addEvent({ commit }, data) {
      const { timestamp } = data;
      const {
        pageInfo,
        type,
        event,
        emitterName,
      } = data.data;

      commit('addEvent', {
        pageInfo,
        timestamp,
        type,
        event,
        emitterName,
      });
    },
  },
});

if (module.hot) {
  module.hot.accept([
    '../views/Components/module',
    '../views/Vuex/module',
    '../views/Events/module',
  ], () => {
    try {
      store.hotUpdate({
        modules: {
          components: require('../views/Components/module').default,
          vuex: require('../views/Vuex/module').default,
          events: require('../views/Events/module').default,
        },
      });
    } catch (e) {
      console.log(e.stack);
    }
  });
}

export default store;
