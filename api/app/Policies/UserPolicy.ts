import Bouncer, { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class UserPolicy extends BasePolicy {
  public async view(user: User, userId: number) {
    if (user.id === userId) return true
    return Bouncer.deny('You are not authorized')
  }
}
