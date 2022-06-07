import * as VueRouter from 'vue-router'

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

export default router
