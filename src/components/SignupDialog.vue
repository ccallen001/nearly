<template>
  <div class="components SignupDialog">
    <v-dialog persistent width="500" v-model="signupDialogShowing">
      <v-card>
        <v-card-title>Signup</v-card-title>
        <v-card-text>
          <v-text-field type="Email" label="Email" v-model="email" @keypress.enter="signup"></v-text-field>
          <v-text-field
            type="password"
            label="Password"
            v-model="password"
            @keypress.enter="signup"
          ></v-text-field>
          <div class="error-message">{{ errorMessage }}</div>
        </v-card-text>
        <v-card-actions class="or-login">
          <v-btn text color="blue" :ripple="false" @click="showLoginDialog">Or Login</v-btn>
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
import "firebase/firestore";

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
          const currentUserId = resp && resp.user && resp.user.uid;
          const currentUserEmail = resp && resp.user && resp.user.email;

          firebase
            .firestore()
            .collection("users")
            .doc(this.email)
            .set({
              id: currentUserId,
              email: currentUserEmail
            })
            .then(resp => this.$router.replace("/"));
        })
        .catch(err => {
          this.errorMessage = err;
          console.error(
            `There was an error signing up: ${err.code} - ${err.message}`
          );
        });
    },
    showLoginDialog() {
      this.$parent.$emit("showLoginDialog");
    }
  }
});
</script>