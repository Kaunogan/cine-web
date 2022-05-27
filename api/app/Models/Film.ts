import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Film extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public posterUrl: string

  @column()
  public tmdbFilmId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
