import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import { RequestContract } from '@ioc:Adonis/Core/Request'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'

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
}
