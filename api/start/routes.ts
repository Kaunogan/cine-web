/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.resource('users', 'UsersController').apiOnly().except(['index', 'store'])
    Route.resource('users.friends', 'UserFriendsController').apiOnly().except(['update'])
    Route.resource('users.categories', 'UserCategoriesController').apiOnly()
    Route.resource('users.categories.movies', 'UserCategoryMoviesController')
      .apiOnly()
      .only(['store', 'destroy'])
    Route.resource('movies', 'MoviesController').apiOnly().only(['index', 'show'])
    Route.post('/auth/logout', 'AuthController.logout')
    Route.get('/categories/shared/:shared_id', 'UserCategoriesController.share')
    Route.get('/users/:id/profile', 'UsersController.getProfile')
    Route.get('/users/:id/categories/all', 'UserCategoriesController.getAllCategories')
  }).middleware('auth')

  Route.post('/auth/register', 'AuthController.register')
  Route.post('/auth/login', 'AuthController.login')
})
  .prefix('/api')
  .where('id', Route.matchers.number())
  .where('user_id', Route.matchers.number())
  .where('category_id', Route.matchers.number())
  .where('movie_id', Route.matchers.number())
