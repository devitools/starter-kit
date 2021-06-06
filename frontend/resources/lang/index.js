import { RULES } from 'src/settings/schema'

/**
 * @param {function()} context
 * @return {{}}
 */
export function menu (context) {
  const messages = {}
  const results = context()
  results
    .keys()
    .forEach((key) => {
      const matched = key.match(/\.\/(.*)\.js/i)
      if (matched && matched.length > 1) {
        const property = matched[1]
        const message = results(key)
        messages[property] = message.default
      }
    })
  return messages
}

/**
 * @type {Record<string, string>}
 */
const labels = {
  [RULES.LEVEL_AVAILABLE]: 'Acessar Menu',
  [RULES.LEVEL_INDEX]: 'Listar',
  [RULES.LEVEL_ADD]: 'Adicionar',
  [RULES.LEVEL_VIEW]: 'Visualizar',
  [RULES.LEVEL_EDIT]: 'Editar',
  [RULES.LEVEL_DESTROY]: 'Excluir',
  [RULES.LEVEL_TRASH]: 'Lixeira'
}

/**
 * @param {string} namespace
 * @param {string} label
 * @param {Record<string, string>} override
 * @return {Record<string,string>}
 */
const permission = (namespace, label, override = {}) => {
  const permission = { [namespace]: label }
  const levels = { ...labels, ...override }
  Object.entries(levels).forEach(([level, label]) => {
    const key = `${namespace}.${level}`
    permission[key] = label
  })
  return permission
}

/**
 * @param {function()} context
 * @return {{}}
 */
export function permissions (context) {
  let messages = {}
  const results = context()
  results
    .keys()
    .forEach((key) => {
      const matched = key.match(/\.\/(.*)\.js/i)
      if (matched && matched.length > 1) {
        const property = matched[1]
        const message = results(key)

        if (message.group) {
          messages[property] = message.group
          return
        }

        if (message.entry) {
          messages[property] = message.entry
          return
        }

        const levels = permission(property, message.default, message.override ?? {})
        if (typeof message.levels === 'object') {
          Object.entries(message.levels).forEach(([level, label]) => {
            const key = `${property}.${level}`
            levels[key] = label
          })
        }
        messages = { ...messages, ...levels }
      }
    })
  return messages
}

/**
 * @param {function()} context
 * @return {{}}
 */
export function domains (context) {
  const messages = {}
  const results = context()
  results
    .keys()
    .forEach((key) => {
      const property = key
        .replace(/lang\/pt-br\.js$/i, '')
        .replace(/^\.\//g, '')
        .replace(/\/$/g, '')
        .split('/')
        .map((piece) => {
          return piece.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            .map(x => x.toLowerCase())
            .join('-')
        })
        .join('/')
      const message = results(key)
      messages[property] = message.default
    })
  return messages
}
