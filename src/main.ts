import Vue from 'vue';

import router from './router';
import store from './store';

import vuetify from './plugins/vuetify';

import * as firebase from 'firebase';
import 'firebase/auth';

// @ts-ignore
import firebaseCreds from '../creds';

import './registerServiceWorker';

import App from './App.vue';

firebase.initializeApp(firebaseCreds);

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

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
