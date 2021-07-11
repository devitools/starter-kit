import axios from 'axios'
import { $store } from 'src/store'
import { $router, otherwise } from 'src/router'

/**
 * @type {AxiosInstance}
 */
const http = axios.create({
  baseURL: process.env.VUE_APP_REST_BASE_URL,
  withCredentials: process.env.VUE_APP_REST_WITH_CREDENTIALS !== 'false'
})

/**
 * @param config
 * @returns {*}
 */
const requestOnFulfilled = function (config) {
  // Do something before request is sent
  config.headers.common['bearer'] = `Bearer ${$store.getters['auth/getToken']}`
  config.headers.common['device'] = $store.getters['app/getDevice']
  return config
}

/**
 * @param error
 * @returns {Promise<unknown>}
 */
const requestOnRejected = function (error) {
  // Do something with request error
  return Promise.reject(error)
}

/**
 */
http.interceptors.request.use(requestOnFulfilled, requestOnRejected)

/**
 * @param response
 * @returns {*}
 */
const responseOnFulfilled = function (response) {
  if (response.config.notExtractData) {
    return response
  }
  // Do something with response data
  return response.data
}
/**
 * @param error
 * @returns {Promise<unknown>}
 */
const responseOnRejected = function (error) {
  // if (!error.response) {
  //   $error($lang('app.http.noNetwork'))
  // }
  // Do something with response error
  if (error.response && [401, 403].includes(error.response.status)) {
    window.$app.closeDashboard({ path: otherwise, query: { current: $router.currentRoute.path } })
  }
  return Promise.reject(error)
}
/**
 */
http.interceptors.response.use(responseOnFulfilled, responseOnRejected)

/**
 * It is just an axios instance to execute the perform http rest queries
 */
export default http
