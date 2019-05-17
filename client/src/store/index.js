/* eslint-disable no-underscore-dangle */
import Vue from 'vue';
import Vuex from 'vuex';
import components from '../views/Components/module';
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
    syncComponent(state, { component, pages, pageInfo }) {
      const page = pages.find(rootVM => (
        rootVM.pageInfo.id === pageInfo.id
      ));

      if (page) {
        doUpdateComponent(page.component, component);
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
  },
});
