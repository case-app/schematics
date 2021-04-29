import { strings } from '@angular-devkit/core'
import {
  apply,
  move,
  Rule,
  SchematicContext,
  Tree,
  template,
  mergeWith,
  url,
  Source,
  chain,
} from '@angular-devkit/schematics'

import {
  camelize,
  classify,
  dasherize,
} from '@angular-devkit/core/src/utils/strings'

export function createResource(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const sourceTemplates: Source = url('./files')
    const resourceFolderPath = './src/resources'
    const appModulePath = './src/app.module.ts'

    // Add "files" to resource folder.
    const sourceParametrizedTemplates: Source = apply(sourceTemplates, [
      template({
        ...options,
        ...strings,
      }),
      move(resourceFolderPath),
    ])

    // Import new module in appModule.
    let appModuleBuffer: Buffer = tree.read(appModulePath) as Buffer
    let appModuleString: string = appModuleBuffer.toString()

    // Insert import declaration at beginning.
    appModuleString =
      `import { ${classify(options.name)}Module } from './resources/${dasherize(
        options.name
      )}/${dasherize(options.name)}.module'\n` + appModuleString

    // Push resource routes to array.
    const importPosition: number = appModuleString.indexOf(
      'AbacusNestLibraryModule.forRoot'
    )

    appModuleString =
      appModuleString.substring(0, importPosition) +
      `${classify(options.name)}Module,\n` +
      appModuleString.substring(importPosition)

    tree.overwrite(appModulePath, appModuleString)

    // * Add seeder.
    const seedTemplates: Source = url('./seeder-files')
    const seederFolderPath = './database/seeders'
    const mainSeederPath = './database/seeders/seeder.ts'
    const permissionContentPath =
      './database/seeders/content/permissions.content.ts'

    // Add "seeder-files" to seeder folder.
    const seedParametrizedTemplates: Source = apply(seedTemplates, [
      template({
        ...options,
        ...strings,
      }),
      move(seederFolderPath),
    ])

    // Call resource seeder from main seeder.
    let mainSeederBuffer: Buffer = tree.read(mainSeederPath) as Buffer
    let mainSeederString: string = mainSeederBuffer.toString()
    const tableNamesPosition: number = mainSeederString.indexOf(
      '// * Table names (keep comment for schematics).'
    )

    mainSeederString =
      mainSeederString.substring(0, tableNamesPosition + 47) +
      `\n  '${camelize(options.name)}s',\n` +
      mainSeederString.substring(tableNamesPosition + 47)

    const closeConnectionPosition: number = mainSeederString.indexOf(
      'await connection.close()'
    )

    mainSeederString =
      `import { ${classify(options.name)}Seeder } from './${dasherize(
        options.name
      )}.seeder'\n` +
      mainSeederString.substring(0, closeConnectionPosition) +
      `await (new ${classify(options.name)}Seeder(connection, 50)).seed()\n  ` +
      mainSeederString.substring(closeConnectionPosition)

    tree.overwrite(mainSeederPath, mainSeederString)

    // Add resource permission to permissionContent.
    let permissionContentBuffer: Buffer = tree.read(
      permissionContentPath
    ) as Buffer
    let permissionContentString: string = permissionContentBuffer.toString()

    const resourceListPosition: number = permissionContentString.indexOf(
      '// * Resources (keep comment for schematics).'
    )

    permissionContentString =
      permissionContentString.substring(0, resourceListPosition + 45) +
      `\n  '${camelize(options.name)}s',\n` +
      permissionContentString.substring(resourceListPosition + 45)

    tree.overwrite(permissionContentPath, permissionContentString)

    return chain([
      mergeWith(seedParametrizedTemplates),
      mergeWith(sourceParametrizedTemplates),
    ])
  }
}
