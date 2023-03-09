<script setup lang="ts">
import { useRouter } from "vue-router";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { getAuth, signOut } from "firebase/auth";
import { useOrdersApi } from "@/api/hooks/useOrdersApi";
import { ordersApi } from "@/api/ordersApi";
import { useAuthStore } from "@/stores/auth";
import { useNotification } from "@kyvg/vue3-notification";
import AppHeader from "@/components/AppHeader.vue";

const { data, pending } = useOrdersApi();
const router = useRouter();
const auth = getAuth(); // firebase
const user = useAuthStore(); // auth store
const { notify } = useNotification(); // notification popup

const { mutateAsync: deleteOrder } = useMutation(ordersApi.deleteOrder);
const queryClient = useQueryClient();

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

const handleDeleteOrder = async (orderId: number) => {
  await deleteOrder({ orderId });
  await queryClient.refetchQueries();
  notify({ type: "success", text: "Продукт успешно удален" });
};
</script>

<template>
  <app-header />
  <div v-if="pending">
    <h1>Загрузка...</h1>
  </div>
  <div v-else>
    <main>
      <table class="table">
        <thead>
          <tr>
            <th>№</th>
            <th>Имя клиента</th>
            <th>Адрес</th>
            <th>Дата заказа</th>
            <th>Статус</th>
            <th>Комментарий</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in data" :key="order.id">
            <td>{{ index + 1 }}</td>
            <td>{{ order.name }}</td>
            <td>{{ order.address }}</td>
            <td>{{ order.date }}</td>
            <td :class="{ completed: order.status === 'Выполнен' }">
              {{ order.status }}
            </td>
            <td class="table__comments">
              {{ order.comment }}

              <div class="table__buttons">
                <button title="Выполнен">
                  <img
                    src="@/assets/static/icons/completed-icon.svg"
                    alt="completed"
                  />
                </button>

                <button
                  v-if="order.status === 'Выполнен' && user.isAdmin"
                  @click="handleDeleteOrder(order.id)"
                  title="Удалить заказ"
                >
                  <img
                    src="@/assets/static/icons/delete-icon.svg"
                    alt="delete"
                  />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </main>

    <button
      @click="handleSignOut"
      class="w-full bg-transparent text-white text-sm py-2 px-4 border border-white rounded"
    >
      Выйти из аккаунта
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/home.scss";
</style>
