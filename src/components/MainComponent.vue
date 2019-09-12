<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex mb-4>
        <h2 class="display-2 font-weight-bold mb-3">Nearly</h2>
      </v-flex>

      <v-flex mb-2 xs12>
        <h3 class="font-weight-bold mb-3">Hello, {{ userEmail }}!</h3>
      </v-flex>

      <v-flex mb-7 xs12>
        <h4>
          Your current location is:
          <br />
          <strong>Lat:</strong>
          {{userLat ? userLat/*.toFixed(4)*/ : 'Loading...'}}
          <br />
          <strong>Long:</strong>
          {{userLon ? userLon/*.toFixed(4)*/ : 'Loading...'}}
        </h4>
      </v-flex>

      <v-flex xs12>
        <h4 class="headline font-weight-bold mb-3">
          <router-link to="/map">See who's nearby!</router-link>
        </h4>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["userEmail", "userLat", "userLon"]
});
</script>
