<template>
  <div class="views Home">
    <h2 class="view-title">Home</h2>
    <MainComponent :currentUserEmail="currentUserEmail" :currentUserLat="currentUserLat" :currentUserLon="currentUserLon" />
  </div>
</template>

<style lang="scss" scoped>
.views.Home {
  .user-location-container {
    text-align: center;
  }
}
</style>

<script>
import Vue from "vue";
import Firebase from "firebase";

import MainComponent from "@/components/MainComponent.vue";

const fbAuth = Firebase.auth;

export default {
  components: {
    MainComponent
  },
  data: () => ({
    currentUserEmail: "",
    currentUserLat: 0,
    currentUserLon: 0
  }),
  beforeMount() {
    const curentUser = this.$store.state.currentUser;
    this.currentUserEmail = curentUser ? curentUser.email : "";

    window.navigator.geolocation.watchPosition(
      userPosition => {
        this.currentUserLat = userPosition.coords.latitude;
        this.currentUserLon = userPosition.coords.longitude;
      },
      err => {
        throw new Error(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000
      }
    );
  }
};
</script>
