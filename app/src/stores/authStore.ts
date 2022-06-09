import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import moment from 'moment'

const useAuth = defineStore('auth', {
  state: () => ({
    token: useStorage('token', ''),
    expireAt: useStorage('expireAt', ''),
  }),
  getters: {
    isExpired: (state): boolean => {
      if (!state.expireAt) return true
      return moment().isAfter(state.expireAt)
    },
  },
})

export default useAuth
