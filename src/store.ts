import Vue from 'vue';
import Vuex from 'vuex';

import * as firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: {
      firebaseData: null,
      location: {
        lat: 0,
        lon: 0
      },
      showGif: false,
      hasSeenGif: false
    },
    jamalsHouse: {
      location: {
        lat: 39.96006,
        lon: -86.39646
      }
    }
  },
  mutations: {
    setCurrentUser(state) {
      // @ts-ignore
      state.currentUser.firebaseData = firebase.auth().currentUser;
    }
  },
  actions: {}
});