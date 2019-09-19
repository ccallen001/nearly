<template>
  <div class="views Login">
    <h2 class="view-title">Login</h2>
    <LoginDialog v-if="loginDialogActive && !user" />
    <SignupDialog v-if="signupDialogActive && !user" />
    <h3 class="already-logged-in" v-if="user">
      It appears that you are already logged in...
      <br />Use the
      <v-icon>mdi-logout</v-icon>icon in the top right
      <br />to logout.
    </h3>
  </div>
</template>

<style lang="scss" scoped>
.views.Login {
  .already-logged-in {
    padding-top: 64px;
    text-align: center;
  }
}
</style>

<script lang="ts">
import Vue from "vue";

import * as firebase from "firebase";
import "firebase/auth";

import LoginDialog from "@/components/LoginDialog.vue";
import SignupDialog from "@/components/SignupDialog.vue";

export default Vue.extend({
  components: {
    LoginDialog,
    SignupDialog
  },
  data: () => ({
    user: firebase.auth().currentUser,

    loginDialogActive: true,
    signupDialogActive: false
  }),
  beforeMount() {
    this.$on("showLoginDialog", () => {
      this.signupDialogActive = false;
      this.loginDialogActive = true;
    });
    this.$on("showSignupDialog", () => {
      this.loginDialogActive = false;
      this.signupDialogActive = true;
    });
  },
  mounted() {
    /* gets the modal's labels/placeholders to jump up and not occlude saved values in the inputs */
    window.setTimeout(() => {
      document.body.click();
    }, 500);
  }
});
</script>