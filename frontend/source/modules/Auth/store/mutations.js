import { erase, write } from '@devitools/Util/storage'

/**
 * @param {Record<string, unknown>} state
 * @param {string} token
 */
export const mutateToken = (state, token) => {
  state.token = token
  if (token) {
    write('token', state.token, state.remember)
    return
  }
  erase('token')
}

/**
 * @param {Record<string, unknown>} state
 * @param {Record<string, unknown>} user
 */
export const mutateUser = (state, user) => {
  state.user = user
}

/**
 * @param {Record<string, unknown>} state
 * @param {string} name
 */
export const mutateNameUser = (state, name) => {
  state.user.name = name
  mutateUser(state, state.user)
}

/**
 * @param {Record<string, unknown>} state
 * @param {string} username
 */
export const mutateUsernameUser = (state, username) => {
  state.user.username = username
  mutateUser(state, state.user)
}

/**
 * @param {Record<string, unknown>} state
 * @param {string} user
 */
export const mutatePatchUser = (state, user) => {
  mutateUser(state, { ...state.user, ...user })
}

/**
 * @param {Record<string, unknown>} state
 * @param {boolean} remember
 */
export const mutateRemember = (state, remember) => {
  state.remember = remember
  write('remember', state.remember, true)
}
