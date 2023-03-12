import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed, onMounted } from "vue";
import { ordersApi } from "@/api/ordersApi";
import { UserInfoOrder } from "@/models/user.model"

export const useOrdersApi = () => {
  const queryClient = useQueryClient();

  const { data, isError, isLoading, isStale, isFetching } = useQuery<UserInfoOrder[]>({
    queryKey: ["orders"],
    queryFn: ordersApi.getAllOrders,
    staleTime: 10 * 60 * 60 * 1000,
  });

  onMounted(async () => {
    if (isStale.value) {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
    }
  });

  return {
    pending: computed(() => isFetching.value || isLoading.value || isError.value),
    data: computed(() => data?.value),
    isEmpty: computed(() => !data?.value || data.value.length === 0),
  };
};
