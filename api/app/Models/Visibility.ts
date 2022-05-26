import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Category from 'App/Models/Category'

export default class Visibility extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type: string

  @hasMany(() => Category)
  public category: HasMany<typeof Category>
}
