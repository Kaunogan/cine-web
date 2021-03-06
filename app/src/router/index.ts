import * as VueRouter from 'vue-router'
import useAuth from '@/stores/authStore'
import * as LocalStorageController from '@/controllers/LocalStorage'
import useComponents from '@/stores/componentsStore'

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
      meta: { needLoggedIn: false },
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
      meta: { needLoggedIn: false },
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
    | Movie Details
    |--------------------------------------------------------------------------
    |
    | Route to movie details
    |
    */
    {
      path: '/movie/:id',
      name: 'MovieDetails',
      component: () => import('@/pages/MovieDetails.vue'),
      meta: { needLoggedIn: true },
    },

    /*
    |--------------------------------------------------------------------------
    | Categories
    |--------------------------------------------------------------------------
    |
    | Route to categories
    |
    */
    {
      path: '/categories',
      name: 'Categories',
      component: () => import('@/pages/category/Categories.vue'),
      meta: { needLoggedIn: true },
    },

    /*
    |--------------------------------------------------------------------------
    | Category Details
    |--------------------------------------------------------------------------
    |
    | Route to category details
    |
    */
    {
      path: '/categories/:id',
      name: 'CategoryDetails',
      component: () => import('@/pages/category/CategoryDetails.vue'),
      meta: { needLoggedIn: true },
    },

    /*
    |--------------------------------------------------------------------------
    | Category Shared
    |--------------------------------------------------------------------------
    |
    | Route to shared category
    |
    */
    {
      path: '/category/shared/:sharedId',
      name: 'CategoryShared',
      component: () => import('@/pages/category/CategoryShared.vue'),
      meta: { needLoggedIn: true },
    },

    /*
    |--------------------------------------------------------------------------
    | Add Category
    |--------------------------------------------------------------------------
    |
    | Route to add a new category
    |
    */
    {
      path: '/categories/add',
      name: 'AddCategory',
      component: () => import('@/pages/category/AddCategory.vue'),
      meta: { needLoggedIn: true },
    },

    /*
    |--------------------------------------------------------------------------
    | Friends
    |--------------------------------------------------------------------------
    |
    | Route displayed user friends
    |
    */
    {
      path: '/friends',
      name: 'Friends',
      component: () => import('@/pages/friends/Friends.vue'),
      meta: { needLoggedIn: false },
    },

    /*
    |--------------------------------------------------------------------------
    | Add Friend
    |--------------------------------------------------------------------------
    |
    | Route to add a new user friend
    |
    */
    {
      path: '/friends/add',
      name: 'AddFriend',
      component: () => import('@/pages/friends/AddFriend.vue'),
      meta: { needLoggedIn: true },
    },

    /*
    |--------------------------------------------------------------------------
    | User Account
    |--------------------------------------------------------------------------
    |
    | Route to see user account
    |
    */
    {
      path: '/user/account',
      name: 'UserAccount',
      component: () => import('@/pages/UserAccount.vue'),
      meta: { needLoggedIn: true },
    },

    /*
    |--------------------------------------------------------------------------
    | User Profile
    |--------------------------------------------------------------------------
    |
    | Route to see user profile
    |
    */
    {
      path: '/user/:id/profile',
      name: 'UserProfile',
      component: () => import('@/pages/UserProfile.vue'),
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
      meta: { needLoggedIn: false },
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
router.beforeEach(async (to) => {
  const auth = useAuth()
  const components = useComponents()

  if (components.sidebar.isOpen) components.slideSideBar()

  if (to.meta.needLoggedIn && auth.isExpired) {
    await LocalStorageController.clearApplication()
    return '/signin'
  }
})

export default router
