<script>
import { useRouter } from "vue-router";

// Pinia
import { useAuthStore } from "@/stores/auth";

// Firebase
import firebaseConfig from "@/config/firebaseConfig";

// v9 compat packages are API compatible with v8 code
import firebase from "firebase/compat/app";
firebase.initializeApp(firebaseConfig);
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default {
  setup() {
    // Login with social network
    const router = useRouter();
    const user = useAuthStore();

    const uiConfig = {
      signInFlow: "popup",
      signinSuccessUrl: "http://localhost:8080/",

      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
      ],

      callbacks: {
        signInSuccessWithAuthResult: function (authResult) {
          user.username = authResult.user.displayName;
          user.isAuthenticated = true;
          router.push("/");

          // so it doesn't refresh the page
          return false;
        },
        uiShown: function () {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById("loader").style.display = "none";
        },
      },
    };

    // Initialize the FirebaseUI Widget using Firebase.
    try {
      const ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start("#firebaseui-auth-container", uiConfig);
    } catch {
      window.location.reload();
    }

    return {
      user,
    };
  },
};
</script>

<template>
  <div class="login">
    <div class="login__block">
      <form @submit.prevent="user.login(user.username, user.userPassword)">
        <input type="text" v-model="user.username" placeholder="Имя" />

        <input
          type="password"
          v-model="user.userPassword"
          placeholder="Пароль"
          autocomplete="on"
        />

        <input type="submit" value="Войти" />
      </form>
      <div>
        <div id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/login.scss";
</style>
