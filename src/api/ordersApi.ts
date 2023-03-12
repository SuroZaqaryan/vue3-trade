import { api } from "@/libs/axios"

type Order = {
  id: number;
  status: string;
}

export const ordersApi = {
  getAllOrders: async () => {
    const { data } = await api.get("orders");
    return data;
  },

  deleteOrder: async ({ orderId }: { orderId: number }) => {
    const { data } = await api.delete(`orders/${orderId}`);
    return data;
  },

  changeOrderStatusApi: async ({ orderId, status }: { orderId: number, status: string }): Promise<Order> => {
    const { data } = await api.patch<Order>(`orders/${orderId}`, { status });
    return data;
  },

  addNewOrderApi: async ({ userInfo }: { userInfo: object }): Promise<Order> => {
    const { data } = await api.post<Order>('orders', {
      ...userInfo
    });
    return data;
  },
};
