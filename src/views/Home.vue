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

export default Vue.extend({
  components: {
    MainComponent
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    }
  }
});
</script>
