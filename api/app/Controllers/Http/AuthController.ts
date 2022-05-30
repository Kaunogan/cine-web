import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/LoginValidator'
import UsersController from 'App/Controllers/Http/UsersController'

export default class AuthController {
  private expiresIn = '30mins'

  public async register({ auth, request, response }: HttpContextContract) {
    const userController = new UsersController()

    const { email, password } = await userController.store(request)

    const { token, expiresAt, user } = await auth.use('api').attempt(email, password, {
      expiresIn: this.expiresIn,
    })

    response.created({
      message: 'User created successfully',
      status: response.getStatus(),
      results: {
        token,
        userId: user.id,
        expiresAt,
      },
    })
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator)

    const { token, expiresAt, user } = await auth.use('api').attempt(email, password, {
      expiresIn: this.expiresIn,
    })

    return {
      message: 'Ok',
      status: response.getStatus(),
      results: {
        token,
        userId: user.id,
        expiresAt,
      },
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke()
    return {
      message: 'User revoked successfully',
      status: response.getStatus(),
    }
  }
}
