/**
 * @param {string} currentField
 * @return {function({$event?: *, parameters: *}): void}
 */
export function fieldIsSelectFilter (currentField) {
  return function ({ $event, parameters }) {
    const field = this.components[currentField]

    if (!field.attrs.__options) {
      field.attrs.__options = field.attrs.options
    }

    const update = parameters[0]
    update(() => {
      const original = field.attrs.__options
      if ($event === '') {
        field.attrs.options = original
        return
      }

      const needle = String($event).toLowerCase()
      const compare = (term) => {
        return String(term)
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .includes(needle)
      }

      field.attrs.options = original.filter((candidate) => {
        if (typeof candidate === 'string') {
          return compare(candidate)
        }
        if (candidate && candidate.label) {
          return compare(candidate.label)
        }
        return false
      })
    })
  }
}

/**
 * @param currentField
 * @return {function(...[*]=)}
 */
export function fieldIsSelectWatch (currentField) {
  return function (value) {
    const field = this.components[currentField]
    if (!field) {
      return
    }

    if (!field.attrs.__placeholder) {
      field.attrs.__placeholder = field.attrs.placeholder
    }
    if (value) {
      field.attrs.placeholder = ''
      return
    }
    field.attrs.placeholder = field.attrs.__placeholder
  }
}

/**
 * @return {function(...[*]=)}
 */
export function fieldIsSelectNewValue () {
  return function ({ $event, field, parameters }) {
    const done = parameters[0]
    if ($event.length > 2) {
      if (!field.attrs.options.includes($event)) {
        done($event, 'add-unique')
      }
    }
  }
}
