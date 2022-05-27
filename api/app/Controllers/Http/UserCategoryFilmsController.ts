import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AddFilmInCategoryValidator from 'App/Validators/AddFilmInCategoryValidator'
import Film from 'App/Models/Film'
import User from 'App/Models/User'

export default class UserCategoryFilmsController {
  public async store({ bouncer, request, response }: HttpContextContract) {
    const userId = request.param('user_id')
    const categoryId = request.param('category_id')

    const {
      title,
      poster_url: posterUrl,
      tmdb_film_id: tmdbFilmId,
    } = await request.validate(AddFilmInCategoryValidator)

    await bouncer.with('UserPolicy').authorize('view', userId)

    const user = await User.findOrFail(userId)

    const category = await user.related('categories').query().where('id', categoryId).firstOrFail()

    const film = await Film.firstOrCreate({
      title,
      posterUrl,
      tmdbFilmId,
    })

    const filmAlreadyExist = await category
      .related('films')
      .query()
      .wherePivot('film_id', film.id)
      .first()

    if (filmAlreadyExist !== null) {
      return response.status(409).send({
        message: `Film already exist in ${category.name} category`,
      })
    }

    await category.related('films').attach([film.id])

    return {
      message: 'ok',
    }
  }

  public async destroy({ bouncer, request }: HttpContextContract) {
    const userId = request.param('user_id')
    const categoryId = request.param('category_id')
    const filmId = request.param('id')

    await bouncer.with('UserPolicy').authorize('view', userId)

    const user = await User.findOrFail(userId)

    const category = await user.related('categories').query().where('id', categoryId).firstOrFail()

    const film = await category.related('films').query().wherePivot('film_id', filmId).firstOrFail()

    await category.related('films').detach([film.id])

    const categories = await film.related('categories').query()

    if (categories.length === 0) await film.delete()

    return {
      delete: true,
    }
  }
}
