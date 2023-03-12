<script setup lang="ts">
import { useOrderStore } from "@/stores/order";
const order = useOrderStore(); // orders (товары)
</script>

<template>
  <form @submit.prevent="order.resetSortedFilters()" class="sort-table">
    <div class="sort-table__group">
      <input
        type="radio"
        id="address"
        v-model="order.sortData"
        value="sort-address"
      />
      <label for="address"> Сортировать по адресу </label>

      <input
        type="radio"
        id="date"
        v-model="order.sortData"
        value="sort-date"
      />
      <label for="date">Сортировать по дату</label>
    </div>

    <div v-if="order.sortData" class="sort-table__reset-filter">
      <input type="submit" value="Сбросить фильтры" />
    </div>
  </form>
</template>

<style lang="scss" scoped>
@import "@/components/sorting-filters/SortingFilters.scss";
</style>
