<template>
  <div class="views Map">
    <h2 class="view-title">Map</h2>
    <div id="map"></div>
  </div>
</template>

<style lang="scss" scoped>
.views.Map {
  #map {
    margin: auto;
    width: 90%;
    height: 400px;
  }
}
</style>

<script>
import Vue from "vue";

let map;

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

        if (map) {
          map
            .getView()
            .setCenter(ol.proj.fromLonLat([this.userLon, this.userLat]));
        }
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
    map = new ol.Map({
      target: "map",
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.userLon, this.userLat]),
        zoom: 18
      })
    });
  }
});
</script>