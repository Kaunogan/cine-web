import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateCategoryValidator from 'App/Validators/CreateCategoryValidator'
import User from 'App/Models/User'
import Category from 'App/Models/Category'
import Visibility from 'App/Models/Visibility'

export default class CategoriesController {
  public async index({ bouncer, request }: HttpContextContract) {
    const userId = request.param('user_id')
    await bouncer.with('UserPolicy').authorize('view', userId)

    const user = await User.findOrFail(userId)

    return user.related('categories').query().preload('visibility')
  }

  public async store({ bouncer, request }: HttpContextContract) {
    const userId = request.param('user_id')
    const { name, visibility_id: visibilityId } = await request.validate(CreateCategoryValidator)

    await bouncer.with('UserPolicy').authorize('view', userId)

    const user = await User.findOrFail(userId)
    const visibility = await Visibility.findOrFail(visibilityId)

    const category = new Category()

    category.name = name

    await category.related('user').associate(user)
    await category.related('visibility').associate(visibility)

    await category.save()

    return {
      message: 'ok',
    }
  }
}
