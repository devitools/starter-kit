import { $store } from 'src/store'

/**
 * @type {Readonly<{SP_001: string, SP_002: string, SP_003: string, SP_004: string, SP_005: string}>}
 */
export const SPECIAL_PERMISSIONS = Object.freeze({
  SP_001: 'special:registration/athlete-license.technical/club',
  SP_002: 'special:registration/athlete-license.technical/federation',
  SP_003: 'special:registration/athlete-license.technical/committee',
  SP_004: 'special:registration/athlete-license.financial/federation',
  SP_005: 'special:registration/athlete-license.financial/confederation'
})

/**
 * @type {string[]}
 */
export const unblockedPaths = [
  '/dashboard/settings/account'
]

/**
 * @type {string[]}
 */
export const unblockedDomains = [
  'settings/account'
]

/**
 * @type {string[]}
 */
export const unblockedNamespaces = [
  'home',
  'settings/account',
  'settings.balance'
]

/**
 * @type {string[]}
 */
export const unblockedActions = [
  'back',
  'print',
  'home'
]

/**
 * @param {Object} action
 * @param {string} domain
 * @param {Array|null} unblocked
 * @return {boolean}
 */
export function isAllowedAction (action, domain, unblocked = []) {
  const id = action.$key
  if (unblockedActions.includes(id) || unblocked.includes(id) || unblockedDomains.includes(domain)) {
    return true
  }

  const permissions = $store.getters['auth/getPermissions']
  if (permissions.includes(action.namespace)) {
    return true
  }
  for (const level of action.levels) {
    if (permissions.includes(`${domain}.${level}`)) {
      return true
    }
  }
  return false
}

/**
 * @param {string} path
 * @param {Array} unblocked
 * @returns {boolean}
 */
export function isAllowedPath (path, unblocked = []) {
  const white = [
    ...unblockedPaths,
    ...unblocked
  ]
  return white.includes(path)
}

/**
 * @param {RouteConfig} to
 * @returns {boolean}
 */
export function isAllowedRoute (to) {
  if (to.meta.public) {
    return true
  }

  const domain = to.meta.domain
  if (unblockedDomains.includes(domain)) {
    return true
  }

  const namespace = to.meta.namespace || `${to.meta.domain}.${to.meta.level}`

  if (unblockedNamespaces.includes(namespace)) {
    return true
  }

  const permissions = $store.getters['auth/getPermissions']
  const allowed = permissions.includes(namespace)
  if (!allowed) {
    console.warn(to)
  }
  return allowed
}

/**
 * @typedef {
 *    (
 *      {path: *, label: string, namespace: string, separated: boolean}|
 *      {children: *, label: *, icon: *, separated: boolean}
 *    )
 * } MenuEntry
 */

/**
 * Defines which menu entries are to be available to the user
 *
 * @param {MenuEntry[]} menuEntries
 * @return {MenuEntry[]}
 */
export function getAllowedMenuEntries (menuEntries) {
  const permissions = $store.getters['auth/getPermissions']

  const toAllowedMenuEntries = (accumulator, menuEntry) => {
    if (menuEntry.children) {
      menuEntry.children = menuEntry.children.reduce(toAllowedMenuEntries, [])
    }

    const isInvalidEntry = !menuEntry.path && !menuEntry?.children?.length
    if (isInvalidEntry) {
      return accumulator
    }

    const isGroup = (!menuEntry.namespace && menuEntry.children)
    const isAvailable = permissions.includes(menuEntry.namespace)
    const isUnblocked = unblockedNamespaces.includes(menuEntry.namespace)
    if (isGroup || isAvailable || isUnblocked) {
      accumulator.push(menuEntry)
    }

    return accumulator
  }

  return menuEntries.reduce(toAllowedMenuEntries, [])
}

/**
 * @return {boolean}
 */
export function isUserLogged () {
  return !!$store.getters['auth/getToken']
}

/**
 * @return {boolean}
 */
export function isUserLoaded () {
  return !!$store.getters['auth/getUser']
}
