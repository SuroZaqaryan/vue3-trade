import { defineStore } from 'pinia'
import { api } from "@/libs/axios"
import { AuthState, User } from "@/models/user.model"
import { useNotification } from '@kyvg/vue3-notification'

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): AuthState => ({
    user: {
      id: '',
      user: '',
      password: '',
      name: '',
      role: ''
    },
    isAuthenticated: false,
  }),
  actions: {
    async login(name: string, password: string) {
      if (password.length < 8) {
        return this.validate("Пароль должен быть более 8 символов")
      }

      const { data: users } = await api.get('users')
      const findUserDb = users.find((u: User) => u.name === name && u.password === password)
      
      if (findUserDb) {
        this.isAuthenticated = true;
        this.user = Object.assign({}, findUserDb, { password: "" });
        window.location.href = '/'; // Все ок, редиректим
      } else {
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
        paths: ["isAuthenticated", "user"],
      },
    ],
  },
})
