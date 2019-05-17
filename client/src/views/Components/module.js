/* eslint-disable no-underscore-dangle */
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
};

export default {
  namespaced: true,
  state: _state,
  mutations,
  actions,
};
