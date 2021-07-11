import { RULES } from 'src/settings/schema'
import $lang from '../Lang'

/**
 * @param {string|{icon?: string, domain?: string, children?: *[]}} settings
 * @param {string} icon
 * @param {[]} children
 * @returns {{children: *, namespace: *, icon: *, label: *}}
 */
export const permissionGroup = (settings, icon = '', children = []) => {
  let namespace = settings
  if (typeof settings === 'object') {
    namespace = settings?.domain
    icon = settings?.icon
    children = settings?.children
  }
  return {
    label: $lang(`permissions.${namespace}`, `permissions.${namespace}`),
    namespace,
    icon,
    children
  }
}

/**
 * @param {string} domain
 * @return {{icon: string, namespace: string, label: string}}
 */
export const permissionAvailable = (domain) => {
  return {
    label: $lang(`permissions.${domain}.${RULES.LEVEL_AVAILABLE}`, `permissions.${domain}.${RULES.LEVEL_AVAILABLE}`),
    namespace: `${domain}.${RULES.LEVEL_AVAILABLE}`,
    icon: 'done'
  }
}

/**
 * @param {string} namespace
 * @param {string} icon
 * @returns {{level: *, domain: *, namespace: string, icon: *, label: *}}
 */
export const permissionLevelNamespace = (namespace, icon) => {
  return {
    label: $lang(`permissions.${namespace}`, `permissions.${namespace}`),
    namespace,
    icon
  }
}

/**
 * @param {string} domain
 * @param {string} icon
 * @param {string} level
 * @returns {{level: string, domain: string, namespace: string, icon: string, label: string}}
 */
export const permissionLevel = (domain, icon, level) => {
  return {
    label: $lang(`permissions.${domain}.${level}`, `permissions.${domain}.${level}`),
    namespace: `${domain}.${level}`,
    domain,
    level,
    icon
  }
}

/**
 * @deprecated use permissionEntry
 *
 * @param {{domain: string, icon: string}} view
 * @returns {{namespace: string, icon: *, label: *}}
 */
export const permissionSingle = (view) => {
  return permissionEntry(view)
}

/**
 * @param {{domain: string, icon: string}} view
 * @returns {{namespace: string, icon: *, label: *}}
 */
export const permissionEntry = (view) => {
  return {
    label: $lang(`permissions.${view.domain}`, `permissions.${view.domain}`),
    namespace: `${view.domain}`,
    icon: view.icon
  }
}

/**
 * @param domain
 * @param just
 * @returns {{level: string, domain: string, namespace: string, icon: string, label: string}[]}
 */
export const permissionLevels = (domain, just = []) => {
  /**
   * @type {Object}
   */
  let rules = {
    [RULES.LEVEL_INDEX]: permissionLevel(domain, 'dvr', RULES.LEVEL_INDEX),
    [RULES.LEVEL_TRASH]: permissionLevel(domain, 'restore', RULES.LEVEL_TRASH),
    [RULES.LEVEL_ADD]: permissionLevel(domain, 'add', RULES.LEVEL_ADD),
    [RULES.LEVEL_VIEW]: permissionLevel(domain, 'visibility', RULES.LEVEL_VIEW),
    [RULES.LEVEL_EDIT]: permissionLevel(domain, 'edit', RULES.LEVEL_EDIT),
    [RULES.LEVEL_DESTROY]: permissionLevel(domain, 'delete', RULES.LEVEL_DESTROY)
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const level = require('src/settings/level')
    rules = level(domain)
  } catch (ex) {
    // silent is gold
  }

  const children = Object.values(rules)

  if (!just || !just.length) {
    return children
  }
  return children.filter((kid) => just.includes(kid.level))
}

/**
 * @param {string} domain
 * @param {string[]} allowed
 * @param {[]} levels
 * @return {{children: [{namespace: string, label: string}], icon: string, namespace: string, label: string}}
 */
export const permissionActions = (domain, allowed = [], levels = []) => {
  const actions = permissionLevels(domain, allowed)
  if (levels.length) {
    actions.push(...levels)
  }
  return {
    label: $lang('permissions.actions', 'permissions.actions'),
    icon: 'lock_open',
    namespace: `${domain}.actions`,
    children: actions
  }
}

/**
 * @param {{icon?: string, domain?: string, path?: string, table?: Function, form?: Function}} index
 * @param {string[]} allowedLevels
 * @param {[]} extraLevels
 * @param {[]} additional
 * @return {{children: [{icon: string, namespace: string, label: string}, {children: {namespace: string, label: string}[], icon: string, namespace: string, label: string}], namespace: *, icon: *, label: *}}
 */
export const permission = (index, allowedLevels = [], extraLevels = [], additional = []) => {
  const children = [
    permissionAvailable(index.domain),
    permissionActions(index.domain, allowedLevels, extraLevels)
  ]
  if (additional.length) {
    children.push(...additional)
  }

  return {
    namespace: index.domain,
    label: $lang(`permissions.${index.domain}`, `permissions.${index.domain}`),
    icon: index.icon,
    meta: index.meta,
    children
  }
}
