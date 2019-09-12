<template>
  <div class="views Home">
    <h2 class="view-title">Home</h2>
    <MainComponent :userEmail="userEmail" :userLat="userLat" :userLon="userLon" />
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
    userEmail: "",
    userLat: 0,
    userLon: 0
  }),
  beforeMount() {
    const curentUser = fbAuth().currentUser;
    this.userEmail = curentUser ? curentUser.email : "";

    window.navigator.geolocation.watchPosition(
      userPosition => {
        this.userLat = userPosition.coords.latitude;
        this.userLon = userPosition.coords.longitude;
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
