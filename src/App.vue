<template>
  <div id="wrapper">
    <router-view />
    <notifications />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>
