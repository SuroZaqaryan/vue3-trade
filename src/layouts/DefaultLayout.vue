<template>
  <AppHeader v-if="user.isAuthenticated" />
  <notifications />
  <main>
    <slot></slot>
  </main>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import AppHeader from "@/components/common/header/AppHeader.vue";

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
  max-width: 800px;
  margin: auto;
}
</style>
