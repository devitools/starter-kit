import $lang from '@devitools/Lang'
import { RULES } from './schema'

/**
 * @param {{path: string, icon: string, domain: string}} action
 * @param separated
 * @returns {{path: string, name: string, namespace: string, separated: boolean}}
 */
export const action = (action, separated = false) => {
  return {
    path: action.path,
    icon: action.icon,
    name: $lang(`actions.${action.domain}`),
    namespace: `${action.domain}.${RULES.LEVEL_AVAILABLE}`,
    separated: separated
  }
}

/**
 * @param {string} domain
 * @return {{icon: string, namespace: string, label: string}}
 */
export const available = (domain) => {
  return {
    label: $lang(`permissions.${domain}.${RULES.LEVEL_AVAILABLE}`),
    namespace: `${domain}.${RULES.LEVEL_AVAILABLE}`,
    icon: 'done'
  }
}

/**
 * @param domain
 * @return {[{namespace: string, label: *}, {namespace: string, label: *}, {namespace: string, label: *}, {namespace: string, label: *}]}
 */
export const children = (domain) => {
  return [
    {
      label: $lang(`permissions.${domain}.${RULES.LEVEL_INDEX}`),
      namespace: `${domain}.${RULES.LEVEL_INDEX}`,
      icon: 'dvr'
    },
    {
      label: $lang(`permissions.${domain}.${RULES.LEVEL_TRASH}`),
      namespace: `${domain}.${RULES.LEVEL_TRASH}`,
      icon: 'restore'
    },
    {
      label: $lang(`permissions.${domain}.${RULES.LEVEL_ADD}`),
      namespace: `${domain}.${RULES.LEVEL_ADD}`,
      icon: 'add'
    },
    {
      label: $lang(`permissions.${domain}.${RULES.LEVEL_VIEW}`),
      namespace: `${domain}.${RULES.LEVEL_VIEW}`,
      icon: 'visibility'
    },
    {
      label: $lang(`permissions.${domain}.${RULES.LEVEL_EDIT}`),
      namespace: `${domain}.${RULES.LEVEL_EDIT}`,
      icon: 'edit'
    },
    {
      label: $lang(`permissions.${domain}.${RULES.LEVEL_DESTROY}`),
      namespace: `${domain}.${RULES.LEVEL_DESTROY}`,
      icon: 'delete'
    }
  ]
}

/**
 * @param {string} domain
 * @return {{children: [{namespace: string, label: string}], icon: string, namespace: string, label: string}}
 */
export const levels = (domain) => {
  return {
    label: $lang('permissions.actions'),
    icon: 'lock_open',
    namespace: `${domain}.actions`,
    children: children(domain)
  }
}

/**
 * @param {string} domain
 * @param {string[]} items
 * @return {{children: [{namespace: string, label: string}], icon: string, namespace: string, label: string}}
 */
export const internals = (domain, items) => {
  return {
    label: $lang('permissions.resources'),
    icon: 'playlist_add',
    namespace: `${domain}.resources`,
    children: items.map((item) => {
      return {
        label: $lang(`permissions.${item}`),
        namespace: item,
        children: children(item)
      }
    })
  }
}

/**
 * @param {string} domain
 * @param {string} icon
 * @param {string[]} items
 * @return {{children: [{icon: string, namespace: string, label: string}, {children: {namespace: string, label: string}[], icon: string, namespace: string, label: string}], namespace: *, icon: *, label: *}}
 */
export const permission = (domain, icon, items = []) => {
  const children = [
    available(domain),
    levels(domain)
  ]
  if (items.length) {
    children.push(internals(domain, items))
  }

  return {
    namespace: domain,
    label: $lang(`permissions.${domain}`),
    icon: icon,
    children
  }
}
