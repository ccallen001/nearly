import Vue from 'vue';
import router from './router';
import store from './store';

import vuetify from './plugins/vuetify';

import Firebase from 'firebase';
// @ts-ignore
import firebaseCreds from '../creds';
const fbAuth = Firebase.auth;

import './registerServiceWorker';

import App from './App.vue';

Firebase.initializeApp(firebaseCreds);

router.beforeEach((to, from, next) => {
  const currentUser = fbAuth().currentUser;
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

fbAuth().onAuthStateChanged(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app');
});
