import { forbidden } from 'src/router'
import { isAllowedPath, isAllowedRoute, isUserLoaded, isUserLogged } from 'src/settings/security'
import { dashboard } from 'routes/dashboard'
import { me } from 'source/domains/Auth/Service'

/**
 * @param {Route} to
 * @param {Route} from
 * @return {{path: string, query: {current: *}}}
 */
export const fallback = (to, from) => {
  return {
    path: forbidden,
    query: { toForbidden: to.path, fromForbidden: from.path }
  }
}

/**
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
export function checkIsAlreadyConnected (to, from, next) {
  // if user is already logged...
  if (isUserLogged()) {
    // ...redirect to dashboard
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
  if (to.meta.public) {
    // ...go forward
    next()
    return
  }

  // if user is not logged...
  if (!isUserLogged()) {
    // ...redirect to fallback page
    next(fallback(to, from))
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
    .catch(() => next(fallback(to, from)))
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
  next(fallback(to, from))
}
