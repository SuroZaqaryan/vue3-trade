<script setup lang="ts">
// Orders
import { useOrderStore } from "@/stores/order";
// Modal
import { useModalStore } from "@/stores/modal";

const order = useOrderStore(); // orders (товары)
const modal = useModalStore(); // modal window
</script>

<template>
  <app-modal v-show="modal.isShow">
    <div class="modal">
      <div class="modal__title">
        <p>Вы действительно хотите удалить заказ?</p>
      </div>

      <div class="modal__details">
        <button @click="order.handleDeleteOrder(modal.orderId)">Ok</button>
        <button @click="modal.hideModal">Отмента</button>
      </div>
    </div>
  </app-modal>
</template>

<style lang="scss" scoped>
@import "@/components/modal-order/ModalOrder.scss";
</style>
