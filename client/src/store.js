/* eslint-disable no-underscore-dangle */
import Vue from 'vue';
import Vuex from 'vuex';
import * as doUpdateVM from '../../shared/update-vm';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pages: [],
    currentRootVM: {},
    currentVM: {},
    currentVNode: {},
  },
  mutations: {
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
    updateCurrentVM(state, vm) {
      Object.assign(state, { currentVM: vm });
    },
    updateCurrentVNode(state, vnode) {
      Object.assign(state, { currentVNode: vnode });
    },
    updateCurrentRootVM(state, vm) {
      Object.assign(state, { currentRootVM: vm });
    },
    updateVM(state, vm) {
      const { pages } = state;
      const targetRrooVM = pages.find(rootVM => (
        rootVM.pageInfo.id === vm.pageInfo.id
      ));

      if (targetRrooVM) {
        doUpdateVM(targetRrooVM, vm);
      }
    },
  },
  actions: {
    refreshPages({ commit, dispatch }, pages) {
      commit('refreshPages', pages);

      dispatch('updateCurrentRootVM', pages[0]);
    },
    addPage({ commit, dispatch }, page) {
      commit('addPage', page);

      dispatch('updateCurrentRootVM', page);
    },
    removePage({ commit, state, dispatch }, page) {
      commit('removePage', page);

      dispatch('updateCurrentRootVM', state.pages[0]);
    },
    updateCurrentRootVM({ commit, dispatch }, vm) {
      commit('updateCurrentRootVM', vm);

      dispatch('updateCurrentVM', vm);
    },
    updateCurrentVM({ commit, dispatch }, vm) {
      commit('updateCurrentVM', vm);

      dispatch('updateCurrentVNode', vm && vm.vnode);
    },
    updateCurrentVNode({ commit }, vnode) {
      commit('updateCurrentVNode', vnode);
    },
    updateVM({ commit }, vm) {
      commit('updateVM', vm);
    },
  },
});
