import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Visibility from 'App/Models/Visibility'
import User from 'App/Models/User'
import Movie from 'App/Models/Movie'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({
    serializeAs: null,
  })
  public userId: number

  @column()
  public name: string

  @column({
    serializeAs: null,
  })
  public visibilityId: number

  @column()
  public sharedId: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Visibility)
  public visibility: BelongsTo<typeof Visibility>

  @manyToMany(() => Movie, {
    pivotTable: 'movie_category',
    pivotTimestamps: {
      createdAt: 'created_at',
      updatedAt: false,
    },
  })
  public movies: ManyToMany<typeof Movie>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
