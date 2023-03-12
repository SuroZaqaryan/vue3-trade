<script setup lang="ts">
import { useRouter, RouterLink } from "vue-router";
import { getAuth, signOut } from "firebase/auth";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore(); // auth store
const firebaseAuth = getAuth(); // firebase
const router = useRouter();

const handleSignOut = () => {
  signOut(firebaseAuth)
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
  <header class="header">
    <nav class="header__nav">
      <ul class="nav__list nav__list-orders">
        <li class="nav__item">
          <router-link to="/">Все заказы</router-link>
        </li>
        <li class="nav__item">
          <router-link to="/add-order">Добавить заказ</router-link>
        </li>
      </ul>

      <ul class="nav__list nav__list-profile">
        <li class="nav__item">
          <a href="#">{{ auth.user.name }}</a>
        </li>
        <li class="nav__item"><button @click="handleSignOut">Выйти</button></li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@import "@/components/common/header/header.scss";
</style>
