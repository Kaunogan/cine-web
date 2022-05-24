import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import { RequestContract } from '@ioc:Adonis/Core/Request'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UnAuthorizedException from 'App/Exceptions/UnAuthorizedException'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'

export default class UsersController {
  // Check if user has authorization
  protected checkIfUserIsAuthorized(id: number, connectedUserId?: number): void {
    if (id === connectedUserId) return
    throw new UnAuthorizedException('You are not authorized', 403, 'E_UNAUTHORIZED')
  }

  // Crud methods
  public async index() {
    return User.all()
  }

  public show({ request }: HttpContextContract) {
    const id = request.param('id')

    return User.findOrFail(id)
  }

  public async store(request: RequestContract) {
    const payload = await request.validate(CreateUserValidator)
    await User.create(payload)
    return payload
  }

  public async update({ auth, request }: HttpContextContract) {
    const id = request.param('id')
    const connectedUserId = auth.user?.id
    const payload = await request.validate(UpdateUserValidator)

    this.checkIfUserIsAuthorized(id, connectedUserId)

    const user = await User.findOrFail(id)

    await user.merge(payload).save()

    return user
  }

  public async destroy({ auth, request }: HttpContextContract) {
    const id = request.param('id')
    const connectedUserId = auth.user?.id

    this.checkIfUserIsAuthorized(id, connectedUserId)

    const user = await User.findOrFail(id)

    await auth.use('api').revoke()
    await user.delete()

    return { deleted: true }
  }
}
