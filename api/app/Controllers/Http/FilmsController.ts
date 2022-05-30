import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MovieService from '@ioc:Tmdb/MovieService'

export default class FilmsController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const query = request.input('query', '')

    if (query !== '') return MovieService.searchMovie(query, page)

    return MovieService.getPopularMovie(page)
  }

  public async show({ request }: HttpContextContract) {
    const tmdbFilmId = request.param('id')

    return MovieService.getMovieDetails(tmdbFilmId)
  }
}
