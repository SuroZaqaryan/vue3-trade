<template>
  <AppHeader v-if="user.isAdmin" />
  <notifications />
  <main>
    <slot></slot>
  </main>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import AppHeader from "@/components/AppHeader.vue";

const user = useAuthStore(); // auth store
</script>

<script>
export default {
  components: {
    AppHeader,
  },
};
</script>

<style scoped>
  main {
    padding-right: 4rem;
    overflow-x: auto;
  }
</style>