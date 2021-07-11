import { get, is } from '@devitools/Util/general'
import { primaryKey } from 'src/settings/schema'
import menu from 'src/settings/menu'
import { REFERENCES } from 'src/settings/security'

/**
 * @param {Record<string, unknown>} state
 * @returns {string}
 */
export const getToken = (state) => state.token

/**
 * @param {Record<string, unknown>} state
 * @returns {Record<string, unknown>}
 */
export const getUser = (state) => state.user

/**
 * @param {Record<string, unknown>} state
 * @returns {boolean}
 */
export const getRemember = (state) => state.remember

/**
 * @param {Record<string, unknown>} state
 * @returns {string|number|undefined}
 */
export const getUserId = (state) => {
  return get(state.user, primaryKey)
}

/**
 * @param {Record<string, unknown>} state
 * @returns {boolean}
 */
export const isUserAdmin = (state) => {
  return !!get(state.user, 'admin')
}

/**
 * @param {Record<string, unknown>} state
 * @returns {Record<string, unknown>}
 */
export const getUserImageCredentials = (state) => {
  const imageCredentials = get(state.user, 'credentials.image')
  if (is(imageCredentials)) {
    return imageCredentials
  }
  return {}
}

/**
 * @param {Record<string, unknown>} state
 * @returns {Record<string, unknown>[]}
 */
export const getMenu = (state) => {
  if (typeof menu === 'function') {
    return menu(state.user)
  }
  const actions = get(state.user, 'actions', [])
  if (Array.isArray(actions)) {
    return actions
  }
  return []
}

/**
 * @param {Record<string, unknown>} state
 * @returns {string[]}
 */
export const getPermissions = (state) => {
  return get(state.user, 'permissions', [])
}
