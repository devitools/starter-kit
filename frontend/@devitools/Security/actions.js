import { RULES } from 'src/settings/schema'
import $lang from '../Lang'

/**
 * @deprecated
 *
 * @param {string} domain
 * @param {string} path
 * @param {string} icon
 * @param {boolean} separated
 * @returns {{path: *, label: *, icon: *, separated: *}}
 */
export const actionMenu = (domain, path, icon, separated = false) => {
  return actionEntry(domain, path, icon, separated)
}

/**
 * @param {string|{icon?: string, domain?: string, children?: *[]}} settings
 * @param {string} icon
 * @param {[]} children
 * @param {boolean} separated
 * @returns {{children: *, label: *, icon: *, separated: boolean}}
 */
export const actionGroup = (settings, icon = '', children = [], separated = false) => {
  let domain = settings
  if (typeof settings === 'object') {
    domain = settings?.domain
    icon = settings?.icon
    children = settings?.children
    separated = settings?.separated
  }
  return {
    label: $lang(`menu.${domain}`, `menu.${domain}`),
    icon,
    separated,
    children
  }
}

/**
 * @param {string|Object} domain
 * @param {string} to
 * @param {string} icon
 * @param {string} namespace
 * @param {Record<string, unknown>} [options]
 * @returns {{path: *, label: string, namespace: string, separated: boolean}}
 */
export const actionEntry = (domain, to, icon, namespace = undefined, options = {}) => {
  const { separated = false, i18n = '', meta = {} } = options
  const label = i18n ? `menu.${i18n}` : `menu.${domain}`
  return {
    label: $lang(label, label),
    namespace: namespace || `${domain}.${RULES.LEVEL_AVAILABLE}`,
    path: to,
    icon: icon,
    separated: separated,
    filters: options?.filters ?? [],
    meta: meta
  }
}

/**
 * @param {{icon?: string, domain?: string, path?: string, table?: Function, form?: Function}} index
 * @param {boolean} separated
 * @returns {{path: *, label: string, namespace: string, separated: boolean}}
 */
export const action = (index, separated = false) => {
  let to = index.path
  const { query, i18n, meta, filters } = index
  if (query) {
    to = { path: to, query }
  }
  const options = { separated, i18n, meta, filters }
  return actionEntry(index.domain, to, index.icon, index.namespace, options)
}
