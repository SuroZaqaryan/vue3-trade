<script setup lang="ts">
import { ref, reactive } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useAuthStore } from "@/stores/auth";
import { useOrderStore } from "@/stores/order";
import { UserInfoOrder } from "@/models/user.model";

const auth = useAuthStore();
const order = useOrderStore();

const date = ref(
  new Date().toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
);

const userInfo = reactive<UserInfoOrder>({
  id: uuidv4(),
  name: auth.user.name,
  address: "",
  comment: "",
  status: "Новый",
  date: date.value,
});

function sendOrder(): void {
  userInfo.id = uuidv4();
  order.addNewOrder(userInfo);
}
</script>

<template>
  <form @submit.prevent="sendOrder" class="add-order">
    <div class="add-order__title">
      <p>Добавить заказ</p>
    </div>

    <div class="add-order__fields">
      <input
        type="text"
        v-model="userInfo.name"
        placeholder="Введите ваше имя"
        required
      />

      <input
        type="text"
        v-model="userInfo.address"
        placeholder="Введите ваш адрес"
        required
      />

      <input type="text" v-model="userInfo.comment" placeholder="Комментарий" />
    </div>

    <input class="add-order__submit" type="submit" value="Добавить заказ" />
  </form>
</template>

<style lang="scss" scoped>
@import "@/views/add-order/AddOrder.scss";
</style>
