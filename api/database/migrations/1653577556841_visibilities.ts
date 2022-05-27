import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'visibilities'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('type', 255).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
