<template>
  <div class="views Map">
    <h2 class="view-title">Map</h2>
    <div id="map">
      <span
        class="map-loading"
        v-if="!currentUser.location.lat || !currentUser.location.lon"
      >Loading...</span>
      <v-icon class="map-marker" color="red" v-else>mdi-heart</v-icon>
    </div>
    <!-- <div class="gif" v-if="currentUserShowGif"></div> -->
  </div>
</template>

<style lang="scss" scoped>
.views.Map {
  #map {
    position: relative;
    margin: auto;
    width: 90%;
    height: 400px;
    background-color: #f1efea;
    border-radius: 8px;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);

    .map-loading,
    .map-marker {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 1;
      transform: translateX(-50%) translateY(-50%);
    }
  }

  // .gif {
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translateX(-50%) translateY(-50%);
  //   z-index: 1;
  //   width: 80vw;
  //   height: 80vw;
  //   border-radius: 4px;
  //   background: url("../assets/gif.gif") no-repeat center / cover;
  // }
}
</style>

<script>
import Vue from "vue";

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

export default Vue.extend({
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    }
  },
  mounted() {
    const view = new View({
      center: [this.currentUser.location.lon, this.currentUser.location.lat],
      zoom: 1
    });

    new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view
    });

    view.animate({ zoom: 18 });

    this.$root.$on("locationUpdated", () => {
      view.animate({
        center: [this.currentUser.location.lon, this.currentUser.location.lat]
      });
    });
  }
});
</script>