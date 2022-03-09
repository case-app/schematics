import { Component, OnInit, Inject } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import {
  AuthService,
  caseListTemplate,
  CaseListComponent,
  Filter,
  ResourceDefinition,
  BreadcrumbService,
  FlashMessageService,
  ResourceService,
  CaseConfig,
  Yield
} from '@case-app/angular-library'

import { <%= camelize(name) %>Definition } from '../<%= camelize(name) %>.definition'
import { <%= camelize(name) %>Yields } from '../<%= camelize(name) %>.yields'

@Component({ template: caseListTemplate })
export class <%= classify(name) %>ListComponent extends CaseListComponent implements OnInit {
  definition: ResourceDefinition = <%= camelize(name) %>Definition
  yields: Yield[] = <%= camelize(name) %>Yields

  filters: Filter[] = []

  constructor(
    router: Router,
    activatedRoute: ActivatedRoute,
    resourceService: ResourceService,
    breadcrumbService: BreadcrumbService,
    flashMessageService: FlashMessageService,
    authService: AuthService,
    @Inject('CASE_CONFIG_TOKEN') config: CaseConfig
  ) {
    super(
      router,
      activatedRoute,
      breadcrumbService,
      resourceService,
      flashMessageService,
      authService,
      config
    )
  }

  ngOnInit() {
    this.initListView()
  }
}
