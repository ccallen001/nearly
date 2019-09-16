import Vue from 'vue';
import Vuex from 'vuex';

import Firebase from 'firebase';
const fbAuth = Firebase.auth;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    iot: {
      location: {
        lat: 39.9628276,
        lon: -86.0101881
      }
    }
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = currentUser;
    }
  },
  actions: {
    getCurrentUser({ commit }) {
      commit('setCurrentUser', fbAuth().currentUser);
    }
  }
});