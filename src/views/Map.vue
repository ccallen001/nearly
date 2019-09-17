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
    <div class="gif" v-if="currentUser.showGif"></div>
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

  .gif {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 1;
    width: 80vw;
    height: 80vw;
    border-radius: 4px;
    background: url("../assets/gif.gif") no-repeat center / cover;
  }
}
</style>

<script>
import Vue from "vue";

let view, map;

export default Vue.extend({
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    }
  },
  beforeMount() {
    const _this = this;

    (function moveMap() {
      if (view) {
        view.animate({
          center: ol.proj.fromLonLat([
            _this.currentUser.location.lon,
            _this.currentUser.location.lat
          ])
        });
      }
      window.requestAnimationFrame(moveMap);
    })();
  },
  mounted() {
    view = new ol.View({
      center: [this.currentUser.location.lon, this.currentUser.location.lat],
      zoom: 18
    });

    map = new ol.Map({
      target: "map",
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view
    });
  }
});
</script>