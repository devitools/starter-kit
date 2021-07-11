import { DEFAULT_CURRENCY } from 'src/settings/components'

/**
 * @param input
 * @return {string|string}
 */
function onlyNumbers (input) {
  return toString(input).replace(/\D+/g, '') || '0'
}

/**
 * @param precision
 * @return {*}
 */
function fixed (precision) {
  return between(0, precision, 20)
}

/**
 * @param min
 * @param n
 * @param max
 * @return {number}
 */
function between (min, n, max) {
  return Math.max(min, Math.min(n, max))
}

/**
 * @param numbers
 * @param precision
 * @return {string}
 */
function numbersToCurrency (numbers, precision) {
  const exp = Math.pow(10, precision)
  const float = parseFloat(numbers) / exp
  return float.toFixed(fixed(precision))
}

/**
 * @param integer
 * @param separator
 * @return {*}
 */
function addThousandSeparator (integer, separator) {
  return integer.replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${separator}`)
}

/**
 * @param integer
 * @param decimal
 * @param separator
 * @return {*}
 */
function joinIntegerAndDecimal (integer, decimal, separator) {
  return decimal ? integer + separator + decimal : integer
}

/**
 * @param value
 * @return {string|string}
 */
function toString (value) {
  return value ? value.toString() : ''
}

/**
 * @param {number} input
 * @param {Record<string, unknown>} options
 * @return {*}
 */
export function format (input, options = DEFAULT_CURRENCY) {
  let value = input
  if (typeof input === 'number') {
    value = input.toFixed(fixed(options.precision))
  }
  if (typeof value !== 'string') {
    const { fallback } = options
    return fallback || '-'
  }

  const negative = value.indexOf('-') >= 0 ? '-' : ''

  const numbers = onlyNumbers(value)
  const currency = numbersToCurrency(numbers, options.precision)
  const parts = toString(currency).split('.')
  let integer = parts[0]
  const decimal = parts[1]
  integer = addThousandSeparator(integer, options.thousands)
  return options.prefix + negative + joinIntegerAndDecimal(integer, decimal, options.decimal) + options.suffix
}

/**
 * @param input
 * @param precision
 * @return {number}
 */
export function unFormat (input, precision) {
  const negative = input.indexOf('-') >= 0 ? -1 : 1
  const numbers = onlyNumbers(input)
  const currency = numbersToCurrency(numbers, precision)
  return parseFloat(currency) * negative
}
