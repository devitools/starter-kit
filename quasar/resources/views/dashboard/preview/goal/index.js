export { domain } from 'source/domains/Preview/Goal/settings'

/**
 * @type {string}
 */
export const path = '/dashboard/general/goal'

/**
 * @type {string}
 */
export const icon = 'military_tech' // follow_the_signs

/**
 * @type {function}
 */
export const table = () => import('resources/views/dashboard/preview/goal/GoalTable.vue')

/**
 * @type {function}
 */
export const form = () => import('resources/views/dashboard/preview/goal/GoalForm.vue')
