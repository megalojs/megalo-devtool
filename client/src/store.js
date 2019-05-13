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
    updateSelectedVM(state, vm) {
      Object.assign(state, {
        selectedVM: vm,
      });
    },
    updateSelectedVNode(state, vnode) {
      Object.assign(state, {
        selectedVNode: vnode,
      });
    },
    updateCurrentRootVM(state, vm) {
      console.log('current', vm);
      Object.assign(state, {
        currentRootVM: vm,
      });
    },
    updateVM(state, vm) {
      console.log('update vm', vm);
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
      commit('updateCurrentRootVM', pages[0]);
      commit('updateSelectedVM', pages[0]);
      commit('updateSelectedVNode', pages[0].vnode);
    },
    updateCurrentRootVM({ commit }, vm) {
      commit('updateCurrentRootVM', vm);
    },
    updateSelectedVM({ commit }, vm) {
      commit('updateSelectedVM', vm);
      commit('updateSelectedVNode', vm.vnode);
    },
    updateSelectedVNode({ commit }, vnode) {
      commit('updateSelectedVNode', vnode);
    },
    updateVM({ commit }, vm) {
      commit('updateVM', vm);
    },
  },
});
