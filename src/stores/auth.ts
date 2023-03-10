import { defineStore } from 'pinia'
import axios from "axios"
import { AuthState, User } from "@/models/user.model"
import { useNotification } from '@kyvg/vue3-notification'

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): AuthState => ({
    user: null,
    username: null,
    isAuthenticated: false,
    isAdmin: false,
  }),
  actions: {
    async login(name: string, password: string) {

      if (password.length < 3) {
        this.validate("Пароль должен быть не менее 8 символов")
        return
      }

      const { data: users } = await axios.get('http://localhost:4000/users')
      const user = users.find((u: User) => u.name === name && u.password === password)

      // Все ок, редиректим
      if (user) {
        this.isAuthenticated = true;
        // Проверям админ ли клиент или нет
        user.role === 'ADMIN' ? this.isAdmin = true : null;
        this.username = user.name;
        window.location.href = '/';
      } else {
        // Такого пользователя нету
        this.validate("Неверный логин или пароль")
      }
    },

    validate(text: string) {
      const { notify } = useNotification()
      notify({ type: 'error', text: text })
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ["isAuthenticated", "isAdmin", "username"],
      },
    ],
  },
})
