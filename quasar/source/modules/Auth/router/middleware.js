import { me } from 'source/domains/Auth/Service'
import { otherwise } from 'src/router'
import { dashboard } from 'routes/dashboard'
import { isAllowedRoute, isAllowedPath, isUserLoaded, isUserLogged } from 'src/settings/security'

/**
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
export const bootstrap = (to, from, next) => {
  if (isAllowedPath(to.path)) {
    next()
    return
  }
  if (isUserLoaded()) {
    next()
    return
  }
  me()
    .then(() => next())
    .catch(() => next(otherwise))
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
  next({ path: otherwise, query: { forbidden: to.path } })
}

/**
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
export function checkIsLogged (to, from, next) {
  if (isUserLogged()) {
    next(dashboard)
    return
  }
  next()
}
