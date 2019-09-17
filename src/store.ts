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
      }
    },
    iot: {
      location: {
        lat: 39.9628276,
        lon: -86.0101881
      }
    }
  },
  mutations: {
    setCurrentUser(state) {
      // @ts-ignore
      state.currentUser.firebaseData = firebase.auth().currentUser;

      window.navigator.geolocation.watchPosition(
        userPosition => {
          state.currentUser.location.lat = userPosition.coords.latitude;
          state.currentUser.location.lon = userPosition.coords.longitude;
        },
        err => {
          // window.alert("There was an error getting the user's location.");
          //@ts-ignore
          throw new Error(err);
        },
        {
          enableHighAccuracy: true,
          timeout: 2000
        }
      );
    }
  },
  actions: {}
});