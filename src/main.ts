import { createApp } from 'vue';
import App from './App.vue';
import { VueQueryPlugin } from "@tanstack/vue-query";
import router from './router/index';

// Pinia
import piniaPersist from 'pinia-plugin-persist'
import { createPinia } from 'pinia';
const pinia = createPinia()
pinia.use(piniaPersist)

// Notifications
import Notifications from '@kyvg/vue3-notification'
import { useNotification } from '@kyvg/vue3-notification'

import AppModal from "@/components/common/modal/AppModal.vue"

import "@/assets/scss/main.css"

createApp(App)
  .use(router)
  .use(VueQueryPlugin)
  .use(Notifications)
  .use(pinia)
  .provide('$notify', useNotification())
  .component("AppModal", AppModal)
  .mount('#app');
