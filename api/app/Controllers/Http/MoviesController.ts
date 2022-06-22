import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MovieService from '@ioc:Tmdb/MovieService'
import { IMovie } from 'Services/tmdb/interfaces'

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
}
