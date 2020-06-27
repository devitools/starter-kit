import { me } from 'source/domains/Auth/Service'
import { otherwise } from 'src/router'
import { dashboard } from 'routes/dashboard'
import { isAllowedPath, isAllowedRoute, isUserLoaded, isUserLogged } from 'src/settings/security'

/**
 * @param {Route} to
 * @return {{path: string, query: {current: *}}}
 */
const fallback = (to) => ({
  path: otherwise,
  query: { current: to.path }
})

/**
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
export const checkSession = (to, from, next) => {
  // public URL
  if (isAllowedPath(to.path)) {
    next()
    return
  }

  // user is not logged
  if (!isUserLogged()) {
    next(fallback(to))
    return
  }

  // user is already loaded
  if (isUserLoaded()) {
    next()
    return
  }

  // we need the user info
  me()
    .then(() => next())
    .catch(() => next(fallback(to)))
}

/**
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
export function checkPermission (to, from, next) {
  if (isAllowedPath(to.path, [dashboard])) {
    next()
    return
  }

  if (isAllowedRoute(to)) {
    next()
    return
  }

  next(fallback(to))
}

/**
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
export function checkIsAlreadyConnected (to, from, next) {
  if (isUserLogged()) {
    next(dashboard)
    return
  }
  next()
}
