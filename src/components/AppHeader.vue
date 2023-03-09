<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <header class="header">
    <nav class="header__nav">
      <ul class="nav__list nav__list-orders">
        <li class="nav__item">
          <router-link to="/">Все заказы</router-link>
        </li>
        <li class="nav__item">
          <router-link to="/">Добавить заказ</router-link>
        </li>
      </ul>

      <ul class="nav__list nav__list-profile">
        <li class="nav__item"><a href="#">ИмяФамилия</a></li>
        <li class="nav__item"><button>Выйти</button></li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/header.scss";
</style>
