import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import { RequestContract } from '@ioc:Adonis/Core/Request'

export default class UsersController {
  public index() {
    return User.all()
  }

  public async store(request: RequestContract) {
    const payload = await request.validate(CreateUserValidator)
    await User.create(payload)
    return payload
  }
}
