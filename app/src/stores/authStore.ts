import { defineStore } from 'pinia'
import moment from 'moment'

const useAuth = defineStore('auth', {
  state: () => ({
    token: '',
    userId: 0,
    expireAt: '',
  }),
  getters: {
    isExpired: (state): boolean => {
      if (state.expireAt === '') return true
      return moment().isAfter(state.expireAt)
    },
  },
  persist: true,
})

export default useAuth
