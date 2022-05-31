import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateCategoryValidator from 'App/Validators/CreateCategoryValidator'
import User from 'App/Models/User'
import Category from 'App/Models/Category'
import Visibility from 'App/Models/Visibility'
import UpdateCategoryValidator from 'App/Validators/UpdateCategoryValidator'
import Encryption from '@ioc:Adonis/Core/Encryption'
import BadRequestException from 'App/Exceptions/BadRequestException'
import UnAuthorizedException from 'App/Exceptions/UnAuthorizedException'

interface IDecryptedSharedKey {
  category_id: number
}

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
      .preload('movies')
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

    newCategory.sharedId = Encryption.encrypt({ category_id: newCategory.id })

    await newCategory.save()

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

    if (visibilityId === 3 && category.sharedId) {
      category.sharedId = ''
    }

    if (visibilityId !== 3 && !category.sharedId) {
      category.sharedId = Encryption.encrypt({ category_id: category.id })
    }

    await category.save()
    await category.load('visibility')

    return {
      message: `Category ${category.name} updated successfully`,
      status: response.getStatus(),
      results: {
        shared_id: category.sharedId,
      },
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

  public async share({ request, response, auth }: HttpContextContract) {
    const sharedId = request.param('shared_id')
    const { user: connectedUser } = auth

    const decryptedKey = Encryption.decrypt<IDecryptedSharedKey>(sharedId)

    if (!decryptedKey) {
      throw new BadRequestException('Invalid shared id', 400, 'E_BAD_REQUEST')
    }

    const category = await Category.findOrFail(decryptedKey.category_id)

    const movies = await category.related('movies').query()
    const visibility = await category.related('visibility').query().firstOrFail()
    const author = await category.related('user').query().firstOrFail()

    const authorIsConnectedUser = connectedUser?.id === author.id

    if (visibility.id === 3 && !authorIsConnectedUser) {
      throw new UnAuthorizedException('Unauthorized access', 401, 'E_UNAUTHORIZED_ACCESS')
    }

    if (visibility.id === 2 && !authorIsConnectedUser) {
      const friends = await author.related('friends').query()

      const isFriend = friends.find((friend) => friend.id === connectedUser?.id) !== undefined

      if (!isFriend)
        throw new UnAuthorizedException('Unauthorized access', 401, 'E_UNAUTHORIZED_ACCESS')
    }

    return {
      message: 'Ok',
      status: response.getStatus(),
      results: {
        category_name: category.name,
        created_by: author.pseudo,
        movies,
      },
    }
  }
}
