import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MovieService from '@ioc:Tmdb/MovieService'
import { IMovie } from 'Services/tmdb/interfaces'

export default class FilmsController {
  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const query = request.input('query', '')
    let movies: IMovie[] = []

    if (query !== '') {
      movies = await MovieService.searchMovie(query, page)
    } else {
      movies = await MovieService.getPopularMovie(page)
    }

    return {
      message: 'Ok',
      status: response.getStatus(),
      results: movies,
    }
  }

  public async show({ request, response }: HttpContextContract) {
    const tmdbFilmId = request.param('id')

    const movies = await MovieService.getMovieDetails(tmdbFilmId)

    return {
      message: 'Ok',
      status: response.getStatus(),
      results: movies,
    }
  }
}
