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

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000da;
  z-index: 1;
}

.modal {
  text-align: center;
  background-color: #E2E1E1;
  height: 215px;
  width: 335px;
  padding: 10px 0;
}

.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.check {
  width: 150px;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>