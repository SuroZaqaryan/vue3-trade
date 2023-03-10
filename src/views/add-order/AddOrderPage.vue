<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useOrderStore } from "@/stores/order";

const user = useAuthStore();
const order = useOrderStore();

const userName = ref(user.username);
const userAddress = ref("");
const userComment = ref("");

const sendOrder = () => {};
</script>

<template>
  <form @submit.prevent="sendOrder" class="add-order">
    <div class="add-order__title">
      <p>Добавить заказ</p>
    </div>
    <div class="add-order__fields">
      <input
        type="text"
        v-model="userName"
        placeholder="Введите ваше имя"
        required
      />
      <input
        type="text"
        v-model="userAddress"
        placeholder="Введите ваш адрес"
        required
      />
      <input type="text" v-model="userComment" placeholder="Комментарий" />
    </div>

    <input class="add-order__submit" type="submit" value="Добавить заказ" />
  </form>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/add-order.scss";
</style>
