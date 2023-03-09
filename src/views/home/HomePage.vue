<script setup lang="ts">
import { useRouter } from "vue-router";
import { getAuth, signOut } from "firebase/auth";

const router = useRouter();
const auth = getAuth();

const handleSignOut = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      localStorage.removeItem("auth");
      router.push("/login");
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
};
</script>

<template>
  <div>
    home
    <button
      @click="handleSignOut"
      class="w-full bg-transparent text-white text-sm py-2 px-4 border border-white rounded"
    >
      Выйти из аккаунта
    </button>
  </div>
</template>