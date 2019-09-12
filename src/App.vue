<template>
  <v-app class="App">
    <div class="background"></div>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Nearly</span>
      </v-toolbar-title>
      <v-toolbar-items>
        <v-btn class="nav-btn" text to="/login">Login</v-btn>
        <v-btn class="nav-btn" text to="/">Home</v-btn>
        <v-btn class="nav-btn" text to="/map">Map</v-btn>

        <v-btn icon absolute right @click="logout">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
    <v-snackbar v-model="isUpdateAvailable"></v-snackbar>
  </v-app>
</template>

<style lang="scss">
@import './style.scss';

.App {
  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("https://previews.123rf.com/images/ohyooha/ohyooha1503/ohyooha150300020/37268577-world-map-of-love-with-red-hearts-on-white-background.jpg")
      no-repeat center / cover;
    opacity: 0.1;
  }

  .nav-btn {
    &:first-of-type {
      margin-left: 8px;
    }
  }

  /* get rid of weird vertical spacing under toolbar */
  main {
    padding-top: 64px !important;
  }
}
</style>

<script lang="ts">
import Vue from "vue";
import Firebase from "firebase";

const fbAuth = Firebase.auth;

export default Vue.extend({
  data: () => ({
    isUpdateAvailable: false
  }),
  methods: {
    logout() {
      fbAuth()
        .signOut()
        .then(resp => {
          this.$router.replace("/login");
        })
        .catch(err => {
          throw new Error(err);
        });
    }
  }
});
</script>
