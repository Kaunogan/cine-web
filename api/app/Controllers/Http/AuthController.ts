import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/LoginValidator'
import UsersController from 'App/Controllers/Http/UsersController'

export default class AuthController {
  private expiresIn = '30mins'

  public async register({ auth, request }: HttpContextContract) {
    const userController = new UsersController()

    const { email, password } = await userController.store(request)

    return auth.use('api').attempt(email, password, {
      expiresIn: this.expiresIn,
    })
  }

  public async login({ auth, request }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator)

    return auth.use('api').attempt(email, password, {
      expiresIn: this.expiresIn,
    })
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()

    return { revoked: true }
  }
}
