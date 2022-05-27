import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Application from '@ioc:Adonis/Core/Application'

export default class IndexSeeder extends BaseSeeder {
  private async runSeeder(seeder: { default: typeof BaseSeeder }) {
    if (seeder.default.developmentOnly && !Application.inDev) return

    // eslint-disable-next-line new-cap
    await new seeder.default(this.client).run()
  }

  public async run() {
    await this.runSeeder(await import('../Visibility'))
    await this.runSeeder(await import('../User'))
  }
}
