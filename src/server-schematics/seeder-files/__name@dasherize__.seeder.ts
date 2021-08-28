import * as faker from 'faker/locale/fr'
import { Connection, EntityManager } from 'typeorm'

import { <%= classify(name) %> } from '../../src/resources/<%= dasherize(name) %>/<%= dasherize(name) %>.entity'

export class <%= classify(name) %>Seeder {
  entityManager: EntityManager
  count: number

  constructor(connection: Connection, count: number) {
    this.entityManager = connection.createEntityManager()
    this.count = count
  }

  async seed(): Promise<<%= classify(name) %>[]> {
    console.log('\x1b[35m', '[] Seeding <%= camelize(name) %>s...')
    const save<%= classify(name) %>Promises: Promise<<%= classify(name) %>>[] = Array.from(Array(this.count)).map(
      async () => {
        return this.entityManager.save(await this.get<%= classify(name) %>())
      }
    )

    return Promise.all(save<%= classify(name) %>Promises).then((res) => {
      return res
    })
  }

  private get<%= classify(name) %>(): Promise<<%= classify(name) %>> {
    const <%= camelize(name) %>: <%= classify(name) %> = this.entityManager.create(<%= classify(name) %>, {
      // Insert factory properties here.
    })

    return Promise.resolve(<%= camelize(name) %>)
  }
}
