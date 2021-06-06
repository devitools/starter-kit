import DateTime from '../Support/DateTime'

/**
 * @param {string} [output]
 * @returns {string}
 */
export const now = (output = 'YYYY-MM-DD HH:mm') => dateCurrent(output)

/**
 * @param {string} [output]
 * @returns {string}
 */
export const today = (output = 'YYYY-MM-DD') => dateCurrent(output)

/**
 * @param {string} [output]
 * @returns {string}
 */
export const tomorrow = (output = 'YYYY-MM-DD') => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return new DateTime(today.setDate(today.getDate() + 1)).format(output)
}

/**
 * @param {string} [output]
 * @returns {string}
 */
export const afterTomorrow = (output = 'YYYY-MM-DD') => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return new DateTime(today.setDate(today.getDate() + 2)).format(output)
}

/**
 * @param {string} [output]
 * @returns {string}
 */
export const lastSunday = (output = 'YYYY-MM-DD') => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return new DateTime(today.setDate(today.getDate() - today.getDay())).format(output)
}

/**
 * @returns {string}
 */
export const yesterday = () => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return new DateTime(today.setDate(today.getDate() - 1)).format('YYYY-MM-DD')
}

/**
 * @returns {string}
 */
export const fourDaysAgo = () => {
  const today = new Date()
  today.setDate(today.getDate() - 4)
  return today.toDateString()
}

/**
 * @returns {string}
 */
export const beforeYesterday = () => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return new DateTime(today.setDate(today.getDate() - 2)).format('YYYY-MM-DD')
}

/**
 * @returns {string}
 */
export const oneWeekAgo = () => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return new DateTime(today.setDate(today.getDate() - 7)).format('YYYY-MM-DD')
}

/**
 * @returns {string}
 */
export const oneMonthAgo = () => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return new DateTime(today.setDate(today.getDate() - 30)).format('YYYY-MM-DD')
}

/**
 * @returns {string}
 */
export const firstDayOfYear = () => {
  const now = new Date()
  const today = new Date(now.getFullYear(), 0, 1)
  return new DateTime(today.setDate(today.getDate())).format('YYYY-MM-DD')
}

/**
 * @returns {string}
 */
export const lastDayOfYear = () => {
  const now = new Date()
  const today = new Date(now.getFullYear(), 11, 31)
  return new DateTime(today.setDate(today.getDate())).format('YYYY-MM-DD')
}

/**
 * @param {string} output
 */
export const dateCurrent = (output) => {
  return (new DateTime()).format(output)
}

/**
 * @param {string} string
 * @param {string} [format]
 * @returns {DateTime}
 */
export const dateFrom = (string, format = undefined) => {
  return DateTime.fromFormat(string, format)
}

/**
 * @param {string} string
 * @param {string} [format]
 * @returns {number}
 */
export const dateMonth = (string, format) => {
  return DateTime.fromFormat(string, format).getMonth()
}

/**
 * @param {string} string
 * @param {string} [format]
 * @returns {number}
 */
export const dateYear = (string, format) => {
  return DateTime.fromFormat(string, format).getFullYear()
}

/**
 * @param {string} string
 * @returns {boolean}
 */
export const dateIsValid = (string) => {
  return DateTime.fromFormat(string).isValid()
}

/**
 * @param {string} base
 * @param {string} compare
 * @param {string} [format]
 * @returns {boolean}
 */
export const dateCompareGreaterEqualThen = (base, compare, format) => {
  return DateTime.compareGreaterEqualThen(base, compare, format)
}

/**
 * @param {string} base
 * @param {string} compare
 * @param {string} [format]
 * @returns {boolean}
 */
export const dateCompareLessEqualThen = (base, compare, format) => {
  return DateTime.compareLessEqualThen(base, compare, format)
}

/**
 * @param {string} base
 * @param {string} compare
 * @param {string} [format]
 * @returns {boolean}
 */
export const dateCompareGreaterThen = (base, compare, format) => {
  return DateTime.compareGreaterThen(base, compare, format)
}

/**
 * @param {string} base
 * @param {string} compare
 * @param {string} [format]
 * @returns {boolean}
 */
export const dateCompareLessThen = (base, compare, format) => {
  return DateTime.compareLessThen(base, compare, format)
}
