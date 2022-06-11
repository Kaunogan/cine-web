import * as VueRouter from 'vue-router'
import useAuth from '@/stores/authStore'
import * as LocalStorageController from '@/controllers/LocalStorage'

/*
|--------------------------------------------------------------------------
| VueRouter configuration
|--------------------------------------------------------------------------
|
| The configuration of vue router used in the Vue ecosystem
|
*/
const router = VueRouter.createRouter({
  /*
  |--------------------------------------------------------------------------
  | History route
  |--------------------------------------------------------------------------
  |
  | History implementation used by the router
  |
  */
  history: VueRouter.createWebHistory(),

  /*
  |--------------------------------------------------------------------------
  | Routes
  |--------------------------------------------------------------------------
  |
  | Implements all the routes of the web application
  |
  */
  routes: [
    /*
    |--------------------------------------------------------------------------
    | Signin
    |--------------------------------------------------------------------------
    |
    | Route to sign in user
    |
    */
    {
      path: '/signin',
      name: 'Signin',
      component: () => import('@/pages/Signin.vue'),
      // eslint-disable-next-line consistent-return
      beforeEnter: () => {
        const auth = useAuth()
        if (!auth.isExpired) return '/home'
      },
    },

    /*
    |--------------------------------------------------------------------------
    | Register
    |--------------------------------------------------------------------------
    |
    | Route to register user
    |
    */
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/pages/Register.vue'),
      // eslint-disable-next-line consistent-return
      beforeEnter: () => {
        const auth = useAuth()
        if (!auth.isExpired) return '/home'
      },
    },

    /*
    |--------------------------------------------------------------------------
    | Home
    |--------------------------------------------------------------------------
    |
    | Route to home
    |
    */
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/pages/Home.vue'),
      meta: { needLoggedIn: true },
    },

    /*
    |--------------------------------------------------------------------------
    | Not Found
    |--------------------------------------------------------------------------
    |
    | Route displayed when the user requests a page that does not exist
    |
    */
    {
      path: '/notfound',
      name: 'NotFound',
      component: () => import('@/pages/NotFound.vue'),
    },

    /*
    |--------------------------------------------------------------------------
    | Redirect Home
    |--------------------------------------------------------------------------
    |
    | Route that redirects to home page
    |
    */
    {
      path: '/',
      redirect: '/home',
    },

    /*
    |--------------------------------------------------------------------------
    | Redirect Not Found
    |--------------------------------------------------------------------------
    |
    | Route that redirects a not found  page
    |
    */
    {
      path: '/:wrongPath(.*)',
      redirect: () => ({
        name: 'NotFound',
      }),
    },
  ],
})

/*
|--------------------------------------------------------------------------
| Navigation Guard
|--------------------------------------------------------------------------
|
| Check for each route if the token has not expired
|
*/
// eslint-disable-next-line consistent-return
router.beforeEach((to) => {
  const auth = useAuth()

  if (to.meta.needLoggedIn && auth.isExpired) {
    LocalStorageController.clearStoresApplication()
    return '/signin'
  }
})

export default router
