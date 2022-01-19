import { Gender, LinkType, ResourceDefinition } from '@case-app/angular-library'

export const <%= camelize(name) %>Definition: ResourceDefinition = {
  title: '<%= classify(displayName) %>s',
  nameSingular: '<%= displayName %>',
  namePlural: '<%= displayName %>s',
  className: '<%= classify(name) %>',
  mainIdentifier: 'id',
  slug: '<%= dasherize(name) %>s',
  path: '<%= dasherize(displayName) %>s',
  icon: 'icon-grid',
  gender: Gender.<%= gender %>,
  hasDetailPage: false,
  hasListPage: true,
  buttons: [LinkType.CREATE],
  defaultLink: LinkType.EDIT,
  childrenThatPreventDelete: [],
  dropdownLinks: [
    {
      type: LinkType.EDIT,
      permission: 'edit<%= classify(name) %>s',
    },
    {
      type: LinkType.DELETE,
      permission: 'delete<%= classify(name) %>s',
    },
  ]
}
