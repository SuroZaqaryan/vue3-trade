import { defineStore } from 'pinia';
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useNotification } from "@kyvg/vue3-notification";
import { useModalStore } from "@/stores/modal";
import { ordersApi } from "@/api/ordersApi";

export const useOrderStore = defineStore('useOrderStore', () => {

    const { notify } = useNotification();
    const queryClient = useQueryClient();
    const modal = useModalStore();

    const { mutateAsync: deleteOrder } = useMutation(ordersApi.deleteOrder); // delete order
    const { mutateAsync: changeStatusOrder } = useMutation(ordersApi.changeStatusOrder); // change order status

    // Удаление заказа
    const handleDeleteOrder = async (orderId: number): Promise<any> => {
        await deleteOrder({ orderId });
        await queryClient.refetchQueries();
        notify({ type: "success", text: "Продукт успешно удален" });
        modal.hideModal();
    };

    // Изменение статуса
    const changeOrderStatus = async (orderId: number, status: string): Promise<any> => {
        await changeStatusOrder({ orderId, status });
        await queryClient.refetchQueries();
        notify({ type: "success", text: "Статус успешно изменен" });
    }
    
    // Добавление нового заказа
    const addNewOrder = async (orderId: number, status: string): Promise<any> => {
        await changeStatusOrder({ orderId, status });
        await queryClient.refetchQueries();
        notify({ type: "success", text: "Статус успешно изменен" });
    }

    return { handleDeleteOrder, changeOrderStatus }
})