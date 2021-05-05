import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder } from '@angular/forms'

import { AbcCreateEditComponent, ResourceDefinition, Field, Filter, BreadcrumbService, FlashMessageService, ResourceService, abcCreateEditTemplate } from '@case-app/angular-library'

import { <%= camelize(name) %>Definition } from '../<%= camelize(name) %>.definition'

@Component({ template: abcCreateEditTemplate })
export class <%= classify(name) %>CreateEditComponent extends AbcCreateEditComponent implements OnInit {
  definition: ResourceDefinition = <%= camelize(name) %>Definition
  fields: Field[] = []
  filters: Filter[] = []

  constructor(
    formBuilder: FormBuilder,
    router: Router,
    activatedRoute: ActivatedRoute,
    resourceService: ResourceService,
    breadcrumbService: BreadcrumbService,
    flashMessageService: FlashMessageService
  ) {
    super(
      formBuilder,
      router,
      breadcrumbService,
      resourceService,
      flashMessageService,
      activatedRoute
    )
  }

  ngOnInit() {
    this.initCreateEditView()
  }
}
