<template>
  <div class="views Map">
    <h2 class="view-title">Map</h2>
    <div id="map">
      <span class="map-loading" v-if="!currentUserLat || !currentUserLon">Loading...</span>
      <v-icon class="map-marker" color="red" v-else>mdi-heart</v-icon>
    </div>
    <div class="at-bab" v-if="userIsAtBaB"></div>
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

  .at-bab {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 90%;
    height: 75%;
    background: url("../assets/cheers.gif") no-repeat center;
  }
}
</style>

<script>
import Vue from "vue";

let view, map;

export default Vue.extend({
  data: () => ({
    currentUserLat: 0,
    currentUserLon: 0,
    userIsAtBaB: false,
    userHasSeenCheers: false
  }),
  beforeMount() {
    window.navigator.geolocation.watchPosition(
      userPosition => {
        this.currentUserLat = userPosition.coords.latitude;
        this.currentUserLon = userPosition.coords.longitude;

        if (view) {
          view.animate({
            center: ol.proj.fromLonLat([
              this.currentUserLon,
              this.currentUserLat
            ]),
            duration: 200
          });
        }

        /* just for fun */
        const bab = this.$store.state.ballAndBiscuit;
        if (
          this.currentUserLat < bab.lat + 0.0005 &&
          this.currentUserLat > bab.lat - 0.0005 &&
          this.currentUserLon < bab.lon + 0.0005 &&
          this.currentUserLon > bab.lon - 0.0005 &&
          !this.userHasSeenCheers
        ) {
          window.alert("You're at the Ball and Biscuit!");
          this.userIsAtBaB = true;
          this.userHasSeenCheers = true;
          setTimeout(() => {
            this.userIsAtBaB = false;
          }, 5000);
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
    view = new ol.View({
      center: [this.currentUserLon, this.currentUserLat],
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