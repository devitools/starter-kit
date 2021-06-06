import $lang from '@devitools/Lang'
import { $store } from 'src/store'

/*
 * middleware:
 * - beforeEach(to: Route, from: Route, next: Function)
 * - afterEach(to: Route, from: Route)
 */

/** @var {string} */
const fallback = process.env.VUE_APP_DEFAULT_TITLE

/**
 * Perform the change of document title with title related to page
 * It will use i18n and route path to get the title
 * > It works better in afterEach
 * @param {Object} to
 */
export default (to) => {
  // get the last match
  const route = to.matched[to.matched.length - 1]

  const page = String(route.path)

  const namespace = to.meta.namespace || 'common'
  const domain = to.meta.domain || 'common'
  const scope = to.meta.scope || 'index'
  const scenario = route.meta.scenario || 'undefined'

  const paths = [
    `pages.${page}.title`,
    `domains.${namespace}.title`,
    `domains.${domain}.routes.${scope}.title`,
    `domains.${domain}.routes.${scenario}.title`,
    `domains.${domain}.${to.name}.title`
  ]

  const i18n = $lang(paths)
  const title = i18n ? `${i18n} - ${fallback}` : fallback
  $store.dispatch('dashboard/setTitle', title)
}
