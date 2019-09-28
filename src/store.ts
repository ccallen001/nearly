import Vue from 'vue';
import Vuex from 'vuex';

import firebase from 'firebase/app';
import 'firebase/firestore';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: {
      firebaseData: null,
      location: {
        lat: 0,
        lon: 0
      }
    },
    jamalsHouse: {
      location: {
        lat: 39.96006,
        lon: -86.39646
      }
    }
  },
  mutations: {
    setCurrentUserFirebaseData(state, currentUser) {
      state.currentUser.firebaseData = currentUser;
    },
    setCurrentUserLocation(state, { lat, lon }) {
      if (state.currentUser.firebaseData) {
        // @ts-ignore
        firebase.firestore().collection('users').doc(state.currentUser.firebaseData.email).update({
          lat,
          lon
        }).then(() => {
          state.currentUser.location.lat = lat;
          state.currentUser.location.lon = lon;
        });
      }
    }
  },
  actions: {}
});