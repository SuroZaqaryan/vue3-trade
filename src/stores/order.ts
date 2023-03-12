import { computed, ref } from "vue";
import { defineStore } from 'pinia';
import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useNotification } from "@kyvg/vue3-notification";
import { useModalStore } from "@/stores/modal";
import { ordersApi } from "@/api/ordersApi";
import { useOrdersApi } from "@/api/hooks/useOrdersApi";
import { UserInfoOrder } from "@/models/user.model"

export const useOrderStore = defineStore('useOrderStore', () => {
    const { notify } = useNotification();
    const queryClient = useQueryClient();
    const modal = useModalStore();

    const { mutateAsync: deleteOrder } = useMutation(ordersApi.deleteOrder); // delete order
    const { mutateAsync: changeOrderStatusApi } = useMutation(ordersApi.changeOrderStatusApi); // change order status
    const { mutateAsync: addNewOrderApi } = useMutation(ordersApi.addNewOrderApi); // add new order

    // Получаем товры
    const { data } = useOrdersApi();

    const sortData = ref<string | null>(null);

    // Удаление заказа
    const handleDeleteOrder = async (orderId: number): Promise<void> => {
        await deleteOrder({ orderId });
        await queryClient.refetchQueries();
        await notify({ type: "success", text: "Продукт успешно удален" });
        modal.hideModal();
    };

    // Изменение статуса
    const changeOrderStatus = async (orderId: number, status: string): Promise<void> => {
        await changeOrderStatusApi({ orderId, status });
        await queryClient.refetchQueries();
        await notify({ type: "success", text: "Статус успешно изменен" });
    }

    // Добавление нового заказа
    const addNewOrder = async (userInfo: UserInfoOrder): Promise<void> => {
        await addNewOrderApi({ userInfo });
        await queryClient.refetchQueries();
        await notify({ type: "success", text: "Товар успешно добавлен" });
    }

    type OrderType = { date: string }
    type DateType = { address: string }

    const orders = computed(() => {
        if (!data.value) {
            return data.value;
        }

        const sortedData = [...data.value];

        // Сортировка адреса
        if (sortData.value === 'sort-address') {
            return sortedData.sort((a: DateType, b: DateType) => {
                if (a.address < b.address) return -1;
                if (a.address > b.address) return 1;
                return 0;
            });
        }

        // Сортировка товаров по дату
        if (sortData.value === 'sort-date') {
            return data.value.map((a: OrderType) => ({
                ...a,
                date: moment(a.date, "DD MMMM YYYY", "ru").format("D MMMM YYYY [г.]")
            })).sort((a: OrderType, b: OrderType) => moment(a.date, "D MMMM YYYY [г.]", "ru").diff(moment(b.date, "D MMMM YYYY [г.]", "ru")));
        }

        return sortedData;
    });

    // Сброс фильтров
    const resetSortedFilters = () => sortData.value = null;

    return {
        resetSortedFilters,
        changeOrderStatus,
        handleDeleteOrder,
        addNewOrder,
        sortData,
        orders
    }
})