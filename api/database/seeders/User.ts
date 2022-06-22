import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserFactory from 'Database/factories'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await UserFactory.with('friends', 1).with('categories', 1).createMany(5)
  }
}
