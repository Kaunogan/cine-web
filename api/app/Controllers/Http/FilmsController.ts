import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MovieService from '@ioc:Tmdb/MovieService'

export default class FilmsController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)

    /*  const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${Env.get('TMDB_API_KEY')}&page=${page}`
    )

    console.log(data.results.length) */

    return MovieService.getPopularMovie(page)
  }
}
