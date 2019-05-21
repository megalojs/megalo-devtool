/* eslint-disable no-underscore-dangle */
const _state = {
  currentEvents: [],
  currentEvent: null,
};

const mutations = {
  updateCurrentEvents(state, currentEvents) {
    Object.assign(state, { currentEvents });
  },
  updateCurrentEvent(state, currentEvent) {
    Object.assign(state, { currentEvent });
  },
};

const actions = {
  updateCurrentEvents({ commit, dispatch }, currentEvents) {
    commit('updateCurrentEvents', currentEvents);
    dispatch('updateCurrentEvent', null);
  },
  updateCurrentEvent({ commit }, currentEvent) {
    commit('updateCurrentEvent', currentEvent);
  },
};

export default {
  namespaced: true,
  state: _state,
  mutations,
  actions,
};
