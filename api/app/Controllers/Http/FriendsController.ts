import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import AddUserFriendValidator from 'App/Validators/AddUserFriendValidator'

export default class FriendsController {
  public async index({ bouncer, request }: HttpContextContract) {
    const id = request.param('user_id')
    const page = request.input('page', 1)
    const limit = request.input('limit', 12)

    await bouncer.with('UserPolicy').authorize('view', id)

    const user = await User.findOrFail(id)

    return user
      .related('friends')
      .query()
      .wherePivot('user_id', id)
      .select(['id', 'email', 'pseudo'])
      .paginate(page, limit)
  }

  public async show({ bouncer, request, response }: HttpContextContract) {
    const userId = request.param('user_id')
    let friendId = request.param('id')

    friendId = friendId === 0 ? 0 : friendId - 1

    await bouncer.with('UserPolicy').authorize('view', userId)

    const user = await User.findOrFail(userId)

    const userFriend = await user
      .related('friends')
      .query()
      .wherePivot('user_id', userId)
      .select(['id', 'email', 'pseudo'])

    if (friendId >= userFriend.length) {
      return response.status(404).send({
        message: 'Friend not found',
      })
    }

    return userFriend[friendId]
  }

  public async store({ bouncer, request, response }: HttpContextContract) {
    const id = request.param('user_id')
    const { friend } = await request.validate(AddUserFriendValidator)
    const userFriend = await User.findOrFail(friend)

    await bouncer.with('UserPolicy').authorize('view', id)

    const user = await User.findOrFail(id)

    if (id === userFriend.id) {
      return response.status(400).send({
        message: 'Friend cannot be the same as the user',
      })
    }

    const friendAlreadyExist = await user
      .related('friends')
      .query()
      .wherePivot('user_id', id)
      .where('friend', userFriend.id)

    if (friendAlreadyExist?.length === 1) {
      return response.status(400).send({
        message: 'Friend already exist',
      })
    }

    await user.related('friends').attach([userFriend.id])

    return {
      message: 'ok',
    }
  }
}
