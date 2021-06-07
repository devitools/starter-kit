const Path = require('path')

/**
 * @typedef {{
 *   welcome()
 *   bye()
 *   reverse(input: string): string
 *   prepend(input: string, value: string): string
 *   capitalize(input: string): string
 *   unCapitalize(input: string): string
 *   toCamelCase(input: string, first?: boolean): string
 *   toDashCase(input: string): string
 *   pluralize(input: string): string
 *   exists(filename: string): Promise<boolean>
 *   replaceTemplate (string: string, replaces: Record<string, unknown> | string[]): string
 *   replaceExtension (file: string): string
 *   replacePath (template: string, replaces: Record<string, unknown> | string[], regex?: Function): string
 *   writeFile(path: string, contents: any): boolean
 *   prompt(message: string, options: string | Record<string, unknown> = {}): Promise<string>
 *   choose(name: string, message: string, choices: *[], type: string): Promise<any>
 *   notify(message: string): void
 * }} Command
 *
 * @typedef {{
 *    front: {
 *      type: string,
 *      root: string,
 *      domains: string,
 *      views: string,
 *      i18n: string
 *    },
 *    back: {
 *      type: string,
 *      root: string,
 *      domains: string,
 *      controllers: string,
 *      migrations: string
 *    }
 * }} Template
 */

const templateSettings = {
  front: {
    type: ['quasar'], // ['quasar', 'vuetify', 'material-ui']
    root: 'front',
    domains: 'domains',
    views: 'views',
    routes: 'routes',
    settings: 'settings',
    i18n: 'lang'
  },
  back: {
    type: ['laravel'], // ['laravel', 'symfony']
    root: 'back',
    domains: 'domains',
    controllers: 'controllers',
    migrations: 'migrations',
    routes: 'routes'
  }
}

/**
 * @param {Command} command
 * @param {Template} target
 * @param {string[]} domain
 * @param {string} namespace
 * @param {Record<string, unknown>} parameters
 * @param {Record<string, unknown>} replaces
 */
async function handleAntecessorFront (command, target, domain, parameters, replaces, namespace) {
  const targetFront = Path.join(process.cwd(), target.front.root)
  const routes = Path.join(targetFront, target.front.routes, namespace + '.js')
  const exists = await command.exists(routes)
  if (exists) {
    return
  }

  const response = await command.choose(
    'antecessor',
    `The namespace '${namespace}' doesn't exists on "frontend". Do you want to create it as a "group" or as an "entity"?`,
    [
      { name: 'group' },
      { name: 'entity' }
      // {name: 'ignore'}
    ]
  )

  if (response.antecessor === 'group') {
    return handleGroupFront(command, target, namespace, parameters, replaces)
  }
  if (response.antecessor === 'entity') {
    return handleEntityFront(command, target, domain, namespace, parameters, replaces)
  }
}

/**
 * @param {Command} command
 * @param {Template} target
 * @param {string} namespace
 * @param {Record<string, unknown>} parameters
 * @param {Record<string, unknown>} replaces
 */
async function handleGroupFront (command, target, namespace, parameters, replaces) {
  command.positive(`##  (Frontend) Creating group '${namespace}'`)

  replaces['domain.icon'] = await command.prompt('  Icon', 'folder')
  replaces['domain.label'] = await command.prompt('  Label (ex.: Settings)', { required: true })

  const frontType = target.front.type
  const templateFront = Path.join(__dirname, templateSettings.front.root, frontType, '@group')
  const targetFront = Path.join(process.cwd(), target.front.root)

  const generator = (namespace, filter = []) => {
    return command.generate(
      Path.join(templateFront, templateSettings.front[namespace]),
      Path.join(targetFront, target.front[namespace]),
      replaces,
      filter
    )
  }
  await generator('domains')
  await generator('views')
  await generator('settings')
  await generator('routes')
  await generator('i18n')

  return command.positive(`## (Frontend) Group '${namespace}' created\n`)
}

/**
 * @param {Command} command
 * @param {Template} target
 * @param {string[]} domain
 * @param {string} entity
 * @param {Record<string, unknown>} parameters
 * @param {Record<string, unknown>} replaces
 */
async function handleEntityFront (command, target, domain, entity, parameters, replaces) {
  // resolve antecessor
  // for (const antecessor of domain) {
  //   await handleAntecessorFront(command, target, domain, parameters, replaces, antecessor)
  // }

  command.positive(`##  (Frontend) Creating entity '${entity}'`)

  const frontType = target.front.type
  const templateFront = Path.join(__dirname, templateSettings.front.root, frontType, '@entity')
  const targetFront = Path.join(process.cwd(), target.front.root)

  replaces['entity.icon'] = await command.prompt('  Icon', 'folder')
  replaces['entity.plural'] = await command.prompt('  Plural label (ex.: People)', { required: true })
  replaces['entity.singular'] = await command.prompt('  Singular label (ex.: Person)', { required: true })

  const filter = (parameters.builtin || parameters.array) ? [new RegExp('({{entity}}Schema|settings).*')] : []

  const generator = (namespace, filter = []) => {
    return command.generate(
      Path.join(templateFront, templateSettings.front[namespace]),
      Path.join(targetFront, target.front[namespace]),
      replaces,
      filter
    )
  }
  await generator('domains', filter)
  await generator('views')
  await generator('i18n')

  return command.positive(`## (Frontend) Entity '${entity}' created\n`)
}

