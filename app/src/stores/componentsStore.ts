import { defineStore } from 'pinia'

const useComponents = defineStore('components', {
  state: () => ({
    sidebar: { isOpen: false },
  }),
  actions: {
    slideSideBar() {
      this.sidebar.isOpen = !this.sidebar.isOpen
    },
  },
})

export default useComponents
