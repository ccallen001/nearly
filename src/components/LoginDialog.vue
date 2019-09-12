<template>
  <div class="components LoginDialog">
    <v-dialog persistent width="500" v-model="loginDialogShowing">
      <v-card>
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-text-field type="Email" label="Email" v-model="email" @keypress.enter="login"></v-text-field>
          <v-text-field type="password" label="Password" v-model="password" @keypress.enter="login"></v-text-field>
          <div class="error-message">{{ errorMessage }}</div>
        </v-card-text>
        <v-card-actions class="or-signup">
          <v-btn text color="blue" :ripple="false" @click="signup">Or Signup</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn @click="login">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
.LoginDialog {
  .error-message {
    color: red;
  }

  .or-signup {
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
import Firebase from "firebase";

const fbAuth = Firebase.auth;

export default Vue.extend({
  data: () => ({
    loginDialogShowing: true,

    email: "",
    password: "",

    errorMessage: ""
  }),
  methods: {
    login() {
      fbAuth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(resp => {
          this.$router.replace("/");
        })
        .catch(err => {
          this.errorMessage = err;
          throw new Error(err);
        });
    },
    signup() {
      this.$parent.$emit("showSignupDialog");
    }
  }
});
</script>