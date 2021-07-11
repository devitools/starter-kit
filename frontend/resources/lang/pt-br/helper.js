import { SCOPES } from '@devitools/Agnostic/enum'

/**
 * @param {string} parent
 * @param {string} plural
 * @param {string} singular
 * @param {Record<string, string>} override
 * @return {Record<string, Record<string, string>>}
 */
export function routes (parent, plural, singular, override = {}) {
  const labels = {
    [SCOPES.SCOPE_INDEX]: '',
    [SCOPES.SCOPE_TRASH]: 'Lixeira',
    [SCOPES.SCOPE_ADD]: 'Criar',
    [SCOPES.SCOPE_VIEW]: 'Visualizar',
    [SCOPES.SCOPE_EDIT]: 'Editar',
    ...override
  }
  return {
    group: {
      crumb: `${parent} / ${plural}`
    },
    [SCOPES.SCOPE_INDEX]: {
      title: plural
    },
    [SCOPES.SCOPE_TRASH]: {
      title: `${plural} ${labels[SCOPES.SCOPE_TRASH]}`,
      crumb: labels[SCOPES.SCOPE_TRASH]
    },
    [SCOPES.SCOPE_ADD]: {
      title: `${labels[SCOPES.SCOPE_ADD]} ${singular}`,
      crumb: labels[SCOPES.SCOPE_ADD]
    },
    [SCOPES.SCOPE_VIEW]: {
      title: `${labels[SCOPES.SCOPE_VIEW]} ${singular}`,
      crumb: labels[SCOPES.SCOPE_VIEW]
    },
    [SCOPES.SCOPE_EDIT]: {
      title: `${labels[SCOPES.SCOPE_EDIT]} ${singular}`,
      crumb: labels[SCOPES.SCOPE_EDIT]
    }
  }
}
