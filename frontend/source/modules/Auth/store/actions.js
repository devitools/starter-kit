/**
 * @ref auth/login
 * @param {Store<unknown>} context
 * @param {string} token
 */
export const login = (context, token) => {
  context.commit('mutateToken', token)
}

/**
 * @ref auth/logout
 * @param {Store<unknown>} context
 */
export const logout = (context) => {
  context.commit('mutateToken', '')
  context.commit('mutateUser', undefined)
}

/**
 * @ref auth/updateUser
 * @param {Store<unknown>} context
 * @param {Record<string, unknown>} user
 */
export const updateUser = (context, user) => {
  context.commit('mutateUser', user)
}

/**
 * @ref auth/setUserName
 * @param {Store<unknown>} context
 * @param {string} name
 */
export const setNameUser = (context, name) => {
  context.commit('mutateNameUser', name)
}

/**
 * @ref auth/setUserName
 * @param {Store<unknown>} context
 * @param {string} name
 */
export const setUsernameUser = (context, name) => {
  context.commit('mutateUsernameUser', name)
}

/**
 * @ref auth/setUserName
 * @param {Store<unknown>} context
 * @param {string} name
 */
export const patchUser = (context, name) => {
  context.commit('mutatePatchUser', name)
}

/**
 * @ref auth/setRemember
 * @param {Store<unknown>} context
 * @param {string} name
 */
export const setRemember = (context, name) => {
  context.commit('mutateRemember', name)
}
