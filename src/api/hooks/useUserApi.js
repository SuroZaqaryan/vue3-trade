import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed, onMounted } from "vue";
import { bodyPartApi } from "@/api/bodyPartApi.js";

export const useUserApi = () => {
  const queryClient = useQueryClient();

  const { data, isError, isLoading, isStale, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: bodyPartApi.getAllBodyPart,
    staleTime: 10 * 60 * 60 * 1000,
  });

  onMounted(async () => {
    if (isStale.value) {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  });

  return {
    pending: computed(
      () => isFetching.value || isLoading.value || isError.value
    ),
    data: computed(() => data?.value),
    isEmpty: computed(() => !data.value?.length),
  };
};