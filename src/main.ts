import Vue from 'vue';

import router from './router';
import store from './store';

import vuetify from './plugins/vuetify';

import * as firebase from 'firebase/app';
import 'firebase/auth';

// @ts-ignore
import firebaseCreds from '../creds';

import './registerServiceWorker';

import App from './App.vue';

firebase.initializeApp(firebaseCreds);

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  /* route guard ...if the currentUser isn't logged in, route to login page */
  if (requiresAuth && !currentUser) {
    next('/login');
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app');
});
