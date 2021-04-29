import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common'
import { UpdateResult, DeleteResult } from 'typeorm'
import { Permission, Paginator, AuthGuard, SelectOption } from '@case-app/nest-library'

import { <%= classify(name) %>Service } from './<%= dasherize(name) %>.service'
import { <%= classify(name) %> } from './<%= dasherize(name) %>.entity'
import { CreateUpdate<%= classify(name) %>Dto } from './dtos/create-update-<%= camelize(name) %>.dto'

@Controller('<%= camelize(name) %>s')
export class <%= classify(name) %>Controller {
  constructor(private readonly <%= camelize(name) %>Service: <%= classify(name) %>Service) {}

  @Get()
  @Permission('browse<%= classify(name) %>s')
  async index(
    @Query('page') page: string,
    @Query('orderBy') orderBy: string,
    @Query('orderByDesc') orderByDesc: string,
    @Query('withoutPagination') withoutPagination: string
  ): Promise<Paginator<<%= classify(name) %>> | <%= classify(name) %>[]> {
    return this.<%= camelize(name) %>Service.index({
      page,
      orderBy,
      orderByDesc,
      withoutPagination
    })
  }

  @Get('select-options')
  @UseGuards(AuthGuard)
  async listSelectOptions(
    @Query('orderBy') orderBy: string,
    @Query('orderByDesc') orderByDesc: string
  ): Promise<SelectOption[]> {
    const <%= camelize(name) %>s: <%= classify(name) %>[] = (await this.<%= camelize(name) %>Service.index({
      withoutPagination: 'true',
      orderBy,
      orderByDesc
    })) as <%= classify(name) %>[]

    return <%= camelize(name) %>s.map((d: <%= classify(name) %>) => ({
      label: `Label for <%= name %> with id ${d.id}`,
      value: d.id.toString()
    }))
  }

  @Get('/:id')
  @Permission('read<%= classify(name) %>s')
  async show(@Param('id') id: string): Promise<<%= classify(name) %>> {
    return this.<%= camelize(name) %>Service.show(id)
  }
  
  @Post()
  @Permission('add<%= classify(name) %>s')
  async store(
    @Body() <%= camelize(name) %>Dto: CreateUpdate<%= classify(name) %>Dto
  ): Promise<<%= classify(name) %>> {
    return await this.<%= camelize(name) %>Service.store(<%= camelize(name) %>Dto)
  }

  @Put('/:id')
  @Permission('edit<%= classify(name) %>s')
  async update(
    @Param('id') id: string,
    @Body() <%= camelize(name) %>Dto: CreateUpdate<%= classify(name) %>Dto
  ): Promise<UpdateResult> {
    return await this.<%= camelize(name) %>Service.update(id, <%= camelize(name) %>Dto)
  }

  @Delete('/:id')
  @Permission('delete<%= classify(name) %>s')
  async delete(@Param() id: string): Promise<DeleteResult> {
    return await this.<%= camelize(name) %>Service.destroy(id)
  }
}
