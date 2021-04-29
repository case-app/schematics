import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'

import { Paginator, PaginationService } from 'abacus-nest-library'
import { <%= classify(name) %> } from './<%= dasherize(name) %>.entity'
import { CreateUpdate<%= classify(name) %>Dto } from './dtos/create-update-<%= camelize(name) %>.dto'

@Injectable()
export class <%= classify(name) %>Service {
constructor(
    @InjectRepository(<%= classify(name) %>)
    private readonly repository: Repository<<%= classify(name) %>>,
    private paginationService: PaginationService
  ) {}

  async index({
    page,
    orderBy,
    orderByDesc,
    withoutPagination
  }: {
    page?: string
    orderBy?: string
    orderByDesc?: string
    withoutPagination?: string
  }): Promise<Paginator<<%= classify(name) %>> | <%= classify(name) %>[]> {
    const query = this.repository
      .createQueryBuilder('<%= camelize(name) %>')
 
    if (orderBy) {
      query.orderBy(
        orderBy.includes('.') ? orderBy : '<%= camelize(name) %>.' + orderBy,
        orderByDesc && orderByDesc === 'true' ? 'DESC' : 'ASC'
      )
    } 

    if (withoutPagination === 'true') {
      return await query.getMany()
    }

    return await this.paginationService.paginate({
      query,
      currentPage: page ? parseInt(page, 10) : 1
    })
  }

  async show(id: string): Promise<<%= classify(name) %>> {
    const <%= camelize(name) %> = await this.repository
      .createQueryBuilder('<%= camelize(name) %>')
      .where('<%= camelize(name) %>.id = :id', {
        id
      })
      .getOne()

    if (!<%= camelize(name) %>) {
      throw new NotFoundException()
    }

    return <%= camelize(name) %>
  }

  async store(<%= camelize(name) %>Dto: CreateUpdate<%= classify(name) %>Dto): Promise<<%= classify(name) %>> {
    const <%= camelize(name) %>: <%= classify(name) %> = this.repository.create(<%= camelize(name) %>Dto)
    return await this.repository.save(<%= camelize(name) %>)
  }

  async update(
    id: string,
    <%= camelize(name) %>Dto: CreateUpdate<%= classify(name) %>Dto
  ): Promise<UpdateResult> {
    const <%= camelize(name) %>: <%= classify(name) %> = this.repository.create(<%= camelize(name) %>Dto)

    return await this.repository.update(id, <%= camelize(name) %>)
  }

  async destroy(id: string): Promise<DeleteResult> {
    const <%= camelize(name) %>: <%= classify(name) %> = await this.repository.findOne(id)
    if (!<%= camelize(name) %>) {
      throw new NotFoundException()
    }
    return await this.repository.delete(<%= camelize(name) %>.id)
  }
}
