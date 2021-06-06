import chance from 'chance'
import { now, today } from '@devitools/Util/date'

const generator = chance.Chance()

/**
 * @param {number} digits
 * @return {number}
 */
export function number (digits) {
  return Math.round(Math.random() * Math.pow(10, digits))
}

/**
 * @return {number}
 */
export function boolean () {
  return (Math.random() >= 0.5) ? 1 : 0
}

/**
 * @param {Field} field
 * @param {*|unknown} current
 * @return {*}
 */
export default function (field, current) {
  if (!field.$fill) {
    return
  }

  if (typeof field.$fill === 'function') {
    return field.$fill.call(this, generator, field)
  }

  const defaults = {
    'default-string': (generator) => current !== undefined ? undefined : generator.animal(),
    'default-number': (generator) => current !== undefined ? undefined : generator.integer(),
    'default-text': (generator) => current !== undefined ? undefined : generator.paragraph({ sentences: 2 }),
    'default-boolean': (generator) => generator.bool(),
    'default-options': function (generator, field) {
      if (current !== undefined) {
        return
      }

      const options = field?.attrs?.options
      if (!Array.isArray(options) || !options.length) {
        return
      }

      const index = Math.floor(Math.random() * options.length)
      return options[index].value
    },
    'default-select': function (generator, field) {
      if (current !== undefined) {
        return
      }

      const ref = this.generateComponentRef(field)
      const component = this.getComponentByRef(ref)
      if (!(component)) {
        return
      }

      const options = component.options
      if (Array.isArray(options) && options.length) {
        const index = Math.floor(Math.random() * options.length)
        return options[index].__meta
      }

      if (!component.filterRemote) {
        return
      }

      component
        .filterRemote()
        .then(() => {
          const options = component.options
          if (!Array.isArray(options)) {
            return
          }
          const index = Math.floor(Math.random() * options.length)
          const value = options[index]?.__meta
          if (!value) {
            return
          }
          this.record[field.$key] = value
        })
    },
    'default-array': () => current !== undefined ? undefined : [],
    'default-date': () => current !== undefined ? undefined : today(),
    'default-datetime': () => current !== undefined ? undefined : now(),
    'default-currency': (generator) => current ? undefined : generator.floating({ min: 0, max: 999, fixed: 2 })
  }

  const method = field.$fill.method
  if (defaults[method]) {
    return defaults[method].call(this, generator, field)
  }

  if (current !== undefined) {
    return
  }

  if (generator[method]) {
    return generator[method]({ nationality: 'en', ...field.$fill.parameters })
  }
  console.error(`Filler "${method}" not found`)
  return undefined
}
