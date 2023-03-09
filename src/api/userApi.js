import { api } from "@/libs/axios";

export const bodyPartApi = {
  getAllBodyPart: async () => {
    const { data } = await api.get("body-part");
    return data;
  },
};