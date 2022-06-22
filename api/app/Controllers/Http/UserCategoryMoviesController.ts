import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AddMovieInCategoryValidator from 'App/Validators/AddMovieInCategoryValidator'
import Movie from 'App/Models/Movie'
import User from 'App/Models/User'
import ConflictException from 'App/Exceptions/ConflictException'

export default class UserCategoryMoviesController {
  public async store({ bouncer, request, response }: HttpContextContract) {
    const userId = request.param('user_id')
    const categoryId = request.param('category_id')

    const {
      title,
      poster_url: posterUrl,
      tmdb_movie_id: tmdbMovieId,
    } = await request.validate(AddMovieInCategoryValidator)

    await bouncer.with('UserPolicy').authorize('view', userId)

    const user = await User.findOrFail(userId)

    const category = await user.related('categories').query().where('id', categoryId).firstOrFail()

    const movie = await Movie.firstOrCreate({
      title,
      posterUrl,
      tmdbMovieId,
    })

    const movieAlreadyExist = await category
      .related('movies')
      .query()
      .wherePivot('movie_id', movie.id)
      .first()

    if (movieAlreadyExist !== null) {
      throw new ConflictException(
        `Movie already exist in ${category.name} category`,
        409,
        'E_CONFLICT'
      )
    }

    await category.related('movies').attach([movie.id])

    response.created({
      message: 'Movie added successfully',
      status: response.getStatus(),
    })
  }

  public async destroy({ bouncer, request, response }: HttpContextContract) {
    const userId = request.param('user_id')
    const categoryId = request.param('category_id')
    const movieId = request.param('id')

    await bouncer.with('UserPolicy').authorize('view', userId)

    const user = await User.findOrFail(userId)

    const category = await user.related('categories').query().where('id', categoryId).firstOrFail()

    const movie = await category
      .related('movies')
      .query()
      .wherePivot('movie_id', movieId)
      .firstOrFail()

    await category.related('movies').detach([movie.id])

    const categories = await movie.related('categories').query()

    if (categories.length === 0) await movie.delete()

    return {
      message: 'Movie deleted successfully',
      status: response.getStatus(),
    }
  }
}
