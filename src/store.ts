import Vue from 'vue';
import Vuex from 'vuex';

import Firebase from 'firebase';
const fbAuth = Firebase.auth;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null
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