import { defineStore } from 'pinia'

const useUser = defineStore('user', {
  state: () => ({
    pseudo: '',
  }),
  persist: true,
})

export default useUser
