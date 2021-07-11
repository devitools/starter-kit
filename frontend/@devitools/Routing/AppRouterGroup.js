// noinspection NpmUsedModulesInstalled
import { group, provide, redirect, route } from '../Util/routing'

/**
 * @class {AppRouterGroup}
 */
export default class AppRouterGroup {
  /**
   * @type {RouteConfig[]}
   */
  grouping = []

  /**
   * @type {function[]}
   */
  before = []

  /**
   * @return {AppRouterGroup}
   */
  static build () {
    return new this()
  }

  /**
   * @param {string|Record<string|unknown>} source
   * @param {function} [component]
   * @param {Object} [options]
   * @returns {AppRouterGroup}
   */
  route (source, component = null, options = {}) {
    const { name } = options
    this.routes([route(source, component, name, options)])
    return this
  }

  /**
   * @param {string} source
   * @param {string} target
   * @returns {AppRouterGroup}
   */
  redirect (source, target) {
    return this.routes([redirect(source, target)])
  }

  /**
   * @deprecated use provide instead resource
   *
   * @param {string|Object} settings
   * @param {Object[]} children
   * @returns {AppRouterGroup}
   */
  resource (settings, children = []) {
    return this.provide(settings, children)
  }

  /**
   * @param {string|Object} settings
   * @param {Object[]} children
   * @returns {AppRouterGroup}
   */
  provide (settings, children = []) {
    return this.routes([provide(settings, children)])
  }

  /**
   * @param {string} path
   * @param {function} component
   * @param {function(AppRouterGroup, string):void} handler called when done
   * @param {Object} meta
   * @returns {AppRouterGroup}
   */
  group (path, component, handler, meta = {}) {
    const local = this.constructor.build()

    handler(local, path)
    const children = local.getRoutes()
    const namespace = path.replace(/\//g, '.')

    return this.routes([
      group(path, component, children, { namespace, ...meta })
    ])
  }

  /**
   * @param {RouteConfig[]} routes
   * @returns {AppRouterGroup}
   */
  routes (routes) {
    this.grouping.push(...routes)
    return this
  }

  /**
   * @returns {RouteConfig[]}
   */
  getRoutes () {
    return this.grouping
  }

  /**
   * @param {string} path
   * @param {function} callable
   */
  beforeThis (path, callable) {
    if (typeof callable !== 'function') {
      throw new Error('AppRouter.match: callable must be a function')
    }
    const middleware = (to, from, next) => {
      if (to.path === path) {
        callable(to, from, next)
        return
      }
      next()
    }
    this.before.push(middleware)
  }

  /**
   * @return {function[]}
   */
  getBefore () {
    return this.before
  }
}
