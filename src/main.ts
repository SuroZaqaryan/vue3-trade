import { createApp, markRaw } from 'vue';
import App from './App.vue';

// Tan Stack
import { VueQueryPlugin } from "@tanstack/vue-query";

// Vue router
import router from './router/index';

// Pinia
import piniaPersist from 'pinia-plugin-persist'
import { createPinia } from 'pinia';
const pinia = createPinia()

pinia.use(piniaPersist)
pinia.use(({ store }) => {
  store.router = markRaw(router);
  store.$router = router; // provide the router instance to the store
});

import Notifications from '@kyvg/vue3-notification'

// Notifications
import { useNotification } from '@kyvg/vue3-notification'

// Main style
import "@/assets/scss/main.css"

createApp(App)
  .use(router)
  .use(pinia)
  .use(VueQueryPlugin)
  .use(Notifications)
  .provide('$notify', useNotification()) // Use provide to make the useNotification function available to the entire app
  .mount('#app');
