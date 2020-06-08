import axios from 'axios'
import { $store } from 'src/store'
import { otherwise, $router } from 'src/router'
import { browse } from '@devitools/Util/general'

/**
 * @type {AxiosInstance}
 */
const http = axios.create({ baseURL: process.env.VUE_APP_REST_BASE_URL, withCredentials: true })

/**
 * @param config
 * @returns {*}
 */
const requestOnFulfilled = function (config) {
  // Do something before request is sent
  const token = $store.getters['auth/getToken']
  config.headers.common['Bearer'] = `Bearer ${token}`
  config.headers.common['Device'] = $store.getters['app/getDevice']
  return config
}

/**
 * @param error
 * @returns {Promise<never>}
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
 * @returns {Promise<never>}
 */
const responseOnRejected = function (error) {
  // if (!error.response) {
  //   $error($lang('app.http.noNetwork'))
  // }
  // Do something with response error
  if (error.response && [401, 403].includes(error.response.status)) {
    const target = { path: otherwise, query: { current: $router.currentRoute.path } }
    $store.dispatch('auth/logout').then(() => browse(target))
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
