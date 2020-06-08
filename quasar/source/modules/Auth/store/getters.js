import { get, is } from '@devitools/Util/general'
import { primaryKey } from 'src/settings/schema'
import actions from 'src/settings/actions'

/**
 * @param state
 * @returns {string}
 */
export const getToken = (state) => state.token

/**
 * @param state
 * @returns {string}
 */
export const getUser = (state) => state.user

/**
 * @param state
 * @returns {Object|undefined}
 */
export const getUserId = (state) => {
  return get(state.user, primaryKey)
}

/**
 * @param state
 * @returns {Object|undefined}
 */
export const isUserAdmin = (state) => {
  return get(state.user, 'profile') === 'admin'
}

/**
 * @param state
 * @returns {Object}
 */
export const getUserImageCredentials = (state) => {
  const imageCredentials = get(state.user, 'credentials.image')
  if (is(imageCredentials)) {
    return imageCredentials
  }
  return {}
}

/**
 * @param state
 * @returns {Object}
 */
export const getActions = (state) => {
  if (typeof actions === 'function') {
    return actions(state.user)
  }
  const userActions = get(state.user, 'actions')
  if (userActions) {
    return userActions
  }
  return {}
}

/**
 * @param state
 * @returns {Array}
 */
export const getPermissions = (state) => {
  return get(state.user, 'permissions', [])
}

/**
 * @param state
 * @returns {Object|undefined}
 */
export const getUserProfile = (state) => {
  return get(state.user, 'profile')
}
