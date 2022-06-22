import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Category from 'App/Models/Category'
import Encryption from '@ioc:Adonis/Core/Encryption'
import Movie from 'App/Models/Movie'

export default class ProductionSeeder extends BaseSeeder {
  public async run() {
    // Create Users
    const firstUser = await User.create({
      email: 'john.doe@cineweb.fr',
      pseudo: 'John doe',
      password: 'cineweb',
    })

    const secondUser = await User.create({
      email: 'jane.doe@cineweb.fr',
      pseudo: 'Jane doe',
      password: 'cineweb',
    })

    await firstUser.related('friends').attach([2])
    await secondUser.related('friends').attach([1])

    // Create Movies
    await Movie.createMany([
      {
        title: 'The Hobbit: An Unexpected Journey',
        posterUrl: 'https://image.tmdb.org/t/p/w220_and_h330_face/yHA9Fc37VmpUA5UncTxxo3rTGVA.jpg',
        tmdbMovieId: 49051,
      },
      {
        title: 'Avatar',
        posterUrl: 'https://image.tmdb.org/t/p/w220_and_h330_face/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg',
        tmdbMovieId: 19995,
      },
    ])

    // Create Categories
    const firstCategory = await Category.create({
      name: 'Action',
      userId: 1,
      visibilityId: 1,
      sharedId: Encryption.encrypt({ category_id: 1 }),
    })

    await firstCategory.related('movies').attach([1])

    const secondCategory = await Category.create({
      name: 'Fantastic',
      userId: 2,
      visibilityId: 2,
      sharedId: Encryption.encrypt({ category_id: 2 }),
    })

    await secondCategory.related('movies').attach([2])
  }
}
