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

      window.navigator.geolocation.watchPosition(
        userPosition => {
          try {
            state.currentUser.location.lat = userPosition.coords.latitude;
            state.currentUser.location.lon = userPosition.coords.longitude;

            if (
              state.currentUser.location.lat < 39.959958 &&
              state.currentUser.location.lat > 39.959754 &&
              state.currentUser.location.lon > -86.396622 &&
              state.currentUser.location.lon < -86.396315 &&
              !state.currentUser.hasSeenGif
            ) {
              window.alert("You're at Jamal's house!");
              state.currentUser.showGif = true;
              state.currentUser.hasSeenGif = true;

              window.setTimeout(() => {
                state.currentUser.showGif = false;
              }, 3000);
            }
          } catch (err) {
            // window.alert("There was an error getting the user's location.");
            throw new Error(err);
          }
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