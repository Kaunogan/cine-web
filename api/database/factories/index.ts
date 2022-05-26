// import Factory from '@ioc:Adonis/Lucid/Factory'

import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'

const UserFactory = Factory.define(User, ({ faker }) => ({
  email: faker.internet.email(),
  pseudo: faker.internet.userName(),
  password: 'cineweb',
}))
  .relation('friends', () => UserFactory)
  .build()

export default UserFactory
