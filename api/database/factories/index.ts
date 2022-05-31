// import Factory from '@ioc:Adonis/Lucid/Factory'

import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'
import Category from 'App/Models/Category'
import Encryption from '@ioc:Adonis/Core/Encryption'

let categoryId = 0

const CategoryFactory = Factory.define(Category, ({ faker }) => ({
  name: faker.lorem.sentence(2),
  visibilityId: 1,
  sharedId: Encryption.encrypt({ category_id: (categoryId += 1) }),
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
