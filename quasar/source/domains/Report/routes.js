import { group } from '@devitools/Util/routing'

/**
 * @param {AppRouter} router
 * @returns Array<RouteConfig>
 */
export default (router) => {
  // index
  const index = () => import('@devitools/Components/Group/Group.vue')

  const children = [
  ]
  const meta = { namespace: 'report', scope: 'group', bread: false }
  return [
    group('/dashboard/report', index, children, meta)
  ]
}
