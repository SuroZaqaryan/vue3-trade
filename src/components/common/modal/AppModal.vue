<script lang="ts" setup>
import { useModalStore } from "@/stores/modal";
const modal = useModalStore();
</script>

<template>
  <transition name="modal-fade">
    <div class="modal-overlay" @click="modal.hideModal">
      <div class="modal" @click.stop>
        <slot />
      </div>
      <div class="close" @click="$emit('close-modal')">
        <img class="close-img" src="" alt="" />
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@import "@/components/common/modal/modal.scss";
</style>