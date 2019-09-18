<template>
  <div class="views Home">
    <h2 class="view-title">Home</h2>
    <MainComponent :currentUser="currentUser" />
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

import MainComponent from "@/components/MainComponent.vue";

let watchPositionId;

export default Vue.extend({
  components: {
    MainComponent
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    }
  },
  beforeMount() {
    watchPositionId = window.navigator.geolocation.watchPosition(
      userPosition => {
        this.$store.commit("setCurrentUserLocation", {
          lat: userPosition.coords.latitude,
          lon: userPosition.coords.longitude
        });
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
  },
  beforeDestroy() {
    console.log("stop watch position");
    window.navigator.geolocation.clearWatch(watchPositionId);
  }
});
</script>
