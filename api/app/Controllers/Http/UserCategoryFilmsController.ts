import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AddFilmInCategoryValidator from 'App/Validators/AddFilmInCategoryValidator'
import Film from 'App/Models/Film'

export default class UserCategoryFilmsController {
  public async store({ bouncer, request }: HttpContextContract) {
    const userId = request.param('user_id')

    const {
      title,
      poster_url: posterUrl,
      tmdb_film_id: tmdbFilmId,
    } = await request.validate(AddFilmInCategoryValidator)

    await bouncer.with('UserPolicy').authorize('view', userId)

    return Film.firstOrCreate({
      title,
      posterUrl,
      tmdbFilmId,
    })
  }
}
