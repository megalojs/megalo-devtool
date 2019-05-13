/* eslint-disable no-underscore-dangle */
import Vue from 'vue';
import Vuex from 'vuex';
import * as doUpdateVM from '../../shared/update-vm';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pages: [],
    currentRootVM: {},
    selectedVM: {},
    selectedVNode: {},
  },
  mutations: {
    refreshPages(state, pages) {
      Object.assign(state, {
        pages,
      });
    },
    addPage(state, page) {
      state.pages.unshift(page);
    },
    removePage(state, target) {
      const index = state.pages.findIndex(page => page.pageInfo.id === target.pageInfo.id);
      if (index >= 0) {
        state.pages.splice(index, 1);
      }
    },
    updateSelectedVM(state, vm) {
      Object.assign(state, {
        selectedVM: vm,
      });
    },
    updateSelectedVNode(state, vnode) {
      Object.assign(state, {
        selectedVNode: vnode || {},
      });
    },
    updateCurrentRootVM(state, vm) {
      Object.assign(state, {
        currentRootVM: vm,
      });
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
    refreshPages({ commit }, pages) {
      commit('refreshPages', pages);
      const currentRootVM = pages[0];
      commit('updateCurrentRootVM', currentRootVM);
      commit('updateSelectedVM', currentRootVM);
      commit('updateSelectedVNode', currentRootVM && currentRootVM.vnode);
    },
    addPage({ commit }, page) {
      commit('addPage', page);
      const currentRootVM = page;
      commit('updateCurrentRootVM', currentRootVM);
      commit('updateSelectedVM', currentRootVM);
      commit('updateSelectedVNode', currentRootVM && currentRootVM.vnode);
    },
    removePage({ commit, state }, page) {
      commit('removePage', page);
      const currentRootVM = state.pages[0];
      commit('updateCurrentRootVM', currentRootVM);
      commit('updateSelectedVM', currentRootVM);
      commit('updateSelectedVNode', currentRootVM && currentRootVM.vnode);
    },
    updateCurrentRootVM({ commit }, vm) {
      commit('updateCurrentRootVM', vm);
    },
    updateSelectedVM({ commit }, vm) {
      commit('updateSelectedVM', vm);
      commit('updateSelectedVNode', vm && vm.vnode);
    },
    updateSelectedVNode({ commit }, vnode) {
      commit('updateSelectedVNode', vnode);
    },
    updateVM({ commit }, vm) {
      commit('updateVM', vm);
    },
  },
});
