/* eslint-disable no-underscore-dangle */
const _state = {
  stores: [],
  currentStore: null,
  currentMutation: null,
};

const mutations = {
  addStore(state, payload) {
    const { storeId, subscribedPages, timestamp } = payload;
    const store = state.stores.find(s => s.storeId === storeId);
    if (store) {
      Object.assign(store, {
        baseState: payload.state,
        mutations: [],
        subscribedPages,
        createdTime: timestamp,
      });
    } else {
      state.stores.push({
        storeId,
        baseState: payload.state,
        mutations: [],
        subscribedPages,
        createdTime: timestamp,
      });
    }
  },
  addMutation(state, payload) {
    const { storeId, mutation, timestamp } = payload;
    const { stores } = state;
    const store = stores.find(s => s.storeId === storeId);
    if (store) {
      store.mutations.push({
        mutation,
        state: payload.state,
        timestamp,
      });
    }
  },
  updateCurrentStore(state, currentStore) {
    Object.assign(state, { currentStore });
  },
  updateCurrentMutation(state, currentMutation) {
    Object.assign(state, { currentMutation });
  },
};

const actions = {
  addStore({ state, commit, dispatch }, payload) {
    commit('addStore', payload);
    dispatch('addMutation', payload);
    if (!state.currentStore) {
      dispatch('updateCurrentStore', state.stores[0]);
    }
  },
  addMutation({ commit }, payload) {
    commit('addMutation', payload);
  },
  updateCurrentStore({ commit, dispatch }, currentStore) {
    commit('updateCurrentStore', currentStore);
    dispatch('updateCurrentMutation', null);
  },
  updateCurrentMutation({ commit }, currentMutation) {
    commit('updateCurrentMutation', currentMutation);
  },
};

export default {
  namespaced: true,
  state: _state,
  mutations,
  actions,
};
