import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import { RequestContract } from '@ioc:Adonis/Core/Request'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'

interface ICategoryToSend {
  id: number
  name: string
  shared_id: string
}

export default class UsersController {
  public async show({ bouncer, request, response }: HttpContextContract) {
    const id = request.param('id')

    await bouncer.with('UserPolicy').authorize('view', id)

    const user = await User.findOrFail(id)

    return {
      message: 'Ok',
      status: response.getStatus(),
      results: user,
    }
  }

  public async store(request: RequestContract) {
    const payload = await request.validate(CreateUserValidator)
    await User.create(payload)
    return payload
  }

  public async update({ bouncer, request, response }: HttpContextContract) {
    const id = request.param('id')
    const payload = await request.validate(UpdateUserValidator)

    await bouncer.with('UserPolicy').authorize('view', id)

    const user = await User.findOrFail(id)
    await user.merge(payload).save()

    return {
      message: `User ${user.pseudo} updated successfully`,
      status: response.getStatus(),
    }
  }

  public async destroy({ bouncer, request, response }: HttpContextContract) {
    const id = request.param('id')

    await bouncer.with('UserPolicy').authorize('view', id)

    const user = await User.findOrFail(id)

    await user.delete()

    return {
      message: 'User deleted successfully',
      status: response.getStatus(),
    }
  }

  public async getProfile({ auth, request, response }: HttpContextContract) {
    const userId = request.param('id')
    const { user: connectedUser } = auth

    let categoriesToSend: ICategoryToSend[] = []
    let nbOfMovies = 0

    const user = await User.findOrFail(userId)

    const categories = await user
      .related('categories')
      .query()
      .select(['id', 'name', 'sharedId', 'visibilityId'])
      .preload('visibility')
      .preload('movies')

    const userFriends = await user.related('friends').query()

    const connectedUserIsFriend =
      userFriends.find((friend) => friend.id === connectedUser?.id) !== undefined

    const isConnectedUser = connectedUser?.id === userId

    // Get categories depending on connected user & visibility
    if (isConnectedUser) {
      categoriesToSend = categories.map(({ id, name, sharedId, movies }) => {
        nbOfMovies += movies.length

        return {
          id,
          name,
          shared_id: sharedId,
        }
      })
    } else {
      categories.forEach(({ id, name, movies, sharedId, visibility }) => {
        const categoryToSend: ICategoryToSend = {
          id,
          name,
          shared_id: sharedId,
        }

        if (visibility.id === 1) {
          categoriesToSend = [...categoriesToSend, categoryToSend]
          nbOfMovies += movies.length
        }

        if (visibility.id === 2 && connectedUserIsFriend) {
          categoriesToSend = [...categoriesToSend, categoryToSend]
          nbOfMovies += movies.length
        }
      })
    }

    return {
      message: 'Ok',
      status: response.getStatus(),
      results: {
        user_pseudo: user.pseudo,
        friend: isConnectedUser ? null : connectedUserIsFriend,
        total: {
          categories: categoriesToSend.length,
          movies: nbOfMovies,
        },
        categories: categoriesToSend,
      },
    }
  }
}
