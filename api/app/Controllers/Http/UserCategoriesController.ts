import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateCategoryValidator from 'App/Validators/CreateCategoryValidator'
import User from 'App/Models/User'
import Category from 'App/Models/Category'
import Visibility from 'App/Models/Visibility'
import UpdateCategoryValidator from 'App/Validators/UpdateCategoryValidator'

export default class UserCategoriesController {
  public async index({ bouncer, request, response }: HttpContextContract) {
    const userId = request.param('user_id')
    const page = request.input('page', 1)
    const limit = request.input('limit', 12)

    await bouncer.with('UserPolicy').authorize('view', userId)

    const user = await User.findOrFail(userId)

    const results = await user
      .related('categories')
      .query()
      .select(['id', 'name'])
      .paginate(page, limit)

    return {
      message: 'Ok',
      status: response.getStatus(),
      pagination: results.getMeta(),
      results: results.all(),
    }
  }

  public async show({ bouncer, request, response }: HttpContextContract) {
    const userId = request.param('user_id')
    const categoryId = request.param('id')

    await bouncer.with('UserPolicy').authorize('view', userId)

    const user = await User.findOrFail(userId)

    const results = await user
      .related('categories')
      .query()
      .where('id', categoryId)
      .preload('visibility')
      .preload('films')
      .firstOrFail()

    return {
      message: 'Ok',
      status: response.getStatus(),
      results,
    }
  }

  public async store({ bouncer, request, response }: HttpContextContract) {
    const userId = request.param('user_id')
    const { name } = await request.validate(CreateCategoryValidator)

    await bouncer.with('UserPolicy').authorize('view', userId)

    const user = await User.findOrFail(userId)
    const visibility = await Visibility.findOrFail(1)

    const category = new Category()

    category.name = name

    await category.related('user').associate(user)
    await category.related('visibility').associate(visibility)

    const newCategory = await category.save()

    response.created({
      message: `Category ${newCategory.name} created successfully`,
      status: response.getStatus(),
    })
  }

  public async update({ bouncer, request, response }: HttpContextContract) {
    const userId = request.param('user_id')
    const categoryId = request.param('id')

    const { name, visibility_id: visibilityId } = await request.validate(UpdateCategoryValidator)

    await bouncer.with('UserPolicy').authorize('view', userId)

    const user = await User.findOrFail(userId)

    const category = await user.related('categories').query().where('id', categoryId).firstOrFail()

    if (name !== undefined) category.name = name

    if (visibilityId !== undefined) {
      const visibility = await Visibility.findOrFail(visibilityId)
      await category.related('visibility').associate(visibility)
    }

    await category.save()
    await category.load('visibility')

    return {
      message: `Category ${category.name} updated successfully`,
      status: response.getStatus(),
    }
  }

  public async destroy({ bouncer, request, response }: HttpContextContract) {
    const userId = request.param('user_id')
    const categoryId = request.param('id')

    await bouncer.with('UserPolicy').authorize('view', userId)

    const user = await User.findOrFail(userId)

    const category = await user.related('categories').query().where('id', categoryId).firstOrFail()

    await category.delete()

    return {
      message: `Category ${category.name} deleted successfully`,
      status: response.getStatus(),
    }
  }
}
