<template>
  <div class="views Map">
    <h2 class="view-title">Map</h2>
    <div id="map">
      <span class="map-loading" v-if="!userLat || !userLon">Loading...</span>
      <v-icon class="map-marker" color="red" v-else>mdi-heart</v-icon>
    </div>
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
}
</style>

<script>
import Vue from "vue";

let view, map;

export default Vue.extend({
  data: () => ({
    userLat: 0,
    userLon: 0
  }),
  beforeMount() {
    window.navigator.geolocation.watchPosition(
      userPosition => {
        this.userLat = userPosition.coords.latitude;
        this.userLon = userPosition.coords.longitude;

        if (view) {
          view.animate({
            center: ol.proj.fromLonLat([this.userLon, this.userLat]),
            duration: 1
          });
        }

        // if (map) {
        //   map
        //     .getView()
        //     .setCenter(ol.proj.fromLonLat([this.userLon, this.userLat]));
        // }
      },
      err => {
        throw new Error(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000
      }
    );
  },
  mounted() {
    view = new ol.View({
      center: [this.userLon, this.userLat],
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