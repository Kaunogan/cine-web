// import Factory from '@ioc:Adonis/Lucid/Factory'

import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'
import Category from 'App/Models/Category'

const CategoryFactory = Factory.define(Category, ({ faker }) => ({
  name: faker.lorem.sentence(2),
  visibilityId: 1,
})).build()

const UserFactory = Factory.define(User, ({ faker }) => ({
  email: faker.internet.email(),
  pseudo: faker.internet.userName(),
  password: 'cineweb',
}))
  .relation('friends', () => UserFactory)
  .relation('categories', () => CategoryFactory)
  .build()

export default UserFactory
