import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Visibility from 'App/Models/Visibility'

export default class VisibilitySeeder extends BaseSeeder {
  public async run() {
    await Visibility.createMany([
      {
        type: 'All',
      },
      {
        type: 'Friends only',
      },
      {
        type: 'You only',
      },
    ])
  }
}
