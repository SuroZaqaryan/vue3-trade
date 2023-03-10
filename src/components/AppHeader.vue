<script setup lang="ts">
import { useRouter, RouterLink } from "vue-router";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(); // firebase
const router = useRouter();

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
  <header class="header">
    <nav class="header__nav">
      <ul class="nav__list nav__list-orders">
        <li class="nav__item">
          <router-link to="/all-orders">Все заказы</router-link>
        </li>
        <li class="nav__item">
          <router-link to="/add-order">Добавить заказ</router-link>
        </li>
      </ul>

      <ul class="nav__list nav__list-profile">
        <li class="nav__item"><a href="#">ИмяФамилия</a></li>
        <li class="nav__item"><button @click="handleSignOut">Выйти</button></li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/header.scss";
</style>
