<script setup lang="ts">
import { useOrdersApi } from "@/api/hooks/useOrdersApi";

import { useOrderStore } from "@/stores/order";

// Auth
import { useAuthStore } from "@/stores/auth";

// Modal
import { useModalStore } from "@/stores/modal";
const modal = useModalStore();

// Getting orders
const { data, pending } = useOrdersApi(); // orders
const user = useAuthStore(); // auth store

const order = useOrderStore();
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
  <div v-if="pending"><h1>Загрузка...</h1></div>

  <div v-else>
    <div class="home">
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
            <td
              class="table__status"
              :class="{ completed: order.status === 'Выполнен' }"
            >
              {{ order.status }}
              <button
                @click="order.changeOrderStatus(order.id, 'Выполнен')"
                v-if="order.status !== 'Выполнен'"
              >
                Изменить Статус
              </button>
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
                  @click="
                    modal.showModal();
                    modal.orderId = order.id;
                  "
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/home.scss";
</style>
