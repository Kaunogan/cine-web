import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MovieService from '@ioc:Tmdb/MovieService'
import { IMovie } from 'Services/tmdb/interfaces'
import User from 'App/Models/User'

export default class MoviesController {
  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const query = request.input('query', '')
    let movies: IMovie[] = []

    if (query !== '') {
      movies = await MovieService.searchMovie(query, page)
    } else {
      movies = await MovieService.getNowPlayingMovie(page)
    }

    return {
      message: 'Ok',
      status: response.getStatus(),
      results: movies,
    }
  }

  public async show({ request, response }: HttpContextContract) {
    const tmdbMovieId = request.param('id')

    const movies = await MovieService.getMovieDetails(tmdbMovieId)

    return {
      message: 'Ok',
      status: response.getStatus(),
      results: movies,
    }
  }

  public async getRelatedCategories({ bouncer, request, response }: HttpContextContract) {
    const userId = request.param('id', 0)
    const tmdbMovieId = request.param('movie_id', 0)

    await bouncer.with('UserPolicy').authorize('view', userId)

    const user = await User.findOrFail(userId)

    const categories = await user.related('categories').query().preload('movies')
    const category = categories.filter(({ movies }) =>
      movies.find((_movie) => _movie.tmdbMovieId === tmdbMovieId)
    )

    return {
      message: 'Ok',
      status: response.getStatus(),
      results: category.length !== 0 ? { id: category[0].id, name: category[0].name } : {},
    }
  }
}
