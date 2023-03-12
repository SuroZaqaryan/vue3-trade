<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth"; // Auth
import firebaseConfig from "@/config/firebaseConfig"; // Firebase
import { UserCredential } from "firebase/auth";

// v9 compat packages are API compatible with v8 code
import firebase from "firebase/compat/app";
firebase.initializeApp(firebaseConfig);
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

export default {
  setup() {
    const router = useRouter();
    const user = useAuthStore();

    const userName = ref<string>("");
    const userPassword = ref<string>("");
    const loader = ref<HTMLElement | null>(null);

    // Login with social network
    const uiConfig = {
      signInFlow: "popup",
      signinSuccessUrl: "http://localhost:8080/",

      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
      ],

      callbacks: {
        signInSuccessWithAuthResult: function (authResult: UserCredential) {
          if (authResult.user.displayName !== null) {
            user.user.name = authResult.user.displayName;
          }
          user.isAuthenticated = true;
          router.push("/");
          return false; // so it doesn't refresh the page
        },
        uiShown: function (): void {
          // Hide the loader.
          if (loader.value !== null) loader.value.style.display = "none";
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
      userPassword,
      userName,
      loader,
      user,
    };
  },
};
</script>

<template>
  <div class="login">
    <div class="login__info">
      <code>
        "password": "123456789", "name": "Петр Петров", "role":
        <span>"USER"</span>
      </code>
      <code>
        "password": "123456789", "name": "Иван Иванов", "role":
        <span>"ADMIN"</span>
      </code>
    </div>
    <div class="login__block">
      <form @submit.prevent="user.login(userName, userPassword)">
        <input type="text" v-model="userName" placeholder="Имя" />

        <input
          type="password"
          v-model="userPassword"
          placeholder="Пароль"
          autocomplete="on"
        />

        <input type="submit" value="Войти" />
      </form>
      <div>
        <div id="firebaseui-auth-container"></div>
        <div ref="loader" id="loader">Loading...</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/views/login/LoginPage.scss";
</style>
