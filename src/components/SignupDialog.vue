<template>
  <div class="components SignupDialog">
    <v-dialog persistent width="500" v-model="signupDialogShowing" ref="signupDialog">
      <v-card>
        <v-card-title>Signup</v-card-title>
        <v-card-text>
          <v-text-field type="Email" label="Email" v-model="email" @keypress="signup"></v-text-field>
          <v-text-field type="password" label="Password" v-model="password" @keypress="signup"></v-text-field>
          <div class="error-message">{{ errorMessage }}</div>
        </v-card-text>
        <v-card-actions class="or-login">
          <v-btn text color="blue" :ripple="false" @click="login">Or Login</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn @click="signup">Signup</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
.SignupDialog {
  .error-message {
    color: red;
  }

  .or-login {
    .v-btn {
      margin: auto;

      &::before {
        background-color: transparent;
      }
    }
  }

  .v-btn {
    margin-left: auto;
  }
}
</style>

<script lang="ts">
import Vue from "vue";

import * as firebase from "firebase/app";
import "firebase/auth";

export default Vue.extend({
  data: () => ({
    signupDialogShowing: true,

    email: "",
    password: "",

    errorMessage: ""
  }),
  methods: {
    signup() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(resp => {
          const currentUserEmail = resp && resp.user && resp.user.email;

          window.alert(`Success! Account created for ${currentUserEmail}`);
          this.$router.replace("/");
        })
        .catch(err => {
          this.errorMessage = err;
          throw new Error(err);
        });
    },
    login() {
      this.$parent.$emit("showLoginDialog");
    }
  },
  mounted() {
    // @ts-ignore
    this.$refs.signupDialog.$el.click();
  }
});
</script>