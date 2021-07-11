import http from 'src/settings/http'

/**
 * @type {string}
 */
const baseURL = process.env.VUE_APP_REPORT_BASE_URL

/**
 * @param {Function} h
 * @returns {*}
 */
export const reportContext = (h) => {
  const domProps = {
    type: 'hidden',
    name: '__@context',
    value: undefined
  }
  return h('input', { domProps })
}

// noinspection JSUnusedLocalSymbols
/**
 * @return {string}
 */
export const reportLoading = (report) => {
  return `${baseURL}/loading`
  // return `${baseURL}/loading.html`
}

/**
 * @param {string} report
 * @param {string} token
 * @param {boolean} printing
 * @return {string}
 */
export const reportAction = (report, token, printing) => {
  return `${baseURL}/process/${report}?c=${token}&p=${printing}`
  // return `${baseURL}/process.html?report=${report}?c=${token}&p=${printing}`
}

/**
 * @param {string} report
 * @param {string} token
 * @param {Record<string, unknown>} data
 * @param {string} type
 * @return {Promise}
 */
export const reportDownload = (report, token, data, type = 'csv') => {
  const url = `${baseURL}/process/${report}/${type}?c=${token}`
  const config = { notExtractData: true }
  return http.post(url, data, config)
}

// noinspection JSUnusedLocalSymbols
/**
 * @return {string}
 */
export const reportMethod = (report, token, printing) => {
  return 'post'
}
