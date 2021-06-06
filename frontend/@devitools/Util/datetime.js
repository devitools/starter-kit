import dayJS from 'dayjs'

/**
 * @param {string} date
 * @param {string} format
 * @returns {string}
 */
export const format = (date, format = 'DD/MM/YYYY') => {
  return dayJS(date).format(format)
}

/**
 * @param {Date} date
 * @param {string} format
 * @returns {string}
 */
export const firstDayOfWeek = (date = new Date(), format = 'DD/MM/YYYY') => {
  return dayJS(date).startOf('week').format(format)
}

/**
 * @param {Date} date
 * @param {string} format
 * @returns {string}
 */
export const firstDayOfMonth = (date = new Date(), format = 'DD/MM/YYYY') => {
  return dayJS(date).startOf('month').format(format)
}

/**
 * @param {string} format
 * @returns {string}
 */
export const firstDayOfYear = (format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayJS(new Date()).startOf('year').hour(23).minute(59).second(59).format(format)
}
