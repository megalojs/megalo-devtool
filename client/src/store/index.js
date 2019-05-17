/* eslint-disable no-underscore-dangle */
import Vue from 'vue';
import Vuex from 'vuex';
import components from '../views/Components/module';
import events from '../views/Events/module';
import * as doUpdateComponent from '../../../shared/update-component';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    versions: {},
    pages: [],
    currentPage: {},
  },
  modules: {
    components,
    events,
  },
  mutations: {
    updateCurrentPage(state, page) {
      if (!page.events) {
        Object.assign(page, { events: [] });
      }
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
        if (!page.events) {
          Object.assign(page, { events: [] });
        }
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
      commit('refreshPages', pages);

      const page = pages[0] || {};
      dispatch('updateCurrentPage', page);

      dispatch('components/updateCurrentRootComponent', page.component);
    },
    addPage({ commit, dispatch }, page) {
      commit('addPage', page);

      dispatch('components/updateCurrentRootComponent', page.component);
    },
    removePage({ commit, state, dispatch }, page) {
      commit('removePage', page);

      dispatch('components/updateCurrentRootComponent', state.pages[0].component);
    },
    syncComponent({ commit, state }, { pageInfo, component }) {
      const { pages } = state;
      commit('syncComponent', { component, pages, pageInfo });
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
