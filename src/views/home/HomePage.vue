<script setup lang="ts">
import { useOrderStore } from "@/stores/order"; // Orders
import { useModalStore } from "@/stores/modal"; // Modal
import { useAuthStore } from "@/stores/auth"; // Auth

import SortingFilters from "@/components/sorting-filters/SortingFilters.vue";
import ModalOrder from "@/components/modal-order/ModalOrder.vue";

const modal = useModalStore(); // modal window
const order = useOrderStore(); // orders (товары)
const auth = useAuthStore(); // store authorization

const isAdmin = auth.user.role === "ADMIN";

const changeStatus = (orderId: number) => {
  order.changeOrderStatus(orderId, "Выполнен");
};
</script>

<template>
  <modal-order />
  <div>
    <div class="home">
      <sorting-filters />

      <div style="overflow-x: auto">
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
            <tr
              v-for="(item, index) in order.orders"
              :key="item.id"
              :class="{ completed: item.status === 'Выполнен' }"
            >
              <td class="table__index">{{ index + 1 }}</td>
              <td class="table__name">{{ item.name }}</td>
              <td class="table__address">{{ item.address }}</td>
              <td class="table__date">{{ item.date }}</td>
              <td class="table__status">{{ item.status }}</td>

              <td class="table__comments">
                {{ item.comment }}

                <div class="table__buttons">
                  <button
                    v-if="item.status !== 'Выполнен' && isAdmin"
                    @click="changeStatus(item.id)"
                    title="Выполнен"
                  >
                    <img
                      src="@/assets/static/icons/completed-icon.svg"
                      alt="completed"
                    />
                  </button>

                  <button
                    v-if="item.status === 'Выполнен' && isAdmin"
                    @click="
                      modal.showModal();
                      modal.orderId = item.id;
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
  </div>
</template>

<style lang="scss" scoped>
@import "@/views/home/HomePage.scss";
</style>
