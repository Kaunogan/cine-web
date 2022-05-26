import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import AddUserFriendValidator from 'App/Validators/AddUserFriendValidator'

export default class UserFriendsController {
  public async index({ bouncer, request }: HttpContextContract) {
    const userId = request.param('user_id')
    const page = request.input('page', 1)
    const limit = request.input('limit', 12)

    await bouncer.with('UserPolicy').authorize('view', userId)

    const user = await User.findOrFail(userId)

    return user.related('friends').query().select(['id', 'email', 'pseudo']).paginate(page, limit)
  }

  public async show({ bouncer, request, response }: HttpContextContract) {
    const userId = request.param('user_id')
    let friendNumber = request.param('id')

    if (friendNumber === 0) {
      return response.status(400).send({
        message: 'Bad friend id',
      })
    }

    friendNumber -= 1

    await bouncer.with('UserPolicy').authorize('view', userId)

    const user = await User.findOrFail(userId)

    const userFriends = await user.related('friends').query().select(['id', 'email', 'pseudo'])

    if (friendNumber >= userFriends.length) {
      return response.status(404).send({
        message: 'Friend not found',
      })
    }

    return userFriends[friendNumber]
  }

  public async store({ bouncer, request, response }: HttpContextContract) {
    const userId = request.param('user_id')
    const { friend_email: friendEmail } = await request.validate(AddUserFriendValidator)

    await bouncer.with('UserPolicy').authorize('view', userId)

    const user = await User.findOrFail(userId)
    const userFriend = await User.findByOrFail('email', friendEmail)

    if (user.id === userFriend.id) {
      return response.status(409).send({
        message: 'Friend cannot be the same as the user',
      })
    }

    const existingFriend = await user
      .related('friends')
      .query()
      .wherePivot('friend', userFriend.id)
      .first()

    if (existingFriend !== null) {
      return response.status(409).send({
        message: 'Friend already exist',
      })
    }

    await user.related('friends').attach([userFriend.id])

    return {
      message: 'ok',
    }
  }

  public async destroy({ bouncer, request, response }: HttpContextContract) {
    const userId = request.param('user_id')
    let friendNumber = request.param('id')

    if (friendNumber === 0) {
      return response.status(400).send({
        message: 'Bad friend id',
      })
    }

    friendNumber -= 1

    await bouncer.with('UserPolicy').authorize('view', userId)

    const user = await User.findOrFail(userId)

    const userFriends = await user.related('friends').query().select(['id', 'email', 'pseudo'])

    if (friendNumber >= userFriends.length) {
      return response.status(404).send({
        message: 'Friend not found',
      })
    }

    const userFriend = userFriends[friendNumber]

    await user.related('friends').detach([userFriend.id])

    return {
      delete: 'ok',
    }
  }
}
