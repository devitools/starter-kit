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
export function checkIsAlreadyConnected (to, from, next) {
  // if user is already not logged...
  if (isUserLogged()) {
    // ...got to dashboard
    next(dashboard)
    return
  }
  // go forward
  next()
}

/**
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
export const checkSession = (to, from, next) => {
  // if it is a public path...
  if (isAllowedPath(to.path)) {
    // ...go forward
    next()
    return
  }

  // if user is not logged...
  if (!isUserLogged()) {
    // ...redirect to fallback page
    next(fallback(to))
    return
  }

  // if user is already loaded...
  if (isUserLoaded()) {
    // ...go forward
    next()
    return
  }

  // we need the user info
  me()
    // if we get, go forward
    .then(() => next())
    // else redirect to fallback path
    .catch(() => next(fallback(to)))
}

/**
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
export function checkPermission (to, from, next) {
  // if it is an allowed path...
  if (isAllowedPath(to.path, [dashboard])) {
    // ...go forward
    next()
    return
  }

  // if it is an allowed route...
  if (isAllowedRoute(to)) {
    // ...go forward
    next()
    return
  }

  // the route to is not allowed, redirect to fallback
  next(fallback(to))
}
