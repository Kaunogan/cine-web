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
    | Login
    |--------------------------------------------------------------------------
    |
    | Route to authenticate user
    |
    */
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/Login.vue'),
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