/**
 * @param {Command} command
 * @param {Template} target
 * @param {string[]} domain
 * @param {string} namespace
 * @param {Record<string, unknown>} parameters
 * @param {Record<string, unknown>} replaces
 * @return {boolean}
 */
async function handleAntecessorBack (command, target, domain, parameters, replaces, namespace) {
  const targetFront = Path.join(process.cwd(), target.back.root)
  const routes = Path.join(targetFront, target.back.routes, namespace + '.php')
  const exists = await command.exists(routes)
  if (exists) {
    return
  }

  const response = await command.choose(
    'antecessor',
    `The namespace '${namespace}' doesn't exists on "backend". Do you want to create it as a "group" or as an "entity"?`,
    [
      { name: 'group' },
      { name: 'entity' }
      // {name: 'ignore'}
    ]
  )

  if (response.antecessor === 'group') {
    return handleGroupBack(command, target, namespace, parameters, replaces)
  }
  if (response.antecessor === 'entity') {
    return handleEntityBack(command, target, domain, namespace, parameters, replaces)
  }
}

/**
 * @param {Command} command
 * @param {Template} target
 * @param {string} namespace
 * @param {Record<string, unknown>} parameters
 * @param {Record<string, unknown>} replaces
 */
async function handleGroupBack (command, target, namespace, parameters, replaces) {
  command.positive(`##  (Backend) Creating group '${namespace}'`)

  const backType = target.back.type
  const templateBack = Path.join(__dirname, templateSettings.back.root, backType, '@group')
  const targetBack = Path.join(process.cwd(), target.back.root)

  const generator = (namespace, filter = []) => {
    return command.generate(
      Path.join(templateBack, templateSettings.back[namespace]),
      Path.join(targetBack, target.back[namespace]),
      replaces,
      filter
    )
  }
  await generator('routes')

  return command.positive(`## (Backend) Group '${namespace}' created\n`)
}

/**
 * @param {Command} command
 * @param {Template} target
 * @param {string[]} domain
 * @param {string} entity
 * @param {Record<string, unknown>} parameters
 * @param {Record<string, unknown>} replaces
 */
async function handleEntityBack (command, target, domain, entity, parameters, replaces) {
  // resolve antecessor
  // for (const antecessor of domain) {
  //   await handleAntecessorBack(command, target, domain, parameters, replaces, antecessor)
  // }

  command.positive(`##  (Backend) Creating entity '${entity}'`)

  const backType = target.back.type
  const templateBack = Path.join(__dirname, templateSettings.back.root, backType, '@entity')
  const targetBack = Path.join(process.cwd(), target.back.root)

  const collection = await command.prompt('  Table or collection:', command.pluralize(entity.replace(/[^a-zA-Z0-9]/g, '_')))
  const pad = input => input < 10 ? '0' + input : input
  const date = new Date()
  const timestamp = date.getFullYear().toString() + '_' +
    pad(date.getMonth() + 1) + '_' +
    pad(date.getDate()) + '_' +
    pad(date.getHours()) +
    pad(date.getMinutes()) +
    pad(date.getSeconds())

  const hyphenCase = collection.replace(/_/g, '-')
  replaces['entity.collection'] = collection
  replaces['migration.file'] = `${timestamp}_${collection}-create`
  replaces['migration.class'] = `${command.toCamelCase(hyphenCase, true)}Create`

  const generator = (namespace, filter = []) => {
    return command.generate(
      Path.join(templateBack, templateSettings.back[namespace]),
      Path.join(targetBack, target.back[namespace]),
      replaces,
      filter
    )
  }
  await generator('domains')
  await generator('controllers')
  await generator('migrations')

  return command.positive(`## (Backend) Group '${entity}' created\n`)
}

/**
 * @param {Command} command
 * @param {Template} target
 * @param {string} entity
 * @param {string[]} domain
 * @param {Record<string, unknown>} parameters
 * @param {boolean} group
 */
module.exports = async function (command, target, entity, domain, parameters, group) {
  const lower = domain.map(entry => entry.toLowerCase())

  const replaces = {
    namespace: domain.map(entry => command.toCamelCase(entry, true)).join('\\'),
    domain: domain.map(entry => command.toCamelCase(entry, true)).join('/'),
    'domain.lower': lower.join('/'),
    'domain.icon': '',
    'domain.label': '',
    entity: command.toCamelCase(entity, true),
    'entity.lower': entity.toLowerCase(),
    'entity.icon': '',
    'entity.collection': '',
    'migration.file': '',
    'migration.class': '',
    ...parameters
  }

  if (group) {
    if (target.front.type) {
      command.positive('##  (Frontend)')
      await handleGroupFront(command, target, entity, parameters, replaces)
    }
    if (target.back.type) {
      command.positive('##  (Backend)')
      await handleGroupBack(command, target, entity, parameters, replaces)
    }
    return
  }

  if (target.front.type) {
    command.positive('##  (Frontend)')
    await handleEntityFront(command, target, domain, entity, parameters, replaces)
  }
  if (target.back.type) {
    command.positive('##  (Backend)')
    await handleEntityBack(command, target, domain, entity, parameters, replaces)
  }
}
