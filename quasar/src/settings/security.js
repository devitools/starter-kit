import { $store } from 'src/store'

/**
 * @type {string[]}
 */
export const whitelistPaths = [
  '/'
]

/**
 * @type {string[]}
 */
export const whitelistNamespaces = [
  'settings.account',
  'settings.balance'
]

/**
 * @type {string[]}
 */
export const whitelistActions = [
  'back',
  'print',
  'home'
]

/**
 * @param {Object} action
 * @param {string} domain
 * @param {Array|null} whitelist
 * @return {boolean}
 */
export function isAllowedAction (action, domain, whitelist = []) {
  const id = action.$key
  if (whitelistActions.includes(id) || whitelist.includes(id)) {
    return true
  }

  const permissions = $store.getters['auth/getPermissions']
  for (const level of action.levels) {
    if (permissions.includes(`${domain}.${level}`)) {
      return true
    }
  }
  return false
}

/**
 * @param {string} path
 * @param {Array} whitelist
 * @returns {boolean}
 */
export function isAllowedPath (path, whitelist = []) {
  const white = [
    ...whitelistPaths,
    ...whitelist
  ]
  return white.includes(path)
}

/**
 * @param {Route} to
 * @returns {boolean}
 */
export function isAllowedRoute (to) {
  const namespace = to.meta.namespace || `${to.meta.domain}.${to.meta.level}`

  if (whitelistNamespaces.includes(namespace)) {
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
