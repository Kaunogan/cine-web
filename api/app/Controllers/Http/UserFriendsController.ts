import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import AddUserFriendValidator from 'App/Validators/AddUserFriendValidator'
import ConflictException from 'App/Exceptions/ConflictException'

export default class UserFriendsController {
  public async index({ bouncer, request, response }: HttpContextContract) {
    const userId = request.param('user_id')
    const page = request.input('page', 1)
    const limit = request.input('limit', 12)

    await bouncer.with('UserPolicy').authorize('view', userId)

    const user = await User.findOrFail(userId)

    const friends = await user
      .related('friends')
      .query()
      .select(['id', 'pseudo'])
      .paginate(page, limit)

    return {
      message: 'Ok',
      status: response.getStatus(),
      pagination: friends.getMeta(),
      results: friends.all(),
    }
  }

  public async show({ bouncer, request, response }: HttpContextContract) {
    const userId = request.param('user_id')
    const friendId = request.param('id')

    await bouncer.with('UserPolicy').authorize('view', userId)

    const user = await User.findOrFail(userId)

    const friend = await user
      .related('friends')
      .query()
      .wherePivot('friend', friendId)
      .select(['id', 'pseudo'])
      .firstOrFail()

    return {
      message: 'Ok',
      status: response.getStatus(),
      results: friend,
    }
  }

  public async store({ bouncer, request, response }: HttpContextContract) {
    const userId = request.param('user_id')
    const { friend_email: friendEmail } = await request.validate(AddUserFriendValidator)

    await bouncer.with('UserPolicy').authorize('view', userId)

    const user = await User.findOrFail(userId)
    const userFriend = await User.findByOrFail('email', friendEmail)

    if (user.id === userFriend.id) {
      throw new ConflictException('Friend cannot be the same as the user', 409, 'E_CONFLICT')
    }

    const existingFriend = await user
      .related('friends')
      .query()
      .wherePivot('friend', userFriend.id)
      .first()

    if (existingFriend !== null) {
      throw new ConflictException('Friend already exist', 409, 'E_CONFLICT')
    }

    await user.related('friends').attach([userFriend.id])

    response.created({
      message: 'Friend added successfully',
      status: response.getStatus(),
    })
  }

  public async destroy({ bouncer, request, response }: HttpContextContract) {
    const userId = request.param('user_id')
    const friendId = request.param('id')

    await bouncer.with('UserPolicy').authorize('view', userId)

    const user = await User.findOrFail(userId)

    const userFriend = await user
      .related('friends')
      .query()
      .wherePivot('friend', friendId)
      .firstOrFail()

    await user.related('friends').detach([userFriend.id])

    return {
      message: 'Friend deleted successfully',
      status: response.getStatus(),
    }
  }
}
