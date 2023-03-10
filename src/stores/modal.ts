import { defineStore } from 'pinia'
import { Modal } from "@/models/modal.model"

export const useModalStore = defineStore({
    id: 'modal',
    state: (): Modal => ({
      isShow: false,
      orderId: null
    }),
    actions: {
        showModal() {
            this.isShow = true;
        },

        hideModal() {
            this.isShow = false;
        }
    },
})
