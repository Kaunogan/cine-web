import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import { RequestContract } from '@ioc:Adonis/Core/Request'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'

export default class UsersController {
  public async show({ request, bouncer }: HttpContextContract) {
    const id = request.param('id')

    await bouncer.with('UserPolicy').authorize('view', id)

    return User.findOrFail(id)
  }

  public async store(request: RequestContract) {
    const payload = await request.validate(CreateUserValidator)
    await User.create(payload)
    return payload
  }

  public async update({ request, bouncer }: HttpContextContract) {
    const id = request.param('id')
    const payload = await request.validate(UpdateUserValidator)

    await bouncer.with('UserPolicy').authorize('view', id)

    const user = await User.findOrFail(id)
    await user.merge(payload).save()

    return user
  }

  public async destroy({ auth, request, bouncer }: HttpContextContract) {
    const id = request.param('id')

    await bouncer.with('UserPolicy').authorize('view', id)

    const user = await User.findOrFail(id)

    await auth.use('api').revoke()
    await user.delete()

    return { deleted: true }
  }
}
