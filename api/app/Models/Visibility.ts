import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Category from 'App/Models/Category'

export default class Visibility extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => Category)
  public visibility: HasMany<typeof Category>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
