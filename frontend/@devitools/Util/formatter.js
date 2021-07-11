import $lang from '../Lang'
import DateTime from '../Support/DateTime'
import { replacement } from './string'

export { format as currencyFormatter } from './currency'

/**
 * @param {string} value
 * @param {string} pattern
 * @return {string}
 */
export const format = (value, pattern) => {
  if (typeof value !== 'string') {
    return ''
  }
  let i = 0
  const string = value.replace(/[./\-,]/g, '')
  return pattern.replace(/#/g, _ => string[i++] || '')
}

/**
 * @param {string} string
 * @param {string} output
 * @param {string} [format]
 * @returns {string}
 */
export const dateFormatter = (string, output = 'DD/MM/YYYY', format) => {
  if (!string || String(string).includes('0000-00-00')) {
    return '-'
  }
  const date = DateTime.fromFormat(string, format)
  if (!date) {
    return undefined
  }
  return date.format(output)
}
/**
 * @param {string} string
 * @param {string} output
 * @param {string} [format]
 * @returns {string}
 */
export const datetimeFormatter = (string, output = 'DD/MM/YYYY HH:mm', format) => {
  return dateFormatter(string, output, format)
}

/**
 * @param {boolean} value
 * @returns {string}
 */
export const booleanFormatter = (value) => {
  const template = '<i class="q-icon-inline material-icons">{icon}</i>'
  if (value) {
    return replacement(template, { icon: 'check_box' })
  }
  return replacement(template, { icon: 'check_box_outline_blank' })
}

/**
 * @param options
 * @param {Record<string, any>} classNames
 * @returns {function}
 */
export const classNameFormatter = (options, classNames) => {
  return function (value) {
    let answer = value
    const element = options.find((option) => String(option.value) === String(value))
    if (element && element.label) {
      answer = element.label
    }
    const template = '<div class="{className}">{answer}</div>'
    const className = classNames[value]
    return replacement(template, { className, answer })
  }
}

/**
 * @param {{value: unknown, label: string}[]} options
 * @return (value: unknown) => string
 */
export const optionsFormatter = (options) => {
  return (value) => {
    const element = options.find((option) => {
      return String(option.value).trim() === String(value).trim()
    })
    if (element && element.label) {
      return element.label
    }
    return value
  }
}

/**
 * @param {string|unknown} keyLabel
 * @return (value: Record<string, unknown>) => string
 */
export const optionFormatter = (keyLabel) => {
  return (value) => {
    let label
    try {
      label = value[keyLabel]
      if (label) {
        return label
      }
    } catch (e) {
      // silent
    }
    if (value === undefined || label === null) {
      return $lang('agnostic.components.appSelectRemote.notFound')
    }
    return value
  }
}

/**
 * @param {string} value
 * @returns {string}
 */
export const phoneFormatter = (value) => {
  const phone = String(value).replace(/\D/g, '')
  const mask = '($1) $2-$3'
  if (phone.length === 11) {
    return phone.replace(/^(\d\d)(\d{5})(\d{4}).*/, mask)
  }
  if (phone.length === 10) {
    return phone.replace(/^(\d\d)(\d{4})(\d{4}).*/, mask)
  }
  return value
}
