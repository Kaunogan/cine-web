import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Category from 'App/Models/Category'

export default class Movie extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public posterUrl: string

  @column()
  public tmdbMovieId: number

  @manyToMany(() => Category, {
    pivotTable: 'movie_category',
    pivotTimestamps: {
      createdAt: 'created_at',
      updatedAt: false,
    },
  })
  public categories: ManyToMany<typeof Category>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
