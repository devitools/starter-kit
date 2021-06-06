/* eslint-disable @typescript-eslint/no-var-requires */

const { permissionLevel } = require('@devitools/Security/permissions')

const { RULES } = require('src/settings/schema')

/**
 * @param {string} domain
 * @return {Object}
 */
module.exports = function (domain) {
  return {
    [RULES.LEVEL_INDEX]: permissionLevel(domain, 'dvr', RULES.LEVEL_INDEX),
    [RULES.LEVEL_TRASH]: permissionLevel(domain, 'restore', RULES.LEVEL_TRASH),
    [RULES.LEVEL_ADD]: permissionLevel(domain, 'add', RULES.LEVEL_ADD),
    [RULES.LEVEL_VIEW]: permissionLevel(domain, 'visibility', RULES.LEVEL_VIEW),
    [RULES.LEVEL_EDIT]: permissionLevel(domain, 'edit', RULES.LEVEL_EDIT),
    [RULES.LEVEL_DESTROY]: permissionLevel(domain, 'delete', RULES.LEVEL_DESTROY)
  }
}
