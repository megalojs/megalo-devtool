/* eslint-disable no-underscore-dangle */
import * as doUpdateComponent from '../../../../shared/update-component';

const _state = {
  currentRootComponent: {},
  currentComponent: {},
  currentVNode: {},
  versions: {},
};

const mutations = {
  updateCurrentComponent(state, component) {
    Object.assign(state, { currentComponent: component });
  },
  updateCurrentVNode(state, vnode) {
    Object.assign(state, { currentVNode: vnode });
  },
  updateCurrentRootComponent(state, component) {
    Object.assign(state, { currentRootComponent: component });
  },
  updateComponent(state, { component, pages, pageInfo }) {
    const page = pages.find(rootVM => (
      rootVM.pageInfo.id === pageInfo.id
    ));

    if (page) {
      doUpdateComponent(page.component, component);
    }
  },
};

const actions = {
  updateCurrentRootComponent({ commit, dispatch }, component) {
    commit('updateCurrentRootComponent', component);

    dispatch('updateCurrentComponent', component);
  },
  updateCurrentComponent({ commit, dispatch }, component) {
    commit('updateCurrentComponent', component);

    dispatch('updateCurrentVNode', component && component.vnode);
  },
  updateCurrentVNode({ commit }, vnode) {
    commit('updateCurrentVNode', vnode);
  },
  updateComponent({ commit, rootState }, { pageInfo, component }) {
    const { pages } = rootState;
    commit('updateComponent', { component, pages, pageInfo });
  },
};

export default {
  namespaced: true,
  state: _state,
  mutations,
  actions,
};
