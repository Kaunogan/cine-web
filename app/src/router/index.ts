import * as VueRouter from 'vue-router'
import LoginPage from '@/pages/Login.vue'

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
    },
  ],
})

export default router
