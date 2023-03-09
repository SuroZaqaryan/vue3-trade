import { api } from "@/libs/axios"

export const ordersApi = {
  getAllOrders: async () => {
    const { data } = await api.get("orders");
    return data;
  },

  deleteOrder: async ({ orderId }: { orderId: number }) => {
    const { data } = await api.delete(`orders/${orderId}`);
    return data;
  },
  
};